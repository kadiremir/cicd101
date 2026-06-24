/* ============================================================
   Chapter 2 — Reliable Builds
   ------------------------------------------------------------
   Self-registers into window.CHAPTERS via registerChapter().
   See campaign-data.js for the CHAPTER / LEVEL shape reference.
   ============================================================ */
registerChapter({
  id: 2,
  title: "Reliable Builds",
  summary: "Assemble a full pipeline from scratch and make it survive bad commits.",
  accent: "green",
  levels: [],   // empty → shows as “Coming soon”; restore by renaming _levels → levels below
  _levels: [
    {
      title:'The Full Pipeline',
      teach:"Time to build all three core stages yourself. A real pipeline <b>checks out</b>, <b>builds</b>, then <b>tests</b> — in that order. Add each one and reach a green build.",
      goals:[{id:'has-checkout',txt:'Add a Checkout stage'},{id:'has-build',txt:'Add a Build stage'},{id:'has-test',txt:'Add a Test stage'},{id:'passed',txt:'Run the full pipeline green'}],
      preset:[], locked:false, palette:['checkout','build','test'],
      hint:"Order matters: Checkout → Build → Test. Add all three, then Run Build.",
      learned:"Checkout, Build and Test are the backbone of almost every pipeline. Order them so each stage has what the next one needs."
    },
    {
      title:'Guard the Main Branch',
      teach:"This pipeline is already wired up — but a bad commit just landed. Run it, watch <b>Test catch the regression</b>, then fix the code and ship green.",
      goals:[{id:'saw-fail',txt:'Run once and watch Test fail on the regression'},{id:'passed',txt:'Fix the bug and run a green build'}],
      preset:['checkout','build','test'], locked:true, palette:[], bug:true,
      hint:"Run first — Test goes red. Then turn “Bug in code” off and run again.",
      learned:"Tests are a <b>gate</b>. With Test in the pipeline, a regression can never reach the end — it's stopped the moment it's introduced."
    },
    {
      title:'Order of Operations',
      teach:"Same full pipeline, but the Build stage's <b>steps are scrambled</b>. Dependencies must be installed before the build runs. Fix the order to get back to green.",
      goals:[{id:'order',txt:'Put the Build steps in the right order'},{id:'passed',txt:'Run a green build'}],
      preset:['checkout','build','test'], locked:true, palette:[],
      steps:{stage:'build', correct:["sh 'npm install'","sh 'npm run build'"], initial:["sh 'npm run build'","sh 'npm install'"]},
      hint:"`npm install` has to come first — you can't build against packages that aren't there yet.",
      learned:"A green pipeline isn't just the right stages — it's the right <b>steps in the right order</b> inside them."
    },
    {
      title:'Ship & Keep',
      teach:"Your reliable pipeline earns its keep. Turn on <b>artifact archiving</b> so every successful build is stored in the vault — ready to deploy.",
      goals:[{id:'archive',txt:'Turn on “Archive artifact on success”'},{id:'passed',txt:'Run green and store the artifact'}],
      preset:['checkout','build','test'], locked:true, palette:[], archive:true,
      hint:"Flip on “Archive artifact”, then run. The artifact drops into the vault on success.",
      learned:"Archiving on success gives you a <b>trail of deployable builds</b> — the bridge between CI (testing) and CD (shipping)."
    },
  ]
});
