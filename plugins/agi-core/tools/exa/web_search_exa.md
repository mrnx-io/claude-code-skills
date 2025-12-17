# web_search_exa

AI-powered web search with content extraction.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | string | **yes** | Search query |
| `numResults` | number | no | Results count (default: 8) |
| `type` | string | no | "auto" (default), "fast", "deep" |
| `livecrawl` | string | no | "fallback" (default) or "preferred" |
| `contextMaxCharacters` | number | no | Max context chars (default: 10000) |

## Search Types

- **auto**: Balanced search (default)
- **fast**: Quick results
- **deep**: Comprehensive search

## Examples

Basic search:
```json
{"query": "Next.js 16 new features"}
```

Deep search with more results:
```json
{
  "query": "React Server Components best practices",
  "numResults": 15,
  "type": "deep"
}
```

Recent/live content:
```json
{
  "query": "latest TypeScript updates 2025",
  "livecrawl": "preferred"
}
```

## Returns

Search results with:
- Title
- URL
- Content summary (optimized for LLMs)
- Relevance score
