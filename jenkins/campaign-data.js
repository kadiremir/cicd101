/* ============================================================
   JENKINS101 — Campaign core
   ------------------------------------------------------------
   This file defines the shared stage palette (STAGE_DEF) and the
   chapter registry. The chapters themselves live one-per-file in
   the chapters/ folder and self-register via registerChapter().

   ── FILE LAYOUT ──────────────────────────────────────────────
     campaign-data.js                  ← you are here (core + docs)
     chapters/chapter-1-pipeline-basics.js   (the live Chapter 1)
     chapters/chapter-2-reliable-builds.js
     chapters/chapter-3-deploy-beyond.js

   campaign.html and index.html load the SAME <script> set (pipeline-basics as
   Chapter 1); keep the two lists identical so the landing-page stats never drift.

   Load order in campaign.html / index.html:
     1. campaign-data.js     (defines STAGE_DEF + registerChapter)
     2. chapters/*.js        (each calls registerChapter)
     3. the page's own script (reads window.CHAPTERS)

   ── ADD A CHAPTER ────────────────────────────────────────────
     1. Create chapters/chapter-<n>-<slug>.js
     2. Call registerChapter({ ... }) inside it (template below)
     3. Add one <script src="chapters/chapter-<n>-<slug>.js"></script>
        line to campaign.html AND index.html (after campaign-data.js)
   Chapters render in id order regardless of script order.

   ── CHAPTER shape ────────────────────────────────────────────
     {
       id:      2,                 // shown as "CH 2"; keep unique
       title:   "Reliable Builds",
       summary: "One line shown on the chapter map.",
       accent:  "green",          // amber | green | blue | red
       levels:  [ ...level objects... ]   // [] = "Coming soon"
     }

   ── LEVEL shape (id + eyebrow auto-generated as "<chapter>.<n>") ─
     {
       title:   "First Commit",
       teach:   "left-panel intro (HTML ok: <b> <i>)",
       goals:   [{id:'has-build', txt:'Add a Build stage'}, ...],
       preset:  ['checkout'],      // stages already on the board
       locked:  false,             // true = preset stages can't be removed
       palette: ['build','test'],  // stages the player may add ([] = none)
       hint:    "shown by the Hint button",
       learned: "shown in the 'what you learned' modal",

       // optional mechanics (mix & match):
       bug:    true,               // injects a failing Test stage
       steps:  { stage:'build',
                 correct:["sh 'npm install'","sh 'npm run build'"],
                 initial:["sh 'npm run build'","sh 'npm install'"] },
       archive:true                // enables the post{} archive-to-vault step
     }

   GOAL ids the engine knows how to check (see goalMet() in campaign.html):
     has-checkout · has-build · has-test · saw-fail · order · archive · passed

   NEW STAGE TYPES: add an entry to STAGE_DEF and it works immediately —
   it renders as a generic module on the canvas. (Add a custom draw* fn in
   campaign.html for bespoke art; optional.)

   ── COPY / PASTE: NEW CHAPTER FILE ───────────────────────────
     registerChapter({
       id: 4,
       title: "Chapter title",
       summary: "One line shown on the chapter map.",
       accent: "blue",                 // amber | green | blue | red
       levels: [
         {
           title:   "Level title",
           teach:   "Left-panel intro (HTML ok: <b> <i>).",
           goals:   [{id:'has-build', txt:'Add a Build stage'},
                     {id:'passed',    txt:'Run a green build'}],
           preset:  ['checkout'],       // stages already on the board
           locked:  false,              // true = preset stages can't be removed
           palette: ['build','test'],   // stages the player may add ([] = none)
           hint:    "Shown by the Hint button.",
           learned: "Shown in the 'what you learned' modal.",
           // optional: bug:true · archive:true · steps:{stage,correct,initial}
         },
       ]
     });

   Tip: open campaign.html with the browser console visible — an
   author-time validator warns about typos (unknown goal ids,
   stages missing from STAGE_DEF, duplicate chapter ids).
   ============================================================ */

window.STAGE_DEF = {
  checkout: { name:'Checkout', icon:'⤓',  step:"checkout scm",       sub:'pull the source code' },
  build:    { name:'Build',    icon:'🔨', step:"sh 'npm run build'", sub:'compile the app' },
  test:     { name:'Test',     icon:'🧪', step:"sh 'npm test'",      sub:'run the tests' },
};

/* Chapter registry ------------------------------------------------
   Each chapters/*.js file calls registerChapter(obj). Chapters are
   kept sorted by id, so the order of <script> tags doesn't matter. */
window.CHAPTERS = window.CHAPTERS || [];
window.registerChapter = function(chapter){
  if(typeof chapter !== 'object' || chapter === null){
    console.warn('[campaign] registerChapter() needs a chapter object'); return;
  }
  const existing = window.CHAPTERS.findIndex(c => c.id === chapter.id);
  if(existing !== -1){
    console.warn('[campaign] duplicate chapter id '+chapter.id+' — replacing the earlier one');
    window.CHAPTERS.splice(existing, 1);
  }
  window.CHAPTERS.push(chapter);
  window.CHAPTERS.sort((a,b) => a.id - b.id);
};
