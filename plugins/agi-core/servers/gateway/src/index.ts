#!/usr/bin/env bun
/**
 * MCP Gateway Server
 *
 * Exposes a single `invoke` tool that routes to underlying MCP servers.
 * This achieves 95% token reduction by replacing 50+ tool definitions with 1.
 *
 * Supports three transport types:
 * - stdio: Local servers spawned via npx/bun/python (most common)
 * - streamable-http: Remote servers via Streamable HTTP (recommended for remote)
 * - sse: Legacy remote servers via HTTP+SSE (backwards compatibility)
 *
 * Usage: invoke(server, tool, args)
 * Example: invoke("context7", "resolve-library-id", {libraryName: "react"})
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js"
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js"
import { CallToolResultSchema } from "@modelcontextprotocol/sdk/types.js"
import { z } from "zod"

// ─────────────────────────────────────────────────────────────────────────────
// Transport Type Definitions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Stdio transport for local servers (spawned as subprocess)
 * Most common for CLI tools and local development
 */
type StdioConfig = {
  type: "stdio"
  command: string
  args: string[]
  env?: Record<string, string>
}

/**
 * Streamable HTTP transport for remote servers (recommended)
 * MCP Spec 2025-03-26+, single endpoint with optional SSE streaming
 */
type StreamableHTTPConfig = {
  type: "streamable-http"
  url: string
  headers?: Record<string, string>
  sessionId?: string
}

/**
 * SSE transport for legacy remote servers (backwards compatibility)
 * Deprecated in MCP Spec 2025-03-26, use streamable-http for new servers
 */
type SSEConfig = {
  type: "sse"
  url: string
  headers?: Record<string, string>
}

/**
 * Auto transport tries Streamable HTTP first, falls back to SSE
 * Use when you're unsure which protocol the server supports
 */
type AutoHTTPConfig = {
  type: "auto-http"
  url: string
  headers?: Record<string, string>
}

type ServerConfig = StdioConfig | StreamableHTTPConfig | SSEConfig | AutoHTTPConfig

// ─────────────────────────────────────────────────────────────────────────────
// Server Configurations
// ─────────────────────────────────────────────────────────────────────────────

const SERVER_CONFIGS: Record<string, ServerConfig> = {
  // ─────────────────────────────────────────────────────────────
  // Stdio servers (local, spawned on-demand via npx)
  // ─────────────────────────────────────────────────────────────
  context7: {
    type: "stdio",
    command: "npx",
    args: ["-y", "@upstash/context7-mcp"],
  },
  exa: {
    type: "stdio",
    command: "npx",
    args: ["-y", "exa-mcp-server"],
    env: { EXA_API_KEY: process.env.EXA_API_KEY || "" },
  },

  // ─────────────────────────────────────────────────────────────
  // Streamable HTTP servers (remote, recommended for new servers)
  // ─────────────────────────────────────────────────────────────
  // Example: Modern MCP server with Streamable HTTP
  //
  // "cloud-api": {
  //   type: "streamable-http",
  //   url: "https://mcp.example.com/mcp",
  //   headers: {
  //     Authorization: `Bearer ${process.env.CLOUD_API_KEY || ""}`,
  //   },
  // },

  // ─────────────────────────────────────────────────────────────
  // Auto HTTP servers (tries Streamable HTTP, falls back to SSE)
  // ─────────────────────────────────────────────────────────────
  // Example: When unsure if server supports new or legacy protocol
  //
  // "unknown-remote": {
  //   type: "auto-http",
  //   url: "https://mcp.example.com/mcp",
  //   headers: {
  //     Authorization: `Bearer ${process.env.REMOTE_API_KEY || ""}`,
  //   },
  // },

  // ─────────────────────────────────────────────────────────────
  // SSE servers (legacy, for backwards compatibility only)
  // ─────────────────────────────────────────────────────────────
  // Example: Legacy MCP server that only supports HTTP+SSE
  //
  // "legacy-api": {
  //   type: "sse",
  //   url: "https://mcp.example.com/sse",
  //   headers: {
  //     Authorization: `Bearer ${process.env.LEGACY_API_KEY || ""}`,
  //   },
  // },
}

// ─────────────────────────────────────────────────────────────────────────────
// Client Connection Management
// ─────────────────────────────────────────────────────────────────────────────

const clients: Map<string, Client> = new Map()

/**
 * Creates appropriate transport based on config type
 */
