(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fcfa = function (n) { return Math.round(n).toLocaleString('fr-FR').replace(/[  ]/g, ' ') + ' FCFA'; };

  // Menu mobile
  var btn = $('.menu-btn'), nav = $('#nav');
  if (btn && nav) btn.addEventListener('click', function () {
    var o = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', o ? 'true' : 'false');
  });

  // ---------- Simulateur de frais (tarifs de démonstration)
  var sim = $('#sim');
  if (sim) {
    var F = { m: { n: 'Maternelle', ins: 75000, mens: 55000 }, p: { n: 'Primaire', ins: 85000, mens: 65000 }, c: { n: 'Collège', ins: 110000, mens: 85000 } };
    var CANTINE = 20000, TRANSPORT = 25000, MOIS = 10;
    var count = 1, out = $('#sim-count'), box = $('#children'), rec = $('#receipt-body');
    var cycleOpts = '<option value="m">Maternelle (3 à 5 ans)</option><option value="p" selected>Primaire (6 à 11 ans)</option><option value="c">Collège (12 à 15 ans)</option>';
    var render = function () {
      var old = $$('select', box).map(function (s) { return s.value; });
      box.innerHTML = '';
      for (var i = 0; i < count; i++) {
        var row = document.createElement('div'); row.className = 'child-row';
        row.innerHTML = '<span>Enfant ' + (i + 1) + '</span><select aria-label="Cycle de l’enfant ' + (i + 1) + '">' + cycleOpts + '</select>';
        var sel = $('select', row); if (old[i]) sel.value = old[i];
        sel.addEventListener('change', calc);
        box.appendChild(row);
      }
      out.textContent = count;
      calc();
    };
    var calc = function () {
      var kids = $$('select', box).map(function (s) { return F[s.value]; }).sort(function (a, b) { return b.mens - a.mens; });
      var ins = 0, brut = 0, remise = 0;
      kids.forEach(function (k, i) {
        ins += k.ins; brut += k.mens;
        remise += k.mens * (i === 0 ? 0 : i === 1 ? 0.10 : 0.15);
      });
      var cant = $('#cantine').checked ? CANTINE * count : 0;
      var trans = $('#transport').checked ? TRANSPORT * count : 0;
      var mens = brut - remise + cant + trans;
      var an = ins + mens * MOIS;
      var h = '<div class="ln"><span>Frais d’inscription (une fois)</span><span>' + fcfa(ins) + '</span></div>' +
        '<div class="ln"><span>Scolarité / mois</span><span>' + fcfa(brut) + '</span></div>' +
        (remise ? '<div class="ln disc"><span>Réduction fratrie</span><span>− ' + fcfa(remise) + '</span></div>' : '') +
        (cant ? '<div class="ln"><span>Cantine / mois</span><span>' + fcfa(cant) + '</span></div>' : '') +
        (trans ? '<div class="ln"><span>Transport / mois</span><span>' + fcfa(trans) + '</span></div>' : '') +
        '<div class="tot"><span>Par mois</span><span>' + fcfa(mens) + '</span></div>' +
        '<p class="big">' + fcfa(an) + '</p><small>Total estimé sur l’année (inscription + ' + MOIS + ' mensualités)</small>';
      rec.innerHTML = h;
    };
    $('#plus').addEventListener('click', function () { if (count < 5) { count++; render(); } });
    $('#minus').addEventListener('click', function () { if (count > 1) { count--; render(); } });
    $('#cantine').addEventListener('change', calc);
    $('#transport').addEventListener('change', calc);
    render();
  }

  // ---------- Formulaire d'inscription en 3 étapes
  var reg = $('#reg');
  if (reg) {
    var steps = $$('.step', reg), dots = $$('.progress li'), cur = 0;
    var show = function (n) {
      cur = n;
      steps.forEach(function (s, i) { s.classList.toggle('on', i === n); });
      dots.forEach(function (d, i) { d.classList.toggle('on', i === n); d.classList.toggle('done', i < n); d.setAttribute('aria-current', i === n ? 'step' : 'false'); });
      var h = $('h3', steps[n]); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
    };
    var valid = function (scope) {
      var ok = true;
      $$('[required]', scope).forEach(function (f) {
        var v = f.type === 'checkbox' ? f.checked : f.value.trim() !== '';
        if (f.type === 'tel' && v) v = /^[+\d][\d\s().-]{7,}$/.test(f.value.trim());
        var e = $('[data-err-for="' + f.id + '"]', scope); if (e) e.classList.toggle('show', !v);
        f.setAttribute('aria-invalid', v ? 'false' : 'true');
        if (!v) ok = false;
      });
      var bad = $('[aria-invalid="true"]', scope); if (bad) bad.focus();
      return ok;
    };
    $$('[data-next]', reg).forEach(function (b) {
      b.addEventListener('click', function () {
        if (!valid(steps[cur])) return;
        if (cur === 1) {
          var g = function (id) { return $('#' + id).value; };
          var d = g('r-naiss') ? new Date(g('r-naiss')).toLocaleDateString('fr-FR') : '';
          $('#recap').innerHTML = '<li><span>Enfant</span><strong>' + esc(g('r-prenom')) + '</strong></li><li><span>Classe visée</span><strong>' + esc(g('r-classe')) + '</strong></li><li><span>Date de naissance</span><strong>' + esc(d) + '</strong></li><li><span>Parent</span><strong>' + esc(g('r-parent')) + '</strong></li><li><span>Téléphone</span><strong>' + esc(g('r-tel')) + '</strong></li>';
        }
        show(cur + 1);
      });
    });
    $$('[data-prev]', reg).forEach(function (b) { b.addEventListener('click', function () { show(cur - 1); }); });
    reg.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!valid(steps[cur])) return;
      var no = 'LP-2027-' + String(Math.floor(1000 + Math.random() * 9000));
      $('#dossier').textContent = no;
      steps.forEach(function (s) { s.classList.remove('on'); });
      dots.forEach(function (d) { d.classList.remove('on'); d.classList.add('done'); });
      var ok = $('.ok', reg); ok.classList.add('show'); ok.setAttribute('tabindex', '-1'); ok.focus();
    });
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // ---------- Calendrier filtrable
  var chips = $$('.chips button[data-cycle]');
  chips.forEach(function (b) {
    b.addEventListener('click', function () {
      var c = b.getAttribute('data-cycle');
      chips.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      var n = 0;
      $$('.cal li').forEach(function (li) {
        var m = c === 'all' || li.getAttribute('data-cycles').split(' ').indexOf(c) > -1;
        li.hidden = !m; if (m) n++;
      });
      var live = $('#cal-count'); if (live) live.textContent = n + (n > 1 ? ' dates affichées' : ' date affichée');
    });
  });

  // ---------- Réservation de visite
  var visit = $('#visit');
  if (visit) {
    var days = $('#days'), d = new Date(), made = 0, names = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'], mois = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    while (made < 6) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() === 0) continue;
      var lbl = names[d.getDay()] + ' ' + d.getDate() + ' ' + mois[d.getMonth()];
      days.insertAdjacentHTML('beforeend', '<label><input type="radio" name="jour" value="' + lbl + '"' + (made === 0 ? ' checked' : '') + '><span>' + lbl + '</span></label>');
      made++;
    }
    visit.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      $$('[required]', visit).forEach(function (f) {
        var v = f.type === 'checkbox' ? f.checked : f.value.trim() !== '';
        if (f.type === 'tel' && v) v = /^[+\d][\d\s().-]{7,}$/.test(f.value.trim());
        var er = $('[data-err-for="' + f.id + '"]', visit); if (er) er.classList.toggle('show', !v);
        f.setAttribute('aria-invalid', v ? 'false' : 'true');
        if (!v) ok = false;
      });
      if (!ok) { var b = $('[aria-invalid="true"]', visit); if (b) b.focus(); return; }
      var j = $('input[name=jour]:checked', visit).value, h = $('input[name=heure]:checked', visit).value;
      $('#visit-when').textContent = j + ' à ' + h;
      $('#visit-name').textContent = $('#v-nom').value.trim();
      $('.fields', visit).hidden = true;
      var ko = $('.ok', visit); ko.classList.add('show'); ko.setAttribute('tabindex', '-1'); ko.focus();
    });
  }
})();
