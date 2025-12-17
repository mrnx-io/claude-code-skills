---
name: Knowledge Persistence
description: Use when needing to preserve information across sessions, create summaries for future reference, or establish continuity ("remember this", "save for later", "create summary")
version: 1.0.0
---

# Knowledge Persistence Techniques

This skill provides methods for preserving and organizing knowledge across sessions and contexts.

## When to Use

Activate this skill when:
- User wants to preserve important information
- Creating documentation for future reference
- Establishing project context that should persist
- Synthesizing learnings from a session
- Building knowledge bases or reference materials

## Core Techniques

### 1. Session Summary Protocol

At end of significant work sessions, create structured summaries:

```markdown
# Session Summary: [Date/Topic]

## Context
[What was being worked on and why]

## Key Decisions Made
1. [Decision]: [Rationale]
2. [Decision]: [Rationale]

## Important Discoveries
- [Finding with implications]
- [Finding with implications]

## Open Questions
- [Unresolved question]
- [Unresolved question]

## Next Steps
1. [Concrete action item]
2. [Concrete action item]

## Files Modified
- `path/to/file.ts`: [What changed and why]
```

### 2. Key Insight Extraction

Transform conversations into reusable knowledge:

```markdown
# Insight: [Concise title]

## The Pattern
[What was learned in generalizable form]

## When It Applies
[Conditions where this insight is relevant]

## Example
[Concrete instance where this was demonstrated]

## Counter-Examples
[When this does NOT apply]
```

### 3. Project Context Documents

Maintain living documents that establish context:

**CLAUDE.md Pattern** (for codebases):
```markdown
# [Project Name]

## What This Is
[One paragraph explanation]

## Key Commands
[How to build/test/run]

## Architecture
[High-level structure]

## Conventions
[Important patterns to follow]

## Current State
[What's working, what's in progress]
```

**CONTEXT.md Pattern** (for ongoing work):
```markdown
# Current Focus

## Active Workstream
[What we're currently doing]

## Recent History
[Last 3-5 significant actions/decisions]

## Important State
[Key variables, configurations, or facts that affect current work]

## Blockers/Questions
[Anything impeding progress]
```

### 4. Knowledge Graph Construction

For complex domains, build structured relationships:

```markdown
# [Domain] Knowledge Map

## Entities
- **[Entity A]**: [Definition]
- **[Entity B]**: [Definition]

## Relationships
- [Entity A] --[relationship]--> [Entity B]
- [Entity A] --[relationship]--> [Entity C]

## Key Properties
- [Entity A].property = [value with source]

## Unresolved
- [What we don't know yet]
```

### 5. Decision Log

Track important decisions with rationale:

```markdown
# Decision Log

## [Date]: [Decision Title]
**Context**: [Why this decision was needed]
**Options Considered**:
1. [Option A]: [Pros/cons]
2. [Option B]: [Pros/cons]
**Decision**: [What was chosen]
**Rationale**: [Why]
**Revisit If**: [Conditions that would warrant reconsidering]
```

## Storage Locations

### For Codebase Projects
- `CLAUDE.md` — Project-level context (root)
- `docs/decisions/` — Decision records
- `docs/architecture/` — System design docs
- Code comments — Inline context

### For Non-Code Work
- Create `.context/` directory with:
  - `summary.md` — Current state
  - `history.md` — Key events
  - `references.md` — Important links/sources

## Retrieval Patterns

When starting a new session:
1. Read `CLAUDE.md` or equivalent context file
2. Check for recent decision logs
3. Look for `CONTEXT.md` or similar state files
4. Ask user about any gaps in understanding

## Best Practices

1. **Be Specific**: "We decided X" > "Things were discussed"
2. **Include Rationale**: Future-you needs to know WHY
3. **Date Everything**: Context ages; timestamps help assess relevance
4. **Link to Sources**: Reference specific files, URLs, conversations
5. **Maintain Actively**: Update docs when things change, not just when created
