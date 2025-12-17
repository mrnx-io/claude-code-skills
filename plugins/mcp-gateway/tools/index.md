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

## notion (15+ tools)

| Tool | Purpose |
|------|---------|
| `notion-search` | Search workspace |
| `notion-fetch` | Get page/database content |
| `notion-create-pages` | Create new pages |
| `notion-update-page` | Update page content |
| `notion-create-database` | Create new database |
| `notion-update-database` | Modify database schema |
| `notion-move-pages` | Move pages to new parent |
| `notion-duplicate-page` | Duplicate a page |
| `notion-create-comment` | Add comment to page |
| `notion-get-comments` | Get page comments |
| `notion-get-teams` | List teamspaces |
| `notion-get-users` | List workspace users |

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
