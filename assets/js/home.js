'use strict';

const TRACKS = [
  { code: 'Jk', name: 'Jenkins', cat: 'PIPELINES · DECLARATIVE CI/CD', accent: '#F5A623',
    desc: 'Master Jenkins by building real pipelines — stages, failures, artifacts and deploys.',
    snippet: "stage('Build') { sh './gradlew build' }",
    tags: ['Pipelines', 'Stages', 'Agents', 'Artifacts'],
    status: 'live', href: 'jenkins/' },
  { code: 'GA', name: 'GitHub Actions', cat: 'WORKFLOWS · YAML CI/CD', accent: '#6EA8FE',
    desc: 'Workflow files, triggers, matrix builds and reusable actions — learned by running them.',
    snippet: 'on: [push]   jobs: { build: … }',
    tags: ['Workflows', 'Triggers', 'Matrix', 'Caching'],
    status: 'soon', progress: '35%', href: '#' },
  { code: 'K8', name: 'Kubernetes', cat: 'ORCHESTRATION · GITOPS', accent: '#B594FF',
    desc: 'Deploy, scale and self-heal workloads — from pods to rollouts — by running them live.',
    snippet: 'kubectl apply -f deploy.yaml',
    tags: ['Pods', 'Deploys', 'Services', 'Rollouts'],
    status: 'soon', progress: '20%', href: '#' },
  { code: '+', name: 'More tracks', cat: 'GITLAB · TERRAFORM · ARGOCD', accent: '#2DD4BF',
    desc: 'The rack keeps growing. Tell me which tool you want to learn by building next.',
    snippet: '# vote for what ships next',
    tags: ['GitLab CI', 'Terraform', 'ArgoCD'],
    status: 'soon', progress: '10%', href: 'mailto:kadiremir86@gmail.com', cta: 'Suggest a track' },
];

const HALO_RGB = ['245,166,35', '110,168,254', '181,148,255', '45,212,191'];

