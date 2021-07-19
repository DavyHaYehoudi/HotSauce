
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');
const validator = require('validator');


const userSchema = mongoose.Schema({

  email: { type: String, required: true, unique: true, validate: [validator.isEmail, { error: 'adresse mail non valide' }] },
  password: { type: String, required: true },

});

userSchema.plugin(uniqueValidator);

// Plugin pour Mongoose qui purifie les champs du model avant de les enregistrer dans la base MongoDB. Utilise le HTML Sanitizer de Google Caja pour effectuer la désinfection.
userSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model('User', userSchema); 