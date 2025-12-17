---
name: synthesize
description: Combine information from multiple sources into unified, emergent understanding
allowed_tools:
  - Read
  - Grep
  - WebSearch
---

# Information Synthesis Protocol

You are initiating a synthesis operation. Your goal is to combine diverse information into coherent, integrated understanding that reveals insights not visible in individual pieces.

## Synthesis Protocol

### Phase 1: Information Inventory
Collect all relevant inputs:

1. **From This Conversation**: Key points discussed, decisions made, questions raised
2. **From Documents**: Relevant files if applicable
3. **From Research**: External context if needed
4. **From Code**: Relevant patterns if applicable

Create a comprehensive list of information to synthesize.

### Phase 2: Pattern Detection
Look for connections across inputs:

1. **Recurring Themes**: What ideas appear multiple times?
2. **Structural Similarities**: Do different domains share patterns?
3. **Causal Chains**: How do pieces connect causally?
4. **Tensions**: Where do different pieces conflict?
5. **Gaps**: What's missing that should be there?

### Phase 3: Integration
Weave pieces together:

1. **Resolve Conflicts**: Determine which perspective holds or how to reconcile
2. **Build Hierarchy**: Organize from fundamental to derived
3. **Create Narrative**: Tell a coherent story that encompasses all pieces
4. **Extract Principles**: Identify underlying rules or patterns

### Phase 4: Emergence Detection
Identify insights that arise from combination:

1. What do we now understand that no single piece revealed?
2. What predictions can we make based on integrated understanding?
3. What actions does integrated understanding suggest?
4. What new questions emerge?

## Output Format

```markdown
# Synthesis: [Topic/Scope]

## Executive Summary
[2-3 sentences capturing the integrated understanding]

## Information Landscape

### Sources Integrated
| Source | Type | Key Contribution |
|--------|------|------------------|
| [Source] | [Type] | [Main insight] |

### Coverage Assessment
- **Well-covered areas**: [Topics with multiple sources]
- **Sparse areas**: [Topics with limited information]
- **Gaps**: [Important topics with no information]

## Core Patterns

### Pattern 1: [Name]
**Observation**: [What we see]
**Instances**: [Where this appears]
**Significance**: [Why it matters]

### Pattern 2: [Name]
[Same structure...]

## Integrated Understanding

### The Big Picture
[Narrative synthesis of all information — how pieces fit together]

### Key Relationships
[How elements connect to each other]

### Hierarchy of Ideas
1. **Foundational**: [Most fundamental concepts]
   - **Derived**: [Concepts that build on foundational]
     - **Specific**: [Concrete instances]

## Tensions & Resolutions

### Tension 1: [Description]
**Conflict**: [A says X, B says Y]
**Resolution**: [How to reconcile]
**Remaining Uncertainty**: [What we still don't know]

## Emergent Insights

### Insight 1: [Title]
**The insight**: [What combining information reveals]
**Why not obvious**: [Why individual pieces didn't show this]
**Implications**: [What this means]

### Insight 2: [Title]
[Same structure...]

## Predictions & Implications
Based on integrated understanding:
1. [Prediction/implication with confidence level]
2. [Prediction/implication with confidence level]

## Recommended Actions
1. [Action suggested by synthesis]
2. [Action suggested by synthesis]

## Open Questions
[New questions that emerge from synthesis]
```

---

Now synthesize: $ARGUMENTS

If no specific topic provided, synthesize the key themes and insights from this entire conversation.
