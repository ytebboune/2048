var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
var app = express();

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
var userController = require("./controller/user.js");

logger.info('server start');

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

app.post('/create', userController.inscription);
app.post('/loginVerif', userController.login);

app.listen(1313);


