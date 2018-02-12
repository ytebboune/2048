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
    function isIdUnique (email, username) {
        return user.count({ where: { $or: [{email: email}, {username: username}] }})
            .then(function(count){
                if (count != 0) {
                    return false;
                }
                return true;
            });
    }
    isIdUnique(email, username).then(function(isUnique){
        if (isUnique) {
            user.create({
                email: email,
                username: username,
                password: password,
                rank: rank
            }).then(function (users) {
                if (email == '' || password == '')
                    throw new Error('Veuillez renseigner les informations');
                res.redirect('index');

            }).catch(function (error) {
                console.log('Error in Inserting Record', error);
                res.render('error', {
                    title: 'error',
                    error: "Veuillez renseigner les informations d'inscriptions",
                    error2: "Retournez vous inscrire pour saisir une bonne fois pour toute des identifiants corrects !"
                });
            });
        }
        else
            res.render('error', {
                title: 'error',
                error: "Utilisateur déjà existant",
                error2: "Retournez vous inscrire pour saisir une bonne fois pour toute des identifiants corrects !"
            });
    })};

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
            req.session.id_user = user.dataValues.id;
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
    delete req.session.id;
    res.redirect('index');
};

module.exports.getProfil = function(req, res){

    if (req.session.username != null){
        user.findOne({
            where: {
                id: req.session.id_user
            }
    }).then(function(user){
        var nom = user.dataValues.username;
        var email = user.dataValues.email;

        console.log(req.session.id);

        res.render('myaccount',{
            nom: nom,
            email: email
        }
        );
    });
    } else
        res.render('error',{
            title: 'error',
            error: "Vous n'êtes pas connecté",
            error2: "dommage"
    });
};

module.exports.modifProfil = function(req,res){

    user.update({
        username: req.body.nomUser,
        email: req.body.emailUser,
    },
    { where: {id: req.session.id_user}} )
    .then(function(user){
        res.redirect('/index');
    }).catch(function(error){
            res.render('error',{
            title: 'error',
            error: "Vous n'êtes pas connecté",
            error2: "dommage"
    });
    })
}