---
name: Advanced Reasoning Frameworks
description: Use when facing complex problems requiring structured thinking, multi-step analysis, or when user requests deep reasoning ("think deeply", "analyze thoroughly", "reason through")
version: 1.0.0
---

# Advanced Reasoning Frameworks

This skill provides systematic approaches to complex problem-solving and analysis.

## When to Use

Activate this skill when:
- Facing complex, multi-faceted problems
- User requests deep analysis or thorough reasoning
- Problems have unclear solutions or multiple valid approaches
- Decisions have significant consequences
- Standard responses feel insufficient for the complexity

## Core Frameworks

### 1. First Principles Decomposition

Break problems down to fundamental truths, then rebuild:

```
1. IDENTIFY the problem/question clearly
2. LIST all assumptions being made
3. CHALLENGE each assumption: "Is this necessarily true?"
4. IDENTIFY fundamental truths that cannot be reduced further
5. REBUILD solution from these foundations
```

**Example application**: "Why is X the way it is?" → Don't accept conventional explanations. Trace back to irreducible facts.

### 2. Chain-of-Thought Reasoning

Make thinking explicit and sequential:

```
Given: [State what we know]
Step 1: [First logical inference]
Therefore: [Conclusion from step 1]
Step 2: [Next logical inference building on step 1]
Therefore: [Conclusion from step 2]
...
Final conclusion: [Synthesis of all steps]
Confidence: [High/Medium/Low with justification]
```

### 3. Tree-of-Thought Exploration

Explore multiple reasoning paths simultaneously:

```
Problem: [State problem]
├── Path A: [First approach]
│   ├── Sub-analysis A1: [Result]
│   └── Sub-analysis A2: [Result]
│   └── Path A Conclusion: [Assessment]
├── Path B: [Alternative approach]
│   ├── Sub-analysis B1: [Result]
│   └── Sub-analysis B2: [Result]
│   └── Path B Conclusion: [Assessment]
└── Synthesis: [Which path(s) most promising and why]
```

### 4. Adversarial Thinking (Steel-Man)

Before critiquing, strengthen the opposing view:

```
1. STATE the position/idea being analyzed
2. STEEL-MAN: Make the strongest possible case FOR this position
   - What are its best arguments?
   - Under what conditions would it be correct?
   - What would a brilliant advocate say?
3. Only THEN identify weaknesses
4. CONCLUDE with balanced assessment
```

### 5. Bayesian Updating

Update beliefs based on evidence:

```
Prior belief: [Initial probability/confidence]
New evidence: [What we've learned]
Likelihood: [How likely is this evidence if belief is true vs false?]
Updated belief: [New probability/confidence after considering evidence]
Remaining uncertainty: [What would change our belief further?]
```

### 6. Analogical Reasoning

Map from known domains to unknown:

```
Source domain: [Well-understood system/situation]
Target domain: [Problem we're trying to solve]
Structural mapping:
  - [Element A in source] → [Element X in target]
  - [Element B in source] → [Element Y in target]
  - [Relationship in source] → [Predicted relationship in target]
Inferences: [What does the analogy suggest?]
Limitations: [Where does the analogy break down?]
```

## Quality Checks

After reasoning through a problem, verify:

1. **Completeness**: Have all aspects been considered?
2. **Consistency**: Do conclusions follow logically from premises?
3. **Assumptions**: Are they stated and justified?
4. **Alternatives**: Were other explanations/solutions considered?
5. **Confidence**: Is uncertainty appropriately expressed?

## Output Format

When using these frameworks, structure output as:

```
## Analysis

### Problem Understanding
[Clear statement of what we're solving]

### Approach
[Which framework(s) being applied and why]

### Reasoning
[Step-by-step application of framework]

### Conclusion
[Clear answer/recommendation]

### Confidence & Caveats
[How certain, what could change this, what we don't know]
```
