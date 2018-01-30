var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
var userController = require("./controller/user.js");

app.use(session({
    secret: 'keyboard cat',
    cookie: {}
}));

app.use(function (req, res, next) {
    res.locals._rank = req.session.rank;

    res.locals._error = req.query.error;
    res.locals._success = req.query.success;

    next();
});

app.get('/', function(req, res){
    res.redirect('index');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.get('/index', function(req, res){
    res.render('index');
});

app.get('/register', function(req, res){
    res.render('register');
});

app.get('/admin', function(req, res){
    if (req.session.rank == 1)
        res.render('admin');
    else
        res.render('error',{
        title: 'error',
            error: "T'ES PAS ADMIN gros con",
            error2: "oui"
    });
});

app.post('/create', userController.inscription);
app.post('/loginVerif', userController.login);

app.listen(1313);


