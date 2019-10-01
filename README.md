# DIME-SHS [![Build Status](https://travis-ci.com/CDSP-SCPO/site-DIME-SHS.svg?branch=master)](https://travis-ci.com/CDSP-SCPO/site-DIME-SHS)


## ✍️ Contribuer des contenus

Les contenus existent en deux langues : français (par défaut), anglais.
Tous les fichiers qui finissent par `.fr.xxx` ou `.en.xxx` sont spécifiques à cette langue.

- **Articles** : [`content/posts`](content/posts)
- **Enquêtes** : [`data/enquetes`](data/enquetes)
- **Instruments** : [`content/instruments`](content/instruments)
- **Mentions légales** : [`content/mentions-legales.*.md`](content)
- **Outils** : [`content/productions/outils`](content/productions/outils)
- **Productions** : [`content/productions`](content/productions)
- **Publications** : Spire et Zotero (voir la section « [Scripts](#scripts) »)

### Options d'affichage

Le champ `options` d'un fichier Markdown contrôle des comportements d'affichage des contenus.

```markdown
---
title: Quelque chose
options:
- toggable-headlines
---
```

| Option                        | À quoi ça sert ?
| ---                           | ---
| `toggable-headlines`          | Les titres ouvrent ou replient leur section correspondante.
| `toggable-headlines--closed`  | Les sections cliquables sont fermées par défaut.
| `toc`                         | Une table des matières est construite à partir des titres de la page, et est affichée dans la colonne de gauche.

### Traduction de l'interface

Les éléments d'interface sont traduits à deux endroits :

- footer : clés `[languages.*.menu.footer]` dans le fichier [`config.toml`](config.toml).
- tout le reste : répertoire [`./i18n`](i18n).


## 🛠 Développer en local

- **Générateur** : `Hugo@>=0.58.2` dans sa version dite _Extended_ (elle prend en charge le [langage Sass][])
- **CSS** : [Tachyons][] (approche _mobile-first_ et fonctionnelle)
- **JavaScript** : _vanilla_ (compilé en ECMAScript5 via [babeljs.io REPL][])

### Installation

La gestion de version de [Hugo][] est effectuée avec [Node.js][],
afin d'avoir un outillage de développement unifié.

```bash
$ npm install
```

### Prévisualiser en local

```bash
$ npm start
```

Le site est alors accessible sur [http://localhost:1313](http://localhost:1313).

### Générer le site

```bash
$ npm run build -- --baseURL https://dime-shs.sciences-po.fr
```

Les fichiers sont générés dans le répertoire `./public`.

| Type                      | Identifiant                     | Utilité
| ---                       | ---                             | ---
| Variable d'environnement  | `MATOMO_SITE_ID`                | Transmet l'identifiant de site Matomo, pour le suivi des visites.
| Paramètre                 | `--baseURL http://example.com`  | Site de destination.


## 📦 Scripts

### Importer les publications depuis Spire et Zotero

```bash
$ npm run import

# Pour déployer les publications en prod
$ git add data/publications
$ git commit -m 'Mise à jour des publications'
```

La commande `npm run import` obtient les publications depuis une collection Spire et une collection Zotero.
Les données obtenues sont normalisées et catégorisées en fichiers YAML dans le répertoire [`data/publications`](data/publications).

- **Spire**
  - Collection configurée dans le fichier [`package.json`](package.json)
  - Code : [`scripts/import/spire.js`](scripts/import/spire.js)
- **Zotero**
  - Collection configurée dans le fichier [`package.json`](package.json)
  - Code : [`scripts/import/zotero.js`](scripts/import/zotero.js)

Configuration du fichier [`config.toml`](config.toml) :

- Types de publications importées (`params.publicationsLabels`).
- _Mapping_ des types de publications (`params.publicationsMapping`), sous la forme `"ancienne catégorie" = "nouvelle catégorie"`.
- Catégories (`params.publications.*`) : libellé, ordre et identifiants des sous-collections Zotero et Spire.

## 🤖 Automatisation

### Travis CI

- Quand des commits arrivent sur `master`, le site est…
  1. … généré avec l'URL `https://dime-shs.sciencespo.fr`.
  1. … est configué avec un `siteId` Piwik égal à 10.
  1. … déployé sur GitHub Pages (branche `gh-pages`).

### Netlify

- Quand des commits arrivent sur `master`, le site est…
  1. … déployé sur https://wizardly-hoover-3f212f.netlify.com
  1. … le _build_ apparaît sur https://app.netlify.com/sites/wizardly-hoover-3f212f/deploys
- Quand des commits arrivent sur une _branche_ autre que `master`, le site est…
  1. … accessible via une URL de prévisualisation (voir le cartouche `successful checks` / `deploy/netlify ` sur la _pull request_ GitHub).
  1. … le _build_ apparaît sur https://app.netlify.com/sites/wizardly-hoover-3f212f/deploys.

La configuration principale se fait depuis le [tableau de bord Netlify][].
D'autres comportements sont paramétrés dans le fichier [`netflify.toml`](netlify.toml).

## 📖 [JOURNAL.md](JOURNAL.md)

Ce qu'on a vécu ensemble, au jour le jour.

[Hugo]: https://gohugo.io
[Node.js]: https://nodejs.org
[hugo-releases]: https://github.com/gohugoio/hugo/releases
[nodejs-releases]: https://nodejs.org/fr/download/
[tableau de bord Netlify]: https://app.netlify.com/sites/wizardly-hoover-3f212f
[langage Sass]: https://sass-lang.com/guide
[Tachyons]: https://tachyons.io
[babeljs.io REPL]: http://babeljs.io/repl#?babili=false&browsers=safari%20%3E%2B&build=&builtIns=false&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&sourceType=module&lineWrap=true&presets=env&prettier=false&targets=&version=6.26.0&envVersion=1.6.2
