/* ================================================================
   shared.js — CommandGridPro
   Navigation, fade transitions, and global theme management
================================================================ */

/* ── CGP Global Theme System ── */
window.CGP = (function(){
  const THEME_STORAGE_KEY = 'cgp-app-theme';
  const STYLE_MODE_STORAGE_KEY = 'cgp-style-mode';

  const makeTheme = (id, name, note, swatchA, swatchB, background, panel, panelSoft, text, muted, border) => ({
    id, name, note, swatch:[swatchA, swatchB],
    vars:{
      '--background': background,
      '--panel': panel,
      '--panel-soft': panelSoft,
      '--text': text,
      '--muted': muted,
      '--border': border,
      '--accent-a': swatchA,
      '--accent-b': swatchB,
      '--theme-accent': swatchA,
      '--theme-accent-2': swatchB
    }
  });

  const THEMES = [
    makeTheme('commander', 'Commander', 'CGP industrial teal', '#00FFD1', '#00C8A4', '#080808', 'rgba(14,14,14,.92)', 'rgba(22,22,22,.80)', '#e8e8e8', '#aaa', 'rgba(255,255,255,.10)'),
    makeTheme('midnight', 'Midnight', 'Blue violet command', '#6ea8ff', '#b46eff', '#0b1020', 'rgba(18,26,51,.85)', 'rgba(18,26,51,.60)', '#e7ebff', '#aab3e6', 'rgba(255,255,255,.12)'),
    makeTheme('aurora', 'Aurora', 'Teal northern glow', '#3ae6bd', '#4c96ff', '#08191a', 'rgba(9,44,48,.82)', 'rgba(9,44,48,.58)', '#e9fffb', '#9dd7d1', 'rgba(180,255,244,.14)'),
    makeTheme('ember', 'Ember', 'Warm orange red', '#ff7a00', '#ff4646', '#1a0f0b', 'rgba(58,25,13,.84)', 'rgba(58,25,13,.60)', '#fff0e7', '#dfb39f', 'rgba(255,210,180,.14)'),
    makeTheme('forest', 'Forest', 'Deep green glass', '#5eeb81', '#88ffbe', '#0a140d', 'rgba(19,48,28,.84)', 'rgba(19,48,28,.58)', '#effff3', '#a9d4b4', 'rgba(220,255,230,.12)'),
    makeTheme('carbon', 'Carbon', 'Graphite neutral', '#91a4b5', '#617080', '#0f1114', 'rgba(31,35,40,.90)', 'rgba(31,35,40,.68)', '#f3f5f7', '#b8c0c7', 'rgba(255,255,255,.10)'),
    makeTheme('rose', 'Rose', 'Berry neon blend', '#ff5fa2', '#c45dff', '#180912', 'rgba(63,20,44,.84)', 'rgba(63,20,44,.58)', '#ffedf7', '#e0a9c6', 'rgba(255,220,240,.12)'),
    makeTheme('arctic', 'Arctic', 'Cool blue steel', '#65bcff', '#7ee8ff', '#09131c', 'rgba(18,41,61,.86)', 'rgba(18,41,61,.60)', '#eef7ff', '#acc9de', 'rgba(220,242,255,.12)'),
    makeTheme('plum', 'Plum', 'Royal purple glow', '#9b64ff', '#e569ff', '#130a1c', 'rgba(43,22,69,.86)', 'rgba(43,22,69,.60)', '#f7efff', '#c6b2de', 'rgba(245,230,255,.12)'),
    makeTheme('ocean', 'Ocean', 'Navy aqua contrast', '#00afff', '#00e9bc', '#071420', 'rgba(10,38,66,.86)', 'rgba(10,38,66,.60)', '#ebf7ff', '#9bc4df', 'rgba(210,235,255,.12)'),
    makeTheme('lava', 'Lava', 'Hot magenta orange', '#ff5454', '#ffa043', '#180a07', 'rgba(74,23,12,.86)', 'rgba(74,23,12,.60)', '#fff0eb', '#e6b0a5', 'rgba(255,225,220,.12)'),
    makeTheme('matrix', 'Matrix', 'Black and neon green', '#54ff71', '#22d65c', '#050905', 'rgba(8,20,10,.90)', 'rgba(8,20,10,.68)', '#eaffea', '#9bc59b', 'rgba(180,255,180,.12)'),
    makeTheme('obsidian', 'Obsidian', 'Ink black and sapphire', '#4e84ff', '#7c5fff', '#05070c', 'rgba(16,20,32,.92)', 'rgba(16,20,32,.72)', '#f4f7ff', '#aab6d6', 'rgba(210,224,255,.10)'),
    makeTheme('royal', 'Royal', 'Blue velvet and gold', '#617eff', '#ffc95c', '#0a1020', 'rgba(20,34,74,.88)', 'rgba(20,34,74,.62)', '#f6f7ff', '#bcc4ea', 'rgba(232,235,255,.12)'),
    makeTheme('copper', 'Copper', 'Industrial bronze', '#c87545', '#ffac66', '#15100d', 'rgba(61,38,28,.86)', 'rgba(61,38,28,.60)', '#fff1ea', '#d1b4a4', 'rgba(255,230,220,.12)'),
    makeTheme('storm', 'Storm', 'Slate electric blue', '#739aff', '#82c6ff', '#0d1219', 'rgba(30,38,52,.88)', 'rgba(30,38,52,.62)', '#f0f4fb', '#b2bdce', 'rgba(235,242,255,.10)'),

    makeTheme('glacier', 'Glacier', 'Frosted sky panels', '#73d5ff', '#c7f3ff', '#06141b', 'rgba(14,38,48,.84)', 'rgba(14,38,48,.58)', '#f2fbff', '#b7d6df', 'rgba(221,247,255,.14)'),
    makeTheme('sunset', 'Sunset', 'Peach to coral glow', '#ff8f6b', '#ffcc80', '#1a0f10', 'rgba(68,28,31,.84)', 'rgba(68,28,31,.58)', '#fff3ef', '#deb5ab', 'rgba(255,224,214,.12)'),
    makeTheme('amethyst', 'Amethyst', 'Polished purple crystal', '#b67cff', '#7b61ff', '#110b19', 'rgba(42,27,65,.86)', 'rgba(42,27,65,.60)', '#f7f1ff', '#c7b7de', 'rgba(242,232,255,.12)'),
    makeTheme('cobalt', 'Cobalt', 'Focused blue console', '#4aa3ff', '#7ad3ff', '#07101b', 'rgba(15,33,58,.88)', 'rgba(15,33,58,.62)', '#eef6ff', '#a9bfd7', 'rgba(224,238,255,.12)'),
    makeTheme('mint', 'Mint', 'Fresh glass green', '#49f2b8', '#91ffd6', '#071611', 'rgba(12,45,34,.84)', 'rgba(12,45,34,.58)', '#effff8', '#a9d8c7', 'rgba(214,255,238,.12)'),
    makeTheme('infrared', 'Infrared', 'Red alert operator', '#ff5d6c', '#ff9f66', '#19080c', 'rgba(71,17,28,.86)', 'rgba(71,17,28,.60)', '#fff0f2', '#ddb1b8', 'rgba(255,220,225,.12)'),
    makeTheme('sandstone', 'Sandstone', 'Warm beige tactical', '#d7a96b', '#f1d399', '#16120d', 'rgba(60,47,31,.86)', 'rgba(60,47,31,.60)', '#fff7ec', '#d7c0a0', 'rgba(255,240,216,.12)'),
    makeTheme('berry', 'Berry', 'Raspberry dusk blend', '#ff4fa3', '#ff7bd8', '#170811', 'rgba(70,20,48,.84)', 'rgba(70,20,48,.58)', '#fff0f7', '#deb0c9', 'rgba(255,226,240,.12)'),
    makeTheme('sapphire', 'Sapphire', 'Deep gem blue', '#4f7cff', '#7ca8ff', '#070c18', 'rgba(18,29,67,.88)', 'rgba(18,29,67,.62)', '#f1f5ff', '#b4bfdd', 'rgba(226,233,255,.12)'),
    makeTheme('jade', 'Jade', 'Cool refined green', '#36d9a4', '#6bffce', '#06140f', 'rgba(10,42,31,.86)', 'rgba(10,42,31,.60)', '#edfff8', '#a5d6c4', 'rgba(214,255,236,.12)'),

    makeTheme('grape', 'Grape', 'Soft violet command', '#8d6cff', '#c389ff', '#0f0a18', 'rgba(35,24,60,.86)', 'rgba(35,24,60,.60)', '#f5f1ff', '#c0b5dd', 'rgba(236,230,255,.12)'),
    makeTheme('marine', 'Marine', 'Sea blue discipline', '#3db9ff', '#3df0d7', '#061521', 'rgba(8,38,62,.86)', 'rgba(8,38,62,.60)', '#edf8ff', '#a4c9d8', 'rgba(214,238,255,.12)'),
    makeTheme('emberglass', 'Emberglass', 'Molten copper glass', '#ff8557', '#ffc36e', '#1a0c08', 'rgba(72,30,18,.86)', 'rgba(72,30,18,.60)', '#fff2eb', '#dbb59f', 'rgba(255,228,214,.12)'),
    makeTheme('neonlime', 'Neon Lime', 'Sharp tactical lime', '#b3ff3d', '#66ff91', '#0b1106', 'rgba(27,42,12,.84)', 'rgba(27,42,12,.58)', '#f9ffef', '#cadba9', 'rgba(236,255,214,.12)'),
    makeTheme('orchid', 'Orchid', 'Elegant pink violet', '#ff79c6', '#b490ff', '#170a15', 'rgba(62,23,55,.84)', 'rgba(62,23,55,.58)', '#fff2fb', '#ddbad0', 'rgba(255,229,246,.12)'),
    makeTheme('steelblue', 'Steel Blue', 'Practical cool steel', '#6fa9d8', '#a0c2dc', '#0e1318', 'rgba(34,44,54,.88)', 'rgba(34,44,54,.62)', '#f2f6fa', '#b3bec8', 'rgba(235,242,248,.10)'),
    makeTheme('goldleaf', 'Gold Leaf', 'Muted gold prestige', '#e3bf53', '#f5db87', '#171309', 'rgba(65,51,18,.86)', 'rgba(65,51,18,.60)', '#fff9ea', '#d7c48f', 'rgba(255,242,204,.12)'),
    makeTheme('nightrose', 'Night Rose', 'Dark rose noir', '#e95f89', '#ff98b7', '#15090d', 'rgba(58,20,32,.84)', 'rgba(58,20,32,.58)', '#fff1f5', '#dcb3bf', 'rgba(255,226,234,.12)'),
    makeTheme('icefire', 'Icefire', 'Blue to flame split', '#65c8ff', '#ff8c5b', '#0a1118', 'rgba(20,34,46,.86)', 'rgba(20,34,46,.60)', '#f6fbff', '#b7c7d1', 'rgba(235,242,246,.12)'),
    makeTheme('horizon', 'Horizon', 'Late dusk gradient', '#6f8dff', '#ff7fd1', '#0c0d18', 'rgba(29,27,58,.86)', 'rgba(29,27,58,.60)', '#f6f4ff', '#bcb7dd', 'rgba(233,229,255,.12)'),

    makeTheme('pine', 'Pine', 'Dark evergreen panels', '#4ade80', '#94f7b3', '#07110a', 'rgba(18,37,23,.86)', 'rgba(18,37,23,.60)', '#f1fff4', '#b0cfb6', 'rgba(223,255,229,.12)'),
    makeTheme('graphite', 'Graphite', 'Neutral workstation grey', '#9aa6b2', '#c0cad3', '#0f1215', 'rgba(30,34,39,.90)', 'rgba(30,34,39,.68)', '#f5f7f8', '#b8c0c6', 'rgba(255,255,255,.10)'),
    makeTheme('violetflare', 'Violet Flare', 'Electric lavender', '#9f7bff', '#ff82e5', '#12091a', 'rgba(44,21,70,.86)', 'rgba(44,21,70,.60)', '#faf3ff', '#cab8de', 'rgba(245,232,255,.12)'),
    makeTheme('seaglass', 'Sea Glass', 'Muted aqua clarity', '#67e8d7', '#8fd8ff', '#071515', 'rgba(14,44,46,.84)', 'rgba(14,44,46,.58)', '#eefffd', '#aed3d1', 'rgba(220,255,250,.12)'),
    makeTheme('scarlet', 'Scarlet', 'High-contrast command red', '#ff4458', '#ff8c5f', '#17080b', 'rgba(68,15,25,.86)', 'rgba(68,15,25,.60)', '#fff1f3', '#dfb0b8', 'rgba(255,224,228,.12)'),
    makeTheme('mocha', 'Mocha', 'Coffee bronze blend', '#ba8a64', '#e7b88a', '#15100d', 'rgba(54,38,28,.86)', 'rgba(54,38,28,.60)', '#fff5ef', '#ccb8a7', 'rgba(251,235,224,.12)'),
    makeTheme('electric', 'Electric', 'Bright cyan voltage', '#31d7ff', '#5e8dff', '#05121a', 'rgba(8,35,46,.86)', 'rgba(8,35,46,.60)', '#edfaff', '#a8c7d1', 'rgba(214,243,255,.12)'),
    makeTheme('lilac', 'Lilac', 'Pale purple glow', '#c49bff', '#e1c4ff', '#120e18', 'rgba(44,34,57,.86)', 'rgba(44,34,57,.60)', '#faf7ff', '#cbc1d8', 'rgba(244,238,255,.12)'),
    makeTheme('meadow', 'Meadow', 'Fresh green daylight', '#68e56f', '#b2ff8c', '#081208', 'rgba(21,42,18,.86)', 'rgba(21,42,18,.60)', '#f4fff0', '#bfd9b1', 'rgba(232,255,218,.12)'),
    makeTheme('signal', 'Signal', 'Amber and warning red', '#ffbf47', '#ff6f61', '#181008', 'rgba(70,40,12,.86)', 'rgba(70,40,12,.60)', '#fff7ec', '#d9beaa', 'rgba(255,236,214,.12)'),

    makeTheme('polar', 'Polar', 'Crisp light-blue command', '#83d8ff', '#7c9bff', '#08121a', 'rgba(18,35,49,.86)', 'rgba(18,35,49,.60)', '#f4fbff', '#b9cad7', 'rgba(227,242,255,.12)'),
    makeTheme('blush', 'Blush', 'Warm modern rose', '#ff8bb3', '#ffc0d9', '#180d13', 'rgba(64,31,46,.84)', 'rgba(64,31,46,.58)', '#fff5fa', '#dcbecb', 'rgba(255,233,242,.12)'),
    makeTheme('citron', 'Citron', 'Yellow-green bright', '#dfff5a', '#7dffb6', '#101206', 'rgba(42,48,13,.84)', 'rgba(42,48,13,.58)', '#fcffef', '#d0d8b0', 'rgba(242,255,214,.12)'),
    makeTheme('ultraviolet', 'Ultraviolet', 'Dark club violet', '#7b5cff', '#b55cff', '#0f0818', 'rgba(35,17,58,.86)', 'rgba(35,17,58,.60)', '#f7f1ff', '#c3b4db', 'rgba(238,230,255,.12)'),
    makeTheme('tide', 'Tide', 'Muted ocean drift', '#56b4d3', '#7be0c3', '#081317', 'rgba(17,42,48,.86)', 'rgba(17,42,48,.60)', '#eefbfd', '#accad0', 'rgba(220,247,250,.12)'),
    makeTheme('ruby', 'Ruby', 'Gemstone red glow', '#ff5e7e', '#ff9d9d', '#17080d', 'rgba(66,18,31,.86)', 'rgba(66,18,31,.60)', '#fff1f4', '#ddb1bb', 'rgba(255,225,231,.12)'),
    makeTheme('driftwood', 'Driftwood', 'Soft earth neutral', '#b89c7e', '#d8c2a7', '#14110e', 'rgba(47,40,31,.86)', 'rgba(47,40,31,.60)', '#fff8f0', '#cabbaa', 'rgba(248,237,224,.12)'),
    makeTheme('hyperblue', 'Hyper Blue', 'Fast vivid blue', '#3f8cff', '#3fe0ff', '#06111d', 'rgba(10,33,58,.88)', 'rgba(10,33,58,.62)', '#edf6ff', '#a7bed5', 'rgba(214,232,255,.12)'),
    makeTheme('violetmint', 'Violet Mint', 'Purple with cool mint', '#a17cff', '#5ff0c4', '#0d0d18', 'rgba(33,29,60,.86)', 'rgba(33,29,60,.60)', '#f6f5ff', '#bbb8d8', 'rgba(233,231,255,.12)'),
    makeTheme('phoenix', 'Phoenix', 'Gold to ember lift', '#ffb14a', '#ff6363', '#180c08', 'rgba(68,31,16,.86)', 'rgba(68,31,16,.60)', '#fff5ee', '#d8b9ac', 'rgba(255,232,219,.12)')
  ];

  const STYLE_MODES = [
    { id:'classic', name:'Original Style', note:'Angular command-console look with grid texture and tactical edges.' },
    { id:'modern', name:'Modern Web', note:'Softer cards, richer surfaces, rounded corners, and a cleaner app shell.' },
    { id:'light', name:'Light Mode', note:'Clean white shell with light panels. Accent colour carries over from your chosen theme.' }
  ];

  function getThemeById(id) {
    return THEMES.find(t => t.id === id) || THEMES[0];
  }

  function getStyleModeById(id) {
    return STYLE_MODES.find(m => m.id === id) || STYLE_MODES[0];
  }

  function applyTheme(id) {
    const theme = getThemeById(id);
    const root = document.documentElement;

    // Always apply accent/swatch vars regardless of style mode
    root.style.setProperty('--accent-a',       theme.vars['--accent-a']);
    root.style.setProperty('--accent-b',       theme.vars['--accent-b']);
    root.style.setProperty('--theme-accent',   theme.vars['--theme-accent']   || theme.swatch[0]);
    root.style.setProperty('--theme-accent-2', theme.vars['--theme-accent-2'] || theme.swatch[1]);

    const accent = theme.vars['--theme-accent'] || theme.swatch[0];
    root.style.setProperty('--teal', accent);

    if (document.body) {
      document.body.style.setProperty('--cgp-theme-bg',     theme.vars['--background'] || '#080808');
      document.body.style.setProperty('--cgp-theme-accent', accent);
    }

    // Only apply dark background/panel/text tokens when NOT in light mode
    // Check both the live attribute and the saved value for robustness
    const liveMode = root.getAttribute('data-cgp-style-mode');
    const currentMode = liveMode || getSavedStyleMode();
    if (currentMode !== 'light') {
      const bg = theme.vars['--background'] || '#080808';
      root.style.setProperty('--bg',         bg);
      root.style.setProperty('--background', bg);
      root.style.setProperty('--panel',      theme.vars['--panel']      || 'rgba(14,14,14,.92)');
      root.style.setProperty('--panel-soft', theme.vars['--panel-soft'] || 'rgba(22,22,22,.80)');
      root.style.setProperty('--text',       theme.vars['--text']       || '#e8e8e8');
      root.style.setProperty('--muted',      theme.vars['--muted']      || '#aaa');
      root.style.setProperty('--border',     theme.vars['--border']     || 'rgba(255,255,255,.10)');
    }

    try { localStorage.setItem(THEME_STORAGE_KEY, id); } catch(e){}
    try {
      document.querySelectorAll('iframe').forEach(f => {
        f.contentWindow?.postMessage({ source:'orgCardsHost', type:'setTheme', theme: id }, '*');
      });
    } catch(e){}

    document.querySelectorAll('[data-theme-id]').forEach(el => {
      el.classList.toggle('cgp-theme-active', el.dataset.themeId === id);
    });

    return theme;
  }

  function applyStyleMode(id) {
    const mode = getStyleModeById(id);
    const root = document.documentElement;
    root.setAttribute('data-cgp-style-mode', mode.id);
    if (document.body) {
      document.body.setAttribute('data-cgp-style-mode', mode.id);
    }

    // Light mode: override the dark background/panel/text tokens so every page
    // that reads --bg, --panel, --text, --muted, --border automatically goes light.
    // We write onto :root so inherited vars cascade everywhere.
    if (mode.id === 'light') {
      root.style.setProperty('--bg',         '#f0f2f5');
      root.style.setProperty('--background', '#f0f2f5');
      root.style.setProperty('--panel',      'rgba(255,255,255,.95)');
      root.style.setProperty('--panel-soft', 'rgba(240,242,245,.90)');
      root.style.setProperty('--text',       '#111827');
      root.style.setProperty('--muted',      '#6b7280');
      root.style.setProperty('--border',     'rgba(0,0,0,.12)');
    } else {
      // Re-apply the current theme to restore dark tokens when switching away
      const savedId = getSavedId();
      const theme = getThemeById(savedId);
      root.style.setProperty('--bg',         theme.vars['--background'] || '#080808');
      root.style.setProperty('--background', theme.vars['--background'] || '#080808');
      root.style.setProperty('--panel',      theme.vars['--panel']      || 'rgba(14,14,14,.92)');
      root.style.setProperty('--panel-soft', theme.vars['--panel-soft'] || 'rgba(22,22,22,.80)');
      root.style.setProperty('--text',       theme.vars['--text']       || '#e8e8e8');
      root.style.setProperty('--muted',      theme.vars['--muted']      || '#aaa');
      root.style.setProperty('--border',     theme.vars['--border']     || 'rgba(255,255,255,.10)');
    }

    try { localStorage.setItem(STYLE_MODE_STORAGE_KEY, mode.id); } catch(e){}

    document.querySelectorAll('[data-style-mode-id]').forEach(el => {
      el.classList.toggle('cgp-style-active', el.dataset.styleModeId === mode.id);
      el.setAttribute('aria-pressed', String(el.dataset.styleModeId === mode.id));
    });

    return mode;
  }

  function getSavedId() {
    try { return localStorage.getItem(THEME_STORAGE_KEY) || 'commander'; } catch(e){ return 'commander'; }
  }

  function getSavedStyleMode() {
    try { return localStorage.getItem(STYLE_MODE_STORAGE_KEY) || 'classic'; } catch(e){ return 'classic'; }
  }

  applyTheme(getSavedId());
  applyStyleMode(getSavedStyleMode()); // must be last — overrides dark tokens if light mode

  return {
    THEMES,
    STYLE_MODES,
    applyTheme,
    applyStyleMode,
    getSavedId,
    getSavedStyleMode,
    getThemeById,
    getStyleModeById
  };
})();


