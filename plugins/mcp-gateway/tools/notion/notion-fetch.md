# notion-fetch

Retrieve details about a Notion page or database.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | **yes** | Page/database URL or ID |

## ID Formats

- Full URL: `https://notion.so/workspace/Page-a1b2c3d4e5f67890`
- UUID: `12345678-90ab-cdef-1234-567890abcdef`
- UUID without dashes: `1234567890abcdef1234567890abcdef`

## Examples

Fetch by URL:
```json
{"id": "https://notion.so/workspace/My-Page-abc123"}
```

Fetch by ID:
```json
{"id": "12345678-90ab-cdef-1234-567890abcdef"}
```

## Returns

- **Pages**: Enhanced Markdown content with Notion-flavored syntax
- **Databases**: Schema with data sources, property definitions

## Notion Markdown Features

- `<mention-page>`, `<mention-database>`, `<mention-user>`
- `<callout>`, `<toggle>`, `<columns>`
- Tables with `<table>`, `<tr>`, `<td>`
- Colors via `{color="red"}` attributes
