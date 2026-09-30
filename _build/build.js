// Génère les pages HTML statiques : node _build/build.js
const fs = require('fs');
const path = require('path');
const out = path.join(__dirname, '..');

const SITE = 'Groupe Scolaire Les Palmiers';
const CODE_AZ_URL = 'https://agnissanisaac.com';
const PHONE = '+225 27 22 00 00 00';
const WA = 'https://wa.me/2250700000000?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20les%20inscriptions.';

const waIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"/></svg>';
const logo = '<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="16" fill="#1E4FBF"/><circle cx="44" cy="20" r="9" fill="#F7B928"/><path d="M30 56V30" stroke="#FBFAF5" stroke-width="4" stroke-linecap="round"/><path d="M30 30C22 30 14 26 10 19c9-1 17 2 20 11z" fill="#3FA66B"/><path d="M30 30c8 0 14-4 18-11-9-1-16 2-18 11z" fill="#3FA66B"/><path d="M30 30c-2-8-8-13-15-14 4 6 9 10 15 14z" fill="#8BD3A8"/></svg>';

const ico = {
  people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.500 6 6M15 14.300c3.300-.6 6 1.500 6 4.700"/></svg>',
  pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1-5L16 4l4 4L9 19z"/><path d="M14 6l4 4"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9z"/></svg>',
};

const navItems = [['cycles.html', 'Nos cycles'], ['vie-ecole.html', 'Vie de l’école'], ['resultats.html', 'Résultats'], ['contact.html', 'Contact']];

function head({ title, desc, schema, preload }) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#1E4FBF">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preload" href="fonts/nunito-latin-800-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
${preload || ''}<link rel="stylesheet" href="css/style.css">
${schema || ''}</head>
<body>
<a class="skip" href="#contenu">Aller au contenu</a>
`;
}

function header(current) {
  const links = navItems.map(([h, l]) => `<li><a href="${h}"${h === current ? ' aria-current="page"' : ''}>${l}</a></li>`).join('');
  return `<header class="site-header"><div class="header-in">
<a class="brand" href="index.html" aria-label="${SITE}, accueil">${logo}<span><strong>Les Palmiers</strong><small>Groupe scolaire · Abidjan</small></span></a>
<button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>
<nav class="nav" id="nav" aria-label="Navigation principale"><ul>${links}</ul><a class="btn sun small" href="inscription.html">Inscrire mon enfant</a></nav>
</div></header>
<main id="contenu">
`;
}

function footer() {
  return `</main>
<footer class="site-footer"><div class="wrap">
<div class="foot-grid">
<div><p class="foot-brand">Groupe Scolaire Les Palmiers</p><p>Maternelle, primaire et collège à Abidjan.</p><p><a href="inscription.html">Inscrire mon enfant</a></p></div>
<div><h2>Secrétariat</h2><p>Rue des Jasmins, Riviera 3<br>Cocody, Abidjan<br><a href="tel:+22527220000000">${PHONE}</a></p><p>Lundi au vendredi : 7 h 30 – 16 h 30<br>Samedi : 8 h – 12 h</p></div>
<div><h2>L’école</h2><ul><li><a href="cycles.html">Nos cycles</a></li><li><a href="vie-ecole.html">Vie de l’école</a></li><li><a href="resultats.html">Résultats et actualités</a></li><li><a href="inscription.html">Inscription</a></li><li><a href="contact.html">Contact et visite</a></li><li><a href="confidentialite.html">Confidentialité</a></li></ul></div>
</div>
<div class="legal"><span>© 2026 ${SITE}. Site de démonstration : école, personnes et chiffres fictifs.</span>
<span class="signature">Site créé par <a href="${CODE_AZ_URL}" rel="noopener">Code AZ</a> · agence web</span></div>
</div></footer>
<a class="wa" href="${WA}" rel="noopener" aria-label="Écrire au secrétariat sur WhatsApp">${waIcon}<span>Secrétariat</span></a>
<script src="js/main.js" defer></script>
</body>
</html>
`;
}

const title = (tag, h1, lead, cls = '') => `<div class="page-title"><div class="wrap"><span class="tag ${cls}">${tag}</span><h1>${h1}</h1><p class="lead">${lead}</p></div></div>\n`;

const pages = {};

// ================= ACCUEIL
const schema = `<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'School', name: SITE,
  description: 'Groupe scolaire privé à Abidjan : maternelle, primaire et collège.',
  telephone: PHONE,
  address: { '@type': 'PostalAddress', streetAddress: 'Rue des Jasmins, Riviera 3', addressLocality: 'Abidjan', addressRegion: 'Cocody', addressCountry: 'CI' },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '16:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '12:00' }],
})}</script>
`;
pages['index.html'] = head({ title: 'Groupe Scolaire Les Palmiers · École privée à Abidjan', desc: 'École privée à Abidjan : maternelle, primaire et collège. Petits effectifs, suivi individuel, simulateur de frais et inscription en ligne.', schema, preload: '<link rel="preload" href="img/fournitures.webp" as="image" type="image/webp">\n' })
+ header('') + `
<section class="hero"><div class="wrap hero-grid">
<div>
<span class="tag">Maternelle · Primaire · Collège</span>
<h1>Des élèves <mark>épanouis</mark>, des résultats qui parlent.</h1>
<p class="lead">Un groupe scolaire à Cocody où chaque enfant est connu par son prénom : petits effectifs, suivi individuel et une école où l’on se sent en sécurité.</p>
<div class="hero-actions"><a class="btn" href="inscription.html">Inscrire mon enfant</a><a class="btn line" href="contact.html#visite">Visiter l’école</a></div>
</div>
<div class="hero-art">
<figure class="taped"><img src="img/fournitures.webp" width="1000" height="693" alt="Crayons de couleur, crayon à papier, stylo, colle et ciseaux rouges posés à plat" fetchpriority="high"><figcaption>La rentrée se prépare dès maintenant</figcaption></figure>
<div class="note">Inscriptions ouvertes<small>Rentrée 2027 · dossiers jusqu’au 30 juin</small></div>
</div>
</div></section>