/* ── Page fade + lightweight navigation memory ── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');
  /* Re-apply in correct order: theme sets accent+dark tokens, style mode overrides if light */
  CGP.applyTheme(CGP.getSavedId());
  CGP.applyStyleMode(CGP.getSavedStyleMode()); // must be last

  try {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    const last = sessionStorage.getItem('cgp:lastPage');
    if (last && last !== current) sessionStorage.setItem('cgp:previousPage', last);
    sessionStorage.setItem('cgp:lastPage', current);
  } catch (e) {}
});

/* ── Navigation with fade ── */
function navigateTo(url) {
  if (!url) return;
  document.body.classList.remove('fade-in');
  document.body.classList.add('fade-out');
  setTimeout(() => { window.location.href = url; }, 320);
}

function goBack(fallbackUrl = 'index.html') {
  let previousPage = '';
  let referrerPage = '';
  let currentPage = '';

  try {
    currentPage = window.location.pathname.split('/').pop() || '';
    previousPage = sessionStorage.getItem('cgp:previousPage') || '';
  } catch (e) {}

  try {
    if (document.referrer) {
      referrerPage = new URL(document.referrer).pathname.split('/').pop() || '';
    }
  } catch (e) {}

  const safePrevious = previousPage && previousPage !== currentPage ? previousPage : '';
  const safeReferrer = referrerPage && referrerPage !== currentPage ? referrerPage : '';

  if (safePrevious) {
    navigateTo(safePrevious);
    return;
  }

  if (safeReferrer) {
    navigateTo(safeReferrer);
    return;
  }

  if (window.history.length > 1) {
    document.body.classList.remove('fade-in');
    document.body.classList.add('fade-out');
    setTimeout(() => { window.history.back(); }, 320);
    return;
  }

  navigateTo(fallbackUrl);
}