async function createTransport(config: ServerConfig): Promise<{
  transport: StdioClientTransport | StreamableHTTPClientTransport | SSEClientTransport
  type: string
}> {
  switch (config.type) {
    case "stdio": {
      // Filter out undefined env values
      const env: Record<string, string> = {}
      for (const [key, value] of Object.entries({ ...process.env, ...config.env })) {
        if (value !== undefined) {
          env[key] = value
        }
      }
      return {
        transport: new StdioClientTransport({
          command: config.command,
          args: config.args,
          env,
        }),
        type: "stdio",
      }
    }

    case "streamable-http": {
      return {
        transport: new StreamableHTTPClientTransport(new URL(config.url), {
          requestInit: {
            headers: config.headers || {},
          },
          sessionId: config.sessionId,
        }),
        type: "streamable-http",
      }
    }

    case "sse": {
      return {
        transport: new SSEClientTransport(new URL(config.url), {
          requestInit: {
            headers: config.headers || {},
          },
        }),
        type: "sse",
      }
    }

    case "auto-http": {
      // Try Streamable HTTP first (recommended), fall back to SSE (legacy)
      try {
        const streamableTransport = new StreamableHTTPClientTransport(new URL(config.url), {
          requestInit: {
            headers: config.headers || {},
          },
        })
        // Test connection by creating a temporary client
        const testClient = new Client({ name: "transport-test", version: "1.0.0" }, { capabilities: {} })
        await testClient.connect(streamableTransport)
        await testClient.close()

        // Success - return a new transport (the test one is now closed)
        return {
          transport: new StreamableHTTPClientTransport(new URL(config.url), {
            requestInit: {
              headers: config.headers || {},
            },
          }),
          type: "streamable-http (auto)",
        }
      } catch (error) {
        // Streamable HTTP failed, try SSE
        console.error(`Streamable HTTP failed for ${config.url}, falling back to SSE:`, error)
        return {
          transport: new SSEClientTransport(new URL(config.url), {
            requestInit: {
              headers: config.headers || {},
            },
          }),
          type: "sse (auto fallback)",
        }
      }
    }

    default:
      throw new Error(`Unknown transport type: ${(config as ServerConfig).type}`)
  }
}

/**
 * Gets or creates a client connection to the specified server
 */
async function getClient(serverName: string): Promise<Client> {
  // Return existing client if connected
  if (clients.has(serverName)) {
    return clients.get(serverName)!
  }

  const config = SERVER_CONFIGS[serverName]
  if (!config) {
    throw new Error(
      `Unknown server: ${serverName}. Available: ${Object.keys(SERVER_CONFIGS).join(", ")}`
    )
  }

  const { transport, type } = await createTransport(config)
  console.error(`Connecting to ${serverName} via ${type}...`)

  const client = new Client(
    {
      name: `gateway-to-${serverName}`,
      version: "2.0.0",
    },
    {
      capabilities: {},
    }
  )

  await client.connect(transport)
  clients.set(serverName, client)
  console.error(`Connected to ${serverName} via ${type}`)

  return client
}

// ─────────────────────────────────────────────────────────────────────────────
// Gateway Server Setup
// ─────────────────────────────────────────────────────────────────────────────

const server = new McpServer(
  {
    name: "mcp-gateway",
    version: "2.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

// Get available server names for schema
const availableServers = Object.keys(SERVER_CONFIGS) as [string, ...string[]]

// Register invoke tool
server.registerTool(
  "invoke",
  {
    description: `Invoke any MCP tool through the gateway.

Available servers: ${availableServers.join(", ")}

Transport types:
- stdio: Local servers (context7, exa)
- streamable-http: Remote servers (recommended, MCP 2025-03-26+)
- sse: Legacy remote servers (backwards compatibility)
- auto-http: Tries streamable-http, falls back to sse

Examples:
- invoke("context7", "resolve-library-id", {libraryName: "react"})
- invoke("exa", "web_search_exa", {query: "Next.js 16"})`,
    inputSchema: {
      server: z.enum(availableServers).describe("Target MCP server to invoke"),
      tool: z.string().describe("Tool name on the target server"),
      args: z.record(z.string(), z.unknown()).optional().describe("Arguments to pass to the tool"),
    },
  },
  async ({ server: serverName, tool, args }, _extra) => {
    try {
      const client = await getClient(serverName)
      const result = await client.callTool({ name: tool, arguments: args || {} }, CallToolResultSchema)
      const content = Array.isArray(result.content) ? result.content : []
      return {
        content: content.map((item) => {
          if (item.type === "text") {
            return { type: "text" as const, text: item.text }
          }
          return { type: "text" as const, text: JSON.stringify(item) }
        }),
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error invoking ${serverName}.${tool}: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      }
    }
  }
)

// Register list_server_tools tool
server.registerTool(
  "list_server_tools",
  {
    description: "List available tools on a specific MCP server. Use this to discover what tools are available before invoking.",
    inputSchema: {
      server: z.enum(availableServers).describe("Server to list tools from"),
    },
  },
  async ({ server: serverName }, _extra) => {
    try {
      const client = await getClient(serverName)
      const result = await client.listTools()
      const toolList = result.tools
        .map((t) => `- ${t.name}: ${t.description?.slice(0, 100)}...`)
        .join("\n")
      return {
        content: [
          {
            type: "text" as const,
            text: `Tools available on ${serverName}:\n\n${toolList}`,
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error listing tools for ${serverName}: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      }
    }
  }
)

// Register list_servers tool
server.registerTool(
  "list_servers",
  {
    description: "List all configured MCP servers and their transport types.",
    inputSchema: {},
  },
  async () => {
    const serverList = Object.entries(SERVER_CONFIGS)
      .map(([name, config]) => {
        const connected = clients.has(name) ? " (connected)" : ""
        return `- ${name}: ${config.type}${connected}`
      })
      .join("\n")
    return {
      content: [
        {
          type: "text" as const,
          text: `Configured MCP servers:\n\n${serverList}`,
        },
      ],
    }
  }
)

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle Management
// ─────────────────────────────────────────────────────────────────────────────

process.on("SIGINT", async () => {
  console.error("Shutting down gateway...")
  for (const [name, client] of clients) {
    try {
      console.error(`Closing connection to ${name}...`)
      await client.close()
    } catch {
      // Ignore cleanup errors
    }
  }
  process.exit(0)
})

// Start the gateway server
const transport = new StdioServerTransport()
await server.connect(transport)
console.error("MCP Gateway started (v2.0.0)")
