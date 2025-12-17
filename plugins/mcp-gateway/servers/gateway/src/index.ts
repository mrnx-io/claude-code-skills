#!/usr/bin/env bun
/**
 * MCP Gateway Server
 *
 * Exposes a single `invoke` tool that routes to underlying MCP servers.
 * This achieves 95% token reduction by replacing 50+ tool definitions with 1.
 *
 * Supports both stdio and SSE transports:
 * - stdio: Local servers spawned via npx/bun/python (most common)
 * - sse: Remote servers accessed via HTTP/SSE (for hosted services)
 *
 * Usage: invoke(server, tool, args)
 * Example: invoke("context7", "resolve-library-id", {libraryName: "react"})
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js"
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js"
import { CallToolResultSchema } from "@modelcontextprotocol/sdk/types.js"
import { z } from "zod"

// Transport types
type StdioConfig = {
  type: "stdio"
  command: string
  args: string[]
  env?: Record<string, string>
}

type SSEConfig = {
  type: "sse"
  url: string
  headers?: Record<string, string>
}

type ServerConfig = StdioConfig | SSEConfig

// Server configurations for lazy connection
const SERVER_CONFIGS: Record<string, ServerConfig> = {
  // ─────────────────────────────────────────────────────────────
  // Stdio servers (local, spawned on-demand)
  // ─────────────────────────────────────────────────────────────
  context7: {
    type: "stdio",
    command: "npx",
    args: ["-y", "@anthropic-ai/context7-mcp@latest"],
  },
  exa: {
    type: "stdio",
    command: "npx",
    args: ["-y", "exa-mcp-server"],
    env: { EXA_API_KEY: process.env.EXA_API_KEY || "" },
  },
  notion: {
    type: "stdio",
    command: "npx",
    args: ["-y", "@anthropic-ai/notion-mcp"],
  },
  playwright: {
    type: "stdio",
    command: "npx",
    args: ["-y", "@anthropic-ai/playwright-mcp"],
  },

  // ─────────────────────────────────────────────────────────────
  // SSE servers (remote, must be running at URL)
  // ─────────────────────────────────────────────────────────────
  // Example: Uncomment and configure when you have a remote MCP service
  //
  // "remote-api": {
  //   type: "sse",
  //   url: "https://mcp.example.com/sse",
  //   headers: {
  //     Authorization: `Bearer ${process.env.REMOTE_API_KEY || ""}`,
  //   },
  // },
}

// Lazy client connections
const clients: Map<string, Client> = new Map()

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

  // Create appropriate transport based on config type
  let transport

  if (config.type === "sse") {
    // SSE transport for remote servers
    transport = new SSEClientTransport(new URL(config.url), {
      requestInit: {
        headers: config.headers || {},
      },
    })
  } else {
    // Stdio transport for local servers (default)
    // Filter out undefined env values
    const env: Record<string, string> = {}
    for (const [key, value] of Object.entries({ ...process.env, ...config.env })) {
      if (value !== undefined) {
        env[key] = value
      }
    }

    transport = new StdioClientTransport({
      command: config.command,
      args: config.args,
      env,
    })
  }

  // Create and connect client
  const client = new Client(
    {
      name: `gateway-to-${serverName}`,
      version: "1.0.0",
    },
    {
      capabilities: {},
    }
  )

  await client.connect(transport)
  clients.set(serverName, client)

  return client
}

// Create the gateway server using new McpServer API
const server = new McpServer(
  {
    name: "mcp-gateway",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

// Register invoke tool
server.registerTool(
  "invoke",
  {
    description: `Invoke any MCP tool through the gateway.

Available servers: context7, exa, notion, playwright

For tool schemas, read: ~/.claude/plugins/local/mcp-gateway/tools/{server}/{tool}.md

Examples:
- invoke("context7", "resolve-library-id", {libraryName: "react"})
- invoke("exa", "web_search_exa", {query: "Next.js 16"})
- invoke("notion", "notion-search", {query: "project notes"})
- invoke("playwright", "browser_navigate", {url: "https://example.com"})`,
    inputSchema: {
      server: z.enum(["context7", "exa", "notion", "playwright"]).describe("Target MCP server to invoke"),
      tool: z.string().describe("Tool name on the target server (e.g., find_symbol, web_search_exa)"),
      args: z.record(z.string(), z.unknown()).optional().describe("Arguments to pass to the tool (see tool docs for schema)"),
    },
  },
  async ({ server: serverName, tool, args }, _extra) => {
    try {
      const client = await getClient(serverName)
      const result = await client.callTool({ name: tool, arguments: args || {} }, CallToolResultSchema)
      // Pass through the result content
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
      server: z.enum(["context7", "exa", "notion", "playwright"]).describe("Server to list tools from"),
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

// Clean up on exit
process.on("SIGINT", async () => {
  for (const [_name, client] of clients) {
    try {
      await client.close()
    } catch {
      // Ignore cleanup errors
    }
  }
  process.exit(0)
})

// Start the server
const transport = new StdioServerTransport()
await server.connect(transport)