<section class="bulletin" style="padding-top:0"><div class="wrap"><div class="sheet">
<span class="pen">Très bien !</span>
<ul class="stats">
<li><strong>97 %</strong><span>de réussite au CEPE</span></li>
<li><strong>91 %</strong><span>de réussite au BEPC</span></li>
<li><strong>22</strong><span>élèves par classe au maximum</span></li>
<li><strong>18 ans</strong><span>d’existence de l’école</span></li>
</ul>
</div></div></section>

<section style="padding-top:20px"><div class="wrap">
<div class="sec-head"><span class="tag b">Les cycles</span><h2>De 3 à 15 ans, <mark>un même fil</mark>.</h2><p>Chaque cycle garde le même esprit : apprendre avec plaisir, avancer à son rythme et être bien encadré.</p></div>
<div class="covers">
<article class="cover m"><div class="label"><h3>Maternelle</h3><span>3 à 5 ans · Petite, moyenne et grande section</span></div><div class="body"><ul><li>Éveil, langage et graphisme</li><li>Jeux, musique et motricité</li><li>Premiers mots d’anglais</li></ul><a href="cycles.html#maternelle">Découvrir la maternelle →</a></div></article>
<article class="cover p"><div class="label"><h3>Primaire</h3><span>6 à 11 ans · Du CP1 au CM2</span></div><div class="body"><ul><li>Lecture, écriture, calcul</li><li>Anglais, sciences, informatique</li><li>Préparation au CEPE</li></ul><a href="cycles.html#primaire">Découvrir le primaire →</a></div></article>
<article class="cover c"><div class="label"><h3>Collège</h3><span>12 à 15 ans · De la 6<sup>e</sup> à la 3<sup>e</sup></span></div><div class="body"><ul><li>Toutes les matières du programme</li><li>Soutien et études surveillées</li><li>Préparation au BEPC</li></ul><a href="cycles.html#college">Découvrir le collège →</a></div></article>
</div></div></section>

<section class="soft"><div class="wrap">
<div class="sec-head"><span class="tag g">Pourquoi nous choisir</span><h2>Ce qui compte pour <mark>les parents</mark>.</h2></div>
<div class="why">
<article><div class="ico">${ico.people}</div><h3>Petits effectifs</h3><p>22 élèves au maximum par classe, pour que chaque enfant soit vu et entendu.</p></article>
<article><div class="ico">${ico.pen}</div><h3>Suivi individuel</h3><p>Un carnet de suivi, des points réguliers avec les parents et un soutien si besoin.</p></article>
<article><div class="ico">${ico.shield}</div><h3>Sécurité</h3><p>Accueil surveillé, sorties contrôlées et personnel présent à chaque récréation.</p></article>
<article><div class="ico">${ico.star}</div><h3>Activités</h3><p>Théâtre, football, robotique, musique, anglais et échecs, après la classe.</p></article>
</div></div></section>

