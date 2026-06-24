# Jenkins Campaign Mode — Master Plan

Jenkins Campaign Mode is a single linear progression that carries a complete newcomer from zero to a confident, capable Jenkins user. Every level follows a Teach-then-Practice rhythm: the concept is explained in plain terms first, and then the player immediately applies it to clear the level, so knowledge is earned through action rather than just read. Each level is deliberately small, single-purpose, and self-contained, scoped tightly enough that it can be built and shipped as a standalone deployable static HTML file in the spirit of k8sgames.com. Difficulty ramps smoothly from one level to the next, and the curriculum is ordered so that no concept is ever required before it has been taught. The result is a campaign where each step feels achievable, each win compounds on the last, and the player is never asked to fake understanding. By the end, the player has not only learned Jenkins concepts but has practiced building real CI/CD pipelines from the ground up.

## Campaign Map

| # | Chapter | Theme | Key outcome |
|---|---------|-------|-------------|
| 0 | CI/CD Foundations & The Jenkins Machine | why we automate, and the moving parts that do it | Player can explain CI/CD and describe Jenkins controller/agent/executor architecture |
| 1 | Getting Jenkins Running | install it, boot it, find your way around | Player installs Jenkins, completes setup, navigates the UI, and runs a first job |
| 2 | Freestyle Jobs | the classic point-and-click job, and why you outgrow it | Player builds a real freestyle job (SCM + steps + triggers + artifacts) and understands its limits |
| 3 | Your First Pipeline (Declarative Basics) | pipeline as code, the modern default | Player writes a multi-stage declarative Jenkinsfile run from SCM with post conditions |
| 4 | Jenkinsfile Deep Dive | the directives that turn a skeleton into a real pipeline | Player commands agent/environment/parameters/when/options/tools plus credentials and input |
| 5 | Source Control Integration | make pipelines react to code the moment it changes | Player wires webhooks and a multibranch pipeline that builds every branch and PR |
| 6 | Triggers, Build Tools, Artifacts & Fingerprinting | controlling what kicks a build off and what it leaves behind | Player configures triggers/tools, archives + stashes artifacts, fingerprints them, and triggers remotely |
| 7 | Credentials & Secrets | never hardcode a secret again | Player stores, scopes, binds, and masks secrets correctly in pipelines |
| 8 | Plugins: The Ecosystem | almost everything in Jenkins is a plugin | Player installs/manages plugins safely and uses plugin-provided steps including notifications |
| 9 | Distributed Builds | scale out work onto agents and containers | Player connects agents, routes work with labels, and runs stages in Docker / ephemeral cloud agents |
| 10 | Testing, Quality Gates & Parallelism | make builds trustworthy and fast | Player publishes tests/coverage, enforces a quality gate, and runs work in parallel and as a matrix |
| 11 | Deployment, Environments, Approvals & Rollbacks | ship safely across environments | Player models promotion dev->staging->prod with approvals and automated rollback |
| 12 | Scripted Pipelines & Groovy | the power-user escape hatch when declarative is not enough | Player writes scripted pipelines and uses Groovy for dynamic logic and error handling |
| 13 | Shared Libraries | stop copy-pasting Jenkinsfiles across repos | Player builds a versioned shared library with custom steps, classes, and resources |
| 14 | Security, RBAC, Folders & Audit | lock it down before it bites you | Player configures authentication, authorization, folder scoping, and hardening |
| 15 | Monitoring, Logs & Troubleshooting | when builds break, find out why fast | Player diagnoses failed builds and monitors Jenkins health |
| 16 | Configuration as Code (JCasC) & Scaling | a reproducible, version-controlled Jenkins | Player configures Jenkins from YAML, backs it up, and plans for scale |
| 17 | Pipeline as Code Best Practices & Capstone | put it all together, the right way | Player applies best practices and ships a complete hardened CI/CD pipeline |

Each chapter below is built on a uniform per-level schema so chapters can be generated independently later. Every level is described by the same fields: `id`, `scope`, `difficulty`, `teach`, `scenario`, `actions`, `win`, `jenkins_concepts`, and `builds_on`. Keeping this schema consistent across all chapters ensures levels remain small, self-contained, and easy to author one at a time while preserving the smooth difficulty ramp and the teach-before-use ordering of the campaign as a whole.

## Table of Contents

- Chapter 0 — CI/CD Foundations & The Jenkins Machine
- Chapter 1 — Getting Jenkins Running
- Chapter 2 — Freestyle Jobs
- Chapter 3 — Your First Pipeline (Declarative Basics)
- Chapter 4 — Jenkinsfile Deep Dive
- Chapter 5 — Source Control Integration
- Chapter 6 — Triggers, Build Tools, Artifacts & Fingerprinting
- Chapter 7 — Credentials & Secrets
- Chapter 8 — Plugins: The Ecosystem
- Chapter 9 — Distributed Builds
- Chapter 10 — Testing, Quality Gates & Parallelism
- Chapter 11 — Deployment, Environments, Approvals & Rollbacks
- Chapter 12 — Scripted Pipelines & Groovy
- Chapter 13 — Shared Libraries
- Chapter 14 — Security, RBAC, Folders & Audit
- Chapter 15 — Monitoring, Logs & Troubleshooting
- Chapter 16 — Configuration as Code (JCasC) & Scaling
- Chapter 17 — Pipeline as Code Best Practices & Capstone

---

## Chapter 0 — CI/CD Foundations & The Jenkins Machine
_Theme: why we automate, and the moving parts that do it_

**Learning objectives**
- Define continuous integration and continuous delivery/deployment and name the manual pain each removes.
- Explain where Jenkins sits among CI tools and why its self-hosted, plugin-driven model matters.
- Identify the Jenkins controller, agents, and executors and describe the distinct job of each.
- Trace a single build from trigger through queue, executor, workspace, and final result status.
- Form the pipeline mental model — stages built from steps — and recognize what a Jenkinsfile is.

**Prerequisites:** None

**Levels**

### Level 0.1 — What Is CI/CD
- **id**: what-is-cicd
- **scope**: Define continuous integration and continuous delivery/deployment and the problem they solve.
- **difficulty**: 1
- **teach**: When several developers work on the same codebase but only merge their changes once a month, the branches drift so far apart that combining them becomes "integration hell" — days of painful conflict resolution and surprise bugs. Continuous Integration (CI) fixes this by having everyone merge small changes often, and by running an automated build and test suite on every push so breakage is caught within minutes. Continuous Delivery (CD) extends this so that every passing build is packaged and kept always-releasable, ready to ship with one click. Continuous Deployment goes one step further: a passing build is pushed to production automatically, with no human gate.
- **scenario**: You join "Acme Widgets" where five engineers integrate their work in one dreaded "merge day" each month. The release board shows a tangle of red conflict markers. Your job is to dismantle the manual pipeline and label each stage of an automated one.
- **actions**:
  1. Read the team's painful workflow card: "code for 3 weeks → merge all branches at once → manually build on a laptop → email a zip to ops."
  2. Drag the **"merge small changes daily"** tile over the "monthly merge day" tile to defuse integration hell.
  3. Attach the **automated build + test** trigger to the "on every push" event so breakage surfaces immediately.
  4. Sort three outcome cards into the right bucket: *build+test on push* → **CI**, *every green build is always-releasable* → **Continuous Delivery**, *green build auto-ships to prod* → **Continuous Deployment**.
  5. Confirm the new flow turns the release board from red to green.
- **win**: All three outcome cards are placed in the correct CI / Delivery / Deployment buckets, and the "monthly merge day" tile has been replaced by "merge often + build/test on every push."
- **jenkins_concepts**: Key terms: *integration hell*, *merge often*, *build on every push*, *always-releasable*, *CI* vs *CD (delivery)* vs *CD (deployment)*. The thing CI automates is the manual command sequence a developer would otherwise run by hand:
  ```bash
  # The manual ritual CI replaces — run on every single push, automatically
  git pull origin main          # integrate latest changes
  ./build.sh                    # compile / package
  ./run-tests.sh                # fail fast if anything broke
  echo "exit code $? decides: green = mergeable, red = blocked"
  ```
  The distinction in one line: Continuous **Delivery** stops at "ready to release"; Continuous **Deployment** removes the final human button-press and ships automatically.
- **builds_on**: —

### Level 0.2 — Why Jenkins
- **id**: why-jenkins
- **scope**: Explain Jenkins as a self-hosted, plugin-extensible automation server and how it compares to SaaS CI.
- **difficulty**: 1
- **teach**: Jenkins is a free, open-source automation server that you run on your own infrastructure — a server you control, not a service you rent. Its defining trait is extensibility: a core engine plus over 1,800 community plugins, so almost every capability (Git, Docker, Slack, test reports) is a plugin you add rather than a feature you wait for. SaaS CI tools like GitHub Actions, GitLab CI, and CircleCI run on someone else's servers — less to operate, but less control over hardware, network, and data residency. The trade is autonomy and flexibility (Jenkins) versus zero-maintenance convenience (SaaS).
- **scenario**: Acme's CTO drops a one-line brief on your desk: "We have an air-gapped data center, weird legacy build hardware, and auditors who forbid source code leaving the building. Pick a CI tool and defend it." A comparison console waits with toggles for each tool's traits.
- **actions**:
  1. Open the **CI Tool Selector** console showing Jenkins, GitHub Actions, GitLab CI, and CircleCI side by side.
  2. Tag each tool as **self-hosted**, **SaaS**, or **both** — Jenkins is self-hosted; the rest are primarily SaaS-hosted.
  3. Match the requirement cards to Jenkins strengths: *"runs in air-gapped network"*, *"custom build hardware"*, *"code never leaves premises"*, *"extend with a plugin instead of waiting"*.
  4. Acknowledge the cost cards on the other side of the ledger: *"you patch and upgrade the server yourself"* and *"you own uptime and security."*
  5. Submit Jenkins as the recommendation and watch the requirement cards light green.
- **win**: Each tool is correctly tagged self-hosted vs SaaS, all four requirement cards are matched to Jenkins, both Jenkins maintenance-cost cards are acknowledged, and Jenkins is submitted as the recommended tool.
- **jenkins_concepts**: Key terms: *open source*, *self-hosted*, *plugin / update center*, *1,800+ plugins*, *extension point*, SaaS alternatives (*GitHub Actions*, *GitLab CI*, *CircleCI*). Jenkins runs as a single Java service you start yourself:
  ```bash
  # Jenkins is a self-hosted Java app you own and boot on your own box
  java -jar jenkins.war --httpPort=8080
  # → reachable at http://localhost:8080 — your server, your network, your rules
  ```
  Plugins are what turn the bare server into a CI platform — install methods and internals are covered in a later chapter, but the mental model is: core + plugins = your CI.
- **builds_on**: what-is-cicd

### Level 0.3 — Controller, Agents & Executors
- **id**: controller-agent-executor
- **scope**: Identify the Jenkins controller, build agents, and executors and the role of each.
- **difficulty**: 2
- **teach**: A Jenkins installation is split into roles. The **controller** is the brain: it serves the web UI, stores all configuration, schedules work, and dispatches builds — but it should not run builds itself. An **agent** (also called a node) is a worker machine that connects to the controller and actually runs build steps; you can attach many agents on different OSes and hardware. Each agent provides one or more **executors**, where one executor is a single slot that can run exactly one build at a time — an agent with 4 executors can run 4 builds concurrently. The cardinal rule: never run builds on the controller, so a malicious or runaway build can't compromise the brain.
- **scenario**: You're handed a bare Jenkins topology diagram with three unlabeled boxes and a pool of build jobs queued up. The architecture review won't pass until every box is named and the jobs are placed on the right machines — without overloading anything or touching the controller.
- **actions**:
  1. Label the three boxes: the one serving the **UI + scheduler + config** is the **controller**; the two worker machines are **agents**.
  2. Set executor counts: give the Linux agent **2 executors** and the Windows agent **2 executors** (4 concurrent build slots total).
  3. Drag four queued build jobs onto executor slots — exactly one job per slot — and watch a 5th job stay parked in the queue because every executor is busy.
  4. Try to drop a job onto the controller; the level rejects it with "builds must not run on the controller — keep it lean and secure."
  5. Confirm the controller shows **0 build executors** and every running job sits on an agent.
- **win**: Controller and both agents are labeled correctly, the controller has 0 build executors, 4 jobs occupy the 4 agent executor slots with the 5th correctly waiting in the queue, and no job was placed on the controller.
- **jenkins_concepts**: Key terms: *controller* (brain/UI/scheduler), *agent / node* (worker), *executor* (one concurrent build slot), *0 executors on controller*. The role a build will eventually request is expressed in pipeline form (full syntax comes later):
  ```groovy
  // 'agent any' = run this work on any available executor on any connected agent
  pipeline {
      agent any            // controller schedules it; an agent's executor runs it
      stages {
          stage('Build') {
              steps { echo 'Running on an agent executor, never the controller' }
          }
      }
  }
  ```
  Rule of thumb: **controller schedules, agents execute, executors count how many at once.**
- **builds_on**: why-jenkins

### Level 0.4 — Anatomy of a Build
- **id**: build-lifecycle
- **scope**: Trace a build through queue, executor assignment, workspace, and result status.
- **difficulty**: 2
- **teach**: Every build follows the same life cycle. A trigger (a push, a timer, or a manual click) places the build in the **build queue**, where it waits until a suitable **executor** on some agent is free. Once assigned, Jenkins gives the build a **workspace** — a dedicated directory on that agent where the code is checked out and the steps run. When the steps finish, the build ends in a **result status**: **SUCCESS** (all green), **FAILURE** (a step returned a non-zero exit and the build broke), **UNSTABLE** (it ran but something soft failed, e.g. test failures), or **ABORTED** (cancelled or timed out before finishing).
- **scenario**: A build named `#42` has just been triggered, but every executor is currently busy. You sit at the live build tracker and must shepherd `#42` through each stage of its life until the result lamp lights, then read three finished builds and assign each the correct status.
- **actions**:
  1. Watch `#42` enter the **build queue** with the reason "Waiting for next available executor."
  2. Free up an executor on the Linux agent; observe `#42` get **assigned to that executor** and leave the queue.
  3. Open the build's **workspace** panel and confirm the repo was checked out into a directory like `/home/jenkins/workspace/widget-build`.
  4. Step through the console: a green compile, a green test run → the result lamp turns **SUCCESS**.
  5. Triage three other finished builds by their console tails: *non-zero exit from `make`* → **FAILURE**, *build OK but 3 tests failed* → **UNSTABLE**, *cancelled by user mid-run* → **ABORTED**.
- **win**: `#42` is moved queue → executor → workspace → SUCCESS in order, and all three triage builds are tagged FAILURE, UNSTABLE, and ABORTED correctly.
- **jenkins_concepts**: Key terms: *build queue*, *executor assignment*, *workspace*, result statuses *SUCCESS / FAILURE / UNSTABLE / ABORTED*. The exit code of a step is what drives the status — green vs red is literally a number:
  ```bash
  # Inside the workspace on the assigned agent:
  make build        # exit 0  → step passes; non-zero → step fails → build FAILURE
  make test         # exit 0  → tests passed → build stays SUCCESS
  # A test runner can instead report failures softly and mark the build UNSTABLE
  echo "Final status is decided by step exit codes, not by hope"
  ```
  Mnemonic for the path of a build: **queue → executor → workspace → result.**
- **builds_on**: controller-agent-executor

### Level 0.5 — Stages, Steps & the Pipeline Idea
- **id**: pipeline-mental-model
- **scope**: Introduce the pipeline mental model (stages made of steps) and preview jobs vs pipelines.
- **difficulty**: 2
- **teach**: A **pipeline** is your whole build-to-deploy process expressed as an ordered list of **stages** — for example Build, then Test, then Deploy. Each stage is a named group of **steps**, and a **step** is a single concrete action like running a shell command or echoing a message. This hierarchy (pipeline → stages → steps) is the core mental model you'll use for the rest of the course. Crucially, a modern pipeline is defined as code in a file called a **Jenkinsfile** that lives next to your source — unlike the older click-configured "freestyle" job, pipeline-as-code can be reviewed, versioned, and reused (the freestyle-vs-pipeline contrast is explored in detail in a later chapter).
- **scenario**: Acme's process is currently a wall of sticky notes: "compile the app, run unit tests, package a jar, deploy to staging." You must organize those notes into a clean three-stage pipeline and then read the equivalent Jenkinsfile to see your structure turned into code.
- **actions**:
  1. Group the loose sticky notes into three **stages**: **Build**, **Test**, **Deploy**.
  2. Drop each action note into its stage as a **step** — `compile` and `package` under Build, `run unit tests` under Test, `deploy to staging` under Deploy.
  3. Order the stages left-to-right so Build runs before Test runs before Deploy.
  4. Flip the board over to reveal the matching **Jenkinsfile** and match each on-screen stage to its `stage('...')` block.
  5. Tag the whole artifact as **"pipeline (defined as code in a Jenkinsfile)"** rather than **"freestyle (clicked together in the UI)."**
- **win**: The four action notes are grouped into Build / Test / Deploy in the correct order, each note sits as a step inside the right stage, the artifact is tagged as a code-defined pipeline, and each stage is matched to its `stage()` block in the Jenkinsfile.
- **jenkins_concepts**: Key terms: *pipeline*, *stage*, *step*, *Jenkinsfile*, *pipeline-as-code* vs *freestyle*. The sticky-note board maps directly onto Jenkinsfile structure (full declarative syntax is taught in Chapter 3):
  ```groovy
  // Jenkinsfile — pipeline → stages → steps, versioned alongside your code
  pipeline {
      agent any
      stages {
          stage('Build')  { steps { echo 'compile + package the app' } }
          stage('Test')   { steps { echo 'run unit tests' } }
          stage('Deploy') { steps { echo 'deploy to staging' } }
      }
  }
  ```
  Read it top to bottom: one **pipeline**, three ordered **stages**, each holding one or more **steps**.
- **builds_on**: build-lifecycle

---

## Chapter 1 — Getting Jenkins Running
_Theme: install it, boot it, find your way around_

**Learning objectives**
- Compare the WAR, Docker, and native-package install methods and know what lives in JENKINS_HOME.
- Complete the first-run unlock and setup wizard to reach a working dashboard with an admin user.
- Navigate the dashboard, build queue, executor status widget, and the Manage Jenkins screens.
- Create, run, and read the console output of the simplest possible job.
- Distinguish click-configured freestyle jobs from code-defined pipeline jobs and when each is used.

**Prerequisites:** Chapter 0

**Levels**

### Level 1.1 — Installing Jenkins
- **id**: install-jenkins
- **scope**: Compare the WAR, Docker, and native-package install methods and learn what JENKINS_HOME stores.
- **difficulty**: 1
- **teach**: Jenkins is a single Java application, so every install method ends with the same thing: a controller process listening on port 8080. The classic way is the self-contained `jenkins.war` run with `java -jar`; the modern way is the official `jenkins/jenkins:lts` Docker image; native packages (apt, brew, MSI) wrap that same application behind a service manager so it starts on boot. Whatever method you pick, all state lives in one directory called **JENKINS_HOME** — config XML, every job, build history, plugins, and secrets — so that directory *is* your Jenkins.
- **scenario**: Your team just approved standing up a Jenkins controller. The ops console gives you three pre-staged machines — a bare VM with only Java, a Docker host, and a managed Linux box — and asks you to boot Jenkins on whichever fits, then prove you know where its data will live.
- **actions**:
  1. Inspect the three offered install methods and read the one-line tradeoff for each (WAR = portable, Docker = reproducible, native = managed service).
  2. Pick the bare VM and launch the WAR by running the start command in the level's terminal.
  3. Watch the boot log scroll until Jenkins reports it is "fully up and running" on port 8080.
  4. Open the JENKINS_HOME explorer panel and tag which subfolders hold jobs, plugins, and config.
  5. Confirm the running controller responds at `http://localhost:8080`.
- **win**: Jenkins boots and is reachable on port 8080, AND the player has correctly labeled `jobs/`, `plugins/`, and the `config.xml` file inside JENKINS_HOME.
- **jenkins_concepts**: `jenkins.war`, `JENKINS_HOME`, port 8080, LTS image.
```bash
# Method A — WAR on a machine that already has Java 17+
java -jar jenkins.war --httpPort=8080

# Method B — Docker, with a named volume so JENKINS_HOME survives restarts
docker run -d --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts

# Method C — native package (Debian/Ubuntu): add the Jenkins apt repo first,
# then install — this registers a systemd service that starts on boot
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key \
  | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/" \
  | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update && sudo apt-get install -y jenkins
sudo systemctl status jenkins
```
```text
# What lives in JENKINS_HOME (default ~/.jenkins for the WAR, /var/jenkins_home in Docker)
JENKINS_HOME/
├── config.xml          # global Jenkins configuration
├── jobs/               # one folder per job, with build history
├── plugins/            # installed .jpi/.hpi plugins
├── secrets/            # keys, including initialAdminPassword
└── users/              # user accounts
```
- **builds_on**: controller-agent-executor

### Level 1.2 — Unlock & Setup Wizard
- **id**: setup-wizard
- **scope**: Complete the first-run unlock with the initial admin password, install suggested plugins, and create the first admin user.
- **difficulty**: 1
- **teach**: The first time you open Jenkins it is locked — it writes a one-time **initial admin password** into `JENKINS_HOME/secrets/initialAdminPassword` (and to the boot log) and won't proceed until you paste it back, proving you control the machine. After unlocking, the wizard offers **Install suggested plugins**, which pulls a sensible default set (Git, Pipeline, credentials, and more) so you aren't starting from nothing. You then create your first admin user and confirm the **Jenkins URL** — the base address Jenkins uses to build the links it shows in its own pages and emails.
- **scenario**: Your freshly booted controller from the last level shows a red "Unlock Jenkins" screen. The clock is ticking — until you get past it, no one on the team can configure a single job. Time to find that password and walk the wizard.
- **actions**:
  1. Read the boot log hint and open `JENKINS_HOME/secrets/initialAdminPassword`.
  2. Copy the 32-character password and paste it into the Unlock Jenkins field, then continue.
  3. Choose **Install suggested plugins** and watch the install grid fill in.
  4. Fill the "Create First Admin User" form (username, password, full name, email) and save.
  5. Confirm the **Jenkins URL** as `http://localhost:8080/` and finish the wizard to land on the dashboard.
- **win**: The wizard is completed: the correct password was used, suggested plugins finished installing, an admin user exists, and the player reaches the "Jenkins is ready!" dashboard.
- **jenkins_concepts**: `initialAdminPassword`, suggested plugins, admin user, Jenkins URL.
```bash
# Reveal the one-time unlock password (WAR install)
cat $JENKINS_HOME/secrets/initialAdminPassword
# -> 4f1c9e2a8b7d4c6e9a0f3b5d2c8e1a7b

# Docker install — same file, read it from inside the container
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```
```text
# The same password also appears in the boot log, fenced like this:
*************************************************************
Jenkins initial setup is required. An admin password has been created.
Please use the following password to proceed to installation:

4f1c9e2a8b7d4c6e9a0f3b5d2c8e1a7b
*************************************************************
```
- **builds_on**: install-jenkins

### Level 1.3 — Touring the Dashboard
- **id**: ui-tour
- **scope**: Navigate the dashboard, the build queue, the executor status widget, and the Manage Jenkins screens.
- **difficulty**: 1
- **teach**: The dashboard is mission control: the center lists your jobs, **New Item** (top-left) is how you create one, and the left rail holds the **Build Queue** and **Build Executor Status** widgets. The queue shows builds waiting for a free executor; the executor widget shows the controller's executor slots and whether each is idle or busy — exactly the controller/executor parts you met in Chapter 0. **Manage Jenkins** is the admin hub, branching into System (global settings), Tools, Plugins, and Nodes. Knowing where each lives means you never have to hunt.
- **scenario**: You're logged in as admin on a brand-new dashboard with zero jobs. Before you build anything, your lead asks you to give the new hire a two-minute tour — point to where jobs get created, where waiting builds pile up, where executors live, and where the admin settings hide.
- **actions**:
  1. Locate **New Item** in the top-left and confirm it's the entry point for creating jobs.
  2. Find the **Build Queue** widget in the left rail and note that it currently reads "No builds in the queue."
  3. Find the **Build Executor Status** widget and count the idle executors on the built-in node.
  4. Open **Manage Jenkins** and match each tile to its purpose: System, Tools, Plugins, Nodes.
  5. Return to the dashboard to complete the tour.
- **win**: The player has correctly identified all four landmarks — New Item, Build Queue, Build Executor Status, Manage Jenkins — and matched the four Manage Jenkins tiles (System, Tools, Plugins, Nodes) to their roles.
- **jenkins_concepts**: New Item, Build Queue, Build Executor Status, Manage Jenkins → System / Tools / Plugins / Nodes.
```text
Dashboard layout
┌───────────────────────────────────────────────┐
│ [+ New Item]                          admin ▾  │
├──────────────┬────────────────────────────────┤
│ Build Queue  │  Name        Last Success  ...  │
│  (empty)     │  (no jobs yet)                  │
│              │                                 │
│ Build        │                                 │
│ Executor     │                                 │
│ Status       │                                 │
│  1 ● Idle    │                                 │
│  2 ● Idle    │                                 │
└──────────────┴────────────────────────────────┘
Manage Jenkins ▸ System · Tools · Plugins · Nodes
```
- **builds_on**: setup-wizard

### Level 1.4 — Your First Job: Hello Jenkins
- **id**: first-freestyle-hello
- **scope**: Create the simplest freestyle job that echoes a message, build it, and read its console output.
- **difficulty**: 2
- **teach**: A **freestyle job** is the classic point-and-click Jenkins job: you configure it through web forms instead of code. Its **build steps** are the work it does — the most basic being **Execute shell**, which runs shell commands on the agent inside the build's workspace. Pressing **Build Now** queues a run; when an executor picks it up, it runs your steps and records every line in the **Console Output**. A run that finishes with no errors gets a blue ball (success); the console ends with `Finished: SUCCESS`.
- **scenario**: The dashboard is empty and you want a win on the board. The classic rite of passage: make Jenkins say hello. You'll wire up a one-line shell job, run it, and read the proof in the console.
- **actions**:
  1. Click **New Item**, name it `hello-jenkins`, choose **Freestyle project**, and click OK.
  2. In the **Build Steps** section, add an **Execute shell** step.
  3. Enter the command `echo "Hello Jenkins"` and save.
  4. Click **Build Now** and watch build **#1** appear in the build history.
  5. Open the build and click **Console Output** to read the result.
- **win**: Build #1 of `hello-jenkins` finishes with a blue ball, and the Console Output contains the line `Hello Jenkins` followed by `Finished: SUCCESS`.
- **jenkins_concepts**: Freestyle project, Execute shell build step, Build Now, build #1, Console Output, blue ball / `Finished: SUCCESS`.
```bash
# The single build step (Execute shell)
echo "Hello Jenkins"
```
```text
# Console Output of build #1
Started by user admin
Running as SYSTEM
Building in workspace /var/jenkins_home/workspace/hello-jenkins
[hello-jenkins] $ /bin/sh -xe /tmp/jenkins123.sh
+ echo Hello Jenkins
Hello Jenkins
Finished: SUCCESS
```
- **builds_on**: ui-tour

### Level 1.5 — Jobs vs Pipelines
- **id**: jobs-vs-pipelines
- **scope**: Distinguish click-configured freestyle jobs from code-defined pipeline jobs and reason about when each is used.
- **difficulty**: 2
- **teach**: The freestyle job you just built stores its configuration as Jenkins-managed XML inside `JENKINS_HOME/jobs/` — there's no clean way to review, diff, or version that config. A **pipeline** job instead defines the whole build as code in a **Jenkinsfile**, using the stages-and-steps mental model from Chapter 0. Because the Jenkinsfile lives in your repository, it gets code review, history, and branching for free — which is why **pipeline-as-code** is the modern default, while freestyle remains handy for quick, throwaway, single-step tasks.
- **scenario**: Your `hello-jenkins` freestyle job works, but your lead asks the obvious next question: "When the pipeline gets real — multiple stages, code review, branches — does this click-configured approach scale?" You'll put the two job types side by side and decide which fits which situation.
- **actions**:
  1. Open a comparison board with two columns: **Freestyle** and **Pipeline**.
  2. Inspect where each stores its config — freestyle as `config.xml` under `jobs/`, pipeline as a `Jenkinsfile` in the repo.
  3. Read the same "hello" task expressed both ways: an Execute shell step vs a tiny declarative pipeline.
  4. Sort a stack of scenario cards (e.g. "needs code review", "one-off shell task", "branch per feature") into the column where each belongs.
  5. Conclude by selecting which approach is the modern default and why.
- **win**: Every scenario card is dropped into the correct column, and the player correctly identifies pipeline-as-code (Jenkinsfile, reviewable/versioned) as the default for real projects while freestyle suits quick single-step jobs.
- **jenkins_concepts**: Freestyle (UI config → `config.xml`), Pipeline (Jenkinsfile, pipeline-as-code), code review / versioning.
```groovy
// The same "hello" task as a pipeline (Jenkinsfile) — full anatomy comes in Chapter 4
pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                echo 'Hello Jenkins'
            }
        }
    }
}
```
```xml
<!-- A freestyle job's config.xml, managed by Jenkins under JENKINS_HOME/jobs/ -->
<project>
  <builders>
    <hudson.tasks.Shell>
      <command>echo "Hello Jenkins"</command>
    </hudson.tasks.Shell>
  </builders>
</project>
```
- **builds_on**: first-freestyle-hello, pipeline-mental-model

---

## Chapter 2 — Freestyle Jobs
_Theme: the classic point-and-click job, and why you outgrow it_

**Learning objectives**
- Add Execute shell / Execute Windows batch build steps that run real commands and understand how exit codes decide build status.
- Configure the Source Code Management section to clone a Git repository into the workspace before building.
- Trigger builds automatically with SCM polling and timed/cron schedules using Jenkins' H syntax.
- Archive build outputs as artifacts so they persist on the build page after the workspace is wiped.
- Articulate the structural limits of freestyle jobs that push teams toward pipeline-as-code.

**Prerequisites:** Chapter 1

**Levels**

### Level 2.1 — Build Steps
- **id**: freestyle-build-steps
- **scope**: Add Execute shell / Execute Windows batch build steps that run real commands inside a freestyle job.
- **difficulty**: 2
- **teach**: A freestyle job's real work happens in its **Build Steps** section. The most common step is **Execute shell** (on Linux/macOS agents) or **Execute Windows batch command** (on Windows), and each runs the lines you type as a script inside the agent's **workspace** (the per-job working directory you met in Chapter 1). Jenkins judges the step by its **exit code**: `0` means success, any **non-zero** exit code fails the build and turns it red. Steps run top to bottom, and the first failing step stops the build — later steps do not run.
- **scenario**: Your "hello" job from Chapter 1 just echoes a greeting. The team wants it to actually do something: print the build's identity, generate a tiny report file, and prove that a failing command really does break the build. You open the job config to wire in a real script.
- **actions**:
  1. Open the `hello-world` job and click **Configure**.
  2. Scroll to **Build Steps**, click **Add build step**, and choose **Execute shell**.
  3. In the command box, type a short script that prints the build number and writes a report file.
  4. Click **Save**, then **Build Now**, and open the **Console Output** to confirm the script ran and the build is green.
  5. Reconfigure the step to end on a deliberately failing command, rebuild, and watch the build go red with a non-zero exit code in the log.
- **win**: A build of the job runs your Execute shell step to completion and finishes **SUCCESS** (blue/green ball); after adding a failing command, the next build finishes **FAILURE** and the console output shows the non-zero exit code line.
- **jenkins_concepts**: `Execute shell`, `Execute Windows batch command`, exit code, `$BUILD_NUMBER` build variable, console output. A passing shell step:
```bash
echo "Building #$BUILD_NUMBER on $(hostname)"
echo "report generated at $(date)" > build-report.txt
cat build-report.txt
```
A step that fails the build (non-zero exit):
```bash
echo "running checks..."
exit 1   # any non-zero exit code marks the build FAILURE
```
The equivalent Windows batch step (note `%VAR%` syntax; a non-zero `exit /b` sets ERRORLEVEL and fails the build):
```bat
echo Building #%BUILD_NUMBER% on %COMPUTERNAME%
exit /b 1
```
- **builds_on**: first-freestyle-hello

### Level 2.2 — Connecting Git
- **id**: freestyle-scm
- **scope**: Configure the Source Code Management section so the job clones a Git repository into the workspace before any build step runs.
- **difficulty**: 2
- **teach**: A build step is only useful if it has code to act on. The **Source Code Management (SCM)** section tells Jenkins to check out a repository into the job's **workspace** before the first build step runs. For Git you supply a **Repository URL**, optionally a **credential** (for private repos), and a **branch specifier** like `*/main`. On each build Jenkins clones or fetches the repo so the workspace always reflects that branch's latest commit, and your shell steps then run against those files.
- **scenario**: The script in your job invents its own files, but the team's actual code lives in a Git repo. Until the job checks that repo out, it is building nothing real. You head into SCM to point the job at the repository so the workspace is populated with source before your steps run.
- **actions**:
  1. Open the job and click **Configure**, then scroll to **Source Code Management**.
  2. Select **Git** and paste the repository URL into **Repository URL**.
  3. If the repo is private, pick (or add) a **credential**; for a public repo leave it as none.
  4. Set **Branches to build** to `*/main`.
  5. Change your Execute shell step to list and read checked-out files (e.g. `ls -la`, `cat README.md`) instead of inventing them.
  6. **Save** and **Build Now**, then read the console output to confirm the clone happened before your script ran.
- **win**: The console output shows Git cloning/fetching the repository and checking out `main` at the start of the build, your shell step then lists the repo's real files, and the build finishes **SUCCESS**.
- **jenkins_concepts**: `Source Code Management`, Git plugin, Repository URL, branch specifier `*/main`, workspace, credentials. The checkout log looks like:
```text
Cloning the remote Git repository
 > git clone https://github.com/acme/widget.git
 > git checkout -f origin/main
```
A build step that uses the checked-out files:
```bash
echo "Files in workspace after checkout:"
ls -la
test -f README.md && echo "README found, proceeding with build"
```
- **builds_on**: freestyle-build-steps

