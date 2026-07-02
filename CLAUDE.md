# SynthiaFuse DevTeam V2 - Development Instructions

## 🎯 PROJECT MISSION

SynthiaFuse DevTeam V2 is a **hyper-optimized, token-efficient multi-agent development system** built on top of the Claude API. The V1 → V2 rewrite targets:
- **85-90% token reduction** (516k → 49k per operation) — internal benchmarks report 93-97% achieved
- **85-90% cost reduction** ($6-10/day → $0.50-1/day)
- **40-73% performance improvement** (faster responses, higher throughput) — internal benchmarks report 80-97% achieved
- **Maintained or improved quality** (same or better code quality)

Numbers above come from this repo's own `WEEK*-COMPLETION-SUMMARY.md` / `FINAL-PROJECT-SUMMARY.md` benchmark reports, not third-party verification — treat them as internal targets/claims, not guarantees, when reasoning about further changes.

## 🔴 CRITICAL REQUIREMENTS

### Professional Communication
- ALWAYS maintain professional, objective tone
- NEVER use profanity or unprofessional language
- Focus on facts, solutions, clear communication

### White Label Requirement
- NEVER include Claude, Claude Code, or Anthropic references in commits
- NEVER add "Generated with Claude Code" or similar
- ALL commits must be professional and white-labeled

### Token Optimization First
- EVERY feature must consider token efficiency
- EVERY Claude API call must go through the optimization layer (`optimization/`), not called directly
- ALWAYS use the most efficient model for the task (see Model Selection below)
- TRACK all token usage with `optimization/usage-tracker.js`

## 📊 ARCHITECTURE PRINCIPLES

1. **Cache-First Design** — 80%+ cache hit rate target; use Claude's prompt caching (`cache_control: { type: "ephemeral" }`) for static content; warm cache proactively (`optimization/unified-cache-orchestrator.js`).
2. **Intelligent Model Selection** — Haiku for routing/simple queries/formatting/status, Sonnet for code gen/debugging/review/implementation, Opus for architecture/security/complex reasoning. Never use an expensive model for a cheap task.
3. **Lazy Loading** — Load only what's needed, when needed. Agent discovery uses a lightweight metadata index (`agents/agent-metadata.json`, ~200 tokens/agent) instead of loading full agent contexts (see `agents/optimized-agent-discovery.js`).
4. **Smart Orchestration** — Minimize redundant operations; parallelize independent work; share context across agents; synthesize/validate results.
5. **Continuous Optimization** — Track all metrics, learn from execution, adapt weights over time, A/B test optimizations before rolling out.

## 🏗️ CURRENT IMPLEMENTATION STATUS

All 4 planned weeks (17/17 tickets) are implemented, per `FINAL-PROJECT-SUMMARY.md`. This is a working reference implementation, not a scaffold — check `git log` / the summary docs before assuming something is unbuilt.

### Week 1: Foundation & Quick Wins — ✅ COMPLETE
- [x] Token Budget Manager — `optimization/token-budget-manager.js`
- [x] Intelligent Model Selector — `optimization/model-selector.js`
- [x] Optimized Agent Discovery — `agents/optimized-agent-discovery.js`
- [x] Token Usage Tracking — `optimization/usage-tracker.js`
- [x] MongoDB Query Optimization — `devteam/database/optimized-state-manager.js`

### Week 2: Caching Infrastructure — ✅ COMPLETE
- [x] Prompt Cache Manager — `optimization/cache-manager.js`
- [x] Agent Context Caching — `agents/agent-context-cache.js`
- [x] Unified Cache Orchestrator (shared context + warming) — `optimization/unified-cache-orchestrator.js`

### Week 3: Intelligent Orchestration — ✅ COMPLETE
- [x] Intelligent Orchestrator — `orchestration/intelligent-orchestrator.js`
- [x] Parallel Agent Execution — `orchestration/parallel-executor.js`
- [x] Agent Communication Protocol — `orchestration/agent-communication-protocol.js`

### Week 4: Learning & Optimization — ✅ COMPLETE
- [x] Adaptive Model Selection — `optimization/adaptive-model-selector.js`
- [x] Performance Monitoring Dashboard — `monitoring/performance-dashboard.js` (+ `dashboard/` web UI)
- [x] A/B Testing Framework — `optimization/ab-testing-framework.js`
- [x] Continuous Optimization Engine — `optimization/continuous-optimization-engine.js`

