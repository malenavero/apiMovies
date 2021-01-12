const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const passportConfig = require('./passport');
const passport = require('passport');
const session = require('express-session');

const sessionMiddleware = session({
    name: "apiMovie",
    secret: "s3cr3t_k3y",
    saveUninitialized: false, //si no esta inisializado no lo guarda
    resave: false //si te loguias multiples veces guarda la original, optimiza la velocidad
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

module.exports = app;