<section><div class="wrap">
<div class="sec-head"><span class="tag">Une journée type</span><h2>De l’accueil à <mark>la sortie</mark>.</h2><p>Un emploi du temps rythmé, avec des pauses et des activités pour que la journée passe vite.</p></div>
<ol class="day">
<li><b>7 h 30</b><span>Accueil des élèves</span></li>
<li><b>8 h 00</b><span>Cours du matin</span></li>
<li><b>10 h 00</b><span>Récréation</span></li>
<li><b>12 h 00</b><span>Déjeuner à la cantine</span></li>
<li><b>14 h 00</b><span>Cours et ateliers</span></li>
<li><b>16 h 00</b><span>Étude surveillée</span></li>
<li><b>17 h 00</b><span>Sortie et transport</span></li>
</ol>
</div></section>

<section class="soft"><div class="wrap">
<div class="sec-head"><span class="tag b">Témoignages</span><h2>Ils nous font <mark>confiance</mark>.</h2></div>
<div class="quotes">
<figure class="quote" style="margin:0"><p>« Ma fille a repris goût à la lecture dès le premier trimestre. On sent que les maîtres connaissent chaque enfant. »</p><footer>Mme Aïcha Konaté<span>Maman d’une élève de CE2</span></footer></figure>
<figure class="quote" style="margin:0"><p>« Le suivi est sérieux et le carnet nous tient au courant. Notre fils est passé en 6<sup>e</sup> sans stress. »</p><footer>M. Jean-Marc Tanoh<span>Papa d’un élève de CM2</span></footer></figure>
<figure class="quote" style="margin:0"><p>« Le transport depuis Marcory nous simplifie la vie, et les activités du mercredi ont révélé un vrai goût pour la musique. »</p><footer>Mme Nadège Coulibaly<span>Maman de deux élèves</span></footer></figure>
</div></div></section>

<section><div class="wrap sim" style="align-items:center">
<div><span class="tag">Simulateur</span><h2>Combien ça <mark>coûte</mark> ?</h2><p>Choisissez le cycle, le nombre d’enfants, la cantine et le transport : le total en FCFA s’affiche, réduction fratrie comprise.</p><a class="btn" href="inscription.html#simulateur">Calculer mes frais</a></div>
<div class="panel"><p class="pen" style="font-size:2rem;margin-bottom:6px">Exemple</p><p style="margin:0">2 enfants (primaire et collège), avec cantine :</p><p style="font-family:var(--head);font-weight:800;font-size:2.2rem;color:var(--blue);margin:8px 0 0">≈ 183 500 FCFA / mois</p><p style="margin:0;color:var(--muted);font-size:.9rem">Réduction fratrie incluse. Tarifs de démonstration.</p></div>
</div></section>

