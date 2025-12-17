# get_code_context_exa

Search for code-related context: libraries, SDKs, APIs.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | string | **yes** | Code-focused search query |
| `tokensNum` | number | no | Tokens to return (1000-50000, default: 5000) |

## When to Use

- Finding code examples
- Understanding API usage
- Library documentation
- SDK integration patterns

## Examples

React patterns:
```json
{"query": "React useState hook examples"}
```

Framework integration:
```json
{"query": "Next.js App Router middleware", "tokensNum": 10000}
```

API usage:
```json
{"query": "Stripe payment intent API Node.js"}
```

Low tokens for quick lookup:
```json
{"query": "Tailwind CSS flex utilities", "tokensNum": 2000}
```

## Token Guidelines

- **1000-3000**: Focused, specific queries
- **5000**: Balanced (default)
- **10000-20000**: Complex topics
- **50000**: Comprehensive documentation

## Returns

Code context with examples, documentation snippets, and relevant code patterns.
