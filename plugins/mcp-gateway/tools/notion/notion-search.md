# notion-search

Search Notion workspace and connected sources.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | string | **yes** | Semantic search query |
| `query_type` | string | no | "internal" (default) or "user" |
| `page_url` | string | no | Search within specific page |
| `data_source_url` | string | no | Search within data source |
| `teamspace_id` | string | no | Restrict to teamspace |
| `filters` | object | no | Date/creator filters |

## Query Types

- **internal**: Semantic search over workspace + connected sources (Slack, Drive, GitHub, etc.)
- **user**: Search for users by name/email

## Filter Options

```json
{
  "filters": {
    "created_date_range": {
      "start_date": "2024-01-01",
      "end_date": "2025-01-01"
    },
    "created_by_user_ids": ["user-uuid"]
  }
}
```

## Examples

Basic search:
```json
{"query": "project roadmap"}
```

Search with date filter:
```json
{
  "query": "quarterly review",
  "filters": {
    "created_date_range": {"start_date": "2024-01-01"}
  }
}
```

Search users:
```json
{"query": "john@example.com", "query_type": "user"}
```

## Returns

Search results with page titles, URLs, and relevance info.