<section class="band cta"><div class="wrap cta-in">
<div><span class="tag">Inscriptions ouvertes</span><h2>Rentrée 2027 : <br>réservez la place de votre enfant.</h2><p>Dossiers acceptés jusqu’au :</p><p class="date">30 juin 2027</p></div>
<div><a class="btn sun" href="inscription.html">Inscrire mon enfant</a><p style="margin:18px 0 0">Ou <a href="contact.html#visite">réservez une visite</a> de l’école.</p></div>
</div></section>
` + footer();

// ================= CYCLES
const cyc = (id, cls, t, sub, p, li, meta) => `<section id="${id}" style="padding:40px 0"><div class="wrap"><article class="cover ${cls}" style="box-shadow:8px 8px 0 var(--ink)"><div class="label"><h2 style="margin:0;font-size:2.2rem">${t}</h2><span>${sub}</span></div><div class="body" style="display:grid;grid-template-columns:1.2fr 1fr;gap:36px"><div><p>${p}</p><ul>${li.map(x => `<li>${x}</li>`).join('')}</ul></div><dl style="margin:0">${meta.map(([k, v]) => `<dt style="font-family:var(--head);font-weight:800;margin-top:10px">${k}</dt><dd style="margin:0">${v}</dd>`).join('')}</dl></div></article></div></section>`;
pages['cycles.html'] = head({ title: 'Nos cycles · Maternelle, primaire, collège · Les Palmiers', desc: 'Les trois cycles du Groupe Scolaire Les Palmiers à Abidjan : maternelle (3-5 ans), primaire (6-11 ans) et collège (12-15 ans).' })
+ header('cycles.html') + title('Nos cycles', 'Trois cycles, <mark>un même esprit</mark>.', 'Du premier jour de maternelle à la 3<sup>e</sup> : des programmes clairs, des classes à taille humaine et un suivi attentif.')
+ cyc('maternelle', 'm', 'Maternelle', '3 à 5 ans · Petite, moyenne et grande section', 'On apprend en jouant : langage, graphisme, nombres et vie en groupe, dans une classe chaleureuse où l’enfant prend confiance.', ['Éveil, langage et premiers graphismes', 'Jeux, chants et motricité', 'Découverte des nombres et des formes', 'Premiers mots d’anglais'], [['Effectif', '18 élèves maximum par classe'], ['Horaires', '7 h 30 – 13 h 00 (garderie jusqu’à 16 h)'], ['Équipe', 'Une maîtresse et une assistante par classe']])
+ cyc('primaire', 'p', 'Primaire', '6 à 11 ans · Du CP1 au CM2', 'Les bases solides : lire, écrire, compter, comprendre le monde. Nous préparons progressivement les élèves du CM2 au CEPE.', ['Lecture, écriture et calcul', 'Anglais dès le CP1 et initiation à l’informatique', 'Sciences, histoire-géographie, éducation civique', 'Préparation au CEPE en CM2'], [['Effectif', '22 élèves maximum par classe'], ['Horaires', '7 h 30 – 16 h 00'], ['Suivi', 'Carnet de liaison et rendez-vous chaque trimestre']])
+ cyc('college', 'c', 'Collège', '12 à 15 ans · De la 6<sup>e</sup> à la 3<sup>e</sup>', 'Un accompagnement vers l’autonomie : méthode de travail, matières plus exigeantes et préparation du BEPC, avec un soutien pour ceux qui en ont besoin.', ['Français, mathématiques, sciences, langues', 'Études surveillées et soutien', 'Orientation et méthodes de travail', 'Préparation au BEPC en 3<sup>e</sup>'], [['Effectif', '24 élèves maximum par classe'], ['Horaires', '7 h 30 – 17 h 00'], ['Langues', 'Anglais et espagnol']])
+ `<section class="band cta" style="margin-top:40px"><div class="wrap cta-in"><div><h2>Un doute sur le bon cycle ?</h2><p>Venez visiter l’école : la direction vous reçoit et répond à vos questions.</p></div><div><a class="btn sun" href="contact.html#visite">Réserver une visite</a></div></div></section>\n`
+ footer();

// ================= VIE DE L'ÉCOLE
const acts = [
  ['Théâtre', 'Improviser, apprendre à parler en public et monter un spectacle de fin d’année.', 'Mercredi 14 h · dès le CE1'],
  ['Football', 'Entraînements et tournois entre écoles, dans le respect de l’équipe et de l’arbitre.', 'Mercredi 15 h · dès le CE2'],
  ['Robotique', 'Construire et programmer de petits robots pour comprendre la logique.', 'Jeudi 16 h · dès le CM1'],
  ['Musique', 'Chant, percussions et flûte : une chorale qui se produit à chaque fête de l’école.', 'Mardi 16 h · dès la maternelle'],
  ['Anglais', 'Conversation, jeux et lecture pour prendre confiance à l’oral.', 'Lundi 16 h · dès le CP1'],
  ['Échecs', 'Stratégie, patience et concentration, avec des mini-tournois internes.', 'Vendredi 16 h · dès le CE2'],
];
const cal = [
  ['24 oct. – 1<sup>er</sup> nov. 2026', 'Vacances de la Toussaint', 'vac', 'm p c', 'Vacances'],
  ['14 – 18 déc. 2026', 'Compositions du 1<sup>er</sup> trimestre', 'exam', 'p c', 'Examens'],
  ['19 déc. 2026 – 3 janv. 2027', 'Vacances de Noël', 'vac', 'm p c', 'Vacances'],
  ['20 mars 2027', 'Journée portes ouvertes', 'ev', 'm p c', 'Événement'],
  ['22 – 26 mars 2027', 'Compositions du 2<sup>e</sup> trimestre', 'exam', 'p c', 'Examens'],
  ['3 – 18 avr. 2027', 'Vacances de Pâques', 'vac', 'm p c', 'Vacances'],
  ['5 juin 2027', 'Fête de l’école et spectacle de la maternelle', 'ev', 'm', 'Événement'],
  ['Juin 2027', 'CEPE (date officielle à confirmer)', 'exam', 'p', 'Examens'],
  ['Juin 2027', 'BEPC (date officielle à confirmer)', 'exam', 'c', 'Examens'],
  ['2 juil. 2027', 'Remise des bulletins et fin d’année', 'ev', 'm p c', 'Événement'],
];
pages['vie-ecole.html'] = head({ title: 'Vie de l’école · Activités, cantine, transport · Les Palmiers', desc: 'Activités, cantine, transport scolaire, sport et calendrier de l’année au Groupe Scolaire Les Palmiers à Abidjan.' })
+ header('vie-ecole.html') + title('Vie de l’école', 'Apprendre, mais aussi <mark>grandir</mark>.', 'Après la classe, il se passe beaucoup de choses aux Palmiers : des activités, un vrai repas, un terrain de sport et un transport organisé.', 'b') + `
<section style="padding-top:20px"><div class="wrap"><div class="sec-head"><h2>Six activités <mark>après la classe</mark></h2></div>
<div class="acts">
${acts.map((a, i) => `<article class="act"><span class="n">${i + 1}</span><h3>${a[0]}</h3><p>${a[1]}</p><small>${a[2]}</small></article>`).join('\n')}
</div></div></section>

