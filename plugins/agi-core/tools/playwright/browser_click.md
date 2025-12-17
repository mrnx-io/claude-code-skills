# browser_click

Click an element on the page.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `element` | string | **yes** | Element description or reference |
| `ref` | string | no | Element reference from snapshot |

## Examples

Click by description:
```json
{"element": "Submit button"}
```

Click by reference:
```json
{"ref": "button[0]"}
```

## Finding Elements

1. Use `browser_take_snapshot` to get element references
2. Click using `ref` for precise targeting
3. Or describe element naturally for AI matching

## Returns

Click result with updated page state.
