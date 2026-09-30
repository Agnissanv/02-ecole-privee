# Guide de publication : Groupe Scolaire Les Palmiers

Document interne, non mis en ligne (voir `.vercelignore`). À suivre dans l'ordre.

## 1. Publier sur Vercel
**En ligne de commande**
1. Ouvrir un terminal dans ce dossier.
2. Installer l'outil une seule fois : `npm i -g vercel` puis `vercel login`
3. Publier : `vercel --prod`
4. Framework : **Other**. Dossier de sortie : `.`

**Sans ligne de commande** : vercel.com > *Add New* > *Project*, importer le dossier, framework **Other**, pas de commande de build.

## 2. Vérifier le site en ligne
- [ ] Les 7 pages s'ouvrent : accueil, `cycles`, `vie-ecole`, `resultats`, `inscription`, `contact`, `confidentialite`.
- [ ] Navigation privée : accessible **sans connexion** (sinon *Settings* > *Deployment Protection*, désactiver).
- [ ] Simulateur (page Inscription) : ajouter un enfant, cocher cantine, le total change. Exemple : 2 enfants (collège + primaire) avec cantine = 183 500 FCFA par mois.
- [ ] Formulaire d'inscription : les 3 étapes passent, le message « Demande reçue ! » et un numéro de dossier apparaissent.
- [ ] Calendrier (page Vie de l'école) : les boutons Maternelle / Primaire / Collège filtrent la liste.
- [ ] Réservation de visite (page Contact) : jours proposés, confirmation affichée.
- [ ] Mobile (390 px) : le menu s'ouvre, rien ne dépasse. Console (F12) : aucune erreur.
- [ ] Signature « Code AZ » en bas de page renvoie vers https://agnissanisaac.com

## 3. Envoyer le lien pour le portfolio
- **Secteur** : `École privée`
- **Tag** : `Éducation · École privée`
- **categoryLabel** : Site pour école privée
- **pitch** : Un site de groupe scolaire à Abidjan : cycles, vie de l'école, simulateur de frais et inscription en ligne.
- **tech** : HTML5 / CSS3, JavaScript (simulateur, formulaire en étapes), Responsive design

## 4. Mentions à ne pas retirer
- **Crédit photo du terrain** (Rick Obst, CC BY 2.0) : sous l'image, page Vie de l'école, et page Confidentialité. Obligatoire.
- « École, personnes et chiffres fictifs » en pied de page : à garder tant que ce n'est pas un vrai client.
- Signature Code AZ : à garder.

## 5. Si une vraie école veut ce site
1. Changer le contenu dans `_build/build.js` (nom, adresse, téléphone, textes, calendrier, résultats réels).
2. Changer les tarifs : en haut de la partie simulateur dans `js/main.js` (objet `F`, `CANTINE`, `TRANSPORT`, `MOIS`) et les textes des prix dans `_build/build.js`.
3. Remplacer le numéro WhatsApp (`WA`) et le téléphone (`PHONE`).
4. Brancher les formulaires (inscription et visite) sur un vrai service : ils sont simulés dans `js/main.js`. Les données d'enfants sont sensibles : prévenir le client, vérifier la page Confidentialité et ne jamais collecter plus que le prénom, la classe visée et la date de naissance.
5. Photos : n'utiliser des photos d'élèves qu'avec un accord écrit des parents. Remplacer les photos d'illustration par celles de l'école.
6. Ne publier des résultats d'examen que s'ils sont réels et vérifiables. Retirer « Très bien ! » et les chiffres de démonstration.
7. Régénérer : `node _build/build.js`, puis `vercel --prod`.

## 6. Modifier le site soi-même
- Contenu et pages : `_build/build.js` (puis `node _build/build.js`).
- Styles et couleurs : `css/style.css` (variables en haut du fichier).
- Fonctionnalités (simulateur, formulaires, calendrier) : `js/main.js`.
- Images : dossier `img/`, WebP, 1 600 px maximum. Sources et licences : `_build/credits.md`.
- Ouvrir le site en local : fonctionne avec Live Server (liens en `.html`).

## 7. Exclus de la mise en ligne
`_build`, `_raw` (images d'origine lourdes), `.claude` et ce guide sont listés dans `.vercelignore`.