<section class="soft"><div class="wrap duo">
<div><span class="tag g">Sport</span><h2>Un terrain pour <mark>se dépenser</mark>.</h2><p>Éducation physique chaque semaine, tournois entre classes et entraînements de football le mercredi. Les enfants apprennent à jouer ensemble et à gagner comme à perdre.</p><p style="font-size:.85rem;color:var(--muted)">Photo : Rick Obst, <a href="https://creativecommons.org/licenses/by/2.0/" rel="noopener">CC BY 2.0</a>, via Wikimedia Commons (terrain illustratif).</p></div>
<img src="img/terrain.webp" width="1200" height="675" alt="Terrain de football en herbe avec des buts, sous un ciel bleu" loading="lazy">
</div></section>

<section><div class="wrap duo">
<img src="img/classe.webp" width="1200" height="904" alt="Grande salle de classe lumineuse avec des rangées de bancs en bois et des ventilateurs au plafond" loading="lazy">
<div><span class="tag">Cantine et transport</span><h2>Une journée <mark>sans souci</mark>.</h2>
<p><strong>Cantine :</strong> repas équilibrés préparés chaque jour (riz, attiéké, légumes, poisson ou poulet, fruits de saison). Les allergies sont notées à l’inscription.</p>
<p><strong>Transport :</strong> ramassage en minibus depuis Cocody, Riviera, Marcory, Plateau et Yopougon, avec une accompagnatrice à bord. Premier passage vers 6 h 45.</p>
<p>Les tarifs de cantine et de transport sont dans le <a href="inscription.html#simulateur">simulateur de frais</a>.</p></div>
</div></section>