function computeTrack(p) {
  const live = p.status === 'live';
  const ac = p.accent;
  const tint = ac + '1f';
  const tintB = ac + '40';
  return Object.assign({}, p, {
    live, soon: !live,
    badge: live ? 'LIVE' : 'SOON',
    badgeInk: live ? '#3FB950' : '#7E879A',
    badgeBg: live ? 'rgba(63,185,80,.12)' : 'rgba(255,255,255,.05)',
    badgeBorder: live ? 'rgba(63,185,80,.35)' : 'rgba(255,255,255,.12)',
    cta: p.cta || (live ? 'Open training →' : 'Notify me'),
    ctaInk: live ? '#06121e' : ac,
    ctaBg: live ? ac : 'rgba(255,255,255,.03)',
    ctaBorder: live ? 'transparent' : (ac + '55'),
    ctaShadow: live ? '0 8px 20px -8px ' + ac : 'none',
    tint, tintB, ac,
  });
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildPosterHTML(p) {
  const tags = p.tags.map(t =>
    `<span style="font-size:11px;font-weight:500;color:#AEB6C4;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);padding:4px 9px;border-radius:7px;">${t}</span>`
  ).join('');

  const bottom = p.live ? `
    <div style="display:flex;align-items:stretch;gap:14px;border-top:1px solid rgba(255,255,255,.08);padding-top:13px;margin-top:14px;">
      <div style="flex:1;"><div style="font-family:'JetBrains Mono',monospace;font-size:17px;font-weight:700;color:${p.ac};">0</div><div style="font-size:9px;letter-spacing:.12em;color:#7E879A;margin-top:3px;">SETUP</div></div>
      <div style="flex:1;"><div style="font-family:'JetBrains Mono',monospace;font-size:17px;font-weight:700;color:${p.ac};">100%</div><div style="font-size:9px;letter-spacing:.12em;color:#7E879A;margin-top:3px;">HANDS-ON</div></div>
      <div style="flex:1;"><div style="font-family:'JetBrains Mono',monospace;font-size:17px;font-weight:700;color:${p.ac};">∞</div><div style="font-size:9px;letter-spacing:.12em;color:#7E879A;margin-top:3px;">REPLAYS</div></div>
    </div>` : `
    <div style="border-top:1px solid rgba(255,255,255,.08);padding-top:13px;margin-top:14px;">
      <div style="display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:10.5px;color:#7E879A;margin-bottom:8px;"><span>CURRICULUM</span><span style="color:${p.ac};">${p.progress}</span></div>
      <div style="height:5px;border-radius:3px;background:rgba(255,255,255,.07);overflow:hidden;"><div style="height:100%;width:${p.progress};background:linear-gradient(90deg,${p.tintB},${p.ac});border-radius:3px;"></div></div>
    </div>`;

  return `<div data-poster style="position:absolute;left:50%;top:42%;width:332px;height:486px;margin:0;transform-style:preserve-3d;border-radius:22px;overflow:hidden;background:linear-gradient(168deg,#161f29,#0a0e14);border:1px solid ${p.tintB};display:flex;flex-direction:column;-webkit-box-reflect:below 12px linear-gradient(rgba(0,0,0,.22),transparent 38%);">
  <div style="position:absolute;inset:0;pointer-events:none;border-radius:22px;z-index:6;background:linear-gradient(152deg,rgba(255,255,255,.10),transparent 30%);box-shadow:inset 0 1px 0 rgba(255,255,255,.14),inset 0 0 0 1px rgba(255,255,255,.02);"></div>
  <div style="position:absolute;left:0;right:0;top:0;height:3px;z-index:7;background:linear-gradient(90deg,transparent,${p.ac},transparent);"></div>
  <div style="position:relative;height:120px;flex:0 0 auto;background:linear-gradient(180deg,#101a26,#0b1018);border-bottom:1px solid rgba(255,255,255,.06);overflow:hidden;">
    <div style="position:absolute;inset:0;opacity:.35;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:24px 24px;"></div>
    <div style="position:absolute;right:-40px;top:-44px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,${p.tint},transparent 64%);filter:blur(4px);"></div>
    <div style="position:absolute;left:22px;top:22px;width:50px;height:50px;border-radius:14px;display:grid;place-items:center;font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:700;color:${p.ac};background:rgba(7,11,17,.72);border:1px solid ${p.tintB};box-shadow:0 6px 16px -6px ${p.ac},inset 0 1px 0 rgba(255,255,255,.12);">${esc(p.code)}</div>
    <span style="position:absolute;right:22px;top:24px;font-size:9.5px;letter-spacing:.16em;font-weight:700;padding:5px 11px;border-radius:20px;color:${p.badgeInk};background:${p.badgeBg};border:1px solid ${p.badgeBorder};">${p.badge}</span>
    <div style="position:absolute;left:22px;right:22px;bottom:16px;display:flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:11px;color:${p.ac};opacity:.92;white-space:nowrap;overflow:hidden;"><span style="color:#5b6677;">›</span><span style="overflow:hidden;text-overflow:ellipsis;">${esc(p.snippet)}</span></div>
  </div>
  <div style="flex:1;padding:18px 22px 18px;display:flex;flex-direction:column;position:relative;z-index:2;min-height:0;">
    <div style="font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:.06em;color:#7E879A;">${p.cat}</div>
    <h3 style="margin:7px 0 0;font-size:23px;font-weight:700;letter-spacing:-.015em;">${p.name}</h3>
    <p style="margin:9px 0 0;font-size:12.5px;line-height:1.5;color:#9AA3B3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${p.desc}</p>
    <div style="display:flex;flex-wrap:wrap;gap:7px;margin-top:13px;">${tags}</div>
    <div style="margin-top:auto;"></div>
    ${bottom}
    <a href="${esc(p.href)}" style="display:flex;align-items:center;justify-content:center;gap:8px;margin-top:15px;padding:12px;border-radius:12px;font-size:13.5px;font-weight:700;text-decoration:none;color:${p.ctaInk};background:${p.ctaBg};border:1px solid ${p.ctaBorder};box-shadow:${p.ctaShadow};">${p.cta}</a>
  </div>
</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('cf-track');
  if (track) {
    TRACKS.map(computeTrack).forEach(p => {
      track.insertAdjacentHTML('beforeend', buildPosterHTML(p));
    });
  }
  initCarousel();
  initBackground();
  initEffects();
});

function initCarousel() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = document.getElementById('cf-stage');
  if (!stage) return;

  const posters = [...stage.querySelectorAll('[data-poster]')];
  const n = posters.length;
  const accents = TRACKS.map(t => t.accent);
  let active = 0;
  let autoTimer;

  const halo = document.getElementById('cf-halo');
  const idxEl = document.getElementById('cf-idx');

  const rel = i => {
    let d = i - active;
    while (d > n / 2) d -= n;
    while (d < -n / 2) d += n;
    return d;
  };

  const layout = () => {
    posters.forEach((p, i) => {
      const o = rel(i), ao = Math.abs(o);
      const tx = o * 256;
      const rot = Math.max(-52, Math.min(52, -o * 45));
      const tz = -ao * 250;
      const sc = ao === 0 ? 1 : 0.82;
      p.style.transform = `translate(-50%,-50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${rot}deg) scale(${sc})`;
      p.style.zIndex = String(100 - ao);
      p.style.opacity = ao > 2 ? '0' : (ao === 0 ? '1' : '.6');
      p.style.filter = ao === 0 ? 'none' : 'brightness(.62) saturate(.85)';
      p.style.pointerEvents = ao > 1 ? 'none' : 'auto';
      p.style.boxShadow = ao === 0
        ? `0 60px 100px -36px rgba(0,0,0,.9), 0 0 80px ${accents[i % accents.length]}38`
        : '0 34px 64px -36px rgba(0,0,0,.75)';
    });
    if (halo) halo.style.background = `radial-gradient(circle, rgba(${HALO_RGB[active % HALO_RGB.length]},.34), transparent 64%)`;
    if (idxEl) idxEl.textContent = String(active + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
    const dots = document.getElementById('cf-dots');
    if (dots) {
      [...dots.children].forEach((d, i) => {
        const on = i === active;
        d.style.width = on ? '22px' : '8px';
        d.style.background = on ? '#2DD4BF' : 'rgba(255,255,255,.22)';
        d.style.boxShadow = on ? '0 0 10px rgba(45,212,191,.7)' : 'none';
      });
    }
  };

  const go = d => { active = (active + d + n) % n; layout(); };
  const setActive = i => { active = ((i % n) + n) % n; layout(); };

  // build dots
  const dots = document.getElementById('cf-dots');
  if (dots) {
    posters.forEach((_, i) => {
      const d = document.createElement('button');
      d.style.cssText = 'height:8px;width:8px;border:0;border-radius:6px;cursor:pointer;transition:width .3s,background .3s,box-shadow .3s;background:rgba(255,255,255,.22);';
      d.addEventListener('click', () => { setActive(i); restart(); });
      dots.appendChild(d);
    });
  }

  // click side poster to focus
  posters.forEach((p, i) => {
    p.addEventListener('click', e => {
      if (rel(i) !== 0) { e.preventDefault(); setActive(i); restart(); }
    });
  });

  // arrows
  const prev = document.getElementById('cf-prev');
  const next = document.getElementById('cf-next');
  if (prev) prev.addEventListener('click', () => { go(-1); restart(); });
  if (next) next.addEventListener('click', () => { go(1); restart(); });

  // keyboard
  addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { go(-1); restart(); }
    if (e.key === 'ArrowRight') { go(1); restart(); }
  });

  // drag
  let down = false, sx = 0, moved = 0;
  stage.addEventListener('pointerdown', e => {
    down = true; sx = e.clientX; moved = 0;
    stage.style.cursor = 'grabbing';
  });
  addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - sx;
    if (Math.abs(dx - moved) > 100) { go(dx > moved ? -1 : 1); moved = dx; }
  });
  addEventListener('pointerup', () => {
    if (down) restart();
    down = false;
    stage.style.cursor = 'grab';
  });

  // auto-rotate
  const startAuto = () => { if (reduce) return; autoTimer = setInterval(() => go(1), 4200); };
  const restart = () => { clearInterval(autoTimer); startAuto(); };
  stage.addEventListener('mouseenter', () => clearInterval(autoTimer));
  stage.addEventListener('mouseleave', restart);

  // first paint: disable transitions so initial layout is instant
  posters.forEach(p => { p.style.transition = 'none'; });
  layout();
  void stage.offsetHeight;
  requestAnimationFrame(() => {
    posters.forEach(p => {
      p.style.transition = 'transform .6s cubic-bezier(.32,.72,.28,1),opacity .5s,filter .5s,box-shadow .5s';
    });
  });

  startAuto();
}

function initBackground() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bg = document.getElementById('cf-bg');
  if (!bg) return;
  const bx = bg.getContext('2d');
  const BLUE = '88,166,255', AMBER = '245,166,35';
  let bW = 0, bH = 0, bDPR = 1, bT = 0, bLast = performance.now();
  let motes = [], rails = [];

  const glow = (px, py, r, c, a) => {
    const g = bx.createRadialGradient(px, py, 0, px, py, r);
    g.addColorStop(0, `rgba(${c},${a})`);
    g.addColorStop(.4, `rgba(${c},${a * .4})`);
    g.addColorStop(1, `rgba(${c},0)`);
    bx.fillStyle = g; bx.beginPath(); bx.arc(px, py, r, 0, 6.2832); bx.fill();
  };

  const bgInit = () => {
    motes = [];
    for (let i = 0; i < 55; i++) {
      motes.push({ x: Math.random() * bW, y: Math.random() * bH, r: Math.random() * 1.5 + .4, s: Math.random() * .22 + .05, p: Math.random() * 6.28 });
    }
    rails = [];
    const rows = Math.max(3, Math.floor(bH / 175));
    for (let i = 0; i < rows; i++) {
      const y = (i + .5) / rows * bH + (i % 2 ? 18 : -12);
      rails.push({ y, blips: 3 + (i % 3), sp: .05 + (i % 4) * .02, col: (i % 3 === 0) ? AMBER : BLUE });
    }
  };

  const bgGrid = () => {
    bx.fillStyle = 'rgba(40,58,92,0.12)';
    const gs = 36;
    for (let gx = gs / 2; gx < bW; gx += gs) {
      for (let gy = gs / 2; gy < bH; gy += gs) {
        bx.fillRect(gx, gy, 1.3, 1.3);
      }
    }
  };

  const bgSize = () => {
    bDPR = Math.min(devicePixelRatio || 1, 2);
    bW = innerWidth; bH = innerHeight;
    bg.width = bW * bDPR; bg.height = bH * bDPR;
    bg.style.width = bW + 'px'; bg.style.height = bH + 'px';
    bx.setTransform(bDPR, 0, 0, bDPR, 0, 0);
    bgInit();
  };

  const bgFrame = () => {
    requestAnimationFrame(bgFrame);
    const now = performance.now();
    let dt = (now - bLast) / 1000; bLast = now;
    if (dt > .05) dt = .05;
    bT += dt;
    bx.clearRect(0, 0, bW, bH);
    bgGrid();
    bx.globalCompositeOperation = 'lighter';
    rails.forEach(r => {
      bx.strokeStyle = `rgba(${r.col},0.10)`; bx.lineWidth = 1.4;
      bx.beginPath(); bx.moveTo(0, r.y); bx.lineTo(bW, r.y); bx.stroke();
      for (let k = 0; k < r.blips; k++) {
        const f = ((bT * r.sp + k / r.blips) % 1);
        glow(f * bW, r.y, 7, r.col, .5);
      }
    });
    motes.forEach(m => {
      m.y -= m.s;
      if (m.y < -4) { m.y = bH + 4; m.x = Math.random() * bW; }
      const a = .2 + Math.sin(bT * 1.4 + m.p) * .16;
      glow(m.x, m.y, m.r * 5, BLUE, Math.max(0, a) * .2);
    });
    bx.globalCompositeOperation = 'source-over';
  };

  bgSize();
  addEventListener('resize', bgSize);
  if (reduce) { bgGrid(); } else { bgFrame(); }
}

function initEffects() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // cursor spotlight
  const spot = document.getElementById('cf-spot');
  if (spot && !reduce) {
    addEventListener('mousemove', e => {
      spot.style.left = e.clientX + 'px';
      spot.style.top = e.clientY + 'px';
      spot.style.opacity = '1';
    });
  }

  // film grain
  const grain = document.getElementById('cf-grain');
  if (grain) {
    const gc = document.createElement('canvas');
    gc.width = gc.height = 96;
    const gx = gc.getContext('2d');
    const id = gx.createImageData(96, 96);
    for (let i = 0; i < id.data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      id.data[i] = id.data[i + 1] = id.data[i + 2] = v;
      id.data[i + 3] = 14;
    }
    gx.putImageData(id, 0, 0);
    grain.style.backgroundImage = 'url(' + gc.toDataURL() + ')';
  }
}
