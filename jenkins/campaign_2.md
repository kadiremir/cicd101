# Jenkins101 — Curriculum Plan v2 (Canvas-First, Dimension-Aware)

A direct-manipulation curriculum for the Jenkins101 teaching game. Every level is a
canvas the player **builds, wires, runs, breaks, and fixes** — never a quiz. Each
proposed level carries an explicit **2D vs 3D** decision, because the dimension is a
UX choice: 3D is spent only where the concept is *inherently* spatial, topological,
concurrent, or about physical machine separation. Everything else stays flat.

This file is self-contained: it opens with a review of Chapter 1 as it exists today,
maps the full Jenkins topic surface against what Chapter 1 covers, then proposes the
ordered sequence of levels that follow.

---

## 1. Review — Chapter 1

> **Update:** the repo previously shipped two parallel "Chapter 1" tracks. The
> foundations track (`chapter-1-getting-jenkins-running.js` and
> `chapter-0-foundations.js`) has since been **removed**; `chapter-1-pipeline-basics.js`
> is now the single, canonical Chapter 1 loaded by both `index.html` and
> `campaign.html`. The review below concerns that canvas chapter.

- **`chapter-1-pipeline-basics.js`** (wired into the canvas engine `campaign.html`,
  which is literally headed *"Chapter 1 · pure 2D Canvas (no Three.js)"*) — five
  **canvas** levels. This is the true canvas Chapter 1 and the template the rest of
  the curriculum extends, so it is the focus of this review.

### Jenkins concepts actually taught (Pipeline Basics)

| Level | Concept |
|-------|---------|
| 1.1 First Commit | A pipeline is **stages run in order**; a commit flows stage→stage, left to right; green = every stage passed. |
| 1.2 Add a Test | Stages can **fail**; a red stage **halts everything downstream**; fast feedback is the point of CI. (break-and-fix via a "Bug in code" toggle) |
| 1.3 Steps Inside a Stage | A stage contains **steps** that run **top to bottom**; ordering matters (`npm install` before `npm run build`). |
| 1.4 Keep the Artifact | `post { success { archiveArtifacts … } }` — **post conditions** and **artifacts**; output saved to a "vault" instead of discarded. |
| 1.5 Clean Up Every Time | `post { always { … } }` runs after **every** build, pass or fail — the home for notifications and cleanup. |

### Canvas interaction & dimension

- **Dimension: 2D** (HTML5 canvas, no Three.js — confirmed in `campaign.html`).
- The player **adds stage modules from a palette onto a horizontal rail**, **reorders
  steps** with arrows, flips mechanic toggles (`bug`, `archive`, `notify`), and presses
  **Run Build** to watch a commit-orb travel the rail left→right with particle flow;
  stages light **green/red** and the artifact drops into a vault.
- Core mechanic: **build → run → break (bug on) → fix (bug off) → re-run green.** Pure
  direct manipulation, fully canvas-native.

### Difficulty & completion time

- **Difficulty: Beginner.** One new idea per level, generous coaching, ≤3 board actions
  to clear a goal.
- **~3–5 min per level; ~15–25 min for the chapter.**

### Left implicit (hooks later levels must pick up)

- **Where stages run is invisible.** There is a single implied executor — no `agent`,
  no machines. → seeds the Agent Directive and Distributed Builds.
- **The declarative frame is hidden.** Stages float free; the player never sees
  `pipeline { agent … stages { … } }`. → seeds the Declarative Skeleton.
- **No real SCM.** "Commit" and "Checkout" are stubs with no repo, branch, or trigger.
  → seeds SCM Checkout and Triggers.
- **Post covers only `success`/`always`.** `failure`/`unstable`/`changed` are implied.
- **No parameters, environment, credentials, or `when`.** The pipeline is static.
- **The path is strictly linear** — no concurrency. → seeds Parallel Stages / Matrix.
- **The artifact just "lands in a vault"** — no fingerprinting, retention, or promotion.

> **Note on the foundations track:** two of the *Getting Jenkins Running* scenes
> ("Sort every scenario into the right job type", "Match the 4 Manage Jenkins tiles")
> are sorting/matching interactions that edge toward the quiz pattern the design rules
> forbid. The proposals below deliberately keep every new level in the build/wire/run/
> break-and-fix mode instead.