<section class="soft" id="calendrier"><div class="wrap">
<div class="sec-head"><span class="tag b">Calendrier</span><h2>L’année <mark>2026-2027</mark>.</h2><p>Filtrez par cycle pour voir les dates qui vous concernent. Dates indicatives (démonstration).</p></div>
<div class="chips" role="group" aria-label="Filtrer par cycle">
<button type="button" data-cycle="all" aria-pressed="true">Tous</button><button type="button" data-cycle="m" aria-pressed="false">Maternelle</button><button type="button" data-cycle="p" aria-pressed="false">Primaire</button><button type="button" data-cycle="c" aria-pressed="false">Collège</button></div>
<p id="cal-count" role="status" style="font-size:.88rem;color:var(--muted)">${cal.length} dates affichées</p>
<ul class="cal">
${cal.map(c => `<li data-type="${c[2]}" data-cycles="${c[3]}"><time>${c[0]}</time><span>${c[1]}</span><span class="k">${c[4]}</span></li>`).join('\n')}
</ul></div></section>
` + footer();

// ================= RÉSULTATS
pages['resultats.html'] = head({ title: 'Résultats et actualités · Les Palmiers', desc: 'Résultats aux examens du CEPE et du BEPC sur trois ans et actualités du Groupe Scolaire Les Palmiers à Abidjan.' })
+ header('resultats.html') + title('Résultats et actualités', 'Des résultats <mark>à suivre</mark> année après année.', 'Nous publions nos résultats chaque année. Ils reflètent le travail des élèves, des familles et des équipes.', 'g') + `
<section style="padding-top:20px"><div class="wrap">
<table><caption class="pen" style="text-align:left;padding:0 0 10px;caption-side:top">Taux de réussite aux examens</caption>
<thead><tr><th scope="col">Année</th><th scope="col">CEPE</th><th scope="col">BEPC</th></tr></thead>
<tbody><tr><th scope="row" style="background:#fff">2023-2024</th><td><strong>95 %</strong></td><td><strong>89 %</strong></td></tr>
<tr><th scope="row" style="background:#fff">2024-2025</th><td><strong>96 %</strong></td><td><strong>90 %</strong></td></tr>
<tr><th scope="row" style="background:#fff">2025-2026</th><td><strong>97 %</strong></td><td><strong>91 %</strong></td></tr></tbody></table>
<p style="margin-top:12px;font-size:.88rem;color:var(--muted)">Chiffres de démonstration. Les résultats passés ne garantissent pas les résultats futurs.</p>
</div></section>

<section class="soft"><div class="wrap">
<div class="sec-head"><span class="tag">Actualités</span><h2>Ce qui se passe <mark>à l’école</mark>.</h2></div>
<div class="news">
<article><time datetime="2026-09-18">18 septembre 2026</time><h3>Portes ouvertes le 20 mars</h3><p>Les familles sont invitées à découvrir les classes, rencontrer l’équipe et poser leurs questions. Inscription conseillée auprès du secrétariat.</p></article>
<article><time datetime="2026-09-04">4 septembre 2026</time><h3>Un atelier d’échecs pour la rentrée</h3><p>Dès le CE2, les élèves peuvent rejoindre l’atelier du vendredi et participer à des mini-tournois internes.</p></article>
<article><time datetime="2026-08-25">25 août 2026</time><h3>Nouveau coin lecture au primaire</h3><p>Chaque classe de primaire dispose désormais d’une petite bibliothèque renouvelée tous les trimestres.</p></article>
</div></div></section>
` + footer();

// ================= INSCRIPTION
const cycleOptsForm = '<option value="">Choisir…</option><option>Petite section</option><option>Moyenne section</option><option>Grande section</option><option>CP1</option><option>CP2</option><option>CE1</option><option>CE2</option><option>CM1</option><option>CM2</option><option>6e</option><option>5e</option><option>4e</option><option>3e</option>';
pages['inscription.html'] = head({ title: 'Inscription et simulateur de frais · Les Palmiers', desc: 'Calculez vos frais de scolarité en FCFA avec la réduction fratrie, puis inscrivez votre enfant en 3 étapes au Groupe Scolaire Les Palmiers.' })
+ header('inscription.html') + title('Inscription', 'Inscrire mon enfant, <mark>étape par étape</mark>.', 'Estimez d’abord vos frais, puis remplissez la demande en trois étapes. Le secrétariat vous rappelle sous 48 heures.') + `
<section id="simulateur" style="padding-top:20px"><div class="wrap">
<div class="sec-head"><span class="tag">Étape 1 · facultative</span><h2>Simulateur de <mark>frais de scolarité</mark></h2></div>
<div class="sim" id="sim">
<div class="panel">
<fieldset><legend>Nombre d’enfants à inscrire</legend>
<div class="stepper"><button type="button" id="minus" aria-label="Retirer un enfant">−</button><output id="sim-count" aria-live="polite">1</output><button type="button" id="plus" aria-label="Ajouter un enfant">+</button></div></fieldset>
<fieldset><legend>Cycle de chaque enfant</legend><div id="children"></div></fieldset>
<fieldset><legend>Services (pour chaque enfant)</legend>
<label class="opt"><input type="checkbox" id="cantine"><span><b>Cantine</b><small>20 000 FCFA par mois et par enfant</small></span></label>
<label class="opt"><input type="checkbox" id="transport"><span><b>Transport scolaire</b><small>25 000 FCFA par mois et par enfant</small></span></label></fieldset>
<p style="font-size:.88rem;color:var(--muted);margin:0">Réduction fratrie sur la scolarité : −10 % pour le 2<sup>e</sup> enfant, −15 % à partir du 3<sup>e</sup>. Tarifs de démonstration.</p>
</div>
<aside class="receipt" aria-live="polite"><h3>Votre estimation</h3><div id="receipt-body"></div></aside>
</div></div></section>

