require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier
const path = require('path');

//Protège les headers HTTP
const helmet = require('helmet');

//Sécurisation des cookies
const session = require('cookie-session');

//Désactivation de la mise en cache du navigateur
const nocache = require('nocache');



//Importation des routes dédiées aux sauces et aux utilisateurs
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

//Utilisation du module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
require('dotenv').config(); 
let cors = require('cors')

//Connection à la base de données MongoDB avec la sécurité vers le fichier .env pour cacher le mot de passe
//L'un des avantages que nous avons à utiliser Mongoose pour gérer notre base de données MongoDB est que nous pouvons implémenter des schémas de données stricts
//qui permettent de rendre notre application plus robuste
mongoose.connect(process.env.DB_URL,
  { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requêtes depuis son navigateur. A noter qu'on ne précise pas d'adresse en 1er paramètre afin que ce middleware s'applique à toutes les routes.
app.use((req, res, next) => {
  //On indique que les ressources peuvent être partagées depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  //On indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //On indique les méthodes autorisées pour les requêtes HTTP
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Options pour sécuriser les cookies
const expiryDate = new Date(Date.now() + 3600000); 
app.use(session({
  name: 'session',
  secret: process.env.SEC_SES,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'http://localhost:3000',
    expires: expiryDate,
  }
}));

//Pour gérer la demande POST provenant de l'application front-end, nous devrons être capables d'extraire l'objet JSON de la demande
app.use(bodyParser.json());

app.use(cors());
app.use(helmet());
app.use(nocache());
  
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;


