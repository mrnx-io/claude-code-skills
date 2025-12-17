# MCP Tool Registry

Quick reference for all available tools via `gateway.invoke(server, tool, args)`.

## context7 (2 tools)

| Tool | Purpose |
|------|---------|
| `resolve-library-id` | Convert package name to context7 ID |
| `get-library-docs` | Fetch library documentation |

## exa (2 tools)

| Tool | Purpose |
|------|---------|
| `web_search_exa` | AI-powered web search |
| `get_code_context_exa` | Code-focused context search |

## playwright (10+ tools)

| Tool | Purpose |
|------|---------|
| `browser_navigate` | Navigate to URL |
| `browser_take_snapshot` | Get accessibility snapshot |
| `browser_click` | Click element |
| `browser_type` | Type text |
| `browser_screenshot` | Take screenshot |
| `browser_go_back` | Navigate back |
| `browser_go_forward` | Navigate forward |
| `browser_scroll` | Scroll page |
| `browser_select_option` | Select dropdown option |
| `browser_hover` | Hover over element |

---

For detailed schemas, read `tools/{server}/{tool}.md`.
