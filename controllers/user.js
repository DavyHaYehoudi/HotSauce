//Fichier de la logique métier des utilisateurs

//Utilisation de l'algorithme bcrypt pour hasher le mot de passe des utilisateurs
const bcrypt = require('bcrypt')
//Utilisation du package jsonwebtoken pour attribuer un token à un utilisateur au moment ou il se connecte
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config(); // charger la configuration des variables d'environnement



// SIGNUP : Création nouvel utilisateur et cryptage de son mot de passe avec un hash généré par bcrypt

exports.signup = (req, res, next) => {
  //Conditions validité du mot de passe
  if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/.test(req.body.password)) {  
    return res.status(401).json({ error: 'Le mot de passe doit contenir une lettre majuscule, une minuscule et au moins 1 chiffre (6 caractères minimum)' });
  } else {
    //Le sel (10) est le nombre de tours de l'algorithme
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
           //Email trouvé dans le corps de la requête
          email: req.body.email,
          //Récupération du mot de passe hashé par bcrypt
          password: hash
        })
        //Enregistrement du nouvel utilisateur dans la BDD
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  }
};

// LOGIN : Vérification si l'utilisateur existe dans la base MongoDB

exports.login = (req, res, next) => {
  //Recherche si le login existe déjà dans la BDD
  User.findOne({ email: req.body.email })  
    .then(user => {
      if (!user) { // Si le login n'est pas existant
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // Si le login correspond à un login existant dans la BDD on vérifie ensuite la bonne comparaison du mot de passe
        .then(valid => { // Boolean
          if (!valid) { //Si Faux
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({ //Si vrai, on envoie un statut 200 et le serveur backend envoie un token au frontend
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.TOKEN,
              { expiresIn: '8h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
