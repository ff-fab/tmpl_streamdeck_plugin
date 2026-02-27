---
agent: Plan
description: 'Analyze a provided project repository that was scaffolded using this template repo. Identify any deviations from the template structure and configuration, collect best practices and recommend updates to this template for future projects.'
---

# Template Update Analysis

Analyze the provided project repository (in `tmp` if not specified) that was scaffolded using this template repo. Identify any deviations from the template structure and configuration, collect best practices and recommend updates to this template for future projects.

## Context Gathering & Analysis

1. Analyze the scaffolded project and understand its purpose and business logic first. This will help you understand the rationale behind any deviations from the template.
2. Try to identify newly introduced tools, extensions, configurations, or patterns that are not present in the template but could be beneficial for future projects.
3. Also check specifically for any changes to scaffolded files that might be bug fixes or quality improvements that should be backported to the template.
4. Also check if any upgrade in dependencies or tools was made that should be reflected in the template, and check for newest available versions.

## Output Format

### Project Overview

Start with a brief paragraph stating the scaffolded project's purpose, tech stack, and
any context that explains why deviations from the template may exist. This sets the
stage before presenting findings and avoids premature judgments.

### Findings Summary

Present all findings in a single markdown table for quick scanning. Each row gets a
category-prefixed ID so findings can be referenced by ID when deciding on next steps.

**ID prefixes:**

| Prefix | Category | Meaning |
|--------|----------|---------|
| `DEV`  | Deviation | Structural or configuration drift from the template |
| `PAT`  | Pattern | New tool, extension, config, or pattern worth adopting |
| `FIX`  | Backport | Bug fix or quality improvement that should flow back to the template |
| `DEP`  | Dependency | Version bump or new dependency to reflect in the template |

**Table format:**

```markdown
| ID      | Pri | File(s)               | Finding                              | Recommendation          |
|---------|-----|-----------------------|--------------------------------------|-------------------------|
| FIX-001 | P1  | `__init__.py.jinja`   | Absolute import breaks editable installs | Switch to relative import from `._version` |
| PAT-001 | P2  | `.vscode/mcp.json`    | Added Context7 MCP server config     | Adopt — useful for all projects |
| DEP-001 | P2  | `pyproject.toml`      | pytest bumped 7.4 → 8.1              | Update template, latest is 8.3 |
| DEV-001 | P3  | `Taskfile.yml`        | Custom `deploy` task not in template  | Ignore — project-specific |
```

**Priority levels:**

- **P1** — Critical: breaks scaffolding, causes errors, or is a correctness bug
- **P2** — Recommended: clear improvement for future projects
- **P3** — Nice-to-have: minor polish, cosmetic, or project-specific (often "ignore")

### Detailed Findings

Expand each finding from the summary table into a detailed block. Use the finding ID as
the heading so it's easy to cross-reference.

````markdown
#### {ID}: {Finding title}

**Context:** What was observed in the scaffolded project, with file and line references.

**Recommendation:** Specific, concrete changes to the template. Show before/after
snippets or describe the diff — no vague suggestions.

**Teaching moment** _(include when there's a genuine learning opportunity):_

1. **What it does** — brief factual description of the pattern or issue
2. **Why this approach** — the reasoning behind the recommendation
3. **Ecosystem context** — reference PEPs, RFCs, official docs by number
4. **Principle connections** — link to SOLID, DRY, GoF design patterns:
   - Name the pattern: Strategy, Factory, Observer, Adapter, etc.
   - Explain which SOLID principle applies (SRP, OCP, LSP, ISP, DIP)
   - Note if DRY/WET trade-offs are relevant
5. **Gotcha** — common pitfall or "watch out for this"

**Language idiom note** _(include when a Python/TypeScript idiom applies):_

Flag opportunities to use language idioms, even in correct code:

- **Python:** walrus operator, structural pattern matching, `itertools`, protocols vs
  ABCs, PEP references
- **TypeScript:** discriminated unions, `satisfies`, `const` assertions, branded types
- Explain _when_ the idiom helps and _when_ it hurts readability
````

Not every finding needs full teaching depth or an idiom note. Reserve them for findings
where there's a genuine learning opportunity. If a finding is straightforward (e.g., a
version bump), Context + Recommendation is sufficient.

### Recommended Actions

Close with a prioritized action list that references finding IDs, grouped by urgency:

```markdown
**Resolve immediately (P1):**
1. FIX-001 — Fix relative import in `__init__.py.jinja`
2. FIX-002 — ...

**Batch together (P2):**
3. PAT-001 + PAT-003 — Adopt MCP config and pre-commit hook (independent, can be one commit)
4. DEP-001 + DEP-002 — Bump pytest and ruff versions

**Evaluate later (P3):**
5. DEV-001 — Project-specific, no template action needed
```

Note which findings can be addressed independently vs. have dependencies on each other.

## Guidelines

- Be specific: reference exact files and line numbers in the scaffolded project
- Propose concrete template changes, not vague suggestions
- Teaching should feel natural — weave it into the recommendation rationale
- If the scaffolded code improved on the template, say so and explain _why_ it's good
- Acknowledge trade-offs when recommending changes
- When a finding is project-specific and not worth backporting, still list it (as
  `DEV-*`, P3) with a clear "ignore" recommendation so nothing is silently skipped
