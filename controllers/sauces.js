// Fichier de toute la logique métier des modèles

// Importation du modèle Sauce.
const Sauce = require('../models/Sauces');

//Importation de file system(fs) pour ne pas saturer le serveur de fichiers inutiles après suppression ou modification
const fs = require('fs');

//Récupération d'une seule sauce en particulier identifiée par MongoDB par un Id
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

//Récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
}

//Création d'une nouvelle sauce
exports.createSauce = (req, res, next) => {

  //Les données du frontend sont sous format form-data, on les convertit en Js
  let sauceObject = JSON.parse(req.body.sauce);
  //Suppression de l'Id généré automatiquement par MongoDB lors de la création dans la BDD
  delete sauceObject._id;
  //Création d'une instance du modèle Sauce
  const sauce = new Sauce({
    ...sauceObject,
    //Récupération dynamique de l'URL
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  //Sauvegarde dans la BDD
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch(error => res.status(400).json({ error }));
}

//Modification d'une sauce
exports.modifySauce = (req, res, next) => {
  let sauceObject = {};
  req.file ? (

          //Si la modification contient une image on utilise l'opérateur ternaire comme structure conditionnelle.
          Sauce.findOne({
            _id: req.params.id
          }).then((sauce) => {
            //Suppression de l'ancienne image du serveur
            const filename = sauce.imageUrl.split('/images/')[1]
            fs.unlinkSync(`images/${filename}`)
          }),
          sauceObject = {
            //Modification des données et on ajoute la nouvelle image
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${
              req.file.filename
            }`,
          }
      ) : ( 
      //Si la modification ne contient pas de nouvelle image
      sauceObject = {
        ...req.body
      }
    )
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
    .catch(error => res.status(400).json({ error }));
};

//Suppression d'une sauce en particulier
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};


//Like sauce
exports.likeSauce = (req, res, next) => {
  switch (req.body.like) {
    // Par défaut = 0
    //Vérification que l'utilisateur n'a pas déjà liké
    case 0:
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.find(user => user === req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
              _id: req.params.id
            })
              .then(() => { res.status(201).json({ message: 'Votre avis a été pris en compte!' }); })
              .catch((error) => { res.status(400).json({ error: error }); });

            //Vérification que l'utilisateur n'a pas déjà disliké
          } if (sauce.usersDisliked.find(user => user === req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
              _id: req.params.id
            })
              .then(() => { res.status(201).json({ message: 'Votre avis a été pris en compte!' }); })
              .catch((error) => { res.status(400).json({ error: error }); });
          }
        })
        .catch((error) => { res.status(404).json({ error: error }); });
      break;
    //Likes = 1 
    case 1:
      Sauce.updateOne({ _id: req.params.id }, {
        $inc: { likes: 1 },
        $push: { usersLiked: req.body.userId },
        _id: req.params.id
      })
        .then(() => { res.status(201).json({ message: 'Votre like a été pris en compte!' }); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;

    //Dislikes = -1
    case -1:
      Sauce.updateOne({ _id: req.params.id }, {
        $inc: { dislikes: 1 },
        $push: { usersDisliked: req.body.userId },
        _id: req.params.id
      })
        .then(() => { res.status(201).json({ message: 'Votre dislike a été pris en compte!' }); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;
      default:
      console.error('mauvaise requête');
  }
}