### Level 2.3 — Triggers: Poll & Schedule
- **id**: freestyle-triggers
- **scope**: Trigger builds automatically with SCM polling and timed/cron schedules instead of clicking Build Now.
- **difficulty**: 2
- **teach**: Clicking **Build Now** does not scale — you want builds to start on their own. The **Build Triggers** section offers two timed options. **Poll SCM** asks Git on a schedule whether the branch has new commits and builds only when something changed. **Build periodically** builds on a fixed schedule regardless of changes (handy for nightly jobs). Both use a five-field cron syntax (minute, hour, day-of-month, month, day-of-week), and Jenkins adds a special **`H`** ("hash") token that spreads load by picking a stable but arbitrary value in a range — `H/5 * * * *` means "roughly every 5 minutes," staggered so every job does not fire on the same tick.
- **scenario**: Right now a teammate has to remember to build after every push, and they keep forgetting. You want the job to notice new commits by itself and also to run a guaranteed nightly build. You open Build Triggers to set both up and decode the cron syntax as you go.
- **actions**:
  1. Open the job, click **Configure**, and scroll to **Build Triggers**.
  2. Check **Poll SCM** and enter `H/5 * * * *` to check Git for changes about every five minutes.
  3. Check **Build periodically** and enter `H H(0-3) * * *` to force one build nightly between midnight and 3am.
  4. Hover the help to confirm Jenkins' interpretation of your schedule, then **Save**.
  5. Open **Git Polling Log** from the job page to confirm polling is running, and wait for (or simulate) a commit to see a poll-triggered build start.
- **win**: The job's **Build Triggers** show Poll SCM and Build periodically enabled with valid cron expressions (no red validation error), and the **Git Polling Log** records polling activity — a build starts automatically after a new commit lands rather than only on Build Now.
- **jenkins_concepts**: `Build Triggers`, Poll SCM, Build periodically, Jenkins cron (5 fields), the `H` hash token, Git Polling Log. Cron examples:
```text
# minute hour day-of-month month day-of-week
H/5 * * * *      # poll about every 5 minutes (staggered)
H H(0-3) * * *   # one build nightly between 00:00 and 03:59
H 9 * * 1-5      # ~9am on weekdays only
```
- **builds_on**: freestyle-scm

### Level 2.4 — Archiving Artifacts
- **id**: freestyle-artifacts
- **scope**: Add a post-build action that archives build outputs so they persist with the build after the workspace is reused.
- **difficulty**: 2
- **teach**: The **workspace** is reused and overwritten on the next build, so anything your steps produce there is temporary. To keep an output — a jar, a zip, a report — attach an **Archive the artifacts** post-build action. You give it an **Ant-style glob** like `target/*.jar` or `**/build-report.txt`, and after a successful build Jenkins copies the matching files out of the workspace and onto the **build's permanent record**, where they appear as downloadable links on that build's page. Post-build actions run after all build steps complete.
- **scenario**: Your build step produces a packaged artifact in the workspace, but the next build wipes it out and nobody can download yesterday's output. The team wants every build to keep its result attached to it. You add a post-build action so each build leaves a downloadable trail.
- **actions**:
  1. Make sure a build step actually produces an output file (e.g. packages something into `target/`).
  2. Open **Configure** and scroll to **Post-build Actions**.
  3. Click **Add post-build action** and choose **Archive the artifacts**.
  4. In **Files to archive**, enter a glob such as `target/*.zip, **/build-report.txt`.
  5. **Save**, run **Build Now**, then open the finished build's page and confirm the artifacts are listed and downloadable.
- **win**: After a successful build, the build's page shows an **Artifacts** section listing the files matched by your glob (e.g. the zip and the report), each downloadable, and the console output shows the **Archiving artifacts** step running at the end.
- **jenkins_concepts**: `Post-build Actions`, Archive the artifacts, Ant-style glob patterns, build artifacts vs workspace. A build step that produces an artifact to archive:
```bash
mkdir -p target
echo "v1.0 build $BUILD_NUMBER" > target/app.txt
# package it so there is something to archive
( cd target && zip -q app-$BUILD_NUMBER.zip app.txt )
ls -la target/
```
Glob in the **Files to archive** field (comma-separated patterns):
```text
target/*.zip, **/build-report.txt
```
- **builds_on**: freestyle-triggers

### Level 2.5 — Why Freestyle Breaks Down
- **id**: freestyle-limitations
- **scope**: Recognize the structural limits of freestyle jobs that motivate moving to pipeline-as-code.
- **difficulty**: 2
- **teach**: You now have a full freestyle job, but its entire configuration lives **inside Jenkins** as a `config.xml` file, not in your repository. That creates real problems at scale: there is **no code review or diff** for a config change, no version history tied to your commits, and the only way to reuse a job is to **copy it** — so ten similar jobs drift apart over time. Freestyle also has **no first-class stages**: a long script is one opaque block with no per-stage visualization, and there is no clean way to branch logic per environment. A **pipeline** (Chapter 3) fixes this by defining the build as code — a `Jenkinsfile` that lives in the repo, is reviewed like any other change, and renders as discrete stages.
- **scenario**: The freestyle job works, so the team clones it for three more services — and within a month the four configs have quietly diverged and nobody can tell what changed when a build broke. You run a short audit comparing the freestyle approach against pipeline-as-code to decide where the project should go next.
- **actions**:
  1. From the job URL, open `.../config.xml` to see the whole job stored as opaque Jenkins XML inside JENKINS_HOME.
  2. Note that this XML is **not** in your Git repo — a config change leaves no commit, no diff, no reviewer.
  3. Match each freestyle limitation to its consequence in the level's checklist: no review/diff, copy-paste sprawl, no stages/visualization, hard to branch per environment.
  4. Read the side-by-side preview of an equivalent pipeline expressed as a reviewable `Jenkinsfile` with named stages.
  5. Choose "move to pipeline-as-code" to clear the level and unlock Chapter 3.
- **win**: The player correctly maps every listed freestyle limitation (no diff/review, copy-paste sprawl, no stage visualization, no per-environment branching) to the right consequence and selects pipeline-as-code as the resolution, completing the chapter.
- **jenkins_concepts**: `config.xml`, no code review of config, copy-paste job sprawl, lack of stages/visualization, motivation for pipeline-as-code. What freestyle config actually looks like (real config.xml — XML in JENKINS_HOME, not in your repo):
```xml
<!-- config.xml — stored in JENKINS_HOME, not reviewed, not diffable in your repo -->
<project>
  <builders>
    <hudson.tasks.Shell>
      <command>./build.sh</command> <!-- one opaque block, no named stages -->
    </hudson.tasks.Shell>
  </builders>
  <triggers>
    <hudson.triggers.SCMTrigger>
      <spec>H/5 * * * *</spec>
    </hudson.triggers.SCMTrigger>
  </triggers>
</project>
```
The same intent as a reviewable pipeline with real stages (previewed for Chapter 3):
```groovy
// Jenkinsfile — lives in the repo, reviewed via pull request, renders as stages
pipeline {
    agent any
    stages {
        stage('Build') { steps { sh './build.sh' } }
        stage('Test')  { steps { sh './test.sh' } }
    }
}
```
- **builds_on**: freestyle-artifacts, jobs-vs-pipelines

---

## Chapter 3 — Your First Pipeline (Declarative Basics)
_Theme: pipeline as code, the modern default_

**Learning objectives**
- Create a Pipeline job and supply it with a pipeline script (the seed of a Jenkinsfile).
- Write the minimal valid declarative pipeline and understand each mandatory block.
- Model a real build → test → deploy workflow as ordered sequential stages.
- Run real commands with `sh`/`bat`/`echo` and recognize that a non-zero exit fails the stage.
- React to build outcomes with a `post {}` section, then promote the Jenkinsfile into SCM.

**Prerequisites:** Chapters 1-2

**Levels**

### Level 3.1 — The Pipeline Job
- **id**: pipeline-job-and-jenkinsfile
- **scope**: Create a Pipeline job and supply a pipeline script directly in the job configuration.
- **difficulty**: 2
- **teach**: A Pipeline job is a different job type from the freestyle jobs of Chapter 2 — instead of clicking together build steps, you describe the whole build as code. That code is called a *Jenkinsfile*, written in a Groovy-based DSL. For your very first pipeline you can paste the script straight into the job's **Pipeline script** box; later (Level 3.6) the real-world setup keeps that same script in your repo. The job runs the script top to bottom every time you build.
- **scenario**: The team's freestyle "hello" job from Chapter 1 hit the wall you saw at the end of Chapter 2: nobody could review its config and it couldn't branch. Your lead drops a sticky note on your terminal — "Rebuild it as a Pipeline. Same hello, new machine." A blank New Item screen blinks at you.
- **actions**:
  1. From the dashboard, click **New Item**.
  2. Type the name `hello-pipeline` and select **Pipeline** (not Freestyle project), then click **OK**.
  3. Scroll to the **Pipeline** section and leave **Definition** set to **Pipeline script**.
  4. Paste the starter script into the **Pipeline script** textarea (see snippet below).
  5. Click **Save**, then **Build Now**, and open the running build's **Console Output**.
- **win**: A Pipeline job named `hello-pipeline` exists, a build completes with status **SUCCESS**, and the console output contains `Hello, Pipeline`.
- **jenkins_concepts**: "Pipeline" job type, **Pipeline script** definition, Jenkinsfile-as-code. Paste this minimal script:
```groovy
pipeline {
    agent any
    stages {
        stage('Say Hello') {
            steps {
                echo 'Hello, Pipeline'
            }
        }
    }
}
```
- **builds_on**: jobs-vs-pipelines

### Level 3.2 — The Declarative Skeleton
- **id**: declarative-skeleton
- **scope**: Write the minimal valid declarative pipeline using pipeline/agent/stages/stage/steps.
- **difficulty**: 2
- **teach**: Every declarative pipeline is built from a fixed set of nested blocks, and Jenkins rejects the script if any required one is missing. `pipeline {}` is the outermost wrapper; `agent` says *where* it runs (`any` means "any available executor" — the executors you met in Chapter 0); `stages {}` holds one or more `stage {}` blocks; and each `stage` must contain a `steps {}` block with the actual work. Drop the `agent` line or the `steps` block and the build fails before running with a clear syntax error.
- **scenario**: A teammate pasted a half-remembered pipeline and the build went red instantly — `Missing required section "agent"`. You're handed the broken script and told to make it the cleanest possible valid skeleton so the team has a template to copy.
- **actions**:
  1. Open `hello-pipeline` → **Configure** and look at the broken script (it has `stages` but no `agent`, and a `stage` with no `steps`).
  2. Add `agent any` directly under the `pipeline {` line.
  3. Give the lone stage a name, e.g. `stage('Build')`, and wrap its work in a `steps {}` block.
  4. Put a single `echo 'skeleton works'` inside `steps`.
  5. **Save**, **Build Now**, and confirm the red X turns green.
- **win**: The pipeline contains exactly `pipeline`, `agent`, `stages`, one `stage`, and `steps` (all present), and the build finishes **SUCCESS** with `skeleton works` in the log.
- **jenkins_concepts**: Required directives `pipeline`/`agent`/`stages`/`stage`/`steps`; `agent any`. Minimal valid form:
```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'skeleton works'
            }
        }
    }
}
```
A missing `agent` produces: `WorkflowScript: Missing required section "agent"`.
- **builds_on**: pipeline-job-and-jenkinsfile

### Level 3.3 — Build, Test, Deploy Stages
- **id**: multiple-stages
- **scope**: Compose multiple sequential stages to model a real build → test → deploy workflow.
- **difficulty**: 2
- **teach**: Real pipelines split work into named stages that run *in order*, top to bottom. Stages are how Jenkins visualizes a build: the **Stage View** on the job page draws one column per stage so you can see at a glance where time went and which stage failed. The names are yours to choose — `Build`, `Test`, `Deploy` is the canonical trio — and each stage is independent, with its own `steps`. If one stage fails, the stages after it do not run.
- **scenario**: "Hello" proved the machine works; now model the actual flow. The product team wants the pipeline page to show three clean columns — Build, Test, Deploy — so a glance tells anyone where a build is. Right now there's only one stage doing everything.
- **actions**:
  1. Open `hello-pipeline` → **Configure**.
  2. Replace the single stage with three stages named `Build`, `Test`, and `Deploy`.
  3. Give each stage a distinct `echo` so you can tell them apart in the log.
  4. **Save** and **Build Now**.
  5. Return to the job page and read the **Stage View** — three columns should appear in order.
- **win**: The pipeline defines three sequential stages named exactly `Build`, `Test`, `Deploy`; the build is **SUCCESS**; and the Stage View shows all three columns left-to-right.
- **jenkins_concepts**: Sequential `stage` ordering, **Stage View**. Three-stage workflow:
```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps { echo 'Compiling the app...' }
        }
        stage('Test') {
            steps { echo 'Running tests...' }
        }
        stage('Deploy') {
            steps { echo 'Shipping to staging...' }
        }
    }
}
```
- **builds_on**: declarative-skeleton

