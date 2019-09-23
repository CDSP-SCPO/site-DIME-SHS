# Journal de bord

## Lundi 23 septembre 2019

⏳ + 1j

- **largeur image/schema de fonctionnement** • [#56](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/56)<br>
Création d'une classe CSS supplémentaire `.full-bleed` pour permettre à une image de déborder du conteneur principal.
- **Ajouter l'effet "snap" entre les slides** • [#26](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/26)<br>
Finalisation du code qui met à jour la pastille de progression. Le résultat n'est pas satisfaisant au niveau des actualités dans Firefox.
- **template page 404* • [#57](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/57)<br>
Correction des liens en sidenote (qui étaient en gris sur fond gris).
- **Le script d'import Spire/Zotero est automatisé au rythme d'une fois par jour** • [#67](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/67)<br>
La commande optionnelle casse — elle est passée en script npm.
- **intégration de la Spreadsheet de mapping des catégories** • [#66](https://github.com/CDSP-SCPO/site-DIME-SHS/issues/66)<br>
Prise en compte de 2 retours : ajustement de la prise en compte des dates, et des URL/sources identiques (dans le cas des Datascapes notamment).


## Vendredi 20 septembre 2019

- **Le script d'import Spire/Zotero est automatisé au rythme d'une fois par jour** • [#67](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/67)<br>
Ajustement car le job est en erreur s'il n'y a pas de changement côté Zotero/Spire.

## Jeudi 19 septembre 2019

⏳ + 0.25j

- **Ajouter l'effet "snap" entre les slides** • [#26](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/26)<br>
J'ai trouvé une solution satisfaisante pour avoir le snap _et_ pour maintenir/simplifier le clic sur les ancres. Ce qu'il reste à faire c'est de mettre à jour les pastilles de progression en écrivant du code/contournant le code initial.


## Mardi 17 septembre 2019

⏳ + 0.25j

- **Ajouter l'effet "snap" entre les slides** • [#26](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/26)<br>
Ajout de l'effet mais ça change la structure de la page, du coup ça casse la mise à jour de l'activation des pastilles de progression. Je tente une solution mais ça ne marche pas, alors je laisse tomber en vue de revenir dessus à tête reposée.

## Lundi 16 septembre 2019

⏳ + 0.5j

- **Gabarit : Contributeurs** • [#24](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/24)<br>
Mise en forme des co-financeurs en grille et des partenaires, aucune embûche.
- **Mettre à jour vers Hugo 0.55.6** • [#63](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/63)<br>
L'installation est reproductible, gérée avec Node.js (oui c'est paradoxal).
- **Le script d'import Spire/Zotero est automatisé au rythme d'une fois par jour** • [#67](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/67)<br>
C'est un premier jet, on verra bien en action si l'intégration continue arrive à commiter et publier sur Git — c'est un choix pour toujours avoir un lien direct entre ce qui est publié en HTML/ligne et l'historique Git.
- **template page 404* • [#57](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/57)<br>
Aucune embûche.

## Mardi 10 septembre 2019

⏳ + 0.5j

- appel avec Amélie pour faire le point sur la consommation du budget (1j en tout depuis le début)
- **Productions / Publications : l'ordonnancement est antéchronologique (le plus récent en haut) puis par ordre alphabétique du nom du premier auteur** • [#68](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/68)<br>
J'ai passé le plus clair de mon temps à faire des aller-retours entre l'écriture des tests unitaires pour homogénéiser les dates, afin de rendre le champ utile pour le tri. Quelques cas de figure pas repérés lors de l'écriture du ticket ont fait leur apparition lors de l'import de données. Les tests se sont avérés utiles pour éviter les régressions.<br>
Ça a clairement pris plus de temps que prévu.

## Lundi 9 septembre 2019

⏳ + 0.25j

- **Urls de publications invalides** • [#69](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/69)<br>
Tout s'est déroulé comme prévu et sans accroc.
- **Gestion des HTMLEntities dans les titres des publications ** • [#64](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/64)<br>
Tout s'est déroulé comme prévu et sans accroc.
- mise en place de tests unitaires, je sens que ça peut/va être utile.

## Vendredi 6 septembre 2019

⏳ + 0.25j

- **pagination des données Zotero** • [#64](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/64)<br>
Tout s'est déroulé comme prévu et sans accroc. Fonctionnalité finalisée.
- **intégration de la Spreadsheet de mapping des catégories** • [#66](https://github.com/CDSP-SCPO/site-DIME-SHS/issues/66)<br>
Intégration des ajustements suite aux retours d'Amélie et de Benjamin. J'ai discuté sur le chan irc #medialab pour avoir des infos sur le mapping des catégories Spire — rien de concret pour l'API XML. Je trouve risqué et coûteux en temps/résultat de passer sur l'API JSON-RPC qui n'est pas plus documenté.

## Jeudi 5 septembre 2019

⏳ + 0.5j

- **intégration de la Spreadsheet de mapping des catégories** • [#66](https://github.com/CDSP-SCPO/site-DIME-SHS/issues/66)<br>
J'ai [documenté dans un commentaire de la PR](https://github.com/CDSP-SCPO/site-DIME-SHS/pull/66#issuecomment-528386172) quoi regarder au niveau 1) du mapping et 2) des données, pour s'assurer qu'il n'y a pas de régression.

## Mercredi 4 septembre 2019

⏳ + 0.25j

- **intégration de la Spreadsheet de mapping des catégories** • [#66](https://github.com/CDSP-SCPO/site-DIME-SHS/issues/66)<br>
La finalisation s'est passée sans problème :
  1. les libellés sont traduits en français et en anglais ;
  2. le script affiche une erreur "humainement compréhensible" si le type d'un item Spire ou Zotero n'est pas connu ; l'import ne va pas plus loin
  3. j'ai même corrigé un défaut d'affichage des `<nom, prénom>` dans l'import Spire


## Mardi 3 septembre 2019

⏳ + 0.25j

- **intégration de la Spreadsheet de mapping des catégories** • [#66](https://github.com/CDSP-SCPO/site-DIME-SHS/issues/66)<br>
Finalement je n'ai pas opté pour l'utilisation de l'export CSV du mapping pour deux raisons :
  1. l'export CSV n'est pas compris par le [générateur de site Hugo](https://gohugo.io) (les retours à la ligne dans le CSV ne sont pas compris) ;
  2. les API Zotero et Spire retournent des identifiants de type ("bookPart") tandis que la feuille contient des libellés en français ("Partie d'ouvrage")
Je fais le choix de rendre plus explicite dans le fichier de configuration (`config.toml`), en faisant un mapping pour Spire, et un pour Zotero, construit à la main à partir de la Spreadsheet.
- quand j'arrête de travailler, il me reste 2 choses à terminer :
  - terminer l'action en erreur si le script rencontre un mapping manquant lors de l'import ;
  - ajuster les fichiers de traduction des types de production (`i18n/{en,fr}.toml`)

## Lundi 2 septembre 2019

- [revue et priorisation du backlog](https://github.com/CDSP-SCPO/site-DIME-SHS/projects/4)

---

## Vendredi 27 juillet 2018

### Ce que j'ai fait

- j'ai terminé le gabarit publications
- j'ai fait 2-3 corrections à la marge pour les polices de caractères
- j'ai ajouté les libellés en anglais pour les enquêtes

### Ce que je compte faire demain

- je t'envoie la maquette de la nouvelle home
- achever les bugs
- terminer les actualités
- le footer
- balises ouvrantes/fermantes

### Ce qui me bloque ou me ralentit

- la chaleur, j'étais KO aujourd'hui

## Jeudi 26 juillet 2018

### Ce que j'ai fait

- j'ai terminé le gabarit outils
- j'ai terminé le gabarit enquêtes
- j'ai ajouté les analytics

### Ce que je compte faire demain

- je termine la table des matières du gabarit instruments
- je fais le gabarit publications
- je m'occupe des bugs

### Ce qui me bloque ou me ralentit

- il y a peut-être plus de choses à faire que de temps disponible

## Mercredi 25 juillet 2018

### Ce que j'ai fait

- j'ai terminé la page d'accueil et les actualités
- j'ai fait une bonne passe sur les notes de bas de page/latérales
- j'ai quasiment terminé le gabarit instruments

### Ce que je compte faire demain

- je termine la table des matières du gabarit instruments
- je m'attaque aux enquêtes
- je fais le gabarit outils
- je fais le gabarit publications

### Ce qui me bloque ou me ralentit

- il y a peut-être plus de choses à faire que de temps disponible

## Mardi 24 juillet 2018

**Remarque de Thomas** : comme j'ai pas été productif du tout hier, je travaillerai un jour de plus (lundi ou mardi prochain).

### Ce que j'ai fait

- j'ai présenté le site et le travail de la semaine dernière à la réunion d'équipe — ils et elles ont trouvé ça chouette
- j'ai mis en place le déploiement automatique des _pull request_
- j'ai terminé de mettre en place Hugo comme nouveau générateur de contenu
- j'ai mis en place la navigation principale et secondaire
- j'ai mis en place la bascule de langue et la correspondance des traductions
- j'ai commencé à m'attaquer à la page d'accueil

### Ce que je compte faire demain

- terminer la page d'accueil — sans l'animation
- demander à Claire et Lisa où en est l'iconographie
- m'attaquer à la page instruments
- puis m'attaquer aux enquêtes

### Ce qui me bloque ou me ralentit

- c'est quoi l'iconographie ? **Réponse** : ce sont les illustrations qui décrivent les différents instruments

## Lundi 23 juillet 2018

### Ce que j'ai fait

- poursuite du contenu
- mise en place du multi-lingue

### Ce que je compte faire demain

- terminer la mise en place du multi-lingue
- prioriser l'intégration de la home, des instruments et d'une page qui contient des cartes de présentation
- corriger des liens erronés dans les enquêtes

### Ce qui me bloque ou me ralentit

- j'ai galéré sur le réglage multi-lingue du générateur HUGO — ça a marché jusque 15h et depuis, j'ai dû changer quelque chose sans réussir à revenir à un état fonctionnel :-(

---

## Vendredi 20 juillet 2018

### C'était chouette

- on a bien dépoté ; les contenus c'est fini-fini
- d'avoir vu vraiment comment fonctionnaient les fichiers et comment le projet allait marcher
- on y est allé moins comme des bourrins, plus fluide
- j'ai réussi à mieux trier mes emails et les réactions avec le monde extérieur
- on a fini avant 21h
- je suis allée voir les lombrics composteurs (et les nourrir !)
- j'ai l'impression d'avoir davantage la maitrise de ce que je te donne, que tu comprends tous les jeux et qu'on le construit ensemble — ça aurait pu être chiant mais c'est facile
- avoir 2 nouveaux logiciels installés sur l'ordinateur et d'à peu près savoir comment ils fonctionnent (surtout pour éditer du texte)
- je repars à la maison avec des réponses/éclaircissements sur tous les trucs flous jusqu'à présent
- je suis content de la facilité des échanges avec les personnes extérieures mais impliquées dans le projet : on envoie un mail et une heure aprés on peut avoir une interaction de visu avec ces gens
- c'était cool de bosser avec toi car tu sais ce que tu veux et c'est facile d'avancer dessus: y'a pas de chichi, une question, une réponse, on réfléchit ensemble et ça avance
- j'ai bien aimé que tu changes toute seule le gabarit html.


### Je changerais bien un truc lundi

- de méthode de travail pour travailler à distance
- essayer autre chose que infogram pour faire les graphiques (j'ai l'impression d'être dans une impasse)
- proposer des réunions quotidiennes de suivi du projet avec l'équipe
- j'irai acheter de la salade de poulpe
- Y'a qu'à : c'est surtout des trucs à faire, rien à changer.

### Ça me pèse ou me ralentit

- je me sentirai rassurée quand il y aura la couche graphique
- toujours la chaleur

## Jeudi 19 juillet 2018

### C'était chouette

- on a mangé de la pastèque
- je pense qu'on a bien avancé sur la partie publications — hier on avait rien, aujourd'hui a avancé
- je pense vraiment que le fait que tu sois là fasse avancer les choses plus vite
- j'ai bien aimé bossé avec Lisa et Claire, j'ai l'impression qu'on est sur une version plutôt finale (plus équilibré) — ça m'a rassuré
- le fait que Claire et Lisa, ça nous a permis d'aller plus vite en le faisant ensemble
- j'ai bien aimé que Benjamin rentre de vacances, y'a des choses qui avancent plus vite
- ça m'a rassuré que tu poses la question des animations parce que ce n'était pas clair, on arrive à expliciter les trucs
- mettre les mains dans le cambouis dans le sujet des publi qui me parassait épineux
- je suis contente qu'on ait eu ce temps à 4 pour progresser de manière qualitative et de s'aligner de manière pragmatique : on a été rassurée, alegée en charge de travail et moi je vais où ça va
- je suis content que ce soit fluide entre nous 4 pour travailler

### Je changerais bien un truc demain

- aller au bout des petits post-it qui restent (redirections, etc)
- être sur que l'on a bien couvert les différents cas de figure pour couvrir les angles morts et repartir tranquille demain.

### Ça me pèse ou me ralentit

- toujours le manque de sommeil
- je vois des sujets qui peuvent être chronophages et j'ai la conscience du temps qui va rester


## Mercredi 18 juillet 2018

### C'était chouette

- J'ai l'impression d'avoir appris des trucs (Markdown, fonctionnement de GitHub)
- Ta présence incite les gens à avancer (sur le projet, sur les contenus)
- Ça devient beaucoup plus concret pour moi car on a listé pas mal de choses à faire
- Le fonctionnement au vidéoprojecteur et la possibilité travailler le contenu et la disposition des pages au tableau blanc
- j'ai apprécié te voir devenir autonome, ta capacité à rentrer dans les outils (github) et à transférer des contenus
- rencontrer les personnes impliquées dans le projet et qui ont un avis à exprimer
- l'espace de travail : pourvoir ecrire sur les murs et ne pas être dérangés
- j'adore aborder le projet par le contenu, c'est un des trucs qui me fait le plus plaisir de pouvoir aider la personne qui est à l'origine des contenus
- manger des glaces aprés le repas!

### Je changerais bien un truc demain

- J'irai courir
- Utiliser les post-its réutilisables
- Installer GitHub Desktop sur ma machine
- Finir plus tôt
- Utiliser le ventilateur
- Manger une grosse burrata!


### Ça me pèse ou me ralentit

- La charge de travail qui se déporte sur moi (ça finit dans ma boîte mail au lieu d'être fait)
- le manque de sommeil et la chaleur
- j'ai une petite inquiétude sur la fusion des données issues de Zotero et SPIRE... je vais devoir le garder en tâche de fond
