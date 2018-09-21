# DIME-SHS


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

- **Générateur** : `Hugo@>=0.48` dans sa version dite _Extended_ (elle prend en charge le [langage Sass][])
- **CSS** : [Tachyons][] (approche _mobile-first_ et fonctionnelle)
- **JavaScript** : _vanilla_ (compilé en ECMAScript5 via [babeljs.io REPL][])

### Installation

Les commandes suivantes installent des versions opérationnelles de [Hugo Extended][Hugo] et de [Node.js][] sous macOS.

Des installeurs complémentaires sont à disposition sur le [dépôt de code de Hugo][hugo-releases] et de [Node.js][nodejs-releases].

```bash
# Sous macOS
$ brew install hugo nvm

# OPTIONNEL, sauf…
# - pour mettre à jour le framework CSS
# - pour exécuter les scripts
$ nvm install
$ npm install
```


### Prévisualiser en local

```bash
$ hugo serve --stepAnalysis --disableFastRender --i18n-warnings
```

Le site est accessible sur [http://localhost:1313](http://localhost:1313).

### Générer le site

```bash
$ hugo -b https://dime-shs.sciences-po.fr
```

Les fichiers sont générés dans le répertoire `./public`.

| Type | Identifiant | Utilité
| ---       | ---
| Variable d'environnement  | `MATOMO_SITE_ID`  | Transmet l'identifiant de site Matomo, pour le suivi des visites.
| Paramètre   | `-b http://example.com`  | Site de destination.


### ⚠️ Déployer les changements de CSS ⚠️

À l'heure actuelle, le répertoire [`./resources`](resources) doit être _commité_ après avoir lancé Hugo (prévisualisation ou génération).

C'est une limitation temporaire de Netlify, documentée sur [netlify/build-image#182](https://github.com/netlify/build-image/issues/182), [netlify/build-image#183](https://github.com/netlify/build-image/issues/183) et [gohugoio/hugo#5148](https://github.com/gohugoio/hugo/issues/5148).
Voir aussi [site-DIME-SHS#48](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/48).

> **tl;dr** Hugo Extended nécessite une version récente de GLIBC tandis que Netlify embarque une version liée à Ubuntu 14.04.

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
  1. … généré avec l'URL `https://cdsp-scpo.github.io/site-DIME-SHS/`
  1. … Piwik est configué avec
  1. … déployé sur GitHub Pages (branche `gh-pages`)
- Quand des commits arrivent sur `prod`, le site est…
  1. … généré avec l'URL `https://www.sciencespo.fr/dime-shs/`.
  1. … Piwik **n'est pas configuré**

### Netlify

- Quand des commits arrivent sur `master`, le site est…
  1. … déployé sur https://wizardly-hoover-3f212f.netlify.com
  1. … le _build_ apparaît sur https://app.netlify.com/sites/wizardly-hoover-3f212f/deploys
- Quand des commits arrivent sur une _branche_, le site est…
  1. … une URL de prévisualisation est communiquée dans la pull request associée
  1. … le _build_ apparaît sur https://app.netlify.com/sites/wizardly-hoover-3f212f/deploys

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
