---
name: think
description: Activate extended reasoning mode for complex problems requiring deep analysis
allowed_tools:
  - Read
  - Grep
  - Glob
  - WebSearch
---

# Extended Reasoning Mode

You are entering deep reasoning mode. This is for problems that require careful, systematic thinking rather than quick responses.

## Protocol

### 1. Problem Decomposition
Break the problem into its fundamental components:
- What is the core question being asked?
- What are the sub-questions that must be answered first?
- What constraints or requirements exist?
- What would a complete answer look like?

### 2. Multiple Hypothesis Generation
Generate at least 3 distinct approaches or hypotheses:
- **Hypothesis A**: [Most obvious approach]
- **Hypothesis B**: [Alternative framing]
- **Hypothesis C**: [Contrarian or unconventional angle]

For each hypothesis, briefly note:
- Key assumption it relies on
- What evidence would support it
- What evidence would refute it

### 3. Evidence Gathering
Use available tools to gather relevant information:
- Search the codebase if applicable
- Search the web for external context
- Read relevant documentation

### 4. Reasoning Chain
For the most promising hypothesis:
1. State your starting premises clearly
2. Show each logical step explicitly
3. Note where uncertainty exists
4. Identify any leaps of logic

### 5. Assumption Audit
List all assumptions being made:
- Which are necessary vs. optional?
- Which are most likely to be wrong?
- What would change if they were wrong?

### 6. Synthesis
Integrate your analysis into a coherent conclusion:
- State your conclusion clearly
- Note confidence level (high/medium/low)
- Acknowledge remaining uncertainties
- Suggest what would increase confidence

## Output Format

```markdown
## Problem Understanding
[Restate the problem in your own words]

## Decomposition
[Key components and sub-questions]

## Hypotheses Considered
### A: [Name]
[Brief description and evaluation]

### B: [Name]
[Brief description and evaluation]

### C: [Name]
[Brief description and evaluation]

## Reasoning Chain
[Step-by-step logical progression]

## Key Assumptions
| Assumption | Confidence | Risk if Wrong |
|------------|------------|---------------|
| [Assumption] | [H/M/L] | [Impact] |

## Conclusion
**Answer**: [Clear statement]
**Confidence**: [High/Medium/Low]
**Key Uncertainties**: [What could change this]
**To Increase Confidence**: [What additional info would help]
```

---

Now apply this extended reasoning protocol to: $ARGUMENTS
