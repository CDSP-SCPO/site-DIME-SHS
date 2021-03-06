---
title:  De nouvelles versions majeures des logiciels Dime Web
date:   2020-12-20T00:00:00
---
L'achèvement imminent du financement de DIME-SHS est l'occasion pour l'instrument Dime Web de finaliser un certain nombre des développements engagés depuis de longs mois sur ses principaux logiciels open source afin de pérenniser le travail accompli en stabilisant les outils et permettant leur usage au delà de la vie de l'Equipex.

Ce sont ainsi 3 nouvelles "releases" majeures qui sont publiées ces derniers jours pour les logiciels Hyphe, Hyphe-Browser et Gazouilloire et qui seront présentées le 6 février 2021 à la conférence internationale de logiciel libre FOSDEM au sein de la salle [Open Research Tools & Technologies](https://fosdem.org/2021/schedule/track/open_research_tools_and_technologies/).

La vie de ces outils ne s'arrête pas pour autant avec l'Equipex, et ces logiciels continueront à être maintenus et enrichis à l'avenir par l'équipe d'ingénieurs du [médialab de Sciences Po](https://medialab.sciencespo.fr).

# Gazouilloire v1.0
Dime Web a développé le logiciel [Gazouilloire](https://medialab.sciencespo.fr/outils/gazouilloire/) pour permettre la mise en place d'un suivi longitudinal de Twitter sur plusieurs mois ou années. Près de 7 ans après le développement de son premier prototype et la collecte de plusieurs centaines de millions de tweets pour de nombreux projets de recherche, Gazouilloire atteint enfin la maturité avec sa [version 1.0](https://github.com/medialab/gazouilloire/releases) !

Outre un usage très largement facilité pour les développeurs par une [installation et configuration en quelques minutes](https://pypi.org/project/gazouilloire/), cette nouvelle version vise avant tout, d’une part à pérenniser et stabiliser l’outil grâce à son évolution vers python3, version désormais standard du langage, et d’autre part à simplifier la manipulation, l’exploration et l’analyse des très gros corpus collectés grâce au passage à la technologie de stockage et d’indexation des données ElasticSearch.

# Hyphe-Browser v2.0 & Hyphe v1.4
Depuis la publication de sa première version stable en 2017, le logiciel de webcrawling pour les sciences sociales [Hyphe](https://hyphe.medialab.sciences-po.fr/) a poursuivi son développement de manière régulière avec de nombreuses corrections de bugs notamment remontés par les utilisateurs, mais également l'ajout de nouvelles options, fonctionnalités et réglages disponibles avec [Hyphe v1.4](https://github.com/medialab/hyphe/releases).

Comme annoncé au sein du plan d'action de DIME-SHS en 2018, l'un des enjeux pour Hyphe avant la fin de l'EquipEx consistait prioritairement à faciliter son déploiement afin de permettre à des chercheurs d'accéder rapidement à une instance de l'outil, pour une période plus ou moins courte, en contribuant financièrement pour cela. Cet objectif a pu être atteint grâce à la mise en place au sein de Hyphe Browser de la possibilité, au moment de choisir le serveur Hyphe auquel se connecter, de déployer un nouveau serveur chez un hébergeur sur le cloud (OVH, CityCloud ou VexxHost) aux frais de l’utilisateur en quelques clics, sans avoir à solliciter l'équipe de Dime Web.

Permettant de naviguer sur le web tout en constituant son corpus avec Hyphe et de catégoriser ses acteurs tout en visitant leurs pages web, le logiciel complémentaire Hyphe Browser a été financé par l’[IDEFI FORCCAST](http://controverses.org/) pour permettre notamment de former les étudiants à l’exploitation du web en sciences sociales au sein des cours d’analyse des controverses. Outre l’option de déploiement d’instances de Hyphe sur le cloud, sa toute nouvelle [version 2.0](https://github.com/medialab/hyphe-browser/releases) a été entièrement redesignée après de longues observations des expériences d’utilisateurs afin de rendre son usage beaucoup plus intuitif. Enfin cette refonte a permis de rendre l’outil bien plus stable et rapide, et de l’enrichir de nombreuses nouvelles fonctionnalités qui se montreront sans aucun doute très utiles pour de futurs projets de recherche.
