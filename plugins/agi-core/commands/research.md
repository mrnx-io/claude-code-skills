---
name: research
description: Launch comprehensive multi-source investigation on a topic
allowed_tools:
  - Read
  - Grep
  - Glob
  - WebFetch
  - WebSearch
  - mcp__plugin_mcp-gateway_gateway__invoke
---

# Deep Research Protocol

You are initiating a comprehensive research investigation. Your goal is to gather information from multiple sources, cross-validate findings, and produce a structured report.

## Research Protocol

### Phase 1: Scope Definition
Before researching, establish:
1. **Research Question**: What specifically are we trying to answer?
2. **Success Criteria**: What constitutes a complete answer?
3. **Source Types**: What sources are relevant? (web, docs, code, papers)
4. **Constraints**: Time sensitivity, source requirements, depth needed

### Phase 2: Multi-Source Gathering

Execute research across all relevant source types:

**Web Sources**:
- Use WebSearch for broad queries
- Use WebFetch for specific URLs
- Use MCP gateway to invoke exa for code-related context

**Documentation Sources**:
- Use MCP gateway to invoke context7 for library documentation
- Search official docs for relevant topics

**Codebase Sources** (if applicable):
- Use Grep to find relevant patterns
- Use Glob to locate related files
- Use Read to examine implementations

### Phase 3: Source Analysis
For each source, extract:
1. **Key claims** with direct quotes where helpful
2. **Source reliability** (official docs > peer-reviewed > blogs > forums)
3. **Recency** (when was this written/updated?)
4. **Consensus** (do other sources agree?)

### Phase 4: Cross-Validation
- Identify claims supported by multiple sources
- Flag contradictions between sources
- Note claims with only single-source support
- Assign confidence levels

### Phase 5: Synthesis & Report
Integrate findings into a structured report.

## Output Format

```markdown
# Research Report: [Topic]

## Executive Summary
[2-3 sentence answer to the research question]

## Research Scope
- **Question**: [Specific question investigated]
- **Sources Consulted**: [Number and types]
- **Date**: [Research date]

## Key Findings

### Finding 1: [Title]
**Confidence**: High/Medium/Low
**Sources**: [List with links]
**Details**: [Explanation]

### Finding 2: [Title]
**Confidence**: High/Medium/Low
**Sources**: [List with links]
**Details**: [Explanation]

[Additional findings...]

## Source Analysis
| Source | Type | Reliability | Recency | Key Contribution |
|--------|------|-------------|---------|------------------|
| [URL/Name] | [Type] | [H/M/L] | [Date] | [What it provided] |

## Conflicts & Resolutions
| Issue | Source A | Source B | Resolution |
|-------|----------|----------|------------|
| [Conflict] | [View] | [View] | [How resolved] |

## Knowledge Gaps
- [Question that couldn't be answered]
- [Area needing more research]

## Recommendations
Based on findings:
1. [Actionable recommendation]
2. [Actionable recommendation]

## Sources
[Full list of sources with links]
```

---

Now begin comprehensive research on: $ARGUMENTS