**Ongoing work** happens on top of this baseline (see recent commits: React dashboard, Evolve Dev Team integration `optimization/evolve-integration.js`, hybrid V1+V2 audit workflows under `workflows/`). Check `git log --oneline -20` for the latest state before starting new work.

## 📁 PROJECT STRUCTURE

```
synthiafuse-devteam-v2/
├── research/optimization-v2/       # Planning docs: executive summary, architecture design,
│                                    # implementation roadmap, current-system analysis
├── optimization/                   # Token/cost optimization layer
│   ├── token-budget-manager.js     # Hourly/daily/weekly/project budgets, 70/85/100% alerts
│   ├── model-selector.js           # Complexity scoring → Haiku/Sonnet/Opus routing
│   ├── adaptive-model-selector.js  # Learns/auto-tunes selector weights over time
│   ├── cache-manager.js            # Claude prompt caching (ephemeral, 5-min TTL)
│   ├── unified-cache-orchestrator.js # Coordinates prompt + agent + shared-context caches
│   ├── usage-tracker.js            # Per-project/agent/model/task-type usage analytics
│   ├── ab-testing-framework.js     # Experiment config, traffic split, significance testing
│   ├── continuous-optimization-engine.js # Autonomous monitor/tune/experiment loop
│   ├── evolve-integration.js       # Integration point for the "Evolve Dev Team" project
│   ├── usage-data.json             # Persisted usage log (generated data, not hand-edited)
│   ├── examples/                   # Runnable usage examples per component
│   └── __tests__/                  # Jest unit tests
├── orchestration/                  # Task routing and multi-agent coordination
│   ├── intelligent-orchestrator.js # Central coordinator (uses Haiku for routing decisions)
│   ├── parallel-executor.js        # Concurrent task execution with dependency management
│   ├── agent-communication-protocol.js # REQUEST/RESPONSE/NOTIFICATION/STATE_UPDATE messaging
│   └── examples/
├── agents/                         # Agent discovery + context caching
│   ├── optimized-agent-discovery.js # Metadata-based discovery (avoids loading all agents)
│   ├── agent-context-cache.js      # Caches full agent context after first load
│   ├── agent-metadata.json         # Lightweight index: capabilities, technologies, workflow
│   ├── code-reviewer.md            # Example full agent context (referenced via metadata)
│   └── __tests__/
├── devteam/database/
│   └── optimized-state-manager.js  # MongoDB with projection queries + pre-computed summaries
├── monitoring/
│   └── performance-dashboard.js    # Aggregates metrics from all optimization components
├── dashboard/                      # Web UI for the performance dashboard
│   ├── backend/server.js           # Express + Socket.io API, port 4500
│   └── frontend/                   # Vite-based React frontend
├── workflows/                      # Higher-level automation built on the optimization layer
│   ├── audit-evolve-workflow.js
│   ├── self-audit-workflow.js
│   └── shared/                     # ab-testing.js, audit-utilities.js
├── tools/                          # Shell/JS utilities (cache middleware, review automation)
├── scripts/                        # Setup/benchmark/dashboard-lifecycle scripts
├── tests/integration/              # Cross-component integration tests
└── *.md                            # Root-level: WEEKn-COMPLETION-SUMMARY, AB-TEST-*,
                                     # FINAL-PROJECT-SUMMARY, DASHBOARD-QUICKSTART, etc.
```

## 🎯 DEVELOPMENT GUIDELINES

### Component Conventions (observed across `optimization/`, `orchestration/`, `agents/`)
- Every major component is a Node.js class extending `EventEmitter`, constructed with an `options = {}` object (all config overridable, sane defaults baked in).
- Every file starts with a JSDoc header block: purpose, feature list, and (where relevant) the token/cost impact ("BEFORE: X tokens, AFTER: Y tokens, SAVINGS: Z%").
- Components are designed to be composed: e.g. `intelligent-orchestrator.js` wires together `TokenBudgetManager`, `IntelligentModelSelector`, `OptimizedAgentDiscovery`, `UnifiedCacheOrchestrator`, and `TokenUsageTracker` — new orchestration logic should integrate with these rather than duplicate budget/cache/model-selection logic locally.
- Follow existing patterns for new modules: `EventEmitter` subclass, `options` constructor, JSDoc header stating expected token/cost/perf impact, corresponding file in `__tests__/` and (ideally) `examples/`.

