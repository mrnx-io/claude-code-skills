# get-library-docs

Fetch up-to-date documentation for a library.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `context7CompatibleLibraryID` | string | **yes** | Library ID (e.g., "/vercel/next.js") |
| `topic` | string | no | Focus topic (e.g., "hooks", "routing") |
| `mode` | string | no | "code" (default) or "info" |
| `page` | integer | no | Pagination (1-10, default: 1) |

## Modes

- **code**: API references, code examples (default)
- **info**: Conceptual guides, architecture

## Examples

Get React hooks docs:
```json
{
  "context7CompatibleLibraryID": "/facebook/react",
  "topic": "hooks"
}
```

Get Next.js routing info:
```json
{
  "context7CompatibleLibraryID": "/vercel/next.js",
  "topic": "routing",
  "mode": "info"
}
```

Page through results:
```json
{
  "context7CompatibleLibraryID": "/tailwindlabs/tailwindcss",
  "topic": "colors",
  "page": 2
}
```

## Workflow

1. `resolve-library-id` to get ID
2. `get-library-docs` with ID and topic

## Returns

Markdown documentation with code examples.
