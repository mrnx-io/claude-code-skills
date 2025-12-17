# notion-create-pages

Create one or more Notion pages.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pages` | array | **yes** | Array of page objects |
| `parent` | object | no | Parent page/database/data source |

## Page Object

```json
{
  "properties": {"title": "Page Title"},
  "content": "# Heading\nBody content..."
}
```

## Parent Types

```json
{"page_id": "parent-page-uuid"}
{"database_id": "database-uuid"}
{"data_source_id": "collection-uuid"}
```

If omitted, creates private workspace-level page.

## Property Types

- **title**: Always required
- **Date**: `"date:Due Date:start": "2024-12-25"`
- **Checkbox**: `"Is Complete": "__YES__"` or `"__NO__"`
- **Number**: Use JavaScript numbers, not strings

## Examples

Simple page:
```json
{
  "pages": [{
    "properties": {"title": "Meeting Notes"},
    "content": "# Discussion\n\n- Item 1\n- Item 2"
  }]
}
```

Database row:
```json
{
  "parent": {"data_source_id": "abc-123"},
  "pages": [{
    "properties": {
      "Task Name": "Review PR",
      "Status": "In Progress",
      "date:Due Date:start": "2024-12-25"
    }
  }]
}
```

## Content Format

Uses Notion-flavored Markdown (see notion-fetch for syntax).
