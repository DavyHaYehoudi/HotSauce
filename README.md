
Auteur
👤   SEBBAH Davy 🇫🇷 

📎 Projet 6 - Construire une API sécurisée pour l'application d'avis gastronomiques So Pekocko  


  Le sujet du projet 6 du parcours Développeur web chez Openclassrooms porte sur le développement d'une application d’évaluation des sauces piquantes
pour la marque "So Pekocko".
  L'objectif étant de créer un MVP permettant aux utilisateurs d’ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par
les autres utilisateurs.



Contexte du projet

So Pekocko est une entreprise familiale de 10 salariés.
Son activité principale est la création de sauces piquantes dont la composition est tenue secrète.
Forte de son succès, l’entreprise souhaite se développer et créer une application web, dans laquelle les utilisateurs pourront ajouter leurs sauces
préférées et liker ou disliker les sauces proposées par les autres.



Objectifs et Compétences évaluées

Le but est de créer le backend de l'application, le frontend étant déjà codé et fourni.
Implémenter un modèle logique de données conformément à la réglementation.
Stocker des données de manière sécurisée.
Mettre en œuvre des opérations CRUD de manière sécurisée.
API REST

Sécurité OWASP et RGPD
https://github.com/DavyHaYehoudi/HotSauce/blob/master/P6_05_OWASP.ods
https://github.com/DavyHaYehoudi/HotSauce/blob/master/P6_06_Jwt.png

Instructions relatives à l’API

Note de cadrage 
https://github.com/DavyHaYehoudi/HotSauce/blob/master/P6_03_note%20de%20cadrage.pdf

Guidelines
https://github.com/DavyHaYehoudi/HotSauce/blob/master/P6_04_guidelines%2BAPI.pdf



Contenus de ce repository

Ce repository contient les deux dossiers Frontend et Backend. Vous pouvez cloner ce repository pour récupérer en local les deux parties
Front et Back de l'application.

Architecture solide du site sous MVC
https://github.com/DavyHaYehoudi/HotSauce/blob/master/P6_07_MVC.png

🔨   Installation
Cloner ce projet depuis GitHub.

💡   Faire tourner le Frontend
Ouvrir le terminal sur ce dossier et exécuter npm install pour installer les dépendances.
Exécuter npm install node-sass pour installer sass.
Le projet a été généré avec Angular CLI version 7.0.2.
Démarrer ng serve (ou npm start) pour avoir accès au serveur de développement.
Rendez-vous sur http://localhost:4200.
L'application va se recharger automatiquement si vous modifiez un fichier source.

💡   Faire tourner le Backend
Ouvrir le terminal sur ce dossier.
Pour utiliser le serveur, chargez le package nodemon : npm install -g nodemon.
Puis lancez le serveur: nodemon server.
Pour faire court
Si les packages sont déja installés, ces commandes suffisent à démarrer les serveurs.

npm start via le terminal sur le frontend
nodemon server via le terminal sur le backend
Se connecter à l'url : http://localhost:4200

🖥   Connexion
Ouvrir localhost:4200 dans votre navigateur.
Pour s'inscrire sur l'application, l'utilisateur doit fournir un email et un mot de passe contenant 06 caractères minimum
(dont 1 majuscule, 1 minuscule, 1 chiffre, pas de symbole, espaces autorisés).

📦   Utilisé dans ce projet
Technologies	et outils
Framework: Express,
Visual Studio Code,
Serveur: NodeJS,
Git/GitHub,
Base de données: MongoDB,
Mongoose,
Javascript,
Hébergement sur MongoDB Atlas,
Toutes les opérations de la base de données utilisent le pack Mongoose avec des schémas de données stricts.