### When Writing Code
1. **Token efficiency first** — consider the token cost of every operation; cache wherever possible; route through `model-selector.js` for model choice; log usage via `usage-tracker.js`.
2. **Test-driven** — add/extend Jest tests in the relevant `__tests__/` directory; target 80%+ coverage; include performance/benchmark tests for token-sensitive code (see `scripts/benchmark-week1.js` for style).
3. **Documentation** — JSDoc module header for every new file; keep comments focused on *why*, not *what*.
4. **Error handling** — graceful degradation over hard failure; budget/cache/model components should emit events (`this.emit(...)`) rather than throw where a caller might want to react instead of crash.

### When Using Claude API
```javascript
// ALWAYS route through the optimization layer — never call the Anthropic SDK directly
// in application/orchestration code.

// BAD - Direct call, bypasses budget/cache/model-selection
const response = await anthropic.messages.create({ ... });

// GOOD - Through TokenBudgetManager + IntelligentModelSelector + CacheManager
const model = await modelSelector.selectModel(task);
const budgetOk = await budgetManager.checkBudget(estimatedTokens);
// ... then call the SDK with cache_control on static content, log via usageTracker
```

### Model Selection Guidelines
```javascript
// optimization/model-selector.js: complexity scoring, 0-10 scale
if (complexity <= 2) {
  model = 'haiku';   // routing, formatting, simple queries, status — $0.25/M
} else if (complexity <= 7) {
  model = 'sonnet';  // code gen, debugging, review, implementation — $3/M
} else {
  model = 'opus';    // architecture, security, critical/complex reasoning — $15/M
}
```

### Caching Strategy
```javascript
// Mark static content as cacheable (Claude prompt caching, 5-min TTL, 90% cost savings on hits)
const prompt = [
  { type: "text", text: staticContent, cache_control: { type: "ephemeral" } },
  { type: "text", text: dynamicContent } // never cache per-request/dynamic content
];
```

## 🛠️ DEVELOPMENT WORKFLOW

### Setup
```bash
npm install
cp .env.example .env   # if present; otherwise create .env — see Environment Variables below
```

### Running tests
```bash
npm test                 # jest — runs all *.test.js under __tests__/ and tests/
npm run test:watch       # watch mode
npm run test:coverage    # with coverage report
```
No `jest.config.js` is present — Jest runs with defaults (auto-discovers `__tests__/*.test.js` and `tests/**/*.test.js`). No ESLint/Prettier config files exist in the repo despite `lint`/`format` scripts in `package.json`; running them will use tool defaults until a config is added — don't assume house style rules beyond what's visible in existing code.

### Other scripts
```bash
npm run migrate:agents   # scripts/extract-agent-metadata.js — regenerate agents/agent-metadata.json
npm run warm:cache       # scripts/warm-cache.js
npm run benchmark        # scripts/benchmark-optimization.js
./scripts/start-dashboard.sh   # launches dashboard/backend (port 4500) + frontend
./scripts/stop-dashboard.sh
```

### Environment Variables
Referenced across the codebase (`.env` is gitignored — never commit real values):
- `MONGODB_URI` — required by `devteam/database/optimized-state-manager.js` and `optimization/evolve-integration.js`; used for state, usage history, and knowledge-base integration
- `CLAUDE_API_KEY` — Anthropic API key, consumed via `optimization/evolve-integration.js`
- `CACHE_ENABLED` — set to `'false'` to globally disable caching (defaults to enabled)

## 🧪 TESTING REQUIREMENTS
- **Unit tests** — all optimization components, model selection logic, cache management, budget tracking; target 80%+ coverage.
- **Integration tests** (`tests/integration/`) — end-to-end workflows, API interactions, DB operations, cache performance.
- **Performance tests** — token usage benchmarks, response time, throughput, cache hit rate (`scripts/benchmark-week1.js`, `AB-TEST-*` reports for methodology).
- **Quality tests** — code quality maintained, task success rate, agent accuracy, error rates.

## 📊 METRICS TO TRACK
- **Token**: per operation/project/agent/model, cache hit/miss rate
- **Cost**: per operation/project/day/week/month, budget utilization, savings vs V1
- **Performance**: response times, throughput (ops/hour), cache performance, model-selection accuracy, success rates
- **Quality**: task success rate, code quality scores, agent accuracy, error rates, user satisfaction

`optimization/usage-tracker.js` and `monitoring/performance-dashboard.js` are the source of truth for these — extend them rather than building parallel tracking.

## 🔄 VERSION CONTROL

