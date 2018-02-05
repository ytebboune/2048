var user = require("../model/user.js");
var sequelize = require('../db.js');
var encrypt = require('../encrypt');

module.exports.inscription = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;
    if (req.body.email == 'yacine.tebboune@etu.unice.fr')
        var rank = 1;
    else
        var rank = 0;
    if (email != null && password != null) {
        user.create({
            email: email,
            username: username,
            password: password,
            rank: rank
        }).then(function (user) {
            if (email == '' || password == '')
                throw new Error('Veuillez renseigner les informations');
            console.log('Data successfully inserted', user);
            req.session.username = user.dataValues.username;
            req.session.rank = user.dataValues.rank;
            res.render('index', {title: 'index', name: email});

        }).catch(function (error) {
            console.log('Error in Inserting Record', error);
            res.render('error', {
                title: 'error',
                error: "Veuillez renseigner les informations d'inscriptions",
                error2: "Retournez vous inscrire pour saisir une bonne fois pour toute des identifiants corrects !"
            });
        });
    }
};
module.exports.login = function (req, res) {
    var username = req.body.username;
    var password = encrypt(req.body.password);

    user.findOne({
        where: {
            username: username,
            password: password
        }
    }).then(function (user) {
        if (!user) {
            res.render('error', {
                title: 'error',
                error: 'Mauvais login/mdp',
                error2: "Reconnectez vous et saisissez une bonne fois pour toute des identifiants corrects !"
            });
        } else {
            console.log('', user);
            req.session.rank = user.dataValues.rank;
            req.session.username = user.dataValues.username;
            res.redirect('index');

        }
    }).catch(function (error) {
        res.render('error', {
            title: 'error',
            error: 'Mauvais login/mdp',
            error2: "Reconnectez vous et saisissez une bonne fois pour toute des identifiants corrects !"
        });
    });
};

module.exports.disconnect = function(req, res){
    delete req.session.username;
    delete req.session.rank;
    res.redirect('index');
};
