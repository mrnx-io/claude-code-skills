---
name: Self-Reflection & Analysis
description: Use when needing to assess output quality, identify potential errors, calibrate confidence, or when user requests review ("check your work", "are you sure?", "what could be wrong?")
version: 1.0.0
---

# Self-Reflection & Analysis

This skill provides frameworks for self-assessment, error detection, and confidence calibration.

## When to Use

Activate this skill when:
- User questions accuracy or completeness
- High-stakes decisions or outputs
- Complex reasoning where errors are likely
- After generating significant content
- Explicitly requested to review/verify

## Core Frameworks

### 1. Output Quality Assessment

After generating a response, evaluate:

```markdown
## Self-Assessment

### Completeness Check
- [ ] Addressed all parts of the question/request
- [ ] Considered edge cases
- [ ] Provided sufficient context/explanation
- [ ] Included relevant caveats/limitations

### Accuracy Check
- [ ] Claims are supported by evidence/reasoning
- [ ] Technical details are correct
- [ ] No contradictions within response
- [ ] Consistent with established facts

### Usefulness Check
- [ ] Actionable (if action was requested)
- [ ] Appropriate level of detail
- [ ] Clearly structured
- [ ] Addresses underlying need (not just surface question)

### Issues Found
[List any concerns identified]

### Recommended Revisions
[What should be changed]
```

### 2. Confidence Calibration

Express uncertainty appropriately:

```markdown
## Confidence Assessment

### Claim-by-Claim Analysis
| Claim | Confidence | Basis | What Would Change This |
|-------|------------|-------|----------------------|
| [Claim 1] | High/Med/Low | [Why] | [Evidence that would shift] |
| [Claim 2] | High/Med/Low | [Why] | [Evidence that would shift] |

### Overall Confidence
[High/Medium/Low] because [justification]

### Key Uncertainties
- [What I'm least sure about and why]
- [What I'm assuming but haven't verified]
```

**Calibration Guidelines:**
- **High Confidence**: Would bet significant resources, based on verified information or well-established principles
- **Medium Confidence**: Reasonable belief but could be wrong, based on inference or partial information
- **Low Confidence**: Uncertain, speculative, or based on limited data

### 3. Assumption Identification

Surface hidden assumptions:

```markdown
## Assumption Audit

### Explicit Assumptions
[Assumptions I stated clearly]

### Implicit Assumptions
[Assumptions I made without stating]
- [Assumption]: [Why I made it] | [How to verify]
- [Assumption]: [Why I made it] | [How to verify]

### Domain Assumptions
[Background knowledge I relied on]
- [Field/topic]: [What I assumed was true]

### Risky Assumptions
[Assumptions most likely to be wrong or consequential if wrong]
```

### 4. Bias Recognition

Check for systematic errors:

```markdown
## Bias Check

### Availability Bias
Am I overweighting easily recalled examples?
[Assessment]

### Confirmation Bias
Did I seek information confirming initial hypothesis?
[Assessment]

### Anchoring
Am I stuck on early information or framing?
[Assessment]

### Recency Bias
Am I overweighting recent context vs. fundamental facts?
[Assessment]

### Authority Bias
Am I accepting claims because of source rather than evidence?
[Assessment]

### Identified Risks
[Any biases that may have affected this output]
```

### 5. Error Analysis Framework

When something went wrong:

```markdown
## Error Analysis

### What Happened
[Factual description of the error]

### Root Cause Analysis
- Immediate cause: [Direct reason for error]
- Contributing factors: [What enabled/allowed it]
- Systemic cause: [Underlying pattern or gap]

### Error Category
- [ ] Factual error (wrong information)
- [ ] Logical error (flawed reasoning)
- [ ] Omission error (missing important element)
- [ ] Communication error (misunderstood request)
- [ ] Scope error (wrong level of detail/focus)

### Prevention
[How to avoid this type of error in future]

### Correction
[What the correct answer/approach should be]
```

### 6. Pre-Output Checklist

Before finalizing significant outputs:

```markdown
## Pre-Submission Check

1. **Core Question**: Does this actually answer what was asked?
2. **Accuracy**: Have I verified factual claims?
3. **Completeness**: Are there obvious gaps?
4. **Clarity**: Would a reader understand this?
5. **Appropriate Confidence**: Am I overclaiming or underclaiming?
6. **Actionability**: Can the user act on this?
7. **Edge Cases**: Have I considered what could go wrong?
```

## Usage Patterns

### Quick Reflection (for routine outputs)
After responding, briefly consider: "What's the weakest part of this response?"

### Standard Reflection (for important outputs)
Apply Pre-Output Checklist + Confidence Assessment

### Deep Reflection (for high-stakes or complex outputs)
Full assessment using multiple frameworks above

## Triggering Phrases

Automatically engage this skill when user says:
- "Are you sure?"
- "Check your work"
- "What could be wrong with this?"
- "How confident are you?"
- "Review this"
- "Double-check"