### Repository Strategy
- **V1**: `synthiafuse-devteam` (original, untouched — reference only, don't modify)
- **V2**: `synthiafuse-devteam-v2` (this repo)
- **Backups**: Digital Ocean Spaces (`scripts/backup-to-do-spaces.js`)

### Commit Standards
```
feat: Add token budget manager with hard limits
fix: Correct cache invalidation timing
perf: Optimize agent metadata loading (90% reduction)
test: Add integration tests for model selector
docs: Update architecture documentation
```
Remember the White Label Requirement above — no Claude/Anthropic/Claude Code references in commit messages.

### Branching
- `main` — stable development
- `feature/*` — new features
- `fix/*` — bug fixes
- `test/*` — experimental changes

## 🧩 REFERENCE SKILLS CATALOG (external — cadralis)

The following is a **reference catalog** of 42 Claude Skills curated by cadralis
(`cadralis.fr`). These are **not implemented in this repository** — they are listed
here as a capability map for inspiration and prioritization. When a task overlaps
one of these areas, consider whether the pattern is worth adapting into a
token-optimized module here rather than reinventing it. Descriptions are
translated/condensed from the source catalog.

> Excluded on purpose: the "L1B3RT4S" jailbreak repository seen in the source
> material is a prompt-injection/jailbreak resource and is intentionally left out —
> do not integrate or take inspiration from it.

### Design & UI
| # | Skill | Category | What it does |
|---|-------|----------|--------------|
| 01 | Frontend Design | Interface design | Bold frontend UIs that avoid the generic "AI-generated UI" look |
| 02 | Color Expert | Color / Identity | Palettes, contrast, accessibility, OKLCH/OKLAB, brand colors |
| 03 | Hand-Drawn Diagrams | Diagram / Visual | Excalidraw-style hand-drawn diagrams with editable links + export |
| 04 | claudedesignskills | 3D / Motion | Advanced visuals: Three.js, GSAP, Framer Motion, Lottie, Spline |
| 05 | Nothing Design Skill | UI system | Nothing Phone design language: monochrome, industrial, typo-led |
| 06 | Canvas-design | Poster / Static | Posters, PNG, PDF, static campaign visuals from real design principles |

### Social Media & Content
| # | Skill | Category | What it does |
|---|-------|----------|--------------|
| 07 | Charlie Hills Social Media | Social system | Full content system: voice, posts, reels, thumbnails, carousels, scoring, analytics |
| 08 | Voice-builder | Brand voice | Interviews you, analyzes samples, builds a coherent, less-"AI" voice doc |
| 09 | Reels-scripting | Reels / TikTok | Deconstructs high-performing Reels, writes new scripts in your voice |
| 10 | Post-scorer | Social analytics | Scores drafts against your past performance to catch weak content pre-publish |
| 11 | Youtube-thumbnail | YouTube thumbnails | Turns a video title into a branded thumbnail prompt, CTR-driven |
| 12 | Hook-generator | Copy / Hooks | Strong hooks via PAS, AIDA, BAB, STAR, SLAY frameworks |

### Marketing & Growth
| # | Skill | Category | What it does |
|---|-------|----------|--------------|
| 13 | Twitter Algorithm Optimizer | X growth | Analyzes/rewrites tweets from Twitter's open-source algorithm insights |
| 14 | Marketing Module | Marketing system | End-to-end marketing: content, SEO, CRO, channels, growth, intelligence, sales |
| 15 | Marketing Skills | Growth / Copy / SEO | CRO, copywriting, SEO, analytics, growth engineering, ad creation, content strategy |
| 16 | Email Marketing Bible | Email marketing | Subject lines, segmentation, lifecycle flows, deliverability, reactivation |
| 17 | Competitive Ads Extractor | Ad intelligence | Pulls competitor ads from ad libraries, analyzes messaging + creative patterns |
| 18 | Social Media Research | Market research | Analyzes sentiment/trends on Reddit & X from real discussions and citations |

### Research & Knowledge
| # | Skill | Category | What it does |
|---|-------|----------|--------------|
| 19 | Daydream | Knowledge exploration | Mines your knowledge base for non-obvious connections, patterns, ideas |
| 20 | Humanizer | Writing cleanup | Removes AI writing tics: repetitive structure, generic phrasing, unnatural rhythm |
| 21 | Anything to NotebookLM | Content repurposing | Converts videos, PDFs, web pages, articles into podcasts, decks, mind maps, quizzes |
| 22 | Deep Research Engine | Deep research | 8-phase research pipeline with credibility scoring and aggregated search |
| 23 | Academic Research Skills | Academic writing | Full academic flow: research, drafting, proofreading, revision, finalization |
| 24 | Vexor Semantic Search | Private search | Local semantic search — find by meaning, not just keywords |

### Media Production
| # | Skill | Category | What it does |
|---|-------|----------|--------------|
| 25 | Remotion Best Practices | Programmatic video | React-based video: animations, subtitles, FFmpeg, Lottie, MP4 render |
| 26 | GPT Image 2 Skill | Image generation | Image generation/editing, variants, style presets, per-platform presets |
| 27 | AI Video Toolkit | Video production | Native AI video pipeline: scripts, demo capture, voice-over, scene review, MP4 |
| 28 | AI Music Album Production | Music production | Full AI album: lyrics, prompts, mixing, mastering, release plan |
| 29 | Generative Media Skills | Multimodal media | Drives image/video/audio generation across multiple providers & platforms |
| 30 | Dev Browser | Web automation | Gives an AI agent browser powers: QA, research, automation, web workflows |

### Dev, Product & Engineering
| # | Skill | Category | What it does |
|---|-------|----------|--------------|
| 31 | Web Scraper | Web scraping | Scrapes sites with strategy selection, browser fallback, API sniffing, validation |
| 32 | Skill Seekers | Skill creation | Converts doc sites, GitHub repos, and PDFs into reusable Claude Skills |
| 33 | Autoresearch Skill | Auto / Iteration | Runs self-improvement workflows: code, deploy, content, marketing, sales, design |
| 34 | PM Skills Marketplace | Product management | Product workflows: discovery, strategy, execution, launch, growth, OKR, PRD, pricing |
| 35 | JTBD Interview Tool | Customer research | Runs Jobs-To-Be-Done interviews, turns insights into briefs and messaging |
| 36 | AI Transformation Discovery | AI consulting | Spots AI opportunities via consulting frameworks, maturity analysis, value-stream mapping |
| 37 | Superpowers | Engineering workflow | Forces brainstorm → plan → write tests → execute → review, like a senior engineer |
| 38 | Repomix | Code context | Compresses an entire repo into one AI-readable file for faster code analysis |
| 39 | Antfu skills | Engineering skills | Production-grade agent skills for modern dev, curated by Anthony Fu |

### Health & Writing
| # | Skill | Category | What it does |
|---|-------|----------|--------------|
| 40 | Personal Health Assistant | Health data | Analyzes medical reports & health metrics for wellness recommendations |
| 41 | DNA Analysis | Genomic analysis | Analyzes 23andMe / AncestryDNA data: health, ancestry, nutrition, pharmacogenomics, longevity |
| 42 | Beautiful Prose | Prose / Writing | Stronger, cleaner, more timeless English prose with less AI "fluff" |

**Most relevant to this project's mission** (token-efficient multi-agent dev): #38 Repomix
(code-context compression — conceptually aligned with this repo's metadata-based agent
discovery), #32 Skill Seekers, #37 Superpowers, #33 Autoresearch, and #30 Dev Browser.

## 📝 REFERENCES

### Essential docs (read in this order for context)
- `research/optimization-v2/00-EXECUTIVE-SUMMARY.md` — full plan
- `research/optimization-v2/QUICK-REFERENCE.md` — quick overview
- `research/optimization-v2/implementation-plan/00-IMPLEMENTATION-ROADMAP.md` — original ticket breakdown
- `FINAL-PROJECT-SUMMARY.md` — what was actually built and the measured results
- `WEEK1-COMPLETION-SUMMARY.md` … `WEEK4-COMPLETION-SUMMARY.md` — per-week detail
- `DASHBOARD-QUICKSTART.md` — running the monitoring dashboard locally
- `AB-TEST-COMPREHENSIVE-ANALYSIS.md` / `FINAL-AB-TEST-REPORT.md` — A/B testing methodology and results

### V1 Codebase
- Located at: `../synthiafuse-devteam/` (sibling directory, not part of this repo)
- Reference for agent contexts and utilities only — don't modify it

### External Resources
- Claude API Docs: https://docs.anthropic.com
- Prompt Caching: https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
- Model Comparison: https://docs.anthropic.com/en/docs/about-claude/models

---

**Let's build the most efficient AI development system ever created.**
