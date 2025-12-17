# resolve-library-id

Convert a package/library name to a Context7-compatible library ID.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `libraryName` | string | **yes** | Library name to search (e.g., "react", "next.js") |

## When to Use

**MUST** call before `get-library-docs` unless user provides ID in `/org/project` format.

## Examples

```json
{"libraryName": "react"}
```

```json
{"libraryName": "next.js"}
```

```json
{"libraryName": "tailwindcss"}
```

## Returns

List of matching libraries with:
- Library ID (e.g., `/vercel/next.js`)
- Name
- Description
- Documentation coverage (Code Snippet counts)
- Source reputation
- Benchmark Score (quality indicator, 100 = highest)

## Selection Process

Choose based on:
1. Name similarity (exact matches prioritized)
2. Description relevance
3. Higher Code Snippet counts
4. High/Medium reputation
5. Higher Benchmark Score
