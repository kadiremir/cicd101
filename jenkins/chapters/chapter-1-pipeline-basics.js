/* ============================================================
   Chapter 1 — Pipeline Basics
   ------------------------------------------------------------
   Self-registers into window.CHAPTERS via registerChapter().
   See campaign-data.js for the CHAPTER / LEVEL shape reference.
   ============================================================ */
registerChapter({
  id: 1,
  title: "Pipeline Basics",
  summary: "Stages, steps, failures and artifacts — build a real pipeline and learn what keeps it green.",
  accent: "amber",
  levels: [
    {
      title:'First Commit',
      teach:"A Jenkins pipeline is just <b>stages run in order</b>. A commit comes in, flows stage to stage, and a green build comes out. Let's make the simplest one that exists.",
      // Opening popup shown the moment the level loads — teaches the core idea,
      // then the board stays light and the goals guide each click.
      brief: {
        emoji: '🚀',
        mission: 'build the simplest pipeline that exists — a commit in, a green build out.',
        lead: "A Jenkins pipeline is just <b>stages run in order</b>. A commit comes in, flows stage to stage, and a <b>green build</b> comes out.",
        cards: [
          { ico:'🧱', tone:'amber', title:'Stages are the assembly line',
            body:'Each <code>stage</code> is one step. The build moves through them <b>left to right</b>, one after another.' },
          { ico:'✅', tone:'green', title:'Green means every stage passed',
            body:'A pipeline is "done" only when the commit clears <b>all</b> its stages without failing.' },
        ],
        goalItems: [
          'Add a <b>Checkout</b> stage, then a <b>Build</b> stage after it.',
          'Run the pipeline and reach a <b>green build</b>.',
        ],
        cta: "Let's build it ▶",
      },
      goals:[{id:'has-checkout',txt:'Add a Checkout stage'},{id:'has-build',txt:'Add a Build stage after it'},{id:'passed',txt:'Run the pipeline and reach a green build'}],
      preset:[], locked:false, palette:['checkout','build'], requireOrder:['checkout','build'],
      hint:"Add Checkout, then Build, then press Run Build. The commit flows left to right.",
      learned:"A pipeline is an ordered list of <b>stages</b>. Each `stage` is a step on the assembly line; the build flows through them one after another."
    },
    {
      title:'Add a Test',
      teach:"Stages can <b>fail</b> — and when one does, everything after it stops. There's a bug in the code right now. Add a Test stage, watch it catch the bug, then fix it.",
      brief: {
        emoji: '🧪',
        mission: 'add a Test stage, watch it catch a bug, then ship a green build.',
        lead: "Stages don't just run — they can <b>fail</b>. When a stage goes red, <b>everything after it stops</b>. That fast feedback is the whole point of CI.",
        cards: [
          { ico:'🛑', tone:'red', title:'A red stage halts the pipeline',
            body:'If <b>Test</b> fails, no later stage runs. The build is marked failed and stops right there.' },
          { ico:'🔧', tone:'green', title:'Green only when the bug is gone',
            body:"There's a bug in the code right now. See Test catch it, flip <b>Bug in code</b> off, then run again." },
        ],
        goalItems: [
          'Add a <b>Test</b> stage and run it once — watch it <b>fail</b>.',
          'Turn the bug off, then run a <b>green build</b>.',
        ],
        cta: "Let's break it ▶",
      },
      goals:[{id:'has-test',txt:'Add a Test stage to the pipeline'},{id:'saw-fail',txt:'Run it once and watch the Test stage fail'},{id:'passed',txt:'Fix the bug, then run a green build'}],
      preset:['checkout','build'], locked:true, palette:['test'], bug:true,
      hint:"First add Test and run — it goes red because the bug is on. Then flip “Bug in code” off and run again.",
      learned:"A failed stage <b>halts the pipeline</b>; downstream stages are skipped. That fast feedback is the whole point of CI."
    },
    {
      title:'Steps Inside a Stage',
      teach:"A <b>stage</b> contains <b>steps</b> that run top to bottom. The Build stage must install dependencies <i>before</i> it builds. Put the two steps in the right order.",
      brief: {
        emoji: '🪜',
        mission: 'order the Build steps so dependencies install before the build runs.',
        lead: "Zoom in: a <b>stage</b> is made of <b>steps</b> that run <b>top to bottom</b>. A stage is the progress you see; steps are the commands inside it.",
        cards: [
          { ico:'⬇️', tone:'amber', title:'Steps run in sequence',
            body:'Inside <code>steps { … }</code> each line runs in order, one after the next — just like a script.' },
          { ico:'📦', tone:'blue', title:'Order matters',
            body:"You can't build before the packages exist. <code>npm install</code> has to come <b>before</b> <code>npm run build</code>." },
        ],
        goalItems: [
          'Reorder the Build steps: <b>install first</b>, then build.',
          'Run a <b>green build</b> with the correct order.',
        ],
        cta: "Let's order it ▶",
      },
      goals:[{id:'order',txt:'Order the Build steps: install first, then build'},{id:'passed',txt:'Run a green build with the correct order'}],
      preset:['checkout','build'], locked:true, palette:[],
      steps:{stage:'build', correct:["sh 'npm install'","sh 'npm run build'"], initial:["sh 'npm run build'","sh 'npm install'"]},
      hint:"You can't build before the packages exist. `npm install` must be first. Use the arrows to reorder.",
      learned:"Inside a `stage`, <b>steps run in sequence</b>. A stage is the unit of progress you see; steps are the commands inside it."
    },
    {
      title:'Keep the Artifact',
      teach:"A build produces something worth keeping. Use a <b>post</b> block to <b>archive the artifact</b> on success, so it's stored in the vault instead of thrown away.",
      brief: {
        emoji: '📦',
        mission: 'archive the build output on success so it lands in the vault.',
        lead: "A green build produces something worth keeping. The <b>post</b> block runs <b>after</b> the stages — the right place to save your artifact.",
        cards: [
          { ico:'🏁', tone:'amber', title:'post runs after the stages',
            body:'<code>post { … }</code> is the wrap-up step. Use <code>success { … }</code> so it <b>only</b> runs on a green build.' },
          { ico:'🗄️', tone:'green', title:'Archive it to the vault',
            body:'<code>archiveArtifacts</code> stores the output instead of throwing it away — so you can ship or roll back later.' },
        ],
        goalItems: [
          'Turn on <b>Archive artifact on success</b>.',
          'Run a <b>green build</b> and watch the artifact drop into the vault.',
        ],
        cta: "Let's keep it ▶",
      },
      goals:[{id:'archive',txt:'Turn on “Archive artifact on success”'},{id:'passed',txt:'Run a green build and store the artifact in the vault'}],
      preset:['checkout','build','test'], locked:true, palette:[], archive:true,
      hint:"Flip on “Archive artifact”. It adds post { success { archiveArtifacts … } }. Then run — the artifact drops into the vault.",
      learned:"The <b>post</b> section runs after the stages. `post { success { … } }` only runs on a green build — the right place to archive."
    },
    {
      title:'Clean Up Every Time',
      teach:"`post { success }` runs only on green. Its companion <b>post { always }</b> runs on <b>every</b> build — pass or fail — the place for notifications and cleanup. Watch it fire on a red build, then a green one.",
      brief: {
        emoji: '🔔',
        mission: 'add a post { always } block and watch it run on both a failed and a green build.',
        lead: "You met <code>post { success }</code> in the archive level. <b>post { always }</b> is its sibling: it runs <b>after every build, whatever the result</b> — perfect for alerts and cleanup.",
        cards: [
          { ico:'🔁', tone:'amber', title:'always means always',
            body:'<code>post { always { … } }</code> runs on green, red, and everything in between — so notifications never get skipped.' },
          { ico:'📣', tone:'blue', title:'See it on both outcomes',
            body:'Run with the bug on — the build fails but the notice still fires. Fix the bug and it fires again on green.' },
        ],
        goalItems: [
          'Turn on <b>Notify on every build</b>.',
          'Run once with the bug on — see it fire on a <b>failed</b> build.',
          'Fix the bug and run a <b>green build</b>.',
        ],
        cta: "Let's wire it up ▶",
      },
      goals:[{id:'notify',txt:'Turn on “Notify on every build”'},{id:'saw-fail',txt:'Run with the bug on and watch it fire on a failed build'},{id:'passed',txt:'Fix the bug and run a green build'}],
      preset:['checkout','build','test'], locked:true, palette:[], notify:true, bug:true,
      hint:"Flip on “Notify on every build”. Run once with the bug on — it still notifies. Then turn the bug off and run green.",
      learned:"`post { always { … } }` runs after <b>every</b> build, pass or fail. Use it for notifications and cleanup that must happen no matter the result."
    },
  ]
});