---

## 2. Jenkins Coverage Map

What a learner should eventually master, and where it stands after Chapter 1.

| Topic | Status after Ch1 | Where it lands |
|-------|------------------|----------------|
| Pipelines = ordered stages | ✅ Covered (1.1) | — |
| Stages & steps | ✅ Covered (1.1, 1.3) | — |
| Stage failure halts downstream | ✅ Covered (1.2) | — |
| Post conditions | ◑ Partial — `success`/`always` only (1.4, 1.5) | L7 (expanded) |
| Artifacts (archive) | ◑ Partial — archive only (1.4) | L16, L25 |
| Freestyle jobs | ◑ Foundations track only | (recap in L27 plugins) |
| Declarative skeleton (`pipeline{}`) | ❌ Hidden | L1 |
| Declarative vs Scripted / Groovy | ❌ | L2 |
| `agent` directive | ❌ | L3 |
| `environment` block | ❌ | L4 |
| Build parameters | ❌ | L5 |
| Conditional stages (`when`) | ❌ | L6 |
| Manual approval (`input`) | ❌ | L8 |
| SCM checkout / Git | ❌ (stub) | L9 |
| Triggers: poll, cron, webhook | ❌ | L10 |
| Jenkinsfile from SCM | ❌ | L11 |
| Distributed builds (controller/agents) | ❌ | L12 |
| Labels & node selection | ❌ | L13 |
| Docker container agents | ❌ | L14 |
| Ephemeral / cloud agents | ❌ | L15 |
| Test reports & trends | ❌ | L16 |
| Coverage & quality gates | ❌ | L17 |
| Parallel stages | ❌ | L18 |
| Matrix builds | ❌ | L19 |
| Credentials & secrets | ❌ | L20, L21 |
| Multibranch pipelines | ❌ | L22 |
| PR builds & organization folders | ❌ | L23 |
| Shared libraries | ❌ | L24 |
| Deploy stages, environments, promotion | ❌ | L25 |
| Blue-green / canary / rollback | ❌ | L26 |
| Plugins & the ecosystem | ◑ Foundations mention | L27 |
| Notifications / ChatOps | ❌ | L28 |
| Configuration as Code (JCasC) | ❌ | L29 |
| Security, RBAC, folders | ❌ | L30 |
| Monitoring, logs, troubleshooting | ❌ | L31 |
| Best-practice capstone | ❌ | L32 |

After Chapter 1 the learner owns the **shape** of a pipeline. Everything that makes a
pipeline *real* — where it runs, what triggers it, what it consumes, how it scales, and
how it ships — is still open.

---

## 3. Proposed Level Sequence

Ordered for a smooth difficulty climb while maximizing coverage. **3D is earned, not
scheduled** — it appears only at L12, L15, L18, L19, L22, L26, interleaved among 2D
levels so the curve never lurches and depth always carries information the flat version
can't.

The 32 levels group into **9 chapters** (continuing the existing `CAMPAIGN.md` numbering,
which ends at the canvas Chapter 1 / Pipeline Basics). Each chapter is one coherent slice
of Jenkins and ends on a level that earns the next chapter.

| Ch | Title | Levels | One-line arc | Has 3D? |
|----|-------|--------|--------------|---------|
| 2 | Declarative Basics | L1–L8 | From loose stages to a fully-shaped declarative pipeline: skeleton, scripted escape hatch, agent, env, params, `when`, post, `input`. | — |
| 3 | Source & Triggers | L9–L11 | Make the pipeline real: check out Git, decide what starts a build, move the Jenkinsfile into the repo. | — |
| 4 | Distributed Builds | L12–L15 | Where work runs: controller→agents, label routing, container agents, on-demand cloud agents. | L12, L15 |
| 5 | Quality & Concurrency | L16–L19 | Make builds fast and trustworthy: test reports, coverage gates, parallel stages, matrix builds. | L18, L19 |
| 6 | Credentials & Secrets | L20–L21 | Store secrets safely and inject them without leaking. | — |
| 7 | Multibranch & Reuse | L22–L24 | Scale across branches and repos, then factor out the duplication: multibranch, PRs/org folders, shared libraries. | L22 |
| 8 | Deploy & Release | L25–L26 | Ship it: a gated deploy/promotion, then zero-downtime blue-green/canary with rollback. | L26 |
| 9 | Platform & Operations | L27–L31 | Run Jenkins like a platform: plugins, notifications, JCasC, RBAC, troubleshooting. | — |
| 10 | Capstone | L32 | Assemble a full production pipeline reusing every mechanic. | 3D inset |

