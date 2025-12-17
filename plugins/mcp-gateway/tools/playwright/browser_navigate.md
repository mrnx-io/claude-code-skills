# browser_navigate

Navigate browser to a URL.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | **yes** | URL to navigate to |

## Examples

```json
{"url": "https://example.com"}
```

```json
{"url": "http://localhost:3000"}
```

## Prerequisites

Browser must be started first. If not running, the tool will start it automatically.

## Returns

Navigation result with:
- Page title
- Final URL (after redirects)
- Load status
