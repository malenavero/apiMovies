const express = require('express');
const router = express.Router();
const passport = require('passport');

const movieController = require('./../controllers/movieController');
const movieService = require('./../services/movieService');
const movieInstance = new movieController(new movieService());

const userController = require('./../controllers/userController');
const userService = require('./../services/userService');
const userInstance = new userController(new userService());

const checkAdmin = require('../utils/checkAdmin');
const checkLogin = require('../utils/checkLogin');


//CONFIG MULTER
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});
const upload = multer({ storage: storage });

/* GET home page. */

router.get('/', function(req, res, next) {
  res.send("index");
});

/*LOGIN Y VERIFY*/

//passport.auth ejecuta una funcion de passport que es la que utiliza la estrategia local(recibe la info del post y valida con la db
router.post("/users/login", passport.authenticate("local"), (req, res, next) => {
  res.send("usuario logueado con exito")
});

//req.user es algo que crea passport, donde guarda la info (en passport.session en la memoria) del usuario logueado
router.get("/users/verify", (req, res, next) => {
  res.send(req.user)
});


/* MOVIES */

//Muestra un array con todas las películas. Solo se puede acceder autenticado
router.get('/movies', checkLogin, (req, res, next) => {
  movieInstance.getMovies(req, res);
});

//Muestra la información de una película especīfica. Solo se puede acceder autenticado
router.get('/movies/:id', checkLogin, (req, res, next) => {
  movieInstance.getMovieById(req, res);
});

//Sirve para crear una película en la base de datos. Necesita estar autenticado y ser admin para que se ejecute
router.post('/movies', checkAdmin, upload.single("image"), (req, res, next) => {
  movieInstance.postMovie(req, res);
});

//Sirve para modificar una película en la base de datos. Necesita estar autenticado y ser admin para que se ejecute
router.put('/movies/edit/:id', checkAdmin, upload.single("image"), (req, res, next) => {
  movieInstance.editMovie(req, res);
});

//Sirve para borrar una película de la base de datos. Necesita estar autenticado y ser admin para que se ejecute
router.delete('/movies/delete/:id', checkAdmin, (req, res, next) => {
  movieInstance.deleteMovie(req, res);
});

/* USERS */

//Muestra una lista de usuarios, no tiene restricciones de acceso
router.get('/users', (req, res, next) => {
  userInstance.getUsers(req, res);
});

//Muestra la información de un usuario particular, no tiene restricciones de acceso
router.get('/users/:id', (req, res, next) => {
  userInstance.getUserById(req, res);
});

//Sirve para crear un usuario en la base de datos, no tiene restricciones de acceso
router.post('/users', (req, res, next) => {
  userInstance.postUser(req, res);
});

//Sirve para modificar un usuario en la base de datos. Necesita estar autenticado y ser admin para que se ejecute
router.put('/users/edit/:id', checkAdmin, (req, res, next) => {
  userInstance.editUser(req, res);
});

//Sirve para borrar un usuario de la base de datos. Necesita estar autenticado y ser admin para que se ejecute
router.delete('/users/delete/:id', checkAdmin, (req, res, next) => {
  userInstance.deleteUser(req, res);
});

module.exports = router;
