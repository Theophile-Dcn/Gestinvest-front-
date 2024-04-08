# Welcome to GestInvest

Ce projet a été élaboré pour résoudre les difficultés rencontrées dans le suivi des actifs financiers. Afin d'éviter la nécessité de naviguer entre différents fichiers Excel et de consulter plusieurs sites web où il détient ses actifs.

## La conception

Ce projet est conçu selon un modèle React avec le support de TypeScript.

### Qu'est-ce que React

React est une bibliothèque JavaScript populaire utilisée pour la construction d'interfaces utilisateur interactives et réactives.

### Qu'est-ce que TypeScript

TypeScript est une surcouche de JavaScript qui ajoute des fonctionnalités de typage statique au langage, ce qui permet de détecter les erreurs plus tôt dans le processus de développement.

## L'installation du projet

Pour pouvoir utiliser le projet, plusieurs étapes sont nécessaires :

### Etape 1: cloner le dépôt

Pour cloner le dépôt du projet, exécutez la commande suivante :

```bash
git clone git@github.com:O-clock-Katsudon/projet-01-gestinvest-front.git
```

### Etape 2: installation des dépendances

Ce projet a été élaboré en Node.js. Assurez-vous d'avoir Node.js installé sur votre machine avant de continuer.

Pour installer ces dépendances, vous avez plusieurs possibilités :

**_Dans le cas d'une commande pnpm_**

pnpm est un gestionnaire de paquets alternatif à npm et Yarn. Contrairement à npm et Yarn, pnpm adopte une approche de gestion de l'espace disque et de la mémoire différente. Au lieu de dupliquer les dépendances dans chaque projet, pnpm les stocke dans un emplacement global et les lie symboliquement dans chaque projet. Cela permet d'économiser de l'espace disque et de réduire le temps d'installation en évitant la duplication des modules.

```bash
pnpm i
```

**_Dans le cas d'une commande npm_**

npm est le gestionnaire de paquets par défaut pour l'environnement Node.js. Il permet aux développeurs d'installer, de publier et de gérer des paquets JavaScript, qui sont des bibliothèques ou des modules réutilisables de code. npm est largement utilisé dans l'écosystème Node.js et est livré avec Node.js lors de son installation. Les utilisateurs peuvent accéder à un vaste registre de paquets npm contenant des milliers de modules open source.

```bash
npm i
```

## Lancement du projet

Maintenant que les dépendances sont installées, nous arrivons au lancement du projet.

**_Dans le cas d'une commande pnpm_**

```bash
pnpm dev
```

**_Dans le cas d'une commande npm_**

```bash
npm run dev
```
