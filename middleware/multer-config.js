//Fichier permettant de gérer les fichiers entrants dans les requêtes http

const multer = require('multer');

//Lexique des types MIME pour définire le format des images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Indication à Multer du lieu d'enregistrement des fichiers entrants 
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
//Indication à Multer du nom d'enregistrement des fichiers entrants 
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    //Appel du callback, on passe null pour dire qu'il n'y a pas d'erreur
    callback(null, name + Date.now() + '.' + extension);
  }
});

//On exporte le module, on lui passe l'objet storage, la méthode single pour dire que c'est un fichier unique (et non un groupe de fichiers) et on précise que c'est une image
module.exports = multer({ storage: storage }).single('image');