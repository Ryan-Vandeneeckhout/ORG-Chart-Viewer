/* ================================================================
   shared.js — CommandGridPro
   Navigation, fade transitions, and global theme management
================================================================ */

/* ── CGP Global Theme System ── */
window.CGP = (function(){
  const STORAGE_KEY = 'cgp-app-theme';

  /* Full theme library — matches tool-cgp.html THEMES array */
  const THEMES = [
    { id:'commander', name:'Commander', note:'CGP industrial teal', swatch:['#00FFD1','#0a0a0a'],
      vars:{ '--background':'#080808','--panel':'rgba(14,14,14,.92)','--panel-soft':'rgba(22,22,22,.80)',
             '--text':'#e8e8e8','--muted':'#aaa','--border':'rgba(255,255,255,.10)',
             '--accent-a':'rgba(0,255,209,.95)','--accent-b':'rgba(0,200,164,.85)',
             '--theme-accent':'#00FFD1','--theme-accent-2':'#00C8A4' } },
    { id:'midnight', name:'Midnight', note:'Blue violet command', swatch:['#6ea8ff','#b46eff'],
      vars:{ '--background':'#0b1020','--panel':'rgba(18,26,51,.85)','--panel-soft':'rgba(18,26,51,.60)',
             '--text':'#e7ebff','--muted':'#aab3e6','--border':'rgba(255,255,255,.12)',
             '--accent-a':'rgba(110,168,255,.95)','--accent-b':'rgba(180,110,255,.85)',
             '--theme-accent':'#6ea8ff','--theme-accent-2':'#b46eff' } },
    { id:'aurora', name:'Aurora', note:'Teal northern glow', swatch:['#3ae6bd','#4c96ff'],
      vars:{ '--background':'#08191a','--panel':'rgba(9,44,48,.82)','--panel-soft':'rgba(9,44,48,.58)',
             '--text':'#e9fffb','--muted':'#9dd7d1','--border':'rgba(180,255,244,.14)',
             '--accent-a':'rgba(58,230,189,.94)','--accent-b':'rgba(76,150,255,.88)',
             '--theme-accent':'#3ae6bd','--theme-accent-2':'#4c96ff' } },
    { id:'ember', name:'Ember', note:'Warm orange red', swatch:['#ff7a00','#ff4646'],
      vars:{ '--background':'#1a0f0b','--panel':'rgba(58,25,13,.84)','--panel-soft':'rgba(58,25,13,.60)',
             '--text':'#fff0e7','--muted':'#dfb39f','--border':'rgba(255,210,180,.14)',
             '--accent-a':'rgba(255,122,0,.95)','--accent-b':'rgba(255,70,70,.88)',
             '--theme-accent':'#ff7a00','--theme-accent-2':'#ff4646' } },
    { id:'forest', name:'Forest', note:'Deep green glass', swatch:['#5eeb81','#88ffbe'],
      vars:{ '--background':'#0a140d','--panel':'rgba(19,48,28,.84)','--panel-soft':'rgba(19,48,28,.58)',
             '--text':'#effff3','--muted':'#a9d4b4','--border':'rgba(220,255,230,.12)',
             '--accent-a':'rgba(94,235,129,.98)','--accent-b':'rgba(136,255,190,.90)',
             '--theme-accent':'#5eeb81','--theme-accent-2':'#88ffbe' } },
    { id:'carbon', name:'Carbon', note:'Graphite neutral', swatch:['#91a4b5','#617080'],
      vars:{ '--background':'#0f1114','--panel':'rgba(31,35,40,.90)','--panel-soft':'rgba(31,35,40,.68)',
             '--text':'#f3f5f7','--muted':'#b8c0c7','--border':'rgba(255,255,255,.10)',
             '--accent-a':'rgba(145,164,181,.95)','--accent-b':'rgba(97,112,128,.90)',
             '--theme-accent':'#91a4b5','--theme-accent-2':'#617080' } },
    { id:'rose', name:'Rose', note:'Berry neon blend', swatch:['#ff5fa2','#c45dff'],
      vars:{ '--background':'#180912','--panel':'rgba(63,20,44,.84)','--panel-soft':'rgba(63,20,44,.58)',
             '--text':'#ffedf7','--muted':'#e0a9c6','--border':'rgba(255,220,240,.12)',
             '--accent-a':'rgba(255,95,162,.95)','--accent-b':'rgba(196,93,255,.88)',
             '--theme-accent':'#ff5fa2','--theme-accent-2':'#c45dff' } },
    { id:'arctic', name:'Arctic', note:'Cool blue steel', swatch:['#65bcff','#7ee8ff'],
      vars:{ '--background':'#09131c','--panel':'rgba(18,41,61,.86)','--panel-soft':'rgba(18,41,61,.60)',
             '--text':'#eef7ff','--muted':'#acc9de','--border':'rgba(220,242,255,.12)',
             '--accent-a':'rgba(101,188,255,.95)','--accent-b':'rgba(126,232,255,.86)',
             '--theme-accent':'#65bcff','--theme-accent-2':'#7ee8ff' } },
    { id:'plum', name:'Plum', note:'Royal purple glow', swatch:['#9b64ff','#e569ff'],
      vars:{ '--background':'#130a1c','--panel':'rgba(43,22,69,.86)','--panel-soft':'rgba(43,22,69,.60)',
             '--text':'#f7efff','--muted':'#c6b2de','--border':'rgba(245,230,255,.12)',
             '--accent-a':'rgba(155,100,255,.95)','--accent-b':'rgba(229,105,255,.86)',
             '--theme-accent':'#9b64ff','--theme-accent-2':'#e569ff' } },
    { id:'ocean', name:'Ocean', note:'Navy aqua contrast', swatch:['#00afff','#00e9bc'],
      vars:{ '--background':'#071420','--panel':'rgba(10,38,66,.86)','--panel-soft':'rgba(10,38,66,.60)',
             '--text':'#ebf7ff','--muted':'#9bc4df','--border':'rgba(210,235,255,.12)',
             '--accent-a':'rgba(0,175,255,.95)','--accent-b':'rgba(0,233,188,.86)',
             '--theme-accent':'#00afff','--theme-accent-2':'#00e9bc' } },
    { id:'lava', name:'Lava', note:'Hot magenta orange', swatch:['#ff5454','#ffa043'],
      vars:{ '--background':'#180a07','--panel':'rgba(74,23,12,.86)','--panel-soft':'rgba(74,23,12,.60)',
             '--text':'#fff0eb','--muted':'#e6b0a5','--border':'rgba(255,225,220,.12)',
             '--accent-a':'rgba(255,84,84,.95)','--accent-b':'rgba(255,160,67,.88)',
             '--theme-accent':'#ff5454','--theme-accent-2':'#ffa043' } },
    { id:'matrix', name:'Matrix', note:'Black and neon green', swatch:['#54ff71','#22d65c'],
      vars:{ '--background':'#050905','--panel':'rgba(8,20,10,.90)','--panel-soft':'rgba(8,20,10,.68)',
             '--text':'#eaffea','--muted':'#9bc59b','--border':'rgba(180,255,180,.12)',
             '--accent-a':'rgba(84,255,113,.98)','--accent-b':'rgba(34,214,92,.94)',
             '--theme-accent':'#54ff71','--theme-accent-2':'#22d65c' } },
    { id:'obsidian', name:'Obsidian', note:'Ink black and sapphire', swatch:['#4e84ff','#7c5fff'],
      vars:{ '--background':'#05070c','--panel':'rgba(16,20,32,.92)','--panel-soft':'rgba(16,20,32,.72)',
             '--text':'#f4f7ff','--muted':'#aab6d6','--border':'rgba(210,224,255,.10)',
             '--accent-a':'rgba(78,132,255,.96)','--accent-b':'rgba(124,95,255,.88)',
             '--theme-accent':'#4e84ff','--theme-accent-2':'#7c5fff' } },
    { id:'royal', name:'Royal', note:'Blue velvet and gold', swatch:['#617eff','#ffc95c'],
      vars:{ '--background':'#0a1020','--panel':'rgba(20,34,74,.88)','--panel-soft':'rgba(20,34,74,.62)',
             '--text':'#f6f7ff','--muted':'#bcc4ea','--border':'rgba(232,235,255,.12)',
             '--accent-a':'rgba(97,126,255,.96)','--accent-b':'rgba(255,201,92,.86)',
             '--theme-accent':'#617eff','--theme-accent-2':'#ffc95c' } },
    { id:'copper', name:'Copper', note:'Industrial bronze', swatch:['#c87545','#ffac66'],
      vars:{ '--background':'#15100d','--panel':'rgba(61,38,28,.86)','--panel-soft':'rgba(61,38,28,.60)',
             '--text':'#fff1ea','--muted':'#d1b4a4','--border':'rgba(255,230,220,.12)',
             '--accent-a':'rgba(200,117,69,.95)','--accent-b':'rgba(255,172,102,.84)',
             '--theme-accent':'#c87545','--theme-accent-2':'#ffac66' } },
    { id:'storm', name:'Storm', note:'Slate electric blue', swatch:['#739aff','#82c6ff'],
      vars:{ '--background':'#0d1219','--panel':'rgba(30,38,52,.88)','--panel-soft':'rgba(30,38,52,.62)',
             '--text':'#f0f4fb','--muted':'#b2bdce','--border':'rgba(235,242,255,.10)',
             '--accent-a':'rgba(115,154,255,.95)','--accent-b':'rgba(130,198,255,.86)',
             '--theme-accent':'#739aff','--theme-accent-2':'#82c6ff' } },
  ];

  function getThemeById(id) {
    return THEMES.find(t => t.id === id) || THEMES[0];
  }

  function applyTheme(id) {
    const theme = getThemeById(id);
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));

    /* ── Bridge: map theme vars → the names shared.css actually reads ── */
    const accent = theme.vars['--theme-accent'] || theme.swatch[0];
    const bg     = theme.vars['--background']   || '#080808';
    root.style.setProperty('--bg',   bg);
    root.style.setProperty('--teal', accent);
    /* Also expose on body for any inline style refs — guard for early calls */
    if (document.body) {
      document.body.style.setProperty('--cgp-theme-bg',     bg);
      document.body.style.setProperty('--cgp-theme-accent', accent);
    }

    try { localStorage.setItem('cgp-app-theme', id); } catch(e){}
    /* Broadcast to any open CGP tool iframes */
    try {
      document.querySelectorAll('iframe').forEach(f => {
        f.contentWindow?.postMessage({ source:'orgCardsHost', type:'setTheme', theme: id }, '*');
      });
    } catch(e){}
    /* Update active state on settings page if present */
    document.querySelectorAll('[data-theme-id]').forEach(el => {
      el.classList.toggle('cgp-theme-active', el.dataset.themeId === id);
    });
    return theme;
  }

  function getSavedId() {
    try { return localStorage.getItem('cgp-app-theme') || 'commander'; } catch(e){ return 'commander'; }
  }

  /* Apply saved theme immediately (before DOMContentLoaded) */
  applyTheme(getSavedId());

  return { THEMES, applyTheme, getSavedId, getThemeById };
})();

/* ── Page fade ── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');
  /* Re-apply theme after DOM ready so CGP tool picks it up */
  CGP.applyTheme(CGP.getSavedId());
});

/* ── Navigation with fade ── */
function navigateTo(url) {
  document.body.classList.remove('fade-in');
  document.body.classList.add('fade-out');
  setTimeout(() => { window.location.href = url; }, 320);
}