### Level 3.4 — Core Steps
- **id**: sh-and-echo-steps
- **scope**: Use sh / bat / echo steps and understand that a non-zero shell exit fails the stage.
- **difficulty**: 2
- **teach**: `echo` only prints text, but real work happens in shell steps: `sh` runs a command on Linux/macOS agents and `bat` runs one on Windows agents. The key rule is exit codes — if a `sh` command exits non-zero, the step fails, the stage fails, and the rest of the pipeline stops. That is exactly why a failing `make build` turns your pipeline red instead of silently passing. (By default `sh` only cares whether the exit code is zero; capturing the actual exit code or the command's output into a variable needs a `script {}` block, which we save for Chapter 12.)
- **scenario**: The echoes were theater. Today the Build stage must run a real command, and you'll watch a deliberately broken command paint the build red — proof that exit codes are the pipeline's nervous system.
- **actions**:
  1. In the **Build** stage, replace the `echo` with a real `sh` command such as `sh 'echo building && uname -a'`.
  2. **Build Now** and confirm Build still passes (the command exits 0).
  3. In the **Test** stage, add `sh 'exit 1'` to simulate a failing test, **Build Now**, and watch Test go red and Deploy get skipped.
  4. Replace that `sh 'exit 1'` with a command that succeeds, e.g. `sh 'echo running tests && true'`.
  5. **Build Now** once more and confirm the pipeline now reaches Deploy and finishes green.
- **win**: The Build stage runs a real `sh` step that passes; the player has observed a non-zero `sh` exit fail a stage and halt later stages; and the final configured build completes **SUCCESS**.
- **jenkins_concepts**: `sh`, `bat`, `echo`, exit-code-driven failure (`returnStatus`/`returnStdout` exist for capturing the code/output but require a `script {}` block — Chapter 12).
```groovy
stage('Build') {
    steps {
        sh 'echo building && uname -a'   // non-zero exit here would fail the stage
    }
}
stage('Test') {
    steps {
        sh 'echo running tests && true'  // swap in 'exit 1' to watch the stage go red
    }
}
// On a Windows agent you would use bat instead:
//   bat 'echo building'
```
- **builds_on**: multiple-stages

### Level 3.5 — Post Conditions
- **id**: post-conditions
- **scope**: Add a post {} section that runs steps on always/success/failure/unstable/changed.
- **difficulty**: 3
- **teach**: Sometimes you need work to happen *after* the stages regardless of how they ended — cleaning the workspace, sending a notification, archiving logs. That's the `post {}` block. It holds condition blocks that Jenkins runs based on the final result: `always` runs every time, `success` only when green, `failure` only when red, `unstable` when tests marked the build unstable, and `changed` when the result differs from the previous build. `post` can sit at the end of the whole `pipeline` (runs after all stages) or inside a single `stage`.
- **scenario**: A failing nightly build sat unnoticed for a weekend because nothing announced it. Mandate from the lead: every run must clean up after itself and shout loudly when it breaks. You'll wire that in with `post`.
- **actions**:
  1. Open `hello-pipeline` → **Configure**.
  2. After the closing brace of `stages`, add a `post {}` block at the pipeline level.
  3. Add an `always` condition that prints a "pipeline finished" message (a stand-in for cleanup).
  4. Add `success` and `failure` conditions, each with a distinct `echo`.
  5. **Build Now** while passing (see `success` + `always` fire), then force a failure with `sh 'exit 1'` in a stage and rebuild to see `failure` + `always` fire.
- **win**: The pipeline has a pipeline-level `post {}` with at least `always`, `success`, and `failure`; a passing build logs the `success` and `always` messages; a deliberately failing build logs the `failure` and `always` messages.
- **jenkins_concepts**: `post`, conditions `always`/`success`/`failure`/`unstable`/`changed`.
```groovy
pipeline {
    agent any
    stages {
        stage('Build') { steps { echo 'build' } }
        stage('Test')  { steps { echo 'test'  } }
    }
    post {
        always   { echo 'Pipeline finished — tidying up.' }
        success  { echo 'All green. Nothing to see here.' }
        failure  { echo 'BROKEN — someone get paged.' }
        unstable { echo 'Built, but tests are flaky.' }
    }
}
```
A common `always` step is `cleanWs()`, which wipes the workspace — it comes from the Workspace Cleanup plugin, so we use a plain `echo` placeholder here and revisit plugin-provided steps in Chapter 8.
- **builds_on**: sh-and-echo-steps

### Level 3.6 — Jenkinsfile from SCM
- **id**: pipeline-from-scm
- **scope**: Move the Jenkinsfile into the repository and configure Pipeline script from SCM.
- **difficulty**: 3
- **teach**: Pasting a script into the job box is fine for learning, but it isn't version-controlled, reviewable, or shareable — the whole point of "pipeline as code." The real workflow stores the script in a file literally named `Jenkinsfile` at the repo root, then points the job at the repo. You switch **Definition** from *Pipeline script* to **Pipeline script from SCM**, choose **Git**, give the repo URL (the same Git SCM setup you learned in freestyle Chapter 2), and set **Script Path** to `Jenkinsfile`. Now every build checks out the repo and runs whatever Jenkinsfile is on that branch.
- **scenario**: Your pasted pipeline works, but a teammate just overwrote it by editing the job and there's no history of who changed what. Time to graduate: commit the Jenkinsfile to the repo so it lives next to the code it builds and every change goes through review.
- **actions**:
  1. Create a file named `Jenkinsfile` (no extension) at the root of your Git repo, paste your working pipeline into it, and commit + push it.
  2. In Jenkins, open the job → **Configure** → **Pipeline** section.
  3. Change **Definition** to **Pipeline script from SCM** and select **SCM: Git**.
  4. Enter the **Repository URL** (and credentials if private), and set **Branch Specifier** to `*/main`.
  5. Set **Script Path** to `Jenkinsfile`, **Save**, then **Build Now** and confirm the log shows a Git checkout before the stages run.
- **win**: A `Jenkinsfile` exists at the repo root and is committed; the job's Definition is **Pipeline script from SCM** with **Script Path** `Jenkinsfile`; and a build succeeds whose console output shows the repo being checked out (e.g. `Obtained Jenkinsfile from git` and a `git checkout`) before the stages execute.
- **jenkins_concepts**: **Pipeline script from SCM**, **Script Path**, repo-root `Jenkinsfile`, Git checkout-before-run.
```groovy
// File: Jenkinsfile  (committed at the repository root)
pipeline {
    agent any
    stages {
        stage('Build')  { steps { sh 'echo building'  } }
        stage('Test')   { steps { sh 'echo testing'   } }
        stage('Deploy') { steps { sh 'echo deploying' } }
    }
    post {
        always  { echo 'done' }
        failure { echo 'build failed' }
    }
}
```
```bash
# Put the pipeline under version control
git add Jenkinsfile
git commit -m "Add Jenkinsfile: build/test/deploy pipeline"
git push origin main
```
- **builds_on**: post-conditions, freestyle-scm

---

## Chapter 4 — Jenkinsfile Deep Dive
_Theme: the directives that turn a skeleton into a real pipeline_

**Learning objectives**
- Control where each stage executes using `agent` at the pipeline and stage level, including `agent none`.
- Declare and consume `environment {}` variables, mixing custom values with built-in vars like `BUILD_NUMBER`.
- Parameterize a build with `parameters {}` and read the values back through `params.X`.
- Gate stages with `when {}` conditions based on branch, environment, or arbitrary expressions.
- Apply pipeline `options {}` and auto-installed `tools {}`, inject a stored credential with `credentials()`, and pause for human approval with the `input` step.

**Prerequisites:** Chapter 3

**Levels**

### Level 4.1 — Agent Directives
- **id**: agent-directives
- **scope**: Set agents at pipeline vs stage level, and use `agent none` to require per-stage agents.
- **difficulty**: 3
- **teach**: The `agent` directive tells Jenkins *where* work runs — which controller or build agent gets a workspace and an executor (the controller/agent/executor split from Chapter 0). A top-level `agent any` gives the whole pipeline one workspace on any available node, while a per-`stage` `agent` overrides that just for that stage. Setting the top-level to `agent none` means the pipeline reserves no global node, so every `stage` is then *required* to declare its own agent or the pipeline fails validation. This matters when different stages need different machines (a `linux` builder, a `windows` packager) without holding one executor for the entire run. The labels (`linux`, `windows`) refer to agent labels — the same node-tagging you will configure in Chapter 9; here you just consume labels that already exist.
- **scenario**: The Foundry's build floor has three labelled machines humming. Your pipeline currently grabs one machine and clings to it from start to finish, starving the queue. The shift supervisor wants each stage to claim only the machine it needs and let go when done.
- **actions**:
  1. Open the pipeline editor and confirm the skeleton currently reads `agent any` at the top.
  2. Change the top-level directive to `agent none` and watch the validator flag every stage as missing an agent.
  3. Give the `Build` stage `agent { label 'linux' }` and the `Package` stage `agent { label 'windows' }`.
  4. Run the pipeline and watch each stage light up its own machine on the floor, releasing it the moment the stage ends.
  5. Read the console header for each stage to confirm it ran on the expected node.
- **win**: The pipeline declares `agent none` at top level, both stages declare their own labelled agent, the build is green, and the `Build` and `Package` stages report running on the `linux` and `windows` nodes respectively.
- **jenkins_concepts**:
```groovy
pipeline {
  agent none            // no global workspace; each stage must supply its own
  stages {
    stage('Build') {
      agent { label 'linux' }
      steps { sh 'echo building on $(hostname)' }
    }
    stage('Package') {
      agent { label 'windows' }
      steps { bat 'echo packaging on %COMPUTERNAME%' }
    }
  }
}
```
With `agent none`, a stage that declares no `agent` of its own fails validation — Jenkins reports something like `Error: Agent must be specified for stages or pipeline`. By contrast `agent any` pins one node for the whole run.
- **builds_on**: declarative-skeleton, controller-agent-executor

### Level 4.2 — The Environment Block
- **id**: environment-block
- **scope**: Declare `environment {}` variables and use built-in vars like `BUILD_NUMBER` and `GIT_COMMIT`.
- **difficulty**: 3
- **teach**: The `environment {}` block defines variables that are exported as real environment variables inside every `sh`/`bat` step, and are also reachable as Groovy values inside the pipeline. You can hardcode strings (`APP = 'web'`) or interpolate other variables, including Jenkins' built-in ones like `BUILD_NUMBER` (the incrementing run counter) and `GIT_COMMIT` (the checked-out SHA, available after a checkout). Built-ins are also reachable through the `env` object — `env.BRANCH_NAME`, `env.WORKSPACE` — without declaring them. Watch the quoting: double quotes make Groovy interpolate `${BUILD_NUMBER}` when the `environment` block is evaluated, while single quotes inside a shell step leave expansion to the *shell* (`$VERSION` is expanded by the exported env var at runtime).
- **scenario**: Every artifact leaving the Foundry needs a stamped version tag, but right now builds ship as nameless blobs. Procurement demands a traceable label of the form `web-1.<run number>` printed on every package, derived automatically from the build.
- **actions**:
  1. Add an `environment {}` block to the pipeline and define `APP = 'web'`.
  2. Add `VERSION = "1.${BUILD_NUMBER}"` so the version tracks each run automatically.
  3. In the build stage, echo the stamp using the shell's own expansion: `sh 'echo Shipping ${APP}-${VERSION}'`.
  4. Add a step that prints the workspace path with `echo "Working in ${env.WORKSPACE}"`.
  5. Run the build twice and confirm the printed version increments (`web-1.7`, then `web-1.8`).
- **win**: The console prints `Shipping web-1.<BUILD_NUMBER>` with the real run number, the workspace path appears via `env.WORKSPACE`, and re-running the build produces an incremented version string.
- **jenkins_concepts**:
```groovy
pipeline {
  agent any
  environment {
    APP     = 'web'
    VERSION = "1.${BUILD_NUMBER}"   // double quotes: Groovy fills in BUILD_NUMBER
  }
  stages {
    stage('Build') {
      steps {
        sh 'echo Shipping ${APP}-${VERSION}'   // single quotes: the shell expands the exported vars
        echo "Working in ${env.WORKSPACE}"     // double quotes: Groovy reads env.WORKSPACE
      }
    }
  }
}
```
Built-ins you did not declare are still available: `env.BUILD_NUMBER`, `env.GIT_COMMIT`, `env.BRANCH_NAME`, `env.JOB_NAME`.
- **builds_on**: agent-directives

### Level 4.3 — Build Parameters
- **id**: parameters-block
- **scope**: Declare `parameters {}` (string, booleanParam, choice) and read them via `params.X`.
- **difficulty**: 3
- **teach**: The `parameters {}` block turns a fixed pipeline into one the operator configures at launch. Declaring parameters changes the build button to **Build with Parameters**, presenting a form with the inputs you defined: `string` for free text, `booleanParam` for a checkbox, `choice` for a fixed dropdown. Inside the pipeline you read them through the `params` object — `params.ENV`, `params.SKIP_TESTS`. One quirk worth knowing: the parameter definitions only take effect *after* the first run that registers them, so the very first build often runs with the declared defaults before the **Build with Parameters** form appears.
- **scenario**: The Foundry runs the same pipeline to ship to `dev` and to `prod`, and sometimes needs to skip the slow test suite for an emergency fix. Operators have been hand-editing the Jenkinsfile each time — risky and slow. They want a launch form instead.
- **actions**:
  1. Add a `parameters {}` block with a `choice` named `ENV` offering `dev` and `prod`.
  2. Add a `booleanParam` named `SKIP_TESTS` defaulting to `false`.
  3. In a `Deploy` stage, echo the target with `echo "Deploying to ${params.ENV}"`.
  4. In a `Test` stage, branch on the flag: `echo(params.SKIP_TESTS ? 'Skipping tests' : 'Running tests')`.
  5. Click **Build with Parameters**, pick `prod`, tick `SKIP_TESTS`, and confirm the console reflects both choices.
- **win**: The job shows a **Build with Parameters** form; a run with `ENV=prod` and `SKIP_TESTS=true` prints `Deploying to prod` and `Skipping tests` in the console.
- **jenkins_concepts**:
```groovy
pipeline {
  agent any
  parameters {
    choice(name: 'ENV', choices: ['dev', 'prod'], description: 'Target environment')
    booleanParam(name: 'SKIP_TESTS', defaultValue: false, description: 'Skip the test suite')
    string(name: 'RELEASE_NOTE', defaultValue: '', description: 'Optional note')
  }
  stages {
    stage('Test') {
      steps { echo(params.SKIP_TESTS ? 'Skipping tests' : 'Running tests') }
    }
    stage('Deploy') {
      steps { echo "Deploying to ${params.ENV}" }
    }
  }
}
```
`params.SKIP_TESTS` is a real Boolean; `params.ENV` is a String. The form only appears once the parameters have been registered by a prior run.
- **builds_on**: environment-block

### Level 4.4 — Conditional Stages with when
- **id**: when-conditions
- **scope**: Run stages conditionally with `when { branch / environment / expression }`.
- **difficulty**: 3
- **teach**: The `when {}` directive lets a stage decide at runtime whether to execute, so one Jenkinsfile can serve many situations. Common forms: `when { branch 'main' }` runs only on the main branch, `when { environment name: 'DEPLOY', value: 'true' }` matches an env var, and `when { expression { params.ENV == 'prod' } }` runs arbitrary Groovy returning a boolean. You can combine conditions with `allOf {}`, `anyOf {}`, and `not {}`. A skipped stage shows up greyed in the build view — it didn't fail, it simply wasn't applicable. (`branch` only resolves against a real branch name in a multibranch pipeline, which arrives in Chapter 5; in a plain pipeline job with no branch context the `branch` condition is treated as not matched.)
- **scenario**: Production deploys must *never* fire from a feature branch or a `dev` run, but the team keeps one Jenkinsfile for everything. You need the `Deploy to prod` stage to engage only when both the branch and the chosen environment line up.
- **actions**:
  1. Add a `Deploy to prod` stage after the build stages.
  2. Guard it with `when { expression { params.ENV == 'prod' } }` so it skips on `dev`.
  3. Tighten it to require the main branch too, using `allOf { branch 'main'; expression { params.ENV == 'prod' } }`.
  4. Run once on a feature branch with `ENV=prod` and confirm the stage is greyed out as skipped.
  5. Run on `main` with `ENV=prod` and confirm the stage executes.
- **win**: The `Deploy to prod` stage is skipped (greyed, build still green) for any run that is not `main` + `ENV=prod`, and executes only when both conditions hold.
- **jenkins_concepts**:
```groovy
stage('Deploy to prod') {
  when {
    allOf {
      branch 'main'
      expression { params.ENV == 'prod' }
    }
  }
  steps { echo 'Releasing to production' }
}
```
Other shapes:
```groovy
when { environment name: 'DEPLOY', value: 'true' }    // matches an env var
when { anyOf { branch 'main'; branch 'release/*' } }   // either branch
when { not { branch 'main' } }                         // everything but main
```
- **builds_on**: parameters-block

### Level 4.5 — Options & Tools
- **id**: options-and-tools
- **scope**: Apply pipeline options (timeout, retry, timestamps, disableConcurrentBuilds) and auto-install tools.
- **difficulty**: 3
- **teach**: The `options {}` block sets pipeline-wide behaviour: `timeout(time: 30, unit: 'MINUTES')` aborts a hung run, `timestamps()` prefixes every console line with a clock, `retry(2)` re-runs the whole pipeline on failure (up to 2 attempts total), and `disableConcurrentBuilds()` stops two runs of the same job overlapping. The `tools {}` block tells Jenkins to auto-install and put a registered toolchain on `PATH` — e.g. `maven 'M3'` or `jdk '17'`, where `'M3'`/`'17'` are installation *names* defined in **Manage Jenkins > Tools** (Global Tool Configuration). Together they make a pipeline both self-protecting and self-provisioning, so it doesn't depend on whatever happens to be installed on the agent.
- **scenario**: One of the Foundry's pipelines occasionally hangs forever waiting on a frozen step, and two operators sometimes launch it at once and corrupt the workspace. On top of that, the build assumes Maven is already on the agent — and on a fresh machine it isn't.
- **actions**:
  1. Add an `options {}` block with `timeout(time: 30, unit: 'MINUTES')` to kill any run that overruns.
  2. Add `timestamps()` so each console line is time-stamped, and `disableConcurrentBuilds()` to serialize runs.
  3. Add a `tools {}` block requesting `maven 'M3'` and `jdk '17'`.
  4. In the build stage run `sh 'mvn -version'` to prove the auto-installed Maven is on `PATH`.
  5. Launch the job twice in quick succession and confirm the second run queues behind the first.
- **win**: Console lines carry timestamps, `mvn -version` succeeds using the `M3` tool, a deliberately overrunning run is aborted at the timeout, and a second concurrent launch waits rather than running in parallel.
- **jenkins_concepts**:
```groovy
pipeline {
  agent any
  options {
    timeout(time: 30, unit: 'MINUTES')
    timestamps()
    disableConcurrentBuilds()
    retry(2)
  }
  tools {
    maven 'M3'   // installation name from Manage Jenkins > Tools
    jdk   '17'
  }
  stages {
    stage('Build') {
      steps { sh 'mvn -version' }   // M3 is now on PATH
    }
  }
}
```
If the tool name doesn't match a registered installation the run fails with something like: `Tool type "maven" does not have an install of "M3" configured`.
- **builds_on**: when-conditions

### Level 4.6 — Credentials in Environment
- **id**: credentials-in-env
- **scope**: Inject a stored credential into the environment with the `credentials()` helper after creating the credential first.
- **difficulty**: 4
- **teach**: Secrets never belong in a Jenkinsfile. Jenkins stores them in its credentials store, and the `credentials()` helper inside an `environment {}` block binds a stored secret to an environment variable by its credential *ID* — not its literal value. For a **Secret text** credential, `API_KEY = credentials('api-key')` sets the `API_KEY` env var to the secret for the duration of the run. Jenkins automatically *masks* the value in the console, so even an accidental print shows `****`. The cardinal rule: bind it, use it inside a step, never `echo` it on purpose. (A full treatment of credential types and the `withCredentials` step comes in Chapter 7 — here you only need the `environment` binding.)
- **scenario**: The deploy step needs to call an external API that demands a key. The previous engineer pasted the key straight into the Jenkinsfile, and it's now sitting in Git history for the whole org to read. You need to move it into Jenkins' credentials store and reference it safely.
- **actions**:
  1. In **Manage Jenkins > Credentials**, add a **Secret text** credential with ID `api-key` holding the key value.
  2. Add an `environment {}` block binding it: `API_KEY = credentials('api-key')`.
  3. In the deploy stage, pass it to the tool *without* printing it: `sh 'curl -s -H "Authorization: Bearer $API_KEY" https://api.example.com/deploy'`.
  4. Deliberately try `sh 'echo $API_KEY'` and observe Jenkins masks the output as `****`.
  5. Remove the echo, confirm the deploy step authenticates, and verify the raw secret never appears in the log.
- **win**: A `Secret text` credential `api-key` exists, the pipeline binds it via `credentials('api-key')`, the deploy step uses `$API_KEY` successfully, and any attempt to print it renders as `****` in the console.
- **jenkins_concepts**:
```groovy
pipeline {
  agent any
  environment {
    API_KEY = credentials('api-key')   // binds the stored Secret text by ID
  }
  stages {
    stage('Deploy') {
      steps {
        // use it inside a step; never echo it
        sh 'curl -s -H "Authorization: Bearer $API_KEY" https://api.example.com/deploy'
      }
    }
  }
}
```
Even `sh 'echo $API_KEY'` prints `****` — Jenkins masks known secret values in logs. (Other credential kinds and the `withCredentials` step are covered in Chapter 7.)
- **builds_on**: environment-block

### Level 4.7 — Manual Approval with input
- **id**: input-step
- **scope**: Pause the pipeline for human approval using the `input` step.
- **difficulty**: 4
- **teach**: The `input` step halts a running pipeline and waits for a human to click **Proceed** or **Abort** in the UI. Its `message` is the prompt, `ok` relabels the proceed button, and `submitter` restricts *who* may approve — e.g. only the `release-team` group. While paused, the build sits in a waiting state holding its stage; aborting stops the build (it ends as ABORTED), while proceeding lets it continue. Because a naked `input` inside a stage keeps that stage's agent and executor occupied while it waits, real pipelines often pause in a stage with no agent reserved — but the mechanics are what matter here. Combined with the `post {}` section from Chapter 3, you can react to whichever outcome happens.
- **scenario**: A production deploy just got fully automated — a little *too* automated. Last week a build sailed straight into prod at 2am with nobody watching. The release team wants a human gate: the pipeline must stop and ask before it touches production, and only they should be allowed to say yes.
- **actions**:
  1. Add an `Approve` stage before the production deploy stage.
  2. Insert `input message: 'Deploy to prod?', ok: 'Deploy', submitter: 'release-team'`.
  3. Run the pipeline and watch it pause at the `Approve` stage, showing **Deploy** / **Abort** buttons.
  4. As a non-member, confirm you are not offered the approval; as `release-team`, click **Deploy** and watch the deploy stage proceed.
  5. Re-run and click **Abort** instead, then confirm a `post { aborted { ... } }` branch reports the cancellation.
- **win**: The pipeline blocks at the `input` step until acted on; clicking **Deploy** as `release-team` continues to the deploy stage, while **Abort** stops the build (ABORTED) and triggers the matching `post` condition.
- **jenkins_concepts**:
```groovy
stage('Approve') {
  steps {
    input message: 'Deploy to prod?', ok: 'Deploy', submitter: 'release-team'
  }
}
stage('Deploy to prod') {
  steps { echo 'Shipping to production' }
}
```
React to the outcome with `post` (from Chapter 3):
```groovy
post {
  aborted { echo 'Release was cancelled by a human' }
  success { echo 'Release approved and deployed' }
}
```
A pending `input` blocks indefinitely until someone clicks Proceed or Abort.
- **builds_on**: post-conditions

---

## Chapter 5 — Source Control Integration
_Theme: make pipelines react to code the moment it changes_

**Learning objectives**
- Check out a repository from inside a pipeline using `checkout scm` and the explicit `git` step.
- Contrast SCM polling (pull) with webhooks (push) and pick the right trigger for a situation.
- Configure a GitHub webhook so a `git push` kicks off a build within seconds.
- Stand up a multibranch pipeline that auto-discovers every branch carrying a `Jenkinsfile`.
- Build pull requests, report commit status back to GitHub, and onboard whole organizations with org folders.

**Prerequisites:** Chapters 3-4

**Levels**

### Level 5.1 — Checking Out Source
- **id**: scm-checkout
- **scope**: Check out the repo inside a pipeline with `checkout scm` and the `git` step.
- **difficulty**: 3
- **teach**: With a single top-level `agent` (e.g. `agent any`), a Pipeline-from-SCM job does an implicit checkout of your source once before the stages run, so the files are already there. The moment you switch to `agent none` and give each stage its *own* agent (the per-stage agents you met in 5.1), each stage lands in a fresh, empty workspace and that implicit checkout no longer covers it — the source is simply not there. The portable fix is `checkout scm`: it replays the *exact* repo/branch/credentials Jenkins used to fetch the `Jenkinsfile`, so it works no matter which agent the stage runs on. To clone a *different* or hardcoded repo instead, use the `git` step: `git url:'...', branch:'...', credentialsId:'...'`. Knowing which to reach for keeps your Jenkinsfile working everywhere. (Stored credentials and `credentialsId` are covered in depth in Chapter 7 — for now treat `github-pat` as an already-saved credential, and omit `credentialsId` entirely for public repos.)
- **scenario**: Your team's pipeline runs fine until someone adds `agent none` and per-stage agents — suddenly the "Test" stage can't find the source code because it landed on a clean agent with an empty workspace. Mission Control flags `ls: cannot access 'pom.xml': No such file or directory`. You must restore the checkout.
- **actions**:
  1. Open the broken pipeline and confirm the `Build` stage's `sh 'ls'` shows the repo, but the `Test` stage on a second agent shows an empty workspace.
  2. Add `checkout scm` as the first step of the `Test` stage so it replays the same Git source Jenkins used for the `Jenkinsfile`.
  3. Re-run and watch the `Test` stage now list `pom.xml` and `src/`.
  4. For a side task, add a separate `Docs` stage that clones a *different* repo with an explicit `git url: 'https://github.com/acme/docs.git', branch: 'main'` step.
  5. Confirm both checkouts land in their respective workspaces and the build goes green.
- **win**: The `Test` stage workspace contains the project files (its `sh 'ls'` lists `pom.xml`), the `Docs` stage successfully clones the second repo, and the overall build result is SUCCESS.
- **jenkins_concepts**: `checkout scm` (replays job-configured SCM) vs the `git` step (explicit repo). `scm` is the global variable holding the job's SCM config; with `agent none` there is no implicit checkout, so each agent stage must check out for itself.
```groovy
pipeline {
  agent none
  stages {
    stage('Build') {
      agent { label 'linux' }
      steps {
        checkout scm
        sh 'ls -la'
      }
    }
    stage('Test') {
      agent { label 'linux' }
      steps {
        checkout scm                 // re-fetch source on this fresh agent
        sh 'ls pom.xml'
      }
    }
    stage('Docs') {
      agent { label 'linux' }
      steps {
        git url: 'https://github.com/acme/docs.git',
            branch: 'main',
            credentialsId: 'github-pat'   // omit for public repos (see Ch 8)
      }
    }
  }
}
```
- **builds_on**: pipeline-from-scm

### Level 5.2 — Polling vs Webhooks
- **id**: poll-vs-webhook
- **scope**: Compare SCM polling (pull) and webhooks (push) and decide when each is appropriate.
- **difficulty**: 3
- **teach**: There are two ways Jenkins learns that code changed. **Polling** has Jenkins ask the repo "anything new?" on a schedule — in a declarative pipeline you write `triggers { pollSCM('H/15 * * * *') }`. It is simple and firewall-friendly, but it wastes cycles when nothing changed and adds latency (a push at minute 1 waits up to 15 minutes). The cron string reuses the five-field syntax you met with freestyle timed triggers in 3.3: `MINUTE HOUR DOM MONTH DOW`. The `H` ("hash") symbol picks a stable but *staggered* slot for each job, so 40 jobs don't all poll on the exact same tick. **Webhooks** flip the direction: the SCM server pushes an HTTP event to Jenkins the instant something happens, so builds start in seconds with zero idle polling. Polling is the fallback when Jenkins isn't reachable from the internet; webhooks are the default everywhere else. (The full `triggers {}` directive is explored in Chapter 6 — here you only need `pollSCM`.)
- **scenario**: Developers complain that builds for the `payments` repo lag "ten minutes behind" their pushes, and the Jenkins controller's CPU graph shows a sawtooth of constant SCM polling across 40 jobs. You're asked to first prove you understand the tradeoff, then dial polling down as a stopgap before the team adopts webhooks next level.
- **actions**:
  1. Inspect the current job: it uses `triggers { pollSCM('* * * * *') }` — polling every single minute, hammering Git.
  2. In the level's decision panel, match each property (latency, controller load, works behind a firewall, event-driven) to **Polling** or **Webhook**.
  3. Reduce the damage by changing the cron to `H/15 * * * *` so the load spreads out (the `H` staggers jobs instead of firing them all on the same tick).
  4. Add a note in the job description that this is temporary pending webhook setup.
  5. Re-run "Poll Now" and confirm a build only triggers when there's a new commit, not on every poll.
- **win**: The trigger is changed to a staggered 15-minute poll (`H/15 * * * *`), all four tradeoff properties are matched correctly, and a manual poll triggers a build only when a new commit exists.
- **jenkins_concepts**: `pollSCM` cron syntax, the `H` (hash) symbol for load spreading, latency-vs-load tradeoff. Cron fields: `MINUTE HOUR DOM MONTH DOW`.
```groovy
// Polling: Jenkins pulls on a schedule — latency up to the interval
pipeline {
  agent any
  triggers {
    pollSCM('H/15 * * * *')   // every ~15 min, staggered across jobs
  }
  stages {
    stage('Build') { steps { checkout scm; sh './build.sh' } }
  }
}
```
```bash
# Why polling hurts at scale: every interval, for every job, Jenkins
# contacts the remote to see whether the tip moved
git ls-remote origin    # network + CPU cost even when nothing changed
```
- **builds_on**: scm-checkout, freestyle-triggers

### Level 5.3 — GitHub Webhook Trigger
- **id**: github-webhook
- **scope**: Configure a GitHub webhook so pushes trigger the Jenkins job instantly.
- **difficulty**: 3
- **teach**: A webhook makes GitHub call Jenkins the moment a push lands. You point the repo at Jenkins' fixed endpoint `http://<your-jenkins>/github-webhook/`, and the GitHub plugin listens there. On the Jenkins side you enable the trigger labeled **"GitHub hook trigger for GITScm polling"** — confusingly named, but it means "build when a GitHub hook tells me this repo changed" (on receiving the hook it does one lightweight SCM check to find the new commit, then builds). The flow is: push → GitHub POSTs a JSON payload to `/github-webhook/` → Jenkins matches it to jobs whose configured Git remote URL equals the repo in the payload → build starts. In a Jenkinsfile the same trigger is written `triggers { githubPush() }`.
- **scenario**: The team has approved webhooks. Your Jenkins is reachable at `https://ci.acme.dev`. You need to wire the `payments` repo so the next push from a developer turns the build green within seconds — and prove the ten-minute lag is gone.
- **actions**:
  1. In the Jenkins job config, tick **"GitHub hook trigger for GITScm polling"** under Build Triggers (and remove the old `pollSCM`).
  2. In the simulated GitHub repo, go to **Settings → Webhooks → Add webhook** and set the Payload URL to `https://ci.acme.dev/github-webhook/` with content type `application/json`.
  3. Choose "Just the push event" and save; GitHub fires a test `ping` — confirm Jenkins shows a green check in Recent Deliveries.
  4. Push a commit in the simulator and watch the build appear in the queue within seconds, with cause "Started by GitHub push by <user>".
  5. Verify the build console shows the new commit SHA was checked out.
- **win**: The webhook delivers a successful `ping` (HTTP 200), the job's trigger is the GitHub hook (not polling), and a simulated push starts a build whose cause reads "Started by GitHub push".
- **jenkins_concepts**: The `/github-webhook/` endpoint, the GitHub plugin, the "GitHub hook trigger for GITScm polling" checkbox, and its `githubPush()` Jenkinsfile equivalent.
```groovy
pipeline {
  agent any
  triggers {
    githubPush()        // fires when a GitHub webhook reports a push
  }
  stages {
    stage('Build') { steps { checkout scm; sh './build.sh' } }
  }
}
```
```bash
# Shape of what GitHub POSTs to Jenkins on each push (simplified):
curl -X POST https://ci.acme.dev/github-webhook/ \
  -H 'Content-Type: application/json' \
  -H 'X-GitHub-Event: push' \
  -d '{"ref":"refs/heads/main","repository":{"url":"https://github.com/acme/payments"}}'
```
- **builds_on**: poll-vs-webhook

### Level 5.4 — Multibranch Pipelines
- **id**: multibranch-pipeline
- **scope**: Create a multibranch pipeline that auto-creates a job per branch containing a `Jenkinsfile`.
- **difficulty**: 4
- **teach**: A plain Pipeline job builds one branch. A **Multibranch Pipeline** instead points at a whole repository, scans every branch, and auto-creates a sub-job for each branch that contains a `Jenkinsfile` — and deletes the sub-job when the branch is gone. Each branch's build uses *its own* `Jenkinsfile`, so a feature branch can change the pipeline safely. Inside the build Jenkins injects `env.BRANCH_NAME`, letting one Jenkinsfile behave differently per branch — for example, the `when { branch 'main' }` condition you met in 5.4 to deploy only from `main`.
- **scenario**: The `payments` repo now has `main`, `develop`, and three feature branches, and developers keep manually cloning the job for each new branch. You're tasked with replacing that mess with a single multibranch pipeline that discovers branches on its own and only deploys from `main`.
- **actions**:
  1. Choose **New Item → Multibranch Pipeline** and name it `payments`.
  2. Under **Branch Sources**, add the GitHub source pointing at the `payments` repo with the `github-pat` credential.
  3. Trigger **Scan Repository Now**; watch Jenkins discover `main`, `develop`, and the feature branches that contain a `Jenkinsfile` (and skip a branch that has none).
  4. Open the auto-created `main` sub-job and confirm it built; check that a `when { branch 'main' }`-gated Deploy stage ran only there.
  5. Create a new branch `hotfix/x` in the simulator with a `Jenkinsfile` and re-scan — a new sub-job appears automatically.
- **win**: The multibranch pipeline auto-creates one sub-job per branch with a `Jenkinsfile` (and none for the branch without one), the Deploy stage runs only on `main`, and adding `hotfix/x` produces a new sub-job after a scan.
- **jenkins_concepts**: Multibranch item type, branch indexing/scanning, `env.BRANCH_NAME`, and per-branch `when` gating.
```groovy
pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo "Building branch ${env.BRANCH_NAME}"
        sh './build.sh'
      }
    }
    stage('Deploy') {
      when { branch 'main' }          // only the main branch deploys
      steps { sh './deploy.sh staging' }
    }
  }
}
```
```bash
# Each branch is its own job + workspace; BRANCH_NAME is injected automatically
echo "On branch: $BRANCH_NAME"   # e.g. main, develop, feature/login
```
- **builds_on**: github-webhook

### Level 5.5 — Building Pull Requests
- **id**: pr-builds
- **scope**: Discover and build pull/merge requests and report commit status back to the SCM.
- **difficulty**: 4
- **teach**: A multibranch pipeline can also discover **pull requests** as build targets, not just branches. Under the branch source's behaviors you add **"Discover pull requests from origin"** (and/or forks) and choose whether to build the PR's *head* (the raw branch tip) or the *merge* (the PR branch merged into its target — what the PR would actually produce). Jenkins then injects `env.CHANGE_ID` (the PR number), `env.CHANGE_TARGET` (the base branch), and reports each build back to GitHub as a **commit status check** so the PR shows a green check or red x that branch protection can require before the merge button unlocks. To run a stage only on PR builds, use the `when { changeRequest() }` condition (a multibranch-only extension of the `when` block from 5.4).
- **scenario**: Reviewers keep merging PRs that break `main` because nobody runs the tests until after merge. You're asked to make every PR build automatically and post a required status check so a red build blocks the merge button.
- **actions**:
  1. In the `payments` multibranch source, add the behavior **"Discover pull requests from origin"** and set the strategy to **Merging the pull request with the current target branch revision**.
  2. Re-scan; confirm a new category **Pull Requests** appears with a sub-job named `PR-42`.
  3. Open `PR-42` and verify the build logged `CHANGE_ID=42` and `CHANGE_TARGET=main`.
  4. In the simulated GitHub PR, confirm a status check named `continuous-integration/jenkins/pr-merge` flipped to a green check on success.
  5. Push a failing commit to the PR branch, watch the check turn red, and see the PR's merge button become blocked.
- **win**: A `PR-N` sub-job exists and builds the *merge* result, the build exposes `CHANGE_ID`/`CHANGE_TARGET`, and a passing build reports a green commit-status check (a failing one reports red) back to the PR.
- **jenkins_concepts**: PR discovery (head vs merge strategy), `env.CHANGE_ID`, `env.CHANGE_TARGET`, the commit-status context, and the `changeRequest()` `when` condition.
```groovy
pipeline {
  agent any
  stages {
    stage('PR checks') {
      when { changeRequest() }         // true only for PR builds
      steps {
        echo "PR #${env.CHANGE_ID} targeting ${env.CHANGE_TARGET}"
        sh './run-tests.sh'
      }
    }
    stage('Deploy') {
      when { branch 'main' }           // never deploys from a PR
      steps { sh './deploy.sh staging' }
    }
  }
}
```
- **builds_on**: multibranch-pipeline

### Level 5.6 — Organization Folders
- **id**: organization-folders
- **scope**: Use a GitHub/Bitbucket organization folder to auto-onboard every repo with a `Jenkinsfile`.
- **difficulty**: 4
- **teach**: A multibranch pipeline handles one repo. An **Organization Folder** (the "GitHub Organization" item) goes one level up: it scans an entire GitHub org or user account, and for *every* repository that contains a `Jenkinsfile`, it auto-creates a multibranch pipeline — which in turn creates a job per branch and PR. New repos onboard themselves on the next scan with zero manual job creation, and the credentials and discovery behaviors are configured once for the whole org and inherited by every child pipeline.
- **scenario**: Acme has 60 microservice repos and a backlog of "please set up CI for my new service" tickets. You're asked to replace that toil with a single org folder so any repo that simply adds a `Jenkinsfile` is built automatically — no ticket required.
- **actions**:
  1. Choose **New Item → GitHub Organization** and name it `acme`.
  2. Set the owner to the `acme` org and select the shared `github-pat` credential with repo read scope.
  3. Run **Scan Organization Now**; watch Jenkins create multibranch pipelines only for repos that contain a `Jenkinsfile`, skipping repos without one.
  4. Drill in and confirm each generated multibranch pipeline already has its branch and PR sub-jobs (inherited from the org folder's behaviors).
  5. In the simulator, add a `Jenkinsfile` to a brand-new repo `acme/notifications`, re-scan, and watch a fresh multibranch pipeline appear automatically.
- **win**: The org folder creates one multibranch pipeline per `Jenkinsfile`-bearing repo (and none for repos without one), each contains branch/PR sub-jobs, and adding a `Jenkinsfile` to a new repo auto-onboards it on the next scan.
- **jenkins_concepts**: GitHub Organization item, org-level scanning, inherited behaviors, the scan hierarchy org → repo → branch/PR.
```text
GitHub Organization "acme"          <- scans the whole org
 ├─ payments        (multibranch)   <- has a Jenkinsfile
 │   ├─ main                        <- branch sub-job
 │   ├─ develop                     <- branch sub-job
 │   └─ PR-42                       <- pull request sub-job
 ├─ notifications   (multibranch)   <- auto-onboarded after adding Jenkinsfile
 └─ (legacy-docs)                   <- skipped: no Jenkinsfile
```
```groovy
// One Jenkinsfile per repo is all a team needs to commit to opt in:
pipeline {
  agent any
  stages {
    stage('Build') { steps { checkout scm; sh './build.sh' } }
  }
}
```
- **builds_on**: multibranch-pipeline

---

## Chapter 6 — Triggers, Build Tools, Artifacts & Fingerprinting
_Theme: controlling what kicks a build off and what it leaves behind_

**Learning objectives**
- Declare build triggers in code with the `triggers {}` directive: `cron`, `pollSCM`, and `upstream` job chaining.
- Register JDK, Maven, Gradle, and Node in Global Tool Configuration and pull them into a pipeline with `tools {}`.
- Archive build outputs with `archiveArtifacts`, using glob patterns and the `fingerprint` flag.
- Pass files between stages and agents within one build using `stash` and `unstash`.
- Track an artifact's producer/consumer lineage across jobs with fingerprints.
- Keep disk usage sane with `buildDiscarder`/`logRotator`, and kick off parameterized builds remotely via an authenticated URL/REST call.

**Prerequisites:** Chapters 3-5

**Levels**

### Level 6.1 — The triggers Directive
- **id**: trigger-types
- **scope**: Configure the `triggers {}` directive for `cron`, `pollSCM`, and `upstream` job chaining.
- **difficulty**: 3
- **teach**: In Chapter 5 you wired triggers from outside the pipeline (polling config, webhooks). The `triggers {}` directive lets the Jenkinsfile declare its own triggers so they live in code and travel with the repo. `cron('H 2 * * *')` runs on a schedule; `pollSCM('H/15 * * * *')` asks the SCM every ~15 minutes whether anything changed and only builds if it did; `upstream(upstreamProjects: 'libA', threshold: hudson.model.Result.SUCCESS)` rebuilds this job whenever `libA` finishes successfully. The leading `H` ("hash") spreads load: instead of every job firing exactly at 2:00, Jenkins picks a stable per-job minute so the controller is not stampeded — the same `H` token you met in freestyle Build Triggers (Ch.2), now expressed in code.
- **scenario**: The "Nightly" job for the Mortgage Calculator service currently builds only when someone clicks Build Now — which means nobody notices a broken build until morning standup. Your tech lead wants it to build itself every night, re-check the repo a few times an hour during the day, and automatically rebuild whenever the shared `libA` library passes. You will encode all three in the Jenkinsfile.
- **actions**:
  1. Open the Mortgage Calculator pipeline and find the empty `triggers {}` slot the previous engineer stubbed out at the top level.
  2. Add `cron('H 2 * * *')` so a build fires once nightly around 02:00 (Jenkins picks the exact minute via `H`).
  3. Add `pollSCM('H/15 * * * *')` so Jenkins checks Git every ~15 minutes and builds only when there is a new commit.
  4. Add `upstream(upstreamProjects: 'libA', threshold: hudson.model.Result.SUCCESS)` so a green `libA` build chains into this one.
  5. Save and run once manually to register the triggers (a declarative `triggers {}` block is only applied to the job after the first successful build); the build's cause shows `Started by user ...`.
- **win**: The pipeline parses with a single top-level `triggers {}` block containing `cron`, `pollSCM`, and `upstream`; after one manual seed run, the next `libA` SUCCESS visibly enqueues a Mortgage Calculator build whose cause reads "Started by upstream project libA".
- **jenkins_concepts**:
  ```groovy
  pipeline {
    agent any
    triggers {
      cron('H 2 * * *')                 // nightly, ~02:00, hashed minute
      pollSCM('H/15 * * * *')           // check SCM every ~15 min, build on change
      upstream(upstreamProjects: 'libA',
               threshold: hudson.model.Result.SUCCESS)
    }
    stages {
      stage('Build') { steps { sh 'make build' } }
    }
  }
  ```
  Cron field order is `MINUTE HOUR DOM MONTH DOW`. `H` = hashed (spread-out) value; `H/15` = every ~15 min at a stable offset. `pollSCM` only triggers when the SCM has a new commit; `cron` builds unconditionally on schedule. Note: declarative `triggers {}` are registered on the job by the *previous* run, so a brand-new pipeline must build once (manually) before its triggers take effect.
- **builds_on**: poll-vs-webhook

### Level 6.2 — Configuring Build Tools
- **id**: build-tools-config
- **scope**: Register JDK/Maven/Gradle/Node in Global Tool Configuration and consume them via `tools {}`.
- **difficulty**: 3
- **teach**: A build agent rarely has the exact JDK or Maven your project needs pre-installed. In **Manage Jenkins → Tools** you define named tool installations (e.g. a JDK named `jdk17`, a Maven named `M3`) and optionally an auto-installer that downloads them on first use. The pipeline's `tools {}` directive then references those names; Jenkins installs the tool if missing and prepends its `bin/` to `PATH` for the duration of the pipeline. This means `mvn` and `java` resolve to the versions you declared, not whatever happens to be on the agent. You saw `tools {}` previewed alongside `options` in Ch.4; here you wire up the Global Tool Configuration side that makes it work.
- **scenario**: The Mortgage Calculator needs JDK 17 and Maven 3, but the new agent only ships JDK 11. Builds explode with "class file has wrong version 55.0, should be 61.0". Instead of SSHing into the agent to install software by hand, you will register the tools centrally and let the pipeline pull them in.
- **actions**:
  1. Go to **Manage Jenkins → Tools**. Under **JDK installations**, add one named `jdk17` with the Adoptium (Eclipse Temurin) auto-installer; under **Maven installations**, add one named `M3` (version 3.9.x) with the "Install from Apache" auto-installer.
  2. In the Jenkinsfile, add a `tools {}` block at the pipeline level referencing `jdk 'jdk17'` and `maven 'M3'`.
  3. Add a diagnostic step `sh 'java -version && mvn -version'` to prove the right versions are on `PATH`.
  4. Run the build. Watch the console: on first run Jenkins downloads/unpacks the JDK and Maven, then the version step prints `17` and `3.9.x`.
  5. Confirm the "wrong version 55.0/61.0" error is gone and the Maven build compiles.
- **win**: Console output of `java -version` shows `17` and `mvn -version` shows the registered Maven 3, both resolved from the `tools {}` names — with no manual install on the agent.
- **jenkins_concepts**:
  ```groovy
  pipeline {
    agent any
    tools {
      jdk   'jdk17'   // name must match Manage Jenkins -> Tools
      maven 'M3'
    }
    stages {
      stage('Verify tools') {
        steps { sh 'java -version && mvn -version' }
      }
      stage('Build') {
        steps { sh 'mvn -B clean package' }
      }
    }
  }
  ```
  ```bash
  # The tools{} block effectively does this for the pipeline:
  export JAVA_HOME=/var/jenkins_home/tools/.../jdk-17
  export PATH=/var/jenkins_home/tools/.../apache-maven-3.9/bin:$JAVA_HOME/bin:$PATH
  ```
  In declarative pipelines `tools {}` only supports the three built-in installer types — `jdk`, `maven`, and `gradle` — plus any tool a plugin contributes (the NodeJS plugin adds `nodejs`). Tool names are case-sensitive and must exactly match the Global Tool Configuration entries, or you get `Tool type "jdk" does not have an install of "jdk17" configured`.
- **builds_on**: options-and-tools

### Level 6.3 — Archiving Artifacts
- **id**: archive-artifacts
- **scope**: Archive build outputs with `archiveArtifacts` including glob patterns and the `fingerprint` flag.
- **difficulty**: 3
- **teach**: A workspace is wiped and reused across builds, so the `.jar` you just compiled won't survive. `archiveArtifacts` copies matching files out of the workspace and attaches them permanently to that build's record, downloadable from the build page. The `artifacts` parameter takes an Ant-style glob like `target/*.jar`. Setting `fingerprint: true` also records an MD5 of each file (you will use that lineage in 7.5). `allowEmptyArchive: false` (the default) fails the step if the glob matches nothing — a useful guard against silently shipping zero artifacts. This is the pipeline equivalent of the freestyle "Archive the artifacts" post-build action from Ch.2, now expressed as a step.
- **scenario**: Your Maven build (now using the tools from 7.2) produces `target/mortgage-1.4.0.jar`, but the moment the next build starts, that jar is gone. QA keeps asking you to "send the exact jar from build #312." You will archive the jar so every build keeps its own copy, and turn on fingerprinting so it can be traced later.
- **actions**:
  1. After the `mvn package` stage, add a `post { success { ... } }` block that calls `archiveArtifacts`.
  2. Set `artifacts: 'target/*.jar'` to grab the built jar via glob.
  3. Add `fingerprint: true` to record each jar's MD5 with the build.
  4. Leave `allowEmptyArchive` at its default (`false`) so a build that produces no jar fails loudly instead of pretending success.
  5. Run the build, open the build page, and confirm the jar appears under "Build Artifacts" with a download link.
- **win**: The build page lists `target/mortgage-1.4.0.jar` as a downloadable artifact; a build that compiles nothing fails on the archive step with "No artifacts found that match the file pattern".
- **jenkins_concepts**:
  ```groovy
  stage('Package') {
    steps { sh 'mvn -B clean package' }
    post {
      success {
        archiveArtifacts artifacts: 'target/*.jar',
                          fingerprint: true,
                          allowEmptyArchive: false
      }
    }
  }
  ```
  Globs: `target/*.jar` (one level), `**/*.jar` (any depth), `dist/**/*.{js,css}` (brace set). Archived files live with the build record under `JENKINS_HOME` — large or numerous artifacts eat disk, which is why retention (7.6) matters.
- **builds_on**: build-tools-config, freestyle-artifacts

### Level 6.4 — Stash & Unstash
- **id**: stash-unstash
- **scope**: Pass files between stages or agents within a build using `stash` and `unstash`.
- **difficulty**: 4
- **teach**: `archiveArtifacts` is for keeping outputs *after* the build; `stash`/`unstash` is for moving files *within* one running build — especially across agents, which each get their own isolated workspace. `stash name: 'app', includes: 'target/*.jar'` bundles matching files server-side under a name; a later stage (even when it runs on a different agent allocation) calls `unstash 'app'` to drop them into its own fresh workspace. Stashes are build-scoped and discarded when the build ends, and they are not meant for large payloads — for big or long-lived files, prefer archiving or an external artifact store. Here we use `agent none` at the top with a per-stage `agent any` (both from Ch.4) so each stage grabs its own executor and workspace; targeting a *specific* labelled agent with `agent { label '...' }` comes later in Ch.9.
- **scenario**: The Mortgage Calculator pipeline compiles the jar in the Build stage, but the integration tests run in a separate Test stage that Jenkins may schedule on a *different* agent — one whose workspace is empty because it never compiled anything. You will stash the jar after Build and unstash it in Test so that stage has the artifact without rebuilding it.
- **actions**:
  1. Set `agent none` at the pipeline level so each stage requests its own agent/workspace (the `agent none` you met in Ch.4).
  2. In the **Build** stage (`agent any`), after `mvn package`, add `stash name: 'app', includes: 'target/*.jar'`.
  3. Give the **Test** stage its own `agent any` so Jenkins may place it on a separate executor with a clean, empty workspace.
  4. As the first step of the Test stage, call `unstash 'app'` to materialize the jar in that fresh workspace.
  5. Run `sh 'ls -l target/*.jar'` in the Test stage to prove the jar arrived without a recompile.
- **win**: The Test stage, running on a freshly allocated agent with an initially empty workspace, lists `target/mortgage-1.4.0.jar` after `unstash 'app'`; no `mvn package` runs in the Test stage.
- **jenkins_concepts**:
  ```groovy
  pipeline {
    agent none                       // each stage requests its own agent/workspace
    stages {
      stage('Build') {
        agent any
        steps {
          sh 'mvn -B clean package'
          stash name: 'app', includes: 'target/*.jar'
        }
      }
      stage('Test') {
        agent any                    // may land on a different executor, empty workspace
        steps {
          unstash 'app'              // jar lands in this fresh workspace
          sh 'ls -l target/*.jar'
          sh 'mvn -B verify'
        }
      }
    }
  }
  ```
  `stash` includes use the same Ant glob syntax as `archiveArtifacts`. Keep stashes small — they pass through the controller; multi-hundred-MB stashes are an anti-pattern. (Pinning each stage to a specific machine via `agent { label '...' }` is covered in Ch.9.)
- **builds_on**: archive-artifacts

### Level 6.5 — Fingerprinting
- **id**: fingerprinting
- **scope**: Use fingerprints to track which builds produced and consumed an artifact across jobs.
- **difficulty**: 4
- **teach**: A fingerprint is the MD5 hash of a file, recorded by Jenkins along with which build touched it. When one job produces `mortgage-1.4.0.jar` (archiving with `fingerprint: true`) and another job consumes that exact file and also fingerprints it, Jenkins links them: the artifact's fingerprint page shows a "made by" / "used in" lineage listing every build that produced or used that identical file. This answers "which downstream deploys actually shipped build #312's jar?" without guessing from version strings. You can fingerprint a file explicitly with the `fingerprint` step even outside archiving.
- **scenario**: Production had a regression and nobody is sure which library jar the failing service was built against. Version numbers lie — two builds both say `1.4.0`. You will fingerprint the jar in the producing `libA` job and in the consuming Mortgage Calculator job so Jenkins can show the exact build-to-build lineage of the byte-identical file.
- **actions**:
  1. In the `libA` job, archive its jar with `fingerprint: true` so the producing build is recorded against that MD5.
  2. In the Mortgage Calculator job, after it pulls in that jar, add a `fingerprint 'lib/libA-*.jar'` step to record consumption of the same file.
  3. Run `libA`, then run Mortgage Calculator so both reference the identical jar.
  4. Open the jar's fingerprint page (linked from either build's artifact) and read the lineage.
  5. Confirm the page lists `libA #N` as producer and `MortgageCalculator #M` as a consumer of that exact MD5.
- **win**: The fingerprint page for `libA-1.4.0.jar` shows it was "made by libA #N" and "used in MortgageCalculator #M"; changing one byte of the jar produces a new fingerprint that does not link to the old consumers.
- **jenkins_concepts**:
  ```groovy
  // Producer job (libA):
  archiveArtifacts artifacts: 'build/libs/libA-*.jar', fingerprint: true

  // Consumer job (Mortgage Calculator), after fetching libA's jar:
  fingerprint 'lib/libA-*.jar'   // records that this build used that exact file
  ```
  The MD5 is the identity: same bytes ⇒ same fingerprint ⇒ linked lineage, regardless of filename or version label. Fingerprinting is what turns the "made by" / "used in" lists on the fingerprint page into a cross-job audit trail.
- **builds_on**: archive-artifacts

### Level 6.6 — Build Retention
- **id**: build-retention
- **scope**: Control how many builds and logs are kept with `buildDiscarder`/`logRotator`.
- **difficulty**: 3
- **teach**: Every build keeps its console log and any archived artifacts under `JENKINS_HOME` forever unless you tell Jenkins otherwise — a busy job will quietly fill the disk. The `buildDiscarder(logRotator(...))` option prunes old build records. `numToKeepStr` caps how many build records (logs + metadata) are retained; `artifactNumToKeepStr` separately caps how many of those keep their heavyweight archived artifacts, so you can keep history while shedding the big files. There are also `daysToKeepStr` / `artifactDaysToKeepStr` for age-based pruning. This lives in the `options {}` block — the same place `timeout` and `retry` live from Ch.4.
- **scenario**: The Mortgage Calculator job now archives a ~40 MB jar every build, runs on every poll, and is fingerprinted — and Jenkins disk is at 92%. Ops gives you until end of day to stop the bleeding without losing recent history. You will add a retention policy: keep the last 20 builds' logs but only the last 5 builds' jars.
- **actions**:
  1. Add an `options {}` block at the pipeline level (the same place options like `timeout` live from Ch.4).
  2. Inside it, add `buildDiscarder(logRotator(numToKeepStr: '20', artifactNumToKeepStr: '5'))`.
  3. Save and run a few builds (or let polling do it) to cross the thresholds.
  4. Open the job's build history and confirm builds older than the most recent 20 are gone, and that builds outside the most recent 5 have their "Build Artifacts" purged while their log/metadata entry remains.
  5. Check the disk figure drop after the older jars are reaped.
- **win**: The job retains at most 20 build records; only the 5 most recent of those still list downloadable artifacts; older builds show their log/metadata but no jar, and disk usage falls.
- **jenkins_concepts**:
  ```groovy
  pipeline {
    agent any
    options {
      buildDiscarder(logRotator(
        numToKeepStr:          '20',   // keep last 20 build records
        artifactNumToKeepStr:  '5',    // ...but jars for only the last 5
        daysToKeepStr:         '30',   // optional: also drop records >30 days
        artifactDaysToKeepStr: '7'     // optional: drop artifacts >7 days
      ))
    }
    stages { stage('Build') { steps { sh 'mvn -B package' } } }
  }
  ```
  `numToKeepStr` prunes whole build records; `artifactNumToKeepStr` prunes only the bulky archived files but keeps the log/metadata — the lever for "remember it ran, forget the 40 MB jar." All four arguments are strings (note the `Str` suffix); passing a bare integer is a common mistake.
- **builds_on**: options-and-tools

### Level 6.7 — Remote Triggering & the API
- **id**: remote-build-trigger
- **scope**: Trigger parameterized builds remotely via an authenticated URL/REST API call.
- **difficulty**: 3
- **teach**: Jenkins exposes every job over HTTP, so an external system (a deploy script, another CI, a chatops bot) can start a build without the UI. For parameterized jobs you POST to `…/buildWithParameters` and pass parameters as query/form fields. Two auth pieces matter: the job's **"Trigger builds remotely"** token (set in the job config) authorizes that specific endpoint, and you authenticate the *request* with a user **API token** (username + token via HTTP Basic). Because POSTs are CSRF-protected, scripts either use an API token (which is crumb-exempt) or first fetch a **crumb**. On success the response is `201 Created` and its `Location` header points at the queue item you just created. The `params` you read here are the `parameters {}` you declared back in Ch.4.
- **scenario**: The release runbook currently says "ask someone to log into Jenkins and click Build with `ENV=prod`." Your team wants the deploy pipeline in *another* system to fire the Mortgage Calculator job directly. You will enable a remote trigger token, mint an API token, and POST a parameterized build from the command line — no browser.
- **actions**:
  1. In the job config, tick **"Trigger builds remotely (e.g., from scripts)"** and set an authentication token, e.g. `nightly-token`.
  2. In your user profile, create an **API token** (username + token) to authenticate the request itself.
  3. From a shell, `curl` a POST to `…/buildWithParameters` passing `token=nightly-token` and the parameter `ENV=prod`, with HTTP Basic auth `-u user:apitoken`.
  4. Read the `201 Created` and the `Location:` header pointing at the queue item.
  5. Confirm in Jenkins that a build started with a remote-trigger cause and that `params.ENV == 'prod'`.
- **win**: The `curl` returns HTTP `201` with a `Location` queue URL, and a new parameterized build runs with `ENV=prod` — triggered entirely over the API with no UI interaction.
- **jenkins_concepts**:
  ```bash
  # Parameterized remote trigger: job token authorizes the endpoint,
  # API token authenticates the user (crumb-exempt). -i prints the response headers.
  curl -i -X POST \
    -u "deploybot:11a2b3c4d5e6f7..." \
    "https://jenkins.example.com/job/MortgageCalculator/buildWithParameters?token=nightly-token&ENV=prod"
  # -> HTTP/1.1 201 Created
  #    Location: https://jenkins.example.com/queue/item/4823/

  # If you must use session auth instead of an API token, fetch a CSRF crumb first:
  CRUMB=$(curl -s -u user:pass \
    'https://jenkins.example.com/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,":",//crumb)')
  curl -i -X POST -u user:pass -H "$CRUMB" \
    'https://jenkins.example.com/job/MortgageCalculator/buildWithParameters?ENV=prod'
  ```
  The job-level token (`token=`) is separate from the user API token: the first says "this endpoint may be triggered remotely," the second says "and here's who is calling." The job must declare an `ENV` parameter (from `parameters {}`, Ch.4) for `buildWithParameters` to accept it — otherwise the value is silently dropped.
- **builds_on**: parameters-block

---

## Chapter 7 — Credentials & Secrets
_Theme: never hardcode a secret again_

**Learning objectives**
- Choose the correct credential kind for each use case (API token, registry login, Git key, kubeconfig, client cert).
- Scope credentials at the System, Global, or Folder level to enforce least privilege.
- Bind a stored credential into a limited block with `withCredentials` instead of leaking it across the whole build.
- Use SSH private-key credentials and `sshagent` for Git clone and remote deploys.
- Explain how Jenkins masks secrets in logs and recognize the patterns that defeat that masking.

**Prerequisites:** Chapter 4

**Levels**

### Level 7.1 — Credential Types
- **id**: credential-types
- **scope**: Choose among username/password, secret text, SSH key, secret file, and certificate credentials.
- **difficulty**: 3
- **teach**: Jenkins stores secrets in its Credentials store, and every credential has a *kind* that determines how it is shaped and how you consume it. The five everyday kinds are **Username with password** (registry/HTTP basic logins), **Secret text** (a single opaque token like an API key), **SSH Username with private key** (Git over SSH, remote shell), **Secret file** (a whole file such as a kubeconfig or service-account JSON), and **Certificate** (a PKCS#12 client cert). Picking the right kind matters because each kind exposes a different binding helper later — a token bound as `string()` behaves nothing like a key bound as `sshUserPrivateKey()`. Every credential also carries an **ID** (your stable handle) and an optional description. You already saw IDs in 5.6, where `credentials('my-id')` injected one into the `environment {}` block; here you learn what *kinds* of secret can sit behind that ID.
- **scenario**: Your team's "secrets drawer" is a mess: a Docker Hub login, a Slack webhook token, the deploy server's SSH key, the cluster's kubeconfig, and a client TLS cert have all been dumped in as plain "Secret text". Builds keep breaking because nothing binds correctly. The level shows the five physical secrets on the left and the five credential kinds on the right; you must re-file each one under its correct kind before the pipeline panel turns green.
- **actions**:
  1. Open **Manage Jenkins → Credentials → System → Global credentials → Add Credentials** in the game's mock UI.
  2. File the **Docker Hub login** (`user` + `password`) as **Username with password**, ID `dockerhub`.
  3. File the **Slack webhook token** (one opaque string) as **Secret text**, ID `slack-token`.
  4. File the **deploy server key** (a `-----BEGIN OPENSSH PRIVATE KEY-----` blob + username) as **SSH Username with private key**, ID `deploy-key`.
  5. File the **kubeconfig** (a whole YAML file) as **Secret file**, ID `kubeconfig`.
  6. File the **client TLS cert** (a `.p12` + password) as **Certificate**, ID `client-cert`.
- **win**: All five secrets are filed under the matching kind with the exact IDs above; the validator confirms each ID resolves to a credential of the expected type and the "binding preview" panel shows the correct helper for each.
- **jenkins_concepts**: Credentials store, credential *kind*, credential **ID**. Each kind maps to a binding helper you will use in 8.3:
  ```groovy
  // ID -> kind -> the helper that consumes it (introduced fully in 8.3)
  string(credentialsId: 'slack-token', variable: 'SLACK_TOKEN')                       // Secret text
  usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'U', passwordVariable: 'P') // Username/password
  sshUserPrivateKey(credentialsId: 'deploy-key', keyFileVariable: 'KEYFILE')          // SSH key
  file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')                           // Secret file
  certificate(credentialsId: 'client-cert', keystoreVariable: 'KEYSTORE', passwordVariable: 'CERT_PW') // Certificate
  ```
- **builds_on**: credentials-in-env

### Level 7.2 — Credential Scopes
- **id**: credential-scopes
- **scope**: Understand System vs Global scope and folder-scoped credentials for least privilege.
- **difficulty**: 3
- **teach**: Where a credential lives decides who can use it. **System** scope makes a credential visible only to Jenkins itself (the controller and its background tasks) — jobs and pipelines can *not* bind it, which is exactly what you want for things like the agent SSH key. **Global** scope makes it usable by any job anywhere on the controller — convenient, but everyone gets it. **Folder** scope (credentials added on a Folder — folders are the job-grouping containers you'll formally configure in Chapter 14) restricts a secret to jobs inside that folder, so Team A's deploy key never leaks into Team B's pipelines. The rule of least privilege: place a credential at the narrowest scope that still lets the job that needs it bind it. A pipeline resolves a credential ID by searching its own folder first, then parent folders, then global. (This level still consumes credentials with the `credentials()` helper from 5.6; the dedicated `withCredentials` binding step arrives in 8.3.)
- **scenario**: Two teams share one Jenkins. The `payments` folder and the `marketing` folder each have their own deploy key, but both keys were dropped into Global scope, so a marketing job can deploy to the payments server. There's also the controller's own agent-connection key sitting in Global where any Jenkinsfile can read it. You must re-scope all three to stop the cross-team leak.
- **actions**:
  1. Move the **agent-connection key** from Global to **System** scope so no pipeline can bind it.
  2. Open the **payments** folder → **Credentials** and add `payments-deploy` there (Folder scope), removing it from Global.
  3. Open the **marketing** folder → **Credentials** and add `marketing-deploy` there (Folder scope), removing it from Global.
  4. Run the included `marketing-build` job, whose `environment { K = credentials('payments-deploy') }` references the payments key, and confirm it now fails to resolve the ID.
  5. Run `payments-build` and confirm it resolves `payments-deploy` from its own folder.
- **win**: The agent key is System-scoped (not bindable by any job); `payments-deploy` and `marketing-deploy` exist only in their respective folders; `marketing-build` errors with `Could not find credentials entry with ID 'payments-deploy'`; `payments-build` succeeds.
- **jenkins_concepts**: System vs Global vs Folder scope, credential domains, resolution order (folder → parent → global). A folder-scoped pipeline binds normally — the ID just has to be reachable from that folder:
  ```groovy
  // runs inside the 'payments' folder; 'payments-deploy' is folder-scoped here
  pipeline {
    agent any
    environment {
      // credentials() from 5.6 resolves the ID from this folder upward
      DEPLOY = credentials('payments-deploy')
    }
    stages {
      stage('Check') {
        steps {
          echo "resolved deploy credential id payments-deploy"
        }
      }
    }
  }
  ```
  Referencing a System-scoped or out-of-folder ID fails fast:
  ```text
  ERROR: Could not find credentials entry with ID 'payments-deploy'
  ```
- **builds_on**: credential-types, jobs-vs-pipelines

### Level 7.3 — Binding with withCredentials
- **id**: withcredentials-step
- **scope**: Bind credentials into environment variables for a limited block using withCredentials.
- **difficulty**: 4
- **teach**: `withCredentials` decrypts a stored credential, exposes it as one or more variables, and — crucially — only inside the `{ }` block. The moment the block ends, the variables are gone, so a secret never lingers in the wider build environment. Each credential kind has its own binding helper: `string()` yields one variable, `usernamePassword()` yields a username and a password variable, `file()` and `sshUserPrivateKey()` write the secret to a temp file and hand you its path, `certificate()` gives you a keystore path and password. Reference the variables with single-quoted shell (`'...$P...'`) so Groovy doesn't interpolate the secret into the script text — that both avoids leaks and keeps masking working.
- **scenario**: The mock `docker login` step is failing because someone hardcoded the registry password straight into the Jenkinsfile (and it's the wrong, stale password anyway). Your job is to delete the hardcoded value and bind the real `dockerhub` credential from 8.1 only around the login step, then prove the secret is unset once the block closes.
- **actions**:
  1. Delete the line `def PASS = 'hunter2'` and the `sh "docker login -p ${PASS}"` that interpolates it.
  2. Wrap the login in `withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'U', passwordVariable: 'P')]) { ... }`.
  3. Inside the block, log in with single-quoted shell so Groovy never sees the secret: `sh 'echo "$P" | docker login -u "$U" --password-stdin'`.
  4. After the block, add `sh 'echo "after: [${P:-unset}]"'` and watch it print `after: [unset]`.
  5. Run the build and confirm the password appears as `****` in the console, not the literal value.
- **win**: No secret literal remains in the script; `docker login` succeeds using the bound credential; the post-block echo prints `after: [unset]`; the console shows the password masked as `****`.
- **jenkins_concepts**: `withCredentials`, binding helpers, block-scoped lifetime, `--password-stdin`, single-quote vs double-quote shell.
  ```groovy
  stage('Push image') {
    steps {
      withCredentials([usernamePassword(credentialsId: 'dockerhub',
                                        usernameVariable: 'U',
                                        passwordVariable: 'P')]) {
        // single quotes: the shell expands $U/$P, Groovy never interpolates them
        sh 'echo "$P" | docker login -u "$U" --password-stdin'
        sh 'docker push myorg/app:$BUILD_NUMBER'
      }
      sh 'echo "after: [${P:-unset}]"'   // -> after: [unset]
    }
  }
  ```
  ```text
  $ docker login -u myuser --password-stdin
  Login Succeeded
  // the password line in the log is shown as: ****
  ```
- **builds_on**: credential-types

### Level 7.4 — SSH & Deploy Keys
- **id**: ssh-and-deploy-keys
- **scope**: Use SSH private key credentials for Git clone and remote deploys.
- **difficulty**: 4
- **teach**: For anything over SSH — cloning a private repo or running a command on a remote host — you use an **SSH Username with private key** credential. Two ways to consume it: `sshUserPrivateKey()` binds the key to a temp file you can pass with `ssh -i`, or `sshagent(['key-id'])` starts an ssh-agent, loads the key, and exports `SSH_AUTH_SOCK` so every `git` and `ssh` call inside the block authenticates with no `-i` juggling. `sshagent` is usually cleaner for Git. A **deploy key** is the other half of the picture: a per-repository SSH public key registered on the Git host. Registered as **read-only**, it lets a build clone exactly one repo and nothing else — least privilege at the repo level.
- **scenario**: The pipeline must clone a *private* infra repo and then SSH into the staging box to pull and restart the app. Right now it fails with `Permission denied (publickey)` because no key is loaded. You'll wrap the Git and remote steps in `sshagent` using the `deploy-key` credential from 8.1, and register that key as a read-only deploy key on the repo.
- **actions**:
  1. In the game's Git-host panel, add the public half of `deploy-key` as a **read-only deploy key** on the `infra` repo.
  2. Wrap the checkout in `sshagent(['deploy-key']) { git url: 'git@github.com:acme/infra.git', branch: 'main' }`.
  3. Inside the same agent block, deploy over SSH: `sh 'ssh -o StrictHostKeyChecking=no deploy@staging "cd /srv/app && git pull && ./restart.sh"'`.
  4. Run the build; watch the clone succeed and the remote restart command return exit 0.
  5. From the build, attempt a `git push` and confirm the Git host rejects it because the deploy key is read-only — proving the per-repo scope.
- **win**: The private repo clones without `Permission denied`; the remote `restart.sh` runs and the stage exits 0; with the read-only deploy key, an attempted push is rejected — demonstrating per-repo least privilege.
- **jenkins_concepts**: `sshUserPrivateKey`, `sshagent`, `SSH_AUTH_SOCK`, `StrictHostKeyChecking`, per-repo deploy keys.
  ```groovy
  stage('Checkout & deploy') {
    steps {
      sshagent(['deploy-key']) {                       // loads the SSH key into an agent
        git url: 'git@github.com:acme/infra.git', branch: 'main'
        sh '''
          ssh -o StrictHostKeyChecking=no deploy@staging \
            "cd /srv/app && git pull && ./restart.sh"
        '''
      }
    }
  }
  ```
  Equivalent with an explicit key file when you need `-i`:
  ```groovy
  withCredentials([sshUserPrivateKey(credentialsId: 'deploy-key',
                                     keyFileVariable: 'KEY',
                                     usernameVariable: 'SSH_USER')]) {
    sh 'ssh -i "$KEY" "$SSH_USER"@staging "uptime"'
  }
  ```
- **builds_on**: withcredentials-step

### Level 7.5 — Masking & Leak Avoidance
- **id**: secret-masking
- **scope**: Rely on log masking and avoid patterns that leak secrets (echo, set -x, build args).
- **difficulty**: 4
- **teach**: When you bind a credential, Jenkins records its value and replaces any *verbatim* occurrence in the console with `****`. That protection is real but shallow: it only matches the exact string. If you transform the secret — base64-encode it, slice it, or print it through `set -x` which echoes the *expanded* command — the masked value never appears literally, so it slips into the log in the clear. Other classic leaks: passing secrets as `docker build --build-arg PW=$PW` (they're baked into image history and `docker history` shows them), and `echo $SECRET` for "debugging". The defenses: never echo or `set -x` around secrets, prefer `--password-stdin` and BuildKit `--secret` mounts over build args, and let `withCredentials` keep the lifetime tight.
- **scenario**: A security review flagged your pipeline: the build log contains a base64 string that decodes to the API token, a `+ curl -H Authorization: Bearer abcd…` line from `set -x`, and a Docker image whose history reveals the registry password. Three leaks, all from a *correctly bound* credential. You must close each one and prove the log is clean.
- **actions**:
  1. Find `sh 'set -x; curl -H "Authorization: Bearer $TOKEN" …'` and remove `set -x` so the expanded header stops printing.
  2. Find `sh 'echo $TOKEN | base64'` (a "debug" line) and delete it — the base64 form defeats masking.
  3. Replace `docker build --build-arg REG_PW=$P .` with a build that logs in via `--password-stdin` instead of baking the secret into a layer.
  4. Re-run and scan the console: the token must appear only as `****`, never decoded or expanded.
  5. Run `docker history` on the produced image in the game panel and confirm no password is present in any layer.
- **win**: The console shows the token only as `****` with no base64 or `set -x`-expanded copy; `docker history` on the image reveals no secret; the validator's log scan reports zero plaintext credential occurrences.
- **jenkins_concepts**: verbatim `****` masking and its limits, `set -x` expansion leaks, base64/transform leaks, `--build-arg` baking into image history. (Jenkins masks bound credentials natively; the separate **Mask Passwords** plugin that masks arbitrary patterns is a Chapter 8 topic.)
  ```groovy
  // LEAKY — do not do this
  sh 'set -x; curl -H "Authorization: Bearer $TOKEN" https://api.example.com'  // prints expanded header
  sh 'echo $TOKEN | base64'                                                    // transformed -> unmasked
  sh 'docker build --build-arg REG_PW=$P -t app .'                             // baked into image history

  // SAFE
  withCredentials([string(credentialsId: 'slack-token', variable: 'TOKEN')]) {
    sh 'curl -sS -H "Authorization: Bearer $TOKEN" https://api.example.com'    // no set -x, $TOKEN -> ****
  }
  withCredentials([usernamePassword(credentialsId: 'dockerhub',
                                    usernameVariable: 'U', passwordVariable: 'P')]) {
    sh 'echo "$P" | docker login -u "$U" --password-stdin && docker build -t app .'
  }
  ```
  ```text
  # docker history app   ->   no REG_PW / password visible in any layer
  ```
- **builds_on**: withcredentials-step

---

## Chapter 8 — Plugins: The Ecosystem
_Theme: almost everything in Jenkins is a plugin_

**Learning objectives**
- Explain how plugins extend Jenkins through the Update Center, `.hpi`/`.jpi` files, and extension points.
- Install, update, pin, and safely restart plugins without breaking running jobs.
- Recognize the small set of plugins that nearly every pipeline depends on.
- Use a plugin-provided step in a Declarative pipeline and diagnose a missing-plugin error.
- Weigh plugin risk (bloat, advisories, transitive dependencies) and send build-status notifications from `post {}`.

**Prerequisites:** Chapter 1

**Levels**

### Level 8.1 — How Plugins Work
- **id**: how-plugins-work
- **scope**: Explain the Update Center, `.hpi`/`.jpi` plugin files, and the extension points that plugins hook into.
- **difficulty**: 2
- **teach**: Jenkins core is deliberately small; almost every feature you have used so far — running a Pipeline, cloning from Git, archiving artifacts — comes from a *plugin*. A plugin is a `.hpi` (or `.jpi`) archive that Jenkins downloads from the **Update Center**, a catalog hosted at updates.jenkins.io. Plugins attach themselves to **extension points** in core (a new build step, a new SCM, a new Pipeline DSL method) and can **depend on** other plugins, so installing one often pulls in several. The mental shift for this chapter: when something is missing in Jenkins, the answer is almost always "install the plugin."
- **scenario**: Your new teammate insists "Jenkins can't do Git, we need a different tool." You open Manage Jenkins to prove that Git support is right there — as a plugin — and trace where it came from.
- **actions**:
  1. From the dashboard, open **Manage Jenkins → Plugins** and select the **Installed plugins** tab.
  2. Find the entries named **Git plugin**, **Pipeline** (workflow-aggregator), and **Credentials**, and note each shows a version number and an enabled/source indicator.
  3. Open the **Pipeline** (workflow-aggregator) entry and observe it is really an umbrella that pulled in many smaller plugins as dependencies.
  4. Switch to the **Available plugins** tab to see the live Update Center catalog Jenkins fetches from updates.jenkins.io.
  5. Match three core features you have already used (Pipeline, Git checkout, artifact archiving) to the plugin that provides each.
- **win**: You correctly identify that Pipeline, Git, and Credentials are plugins (not core), and state that new plugins arrive from the Update Center as `.hpi`/`.jpi` files that bind to extension points.
- **jenkins_concepts**: Key terms: Update Center, `.hpi`/`.jpi`, extension point, plugin dependency, `workflow-aggregator`. Plugins live under `JENKINS_HOME/plugins/`:
  ```bash
  # Each installed plugin is an archive (.jpi once pinned by Jenkins) plus an expanded dir
  ls $JENKINS_HOME/plugins/
  # git.jpi                   git/
  # workflow-aggregator.jpi   workflow-aggregator/
  # credentials.jpi           credentials/

  # The .jpi is just a zip; its manifest declares dependencies
  unzip -p $JENKINS_HOME/plugins/git.jpi META-INF/MANIFEST.MF | grep -i 'Plugin-Dependencies'
  # Plugin-Dependencies: workflow-scm-step:..., credentials:..., scm-api:...
  ```
- **builds_on**: ui-tour

### Level 8.2 — Installing & Managing Plugins
- **id**: install-manage-plugins
- **scope**: Install a plugin, update an existing one, restart safely, and pin a version to avoid breaking changes.
- **difficulty**: 2
- **teach**: You install plugins from **Manage Jenkins → Plugins → Available plugins**, check the boxes you want, and click install. Some plugins activate immediately; others need a restart, so Jenkins offers a **"Download now and install after restart"** option and a **"Restart Jenkins when installation is complete and no jobs are running"** checkbox (a *safe-restart* that waits for in-flight builds to finish). Updates work the same way from the **Updates** tab, but newer is not always safer — a plugin update can change behavior or break a dependency, so on important controllers you **pin** to a known-good version and upgrade deliberately. Treat plugin changes like code changes: know what you are installing and have a way back.
- **scenario**: A pipeline needs the **Timestamper** plugin so logs show wall-clock time. You install it, then practice a safe restart so you do not kill a build that is currently running.
- **actions**:
  1. Open **Manage Jenkins → Plugins → Available plugins** and search `Timestamper`.
  2. Check its box and choose **Download now and install after restart** so nothing changes mid-build.
  3. Tick **Restart Jenkins when installation is complete and no jobs are running** to schedule a safe-restart.
  4. After restart, return to the **Installed plugins** tab and confirm Timestamper appears with a version number.
  5. Open the **Updates** tab, note an available update, and decide to *pin* the current version rather than blindly upgrading a production controller.
- **win**: Timestamper shows as installed after a safe-restart, and you can explain when "install after restart" + "restart when no jobs are running" is the correct choice instead of installing immediately.
- **jenkins_concepts**: Key terms: Available/Installed/Updates tabs, install-after-restart, safe-restart, version pinning. Plugins can be staged or pinned outside the UI too:
  ```bash
  # Safe-restart endpoint: waits for running builds to finish (vs /restart which is immediate)
  curl -X POST http://localhost:8080/safeRestart --user admin:$API_TOKEN

  # Pin exact versions for a reproducible controller (used by tooling/JCasC later)
  # plugins.txt
  timestamper:1.27
  git:5.2.1
  workflow-aggregator:600.vb_57cdd26fdd7
  ```
- **builds_on**: how-plugins-work

### Level 8.3 — The Essential Plugins
- **id**: essential-plugins
- **scope**: Recognize the core set of plugins that nearly every real pipeline depends on.
- **difficulty**: 2
- **teach**: With thousands of plugins available it is easy to over-install, but a small core shows up in almost every shop: **Pipeline** (`workflow-aggregator`) to run Jenkinsfiles, **Git** and **GitHub Branch Source** for source control and multibranch, **Credentials Binding** to inject secrets, **Docker Pipeline** to run stages in containers, **JUnit** to publish test results, **Blue Ocean** for a friendlier pipeline view, and **Configuration as Code** (JCasC) to define Jenkins itself in YAML. Knowing this set means you can stand up a capable controller without trawling the catalog. Each of these is explored in depth in its own later chapter (Docker agents in Chapter 9, JUnit/coverage in Chapter 10, JCasC in Chapter 16) — here you just need to recognize the lineup and what job each does.
- **scenario**: You are bootstrapping a fresh Jenkins for a team and need to assemble a "starter kit" of plugins. A drag-and-drop board lists candidate plugins; you must keep the essentials and reject the noise.
- **actions**:
  1. Review the candidate list and select **Pipeline (workflow-aggregator)**, **Git**, **GitHub Branch Source**, **Credentials Binding**, **Docker Pipeline**, **JUnit**, **Blue Ocean**, and **Configuration as Code**.
  2. Match each chosen plugin to the capability it unlocks (run Jenkinsfile, clone repo, multibranch, secrets, containers, test reports, visualization, config-as-code).
  3. Reject distractor plugins that are niche or redundant for a generic starter controller.
  4. Confirm that without **JUnit** there is no `junit` step and without **Credentials Binding** there is no `withCredentials` step — features map to plugins.
- **win**: You assemble exactly the essential set and can name, for each, the one capability it provides — and recognize that omitting one removes a specific feature.
- **jenkins_concepts**: Key terms: `workflow-aggregator`, `git`, `github-branch-source`, `credentials-binding`, `docker-workflow`, `junit`, `blueocean`, `configuration-as-code`. As a pinned starter list:
  ```text
  # plugins.txt — a sane starter controller
  workflow-aggregator   # Pipeline (run Jenkinsfiles)
  git                   # Git checkout
  github-branch-source  # multibranch / org folders (Chapter 6)
  credentials-binding   # withCredentials step (Chapter 8)
  docker-workflow       # Docker agents (Chapter 10)
  junit                 # JUnit test publishing (Chapter 11)
  blueocean             # pipeline visualization (Chapter 16)
  configuration-as-code # JCasC (Chapter 17)
  ```
- **builds_on**: install-manage-plugins

### Level 8.4 — A Plugin-Provided Step
- **id**: plugin-driven-step
- **scope**: Use a step that a plugin adds to the Pipeline DSL and diagnose the error you get when the plugin is missing.
- **difficulty**: 3
- **teach**: Plugins do not just add UI — many add **new steps to the Pipeline DSL**. The **JUnit** plugin adds the `junit` step that ingests test XML; the **Slack Notification** plugin adds `slackSend`. Every such step is listed in the **Snippet Generator** (Pipeline Syntax) so you can discover the exact parameters. The tell-tale failure when a plugin is *not* installed is a runtime error like `java.lang.NoSuchMethodError: No such DSL method 'junit' found among steps [...]` — the pipeline is valid Groovy, but the method does not exist because nothing registered it. So the fix is rarely "rewrite the pipeline"; it is "install the plugin." (You already met the declarative skeleton in Chapter 3; here you bolt a plugin step onto it.)
- **scenario**: A build produces JUnit XML, but the team only sees a green/red bar with no test breakdown. You add the `junit` step — and first hit the classic missing-plugin error so you learn to recognize it.
- **actions**:
  1. Add a `junit` step to the pipeline pointing at the test report glob, and run the build.
  2. Read the failure: `No such DSL method 'junit' found among steps` — recognize this as a missing plugin, not a typo.
  3. Install the **JUnit** plugin (per Level 8.2) and re-run the build.
  4. Open **Pipeline Syntax → Snippet Generator**, pick the `junit` step, and confirm it generates the same call you wrote.
  5. Verify the build page now shows a **Test Result** summary with pass/fail counts.
- **win**: The build publishes a JUnit Test Result trend, and you can explain that `No such DSL method` means "install the plugin that provides this step."
- **jenkins_concepts**: Key terms: Pipeline DSL step, Snippet Generator / Pipeline Syntax, `No such DSL method`. The step in a Declarative pipeline:
  ```groovy
  pipeline {
    agent any
    stages {
      stage('Test') {
        steps {
          sh 'mvn -B test'   // produces target/surefire-reports/*.xml
        }
      }
    }
    post {
      always {
        // junit step comes from the JUnit plugin; without it:
        //   No such DSL method 'junit' found among steps [...]
        junit '**/surefire-reports/*.xml'
      }
    }
  }
  ```
- **builds_on**: essential-plugins, declarative-skeleton

### Level 8.5 — Managing Plugin Risk
- **id**: plugin-risk-management
- **scope**: Manage plugin bloat, security advisories, and dependency conflicts to keep the controller safe and stable.
- **difficulty**: 3
- **teach**: Every plugin you add is more code running with Jenkins' privileges, so each one widens the **attack surface** and adds maintenance load — Jenkins publishes regular **security advisories**, and plugins that pull in **transitive dependencies** can conflict or force unwanted upgrades. The discipline is: install fewer plugins, prefer well-maintained ones, watch the **Manage Jenkins** warnings banner and the **Updates** tab for advisory-flagged versions, and **test plugin changes on a staging controller** before touching production. "Update fatigue" is real, but ignoring security updates is how controllers get compromised — the goal is *deliberate*, *tested* updates, not *zero* updates. Fewer plugins is not just tidiness; it is a smaller blast radius.
- **scenario**: Manage Jenkins shows a red **security warnings** banner: an installed plugin has a known vulnerability. You triage the alert, plan a tested update, and audit whether the plugin was even needed.
- **actions**:
  1. Open **Manage Jenkins** and read the **security warnings** banner listing the affected plugin and advisory.
  2. Open the **Updates** tab and identify the fixed version flagged for that plugin.
  3. Decide *not* to one-click upgrade prod blindly — schedule the update to be applied and tested on a staging controller first.
  4. Audit the **Installed plugins** tab for plugins nothing actually uses and mark unused ones for removal to shrink the attack surface.
  5. For a plugin that pulls heavy transitive dependencies, note the dependency chain so you can predict what an upgrade will drag along.
- **win**: You resolve the advisory by planning a tested upgrade (not a blind prod click) and reduce risk by flagging at least one unused plugin for removal, articulating "fewer plugins = smaller attack surface."
- **jenkins_concepts**: Key terms: security advisory, attack surface, transitive dependency, staging controller, update fatigue. Inspect risk from the CLI:
  ```bash
  # List installed plugins + versions to compare against published advisories
  java -jar jenkins-cli.jar -s http://localhost:8080/ list-plugins

  # See what a plugin drags in (transitive deps) before upgrading it
  unzip -p $JENKINS_HOME/plugins/some-plugin.jpi META-INF/MANIFEST.MF \
    | grep -i 'Plugin-Dependencies'

  # Pin to a fixed, advisory-clear version rather than "latest"
  echo 'some-plugin:2.4.1' >> plugins.txt
  ```
- **builds_on**: install-manage-plugins

### Level 8.6 — Notifications & ChatOps
- **id**: notifications-and-chatops
- **scope**: Send build-status notifications to email and Slack from `post {}` conditions using plugin-provided steps.
- **difficulty**: 3
- **teach**: A pipeline that fails silently is half-useless — the team needs to *hear* about it. Notification plugins add steps you call from the **`post {}`** block you learned in Chapter 3: the **Slack Notification** plugin adds `slackSend`, and the **Email Extension** plugin adds `emailext`. Because `post {}` has condition blocks (`success`, `failure`, `unstable`, `always`), you can ping the channel only when it matters — for example, only on `failure`. This is the foundation of **ChatOps**: build results flow into the chat tool where the team already lives, with built-in vars like `${env.JOB_NAME}`, `${env.BUILD_NUMBER}`, and `${env.BUILD_URL}` filled in so the message is actually actionable. (Inside a `failure {}` block the status is FAILURE, so you can state it literally without reaching for scripted Groovy.)
- **scenario**: Builds break overnight and nobody notices until morning. You wire the pipeline so a red build immediately pings the team's `#ci` Slack channel, and a green build stays quiet.
- **actions**:
  1. Confirm the **Slack Notification** plugin is installed (per Level 8.2) so the `slackSend` step exists.
  2. Add a `post { failure { ... } }` block that calls `slackSend` to `#ci` with the job name, build number, and FAILURE status interpolated.
  3. Add a `post { success { ... } }` notification (or keep success quiet) to prove conditional routing works.
  4. Trigger a passing build, then a deliberately failing one, and confirm only the failure posts to `#ci`.
  5. Recognize that an `emailext` step in the same `post` block would deliver the identical status by email.
- **win**: A failing build posts a `#ci` Slack message containing the job name, build number, and FAILURE, while a successful build does not — proving notifications are wired into the correct `post` conditions.
- **jenkins_concepts**: Key terms: `slackSend`, `emailext`, `post { failure {} }`, condition blocks, ChatOps. Wired into `post`:
  ```groovy
  pipeline {
    agent any
    stages {
      stage('Build') { steps { sh 'make build' } }
    }
    post {
      failure {
        slackSend channel: '#ci',
                  color: 'danger',
                  message: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (${env.BUILD_URL})"
        // equivalent by email (Email Extension plugin):
        emailext to: 'team@example.com',
                 subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "Build failed: ${env.BUILD_URL}"
      }
      success {
        slackSend channel: '#ci', color: 'good',
                  message: "PASSED: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
      }
    }
  }
  ```
- **builds_on**: plugin-driven-step, post-conditions

---

## Chapter 9 — Distributed Builds
_Theme: scale out work onto agents and containers_

**Learning objectives**
- Explain why the Jenkins controller should schedule, not execute, builds.
- Register and connect a build agent over SSH or as an inbound (JNLP) agent.
- Tag agents with labels and route pipeline stages to them with `agent { label "..." }`.
- Run a stage inside a Docker image so the toolchain is clean and reproducible.
- Build a custom agent image from a repo `Dockerfile` and provision ephemeral cloud agents that disappear after the build.

**Prerequisites:** Chapters 0, 4

**Levels**

### Level 9.1 — Why Use Agents
- **id**: why-agents
- **scope**: Explain offloading builds from the controller and keeping the controller lean and secure.
- **difficulty**: 3
- **teach**: The controller is the brain: it schedules builds, serves the UI, and stores `JENKINS_HOME` (the config and secrets directory from Chapter 1). If it also *runs* builds, a single hungry job can starve the UI, fill the disk, and — worse — untrusted build code executes with full access to your secrets and config. The fix is to give the controller **0 executors** and let separate **agents** do the actual work. Agents add capacity, isolation, and OS diversity (a Windows agent for .NET, a Linux agent for Docker) that one controller could never offer alone.
- **scenario**: "Bedrock Bank" runs every build on the controller. During a heavy nightly job the dashboard times out and the security team notices a test job read a credentials file it never should have seen. You're asked to make the controller a scheduler-only node.
- **actions**:
  1. Open **Manage Jenkins → Nodes** and select the built-in node (the controller).
  2. Read its current config: **Number of executors = 2**, meaning the controller runs two builds at once.
  3. Set **Number of executors** to **0** and save, so the controller can no longer pick up build work.
  4. Re-trigger the nightly job and watch it sit in the queue with "Waiting for next available executor" — proving the controller no longer builds.
  5. In the level's diagram, drag the "build execution" responsibility off the controller card and onto an "agent" card, leaving the controller holding only **Schedule**, **UI**, and **Store config**.
- **win**: Controller executors = 0, the queued build reports it is waiting for an executor, and the responsibility diagram shows builds running only on agents.
- **jenkins_concepts**: Controller vs agent, executors, the "0 executors on controller" hardening rule.
```text
Controller responsibilities:  schedule builds · serve UI · store JENKINS_HOME
Agent responsibilities:       run build steps in a workspace
Hardening rule:               built-in node "# of executors" = 0
```
- **builds_on**: controller-agent-executor

### Level 9.2 — Connecting an Agent
- **id**: connect-an-agent
- **scope**: Add a node and connect it via SSH or inbound (JNLP) agent.
- **difficulty**: 3
- **teach**: With the controller down to 0 executors you need somewhere for builds to run, so you register a **node**. Jenkins offers two launch methods: **Launch agent via SSH**, where the controller opens an SSH connection *to* the agent host using stored credentials, and **Launch agent by connecting it to the controller** (inbound / JNLP), where the agent host runs `agent.jar` and dials *out* to the controller — the right choice when the agent is behind a firewall. Every node needs a **Remote root directory** (its workspace home, e.g. `/home/jenkins/agent`) and a **# of executors** count.
- **scenario**: A fresh Ubuntu VM named `build-linux-01` is waiting. You'll add it as a node so the bank's builds have a real home, choosing SSH because the controller can reach the VM directly.
- **actions**:
  1. Go to **Manage Jenkins → Nodes → New Node**, name it `build-linux-01`, choose **Permanent Agent**, and create it.
  2. Set **Remote root directory** to `/home/jenkins/agent` and **# of executors** to `2`.
  3. Under **Launch method** pick **Launch agent via SSH**, enter host `10.0.0.21`, and select the SSH-key credential `jenkins-ssh`.
  4. Save; watch the agent log show the controller copying `remoting.jar` over and the node flip to **online**.
  5. As an alternative path the level offers, switch the launch method to inbound, copy the generated launch command, and "run" it on the VM to see the agent connect outbound over JNLP instead.
- **win**: `build-linux-01` shows status **online** with 2 idle executors, and its log ends with "Agent successfully connected and online."
- **jenkins_concepts**: Permanent agent, remote root directory, launch method (SSH vs inbound/JNLP), executors per node.
```bash
# Inbound (JNLP) alternative — run ON the agent host:
java -jar agent.jar \
  -url http://jenkins.bedrock.local/ \
  -secret 4b2c...e9f1 \
  -name build-linux-01 \
  -workDir /home/jenkins/agent
```
- **builds_on**: why-agents

### Level 9.3 — Labels & Node Selection
- **id**: labels-and-node-selection
- **scope**: Tag agents with labels and target them with `agent { label "..." }`.
- **difficulty**: 3
- **teach**: Once you have several agents, you stop caring about names and start caring about *capabilities*. A **label** is a free-form tag on a node (`linux`, `docker`, `arm64`); a pipeline asks for capabilities with a **label expression** like `linux && docker`, and Jenkins picks any online agent that matches. In declarative pipelines you write `agent { label "linux && docker" }` at the pipeline or stage level, building on the agent directive from Chapter 4; the scripted form `node("linux && docker") { ... }` does the same thing (scripted pipelines come in Chapter 12). Expressions support `&&`, `||`, and `!`, so `linux && !arm64` means "Linux but not ARM."
- **scenario**: The bank now has `build-linux-01` (Linux + Docker) and `build-win-01` (Windows + .NET). A pipeline keeps landing on the wrong OS and failing. You'll label the agents and pin each stage to the agent that can actually run it.
- **actions**:
  1. On `build-linux-01`'s config, set **Labels** to `linux docker`; on `build-win-01`, set **Labels** to `windows dotnet`.
  2. Edit the pipeline so the top-level `agent` is `none`, forcing every stage to declare its own agent (the `agent none` directive from Chapter 4).
  3. Give the **Build** stage `agent { label "linux && docker" }` and the **Package** stage `agent { label "windows" }`.
  4. Run the build and read the console header of each stage — it prints the node it landed on (e.g. "Running on build-linux-01").
  5. Temporarily take `build-linux-01` offline and re-run to watch the Build stage queue with "there are no nodes with the label 'linux && docker'", proving label routing is strict.
- **win**: The Build stage runs on `build-linux-01` and the Package stage on `build-win-01`; with the Linux agent offline, the Build stage correctly blocks on the missing label instead of running elsewhere.
- **jenkins_concepts**: Labels, label expressions (`&&`, `||`, `!`), per-stage agents, `node("label")` in scripted (Chapter 12).
```groovy
pipeline {
  agent none
  stages {
    stage('Build') {
      agent { label 'linux && docker' }
      steps { sh 'make build' }
    }
    stage('Package') {
      agent { label 'windows' }
      steps { bat 'msbuild App.sln' }
    }
  }
}
```
- **builds_on**: connect-an-agent, agent-directives

### Level 9.4 — Docker Container Agents
- **id**: docker-agent
- **scope**: Run a stage inside a Docker image with `agent { docker { image } }`.
- **difficulty**: 4
- **teach**: Labeling gets you the right *machine*, but that machine's installed tool versions still drift over time. `agent { docker { image "node:20-alpine" } }` goes further: it pulls a container image and runs the whole stage *inside* it, so the toolchain is pinned and reproducible no matter which Linux agent hosts it. The agent just needs Docker available (hence the `docker` label). You can pass `args` to mount volumes or set flags, and each stage can use a different image — Node for the frontend, Python for the tests — without installing anything permanently.
- **scenario**: The bank's frontend build broke because `build-linux-01` has Node 18 but the app now needs Node 20. Instead of upgrading the host, you'll lock the stage to a `node:20-alpine` container so the build carries its own runtime.
- **actions**:
  1. Confirm `build-linux-01` carries the `docker` label so the container can be scheduled there.
  2. Change the **Build** stage agent to `agent { docker { image 'node:20-alpine' } }`.
  3. Add a step `sh 'node --version'` and run the build; the console shows Jenkins running `docker pull node:20-alpine` then `docker run` before your steps.
  4. Read the version line — it prints `v20.x` even though the host has Node 18, proving the stage ran inside the container.
  5. Add `args '-v $HOME/.npm:/root/.npm'` to cache npm downloads across builds and re-run to see the mount in the `docker run` command.
- **win**: The Build stage's console shows a `docker run ... node:20-alpine` line, `node --version` reports v20.x, and the stage succeeds on the Node-18 host.
- **jenkins_concepts**: `agent { docker { image } }`, `args` for volumes/flags, reproducible per-stage toolchains, Docker-capable agent requirement.
```groovy
stage('Build') {
  agent {
    docker {
      image 'node:20-alpine'
      args  '-v $HOME/.npm:/root/.npm'
    }
  }
  steps {
    sh 'node --version'   // -> v20.x, from the container not the host
    sh 'npm ci && npm run build'
  }
}
```
- **builds_on**: labels-and-node-selection

### Level 9.5 — Building the Agent Image
- **id**: dockerfile-agent
- **scope**: Build a custom agent image from a repo Dockerfile with `agent { dockerfile }`.
- **difficulty**: 4
- **teach**: A stock image like `node:20-alpine` is fine until your build needs a specific mix — Node *plus* the AWS CLI *plus* a private CA cert. Rather than hunt for a public image, you commit a `Dockerfile` to the repo and use `agent { dockerfile { filename "Dockerfile.ci"; dir "." } }`. Jenkins runs `docker build` on that file first, then runs the stage inside the freshly built image. Because the Dockerfile lives in the repo, the agent definition is versioned alongside the code it builds — change the toolchain in a PR, and the build that tests the PR uses it.
- **scenario**: The bank's deploy step needs Node 20 *and* the AWS CLI, which no single public image provides cleanly. You'll add a `Dockerfile.ci` to the repo and have the pipeline build its own agent.
- **actions**:
  1. Add `Dockerfile.ci` to the repo root, starting `FROM node:20-alpine` and installing the AWS CLI.
  2. Set the stage agent to `agent { dockerfile { filename 'Dockerfile.ci'; dir '.' } }`.
  3. Run the build; the console shows `docker build -f Dockerfile.ci .` producing an image, then `docker run` of that image for the stage.
  4. Add steps `sh 'node --version'` and `sh 'aws --version'` and confirm both tools resolve inside the built image.
  5. Edit `Dockerfile.ci` to bump a tool version and re-run, watching Docker rebuild only the changed layer (build cache) before the stage runs.
- **win**: The console shows a successful `docker build -f Dockerfile.ci` followed by the stage running in that image, and both `node --version` and `aws --version` succeed inside it.
- **jenkins_concepts**: `agent { dockerfile { filename; dir } }`, repo-versioned agent image, `docker build` then run, layer caching.
```dockerfile
# Dockerfile.ci
FROM node:20-alpine
RUN apk add --no-cache aws-cli ca-certificates
WORKDIR /app
```
```groovy
stage('Deploy') {
  agent {
    dockerfile {
      filename 'Dockerfile.ci'
      dir '.'
    }
  }
  steps {
    sh 'node --version'
    sh 'aws --version'
  }
}
```
- **builds_on**: docker-agent

### Level 9.6 — Ephemeral Cloud Agents
- **id**: cloud-agents
- **scope**: Provision on-demand agents from a Docker/Kubernetes cloud that disappear after the build.
- **difficulty**: 5
- **teach**: Permanent agents sit idle between builds, wasting money, and a fixed fleet can't absorb a sudden flood of jobs. A **Cloud** (configured under **Manage Jenkins → Clouds**) flips this: Jenkins provisions a brand-new agent *per build* and **terminates it when the build ends**, giving elastic capacity and a pristine workspace every time. The **Kubernetes** plugin is the common implementation — you declare a `kubernetes` agent whose `yaml` describes a pod with one or more `containers`, and each build runs in its own throwaway pod, targeting a specific container with the `container('name') { ... }` step. This is the same per-stage-isolation idea as Docker agents, scaled out to a cluster.
- **scenario**: Month-end at Bedrock Bank triggers 40 builds in ten minutes and the two permanent agents can't keep up; queue times explode. You'll point Jenkins at a Kubernetes cluster so it spins up pods on demand and lets them vanish afterward.
- **actions**:
  1. Open **Manage Jenkins → Clouds → New cloud**, choose **Kubernetes**, and point it at the cluster (namespace `jenkins-agents`).
  2. In the pipeline, declare a `kubernetes` agent whose `yaml` defines a pod with a `node:20-alpine` container.
  3. Run one build and watch the console print `Created Pod: jenkins-agents/build-xyz` as a fresh pod starts.
  4. Confirm the stage runs its steps inside the pod with `container('node') { ... }`, then watch the log end with the pod being deleted.
  5. Fire all 40 builds at once and watch the queue drain as multiple pods spawn in parallel, then disappear — capacity that matches demand and costs nothing at idle.
- **win**: A build provisions a new pod (visible "Created Pod" / "Terminated Pod" log lines), runs its steps inside the pod's container, and no agent remains registered after the build finishes; the 40-build burst clears without a growing queue.
- **jenkins_concepts**: Clouds, Kubernetes plugin, pod-template `yaml` / `container('name')` step, ephemeral per-build agents, elastic capacity.
```groovy
pipeline {
  agent {
    kubernetes {
      yaml '''
        apiVersion: v1
        kind: Pod
        spec:
          containers:
          - name: node
            image: node:20-alpine
            command: ['sleep']
            args: ['99d']
      '''
    }
  }
  stages {
    stage('Build') {
      steps {
        container('node') {
          sh 'node --version && npm ci'
        }
      }
    }
  }
}
```
- **builds_on**: docker-agent

---

## Chapter 10 — Testing, Quality Gates & Parallelism
_Theme: make builds trustworthy and fast_

**Learning objectives**
- Run a test suite inside a pipeline and publish JUnit XML so per-test results render on the build page.
- Read test trend graphs and choose deliberately between an UNSTABLE and a FAILURE outcome.
- Collect and publish code coverage with thresholds that flag risky drops.
- Run an external SonarQube analysis and block the pipeline on its quality gate.
- Speed builds up by running independent work with `parallel {}` and across a `matrix {}` of axes.

**Prerequisites:** Chapters 3-4, 6

**Levels**

### Level 10.1 — Running Tests & Publishing Results
- **id**: run-tests-junit
- **scope**: Run a test suite and publish JUnit XML so results show on the build.
- **difficulty**: 3
- **teach**: A pipeline that only compiles tells you nothing about correctness — you need to run the tests and capture their results. Build tools like Maven write machine-readable JUnit XML reports (Surefire drops them in `target/surefire-reports/`). The `junit` step (from the JUnit plugin you met in 9.4) parses those XML files and attaches a clickable "Test Result" page to the build. Crucially, when tests fail, `junit` marks the build **UNSTABLE** (yellow) rather than failing the whole pipeline, so later stages can still decide what to do.
- **scenario**: The "Robo-Vend" snack-machine team has a pipeline that builds clean every time — and ships bugs every week, because nobody runs the tests. Your job: wire the test suite into the build so a broken coin-counter can never reach green again.
- **actions**:
  1. Open the Robo-Vend pipeline editor and find the lone `Build` stage that runs `sh "mvn -B compile"`.
  2. Add a `Test` stage after it whose step runs `sh "mvn -B test"`, which executes the suite and writes Surefire XML.
  3. Inside a `post { always { ... } }` block on that stage, add `junit "**/target/surefire-reports/*.xml"` so results publish even when tests fail and abort the `sh` step.
  4. Run the build with the seeded-good code and watch a green "Test Result" link with 12/12 passing appear.
  5. Swap in the "broken coin-counter" commit, rebuild, and confirm the build turns **UNSTABLE** with the failing test named on the Test Result page.
- **win**: The build page shows a Test Result link with per-test pass/fail counts, and the broken-code run finishes UNSTABLE (yellow) with `CoinCounterTest.makesChange` listed as failed — not a hard pipeline failure and not a false green.
- **jenkins_concepts**: `junit` step, JUnit/Surefire XML, `post { always }`, build result UNSTABLE.
```groovy
pipeline {
  agent any
  stages {
    stage('Build') {
      steps { sh 'mvn -B compile' }
    }
    stage('Test') {
      steps { sh 'mvn -B test' }
      post {
        always {
          junit '**/target/surefire-reports/*.xml'
        }
      }
    }
  }
}
```
`mvn test` exits non-zero when assertions fail, which would normally fail the stage; putting `junit` in `post { always }` guarantees the report is collected first, and `junit` then downgrades the verdict to UNSTABLE instead of FAILURE.
- **builds_on**: plugin-driven-step

### Level 10.2 — Trends & Failing the Build
- **id**: test-reports-trends
- **scope**: Show test trend graphs and decide when failures mark the build UNSTABLE vs FAILURE.
- **difficulty**: 3
- **teach**: Because `junit` records results on every build, Jenkins accumulates history and draws a **test trend graph** (passed/failed/skipped over the last builds) on the job page — flaky regressions jump out visually. You also control the *severity* of failures. By default any failing test makes the build UNSTABLE; `junit(skipMarkingBuildUnstable: true)` suppresses even that. To go the other way and escalate to FAILURE, the `junit` step *returns* a `TestResultSummary` object — capture it with `def r = junit(...)` and read `r.failCount` / `r.totalCount` to decide. UNSTABLE means "built, but tests are unhappy — humans should look"; FAILURE means "this is broken, stop the line." Picking the right one keeps your red/yellow signals meaningful instead of causing alarm fatigue. (The tiny bit of logic below lives in a `script {}` block, which you will study properly in Chapter 12 — here it is just a threshold check.)
- **scenario**: Robo-Vend's manager loves the new test page but complains: "A single flaky test shows the same scary color as a totally broken build." You'll confirm the trend graph the team can watch and make the pipeline escalate to FAILURE only when the suite is genuinely broken.
- **actions**:
  1. Run the pipeline five times across the seeded commit history and open the job page to confirm a test-trend graph has formed.
  2. Point out the dip where failures spiked, proving history is being kept across builds.
  3. Decide the policy: any failing test should stay UNSTABLE, but **more than 3** failing tests means the suite is broken — a FAILURE.
  4. Capture the `junit` return value and, in a `script {}` block, call `error("...")` when `failCount` exceeds the threshold.
  5. Verify: 1 failing test → UNSTABLE (yellow); a commit with 5 failing tests → FAILURE (red), pipeline stops.
- **win**: The job page renders a test-trend graph spanning multiple builds, a 1-failure run is UNSTABLE, and a 5-failure run is FAILURE with the pipeline halted at the Test stage.
- **jenkins_concepts**: test trend graph, `junit` `TestResultSummary` return value (`failCount`/`totalCount`), `error()` vs UNSTABLE, UNSTABLE vs FAILURE semantics.
```groovy
stage('Test') {
  steps { sh 'mvn -B test' }
  post {
    always {
      script {
        // junit returns a TestResultSummary; any failure already marks UNSTABLE
        def r = junit testResults: '**/target/surefire-reports/*.xml'
        if (r.failCount > 3) {
          error("Test suite broken: ${r.failCount} failures — failing the build")
        }
      }
    }
  }
}
```
`junit` alone → UNSTABLE on any failure; reading `r.failCount` and calling `error()` escalates to FAILURE only past the threshold. The `script {}` wrapper is needed because `def`/`if` are imperative Groovy (Chapter 12); the `junit` summary fields are sandbox-safe, so no script approval is required.
- **builds_on**: run-tests-junit

### Level 10.3 — Code Coverage
- **id**: code-coverage
- **scope**: Collect and publish coverage with the coverage/JaCoCo step.
- **difficulty**: 3
- **teach**: Passing tests don't tell you *how much* of the code they exercise — coverage does. A tool like JaCoCo instruments the build and emits a coverage report (XML) during `mvn test`. The Coverage plugin's `recordCoverage` step parses that report, renders line/branch coverage on the build, and keeps a **coverage trend** alongside the test trend. You can attach quality gates so a build goes UNSTABLE (or FAILURE) when coverage falls below a floor — turning "we should test more" into an enforced gate.
- **scenario**: Robo-Vend's tests are green but suspiciously fast. You suspect whole modules are untested. Add coverage reporting to expose the gaps, then set a floor so coverage can't silently rot below 70%.
- **actions**:
  1. Confirm the JaCoCo Maven plugin is already wired into the project `pom.xml`, so `mvn -B test` now also writes `target/site/jacoco/jacoco.xml`.
  2. After the `junit` publish, add a `recordCoverage` step pointing the `JACOCO` parser at `**/target/site/jacoco/jacoco.xml`.
  3. Run the build and open the new Coverage summary — note line coverage sits at 58%, below target.
  4. Add a `qualityGates` threshold of 70% LINE coverage that marks the build UNSTABLE when unmet.
  5. Add tests for the uncovered `ChangeDispenser` class, rerun, and watch coverage climb past 70% so the gate clears and a coverage-trend point is recorded.
- **win**: The build shows a Coverage report with line/branch percentages and a trend; a sub-70% run is UNSTABLE due to the quality gate, and after adding tests the gate passes with coverage ≥ 70%.
- **jenkins_concepts**: `recordCoverage`, JaCoCo XML, coverage `qualityGates` thresholds, coverage trend.
```groovy
stage('Coverage') {
  steps {
    sh 'mvn -B test'  // produces target/site/jacoco/jacoco.xml
  }
  post {
    always {
      junit '**/target/surefire-reports/*.xml'
      recordCoverage(
        tools: [[parser: 'JACOCO', pattern: '**/target/site/jacoco/jacoco.xml']],
        qualityGates: [
          [threshold: 70.0, metric: 'LINE', baseline: 'PROJECT', unstable: true]
        ]
      )
    }
  }
}
```
The single `recordCoverage` step (from the Coverage plugin) replaces the older per-format steps; `unstable: true` keeps a missed floor non-fatal so devs see the trend without blocking the line.
- **builds_on**: run-tests-junit

### Level 10.4 — Quality Gates
- **id**: quality-gate-sonarqube
- **scope**: Run SonarQube analysis and block the pipeline on its quality gate.
- **difficulty**: 4
- **teach**: A SonarQube server analyzes code for bugs, vulnerabilities, code smells, and coverage, then evaluates a configurable **Quality Gate** (e.g. "no new bugs, coverage ≥ 80% on new code"). The pipeline runs the scanner with `withSonarQubeEnv('sonar')`, which injects the server URL and authentication token (a stored credential, from Chapter 7) into the `sh "mvn sonar:sonar"` step. Analysis is asynchronous: Sonar finishes server-side and calls Jenkins back via a **webhook**, so you park on `waitForQualityGate`. With `abortPipeline: true`, a failed gate fails the whole build — bad code can't move past this stage.
- **scenario**: Robo-Vend wants an objective gatekeeper, not just self-reported coverage. A SonarQube server is already provisioned; your task is to feed it the analysis and make the pipeline refuse to continue when the gate is red.
- **actions**:
  1. Confirm the `sonar` server is configured under Manage Jenkins and a `sonar-token` secret-text credential exists (set up the way you learned in Chapter 7).
  2. Add an `Analysis` stage that wraps the scanner: `withSonarQubeEnv('sonar') { sh 'mvn -B sonar:sonar' }`.
  3. Verify the SonarQube webhook points back at `<JENKINS_URL>/sonarqube-webhook/` so results return to the build.
  4. Add a separate `Quality Gate` stage using `waitForQualityGate abortPipeline: true` inside a `timeout` so a stuck server can't hang forever.
  5. Run against a seeded commit that introduces a new bug — watch the gate come back ERROR and the pipeline abort at the Quality Gate stage; fix the bug and watch it pass.
- **win**: A passing commit flows through both stages to SUCCESS, while the bug-laden commit makes `waitForQualityGate` return ERROR and aborts the pipeline (FAILURE) before any deploy stage.
- **jenkins_concepts**: `withSonarQubeEnv`, `mvn sonar:sonar`, SonarQube webhook, `waitForQualityGate abortPipeline: true`, `timeout`.
```groovy
stages {
  stage('SonarQube Analysis') {
    steps {
      withSonarQubeEnv('sonar') {        // injects SONAR_HOST_URL + token credential
        sh 'mvn -B sonar:sonar'
      }
    }
  }
  stage('Quality Gate') {
    steps {
      timeout(time: 5, unit: 'MINUTES') {       // don't wait forever for the webhook
        waitForQualityGate abortPipeline: true  // ERROR gate => fail the build
      }
    }
  }
}
```
`waitForQualityGate` blocks until SonarQube POSTs to `/sonarqube-webhook/`; without the webhook configured the step would hang until the `timeout` fires.
- **builds_on**: code-coverage, withcredentials-step

### Level 10.5 — Parallel Stages
- **id**: parallel-stages
- **scope**: Run independent stages concurrently with the parallel {} directive.
- **difficulty**: 4
- **teach**: When stages don't depend on each other — unit tests, linting, a security scan — running them one after another wastes wall-clock time. The `parallel {}` directive nests stages that run **at the same time** (each on an available executor/agent), and the enclosing stage only completes when all branches do. Add `failFast true` to abort the remaining branches the instant one fails, so you stop wasting time on a build that's already doomed. Note that parallel branches need free executors — if you only have one, they queue rather than truly overlap.
- **scenario**: Robo-Vend's "Verify" phase runs unit tests, then lint, then a dependency scan — sequentially, taking nine minutes. The team is sick of waiting. Collapse the three independent checks into one parallel stage and cut the wait.
- **actions**:
  1. Identify the three sequential stages — `Unit`, `Lint`, `DepScan` — and confirm none consumes another's output.
  2. Replace them with a single `Verify` stage containing a `parallel {}` block holding the three as nested stages.
  3. Add `failFast true` so a unit-test failure cancels the still-running lint and scan branches.
  4. Run it and watch the stage view render three lanes side by side, finishing in roughly the time of the slowest branch (~3 min) instead of the sum.
  5. Break the lint step deliberately and confirm `failFast` aborts the other two branches and fails the stage.
- **win**: The stage view shows `Unit`, `Lint`, and `DepScan` running concurrently under `Verify`, total Verify time ≈ the slowest branch rather than the sum, and a failure in one branch with `failFast` aborts the others.
- **jenkins_concepts**: `parallel {}`, nested stages, `failFast true`, executor availability.
```groovy
stage('Verify') {
  failFast true
  parallel {
    stage('Unit') {
      steps { sh 'mvn -B test' }
      post { always { junit '**/target/surefire-reports/*.xml' } }
    }
    stage('Lint') {
      steps { sh 'mvn -B checkstyle:check' }
    }
    stage('DepScan') {
      steps { sh 'mvn -B org.owasp:dependency-check-maven:check' }
    }
  }
}
```
All three branches start together; `failFast true` cancels the survivors as soon as any one branch fails. Each branch needs its own executor to truly run in parallel.
- **builds_on**: multiple-stages

### Level 10.6 — Matrix Builds
- **id**: matrix-builds
- **scope**: Use matrix {} to run the same stages across axes (OS, version).
- **difficulty**: 5
- **teach**: When you need to run the *same* stages across many combinations — Linux and Windows, Java 17 and 21 — copy-pasting parallel branches is unmaintainable. The `matrix {}` directive declares `axes` (each `axis` has a `name` and `values`), and Jenkins automatically generates one parallel **cell** per combination, running the shared `stages {}` in each. The current cell's axis values appear as environment variables, and you typically route each cell to the right `agent` with `agent { label "${OS}" }` (labels come from Chapter 9). An `excludes {}` block prunes nonsensical combinations so you don't waste cells on, say, an unsupported pairing.
- **scenario**: Robo-Vend now ships to both Linux kiosks and a legacy Windows till, on Java 17 and 21. Marketing wants a green check for every supported combo. Build a matrix that tests all four cells at once — minus the one combination the Windows till can't run.
- **actions**:
  1. Wrap the build/test stages in a `matrix {}` with two axes: `OS` = `linux, windows` and `JAVA` = `17, 21`.
  2. Set `agent { label "${OS}" }` inside the matrix so each cell runs on an agent with the matching label (labels from Chapter 9 are pre-seeded).
  3. Add an `excludes {}` block dropping the `windows` + `17` cell, since the legacy till is certified only on Java 21.
  4. Inside the matrix `stages {}`, run `sh`/`bat` to build and test, publishing JUnit per cell.
  5. Run it and watch the stage view fan out into three live cells (linux/17, linux/21, windows/21), each green independently, with windows/17 absent.
- **win**: The build runs exactly three matrix cells in parallel — linux×{17,21} and windows×21 — the excluded windows×17 cell never appears, and each cell publishes its own test results and reports its own status.
- **jenkins_concepts**: `matrix {}`, `axes` / `axis`, generated cells, per-cell `agent { label }`, `excludes {}`.
```groovy
stage('Build & Test Matrix') {
  matrix {
    axes {
      axis { name 'OS';   values 'linux', 'windows' }
      axis { name 'JAVA'; values '17', '21' }
    }
    excludes {
      exclude {
        axis { name 'OS';   values 'windows' }
        axis { name 'JAVA'; values '17' }     // legacy till only certified on Java 21
      }
    }
    agent { label "${OS}" }                    // route each cell to a matching agent
    stages {
      stage('Build') { steps { sh 'mvn -B compile' } }
      stage('Test')  {
        steps { sh "mvn -B test -Djava.version=${JAVA}" }
        post { always { junit '**/target/surefire-reports/*.xml' } }
      }
    }
  }
}
```
Each axis combination becomes its own parallel cell with `OS` and `JAVA` exposed as env vars; `excludes` removes the windows/17 pairing, leaving three cells instead of four.
- **builds_on**: parallel-stages

---

## Chapter 11 — Deployment, Environments, Approvals & Rollbacks
_Theme: ship safely across environments._

**Learning objectives**
- Add a deploy stage that ships a built artifact to an environment.
- Promote the same artifact across dev → staging → prod with conditional gating.
- Require a human approval gate before any production deploy.
- Reason about blue-green and canary rollout strategies and their pipeline shape.
- Roll back automatically when a post-deploy smoke test fails.
- Authenticate to real deploy targets (SSH, Kubernetes, cloud) with bound credentials.

By now the player can build, test, and gate a pipeline. This chapter closes the loop: it turns a green build into a deployed release. The player adds a deploy stage, promotes a build through dev → staging → prod, puts a human approval in front of production, reasons about blue-green and canary rollout shapes, wires an automatic rollback when a post-deploy smoke test fails, and finally authenticates to real deploy targets with bound credentials. Everything builds only on directives already taught: `when` and `environment` (Ch 4), `input` (Ch 4.7), `credentials()` and `withCredentials` (Ch 4.6, Ch 7.3), `post {}` conditions (Ch 3.5), and `parallel` (Ch 10.5).

**Prerequisites:** Chapters 4 (directives), 7 (credentials), 10 (quality gates & parallel).

**Levels**

### Level 11.1 — A Deploy Stage
- **id**: deploy-stage
- **scope**: Add a final `Deploy` stage that ships the freshly built artifact to a staging server, guarded so it only runs on the main branch.
- **difficulty**: 3
- **teach**: A deploy is just another stage — it runs steps like every other stage, but its steps push the build's output somewhere it can run. The two things that make a deploy stage different are *what it does* (copy/upload an artifact, restart a service) and *when it is allowed to run*. You almost never want to deploy from a feature branch, so a deploy stage is normally wrapped in a `when { branch 'main' }` guard (taught in Ch 4.4). The deploy itself is ordinary shell: `scp` a file, `curl` an upload endpoint, or `rsync` a directory. Because the deploy is the last stage, every earlier stage (build, test) has already passed before a single byte ships — that ordering is your first safety net.
- **scenario**: The player's pipeline already builds `app.jar` and runs tests. They must append a `Deploy to Staging` stage that only fires on `main` and uploads the jar to a staging host. On a feature branch the stage should be skipped, not failed.
- **actions**:
  1. Add a `Deploy to Staging` stage after the existing test stage.
  2. Guard it with `when { branch 'main' }` so feature branches skip it.
  3. Inside, run a deploy command that ships the artifact:
```groovy
pipeline {
  agent any
  stages {
    stage('Build') {
      steps { sh 'make build' }   // produces target/app.jar
    }
    stage('Test') {
      steps { sh 'make test' }
    }
    stage('Deploy to Staging') {
      when { branch 'main' }
      steps {
        sh 'scp target/app.jar deploy@staging.example.com:/srv/app/app.jar'
        sh 'ssh deploy@staging.example.com "systemctl restart app"'
      }
    }
  }
}
```
  4. Run on a feature branch and confirm the deploy stage shows **Skipped** in the stage view; run on `main` and confirm it runs.
- **win**: The stage view shows `Deploy to Staging` skipped on a feature branch and executed (green) on `main`, with the artifact landing on the staging host.
- **jenkins_concepts**: deploy as an ordinary stage; `when { branch 'main' }` deploy guard; shipping an artifact via `scp`/`ssh`; build/test-before-deploy ordering as a safety net.
- **builds_on**: multiple-stages, when-conditions

### Level 11.2 — Promotion Across Environments
- **id**: environment-promotion
- **scope**: Extend the single deploy into a promotion flow: the same build flows dev → staging → prod, with each environment as its own stage and the target host/URL driven by an `environment` variable per stage.
- **difficulty**: 4
- **teach**: "Promotion" means the *exact same artifact* moves forward through a sequence of environments — you never rebuild between staging and prod, because rebuilding would test one binary and ship another. In a declarative pipeline you model this as a chain of deploy stages (`Deploy to Dev`, `Deploy to Staging`, `Deploy to Prod`), each pushing the *same* `app.jar` to a different target. The per-stage target is best held in a stage-level `environment {}` block (Ch 4.2) so each stage reads a clean `DEPLOY_HOST`/`DEPLOY_URL` instead of hardcoding hosts in shell. Later stages are gated tighter than earlier ones: dev runs on every main build, staging on every main build too, but prod is held back with a stricter `when` (and, next level, a human gate). The golden rule: build once, promote the same bytes forward.
- **scenario**: The player turns the one staging deploy from 12.1 into three sequential deploy stages. The build runs once at the top; each deploy stage targets a different host read from its own `environment` block. Dev and staging deploy automatically on `main`; prod is structurally present but still guarded by `when` (the human gate arrives in 12.3).
- **actions**:
  1. Keep a single `Build` stage at the top so the artifact is produced exactly once.
  2. Add three deploy stages, each with a stage-scoped `environment { DEPLOY_HOST = '...' }`:
```groovy
pipeline {
  agent any
  stages {
    stage('Build') {
      steps { sh 'make build' }   // the only place app.jar is produced
    }
    stage('Deploy to Dev') {
      when { branch 'main' }
      environment { DEPLOY_HOST = 'dev.example.com' }
      steps { sh 'scp target/app.jar deploy@$DEPLOY_HOST:/srv/app/app.jar' }
    }
    stage('Deploy to Staging') {
      when { branch 'main' }
      environment { DEPLOY_HOST = 'staging.example.com' }
      steps { sh 'scp target/app.jar deploy@$DEPLOY_HOST:/srv/app/app.jar' }
    }
    stage('Deploy to Prod') {
      when { branch 'main' }
      environment { DEPLOY_HOST = 'prod.example.com' }
      steps { sh 'scp target/app.jar deploy@$DEPLOY_HOST:/srv/app/app.jar' }
    }
  }
}
```
  3. Confirm in the stage view that all three deploy stages reuse the same `target/app.jar` built once at the top — there is no second `make build`.
- **win**: The stage view shows Build → Deploy Dev → Deploy Staging → Deploy Prod in order, each stage shipping the same artifact to a different `DEPLOY_HOST`, with no rebuild between environments.
- **jenkins_concepts**: build-once / promote-many; sequential per-environment deploy stages; stage-level `environment {}` for per-target config; progressively stricter `when` guards toward prod.
- **builds_on**: deploy-stage

### Level 11.3 — Manual Approval Gate
- **id**: manual-approval-gate
- **scope**: Put a human approval in front of the prod deploy using the `input` step, restricted to a named approver, with a timeout so the build does not wait forever.
- **difficulty**: 4
- **teach**: Automatic promotion to dev and staging is fine, but production usually needs a person to say "go." The `input` step (Ch 4.7) pauses the pipeline and shows a **Proceed / Abort** prompt in the UI; the build holds until someone clicks. You restrict *who* may click with the `submitter` parameter (a user or comma-separated list), and you bound the wait with `options { timeout(...) }` or the `input` step inside a `timeout {}` so a forgotten prompt aborts instead of pinning an executor forever. A common pattern is to place the `input` in its own lightweight stage with `agent none` so the pipeline is not holding a heavy executor while it waits — but even a plain `input` inside the prod stage works. If the approver aborts, the build ends as **ABORTED** and prod is never touched.
- **scenario**: The player guards the `Deploy to Prod` stage from 12.2 with an approval. Before prod ships, the pipeline must pause and ask a named release manager to approve, and it must auto-abort if nobody responds within 30 minutes.
- **actions**:
  1. Add an `Approve Prod` gate that only the release manager can submit, wrapped in a `timeout`:
```groovy
stage('Approve Prod') {
  when { branch 'main' }
  agent none   // don't hold an executor while waiting
  steps {
    timeout(time: 30, unit: 'MINUTES') {
      input message: 'Deploy to production?',
            ok: 'Ship it',
            submitter: 'release-manager'
    }
  }
}
stage('Deploy to Prod') {
  when { branch 'main' }
  environment { DEPLOY_HOST = 'prod.example.com' }
  steps { sh 'scp target/app.jar deploy@$DEPLOY_HOST:/srv/app/app.jar' }
}
```
  2. Run the build and confirm it pauses at **Deploy to production?** with a Ship it / Abort prompt.
  3. Confirm a user who is *not* `release-manager` cannot proceed, and that letting the timeout lapse marks the build **ABORTED** without touching prod.
- **win**: The build halts at the `input` prompt; only `release-manager` can click **Ship it** to release the same artifact to prod, and an unanswered prompt aborts after 30 minutes without deploying.
- **jenkins_concepts**: `input` step as a release gate; `submitter` for authorized approvers; `timeout` around `input`; `agent none` so a paused stage frees its executor; ABORTED on decline/timeout.
- **builds_on**: input-step, environment-promotion

### Level 11.4 — Blue-Green & Canary
- **id**: blue-green-canary
- **scope**: Reason about and model the two safest prod rollout shapes — blue-green (flip all traffic between two identical environments) and canary (shift a small slice of traffic first, then ramp) — as pipeline stages.
- **difficulty**: 5
- **teach**: A naive deploy restarts the live service in place, so any bad build is instantly live for everyone. Two strategies avoid that. **Blue-green:** run two identical prod environments, *blue* (live) and *green* (idle). Deploy the new build to the idle one, smoke-test it while it serves no real users, then flip the router/load balancer so green becomes live. Rollback is a flip back to blue — instant, with no redeploy. **Canary:** deploy the new build alongside the old and route a small percentage of traffic (say 10%) to it. Watch error/latency metrics; if healthy, ramp to 50% then 100%; if not, route 0% back. In a Jenkinsfile both are just deploy + verify + traffic-switch steps. Blue-green is two targets and a switch; canary is a loop of "raise the weight, verify" which maps naturally onto sequential stages (and the verify-vs-deploy work can fan out with `parallel {}` from Ch 10.5). You don't need new Jenkins features here — just shell/`curl`/`kubectl` that drive whatever router or platform you run.
- **scenario**: The player models a blue-green prod release: deploy to the green (idle) slot, smoke-test green directly, then flip the load balancer to green. Then they sketch a canary variant that ramps traffic 10% → 50% → 100% with a verify between each step.
- **actions**:
  1. Model blue-green as deploy-to-idle, verify-idle, then switch:
```groovy
stage('Deploy Green (idle)') {
  steps { sh 'scp target/app.jar deploy@green.example.com:/srv/app/app.jar' }
}
stage('Smoke Test Green') {
  steps { sh 'curl -fsS https://green.example.com/health' }   // -f makes a non-2xx exit non-zero
}
stage('Flip to Green') {
  steps { sh './switch-traffic.sh --to green' }   // points the LB at green
}
```
  2. Sketch the canary shape as a ramp with a verify between each step:
```groovy
stage('Canary 10%') {
  steps {
    sh './set-traffic-weight.sh canary 10'
    sh 'curl -fsS https://app.example.com/health'
  }
}
stage('Canary 50%') {
  steps {
    sh './set-traffic-weight.sh canary 50'
    sh 'curl -fsS https://app.example.com/health'
  }
}
stage('Canary 100%') {
  steps { sh './set-traffic-weight.sh canary 100' }
}
```
  3. Explain in the level recap why blue-green rollback is "flip back" (no redeploy) and why canary limits blast radius to the canary slice.
- **win**: The player can describe blue-green (deploy idle → verify → flip, rollback = flip back) and canary (ramp traffic with a verify gate at each step) and has expressed each as concrete deploy/verify/switch stages — recognizing both reuse only steps already taught (`sh`, `curl -f`, optional `parallel`).
- **jenkins_concepts**: blue-green vs canary rollout shapes; deploy-to-idle then traffic flip; traffic-weight ramp with a verify gate; `curl -f` as a fail-fast health check; rollout logic as ordinary shell-driven stages (no special plugin required).
- **builds_on**: environment-promotion

### Level 11.5 — Automated Rollback
- **id**: rollback
- **scope**: Run a smoke test immediately after the prod deploy and, if it fails, automatically roll back to the previous release using a `post { failure { ... } }` block.
- **difficulty**: 5
- **teach**: A deploy that "succeeded" (the `scp` returned 0) can still be broken — the app might crash on boot or fail health checks. The defense is: deploy, then *prove it works* with a smoke test, and if the proof fails, undo the deploy automatically. The smoke test is a step whose non-zero exit fails the stage (Ch 3.4) — e.g. `curl -fsS .../health`. The rollback lives in a `post {}` block (Ch 3.5): `post { failure { ... } }` runs only when the stage/pipeline failed, which is exactly when you want to revert. Rollback itself is "deploy the previous good artifact" — so you keep the prior release around (a `app.jar.prev`, a previous container tag, or a blue-green flip-back) and the failure handler reinstalls it. Because `failure` only fires on failure and `success` only on success, you get hands-off recovery: green deploys stay, broken deploys self-heal.
- **scenario**: The player adds a smoke test after the prod deploy. If the smoke test fails, a `post { failure { ... } }` block must restore the previous artifact and restart the service, and the build must end RED so humans are alerted — but prod is back on the last good version.
- **actions**:
  1. Back up the current release before overwriting, smoke-test after deploy, and roll back on failure:
```groovy
stage('Deploy to Prod') {
  when { branch 'main' }
  environment { DEPLOY_HOST = 'prod.example.com' }
  steps {
    // keep the currently-live artifact so we can restore it
    sh 'ssh deploy@$DEPLOY_HOST "cp /srv/app/app.jar /srv/app/app.jar.prev || true"'
    sh 'scp target/app.jar deploy@$DEPLOY_HOST:/srv/app/app.jar'
    sh 'ssh deploy@$DEPLOY_HOST "systemctl restart app"'
    // prove it actually works; non-2xx -> non-zero exit -> stage fails
    sh 'curl -fsS --retry 5 --retry-delay 3 https://prod.example.com/health'
  }
  post {
    failure {
      echo 'Smoke test failed — rolling back to previous release'
      sh 'ssh deploy@$DEPLOY_HOST "cp /srv/app/app.jar.prev /srv/app/app.jar && systemctl restart app"'
    }
  }
}
```
  2. Force a failure (point the smoke test at a broken build) and confirm the `failure` block restores `app.jar.prev` and restarts the service.
  3. Confirm a healthy deploy never triggers the rollback (the `failure` block is skipped) and the build is green.
- **win**: A failing post-deploy smoke test fires the `post { failure {} }` block, which restores the previous artifact and restarts the service; the build ends RED (alerting humans) while prod is automatically back on the last known-good release. A healthy deploy leaves the rollback untouched.
- **jenkins_concepts**: smoke test as a fail-the-stage step (`curl -fsS`, non-zero exit); `post { failure { ... } }` for automatic rollback; keeping a previous-release artifact to restore; failed build status as the human alert; idempotent restore-and-restart.
- **builds_on**: deploy-stage, post-conditions

### Level 11.6 — Deploy Targets & Credentials
- **id**: deploy-credentials-and-targets
- **scope**: Authenticate to real deploy targets — an SSH host and a Kubernetes cluster — using stored credentials bound for a limited block with `withCredentials`, never hardcoding secrets.
- **difficulty**: 4
- **teach**: Every deploy so far hand-waved authentication. Real targets demand secrets: an SSH key to reach a host, a kubeconfig or token to reach Kubernetes, an API key for a cloud. The rule from Chapter 7 still holds — secrets live in the Jenkins credential store, never in the Jenkinsfile. You bind them only where needed with `withCredentials` (Ch 7.3), which injects the secret into an environment variable for the duration of one block and masks it in the log. For SSH, an **SSH Username with private key** credential (Ch 7.4) pairs with the `sshagent` step so `scp`/`ssh` authenticate without a password. For Kubernetes, store the kubeconfig as a **Secret file** credential and bind it with `withCredentials([file(...)])` so `kubectl` finds it via `KUBECONFIG`. The credential id is the only thing the Jenkinsfile names; the secret itself is resolved at runtime and masked.
- **scenario**: The player parameterizes deploys to authenticate properly: an SSH key credential (id `prod-ssh-key`) for the host deploy via `sshagent`, and a kubeconfig stored as a Secret file credential (id `prod-kubeconfig`) bound via `withCredentials` for a `kubectl` rollout. No secret value appears in the Jenkinsfile or the console log.
- **actions**:
  1. Create the credentials first (Manage Jenkins → Credentials): an **SSH Username with private key** with id `prod-ssh-key`, and a **Secret file** holding the kubeconfig with id `prod-kubeconfig`.
  2. Deploy to the SSH host using `sshagent` so `scp`/`ssh` use the key:
```groovy
stage('Deploy to Host') {
  steps {
    sshagent(credentials: ['prod-ssh-key']) {
      sh 'scp target/app.jar deploy@prod.example.com:/srv/app/app.jar'
      sh 'ssh deploy@prod.example.com "systemctl restart app"'
    }
  }
}
```
  3. Deploy to Kubernetes by binding the kubeconfig file only for the block:
```groovy
stage('Deploy to Kubernetes') {
  steps {
    withCredentials([file(credentialsId: 'prod-kubeconfig', variable: 'KUBECONFIG')]) {
      sh 'kubectl set image deployment/app app=registry.example.com/app:$BUILD_NUMBER'
      sh 'kubectl rollout status deployment/app --timeout=120s'
    }
  }
}
```
  4. Confirm the console log shows the deploy succeeding with the secret values **masked** (shown as `****`), and that no key or kubeconfig text appears anywhere in the Jenkinsfile.
- **win**: Both deploys authenticate from stored credentials referenced only by id — `sshagent` for the SSH host and a `withCredentials` file binding for `kubectl` — the secret values are masked in the log, and the Jenkinsfile contains no secret material.
- **jenkins_concepts**: authenticating real deploy targets; SSH private-key credential + `sshagent` for `scp`/`ssh`; Secret file (kubeconfig) bound via `withCredentials([file(...)])` into `KUBECONFIG`; `kubectl set image` + `rollout status`; credential-by-id with runtime resolution and log masking.
- **builds_on**: withcredentials-step, deploy-stage

---

## Chapter 12 — Scripted Pipelines & Groovy
_Theme: the power-user escape hatch when declarative is not enough_

**Learning objectives**
- Explain when scripted pipelines beat declarative and write a basic `node {}` / `stage()` pipeline.
- Use Groovy fundamentals: variables, GStrings, lists, maps, conditionals, and truthiness.
- Drop into a `script {}` block inside a declarative pipeline to run imperative Groovy without abandoning the declarative shell.
- Iterate with loops and factor repeated logic into helper functions and closures.
- Handle failures with `try/catch/finally`, `error()`, `catchError`, and `currentBuild.result`, then build a `parallel` branch map programmatically.

**Prerequisites:** Chapters 3-4, 10

**Levels**

### Level 12.1 — Declarative vs Scripted
- **id**: declarative-vs-scripted
- **scope**: Explain the tradeoffs between declarative and scripted pipelines and write a basic scripted pipeline using `node {}` and `stage()`.
- **difficulty**: 4
- **teach**: Declarative pipelines (the `pipeline { agent { } stages { } }` form you already know from Chapter 3) are really a Groovy DSL with strict guardrails: a fixed structure, validation up front, and clean editor support. A scripted pipeline drops the guardrails and gives you a raw Groovy program — it starts with `node {}` (which allocates an agent and a workspace) and you call `stage('Name') {}` yourself wherever you like. Scripted gives full Groovy control (arbitrary loops, variables, and branching at the top level) but loses declarative niceties like `post {}`, `when {}`, and structural validation. The rule of thumb: prefer declarative, and reach for scripted only when you genuinely need imperative control that declarative can't express.
- **scenario**: The console at NimbusCI flickers: a legacy job written in the old scripted style needs a maintainer who actually understands it. Before you can fix it, the Gatekeeper makes you prove you can read AND write both dialects of the same simple "Build" job.
- **actions**:
  1. Inspect a working declarative pipeline that has one `Build` stage running `sh 'make'`, and note the `pipeline`, `agent`, `stages`, `stage`, `steps` keywords.
  2. Rewrite it as a scripted pipeline: wrap everything in `node { }`, then call `stage('Build') { sh 'make' }` inside it.
  3. Run the scripted job and confirm the stage view shows a single `Build` stage, exactly like the declarative version.
  4. Answer the Gatekeeper's prompt: pick which version you'd ship for a normal team job (declarative) and why.
- **win**: The scripted pipeline runs green with a visible `Build` stage, and you correctly identify declarative as the default choice for everyday jobs (scripted reserved for cases needing raw Groovy control).
- **jenkins_concepts**:
  Declarative — what you already know:
  ```groovy
  pipeline {
    agent any
    stages {
      stage('Build') {
        steps {
          sh 'make'
        }
      }
    }
  }
  ```
  The same job, scripted. `node` allocates an agent + workspace; `stage()` is a function call:
  ```groovy
  node {
    stage('Build') {
      sh 'make'
    }
  }
  ```
  Key terms: `node {}` (agent allocation, the scripted analog of `agent`), `stage('Name') {}` (a function, not a directive). Scripted loses `post`, `when`, `options`, and up-front validation — you implement those yourself in Groovy.
- **builds_on**: multiple-stages

### Level 12.2 — Groovy Basics for Pipelines
- **id**: groovy-basics
- **scope**: Use Groovy variables, GStrings, lists, and maps inside pipeline code.
- **difficulty**: 4
- **teach**: A Jenkinsfile is Groovy, so a little Groovy goes a long way. Declare variables with `def` (dynamic type) or a concrete type, and use `final` for values that must not change. Double-quoted strings are **GStrings** and interpolate with `${...}` (e.g. `"build ${env.BUILD_NUMBER}"`), while single-quoted strings are plain and do NOT interpolate — this matters because `sh 'echo $VAR'` lets the *shell* expand `$VAR` at runtime, but `sh "echo ${groovyVar}"` lets *Groovy* substitute the value before the shell ever sees it. Lists are `[1, 2, 3]` and maps are `[key: 'value']` (read with `map.key` or `map['key']`). Groovy truthiness treats empty strings, `0`, empty collections, and `null` as false, so `if (params.TAG)` is a clean "was it set and non-empty?" check.
- **scenario**: The legacy job hardcodes the same registry path in nine places. The Gatekeeper hands you a scratch pad and says: "Stop repeating yourself. Hold values in variables, build messages from them, and prove you know which quotes interpolate."
- **actions**:
  1. Declare `def imageName = 'nimbus/api'` and `final REGISTRY = 'registry.internal:5000'` at the top of a `script` scratch block.
  2. Build a GString tag: `def fullTag = "${REGISTRY}/${imageName}:${env.BUILD_NUMBER}"` and `echo` it.
  3. Create a list `def services = ['api', 'web', 'worker']` and a map `def ports = [api: 8080, web: 80]`, then echo `ports.api`.
  4. Deliberately compare a single-quoted `'echo $imageName'` against a double-quoted `"echo ${imageName}"` and observe that only the GString shows the resolved value.
  5. Use truthiness: `if (params.TAG) { echo "tag set" } else { echo "no tag" }` (recall `params` from Chapter 4).
- **win**: The console prints a fully-resolved tag like `registry.internal:5000/nimbus/api:42`, the map lookup prints `8080`, and you correctly state that single quotes do not interpolate in Groovy.
- **jenkins_concepts**:
  Variables, GStrings, collections, truthiness:
  ```groovy
  def imageName  = 'nimbus/api'
  final REGISTRY = 'registry.internal:5000'        // final = must not be reassigned

  def fullTag = "${REGISTRY}/${imageName}:${env.BUILD_NUMBER}"   // GString interpolation
  echo fullTag                                     // -> registry.internal:5000/nimbus/api:42

  def services = ['api', 'web', 'worker']          // list
  def ports    = [api: 8080, web: 80]              // map
  echo "api port = ${ports.api}"                   // -> api port = 8080

  if (params.TAG) {                                // truthiness: '' / 0 / null / [] are false
    echo "tag was set to ${params.TAG}"
  }
  ```
  Quoting gotcha — only the GString resolves in Groovy:
  ```groovy
  echo 'literal: $imageName'      // -> literal: $imageName   (single quotes: no Groovy interp)
  echo "resolved: ${imageName}"   // -> resolved: nimbus/api  (double quotes: GString)
  ```
- **builds_on**: declarative-vs-scripted

### Level 12.3 — The script Block
- **id**: script-block-in-declarative
- **scope**: Use a `script {}` block inside a declarative stage to run imperative Groovy without leaving the declarative pipeline.
- **difficulty**: 4
- **teach**: You don't have to abandon declarative to get a little Groovy power — `script {}` is an escape hatch you place inside a stage's `steps`. Inside it you can assign local variables, use `if`/loops, and capture step output, which plain declarative `steps` can't do. A common pattern is capturing a command's stdout: `sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()` returns the text instead of just an exit code (`.trim()` strips the trailing newline `sh` always adds). Assigning to `env.X` inside the block exposes the value to later stages. Keep `script {}` blocks small and focused — if one grows large, it's a sign the logic belongs in a shared library (Chapter 13, later).
- **scenario**: The deploy stage needs to stamp every build with the exact Git commit it built. Pure declarative can't capture that string — the Gatekeeper unlocks the `script` escape hatch and dares you to use it sparingly.
- **actions**:
  1. Start from a valid declarative pipeline with a `Stamp` stage.
  2. Inside `steps`, open a `script { }` block.
  3. Capture the short commit: `def commit = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()`.
  4. Build a GString and `echo "Building commit ${commit}"`, then expose it for later stages with `env.GIT_SHORT = commit`.
  5. Run the build and confirm the resolved commit hash appears in the console, with the `script` block kept to just a few lines.
- **win**: The console prints `Building commit <hash>` with a real short SHA (no trailing newline, no `$`-literal), and the `script {}` block stays small (roughly 3-5 lines).
- **jenkins_concepts**:
  `script {}` inside a declarative stage, with `returnStdout`:
  ```groovy
  pipeline {
    agent any
    stages {
      stage('Stamp') {
        steps {
          script {
            def commit = sh(script: 'git rev-parse --short HEAD',
                            returnStdout: true).trim()   // capture stdout, drop newline
            echo "Building commit ${commit}"
            env.GIT_SHORT = commit                       // expose to later stages
          }
        }
      }
    }
  }
  ```
  Notes: `returnStdout: true` returns the text (default returns the exit code); `.trim()` removes the trailing `\n`. Keep these blocks tiny — heavy logic is a smell that points toward a shared library (Chapter 13).
- **builds_on**: groovy-basics, declarative-skeleton

### Level 12.4 — Loops & Functions
- **id**: loops-and-functions
- **scope**: Iterate over collections with loops and factor repeated pipeline logic into functions and closures.
- **difficulty**: 4
- **teach**: When you do the same thing to many items — deploy three services, lint five modules — copy-pasting stages is the wrong move. Groovy gives you a classic `for (item in list) { }` loop and the more idiomatic `list.each { }` closure form, where `it` is the implicit element. You can also extract logic into a plain function, e.g. `def deployService(String name) { sh "./deploy.sh ${name}" }`, and call it from a `script` block or a scripted pipeline. A **closure** is a block of code (in curly braces) you can pass around and call later — `list.each { ... }` is literally passing a closure to `.each`. That same idea — a map of names to closures — is the foundation for the dynamic `parallel` map you'll build at the end of the chapter.
- **scenario**: NimbusCI just onboarded three more microservices, and the legacy job "solved" it by duplicating the deploy steps per service. The Gatekeeper demands one loop and one reusable function that handle any number of services.
- **actions**:
  1. Define `def services = ['api', 'web', 'worker']` in a `script` block.
  2. Loop with `for (svc in services) { echo "deploying ${svc}" }` and confirm three lines print.
  3. Rewrite the loop using `services.each { echo "deploying ${it}" }`.
  4. Extract a helper: `def deployService(String name) { sh "./deploy.sh ${name}" }` and call it from inside the loop.
  5. Run it and watch each service get deployed through the single shared function.
- **win**: All three services are processed by one loop calling one `deployService(...)` function (no per-service copy-pasted blocks), and the console shows a deploy line for each of `api`, `web`, and `worker`.
- **jenkins_concepts**:
  Loops, the `.each` closure, and a reusable function:
  ```groovy
  def services = ['api', 'web', 'worker']

  // classic for-in loop
  for (svc in services) {
    echo "deploying ${svc}"
  }

  // idiomatic .each — 'it' is the implicit element (a closure passed to .each)
  services.each { echo "deploying ${it}" }

  // factor repeated logic into a function
  def deployService(String name) {
    sh "./deploy.sh ${name}"
  }

  services.each { svc -> deployService(svc) }   // named closure param instead of 'it'
  ```
  Note: in a declarative pipeline these live inside a `script {}` block; in a scripted pipeline they can sit at the top level. A closure (`{ ... }`) is callable code you can store and pass around — the key to dynamic parallel (Level 12.6).
- **builds_on**: groovy-basics

### Level 12.5 — Error Handling
- **id**: error-handling
- **scope**: Handle failures with `try/catch/finally`, `error()`, `catchError`, and `currentBuild.result`.
- **difficulty**: 5
- **teach**: A non-zero `sh` exit normally fails the whole build immediately, but sometimes you want to react instead of just dying. Wrapping a step in `try { } catch (e) { } finally { }` lets you catch the failure, run cleanup that always executes (in `finally`), and decide the outcome yourself by setting `currentBuild.result = 'UNSTABLE'`. `error('message')` aborts the build on purpose with your own message (it throws, so code after it does not run). The cleaner, declarative-friendly tool is `catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') { ... }`, which marks the *stage* failed but lets the *build* keep the result you chose — perfect for "run this optional step but don't let it sink the pipeline." Remember: `currentBuild.result` reads as `null` while still successful, and you can only worsen it (SUCCESS -> UNSTABLE -> FAILURE), not silently upgrade a real failure back to green.
- **scenario**: A flaky integration smoke test keeps turning the whole pipeline red even when the deploy itself succeeded. The Gatekeeper wants the build to record the flaky test as a warning (UNSTABLE) and still always tear down the test environment — no matter what.
- **actions**:
  1. In a `script` block, wrap the smoke test in `try { sh './smoke.sh' }`.
  2. In `catch (err) { echo "smoke failed: ${err}"; currentBuild.result = 'UNSTABLE' }`, downgrade the build instead of failing it.
  3. Add `finally { sh './teardown.sh' }` so the environment is always cleaned up.
  4. In a second, optional stage, wrap a best-effort step in `catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') { sh './optional-lint.sh' }` and watch the stage go red while the build stays green.
  5. Trigger `error('manual abort: bad input')` in a guard branch to confirm an intentional, labeled failure.
- **win**: A failing smoke test leaves the build **UNSTABLE** (not FAILURE), `teardown.sh` runs every time via `finally`, and the `catchError` stage shows a failed stage while the overall build result stays SUCCESS.
- **jenkins_concepts**:
  `try/catch/finally` with `currentBuild.result`:
  ```groovy
  script {
    try {
      sh './smoke.sh'                       // non-zero exit throws
    } catch (err) {
      echo "smoke failed: ${err}"
      currentBuild.result = 'UNSTABLE'      // downgrade, don't fail outright
    } finally {
      sh './teardown.sh'                    // always runs (cleanup)
    }
  }
  ```
  `catchError` — fail the stage, keep the build result:
  ```groovy
  catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
    sh './optional-lint.sh'    // stage goes red, build stays green
  }
  ```
  Abort on purpose with a clear message:
  ```groovy
  if (!params.TARGET) {
    error('manual abort: TARGET parameter is required')   // throws and stops the build
  }
  ```
  Result severity only worsens: `null`(=SUCCESS) -> `UNSTABLE` -> `FAILURE`. You cannot relabel a genuine FAILURE back to SUCCESS.
- **builds_on**: script-block-in-declarative

### Level 12.6 — Dynamic Parallel
- **id**: dynamic-parallel
- **scope**: Build a `parallel` branch map programmatically from a list and execute the branches concurrently.
- **difficulty**: 5
- **teach**: In Chapter 10 you ran `parallel` with hand-written, fixed branches. But what if the number of branches isn't known until runtime — one test shard per discovered module, say? `parallel` actually takes a **map** of `name -> closure`, so you can build that map in a loop: start with `def branches = [:]`, then for each item assign `branches[name] = { ... work ... }`. There's one famous trap: a closure captures the loop *variable* by reference, not its value, so by the time the closures run they may all see the last value the variable held. The fix is to copy the loop variable into a fresh local inside the loop body (`def name = shard`) and reference that local in the closure. Then call `parallel branches` and Jenkins fans all branches out at once.
- **scenario**: The test suite now auto-discovers a variable number of shards, and the legacy job's three hardcoded `parallel` branches can't keep up. The Gatekeeper's final trial: generate the parallel branches from the live shard list — and survive the closure-capture trap.
- **actions**:
  1. Get the shard list at runtime, e.g. `def shards = ['unit', 'integration', 'e2e', 'contract']`.
  2. Create an empty map: `def branches = [:]`.
  3. Loop the shards; inside the loop, copy the variable (`def name = shard`) to dodge the capture trap, then assign `branches[name] = { sh "./run-tests.sh ${name}" }`.
  4. After the loop, call `parallel branches` and watch every shard run as its own concurrent branch.
  5. Verify in the stage/parallel view that branch labels match the shard names (not all the same last name) and all branches executed.
- **win**: `parallel` launches one concurrent branch per shard with correctly distinct names (`unit`, `integration`, `e2e`, `contract` each run their own command), and adding a fifth shard to the list produces a fifth branch with zero changes to the parallel call.
- **jenkins_concepts**:
  Build the branch map in a loop, then run it. Note the local copy that defeats the capture trap:
  ```groovy
  script {
    def shards   = ['unit', 'integration', 'e2e', 'contract']   // could come from sh/discovery
    def branches = [:]                                          // empty map: name -> closure

    for (shard in shards) {
      def name = shard                       // CRITICAL: fresh local copy per iteration
      branches[name] = {
        stage("test-${name}") {
          sh "./run-tests.sh ${name}"
        }
      }
    }

    parallel branches                        // fan out all branches concurrently
  }
  ```
  Without `def name = shard`, every closure captures the same loop variable and all branches run the *last* shard — the classic dynamic-parallel bug. `parallel` takes a `Map<String, Closure>`, which is exactly what the loop assembled.
- **builds_on**: loops-and-functions, parallel-stages

---

## Chapter 13 — Shared Libraries
_Theme: stop copy-pasting Jenkinsfiles across repos_

**Learning objectives**
- Explain why shared libraries exist and how they fight Jenkinsfile drift across many repos.
- Lay out the canonical `vars/`, `src/`, and `resources/` directory structure and load it with `@Library`.
- Author a custom pipeline step by defining `call()` in `vars/yourStep.groovy`.
- Encapsulate reusable logic as Groovy classes under `src/` with proper package directories.
- Bundle and read non-Groovy files with `libraryResource`.
- Pin a library to a tag/branch and reason about trusted (global) vs untrusted (folder) libraries.

**Prerequisites:** Chapter 12

**Levels**

### Level 13.1 — Why Shared Libraries
- **id**: why-shared-libraries
- **scope**: Explain reusing pipeline code across many repositories to stay DRY and consistent.
- **difficulty**: 4
- **teach**: When fifty repos each carry their own copy of the same `Jenkinsfile`, every fix has to be made fifty times — and in practice the copies drift, so "the build" means something slightly different in every repo. A **shared library** is one Git repository of pipeline code that every project loads at runtime, so a bug fixed once is fixed everywhere and a new policy ships to all teams in a single commit. The Jenkinsfile in each repo shrinks to a thin call into the library, and the real logic lives in one reviewed, versioned place. (The `@Library` load line and the `acmePipeline()` step previewed here are built out in the levels that follow.)
- **scenario**: You inherit "Acme Corp" — twelve services, twelve nearly-identical Jenkinsfiles. A security mandate says every build must now run a `trivy` scan. The console screen shows all twelve pipelines and a counter: "Patched: 0 / 12." You must stop the bleeding before more copies drift apart.
- **actions**:
  1. Inspect three of the twelve Jenkinsfiles side by side and spot that the `Build` and `Test` stages are byte-for-byte identical but two have already drifted (different `sh` flags).
  2. Try the naive fix: paste the new `Scan` stage into all twelve files; watch the "Patched" counter crawl to 12 and the screen warn "drift risk: HIGH — 12 copies to maintain."
  3. Choose the library path instead: collapse the shared stages into a single conceptual `acmePipeline()` step that all repos will call.
  4. Confirm the realization on screen: one place to add `trivy`, twelve repos updated by one commit; "drift risk: LOW."
- **win**: Player selects the shared-library strategy over copy-paste, correctly identifying that a single central change propagates to all consumers and eliminates drift.
- **jenkins_concepts**: DRY pipelines, configuration drift, central library vs per-repo copies. The "before" each repo carries:
  ```groovy
  // Jenkinsfile in EVERY repo — copy-pasted, drifts over time
  pipeline {
    agent any
    stages {
      stage('Build') { steps { sh 'make build' } }
      stage('Test')  { steps { sh 'make test' } }
      // someone must paste this into all 12 repos:
      stage('Scan')  { steps { sh 'trivy fs .' } }
    }
  }
  ```
  The "after" each repo carries instead:
  ```groovy
  @Library('acme-pipelines') _
  acmePipeline()   // build + test + scan, defined once in the library
  ```
- **builds_on**: declarative-vs-scripted

### Level 13.2 — Library Structure
- **id**: library-structure
- **scope**: Lay out the vars/, src/, resources/ folders and load with @Library.
- **difficulty**: 4
- **teach**: A shared library is just a Git repo with three special top-level directories. `vars/` holds global variables and custom steps — each `.groovy` file becomes a step named after the file. `src/` is a standard Java/Groovy source tree where packages map to directories (`src/org/acme/Foo.groovy` is class `org.acme.Foo`). `resources/` holds non-Groovy files (YAML, JSON, templates) you load by relative path. A Jenkinsfile pulls the library in with `@Library('name@version') _` — the trailing underscore is a required dummy import target so the annotation has something to attach to.
- **scenario**: The library repo `acme-pipelines` is an empty folder on the build canvas. Three labeled bins — `vars/`, `src/`, `resources/` — sit beside a pile of files that need sorting before the library will load.
- **actions**:
  1. Create the three directories at the repo root: `vars/`, `src/`, `resources/`.
  2. Drag `sayHello.groovy` into `vars/` (it will become a step called `sayHello`).
  3. Drag `Deployer.groovy` into `src/org/acme/`, fixing its declared `package org.acme` so the package matches the directory path.
  4. Drag `pod.yaml` into `resources/org/acme/` (resources may use any relative path; mirroring the package keeps it tidy).
  5. Write the load line at the top of a consumer Jenkinsfile and run it: `@Library('acme-pipelines@main') _`.
- **win**: All three folders exist at the repo root, each sample file sits in the correct one (package path matching for the `src/` class), and the Jenkinsfile's `@Library('acme-pipelines@main') _` line loads the library without an "unable to find library" or class-resolution error.
- **jenkins_concepts**: `vars/`, `src/`, `resources/`, package-to-path mapping, the `@Library` annotation and its trailing `_`.
  ```text
  acme-pipelines/
  ├── vars/
  │   └── sayHello.groovy
  ├── src/
  │   └── org/acme/
  │       └── Deployer.groovy
  └── resources/
      └── org/acme/
          └── pod.yaml
  ```
  ```groovy
  // top of the consumer Jenkinsfile
  @Library('acme-pipelines@main') _

  pipeline {
    agent any
    stages {
      stage('Hi') { steps { sayHello 'Kadir' } }
    }
  }
  ```
- **builds_on**: why-shared-libraries

### Level 13.3 — A Custom Step
- **id**: global-var-step
- **scope**: Create a global var step by defining call() in vars/yourStep.groovy.
- **difficulty**: 4
- **teach**: Any file `vars/x.groovy` that defines a `call()` method becomes a pipeline step you invoke as `x`. Groovy lets you drop the parentheses on a method call, so `def call(String name)` is invoked as `sayHello 'Kadir'`. Inside `call()` the normal pipeline steps (`echo`, `sh`) are available, so one step can wrap several operations behind a single name. You can document the step by adding a matching `vars/sayHello.txt` file, which Jenkins surfaces as the step's help under **Pipeline Syntax → Global Variables Reference**.
- **scenario**: The library loads, but `acmePipeline()` from level 14.1 doesn't exist yet. Your first job: build the humble `sayHello` step end-to-end so you understand the mechanics before tackling the big one. The editor shows an empty `vars/sayHello.groovy`.
- **actions**:
  1. In `vars/sayHello.groovy`, define `def call(String name) { echo "Hi ${name}" }`.
  2. Commit it to the library and run a consumer pipeline whose step is `sayHello 'Kadir'`.
  3. Read the console output and confirm it prints `Hi Kadir`.
  4. Add a `vars/sayHello.txt` help file describing the step, and verify it appears under the library's documented global variables.
  5. Bonus: make the step take a map so callers can write `sayHello name: 'Kadir', loud: true`, and have it `echo` in upper case when `loud` is set.
- **win**: A consumer pipeline calling `sayHello 'Kadir'` prints exactly `Hi Kadir` to the console, the step resolves from `vars/sayHello.groovy` (no "No such DSL method 'sayHello'" error), and the `.txt` help is present.
- **jenkins_concepts**: `vars/<step>.groovy`, the `call()` convention, parentheses-free invocation, `.txt` step documentation, named-argument maps.
  ```groovy
  // vars/sayHello.groovy
  def call(String name) {
    echo "Hi ${name}"
  }
  ```
  ```groovy
  // vars/sayHello.groovy — map variant for named args
  def call(Map cfg) {
    String msg = "Hi ${cfg.name}"
    echo cfg.loud ? msg.toUpperCase() : msg
  }
  ```
  ```groovy
  // consumer Jenkinsfile
  @Library('acme-pipelines@main') _
  pipeline {
    agent any
    stages {
      stage('Greet') { steps { sayHello 'Kadir' } }
    }
  }
  ```
- **builds_on**: library-structure

### Level 13.4 — Classes in src/
- **id**: src-classes
- **scope**: Write reusable logic as Groovy classes under src/ with package structure.
- **difficulty**: 5
- **teach**: When logic grows past a single `call()` — multiple methods, state, helpers — move it into a real Groovy class under `src/`, organized by package (`src/org/acme/Deployer.groovy` → `package org.acme; class Deployer`). Classes in `src/` have **no automatic access** to pipeline steps like `sh` or `echo`, so the standard pattern is to pass the pipeline context into the constructor — usually `this` from the calling step (often stored as a field named `steps`) — and call `steps.sh(...)` inside. A `vars/` step then becomes a thin wrapper: `new Deployer(this).run(env)`. Add `implements Serializable` so the class survives pipeline pause/resume across Groovy CPS checkpoints (the `groovy-basics` class and field syntax comes from Chapter 12).
- **scenario**: `acmePipeline` is ballooning with deploy logic — three environments, rollback, health checks — all crammed into one `vars/` file. The level demands you refactor the deploy code into a proper `org.acme.Deployer` class, threading the pipeline context through correctly. A red marker flags the spot where the class blindly calls `sh` and crashes.
- **actions**:
  1. Create `src/org/acme/Deployer.groovy` with `package org.acme` and a class `Deployer`.
  2. Give it a constructor that captures the pipeline context: `Deployer(def steps) { this.steps = steps }`.
  3. Add a `run(String env)` method that uses the captured context: `steps.sh "kubectl apply -f k8s/ --namespace ${env}"` and `steps.echo "Deployed to ${env}"`.
  4. Reproduce and fix the red marker: a bare `sh '...'` inside the class fails with `groovy.lang.MissingMethodException: No signature of method: org.acme.Deployer.sh` — change it to `steps.sh '...'`.
  5. From `vars/deploy.groovy`, wire the wrapper: `import org.acme.Deployer; def call(String env){ new Deployer(this).run(env) }`.
  6. Run a consumer pipeline that calls `deploy 'staging'` and confirm the class-driven deploy runs.
- **win**: `deploy 'staging'` in a consumer pipeline executes `Deployer.run('staging')`, the class reaches pipeline steps only via the injected `steps` context (no `MissingMethodException` for `sh`), and the `package`/path (`src/org/acme/Deployer.groovy`) match.
- **jenkins_concepts**: `src/` package-to-directory mapping, `import org.acme.Deployer`, constructor injection of pipeline context (`this` / `steps`), why `src/` classes can't call `sh` directly, `implements Serializable`.
  ```groovy
  // src/org/acme/Deployer.groovy
  package org.acme

  class Deployer implements Serializable {
    private def steps
    Deployer(def steps) { this.steps = steps }

    void run(String env) {
      steps.echo "Deploying to ${env}..."
      steps.sh "kubectl apply -f k8s/ --namespace ${env}"
      steps.echo "Deployed to ${env}"
    }
  }
  ```
  ```groovy
  // vars/deploy.groovy — thin wrapper over the class
  import org.acme.Deployer

  def call(String env) {
    new Deployer(this).run(env)
  }
  ```
- **builds_on**: global-var-step, groovy-basics

### Level 13.5 — Resources & Templates
- **id**: resources-and-helpers
- **scope**: Load bundled files (configs, templates) with libraryResource.
- **difficulty**: 5
- **teach**: Not everything is Groovy — pipelines often need a YAML manifest, a JSON config, or a shell template that should live with the library rather than be copy-pasted into a heredoc. Put those files under `resources/` and read them at runtime with the `libraryResource` step, passing the path relative to `resources/` (so `resources/org/acme/pod.yaml` is loaded as `libraryResource 'org/acme/pod.yaml'`). `libraryResource` returns the file's contents as a `String`; you typically `writeFile` it into the workspace or feed it straight to a step. Combine it with Groovy's `.replace(...)` to template in values like the build number — `env.BUILD_NUMBER` (the built-in environment variable from Chapter 4) is already a String, so `.replace` works directly.
- **scenario**: Your `Deployer` needs a Kubernetes pod manifest, but the manifest was being built by concatenating strings — ugly and unreadable. The level gives you a clean `resources/org/acme/pod.yaml` template with a `__TAG__` placeholder; your job is to load it, fill in the tag, and drop it into the workspace for `kubectl`.
- **actions**:
  1. Place the manifest at `resources/org/acme/pod.yaml`, containing `image: acme/app:__TAG__`.
  2. From a `vars/` step (or via the injected `steps` context inside a `src/` class), load it: `def yaml = libraryResource 'org/acme/pod.yaml'`.
  3. Template the build tag in: `yaml = yaml.replace('__TAG__', env.BUILD_NUMBER)`.
  4. Materialize it into the workspace: `writeFile file: 'pod.yaml', text: yaml`.
  5. Run the pipeline and confirm `pod.yaml` exists in the workspace with the real build number substituted (e.g. `image: acme/app:42`).
- **win**: The pipeline loads `org/acme/pod.yaml` via `libraryResource`, writes a `pod.yaml` into the workspace, and the placeholder `__TAG__` is replaced by the actual `BUILD_NUMBER` (no leftover `__TAG__` and no "could not find resource" error).
- **jenkins_concepts**: `resources/` tree, `libraryResource '<path>'` returning a String, `writeFile`, string templating with `.replace`.
  ```yaml
  # resources/org/acme/pod.yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: acme-app
  spec:
    containers:
      - name: app
        image: acme/app:__TAG__
  ```
  ```groovy
  // inside a vars/ step (libraryResource/writeFile are pipeline steps,
  // so from a src/ class call them as steps.libraryResource / steps.writeFile)
  def yaml = libraryResource 'org/acme/pod.yaml'
  yaml = yaml.replace('__TAG__', env.BUILD_NUMBER)
  writeFile file: 'pod.yaml', text: yaml
  sh 'kubectl apply -f pod.yaml'
  ```
- **builds_on**: library-structure

### Level 13.6 — Versioning & Trust
- **id**: versioning-libraries
- **scope**: Pin a library to a tag/branch and understand trusted vs untrusted libraries.
- **difficulty**: 5
- **teach**: The `@version` after the library name is any Git ref — a branch (`@main`), a tag (`@v1.2.0`), or a commit SHA — and pinning to a tag freezes consumers against a known-good release so a bad commit to `main` can't break every pipeline at once. Libraries are registered in **Manage Jenkins → System → Global Pipeline Libraries** (controller-wide) or scoped to a folder. Global libraries are **trusted**: their code runs without the Groovy script-security sandbox, so anyone who can push to that repo can run arbitrary code on the controller — keep write access tight. Folder-level libraries are **untrusted** and run sandboxed, which is safer for code a team self-manages. You can also pin a default version and decide whether consumers may override it.
- **scenario**: `main` just shipped a broken `Deployer`, and because every repo loaded `@main`, all twelve pipelines went red at once. The level tasks you with cutting a stable release, repinning consumers to the tag, and correctly classifying the library as trusted or untrusted in the registration screen.
- **actions**:
  1. Tag the last good commit of `acme-pipelines` as `v1.2.0`.
  2. Change every consumer's load line from `@Library('acme-pipelines@main')` to `@Library('acme-pipelines@v1.2.0')` and confirm the twelve pipelines go green again.
  3. Open the Global Pipeline Libraries registration and read the **trusted** badge — note that this library's code runs outside the sandbox on the controller.
  4. Decide a safer arrangement for a self-service team: register their library at **folder** scope so it runs **untrusted** (sandboxed).
  5. Lock it down: tighten the default version to the tag and toggle off **Allow default version to be overridden** so consumers can't silently float back to `@main`.
- **win**: Consumers are pinned to `acme-pipelines@v1.2.0` (broken `@main` no longer reaches them), and the player correctly labels the global library as trusted/unsandboxed and the folder library as untrusted/sandboxed in the registration UI.
- **jenkins_concepts**: `@Library('name@<ref>')` with branch/tag/SHA, Global Pipeline Libraries config, default version + override toggle, trusted (no sandbox, controller-wide) vs untrusted (sandboxed, folder-scoped) libraries.
  ```groovy
  // pin consumers to an immutable release tag
  @Library('acme-pipelines@v1.2.0') _
  acmePipeline()
  ```
  ```groovy
  // a Jenkinsfile may also load by branch or commit SHA
  @Library('acme-pipelines@main') _            // tracks the branch tip (risky)
  @Library('acme-pipelines@3f1a9c2') _         // frozen to one commit
  ```
  ```yaml
  # conceptual view of the Global Pipeline Libraries registration
  name: acme-pipelines
  defaultVersion: v1.2.0
  allowVersionOverride: false        # consumers can't float back to @main
  trusted: true                      # runs OUTSIDE the script-security sandbox
  retriever: git@github.com:acme/acme-pipelines.git
  ```
- **builds_on**: library-structure

---

## Chapter 14 — Security, RBAC, Folders & Audit
_Theme: lock it down before it bites you_

**Learning objectives**
- Choose and configure a security realm so Jenkins knows *who* a user is (built-in DB, LDAP/AD, or SSO/OAuth) and disable open signup.
- Apply an authorization strategy (matrix-based or role-based) that grants least privilege instead of "anyone logged in can do anything".
- Use folders to scope jobs, credentials, and permissions per team so one team's blast radius stays contained.
- Lock down the agent-to-controller channel and gate untrusted Groovy through the sandbox and In-process Script Approval.
- Turn on CSRF crumbs, audit-trail logging, and a safe markup formatter as baseline hardening.

**Prerequisites:** Chapters 7-8

**Levels**

### Level 14.1 — Authentication (Security Realm)
- **id**: security-realm
- **scope**: Pick and configure an authentication source so users must log in before touching Jenkins.
- **difficulty**: 3
- **teach**: Jenkins separates *authentication* (proving who you are — the **Security Realm**) from *authorization* (what you're allowed to do — covered next level). The realm lives under **Manage Jenkins → Security**. The simplest realm is **Jenkins' own user database**; for an organization you instead delegate to **LDAP/Active Directory** or **SSO/OAuth (SAML, GitHub, OIDC)** via a plugin so people use existing corporate accounts. A fresh install often has "Allow users to sign up" enabled, which lets *anyone* who can reach the URL create an account — almost always wrong for a real instance.
- **scenario**: Your team's Jenkins has been running with security disabled "just to get going." The console-output strip flashes a red banner: *unprotected Jenkins reachable on the network*. Before anything else ships, you must make people log in.
- **actions**:
  1. Open **Manage Jenkins → Security**.
  2. Under **Security Realm**, select **Jenkins' own user database**.
  3. **Uncheck** "Allow users to sign up" so random visitors can't self-register.
  4. Save, then go to **Manage Jenkins → Users → Create User** and add a real admin account (e.g. `alice`) with a strong password.
  5. Log out and log back in as `alice` to confirm the login page now gates access.
- **win**: Visiting Jenkins while logged out redirects to a login page; the signup link is gone; user `alice` can authenticate and reach the dashboard.
- **jenkins_concepts**: Security Realm, "Jenkins' own user database", disable signup, LDAP/SAML/OAuth delegation. The same realm can be expressed as Configuration-as-Code YAML (JCasC is covered in a later chapter, shown here only to make the setting concrete):
  ```yaml
  jenkins:
    securityRealm:
      local:
        allowsSignup: false   # no open registration
        users:
          - id: alice
            password: "${ADMIN_PASSWORD}"
  ```
  An LDAP realm instead points at a directory server:
  ```yaml
  jenkins:
    securityRealm:
      ldap:
        configurations:
          - server: "ldaps://ldap.example.com:636"
            rootDN: "dc=example,dc=com"
            userSearchBase: "ou=people"
            userSearch: "uid={0}"
  ```
- **builds_on**: ui-tour

### Level 14.2 — Authorization Strategies
- **id**: authorization-strategies
- **scope**: Replace blanket access with a matrix- or role-based authorization strategy that enforces least privilege.
- **difficulty**: 4
- **teach**: Once users can log in, the **Authorization** section decides what each may do. **"Logged-in users can do anything"** is convenient but means every authenticated person is effectively admin. **Matrix-based security** gives you a grid of permissions (Overall, Job, Run, Agent, Credentials...) per user or group, so you can grant `alice` admin while `bob` only gets Job/Read and Job/Build. The **Role-based Authorization Strategy** plugin scales this further: you define named **global roles** (admin, developer, viewer) and **item roles** scoped by a job-name regex, then assign users to roles instead of ticking hundreds of boxes. Always keep at least one account with **Overall/Administer**, or you can lock yourself out.
- **scenario**: Login works, but the audit flagged that all five engineers inherited full admin. Marketing's intern now technically has the power to delete every job. You need developers who can run builds and a viewer who can only look.
- **actions**:
  1. Go to **Manage Jenkins → Security → Authorization** and switch from "Logged-in users can do anything" to **Matrix-based security**.
  2. Add `alice` and grant **Overall/Administer** (your safety net).
  3. Add `bob` and grant only **Overall/Read**, **Job/Read**, and **Job/Build**.
  4. Add `viewer` and grant only **Overall/Read** and **Job/Read**.
  5. (Optional path) Install the **Role-based Authorization Strategy** plugin, switch to it, and create a `developer` global role bundling Job/Read+Build to assign in one click.
  6. Save, then log in as `bob` and confirm the **Delete Job** and **Manage Jenkins** options are absent.
- **win**: `alice` retains full admin; `bob` can build but cannot delete jobs or open Manage Jenkins; `viewer` can read but not build; no non-admin sees the Manage Jenkins link.
- **jenkins_concepts**: Matrix-based security, Role-based Authorization Strategy plugin, global vs item roles, the "keep one admin" rule. Expressed in JCasC (shown for concreteness only):
  ```yaml
  jenkins:
    authorizationStrategy:
      globalMatrix:
        permissions:
          - "Overall/Administer:alice"
          - "Overall/Read:bob"
          - "Job/Read:bob"
          - "Job/Build:bob"
          - "Overall/Read:viewer"
          - "Job/Read:viewer"
  ```
  The role-strategy plugin instead defines roles, then lists each member under `assignments`:
  ```yaml
  jenkins:
    authorizationStrategy:
      roleBased:
        roles:
          global:
            - name: developer
              permissions:
                - "Job/Read"
                - "Job/Build"
              assignments:
                - "bob"
  ```
- **builds_on**: security-realm

### Level 14.3 — Folders & Scoping
- **id**: folders-and-scoping
- **scope**: Group a team's jobs in a folder and scope its credentials and permissions so they don't leak to other teams.
- **difficulty**: 4
- **teach**: A **Folder** (from the Folders plugin) is a container that holds jobs *and* its own credentials and permission grants. Credentials added inside a folder are visible only to jobs in that folder or its subfolders — this is the **folder scope** from the credential-scopes level, applied to organize teams. Combined with the **Role-based Authorization Strategy**, you can assign an *item role* whose pattern matches `team-a/.*`, so Team A administers their folder while being blind to Team B's. The payoff is a contained **blast radius**: a compromised or careless Team A job can't read Team B's deploy key or trigger their jobs.
- **scenario**: Two squads share one Jenkins. Team A keeps accidentally browsing Team B's production credentials in the global store. You're asked to wall each squad into its own folder with its own secrets and its own admins.
- **actions**:
  1. From the dashboard choose **New Item → Folder** and create `team-a`; repeat for `team-b`.
  2. Open `team-a`, go to **Credentials → (folder) team-a → Add Credentials**, and store Team A's deploy token *inside the folder* rather than globally.
  3. Move (or recreate) Team A's pipeline jobs inside the `team-a` folder.
  4. In the role strategy, create an **item role** `team-a-admin` with pattern `^team-a/.*` granting Job and Credentials permissions, and assign Team A's users.
  5. Log in as a Team B user and confirm the `team-a` folder's credentials and jobs are not visible.
- **win**: Team A's deploy token appears only to jobs under `team-a`; a Team A pipeline can reference it by ID while a Team B job cannot; Team B users see no Team A jobs or secrets.
- **jenkins_concepts**: Folders plugin, folder-scoped credentials, item roles with name patterns, blast-radius isolation. A pipeline inside the folder consumes the folder credential exactly like a global one:
  ```groovy
  pipeline {
    agent any
    stages {
      stage('Deploy') {
        steps {
          // 'team-a-deploy-token' is defined in the team-a folder, not globally
          withCredentials([string(credentialsId: 'team-a-deploy-token',
                                   variable: 'TOKEN')]) {
            sh 'curl -H "Authorization: Bearer $TOKEN" https://deploy.team-a.internal'
          }
        }
      }
    }
  }
  ```
  Resolution walks outward: the job's folder is searched first, then parent folders, then the global store.
- **builds_on**: authorization-strategies, credential-scopes

### Level 14.4 — Agent/Controller Security
- **id**: agent-controller-security
- **scope**: Lock down the agent-to-controller channel and force untrusted Groovy through the sandbox and script approval.
- **difficulty**: 5
- **teach**: The **controller** holds every secret and the keys to the kingdom; **agents** are less trusted machines that run build code. **Agent → controller access control** restricts what an agent can ask the controller to do (read files, run commands), so a compromised agent can't pivot into the controller's secrets. Separately, pipeline and console-script Groovy runs in a **Groovy sandbox**: safe, whitelisted calls execute freely, but anything dangerous (reflection, `File`, arbitrary Java) is blocked and queued in **Manage Jenkins → In-process Script Approval** for an admin to approve. The rule: never disable the sandbox or blanket-approve scripts you don't trust — that's a direct path to remote code execution on the controller.
- **scenario**: A contributor's pipeline fails with `Scripts not permitted to use staticMethod`. The quick "fix" floating around your team chat is to untick **Use Groovy Sandbox**. You need to do it the safe way and keep agents from over-reaching.
- **actions**:
  1. Open **Manage Jenkins → Security** and confirm **Agent → Controller Security** access control is **enabled** (the default), keeping the protection rules in force.
  2. Reproduce the failing pipeline; note the `RejectedAccessException` naming the exact signature it tried to call.
  3. Go to **Manage Jenkins → In-process Script Approval** and review the pending signature; approve only that specific, benign method — not "approve all".
  4. Leave **Use Groovy Sandbox** *checked* on the pipeline job so future scripts stay constrained.
  5. Re-run the pipeline and confirm it now passes without disabling the sandbox.
- **win**: Agent-to-controller access control is enabled; the pipeline succeeds with the sandbox still on; only the one reviewed signature was approved; the sandbox was never disabled.
- **jenkins_concepts**: Agent-to-controller access control, Groovy sandbox, In-process Script Approval, `RejectedAccessException`. The sandbox is on by default in a pipeline job; trusted library code (see versioning-libraries) runs *outside* the sandbox, which is why library trust matters:
  ```groovy
  // Runs fine in the sandbox — whitelisted steps only
  pipeline {
    agent any
    stages {
      stage('Build') { steps { sh 'make build' } }
    }
  }
  ```
  ```groovy
  // Triggers RejectedAccessException → queued for In-process Script Approval
  script {
    def f = new File('/var/lib/jenkins/secrets/master.key') // blocked by sandbox
    echo f.text
  }
  ```
- **builds_on**: why-agents, versioning-libraries

### Level 14.5 — Audit & Hardening
- **id**: audit-and-csrf
- **scope**: Turn on CSRF crumbs, audit-trail logging, and a safe markup formatter as baseline hardening.
- **difficulty**: 4
- **teach**: **CSRF protection** (the "crumb" / **default crumb issuer**) stops a malicious page from tricking a logged-in admin's browser into firing state-changing requests at Jenkins; it's on by default and should stay on. The **Audit Trail** plugin records *who did what when* (job runs, config changes, deletes) to a file or syslog so security events are reviewable after the fact. Jenkins also renders user-supplied text (job descriptions, build descriptions); the default **markup formatter** is plain text, and you should keep it safe rather than enabling raw HTML, which would allow stored XSS. The umbrella habit behind all of this: **keep Jenkins core and every plugin patched**, since most real-world Jenkins compromises exploit known, already-fixed CVEs.
- **scenario**: Compliance is coming and they want answers to "who deleted the prod-deploy job last Tuesday?" Right now nothing is logged, and a teammate just pasted raw `<script>` into a build description as a joke. Time to harden.
- **actions**:
  1. In **Manage Jenkins → Security**, confirm **Prevent Cross Site Request Forgery exploits** is **checked** (default crumb issuer enabled).
  2. Confirm the **Markup Formatter** is set to **Plain text** (not raw HTML) so descriptions can't inject scripts.
  3. Install the **Audit Trail** plugin and configure a logger writing to `/var/log/jenkins/audit.log` with a pattern that captures job and config events.
  4. Make a test change (run a job, edit a config) and confirm a line appears in the audit log naming the user and action.
  5. Open **Manage Jenkins → Plugins → Updates** and confirm there are no outstanding security advisories; schedule patching of any flagged plugins.
- **win**: CSRF crumbs are enabled; the markup formatter is plain text (the `<script>` renders inert); the audit log records the test action with username and timestamp; no plugin shows an unresolved security warning.
- **jenkins_concepts**: CSRF crumb issuer, Audit Trail plugin, markup formatter / stored-XSS, plugin patching. A REST/CLI call that changes state must carry a crumb, illustrating why CSRF protection is active:
  ```bash
  # Fetch a crumb, then include it on a state-changing POST
  CRUMB=$(curl -s -u alice:TOKEN \
    'https://jenkins.example.com/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,":",//crumb)')
  curl -s -u alice:TOKEN -H "$CRUMB" \
    -X POST 'https://jenkins.example.com/job/my-job/build'
  ```
  A sample Audit Trail line shows the reviewable trail compliance wants:
  ```
  2026-06-23 14:02:11 job/prod-deploy/ #42 Started by user alice
  2026-06-23 14:05:33 /job/prod-deploy/doDelete by alice
  ```
- **builds_on**: security-realm

---

## Chapter 15 — Monitoring, Logs & Troubleshooting
_Theme: when builds break, find out why fast_

**Learning objectives**
- Read console output end-to-end and pinpoint the exact failing step and exit code.
- Use Stage View and Blue Ocean to locate a failing stage visually.
- Recognize the handful of failure modes behind most red builds.
- Apply targeted debugging techniques (Replay, Restart from Stage, `sh -x`, echo/sleep) without polluting the repo.
- Monitor Jenkins health through system logs, metrics, disk usage, and queue/executor pressure.

**Prerequisites:** Chapters 3, 9

**Levels**

### Level 15.1 — Reading the Console
- **id**: read-console-output
- **scope**: Read console output and pinpoint the failing step and exit code.
- **difficulty**: 2
- **teach**: Every build writes a full console log, and the truth is always in there. A failed pipeline ends with `Finished: FAILURE`, and a failed `sh` step prints a line like `script returned exit code 1` right where it died. The trick is to scroll up from the bottom (or search the log) until you find the first real error — usually the last command's output before Jenkins gave up. Jenkins also brackets each stage and step with `[Pipeline]` lines, so you can see exactly which step was running when things broke.
- **scenario**: A teammate pings you: "the nightly build went red and I have no idea why." You open the build and stare at a wall of console text. Your job is to find the one line that actually explains the failure.
- **actions**:
  1. Open the failed build and click **Console Output** to load the full log.
  2. Jump to the bottom and confirm the build ended with `Finished: FAILURE`.
  3. Scroll up to the last `[Pipeline] sh` block and read the command's output.
  4. Spot the line `script returned exit code 2` and the error text just above it (`make: *** [build] Error 2`).
  5. Use the browser search (Ctrl/Cmd-F) for `error` to confirm it's the first and only real failure, then report the failing step and exit code back to your teammate.
- **win**: Player correctly names the failing step (the `make build` shell step) and its exit code (2), and identifies the `Finished: FAILURE` terminator.
- **jenkins_concepts**: Console markers and exit codes. A failing shell step looks like this in the log:
  ```text
  [Pipeline] sh
  + make build
  gcc: fatal error: no input files
  make: *** [Makefile:7: build] Error 2
  ERROR: script returned exit code 2
  [Pipeline] }
  [Pipeline] // stage
  Finished: FAILURE
  ```
  The pipeline that produced it:
  ```groovy
  stage('Build') {
    steps {
      sh 'make build'   // non-zero exit fails the step, the stage, and the build
    }
  }
  ```
- **builds_on**: sh-and-echo-steps

### Level 15.2 — Stage View & Blue Ocean
- **id**: pipeline-visualization
- **scope**: Use the stage view and Blue Ocean to see which stage failed at a glance.
- **difficulty**: 3
- **teach**: Reading raw logs is slow when a pipeline has many stages. The **Stage View** on the job page shows a grid: one column per stage, one row per build, and a red cell marks exactly which stage failed and how long it took. **Blue Ocean** goes further with a visual pipeline graph — green checks and a red X — and lets you click the failed stage to see only that stage's steps and logs, instead of the whole console. Both turn "which stage broke?" into a one-glance answer before you ever open the full log.
- **scenario**: A six-stage pipeline (Checkout -> Build -> Unit Tests -> Integration Tests -> Package -> Deploy) is failing intermittently. Opening the full console for each run is painful. You switch to the visual tools to localize the failure in seconds.
- **actions**:
  1. On the job page, look at the **Stage View** grid and find the red cell — it sits under **Integration Tests**.
  2. Hover the red cell to read the inline error tooltip and the stage duration.
  3. Open **Blue Ocean** for the same build and see the pipeline graph with a red X on the Integration Tests node.
  4. Click that node to expand only its steps, then click the failing `sh` step to read just its log.
  5. Confirm Checkout/Build/Unit Tests are green and the failure is isolated to one stage, then move on without scrolling the whole console.
- **win**: Player identifies the failing stage (Integration Tests) using Stage View's red cell and confirms it in Blue Ocean by clicking the node to surface that stage's step log.
- **jenkins_concepts**: Stage View needs named stages to render columns; Blue Ocean reads the same stages. The pipeline behind the grid:
  ```groovy
  pipeline {
    agent any
    stages {
      stage('Checkout')          { steps { checkout scm } }
      stage('Build')             { steps { sh 'make build' } }
      stage('Unit Tests')        { steps { sh 'make test-unit' } }
      stage('Integration Tests') { steps { sh 'make test-integration' } } // red cell here
      stage('Package')           { steps { sh 'make package' } }
      stage('Deploy')            { steps { sh './deploy.sh' } }
    }
  }
  ```
  Blue Ocean URL pattern: `/blue/organizations/jenkins/<job>/detail/<branch>/<build#>/pipeline`.
- **builds_on**: read-console-output, multiple-stages

### Level 15.3 — Common Failure Modes
- **id**: common-failure-modes
- **scope**: Recognize workspace, missing-tool, permission, and flaky-test failures.
- **difficulty**: 3
- **teach**: Most red builds are one of a few recurring shapes, and the error text tells you which. `command not found` means a tool isn't installed or isn't on `PATH`. `Permission denied` means a script isn't executable or the agent user lacks rights. `No such DSL method 'xyz'` means a pipeline step's plugin isn't installed. A test that passes on retry but not on first run is **flaky**, often from timing or shared state. And leftover files from a previous build (a dirty **workspace**) cause "file already exists" or stale-artifact errors. Matching the message to the mode tells you the fix without guessing.
- **scenario**: Four jobs failed overnight, each with a different error. You're handed the four console snippets and asked to classify each failure and propose the one-line fix — no rebuilding allowed until you've diagnosed them.
- **actions**:
  1. Read snippet A: `node: command not found` -> classify as **missing tool / PATH**; fix is to install Node or add it via `tools {}` (the tools directive from Chapter 6).
  2. Read snippet B: `./deploy.sh: Permission denied` -> classify as **permission**; fix is `chmod +x deploy.sh` (or `sh 'bash deploy.sh'`).
  3. Read snippet C: `java.lang.NoSuchMethodError ... No such DSL method 'junit'` -> classify as **missing plugin**; fix is to install the JUnit plugin (plugins from Chapter 8).
  4. Read snippet D: a test that failed once then passed on Replay -> classify as **flaky test**; fix is to stabilize the test, not the pipeline.
  5. Notice job E left `dist/` from a prior run causing `cp: cannot create ... File exists` -> classify as **dirty workspace**; fix is `cleanWs()` (covered later in 16.6) or a clean step.
- **win**: Player correctly maps all five symptoms to their failure mode (missing tool, permission, missing plugin, flaky test, dirty workspace) and names the matching one-line remedy for each.
- **jenkins_concepts**: The diagnostic signatures and their fixes:
  ```text
  + node --version
  /bin/sh: node: command not found         -> tool not installed / not on PATH

  + ./deploy.sh
  /bin/sh: ./deploy.sh: Permission denied   -> chmod +x, or run via `bash`

  java.lang.NoSuchMethodError:
  No such DSL method 'junit' found          -> install the missing plugin

  cp: cannot create 'dist/app': File exists -> stale workspace, needs cleaning
  ```
  Quick remedies in pipeline form:
  ```groovy
  tools { nodejs 'node-20' }                          // fixes "node: command not found"
  steps { sh 'chmod +x deploy.sh && ./deploy.sh' }    // fixes Permission denied
  ```
- **builds_on**: read-console-output

### Level 15.4 — Debugging Techniques
- **id**: debugging-techniques
- **scope**: Debug with Replay, Restart from Stage, sh -x, and targeted echo/sleep.
- **difficulty**: 4
- **teach**: When a failure isn't obvious from the log, you reproduce and probe it. **Replay** lets you edit the pipeline script for a single run without committing — perfect for adding a debug line and re-running. **Restart from Stage** re-runs from a chosen stage instead of the whole pipeline, so you don't repeat a 10-minute build to test a deploy fix. Inside a shell step, `sh 'set -x; ...'` echoes every command as it runs, and a quick `echo "$VAR"` or `sh 'env | sort'` reveals what the environment actually is. A short `sleep` can hold the workspace so you can inspect it on the agent. The golden rule: these are throwaway probes — never commit debug code.
- **scenario**: A deploy stage fails only on the CI agent, never locally, and the log just says `exit code 1` with no detail. You need to make the pipeline tell you more — without pushing experimental commits to the repo and without re-running the slow earlier stages each time.
- **actions**:
  1. Open the failed build and click **Replay** to get an editable copy of the pipeline script.
  2. In the Deploy stage, change `sh './deploy.sh'` to `sh 'set -x; ./deploy.sh'` and add `sh 'env | sort'` above it to dump the environment.
  3. Run the Replay; the verbose trace shows `DEPLOY_TOKEN` is empty on the agent — the real cause.
  4. Use **Restart from Stage -> Deploy** to re-test the fix without re-running Build and Tests.
  5. Once the cause is confirmed, discard the Replay edits and fix the root issue in the real Jenkinsfile — committing nothing that contains `set -x`, `sleep`, or debug echoes.
- **win**: Player uses Replay to add a non-committed `set -x` / env-dump, identifies the empty variable as the cause, re-runs only the Deploy stage via Restart from Stage, and leaves no debug code in the repo.
- **jenkins_concepts**: Throwaway debugging inside a stage:
  ```groovy
  stage('Deploy') {
    steps {
      sh 'env | sort'                                   // what the environment actually is
      echo "token len: ${env.DEPLOY_TOKEN?.length()}"   // null/empty shows up immediately
      sh '''
        set -x                                          # trace every command + its expansion
        ./deploy.sh
      '''
      // sleep time: 300, unit: 'SECONDS'               // optional: hold workspace to inspect on the agent
    }
  }
  ```
  Replay = edit script for one run (no commit). Restart from Stage = resume at a chosen stage. Both live on the left menu of a finished build; remove all of the above before committing.
- **builds_on**: pipeline-visualization, script-block-in-declarative

### Level 15.5 — System Logs & Metrics
- **id**: system-logs-and-metrics
- **scope**: Use system logs and the Monitoring/Prometheus metrics for Jenkins health.
- **difficulty**: 4
- **teach**: Not every problem shows up in a build log — sometimes Jenkins itself is unhealthy. **Manage Jenkins -> System Log** shows the controller's own log, and you can add a **custom log recorder** scoped to a package (e.g. `hudson.plugins.git`) to watch one subsystem at high verbosity. For trends over time, the **Monitoring** plugin exposes CPU, memory, and thread stats, while the **Prometheus** plugin publishes a `/prometheus` metrics endpoint that gauges things like queue size and busy executors so you can graph and alert on them. These tools answer "is Jenkins itself struggling?" rather than "why did this one build fail?".
- **scenario**: Builds are queuing up and occasionally a Git checkout hangs, but individual console logs look fine. The problem is at the server level, so you go to Jenkins' own logs and metrics to see the controller's health.
- **actions**:
  1. Go to **Manage Jenkins -> System Log** and skim the default log for stack traces around the hang times.
  2. Add a new log recorder named `git-debug` with logger `hudson.plugins.git` set to level `FINE` to capture verbose checkout activity.
  3. Reproduce the hang and read the new recorder's output to see the slow `git fetch`.
  4. Open the **Monitoring** plugin page and note CPU and memory under load.
  5. Hit the Prometheus endpoint and read the queue and executor gauges to confirm jobs are waiting, not failing.
- **win**: Player creates a working custom log recorder scoped to a Git package, reads it during a hang, and reads at least one health metric (queue size or in-use executors) from the Monitoring or Prometheus endpoint.
- **jenkins_concepts**: Custom log recorder: **Manage Jenkins -> System Log -> Add new log recorder**, logger `hudson.plugins.git` at level `FINE`. The Prometheus endpoint is exposed by the plugin:
  ```bash
  curl -s http://jenkins.example.com/prometheus | grep -E 'queue_size|executor'
  # jenkins_queue_size_value 4.0          # items waiting in the build queue
  # jenkins_executor_count_value 8.0      # total executors across all nodes
  # jenkins_executor_in_use_value 8.0     # executors currently busy (free = count - in_use = 0)
  ```
  Health questions these answer: `queue_size` high + `in_use` == `count` (zero free) = starvation (next level); rising heap = leak or retention problem.
- **builds_on**: ui-tour

### Level 15.6 — Disk & Performance
- **id**: disk-and-performance
- **scope**: Diagnose disk pressure, queue starvation, and executor tuning.
- **difficulty**: 4
- **teach**: Two resource problems quietly cause most "Jenkins is slow/broken" reports. First, `JENKINS_HOME` fills up — old builds, logs, and archived artifacts accumulate until the disk is full and builds start failing with `No space left on device`; the fixes are `buildDiscarder` retention (from Chapter 6), cleaning workspaces with `cleanWs()`, and keeping fewer artifacts. Second, **queue starvation**: jobs pile up in the build queue because there aren't enough executors or agents to run them. You tune this by adding agents (Chapter 9), raising executor counts, and keeping the controller lean (run builds on agents, not the controller). The signal for each is concrete: a full disk vs a long-and-growing queue with zero free executors.
- **scenario**: It's Monday and Jenkins is crawling. Some builds fail with `No space left on device`; others sit in the queue for 20 minutes before starting. You have two separate resource problems to diagnose and relieve.
- **actions**:
  1. Confirm the disk problem: the controller disk usage widget shows `JENKINS_HOME` near 100% and a build log ends in `No space left on device`.
  2. Add build retention so old builds stop accumulating, using `buildDiscarder` (from Chapter 6) in the pipeline `options`.
  3. Add `cleanWs()` in `post` so each build releases its workspace instead of hoarding files.
  4. Confirm the starvation problem: the Prometheus `jenkins_queue_size_value` is high while `jenkins_executor_in_use_value` equals `jenkins_executor_count_value` (zero free, from 16.5).
  5. Relieve it by raising the agents' executor count and routing builds to agents (keeping the controller at 0 executors), then verify the queue drains.
- **win**: Player relieves disk pressure (adds `buildDiscarder` + `cleanWs`, disk usage drops) AND relieves starvation (queue size falls and free executors become available after adding capacity), correctly distinguishing the two symptoms.
- **jenkins_concepts**: Retention and workspace cleanup to control disk:
  ```groovy
  pipeline {
    agent { label 'linux' }              // run on an agent, keep controller lean
    options {
      buildDiscarder(logRotator(numToKeepStr: '20', artifactNumToKeepStr: '5'))
    }
    stages {
      stage('Build') { steps { sh 'make build' } }
    }
    post {
      always { cleanWs() }               // free the workspace every run
    }
  }
  ```
  Diagnostics:
  ```bash
  du -sh "$JENKINS_HOME"            # what is eating disk
  df -h /var/lib/jenkins            # No space left on device?
  # jenkins_queue_size_value high + (in_use == count) -> starvation: add agents / executors
  ```
  Keep the controller at **0 executors** (Manage Jenkins -> Nodes -> Built-In Node) so heavy work runs on agents.
- **builds_on**: build-retention, why-agents

---

## Chapter 16 — Configuration as Code (JCasC) & Scaling
_Theme: a reproducible, version-controlled Jenkins_

**Learning objectives**
- Explain why declarative YAML beats clicking through the UI for reproducibility, review, and recovery.
- Write a `jenkins.yaml` covering the `jenkins`, `security`, `tool`, and `unclassified` roots and apply it.
- Seed credentials, tools, and jobs (via Job DSL) entirely from code.
- Back up and restore `JENKINS_HOME` and plan safe LTS upgrades with a rollback path.
- Plan controller sizing, ephemeral agent fleets, and the limits of HA / per-team controllers.
- Manage the JCasC config itself through a GitOps pipeline with review and drift detection.

**Prerequisites:** Chapters 7-9, 14

**Levels**

### Level 16.1 — Why Configuration as Code
- **id**: why-jcasc
- **scope**: Explain configuring Jenkins from declarative YAML instead of manual UI clicks.
- **difficulty**: 4
- **teach**: A hand-configured Jenkins is a "snowflake" — nobody remembers which of the hundred Manage Jenkins checkboxes were ticked, so it can't be rebuilt or reviewed. The Configuration as Code (JCasC) plugin reads a single `jenkins.yaml` and applies it to the controller on boot, turning every system setting into reviewable, version-controlled text. Because the YAML is the source of truth, you get reproducible controllers, pull-request review of config changes, and disaster recovery that is just "boot a fresh Jenkins pointed at the same YAML." The goal: no more "works on my Jenkins."
- **scenario**: Your team's only Jenkins box died over the weekend. The new hire asks how to rebuild it and you realize the entire config lives in one admin's memory. You're handed two controllers — a hand-clicked snowflake and a JCasC-driven one — and asked to prove which one survives a rebuild.
- **actions**:
  1. Inspect the snowflake controller: open Manage Jenkins and count the screens that hold state (system message, executors, security realm, tool installs) — none of it is written down anywhere.
  2. Simulate disaster: wipe both controllers and reboot them from a clean image.
  3. The snowflake comes back empty; the JCasC controller re-reads its `jenkins.yaml` and restores every setting automatically.
  4. Open the Configuration as Code screen (Manage Jenkins → Configuration as Code) on the survivor and confirm it lists the loaded YAML source.
  5. Mark the diff: the only artifact you needed to keep was one text file in Git.
- **win**: Player identifies that the JCasC controller fully self-restored from `jenkins.yaml` while the snowflake did not, and names the three wins of JCasC: reproducible, reviewable, disaster-recoverable.
- **jenkins_concepts**: Configuration as Code plugin (`configuration-as-code`), `CASC_JENKINS_CONFIG`, the Manage Jenkins → Configuration as Code screen.
```yaml
# jenkins.yaml — the entire controller config as text
jenkins:
  systemMessage: "Managed by JCasC — do not edit via the UI"
  numExecutors: 2
```
```bash
# Point a fresh controller at the config; it applies on boot
export CASC_JENKINS_CONFIG=/var/jenkins_home/casc_configs/jenkins.yaml
```
- **builds_on**: install-manage-plugins

### Level 16.2 — JCasC Basics
- **id**: jcasc-basics
- **scope**: Write a `jenkins.yaml` (jenkins/security/tool/unclassified roots) and apply it.
- **difficulty**: 4
- **teach**: A JCasC file is organized under a few top-level roots: `jenkins:` for core controller settings (system message, executors, security realm, authorization), `security:` for hardening toggles, `tool:` for tool installers, and `unclassified:` for everything plugins contribute (e.g. the Jenkins location URL). The plugin finds the file via the `CASC_JENKINS_CONFIG` environment variable, which can point at a file, a directory of `.yaml` files, or a URL. You don't have to restart to apply changes — Manage Jenkins → Configuration as Code has a **Reload existing configuration** button, and **View Configuration** shows what's currently loaded. Keys map directly to Jenkins' internal model, so `numExecutors: 2` sets the controller's executor count exactly as the UI slider would.
- **scenario**: You've been told to codify the bare-minimum controller config: a banner warning people not to click, two executors, the built-in user database with one admin, and a correct Jenkins URL so emails link properly. No clicking allowed — it all goes in YAML.
- **actions**:
  1. Create `jenkins.yaml` and add the `jenkins:` root with `systemMessage` and `numExecutors: 2`.
  2. Under `jenkins:`, configure `securityRealm` as the local user database with one admin user, and set `authorizationStrategy` to logged-in-users-can-do-anything for now (security realm and authorization were taught in Chapter 14).
  3. Add the `unclassified:` root with `location.url` so build links resolve.
  4. Set `CASC_JENKINS_CONFIG` to the file path and (re)start the controller.
  5. Open Manage Jenkins → Configuration as Code and click **Reload existing configuration**; confirm no errors and that **View Configuration** echoes your YAML.
  6. Verify the banner and executor count appear on the dashboard.
- **win**: The controller boots with the system message visible, exactly 2 executors, a working admin login, and the Configuration as Code screen reports the YAML applied with zero errors.
- **jenkins_concepts**: `jenkins`/`security`/`tool`/`unclassified` roots, `securityRealm`, `authorizationStrategy`, `CASC_JENKINS_CONFIG`, Reload existing configuration.
```yaml
jenkins:
  systemMessage: "Managed by JCasC — do not edit via the UI"
  numExecutors: 2
  securityRealm:
    local:
      allowsSignup: false
      users:
        - id: "admin"
          password: "${ADMIN_PASSWORD}"   # injected from env, never hardcoded
  authorizationStrategy:
    loggedInUsersCanDoAnything:
      allowAnonymousRead: false
unclassified:
  location:
    url: "https://jenkins.example.com/"
    adminAddress: "ci@example.com"
```
- **builds_on**: why-jcasc, security-realm

### Level 16.3 — Credentials & Jobs as Code
- **id**: jcasc-credentials-and-jobs
- **scope**: Seed credentials, tools, and jobs (Job DSL) entirely from code.
- **difficulty**: 5
- **teach**: JCasC can seed more than system settings: under `credentials:` you declare `system: domainCredentials` (username/password, secret text, SSH keys — the types from Chapter 7), under `tool:` you register installers like Maven and JDK, and under `jobs:` you embed Job DSL scripts that create jobs on boot (Job DSL needs the `job-dsl` plugin alongside JCasC). Secrets must never be literals in the YAML — JCasC resolves `${VAR}` from environment variables (or a secrets backend like Vault), so the file stays safe to commit. The `jobs:` root accepts inline Job DSL via `- script: >`, which lets a fresh controller materialize its pipelines automatically. This is how a brand-new Jenkins comes up already wired with credentials, build tools, and jobs — no manual setup.
- **scenario**: The rebuilt controller from 17.2 boots with no credentials, no Maven, and no jobs. Developers can't run anything. You must seed a GitHub token credential, register a Maven install, and have a `build-app` pipeline job appear automatically — all from the same YAML, with the token pulled from an env var so nothing secret is committed.
- **actions**:
  1. Add a `credentials:` block with `system → domainCredentials → credentials`, defining a `usernamePassword` whose password is `${GITHUB_TOKEN}`.
  2. Export `GITHUB_TOKEN` in the controller's environment so JCasC can resolve it at load time.
  3. Add a `tool:` block registering a Maven installation named `maven-3` via the automatic installer.
  4. Add a `jobs:` block with an inline `- script:` Job DSL snippet that defines a `pipelineJob('build-app')`.
  5. Reload configuration, then confirm the credential appears in the store (value masked), Maven shows in Global Tool Configuration, and the `build-app` job exists on the dashboard.
- **win**: After reload, the dashboard shows the `build-app` job, Manage Credentials lists the GitHub credential with its secret masked, Global Tool Configuration shows `maven-3`, and the GitHub token never appears as plaintext in the committed YAML.
- **jenkins_concepts**: `credentials: system: domainCredentials`, `usernamePassword`, `${VAR}` secret resolution, `tool:` installers, `jobs: - script:` (Job DSL), `pipelineJob`.
```yaml
credentials:
  system:
    domainCredentials:
      - credentials:
          - usernamePassword:
              scope: GLOBAL
              id: "github-token"
              username: "ci-bot"
              password: "${GITHUB_TOKEN}"   # resolved from env at load time
tool:
  maven:
    installations:
      - name: "maven-3"
        properties:
          - installSource:
              installers:
                - maven:
                    id: "3.9.6"
jobs:
  - script: >
      pipelineJob('build-app') {
        definition {
          cps {
            script("pipeline { agent any; stages { stage('Build') { steps { echo 'built' } } } }")
            sandbox(true)
          }
        }
      }
```
- **builds_on**: jcasc-basics, credential-types

### Level 16.4 — Backup & Disaster Recovery
- **id**: backup-and-disaster-recovery
- **scope**: Back up `JENKINS_HOME`, restore it, and plan safe upgrades.
- **difficulty**: 4
- **teach**: Even with JCasC, not everything regenerates: build history, fingerprints, and the encrypted `secrets/` directory live in `JENKINS_HOME` and must be backed up. A good backup captures `config.xml`, the `jobs/` tree, `secrets/`, and the installed plugin list (`plugins/*.jpi`) — the ThinBackup plugin automates this on a schedule. Upgrades are risky, so you pin a specific **LTS** line, snapshot `JENKINS_HOME` before upgrading, and keep the rollback plan: restore the snapshot and downgrade the WAR. Critically, a backup you've never restored is a hope, not a plan — you test recovery on a throwaway controller.
- **scenario**: An upgrade to the latest weekly release just bricked the controller — a plugin is incompatible and Jenkins won't boot. Good news: ThinBackup ran last night. You must restore the controller to its pre-upgrade state, then redo the upgrade the safe way by pinning LTS and testing first.
- **actions**:
  1. Locate last night's ThinBackup archive and inspect it — confirm it contains `config.xml`, `jobs/`, `secrets/`, and the plugin list.
  2. Stop the broken controller and restore `JENKINS_HOME` from the backup (copy files back / use ThinBackup's restore).
  3. Pin the WAR to the current **LTS** version instead of the bleeding-edge weekly, then boot — the controller comes back healthy.
  4. Validate on a throwaway controller before touching prod again: restore the same backup there and confirm jobs and credentials load.
  5. Write the one-line rollback plan: "restore last snapshot + redeploy previous LTS WAR."
- **win**: The controller boots cleanly from the restored backup with all jobs, build history, and credentials intact, runs a pinned LTS version, and the player has demonstrated a tested restore (not just a backup that exists).
- **jenkins_concepts**: `JENKINS_HOME` layout (`config.xml`, `jobs/`, `secrets/`, `plugins/`), ThinBackup, LTS pinning, tested restore, rollback plan.
```bash
# What a backup must capture inside JENKINS_HOME
JENKINS_HOME/
├── config.xml          # global config
├── jobs/               # per-job config + build history
├── secrets/            # encryption keys — required to decrypt credentials!
└── plugins/            # installed *.jpi (or back up the plugin list)

# Cold backup of a stopped controller
tar czf jenkins-backup-$(date +%F).tgz -C /var/jenkins_home .

# Pin to a known-good LTS line instead of the latest weekly
docker run -d -p 8080:8080 jenkins/jenkins:2.452.3-lts
```
- **builds_on**: jcasc-basics

### Level 16.5 — Scaling Jenkins
- **id**: scaling-jenkins
- **scope**: Plan controller sizing, agent fleets, HA, and Kubernetes-based scaling.
- **difficulty**: 5
- **teach**: A controller should orchestrate, not build — keep builds off it (the 0-executors rule from Chapter 9) and size its JVM heap to the number of jobs and the build-history it holds, typically a few GB of `-Xmx` for a busy controller. You scale *out* by adding agents, ideally **ephemeral** ones from a Kubernetes or Docker cloud (Chapter 9's cloud agents) that spin up per build and disappear, so capacity tracks demand instead of sitting idle. A single controller has a ceiling: the standard Jenkins controller is **not highly available** (no active-active HA), so very large orgs split work across multiple controllers — one per team — managed centrally (e.g. CloudBees Operations Center). The plan: lean controller, ephemeral fleet, and more controllers — not a bigger single one — when you outgrow it.
- **scenario**: The platform team's single controller is melting: the queue backs up every morning, the JVM is OOM-ing under build load, and one team's runaway job starves everyone. You're asked to draft a scaling plan rather than just throwing RAM at it.
- **actions**:
  1. Diagnose: confirm builds are running *on the controller* and move them onto agents so the controller only schedules.
  2. Right-size the controller JVM heap (`-Xmx`) for its job count and set a build-retention policy so history stops bloating memory.
  3. Replace static agents with an **ephemeral** Kubernetes cloud so pods are provisioned per build and torn down after — capacity now scales with the queue.
  4. Address the noisy-neighbor team: recognize that one controller can't isolate or HA them, and split that team onto its own controller under a central operations layer.
  5. Document the limits: no active-active HA on a single controller; scale by adding controllers, not by making one giant.
- **win**: The plan keeps the controller build-free with a sized heap and retention policy, uses an ephemeral agent cloud that scales to zero when idle, isolates the noisy team onto a second controller, and explicitly notes that the standard controller has no active-active HA.
- **jenkins_concepts**: controller heap (`-Xmx`), build-free controller, ephemeral Kubernetes/Docker cloud agents, per-team controllers / operations center, no active-active HA.
```yaml
# JCasC: a Kubernetes cloud that provisions ephemeral agents per build
jenkins:
  numExecutors: 0          # controller schedules, never builds
  clouds:
    - kubernetes:
        name: "k8s"
        containerCapStr: "50"     # cap concurrent ephemeral pods
        templates:
          - name: "jnlp-agent"
            label: "k8s-agent"
            containers:
              - name: "jnlp"
                image: "jenkins/inbound-agent:latest"
```
```bash
# Size the controller heap; keep it lean, never build on it
JAVA_OPTS="-Xms2g -Xmx4g"
```
- **builds_on**: cloud-agents, why-agents

### Level 16.6 — Jenkins as Code (GitOps)
- **id**: jenkins-as-code-pipeline
- **scope**: Manage the JCasC config itself through a pipeline so config changes are reviewed and deployed.
- **difficulty**: 5
- **teach**: The final step is treating `jenkins.yaml` like application code: it lives in a Git repo, every change goes through a pull request, and a pipeline validates and applies it — GitOps for your CI server. The JCasC plugin exposes REST endpoints for this: `POST /configuration-as-code/checkNewSource` lints a proposed YAML against the schema, `POST /configuration-as-code/reload` applies it from disk, and `GET /configuration-as-code/export` dumps the live config. A pipeline can hit `checkNewSource` to fail fast before anything touches prod. After merge, the pipeline calls `reload` to apply the new config; **drift detection** then diffs the live `export` against the YAML in Git and fails if someone clicked something by hand. The result: the controller's configuration is reviewed, tested, and version-controlled exactly like any other deployment — UI edits become drift to be caught and reverted.
- **scenario**: Someone keeps "quickly fixing" things in the Jenkins UI, and config silently diverges from the repo. You're tasked with closing the loop: make `jenkins.yaml` flow through PR review and a pipeline that validates, applies, and detects drift so manual clicks can't survive.
- **actions**:
  1. Move `jenkins.yaml` into a Git repo and protect `main` so changes require a reviewed PR (the SCM + PR workflow from Chapter 5), with the pipeline loaded from SCM (Pipeline script from SCM, Chapter 3).
  2. Write a Jenkinsfile whose **Validate** stage POSTs the proposed YAML to `checkNewSource` and fails on any schema error.
  3. Add an **Apply** stage that, on merge to `main`, POSTs to `/configuration-as-code/reload` so the controller re-reads the new YAML.
  4. Add a **Drift** stage that exports the live config and diffs it against the repo's `jenkins.yaml`; fail the build if they differ.
  5. Prove it: make a sneaky UI change to the system message, run the pipeline, and watch the drift stage go red — then re-apply from Git to heal it.
- **win**: A config change merged via PR is validated, applied, and reflected on the controller; an out-of-band UI edit makes the drift stage fail; re-applying from Git restores the repo state — `jenkins.yaml` in Git is the single source of truth.
- **jenkins_concepts**: JCasC in Git, PR review, `checkNewSource`/`reload`/`export` REST endpoints, config drift detection, GitOps single source of truth.
```groovy
pipeline {
  agent { label 'k8s-agent' }
  environment {
    CLI = credentials('jenkins-admin-token')   // user:apiToken, bound for curl -u
  }
  stages {
    stage('Validate') {
      steps {
        // Lint the YAML against the JCasC schema before applying
        sh '''
          curl -sf -u "$CLI" -X POST \
            --data-binary @jenkins.yaml \
            "$JENKINS_URL/configuration-as-code/checkNewSource"
        '''
      }
    }
    stage('Apply') {
      when { branch 'main' }
      steps {
        // Tell the controller to re-read jenkins.yaml from disk
        sh 'curl -sf -u "$CLI" -X POST "$JENKINS_URL/configuration-as-code/reload"'
      }
    }
    stage('Drift') {
      steps {
        // Export live config and diff against the repo source of truth
        sh '''
          curl -sf -u "$CLI" "$JENKINS_URL/configuration-as-code/export" > live.yaml
          diff -u jenkins.yaml live.yaml
        '''
      }
    }
  }
}
```
- **builds_on**: jcasc-credentials-and-jobs, pipeline-from-scm

---

## Chapter 17 — Pipeline as Code Best Practices & Capstone
_Theme: put it all together, the right way_

**Learning objectives**
- Apply Jenkinsfile best practices: declarative-first, fail fast, idempotent stages, thin steps.
- Identify and refactor the anti-patterns that wreck pipelines and Jenkins controllers.
- Lint Jenkinsfiles and unit-test shared libraries before they reach production.
- Assemble a complete multibranch CI/CD pipeline that exercises the whole campaign in one Jenkinsfile.
- Harden that pipeline for production with agents, scoped credentials, RBAC, JCasC, and monitoring.

**Prerequisites:** All prior chapters

**Levels**

### Level 17.1 — Jenkinsfile Best Practices
- **id**: jenkinsfile-best-practices
- **scope**: Refactor a messy pipeline to be declarative-first, fail fast, idempotent, and thin-stepped.
- **difficulty**: 4
- **teach**: A good Jenkinsfile reads like a description of the build, not a program: prefer declarative `pipeline {}` and reserve `script {}` for small islands of Groovy. "Fail fast" means stages stop the moment something is wrong (a non-zero `sh` exit fails the stage automatically — Chapter 3) rather than soldiering on. "Idempotent" means re-running the pipeline produces the same result — clean the workspace and use `mkdir -p`/`rm -rf` so a leftover file from a previous run never changes the outcome. Keep steps thin: shell does the work, the pipeline only orchestrates, and shared logic lives in a library (Chapter 13) instead of being copy-pasted.
- **scenario**: You inherit "the legacy Jenkinsfile" — a single stage with a 60-line `script {}` block that flakes every other run because it appends to a file that already exists. The team lead asks you to make it boring and reliable before the audit.
- **actions**:
  1. Split the monolithic `script {}` stage into named declarative stages: Build, Test, Package.
  2. Make the workspace idempotent: clean the output dirs at the start so a re-run can't see stale files.
  3. Remove a `set +e`/manual exit-code check and let a plain `sh` fail the stage naturally (fail fast).
  4. Move a 20-line "compute version string" Groovy blob into a shared-library step `versionFromGit()` and call it.
  5. Re-run the build twice and confirm both runs are green and produce identical output.
- **win**: No stage contains more than ~5 lines of `script {}`; a clean checkout and a dirty re-run both succeed with the same artifact name; the legacy manual exit-code handling is gone.
- **jenkins_concepts**: declarative-first, fail-fast, idempotency, thin steps, shared library extraction.
```groovy
pipeline {
  agent any
  options { timestamps() }
  stages {
    stage('Build') {
      steps {
        sh '''
          set -euo pipefail                  # fail fast on any error
          rm -rf build dist                  # idempotent: wipe prior outputs
          mkdir -p build dist                # always start from a clean tree
          ./gradlew clean assemble
        '''
      }
    }
    stage('Package') {
      steps {
        script { env.VERSION = versionFromGit() }   // thin: real logic in the library
        // single quotes -> ${VERSION} resolves from the build environment, not Groovy
        sh 'cp build/libs/app.jar dist/app-${VERSION}.jar'
      }
    }
  }
}
```
- **builds_on**: post-conditions, global-var-step

### Level 17.2 — Anti-Patterns to Avoid
- **id**: anti-patterns
- **scope**: Spot and fix the four classic Jenkins anti-patterns: fat script blocks, plaintext secrets, building on the controller, and config drift.
- **difficulty**: 4
- **teach**: Most broken Jenkins setups share the same handful of sins. Logic-heavy `script {}` walls turn a pipeline into an untestable Groovy program. Secrets pasted as plaintext (`PASSWORD = 'hunter2'`) leak into logs and SCM — use the credentials store and the `credentials()` helper (Chapter 4) or `withCredentials` (Chapter 7) so they're masked. Running real builds on the controller (`agent any` when only the controller has executors) starves it of CPU and gives build code access to Jenkins internals — push work onto agents (Chapter 9). And "snowflake" config clicked into the UI by hand drifts away from anything reviewable, so the same Jenkins can never be rebuilt — code it (JCasC, Chapter 16).
- **scenario**: A security reviewer hands you a Jenkinsfile flagged with four red comments. Your job is to clear every comment without changing what the pipeline actually deploys.
- **actions**:
  1. Find the plaintext `DB_PASSWORD = 'S3cr3t!'` in the `environment {}` block and replace it with a `credentials('db-password')` binding.
  2. Replace `agent any` with `agent { label 'linux-docker' }` so the build runs off the controller.
  3. Collapse a 40-line `script {}` deployment wall into a single `deployTo('staging')` library step.
  4. Add a `buildDiscarder` option so logs don't fill the disk (the "no retention" anti-pattern).
  5. Note in the level log which UI-only setting should instead live in JCasC.
- **win**: No literal secret remains in the file; the build targets a labeled agent, not the controller; the deployment script wall is gone; `logRotator` retention is configured; the secret no longer appears in console output (it shows as `****`).
- **jenkins_concepts**: secret masking, fat-controller anti-pattern, config drift, build retention.
```groovy
pipeline {
  agent { label 'linux-docker' }                              // not the controller
  options { buildDiscarder(logRotator(numToKeepStr: '20')) }  // bounded retention
  environment {
    // BAD:  DB_PASSWORD = 'S3cr3t!'
    DB_PASSWORD = credentials('db-password')  // secret-text cred, masked **** in logs
  }
  stages {
    stage('Deploy') {
      steps { deployTo('staging') }           // thin step, logic in the library
    }
  }
}
```
- **builds_on**: secret-masking, why-agents

### Level 17.3 — Testing & Linting Pipelines
- **id**: testing-pipelines
- **scope**: Lint a Jenkinsfile with the declarative linter and unit-test a shared-library step before it ships.
- **difficulty**: 5
- **teach**: Your CI deserves its own CI. Before a Jenkinsfile ever runs, the declarative linter catches structural errors (a misplaced directive, an unknown section) without queuing a build — run it over the CLI or POST it to the `/pipeline-model-converter/validate` endpoint. While iterating on a running job, **Replay** lets you edit the script in the UI and re-run without committing (you'll use Replay again for debugging in Chapter 15). Shared libraries are real code, so test them with **JenkinsPipelineUnit**, a test framework that mocks pipeline steps (`sh`, `echo`) so a JUnit test can assert that your `versionFromGit()` step calls the right commands. Wire all three into a pipeline that validates pipeline changes — CI for your CI.
- **scenario**: You're about to tag v2 of the team's shared library. A teammate's "tiny" change broke every downstream repo last quarter, so this time nothing merges until the linter is clean and the library's unit tests pass.
- **actions**:
  1. Run the declarative linter against the Jenkinsfile via the Jenkins CLI and read the validation output.
  2. Fix the reported error (a `post` block placed inside `steps` instead of after `stages`).
  3. Open a JenkinsPipelineUnit test for `versionFromGit()` and assert it runs `git describe --tags`.
  4. Run the library test suite with Gradle/Maven and watch it go green.
  5. Add a pipeline stage that runs the linter on every push so bad Jenkinsfiles are caught in CI.
- **win**: `declarative-linter` reports "Jenkinsfile successfully validated"; the JenkinsPipelineUnit test passes and asserts the expected `sh` call; the validation stage is part of the pipeline.
- **jenkins_concepts**: declarative linter, Replay, JenkinsPipelineUnit, testing shared libraries.
```bash
# Lint without running a build (needs a reachable Jenkins + the CLI over SSH)
ssh -p 50022 user@jenkins declarative-linter < Jenkinsfile
# ...or over HTTP with a crumb-exempt endpoint:
curl -s -X POST -F "jenkinsfile=<Jenkinsfile" \
  https://jenkins.example.com/pipeline-model-converter/validate
```
```groovy
// test/VersionStepTest.groovy — JenkinsPipelineUnit
class VersionStepTest extends BasePipelineTest {
  @Override @Before void setUp() { super.setUp() }

  @Test void usesGitDescribe() {
    def calls = []
    // mock sh(returnStdout: true) so call() can capture the command and get a fake version
    helper.registerAllowedMethod('sh', [Map]) { Map m -> calls << m.script; '1.4.2' }
    def step = loadScript('vars/versionFromGit.groovy')
    step.call()
    assert calls.any { it.contains('git describe --tags') }
  }
}
```
- **builds_on**: versioning-libraries

### Level 17.4 — Capstone: Full CI/CD Pipeline
- **id**: capstone-full-pipeline
- **scope**: Assemble one multibranch Jenkinsfile that checks out, builds, runs parallel tests plus a quality gate, archives artifacts, and deploys behind a manual approval.
- **difficulty**: 5
- **teach**: This is the whole campaign in a single file. A multibranch pipeline (Chapter 5) auto-creates a job per branch from the `Jenkinsfile`; inside it, you compose everything you've learned: `agent` selection (Chapter 9), `environment` and `credentials()` (Chapter 4), `parallel {}` test stages (Chapter 10), a SonarQube `waitForQualityGate` (11.4), `archiveArtifacts` (7.3), a `when { branch 'main' }` guard (5.4), an `input` approval gate (5.7 / 12.3), and `post {}` notifications (Chapter 8). Each piece is something you've already done; the skill now is wiring them into one coherent flow where a green main branch ends with a human approving a production deploy.
- **scenario**: The campaign's final boss: ship `payments-service` end to end. Push to a feature branch and only build+test should run; push to `main` and the full path lights up — build, parallel tests, quality gate, artifact, then a deploy that waits for your approval.
- **actions**:
  1. Create a multibranch pipeline pointed at the repo so each branch gets its own job from the `Jenkinsfile`.
  2. Write the checkout + build stages, injecting a registry credential via `credentials()`.
  3. Add a `parallel {}` block running unit tests and integration tests as separate branches, publishing JUnit results.
  4. Add a SonarQube stage that blocks on `waitForQualityGate`, then `archiveArtifacts` the built jar with `fingerprint: true`.
  5. Guard the deploy stage with `when { branch 'main' }` and an `input` approval, and add `post {}` success/failure notifications.
- **win**: A feature-branch build runs only build+test and goes blue; a `main` build runs every stage, pauses at the approval input, and on approval completes a deploy; JUnit results and the fingerprinted artifact appear on the build page; a failing quality gate fails the build.
- **jenkins_concepts**: multibranch pipeline, parallel stages, quality gate, archiveArtifacts, when, input, post.
```groovy
pipeline {
  agent { label 'linux-docker' }
  options { timestamps(); buildDiscarder(logRotator(numToKeepStr: '30')) }
  environment { REGISTRY = credentials('registry-creds') }   // username/password cred
  stages {
    stage('Build') { steps { sh 'make build' } }
    stage('Tests') {
      parallel {
        stage('Unit')        { steps { sh 'make test-unit' }
                               post { always { junit 'reports/unit/*.xml' } } }
        stage('Integration') { steps { sh 'make test-int' }
                               post { always { junit 'reports/int/*.xml' } } }
      }
    }
    stage('Quality Gate') {
      steps {
        withSonarQubeEnv('sonar') { sh 'sonar-scanner' }
        timeout(time: 10, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
    stage('Archive') {
      steps { archiveArtifacts artifacts: 'dist/*.jar', fingerprint: true }
    }
    stage('Deploy') {
      when { branch 'main' }
      steps {
        input message: 'Deploy to production?', submitter: 'release-team'
        sh 'make deploy ENV=prod'
      }
    }
  }
  post {
    success { slackSend channel: '#ci', color: 'good',
                        message: "OK ${env.JOB_NAME} #${env.BUILD_NUMBER}" }
    failure { slackSend channel: '#ci', color: 'danger',
                        message: "FAIL ${env.JOB_NAME} #${env.BUILD_NUMBER}" }
  }
}
```
- **builds_on**: multibranch-pipeline, quality-gate-sonarqube, manual-approval-gate, archive-artifacts

### Level 17.5 — Capstone: Production Hardening
- **id**: capstone-production-hardening
- **scope**: Harden the capstone pipeline with disposable agents, folder-scoped credentials and roles, JCasC, and monitoring with rollback.
- **difficulty**: 5
- **teach**: A pipeline that works on your laptop isn't production-ready. Hardening means: builds run on disposable Docker/cloud agents (Chapter 9), not the controller; credentials are folder-scoped (15.3) so only the `payments` team's jobs can read them, and role-based authorization (15.2) restricts who can approve a prod deploy; the entire setup — security realm, agents, credentials, the seed job — is declared in JCasC (Chapter 16) so the Jenkins can be rebuilt from YAML; and the deploy is observable, emitting notifications and exposing metrics (16.5) with a `post { failure }` that rolls back. The point is that the green pipeline from 18.4 survives a node dying, a leaked password, and a bad deploy.
- **scenario**: Security signs off on the capstone only if it can be rebuilt from scratch and a failed prod deploy heals itself. You harden `payments-service` until "delete Jenkins and restore from YAML" is a non-event.
- **actions**:
  1. Switch the pipeline to a `docker` agent so each build runs in a fresh, disposable container.
  2. Move `registry-creds` and `db-password` into the `payments` folder scope and restrict prod-deploy approval to a `release` role via role-based authorization.
  3. Capture the security realm, the Docker cloud, the folder, and its credentials in a `jenkins.yaml` JCasC file.
  4. Add a smoke test after deploy and a `post { failure }` rollback that redeploys the previous version.
  5. Add deploy-status notifications and confirm Jenkins health metrics are exposed for scraping.
- **win**: Builds run in throwaway containers (no work on the controller); credentials are invisible to jobs outside the `payments` folder and only `release`-role users can approve prod; applying `jenkins.yaml` reproduces the realm, cloud, folder, and credentials; a deliberately failing smoke test triggers an automatic rollback and a failure notification; the metrics endpoint returns data.
- **jenkins_concepts**: docker/cloud agents, folder-scoped credentials, role-based authorization, JCasC, monitoring, rollback.
```groovy
pipeline {
  agent { docker { image 'maven:3.9-eclipse-temurin-21'; label 'cloud' } }
  stages {
    stage('Deploy') {
      when { branch 'main' }
      steps {
        input message: 'Deploy to prod?', submitter: 'release'   // role-gated approver
        sh 'make deploy ENV=prod'
        sh 'make smoke  ENV=prod'        // verify before trusting the deploy
      }
    }
  }
  post {
    failure {
      sh 'make rollback ENV=prod'        // redeploy the previous known-good version
      slackSend channel: '#ci', color: 'danger',
                message: "Rolled back ${env.JOB_NAME} #${env.BUILD_NUMBER}"
    }
  }
}
```
```yaml
# jenkins.yaml — rebuild the whole setup from code (JCasC)
jenkins:
  authorizationStrategy:
    roleBased:                          # Role-based Authorization Strategy plugin
      roles:
        global:
          - name: "release"
            permissions:
              - "Job/Build"
              - "Job/Read"
            assignments:
              - "alice"
              - "bob"
credentials:
  system:
    domainCredentials:
      - credentials:
          - usernamePassword:
              scope: GLOBAL
              id: "registry-creds"
              username: "ci"
              password: "${REGISTRY_PW}"   # injected from env, never hardcoded
```
- **builds_on**: capstone-full-pipeline, authorization-strategies, jcasc-basics, system-logs-and-metrics