/* ── Shared Header / Footer Loader ──────────────────────────────────────────
 *
 * Inlined as template strings so this works with file:// (no fetch/CORS needed).
 *
 * Usage: add data attributes to the <header> or <footer> element:
 *
 * <header
 *   data-cgp-header
 *   data-tagline="PDF Form Filler · v3.3"   <!-- replaces default tagline -->
 *   data-hide-back="true"                    <!-- hides Back button (index) -->
 *   data-hide-settings="true">              <!-- hides Settings button      -->
 * </header>
 *
 * <footer
 *   data-cgp-footer
 *   data-page="PDF Form Filler"
 *   data-version="v3.3">
 * </footer>
 * ─────────────────────────────────────────────────────────────────────────── */
(function () {

  const HEADER_HTML = `
<div class="header-inner">
  <div class="logo-mark" style="color:var(--teal)">
    <svg width="30" height="30" viewBox="0 0 64 64" fill="none" style="cursor:pointer" onclick="navigateTo('index.html')" aria-label="CommandGridPro home">
      <rect x="8" y="8" width="18" height="18" rx="3" stroke="currentColor" stroke-width="3"/>
      <rect x="38" y="8" width="18" height="18" rx="3" stroke="currentColor" stroke-width="3"/>
      <rect x="8" y="38" width="18" height="18" rx="3" stroke="currentColor" stroke-width="3"/>
      <rect x="38" y="38" width="18" height="18" rx="3" stroke="currentColor" stroke-width="3" fill="currentColor" fill-opacity="0.12"/>
      <path d="M26 17h12M17 26v12M47 26v12M26 47h12" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.9"/>
      <circle cx="32" cy="32" r="6.5" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="3"/>
    </svg>
  </div>
  <div onclick="navigateTo('index.html')" style="cursor:pointer">
    <h1 class="brand-title">COMMAND<span>GRID</span>PRO</h1>
    <p class="tagline" id="cgp-header-tagline">Precision Tools. Zero Friction.</p>
  </div>
  <div style="margin-left:auto; display:flex; align-items:center; gap:10px;">
    <div class="status-badge">
      <span class="status-dot"></span>
      ACTIVE
    </div>
    <button class="settings-btn" id="cgp-settings-btn" onclick="navigateTo('settings.html')" title="Settings">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    </button>
    <button class="back-btn" id="cgp-back-btn" onclick="goBack('index.html')">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
      Back
    </button>
  </div>
</div>
<div class="divider"></div>`;

  const FOOTER_HTML = `
<span class="brand">CFB <span>North Bay</span></span>
<span class="fsep">×</span>
<span class="brand">Command<span>Grid</span>Pro</span>
<span class="fsep" style="margin:0 4px" id="cgp-footer-sep1">|</span>
<span id="cgp-footer-page"></span>
<span class="fsep" id="cgp-footer-sep2">|</span>
<span id="cgp-footer-version">v1.0.0</span>`;

  function loadHeader() {
    const el = document.querySelector('[data-cgp-header]');
    if (!el) return;
    el.innerHTML = HEADER_HTML;

    const tagline = el.dataset.tagline;
    if (tagline) {
      const t = el.querySelector('#cgp-header-tagline');
      if (t) t.textContent = tagline;
    }
    if (el.dataset.hideBack === 'true') {
      const b = el.querySelector('#cgp-back-btn');
      if (b) b.style.display = 'none';
    }
    if (el.dataset.hideSettings === 'true') {
      const s = el.querySelector('#cgp-settings-btn');
      if (s) s.style.display = 'none';
    }
  }

  function loadFooter() {
    const el = document.querySelector('[data-cgp-footer]');
    if (!el) return;
    el.innerHTML = FOOTER_HTML;

    const page    = el.dataset.page    || '';
    const version = el.dataset.version || 'v1.0.0';

    const pageEl = el.querySelector('#cgp-footer-page');
    const sep1   = el.querySelector('#cgp-footer-sep1');
    const sep2   = el.querySelector('#cgp-footer-sep2');
    const verEl  = el.querySelector('#cgp-footer-version');

    if (pageEl) pageEl.textContent = page;
    if (verEl)  verEl.textContent  = version;
    // hide separators and page slot if no page label supplied
    if (!page) {
      if (sep1) sep1.style.display = 'none';
      if (sep2) sep2.style.display = 'none';
      if (pageEl) pageEl.style.display = 'none';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
  });

  // Expose in case pages want to call manually after dynamic content loads
  CGP.loadHeader = loadHeader;
  CGP.loadFooter = loadFooter;
})();
