---
name: reflect
description: Trigger self-analysis of recent outputs, decisions, or conversation quality
allowed_tools:
  - Read
---

# Self-Reflection Protocol

You are initiating a structured self-reflection. This is an opportunity to assess your recent work, identify potential issues, and improve future responses.

## Reflection Protocol

### 1. Output Quality Assessment
Review recent responses and evaluate:

**Accuracy**
- Did I provide correct information?
- Were my technical claims accurate?
- Did I misunderstand anything?

**Completeness**
- Did I fully address the question?
- Did I miss important aspects?
- Were there follow-up needs I should have anticipated?

**Clarity**
- Was my explanation clear?
- Did I use appropriate level of detail?
- Could I have been more concise?

**Helpfulness**
- Did I actually solve the user's problem?
- Did I provide actionable information?
- Was my response practical?

### 2. Decision Analysis
For significant decisions or recommendations made:

- What alternatives did I consider?
- Why did I choose this approach?
- What assumptions drove my decision?
- What would I do differently with more information?

### 3. Confidence Calibration
Review confidence levels expressed:

- Where was I overconfident?
- Where was I underconfident?
- Did my expressed uncertainty match actual uncertainty?

### 4. Assumption Identification
List assumptions made during recent work:

- Which assumptions were explicit vs. implicit?
- Which assumptions were verified vs. unverified?
- Which assumptions carry the most risk?

### 5. Bias Recognition
Check for potential biases:

- **Anchoring**: Did early information overly influence me?
- **Confirmation**: Did I favor information supporting initial views?
- **Availability**: Did I over-weight recent or vivid examples?
- **Overconfidence**: Did I underestimate uncertainty?

### 6. Improvement Synthesis
Based on reflection:

- What should I do differently going forward?
- What patterns should I watch for?
- What additional information would help?

## Output Format

```markdown
# Self-Reflection Analysis

## Quality Assessment

### Strengths
- [What went well]
- [Effective approaches used]

### Areas for Improvement
- [What could be better]
- [Specific issues identified]

## Key Decisions Reviewed

### Decision: [Description]
- **Choice Made**: [What I decided]
- **Alternatives**: [What else I considered]
- **Rationale**: [Why this choice]
- **Confidence Now**: [Higher/Same/Lower than when made]
- **Would Change?**: [Yes/No and why]

## Assumption Audit
| Assumption | Status | Risk Level |
|------------|--------|------------|
| [Assumption] | [Verified/Unverified] | [H/M/L] |

## Potential Biases Detected
- [Bias type]: [How it may have manifested]

## Confidence Calibration
| Claim | Original Confidence | Calibrated Confidence | Reason |
|-------|--------------------|-----------------------|--------|
| [Claim] | [H/M/L] | [H/M/L] | [Why adjusted] |

## Action Items for Future
1. [Specific improvement to make]
2. [Pattern to watch for]
3. [Information to seek]

## Summary
[Overall assessment and key takeaway]
```

---

Now reflect on: $ARGUMENTS

If no specific topic provided, reflect on the most recent significant work in this conversation.