**Difficulty key:** ● Easy · ●● Moderate · ●●● Hard

| Ch | # | Title | Jenkins concept (1 line) | Canvas interaction — what the player manipulates | Dim | Why this dimension | Builds on | Diff |
|----|---|-------|--------------------------|--------------------------------------------------|-----|--------------------|-----------|------|
| 2 | 1 | The Declarative Skeleton | Wrap loose stages in the required `pipeline{agent/stages/stage/steps}` frame. | Snap nesting blocks into a scaffold; a missing/mis-nested block glows red until the frame is valid, then runs. | 2D | Syntax is hierarchical text, not space — depth would only occlude the nesting. | Ch1 loose stages | ● |
| 2 | 2 | Declarative vs Scripted | Same pipeline two ways; scripted Groovy unlocks a loop declarative can't express. | Drag steps into a `script{}`/`node{}` block to add a `for` loop; toggle between the two representations of one pipeline. | 2D | A code-structure comparison; purely textual. | L1 | ●● |
| 2 | 3 | The Agent Directive | Declare **where** the pipeline runs: `agent any` / `none` / per-stage. | Drop an `agent` chip onto the pipeline and onto individual stages; an unassigned stage refuses to run. | 2D | Only *declaring* intent here — no machines exist yet. Spatial separation arrives in L12. | L1 | ● |
| 2 | 4 | The Environment Block | Define `environment` vars that steps consume as `$VAR`. | Wire an env-var token to each step that reads it; an unwired `$VAR` fails the step. | 2D | Variable→consumer wiring is a flat dependency graph. | L1 | ●● |
| 2 | 5 | Build Parameters | Parameterize a run (`string`/`boolean`/`choice`). | Turn parameter knobs on a "Build with Parameters" panel; flip a boolean and watch it feed a gate. | 2D | A config form feeding values — no spatial content. | L4 | ●● |
| 2 | 6 | Conditional Stages (`when`) | Gate a stage on branch/param/expression. | Attach a `when` card to a stage; toggle its condition and watch the stage light or grey out on the rail. | 2D | Boolean gating on a linear flow; flat. | L5 | ●● |
| 2 | 7 | Post Conditions, Expanded | `success`/`failure`/`unstable`/`changed`/`always` routing. | Wire each build outcome to its handler; simulate each result and watch the matching branch fire. | 2D | Outcome→handler routing is a small flat graph. | Ch1 post, L6 | ●● |
| 2 | 8 | Manual Approval (`input`) | Pause the pipeline for a human decision. | Drop an `input` gate into the flow; the build-orb physically stalls until Approve/Abort is clicked. | 2D | A gate on the existing linear flow — no new axis. | L6, L7 | ●● |
| 3 | 9 | Checking Out Source | Replace the checkout stub with real Git SCM + branch. | Wire a Git repo node into Checkout, set branch/URL; a bad ref fails the stage. | 2D | Source→stage wiring; flat. | L1 | ●● |
| 3 | 10 | Triggers: Poll vs Webhook | What *starts* a build — `cron`/`pollSCM` vs a push webhook. | Wire a clock (poll/cron) and a repo-bell (webhook) to the pipeline start; set cron syntax, push a commit to fire the hook. | 2D | Event sources feeding a trigger; a flat wiring task. | L9 | ●● |
| 3 | 11 | Jenkinsfile from SCM | Move the pipeline definition into the repo. | Drag the Jenkinsfile from Jenkins-managed storage into the Git repo, then point the job at SCM. | 2D | A storage-location move; hierarchical, not spatial. | L9, L10 | ●● |
| 4 | 12 | Controller & Agents | Distributed builds: the controller delegates work to separate agent machines. | Stand a controller in front; spin up agent **machines set back in depth**, connect them over SSH/JNLP links spanning the gap; route a build across to an agent. | **3D** | **Depth = physical machine separation.** The whole point is "these are different computers" — flattening hides the boundary that defines the concept. | L3 (agent directive now points at real machines) | ●●● |
| 4 | 13 | Labels & Node Selection | Route a stage to the right machine by `label`. | Tag stages and nodes; drag a build to the matching-label node; a mismatch leaves the build stuck in the queue. | 2D | Borderline — it reuses L12's machines, but the **new** act is tag-matching, which is textual. 3D here would be decoration, so it stays flat over a node list. | L12 | ●● |
| 4 | 14 | Docker Container Agents | Pin a stage's toolchain with `agent { docker 'image' }`. | Attach a container image to a stage; a fresh container wraps the stage's steps at run time. | 2D | Borderline — a container *is* a fresh machine, but the concept taught is "pin a toolchain via image," which is a directive. Machine separation was already earned in L12. | L3, L12 | ●● |
| 4 | 15 | Ephemeral Cloud Agents | Agents provisioned on demand and destroyed after the build. | A build surge floods the queue; watch ephemeral agents **pop into the depth field** to absorb load, then dissolve when idle. | **3D** | **Depth = elastic scale in space** — machines materializing and vanishing. Count-over-time across a spatial fleet is exactly what 2D can't show. | L12, L14 | ●●● |
| 5 | 16 | Test Reports & Trends | Publish JUnit results; surface pass/fail counts and trends. | Wire a results file into a `junit` step; a failing test flips the build to **unstable** and a trend graph updates. | 2D | A report wired to a stage; flat. | Ch1 test stage | ●● |
| 5 | 17 | Coverage & Quality Gates | Fail the build below a coverage/quality threshold. | Set a coverage-threshold dial; the build goes red when coverage drops under the line. | 2D | A threshold knob on a linear pass/fail; flat. | L16 | ●● |
| 5 | 18 | Parallel Stages | Run independent stages concurrently. | Split one stage into branches that run as **side-by-side lanes in depth**; the build front advances through all lanes at once — total time = slowest lane. | **3D** | **Depth/lanes = concurrency.** Simultaneity is the lesson; lanes receding in space show "at the same time" in a way a flat sequence literally cannot. | L1, L12 (branches land on different executors) | ●●● |
| 5 | 19 | Matrix Builds | One pipeline × many axis combinations (os × version). | Lay out a combination **grid along two spatial axes**; each cell is a generated build; exclude a cell and watch it drop. | **3D** | **The axes literally are the matrix dimensions.** Depth carries the second axis of the build cube — the most native 3D fit in the curriculum. | L18 | ●●● |
| 6 | 20 | Credential Types & Store | Store secrets by type (user/pass, SSH key, secret text, token), each with an id. | File secrets into the credential store by type; each gets an id chip you'll reference later. | 2D | A typed key-value store; hierarchical, not spatial. | — | ●● |
| 6 | 21 | Binding with `withCredentials` | Inject a stored secret into a stage and keep it masked. | Wire a credential id into a stage; the value shows as `****` in the console; a misbinding **leaks** the secret — find and fix it. | 2D | id→stage wiring plus break-and-fix; flat. | L4, L20 | ●●● |
| 7 | 22 | Multibranch Pipelines | Auto-discover a Jenkinsfile per branch and run each independently. | A repo trunk **splits into branch tracks receding in depth**, each auto-spawning its own pipeline lane as branches are added/removed. | **3D** | **Depth = branch divergence** — parallel histories fanning out in space. The divergence *is* the topology being taught. | L10, L11 | ●●● |
| 7 | 23 | PRs & Organization Folders | Discover pull requests and scan an org to auto-create jobs per repo. | Toggle "discover PRs"; scan an org and watch a repo→branch tree of jobs build itself. | 2D | Once divergence is shown in L22, the new idea is the **org→repo→branch hierarchy** — a tree, best flat. | L22 | ●● |
| 7 | 24 | Shared Libraries | Extract a repeated step into a reusable library call. | Drag a duplicated step out of three pipelines into a shared `vars/` block, then call it as one step in each. | 2D | A refactor across code units; structural, not spatial. | L1 (across many pipelines) | ●●● |
| 8 | 25 | Deploy Stage & Promotion | A deploy stage; promote an artifact staging→prod through a gate. | Add a deploy stage targeting an environment; promote an archived artifact across an `input` gate from staging to prod. | 2D | A gated flow along the pipeline; linear, not spatial. | L8, L16/archive | ●● |
| 8 | 26 | Blue-Green / Canary | Two live environments; shift traffic, roll back instantly. | **Two environment pools sit side by side in space;** drag a traffic dial blue→green or ramp canary %, watch requests reroute across the pools; flip back to roll back. | **3D** | **Depth = two parallel live fleets + traffic routing between them.** The concept *is* topological — two machine pools and traffic moving across the gap. (Borderline vs 2D flow; 3D wins because it's two simultaneous live targets, not a sequence.) | L25 | ●●● |
| 9 | 27 | Plugins: Install & Manage | Plugins extend Jenkins with new steps; versions can conflict. | Install plugins that unlock new step blocks in your palette; a version conflict breaks a build — resolve it. | 2D | A catalog/dependency list; flat. | — | ●● |
| 9 | 28 | Notifications & ChatOps | Notify Slack/email from `post` outcomes. | Wire a `post` outcome to a Slack/email notifier node; fire it on red and on green. | 2D | Outcome→notifier wiring; flat. | L7 | ●● |
| 9 | 29 | Configuration as Code (JCasC) | Capture all config in YAML; rebuild Jenkins identically from it. | Snapshot the clicked-together config into a YAML doc, tear Jenkins down, and rebuild it from the file. | 2D | YAML authoring/diffing; purely textual. | (everything configured) | ●●● |
| 9 | 30 | Security, RBAC & Folders | Per-folder, per-user permissions. | Toggle a users × permissions matrix scoped per folder; an unauthorized user hits a wall mid-action. | 2D | A permission matrix + a hierarchy; flat. | — | ●●● |
| 9 | 31 | Monitoring, Logs & Troubleshooting | Read logs to localize and fix a failing build. | A broken pipeline; read console + node logs to pinpoint the failing step/agent and fix it. | 2D | Log reading and a flat pipeline; no spatial axis. | L12, L21 | ●●● |
| 10 | 32 | Capstone — Production Pipeline | Assemble a full production pipeline reusing every mechanic. | Build end-to-end: SCM→parallel test→matrix→credentialed deploy→canary, on distributed agents, defined as code. | 2D + 3D inset | Mostly flat assembly; reuses the **3D topology/parallel scene** for the distributed and concurrent sections where depth still earns its place. | All | ●●● |

### Dimension summary

- **3D (6 levels):** L12 Controller & Agents, L15 Ephemeral Cloud Agents, L18 Parallel
  Stages, L19 Matrix Builds, L22 Multibranch, L26 Blue-Green/Canary — plus a 3D inset in
  the L32 capstone. Each spends depth on a real axis: **machine separation, elastic
  scale, concurrency, a matrix axis, branch divergence, two live fleets.**
- **Everything else is 2D.** Syntax, config, credentials, gates, reports, hierarchies,
  and refactors are textual or hierarchical — forcing depth onto them would only add
  occlusion and camera friction.
- **Interleaving:** 3D lands at 12, 15, 18–19, 22, 26 — never clustered (the 18–19 pair
  is the single deliberate adjacency, since parallelism and matrix are one concurrency
  idea), so the difficulty curve stays smooth and depth always signals "this concept is
  genuinely spatial."

### Hard-to-canvas concepts (honest notes)

- **Declarative vs Scripted (L2)** and **JCasC (L29)** are the most text-heavy. They stay
  canvas-native by making the player *manipulate structure* — dragging steps into a
  `script{}`/`node{}` block to enable a loop, or snapshotting config into YAML and
  rebuilding from it — rather than reading and picking an answer.
- **Labels (L13)** and **Docker agents (L14)** are the borderline dimension calls: both
  touch machines but teach a textual act (tag-matching, image-pinning), so they stay 2D
  and lean on the 3D topology established in L12 for context rather than re-rendering it.
