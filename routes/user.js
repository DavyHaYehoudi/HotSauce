//Fichier contenant les fonctions s'appliquant aux différentes routes pour les utilisateurs

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;