<section class="soft" id="formulaire"><div class="wrap" style="max-width:820px">
<div class="sec-head"><span class="tag b">Étape 2</span><h2>Demande <mark>d’inscription</mark></h2></div>
<form class="panel" id="reg" novalidate aria-label="Demande d’inscription">
<ol class="progress" aria-label="Progression"><li data-n="1" class="on" aria-current="step">Enfant</li><li data-n="2">Parent</li><li data-n="3">Confirmation</li></ol>
<div class="step on"><h3>L’enfant</h3>
<label for="r-prenom">Prénom de l’enfant</label><input id="r-prenom" type="text" autocomplete="off" required><p class="err" data-err-for="r-prenom">Indiquez le prénom.</p>
<div class="row2"><div><label for="r-classe">Classe visée</label><select id="r-classe" required>${cycleOptsForm}</select><p class="err" data-err-for="r-classe">Choisissez une classe.</p></div>
<div><label for="r-naiss">Date de naissance</label><input id="r-naiss" type="date" required><p class="err" data-err-for="r-naiss">Indiquez la date de naissance.</p></div></div>
<div class="nav-btns"><span></span><button type="button" class="btn" data-next>Continuer</button></div></div>
<div class="step"><h3>Le parent</h3>
<label for="r-parent">Nom et prénom du parent</label><input id="r-parent" type="text" autocomplete="name" required><p class="err" data-err-for="r-parent">Indiquez votre nom.</p>
<label for="r-tel">Téléphone (WhatsApp de préférence)</label><input id="r-tel" type="tel" autocomplete="tel" placeholder="+225 07 00 00 00 00" required><p class="err" data-err-for="r-tel">Indiquez un numéro valide.</p>
<div class="nav-btns"><button type="button" class="btn line" data-prev>Retour</button><button type="button" class="btn" data-next>Continuer</button></div></div>
<div class="step"><h3>Confirmation</h3>
<ul class="recap" id="recap"></ul>
<p class="privacy"><strong>Qui reçoit ces informations ?</strong> Uniquement le secrétariat du Groupe Scolaire Les Palmiers, pour traiter votre demande et vous rappeler. Rien n’est transmis à des tiers. <a href="confidentialite.html">Politique de confidentialité</a>.</p>
<div class="check"><input id="r-ok" type="checkbox" required><label for="r-ok">J’accepte que l’école utilise ces informations pour traiter ma demande d’inscription.</label></div><p class="err" data-err-for="r-ok">Le consentement est nécessaire.</p>
<div class="nav-btns"><button type="button" class="btn line" data-prev>Retour</button><button type="submit" class="btn sun">Envoyer ma demande</button></div></div>
<div class="ok" role="status"><span class="pen">Demande reçue !</span><p>Dossier n° <strong id="dossier"></strong></p><p>Le secrétariat vous rappelle sous 48 heures pour la suite : pièces à fournir et rendez-vous.</p><p style="font-size:.88rem;color:var(--muted)">Démonstration : aucune donnée n’a été envoyée.</p></div>
</form></div></section>
` + footer();

// ================= CONTACT
pages['contact.html'] = head({ title: 'Contact et visite de l’école · Les Palmiers', desc: 'Contactez le Groupe Scolaire Les Palmiers à Abidjan ou réservez une visite de l’école : choix du jour et de l’heure, téléphone, WhatsApp et horaires.' })
+ header('contact.html') + title('Contact', 'Venez <mark>voir l’école</mark>.', 'Réservez une visite : la direction vous fait découvrir les classes, la cantine et le terrain de sport.') + `
<section id="visite" style="padding-top:20px"><div class="wrap contact-grid">
<form class="panel" id="visit" novalidate aria-label="Réservation de visite">
<div class="fields">
<fieldset><legend>Jour de la visite</legend><div class="slots" id="days"></div></fieldset>
<fieldset><legend>Heure</legend><div class="slots">
<label><input type="radio" name="heure" value="9 h 00" checked><span>9 h 00</span></label><label><input type="radio" name="heure" value="10 h 30"><span>10 h 30</span></label><label><input type="radio" name="heure" value="14 h 30"><span>14 h 30</span></label><label><input type="radio" name="heure" value="16 h 00"><span>16 h 00</span></label></div></fieldset>
<label for="v-nom">Nom et prénom</label><input id="v-nom" type="text" autocomplete="name" required><p class="err" data-err-for="v-nom">Indiquez votre nom.</p>
<label for="v-tel">Téléphone</label><input id="v-tel" type="tel" autocomplete="tel" placeholder="+225 07 00 00 00 00" required><p class="err" data-err-for="v-tel">Indiquez un numéro valide.</p>
<div class="check"><input id="v-ok" type="checkbox" required><label for="v-ok">J’accepte que l’école utilise ces informations pour confirmer la visite, selon la <a href="confidentialite.html">politique de confidentialité</a>.</label></div><p class="err" data-err-for="v-ok">Le consentement est nécessaire.</p>
<button class="btn sun" type="submit">Réserver ma visite</button></div>
<div class="ok" role="status"><span class="pen">Visite réservée !</span><p>Merci <strong id="visit-name"></strong>, nous vous attendons le <strong id="visit-when"></strong>.</p><p style="font-size:.88rem;color:var(--muted)">Démonstration : aucune donnée n’a été envoyée.</p></div>
</form>
<aside class="panel info"><h2 style="font-size:1.6rem">Le secrétariat</h2><dl style="margin:0">
<dt>Adresse</dt><dd>Rue des Jasmins, Riviera 3<br>Cocody, Abidjan</dd>
<dt>Téléphone</dt><dd><a href="tel:+22527220000000">${PHONE}</a></dd>
<dt>WhatsApp</dt><dd><a href="${WA}" rel="noopener">Écrire au secrétariat</a></dd>
<dt>Horaires</dt><dd>Lundi au vendredi : 7 h 30 – 16 h 30<br>Samedi : 8 h – 12 h</dd></dl></aside>
</div></section>
` + footer();

// ================= CONFIDENTIALITÉ
pages['confidentialite.html'] = head({ title: 'Confidentialité · Les Palmiers', desc: 'Comment le Groupe Scolaire Les Palmiers utilise les informations transmises via ses formulaires d’inscription et de visite.' })
+ header('') + title('Confidentialité', 'Les données des enfants <mark>méritent du soin</mark>.', 'Ce que nous ferions de vos informations sur un site réel.') + `
<section><div class="wrap prose">
<p><strong>Site de démonstration :</strong> ce site est une maquette. Les formulaires n’envoient rien et rien n’est enregistré.</p>
<h2>Données demandées</h2><p>Pour une inscription : le prénom de l’enfant, la classe visée et sa date de naissance, puis le nom et le téléphone du parent. Pour une visite : le nom et le téléphone. Rien d’autre.</p>
<h2>Qui les reçoit ?</h2><p>Uniquement le secrétariat de l’école, pour traiter la demande et vous rappeler. Les données ne sont pas transmises à des tiers.</p>
<h2>Vos droits</h2><p>Vous pouvez demander l’accès, la correction ou la suppression des informations concernant votre enfant en contactant le secrétariat.</p>
<h2>Crédits photos</h2><p>Photos issues de Wikimedia Commons : fournitures scolaires et salle de classe (CC0), terrain de football par Rick Obst (CC BY 2.0).</p>
</div></section>
` + footer();

for (const [f, html] of Object.entries(pages)) fs.writeFileSync(path.join(out, f), html);

fs.writeFileSync(path.join(out, 'favicon.svg'), logo.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ').replace(' aria-hidden="true"', ''));
fs.writeFileSync(path.join(out, 'vercel.json'), JSON.stringify({ cleanUrls: true }, null, 2) + '\n');
fs.writeFileSync(path.join(out, '.vercelignore'), ['_build', '_raw', '.claude', 'GUIDE-PUBLICATION.md'].join('\n') + '\n');
console.log('OK', Object.keys(pages).join(', '));
