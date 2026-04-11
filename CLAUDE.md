# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

This is an **AI-powered multi-agent game development orchestration system (v5.0)** — a documentation-only framework that defines roles, workflows, and templates for a simulated Unity/C# game development team. There is no build system, no source code to compile, and no test runner. All 93 files are Markdown (plus one JSON config).

## Quick Commands

All commands use the `/gd:` prefix and are defined in `rules/rule_commands.md`:

| Category | Commands |
|----------|----------|
| Requirements | `/gd:feature`, `/gd:bugfix`, `/gd:optimize`, `/gd:config`, `/gd:test`, `/gd:doc`, `/gd:review`, `/gd:research`, `/gd:new` |
| Management | `/gd:status`, `/gd:progress`, `/gd:resume`, `/gd:plan`, `/gd:tech`, `/gd:kb`, `/gd:history`, `/gd:stats`, `/gd:issues` |
| Iteration | `/gd:reflect`, `/gd:iterate`, `/gd:audit` |

Commands are shortcuts into the workflow — the Producer Agent retains final routing authority.

## Agent Pipeline Architecture

The system routes every requirement through an 8-role pipeline defined under `rules/agents/`:

```
Producer (制作人) → Project Manager (项目管理) → Planner (策划) [→ UX if UI feature]
  → Lead Programmer (主程) → Developer (程序) → QA → Planner (delivery)
```

Each agent is implemented as:
- An entry file (`rules/agents/NN_AgentName.md`, ~30 lines)
- Step files (`rules/agents/NN_AgentName/step_NN.md`)
- Template files (`rules/agents/NN_AgentName/template_NN.md`)
- An iteration record (`rules/agents/NN_AgentName/iteration_record.md`)

This microfile architecture achieves ~76% token savings by loading only what is needed.

## Requirement Types and Routing

Defined in `rules/rule_workflow.md`. Nine types: `FEATURE`, `FEATURE_UI`, `OPTIMIZE`, `BUGFIX`, `TEST`, `DOC`, `REVIEW`, `CONFIG`, `RESEARCH`. Each has a specific agent flow path. Key shortcuts:
- `BUGFIX` → Developer → QA (skips planning)
- `TEST` → QA directly
- `FEATURE_UI` → includes UX Agent

## Quality Gates

Three mandatory checkpoints (`rules/rule.md`):
- **Gate 1** (Planner → Lead Dev): 21 design-completeness checks
- **Gate 2** (Lead Dev → Developer): 18 architecture-feasibility checks
- **Gate 3** (Developer → QA): 27 code-quality + acceptance-criteria checks

The Developer must self-identify ≥3 problems in their own code before passing Gate 3 (adversarial review).

## Smart Probe (Requirement Clarification)

When a requirement arrives, the Planner scores it on 5 dimensions (User Value, Scope, Interaction, Numeric Parameters, Dependencies):
- ≥20 pts → implement directly
- 15–19 pts → self-supplement assumptions
- <15 pts → ask at most 3 clarifying questions

## Scale-Adaptive Execution

| Size | Trigger | Mode |
|------|---------|------|
| XS/S/M | ≤300 lines | Standard |
| L | Multi-module or 300+ lines | Master-slave (`rules/agents/主从Agent架构.md`) |
| XL | New system | Deep mode with extra reviews |

Master-slave tasks store state under `.GameDev/{feature}/_subtasks/`.

## Runtime State Files

When work is in progress, state is tracked in:
- `.GameDev/需求池.md` — global requirement pool
- `.GameDev/进度看板.md` — current progress board
- Per-requirement YAML frontmatter documents recording interruption point for context recovery

## Rule Hierarchy

Defined in `rules/rule_iteration.md`:
- 🔴 **Immutable Core** (I-001–I-009): e.g., 100% AC coverage, never delete user code
- 🟡 **Iterable Process**: Flow paths, gates, guard rules
- 🟢 **Project-Adaptive**: Naming conventions, knowledge base entries

## Guard System

`rules/rule_guards.md` defines event-driven guards:
- **Pre-action (G-001–G-010)**: Block dangerous operations (e.g., G-001 protects Unity `.meta` files, G-006 requires dependency check before deletion)
- **Post-action (G-101+)**: Detect `Debug.Log` residue, `TODO/FIXME/HACK` comments, stale documentation

## Unity/C# Knowledge Packages

Domain-specific reference material lives in `rules/skills/`:
- `unity/monobehaviour-patterns.md`
- `unity/ui-toolkit-patterns.md`
- `testing/unity-test-framework.md`
- `csharp/null-safety.md`
- `architecture/event-system.md`
