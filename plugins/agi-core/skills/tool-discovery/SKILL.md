---
name: MCP Tool Discovery
description: Use this skill when needing to invoke MCP tools through the gateway, search for tool capabilities, or understand which server to use for a task. Triggers on "invoke", "mcp tool", "notion", "context7", "exa", "playwright", "web search", "library docs".
---

# MCP Tool Discovery

All MCP tools are accessed via the **gateway** server's `invoke` tool.

## Quick Lookup

| Task | Server | Tool | Example |
|------|--------|------|---------|
| Get library docs | context7 | get-library-docs | `{context7CompatibleLibraryID: "/vercel/next.js"}` |
| Resolve library ID | context7 | resolve-library-id | `{libraryName: "react"}` |
| Web search | exa | web_search_exa | `{query: "Next.js 16 features"}` |
| Code context | exa | get_code_context_exa | `{query: "React hooks"}` |
| Search Notion | notion | notion-search | `{query: "project notes"}` |
| Fetch Notion page | notion | notion-fetch | `{id: "page-id-or-url"}` |
| Create Notion page | notion | notion-create-pages | `{pages: [{properties: {title: "New"}}]}` |
| Browser navigate | playwright | browser_navigate | `{url: "https://example.com"}` |
| Browser snapshot | playwright | browser_take_snapshot | `{}` |

## Invocation Pattern

```
gateway.invoke(server, tool, args)
```

Example:
```json
{
  "server": "context7",
  "tool": "resolve-library-id",
  "args": {
    "libraryName": "react"
  }
}
```

## Discovery Process

1. Check quick lookup table above
2. For detailed schemas: `Read ~/.claude/plugins/local/mcp-gateway/tools/{server}/{tool}.md`
3. List all tools on a server: `gateway.list_server_tools(server)`

## Server Capabilities

### context7 (Documentation)
Library documentation lookup with up-to-date API references.
**Best for**: Getting current docs for any npm/Python package.

### exa (Web Search)
AI-powered web search with code context extraction.
**Best for**: Finding recent information, code examples, tutorials.

### notion (Workspace)
Full Notion workspace access: search, read, create, update.
**Best for**: Knowledge base queries, documentation management.

### playwright (Browser)
Browser automation: navigation, screenshots, interaction.
**Best for**: Testing, scraping, visual verification.

## Tool Registry

Full schemas available in `~/.claude/plugins/local/mcp-gateway/tools/`:
- `tools/index.md` - Master index with all tools
- `tools/notion/*.md` - 15+ workspace tools
- `tools/context7/*.md` - Library documentation
- `tools/exa/*.md` - Web search
- `tools/playwright/*.md` - Browser automation
