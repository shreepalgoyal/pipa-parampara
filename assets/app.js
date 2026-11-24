/* पीपा परंपरा — progressive enhancement.
   Core reading, navigation and every source works without this file.
   This adds: reading preferences, site search, translation, book progress. */
(function () {
  'use strict';

  /* ---------- helpers ---------- */
  var DEV = '०१२३४५६७८९';
  function dev(n) {
    return String(n).replace(/[0-9]/g, function (d) { return DEV[+d]; });
  }
  /* Same dual-span pattern the build writes, so a live count can be switched. */
  function num(n) {
    return '<span class="num"><span class="num-l">' + n + '</span>' +
      '<span class="num-d">' + dev(n) + '</span></span>';
  }
  /* Wrap every digit run inside a mixed string (dates, "12 of 40", …). */
  function numText(str) {
    return String(str).replace(/[0-9]+/g, function (run) {
      return '<span class="num"><span class="num-l">' + run + '</span>' +
        '<span class="num-d">' + dev(run) + '</span></span>';
    });
  }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  /* Devanagari-insensitive comparison for the filters. */
  function vnorm(s) {
    return String(s || '').toLowerCase()
      .replace(/[\u093C\u0901\u0902]/g, '')
      /* सुंई / सुई — the same word, two spellings. */
      .replace(/\u0941\u0902\u0908/g, '\u0941\u0908');
  }
  function debounce(fn, ms) {
    var t;
    return function () {
      var a = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, a); }, ms);
    };
  }

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.innerWidth < 880) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !nav.classList.contains('is-open')) return;
      /* Let an open dialog handle its own Escape first. */
      if (document.querySelector('dialog[open]')) return;
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    });
  }

  /* close the desktop "more" menu on outside click / Escape */
  document.querySelectorAll('details.nav-more').forEach(function (d) {
    document.addEventListener('click', function (e) {
      if (d.open && !d.contains(e.target)) d.removeAttribute('open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && d.open) d.removeAttribute('open');
    });
  });

  /* ---------- reading preferences ---------- */
  var PREF_KEY = 'pp.prefs';
  var PREF_DEFAULTS = { theme: 'paper', font: 'serif', size: 'm', measure: 'normal', motion: 'on', numerals: 'latin' };
  var prefsDialog = document.getElementById('prefs-dialog');

  function readPrefs() {
    var p = {};
    try { p = JSON.parse(localStorage.getItem(PREF_KEY) || '{}') || {}; } catch (e) {}
    return {
      theme: p.theme || PREF_DEFAULTS.theme,
      font: p.font || PREF_DEFAULTS.font,
      size: p.size || PREF_DEFAULTS.size,
      measure: p.measure || PREF_DEFAULTS.measure,
      motion: p.motion || PREF_DEFAULTS.motion,
      numerals: p.numerals || PREF_DEFAULTS.numerals
    };
  }
  function applyPrefs(p) {
    var d = document.documentElement;
    d.setAttribute('data-theme', p.theme);
    d.setAttribute('data-font', p.font);
    d.setAttribute('data-size', p.size);
    d.setAttribute('data-measure', p.measure);
    d.setAttribute('data-motion', p.motion);
    d.setAttribute('data-numerals', p.numerals);
  }
  function savePrefs(p) {
    try { localStorage.setItem(PREF_KEY, JSON.stringify(p)); } catch (e) {}
    applyPrefs(p);
  }
  function syncPrefsForm() {
    if (!prefsDialog) return;
    var p = readPrefs();
    Object.keys(p).forEach(function (k) {
      var input = prefsDialog.querySelector('input[name="' + k + '"][value="' + p[k] + '"]');
      if (input) input.checked = true;
    });
  }
  applyPrefs(readPrefs());
  syncPrefsForm();

  if (prefsDialog) {
    document.querySelectorAll('[data-open-prefs]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        syncPrefsForm();
        if (typeof prefsDialog.showModal === 'function') prefsDialog.showModal();
        else prefsDialog.setAttribute('open', '');
      });
    });
    document.querySelectorAll('[data-close-prefs]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (typeof prefsDialog.close === 'function') prefsDialog.close();
        else prefsDialog.removeAttribute('open');
      });
    });
    prefsDialog.addEventListener('change', function (e) {
      if (!e.target.name) return;
      var p = readPrefs();
      p[e.target.name] = e.target.value;
      savePrefs(p);
    });
    prefsDialog.addEventListener('click', function (e) {
      if (e.target === prefsDialog) prefsDialog.close();
    });
    document.querySelectorAll('[data-prefs-reset]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        try { localStorage.removeItem(PREF_KEY); } catch (e) {}
        applyPrefs(PREF_DEFAULTS);
        syncPrefsForm();
      });
    });
  }

  /* ---------- tabs ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = Array.prototype.slice.call(group.querySelectorAll('.tab'));
    function select(tab) {
      tabs.forEach(function (t) {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) p.hidden = true;
      });
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      var panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (panel) panel.hidden = false;
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') next = tabs[0];
        if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next); next.focus(); }
      });
    });
  });

  /* ---------- village directory ---------- */
  var villageBody = document.getElementById('village-body');
  if (villageBody) {
    var rows = Array.prototype.slice.call(villageBody.querySelectorAll('tr'));
    var q = document.getElementById('village-q');
    var patti = document.getElementById('village-patti');
    var gotra = document.getElementById('village-gotra');
    var count = document.getElementById('village-count');
    var empty = document.getElementById('village-empty');

    function apply() {
      var term = vnorm(q ? q.value.trim() : '');
      var p = patti ? patti.value : '';
      var g = gotra ? gotra.value : '';
      var shown = 0;
      rows.forEach(function (r) {
        var hay = vnorm(r.dataset.name + ' ' + r.dataset.gotras + ' ' + r.dataset.patti);
        var ok = (!term || hay.indexOf(term) !== -1) &&
                 (!p || r.dataset.pattiKey === p) &&
                 (!g || r.dataset.gotras.indexOf(g) !== -1);
        r.hidden = !ok;
        if (ok) shown++;
      });
      if (count) count.innerHTML = num(shown);
      if (empty) empty.hidden = shown !== 0;
    }
    [q, patti, gotra].forEach(function (el) { if (el) el.addEventListener('input', apply); });
    apply();
  }

  /* ---------- verse filter ---------- */
  var verseList = document.getElementById('verse-list');
  if (verseList) {
    var cards = Array.prototype.slice.call(verseList.querySelectorAll('.vcard'));
    var vq = document.getElementById('verse-q');
    var chips = Array.prototype.slice.call(document.querySelectorAll('.filters [data-theme]'));
    var activeTheme = '';
    var vcount = document.getElementById('verse-count');
    function vapply() {
      var term = vnorm(vq ? vq.value.trim() : '');
      var shown = 0;
      cards.forEach(function (c) {
        var hay = vnorm(c.dataset.text + ' ' + (c.dataset.gloss || '') + ' ' + c.dataset.theme + ' ' + c.dataset.type);
        var ok = (!term || hay.indexOf(term) !== -1) &&
                 (!activeTheme || c.dataset.theme.split(' ').indexOf(activeTheme) !== -1);
        c.hidden = !ok;
        if (ok) shown++;
      });
      if (vcount) vcount.innerHTML = num(shown);
    }
    if (vq) vq.addEventListener('input', vapply);
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var was = chip.getAttribute('aria-pressed') === 'true';
        chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
        activeTheme = was ? '' : chip.dataset.theme;
        if (!was) chip.setAttribute('aria-pressed', 'true');
        vapply();
      });
    });
  }

  /* ---------- quiz ---------- */
  document.querySelectorAll('.q').forEach(function (q) {
    var opts = q.querySelectorAll('.q__opt');
    var ans = q.querySelector('.q__a');
    opts.forEach(function (o) {
      o.addEventListener('click', function () {
        var right = o.dataset.correct === 'true';
        o.classList.add(right ? 'is-right' : 'is-wrong');
        if (!right) {
          opts.forEach(function (x) { if (x.dataset.correct === 'true') x.classList.add('is-right'); });
        }
        if (ans) ans.classList.add('show');
      });
    });
  });

  /* ---------- copy / share / cite / print ---------- */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () {
        var old = btn.textContent;
        btn.textContent = '✓ लिंक';
        setTimeout(function () { btn.textContent = old; }, 1600);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta); done();
      }
    });
  });

  /* Per-verse permalinks: copy the exact URL, then highlight the verse. */
  document.querySelectorAll('[data-copy-anchor]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-copy-anchor');
      var url = location.origin + location.pathname + '#' + id;
      var done = function () {
        btn.classList.add('is-copied');
        var old = btn.textContent;
        btn.textContent = 'कॉपी हो गया';
        setTimeout(function () { btn.textContent = old; btn.classList.remove('is-copied'); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = url; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta); done();
      }
      if (history.replaceState) history.replaceState(null, '', '#' + id);
      var card = document.getElementById(id);
      if (card && card.scrollIntoView) card.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
  });

  document.querySelectorAll('[data-share]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-share') || document.title;
      var title = btn.getAttribute('data-share-label') || document.title;
      var payload = text + '\n\n' + location.href;
      var copied = function () {
        var old = btn.textContent;
        btn.textContent = 'लिंक कॉपी हो गया';
        setTimeout(function () { btn.textContent = old; }, 1800);
      };
      if (navigator.share) {
        navigator.share({ title: title, text: text, url: location.href }).catch(function () {});
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(payload).then(copied, copied);
        return;
      }
      var ta = document.createElement('textarea');
      ta.value = payload;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-1000px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      copied();
    });
  });

  /* ---------- WhatsApp share ---------- */
  document.querySelectorAll('[data-share-wa]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var title = document.title;
      var payload = title + '\n' + location.href;
      window.open('https://wa.me/?text=' + encodeURIComponent(payload), '_blank', 'noopener');
    });
  });

  /* ---------- verse poster ----------
     Draws a 1080×1350 keepsake card and hands it to the share sheet (or
     downloads it). toDataURL keeps everything synchronous, so Safari still
     has the click's transient activation when navigator.share is called. */
  function wrapLines(ctx, text, maxWidth) {
    var out = [];
    String(text || '').split('\n').forEach(function (para) {
      var words = para.split(/\s+/).filter(Boolean);
      var line = '';
      words.forEach(function (w) {
        var test = line ? line + ' ' + w : w;
        if (ctx.measureText(test).width > maxWidth && line) { out.push(line); line = w; }
        else line = test;
      });
      if (line) out.push(line);
    });
    return out;
  }

  function drawPoster(text, source) {
    var W = 1080, H = 1350;
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var x = c.getContext('2d');
    if (!x) return null;

    /* paper + double gold frame */
    x.fillStyle = '#f8f3e8';
    x.fillRect(0, 0, W, H);
    x.strokeStyle = 'rgba(166,124,46,.45)';
    x.lineWidth = 2;
    x.strokeRect(52, 52, W - 104, H - 104);
    x.strokeStyle = 'rgba(166,124,46,.20)';
    x.lineWidth = 1;
    x.strokeRect(66, 66, W - 132, H - 132);

    /* seal: ring, needle, thread */
    var cx = W / 2, cy = 190, r = 52;
    x.strokeStyle = '#97382a'; x.lineWidth = 2.4;
    x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke();
    x.strokeStyle = 'rgba(166,124,46,.75)'; x.lineWidth = 1;
    x.beginPath(); x.arc(cx, cy, r - 8, 0, Math.PI * 2); x.stroke();
    x.strokeStyle = '#97382a'; x.lineWidth = 4; x.lineCap = 'round';
    x.beginPath(); x.moveTo(cx + 20, cy - 20); x.lineTo(cx - 22, cy + 22); x.stroke();
    x.lineWidth = 2;
    x.beginPath(); x.ellipse(cx + 24, cy - 24, 4, 9, -Math.PI / 4, 0, Math.PI * 2); x.stroke();
    x.strokeStyle = 'rgba(166,124,46,.85)'; x.lineWidth = 2;
    x.beginPath(); x.moveTo(cx + 14, cy - 30);
    x.bezierCurveTo(cx - 18, cy - 46, cx - 46, cy - 6, cx - 24, cy + 18); x.stroke();

    /* wordmark */
    x.textAlign = 'center';
    x.fillStyle = '#1a1613';
    x.font = '400 46px "Tiro Devanagari Hindi", Georgia, serif';
    x.fillText('पीपा परंपरा', cx, cy + 112);
    x.fillStyle = '#665a50';
    x.font = '400 15px "Noto Sans Devanagari", system-ui, sans-serif';
    var mark = 'P I P A   P A R A M P A R A';
    x.fillText(mark, cx, cy + 148);

    /* hairline */
    x.strokeStyle = 'rgba(166,124,46,.5)'; x.lineWidth = 1;
    x.beginPath(); x.moveTo(160, 382); x.lineTo(W - 160, 382); x.stroke();

    /* verse: shrink until it fits the space above the source line */
    var maxW = 800;
    var avail = 640; /* from y=440 to y=1080 */
    var size = 72;
    var lines, lh;
    var paras = String(text || '').split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
    for (;;) {
      x.font = '400 ' + size + 'px "Noto Serif Devanagari", Georgia, serif';
      lines = wrapLines(x, text, maxW);
      lh = size * 1.62;
      /* Prefer one visual line per poetic line, so a doha keeps its caesura. */
      var keepsLineation = paras.length < 2 || lines.length === paras.length;
      if ((lines.length * lh <= avail && keepsLineation) || size <= 34) break;
      size -= 2;
    }
    /* Centre the verse in the body area between the rule and the source line. */
    var bodyTop = 400, bodyBottom = 1110;
    var blockH = lines.length * lh;
    var startY = bodyTop + (bodyBottom - bodyTop) / 2 - blockH / 2 + size * 0.78;
    x.fillStyle = '#1a1613';
    x.font = '400 ' + size + 'px "Noto Serif Devanagari", Georgia, serif';
    lines.forEach(function (line, i) {
      x.fillText(line, cx, startY + i * lh);
    });

    /* source + footer */
    if (source) {
      x.fillStyle = '#665a50';
      x.font = '400 25px "Noto Sans Devanagari", system-ui, sans-serif';
      var src = wrapLines(x, 'स्रोत: ' + source, 800)[0] || '';
      if (src.length > 86) src = src.slice(0, 84) + '…';
      x.fillText(src, cx, 1140);
    }
    x.strokeStyle = 'rgba(26,22,19,.16)'; x.lineWidth = 1;
    x.beginPath(); x.moveTo(160, 1196); x.lineTo(W - 160, 1196); x.stroke();
    x.fillStyle = '#665a50';
    x.font = '400 22px "Noto Sans Devanagari", system-ui, sans-serif';
    x.fillText('pipaparampara.in', cx, 1244);

    return c;
  }

  function dataURLToBlob(url) {
    var parts = String(url).split(',');
    var mime = (parts[0].match(/:(.*?);/) || [])[1] || 'image/png';
    var bin = atob(parts[1]);
    var arr = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: mime });
  }

  document.querySelectorAll('[data-poster]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-poster') || '';
      var source = btn.getAttribute('data-poster-src') || '';
      var canvas = drawPoster(text, source);
      if (!canvas) return;
      var blob = dataURLToBlob(canvas.toDataURL('image/png'));
      var file = new File([blob], 'pipa-parampara.png', { type: 'image/png' });
      var old = btn.textContent;
      var done = function (msg) {
        btn.textContent = msg;
        setTimeout(function () { btn.textContent = old; }, 2200);
      };
      /* Phones get the share sheet; a desktop click downloads the file. */
      var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      if (coarse && navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], text: text }).then(function () {
          done(old);
        }, function () { done(old); });
        return;
      }
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'pipa-parampara.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
      done('सहेजा गया');
    });
  });

  document.querySelectorAll('[data-print]').forEach(function (btn) {
    btn.addEventListener('click', function () { window.print(); });
  });

  var hiDate = new Intl.DateTimeFormat('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  document.querySelectorAll('[data-date]').forEach(function (el) {
    try { el.innerHTML = numText(hiDate.format(new Date())); } catch (e) {}
  });
  document.querySelectorAll('[data-copy-cite]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cite = document.querySelector('[data-cite]');
      if (!cite) return;
      var text = cite.textContent.replace(/\s+/g, ' ').trim();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () {
          var old = btn.textContent;
          btn.textContent = 'कॉपी हो गया';
          setTimeout(function () { btn.textContent = old; }, 1600);
        });
      }
    });
  });

  /* ---------- generic tag filter ---------- */
  document.querySelectorAll('[data-filter-group]').forEach(function (group) {
    var btns = Array.prototype.slice.call(group.querySelectorAll('[data-filter]'));
    var targetSel = group.getAttribute('data-filter-target');
    var items = Array.prototype.slice.call(document.querySelectorAll(targetSel || '[data-tags]'));
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = btn.getAttribute('data-filter');
        var was = btn.getAttribute('aria-pressed') === 'true';
        btns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        if (was) { val = ''; } else { btn.setAttribute('aria-pressed', 'true'); }
        items.forEach(function (el) {
          var tags = el.getAttribute('data-tags') || '';
          el.hidden = !!val && tags.indexOf(val) === -1;
        });
      });
    });
  });

  /* ---------- mailto contribution form ---------- */
  document.querySelectorAll('[data-mailto-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var to = form.getAttribute('data-to');
      var subject = form.getAttribute('data-subject') || 'संदेश';
      var lines = [];
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name || !el.value) return;
        var label = el.id ? (form.querySelector('label[for="' + el.id + '"]') || {}) : {};
        lines.push((label.textContent || el.name) + ': ' + el.value);
      });
      var href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));
      window.location.href = href;
    });
  });

  /* ---------- current year, in Devanagari ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.innerHTML = num(new Date().getFullYear());
  });

  /* ==========================================================================
     Site search
     ========================================================================== */

  var SEARCH_INDEX = null;
  var SEARCH_LOADING = null;
  var searchScope = '';

  function loadIndex() {
    if (SEARCH_INDEX) return Promise.resolve(SEARCH_INDEX);
    if (SEARCH_LOADING) return SEARCH_LOADING;
    SEARCH_LOADING = fetch('search-index.json', { credentials: 'same-origin' })
      .then(function (r) {
        if (!r.ok) throw new Error('search index ' + r.status);
        return r.json();
      })
      .then(function (data) {
        SEARCH_INDEX = data;
        return data;
      })
      .catch(function (err) {
        SEARCH_LOADING = null;
        throw err;
      });
    return SEARCH_LOADING;
  }

  function norm(s) {
    return String(s || '')
      .normalize('NFC')
      .toLowerCase()
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/[\u093C\u0901\u0902\u0903\u0951-\u0954]/g, '')
      .replace(/\u0941\u0902\u0908/g, '\u0941\u0908')
      .replace(/[०-९]/g, function (d) { return String(DEV.indexOf(d)); })
      .replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function tokensOf(q) {
    return norm(q).split(' ').filter(Boolean);
  }

  function rank(q, scope, limit) {
    var nq = norm(q);
    var toks = tokensOf(q);
    if (!nq) return [];
    var out = [];
    SEARCH_INDEX.forEach(function (e) {
      if (scope && e.s !== scope) return;
      var nt = norm(e.t), np = norm(e.p), nx = norm(e.x);
      /* r holds romanised spellings: "samdari", "samadari", "smdri".
         Matched only — never shown, so snippets stay in the page's script. */
      var nr = e.r ? norm(e.r) : '';
      /* Vowel-stripped skeleton: "pachpadra" and "pachapadara" collapse to
         the same consonants, which covers the many ways a place name gets
         typed in Latin. Cached on the entry, computed at most once. */
      if (nr && !e._sk) e._sk = nr.replace(/[^a-z]/g, '').replace(/[aeiou]/g, '');
      if (!nt && !nx) return;
      var score = 0;
      if (nt === nq) score += 120;
      else if (nt.indexOf(nq) === 0) score += 72;
      else if (nt.indexOf(nq) !== -1) score += 46;
      if (np.indexOf(nq) !== -1) score += 24;
      if (nx.indexOf(nq) !== -1) score += 16;
      if (nr && nr.indexOf(nq) !== -1) score += 22;
      var hits = 0;
      for (var i = 0; i < toks.length; i++) {
        var t = toks[i];
        if (nt.indexOf(t) !== -1) { score += 14; hits++; }
        else if (nx.indexOf(t) !== -1) { score += 5; hits++; }
        else if (np.indexOf(t) !== -1) { score += 6; hits++; }
        else if (nr && nr.indexOf(t) !== -1) { score += 7; hits++; }
        else if (e._sk && /^[a-z]{4,}$/.test(t) && e._sk.indexOf(t.replace(/[aeiou]/g, '')) !== -1) { score += 5; hits++; }
      }
      if (hits === toks.length && toks.length > 1) score += 12;
      /* Weight is a tie-breaker, never a reason to match on its own. */
      if (score <= 0) return;
      if (e.w) score += e.w;
      out.push({ e: e, score: score });
    });
    out.sort(function (a, b) {
      return b.score - a.score || String(a.e.u).localeCompare(String(b.e.u));
    });
    /* The 204-row village table would otherwise fill the whole list.
       Keep the five best hits per page, then let the rest fill the tail. */
    var n = limit || 24, seen = {}, head = [], tail = [];
    for (var i = 0; i < out.length; i++) {
      var page = out[i].e.p;
      seen[page] = (seen[page] || 0) + 1;
      if (seen[page] <= 5) head.push(out[i]);
      else tail.push(out[i]);
    }
    return head.concat(tail).slice(0, n);
  }

  function snippet(text, toks) {
    var words = String(text || '').split(/\s+/).filter(Boolean);
    if (!words.length) return '';
    var found = -1;
    for (var i = 0; i < words.length && found < 0; i++) {
      var nw = norm(words[i]);
      if (toks.some(function (t) { return nw.indexOf(t) !== -1; })) found = i;
    }
    if (found < 0) found = 0;
    var from = Math.max(0, found - 11);
    var to = Math.min(words.length, found + 22);
    var html = words.slice(from, to).map(function (w) {
      var nw = norm(w);
      var hit = toks.some(function (t) { return nw.indexOf(t) !== -1; });
      return hit ? '<mark>' + esc(w) + '</mark>' : esc(w);
    }).join(' ');
    return (from > 0 ? '… ' : '') + html + (to < words.length ? ' …' : '');
  }

  function resultHTML(r, toks) {
    var e = r.e;
    /* The index is stored in Western digits; numText() lets a result follow
       the reader's numeral preference like the page it comes from. */
    return '<a href="' + esc(e.u) + '">' +
      '<span class="sr__page">' + numText(esc(e.p)) + '</span>' +
      '<strong class="sr__title">' + numText(esc(e.t)) + '</strong>' +
      '<span class="sr__snippet">' + numText(snippet(e.x, toks)) + '</span>' +
      '</a>';
  }

  /* ---------- search dialog ---------- */
  var searchDialog = document.getElementById('search-dialog');
  var searchInput = document.getElementById('site-search');
  var searchResults = document.getElementById('search-results');
  var searchStatus = document.getElementById('search-status');
  var searchEmpty = document.getElementById('search-empty');
  var searchSuggest = document.getElementById('search-suggest');
  var activeResult = -1;

  /* Suggestions only make sense while the field is still empty. */
  function syncSuggest() {
    if (searchSuggest) searchSuggest.hidden = !!(searchInput && searchInput.value.trim());
  }

  function setResults(html) {
    if (!searchResults) return;
    searchResults.innerHTML = html;
    activeResult = -1;
  }
  function resultsLinks() {
    return searchResults ? Array.prototype.slice.call(searchResults.querySelectorAll('a')) : [];
  }
  function moveActive(delta) {
    var links = resultsLinks();
    if (!links.length) return;
    if (activeResult >= 0) links[activeResult].classList.remove('is-active');
    activeResult = (activeResult + delta + links.length) % links.length;
    links[activeResult].classList.add('is-active');
    links[activeResult].scrollIntoView({ block: 'nearest' });
  }
  function openSearch(term) {
    if (!searchDialog) return;
    if (searchDialog.open) {
      if (term != null) { searchInput.value = term; runDialogSearch(); }
      searchInput.focus();
      return;
    }
    if (typeof searchDialog.showModal === 'function') searchDialog.showModal();
    else searchDialog.setAttribute('open', '');
    if (term != null) searchInput.value = term;
    syncSuggest();
    setTimeout(function () { searchInput.focus(); }, 30);
    if (term) runDialogSearch();
  }
  function closeSearch() {
    if (!searchDialog) return;
    if (typeof searchDialog.close === 'function') searchDialog.close();
    else searchDialog.removeAttribute('open');
  }
  function runDialogSearch() {
    if (!searchInput || !searchResults) return;
    var q = searchInput.value.trim();
    syncSuggest();
    if (!q) {
      setResults('');
      if (searchStatus) searchStatus.textContent = '';
      if (searchEmpty) searchEmpty.hidden = true;
      return;
    }
    if (searchStatus) searchStatus.textContent = 'खोजा जा रहा है…';
    loadIndex().then(function () {
      var res = rank(q, searchScope, 24);
      var toks = tokensOf(q);
      setResults(res.map(function (r) { return '<li>' + resultHTML(r, toks) + '</li>'; }).join(''));
      if (searchStatus) searchStatus.innerHTML = res.length ? num(res.length) + ' परिणाम' : '';
      if (searchEmpty) searchEmpty.hidden = res.length > 0;
    }).catch(function () {
      if (searchStatus) searchStatus.textContent = 'खोज-सूची लोड नहीं हो सकी।';
      if (searchEmpty) searchEmpty.hidden = false;
    });
  }

  if (searchDialog && searchInput) {
    document.querySelectorAll('[data-open-search]').forEach(function (btn) {
      btn.addEventListener('click', function () { openSearch(); });
    });
    document.querySelectorAll('[data-close-search]').forEach(function (btn) {
      btn.addEventListener('click', closeSearch);
    });
    searchDialog.addEventListener('click', function (e) {
      if (e.target === searchDialog) closeSearch();
    });
    searchDialog.querySelectorAll('[data-scope]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        searchDialog.querySelectorAll('[data-scope]').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        searchScope = btn.getAttribute('data-scope') || '';
        runDialogSearch();
      });
    });
    searchInput.addEventListener('input', debounce(runDialogSearch, 130));
    if (searchSuggest) {
      searchSuggest.querySelectorAll('[data-suggest]').forEach(function (chip) {
        chip.addEventListener('click', function () {
          searchInput.value = chip.getAttribute('data-suggest') || '';
          runDialogSearch();
          searchInput.focus();
        });
      });
    }
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); }
      else if (e.key === 'Enter') {
        var links = resultsLinks();
        if (links.length) {
          e.preventDefault();
          (activeResult >= 0 ? links[activeResult] : links[0]).click();
        }
      }
    });

    document.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      var typing = tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        openSearch();
      } else if (e.key === '/' && !typing && !searchDialog.open) {
        e.preventDefault();
        openSearch();
      }
    });
  }

  /* ---------- full search page ---------- */
  var khojInput = document.getElementById('khoj-q');
  if (khojInput) {
    var khojResults = document.getElementById('khoj-results');
    var khojStatus = document.getElementById('khoj-status');
    var khojEmpty = document.getElementById('khoj-empty');
    var khojScope = '';

    function renderKhoj() {
      var q = khojInput.value.trim();
      var url = new URL(location.href);
      if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
      history.replaceState(null, '', url);

      if (!q) {
        if (khojResults) khojResults.innerHTML = '';
        if (khojStatus) khojStatus.textContent = 'कुछ लिखें — नाम, गाँव, गोत्र, तीर्थ, पद या वाक्य।';
        if (khojEmpty) khojEmpty.hidden = true;
        return;
      }
      if (khojStatus) khojStatus.textContent = 'खोजा जा रहा है…';
      loadIndex().then(function () {
        var res = rank(q, khojScope, 80);
        var toks = tokensOf(q);
        if (khojResults) khojResults.innerHTML = res.map(function (r) { return '<li>' + resultHTML(r, toks) + '</li>'; }).join('');
        if (khojStatus) khojStatus.innerHTML = res.length ? num(res.length) + ' परिणाम मिले' : 'कोई परिणाम नहीं';
        if (khojEmpty) khojEmpty.hidden = res.length > 0;
      }).catch(function () {
        if (khojStatus) khojStatus.textContent = 'खोज-सूची लोड नहीं हो सकी। कृपया पृष्ठ फिर से खोलें।';
      });
    }

    document.querySelectorAll('[data-khoj-scope]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-khoj-scope]').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        khojScope = btn.getAttribute('data-khoj-scope') || '';
        renderKhoj();
      });
    });
    khojInput.addEventListener('input', debounce(renderKhoj, 130));
    document.querySelectorAll('[data-khoj-term]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        khojInput.value = btn.getAttribute('data-khoj-term') || '';
        khojInput.focus();
        renderKhoj();
      });
    });

    var q0 = new URLSearchParams(location.search).get('q');
    if (q0) khojInput.value = q0;
    renderKhoj();
  }

  /* ==========================================================================
     Translation — loaded only when the reader asks for it
     ========================================================================== */

  var langSelect = document.querySelector('[data-lang-select]');
  var GT_LABELS = {
    en: 'English', gu: 'ગુજરાતી', mr: 'मराठी', pa: 'ਪੰਜਾਬੀ', bn: 'বাংলা',
    ta: 'தமிழ்', te: 'తెలుగు', kn: 'ಕನ್ನಡ', ml: 'മലയാളം', or: 'ଓଡ଼ିଆ',
    ur: 'اردو', ne: 'नेपाली', si: 'සිංහල', ar: 'العربية', es: 'Español',
    fr: 'Français', de: 'Deutsch', 'zh-CN': '中文', ja: '日本語'
  };

  function clearTranslateCookie() {
    ['', '; domain=' + location.hostname, '; domain=.' + location.hostname].forEach(function (d) {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
    });
  }

  function setGtStatus(html, state) {
    var banner = document.querySelector('.gt-banner');
    if (banner) banner.setAttribute('data-state', state || 'loading');
    var status = document.querySelector('[data-gt-status]');
    if (status) status.innerHTML = html;
    return status;
  }

  function showTranslateBanner(code) {
    var old = document.querySelector('.gt-banner');
    if (old) old.remove();
    var banner = document.createElement('div');
    banner.className = 'gt-banner notranslate';
    banner.setAttribute('translate', 'no');
    banner.setAttribute('data-state', 'loading');
    banner.innerHTML = '<span data-gt-status>अनुवाद लोड हो रहा है…</span>' +
      '<span style="display:flex;gap:.4rem;flex-wrap:wrap">' +
      '<a href="' + esc(location.href) + '" data-gt-off>मूल हिन्दी</a>' +
      '<button type="button" data-gt-dismiss>बंद करें</button></span>';
    document.body.appendChild(banner);
    banner.querySelector('[data-gt-off]').addEventListener('click', function (e) {
      e.preventDefault();
      clearTranslateCookie();
      try { Object.keys(sessionStorage).forEach(function (k) { if (k.indexOf('pp.gt.') === 0) sessionStorage.removeItem(k); }); } catch (err) {}
      location.reload();
    });
    banner.querySelector('[data-gt-dismiss]').addEventListener('click', function () { banner.remove(); });
    document.body.classList.add('is-translated');
  }

  /* Only claim the page is translated once Google's widget actually switched. */
  function markTranslated(code) {
    setGtStatus('मशीनी अनुवाद: <strong>' + esc(GT_LABELS[code] || code) + '</strong> — मूल पाठ हिन्दी में है।', 'done');
  }

  function isTranslated() {
    return /(?:^|\s)translated-(?:ltr|rtl)(?:\s|$)/.test(document.documentElement.className);
  }

  /* The page an English reader lands on is written in English, not Hindi.
     Read the build-time attribute: Google rewrites <html lang> after translating. */
  function srcLang() {
    var d = document.documentElement;
    var l = (d.getAttribute('data-page-lang') || d.lang || 'hi').toLowerCase();
    return l.indexOf('en') === 0 ? 'en' : 'hi';
  }

  function gtCookie() {
    var m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    if (!m) return null;
    var parts = decodeURIComponent(m[1]).replace(/"/g, '').split('/').filter(Boolean);
    if (!parts.length) return null;
    return {
      src: parts.length > 1 ? parts[0] : srcLang(),
      code: parts[parts.length - 1]
    };
  }

  function gtCookieCode() {
    var c = gtCookie();
    if (!c || c.src !== srcLang()) return '';
    return c.code === 'hi' ? '' : c.code;
  }

  function setGtCookie(code) {
    /* Drop every variant first: two live googtrans cookies make the choice
       ambiguous, which is exactly how "it only works the second time" starts. */
    clearTranslateCookie();
    var cookie = 'googtrans=/' + srcLang() + '/' + code + '; path=/; SameSite=Lax';
    document.cookie = cookie;
    if (location.protocol === 'https:' && /\./.test(location.hostname)) {
      /* also cover www. / apex when the site is served over https */
      document.cookie = cookie + '; domain=.' + location.hostname.replace(/^www\./, '');
    }
  }

  function failTranslate(message) {
    var status = setGtStatus('<span>' + esc(message) + '</span>', 'failed');
    if (!status) return;
    var wrap = document.createElement('span');
    wrap.style.cssText = 'display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.35rem';
    wrap.innerHTML = '<button type="button" data-gt-retry>फिर कोशिश करें</button>' +
      '<a href="en.html">English summary</a>';
    status.appendChild(wrap);
    wrap.querySelector('[data-gt-retry]').addEventListener('click', function () {
      setGtStatus('अनुवाद लोड हो रहा है…', 'loading');
      window.__ppGTInit = false;
      var sc = document.getElementById('gt-script');
      if (sc) sc.remove();
      loadWidget();
      watchTranslation(gtCode);
    });
  }

  var GT_SRC = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  var gtCode = null;
  var gtPoll = null;

  function initGT() {
    if (window.__ppGTInit) return;
    /* global google */
    if (!window.google || !window.google.translate) return;
    window.__ppGTInit = true;
    try {
      new google.translate.TranslateElement({
        pageLanguage: srcLang(),
        includedLanguages: 'en,gu,mr,pa,bn,ta,te,kn,ml,or,ur,ne,si,ar,es,fr,de,zh-CN,ja',
        autoDisplay: false,
        multilanguage: true
      }, 'google_translate_element');
    } catch (e) {
      window.__ppGTInit = false;
    }
  }

  function loadGTScript(bust) {
    var old = document.getElementById('gt-script');
    if (old) old.remove();
    var sc = document.createElement('script');
    sc.id = 'gt-script';
    sc.async = true;
    sc.src = GT_SRC + (bust ? '&_=' + Date.now() : '');
    sc.onerror = function () {
      if (!bust) { setTimeout(function () { loadGTScript(true); }, 500); return; }
      failTranslate('अनुवाद सेवा उपलब्ध नहीं है।');
    };
    document.body.appendChild(sc);
  }

  function loadWidget() {
    window.googleTranslateElementInit = function () { initGT(); };
    if (window.google && window.google.translate) { initGT(); return; }
    if (!document.getElementById('gt-script')) loadGTScript(false);
  }

  /* Google marks <html> with translated-ltr/rtl once the swap really happened.
     Poll for that instead of trusting our own click. */
  function watchTranslation(code) {
    var started = Date.now();
    clearInterval(gtPoll);
    gtPoll = setInterval(function () {
      if (isTranslated()) {
        clearInterval(gtPoll); gtPoll = null;
        markTranslated(gtCookieCode() || code);
        restoreScroll();
        return;
      }
      if (Date.now() - started > 14000) {
        clearInterval(gtPoll); gtPoll = null;
        failTranslate('अनुवाद सेवा उत्तर नहीं दे रही।');
      }
    }, 300);
  }

  function restoreScroll() {
    var y = 0;
    try { y = +(sessionStorage.getItem('pp.gt.scroll') || 0); } catch (e) {}
    if (!y) return;
    try { sessionStorage.removeItem('pp.gt.scroll'); } catch (e) {}
    window.scrollTo(0, y);
  }

  function ensureTranslate(code) {
    gtCode = code;
    if (langSelect) langSelect.value = code;
    showTranslateBanner(code);
    document.querySelectorAll('.site-header, .prefs, .searchdlg, .gt-banner, .site-footer')
      .forEach(function (el) {
        el.classList.add('notranslate');
        el.setAttribute('translate', 'no');
      });

    var current = gtCookieCode();

    /* Another language is live (or none is): write the cookie and reload once.
       Google reads googtrans on load, so the next pass always lands. */
    if (current !== code) {
      try { sessionStorage.setItem('pp.gt.scroll', String(window.scrollY || 0)); } catch (e) {}
      setGtCookie(code);
      setTimeout(function () { location.reload(); }, 120);
      return;
    }

    if (isTranslated()) { markTranslated(code); restoreScroll(); return; }

    loadWidget();
    watchTranslation(code);
  }
  if (langSelect) {
    var cookieCode = gtCookieCode();
    if (cookieCode) {
      langSelect.value = cookieCode;
      /* A reload left the cookie behind: bring the widget back up on its own. */
      ensureTranslate(cookieCode);
    }
    langSelect.addEventListener('change', function () {
      var code = langSelect.value;
      try { Object.keys(sessionStorage).forEach(function (k) { if (k.indexOf('pp.gt.') === 0) sessionStorage.removeItem(k); }); } catch (err) {}
      if (code === 'hi') {
        clearTranslateCookie();
        location.reload();
        return;
      }
      ensureTranslate(code);
    });
  }

  /* ==========================================================================
     Book reader
     ========================================================================== */

  var bookBody = document.querySelector('.book-body');
  var progress = document.querySelector('[data-book-progress]');
  if (bookBody && progress) {
    var ticking = false;
    function updateProgress() {
      ticking = false;
      var rect = bookBody.getBoundingClientRect();
      var total = rect.height - window.innerHeight + 160;
      var p = total > 0 ? (-rect.top + 120) / total : 0;
      progress.style.width = Math.max(0, Math.min(1, p)) * 100 + '%';
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateProgress); }
    }, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();

    var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.book-toc a[href^="#"]'));
    if ('IntersectionObserver' in window && tocLinks.length) {
      var byId = {};
      tocLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          tocLinks.forEach(function (a) { a.classList.remove('is-active'); });
          var link = byId[en.target.id];
          if (link) link.classList.add('is-active');
        });
      }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
      document.querySelectorAll('.chapter[id]').forEach(function (ch) { obs.observe(ch); });
    }
  }
})();
