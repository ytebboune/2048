var user = require("../model/user.js");
var sequelize = require('../db.js');
var encrypt = require('../encrypt');
var classement = require ("../model/classement.js")

function isIdUnique(email, username) {
    return user.count({where: {$or: [{email: email}, {username: username}]}})
        .then(function (count) {
            if (count != 0) {
                return false;
            }
            return true;
        });
}

function isEmailAndUsernameUniques(email, username) {
    return user.count({where: [{email: email}, {username: username}]})
        .then(function (count) {
            if (count != 0) {
                return false;
            }
            return true;
        });
}


function isUsernameUnique(username) {
    return user.count({where: {username: username}})
        .then(function (count) {
            if (count != 0) {
                return false;
            }
            return true;
        });
}

function isEmailUnique(email) {
    return user.count({where: {email: email}})
        .then(function (count) {
            if (count != 0) {
                return false;
            }
            return true;
        });
}

module.exports.inscription = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;
    if (req.body.email == 'yacine.tebboune@etu.unice.fr')
        var rank = 1;
    else
        var rank = 0;

    isIdUnique(email, username).then(function (isUnique) {
        if (isUnique) {
            user.create({
                email: email,
                username: username,
                password: password,
                rank: rank
            }).then(function (users) {
                classement.create({
                    username : username,
                    recordTemps : null,
                    recordCoups : null
                });
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
    })
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
            req.session.rank = user.dataValues.rank;
            req.session.username = user.dataValues.username;
            req.session.id_user = user.dataValues.id;
            req.session.email = user.dataValues.email;
        }
    }).catch(function (error) {
        res.render('error', {
            title: 'error',
            error: 'Mauvais login/mdp',
            error2: "Reconnectez vous et saisissez une bonne fois pour toute des identifiants corrects !"
        });
    });
    
    classement.findOne({
        where: {
            username: username
        }
    }).then(function (classement) {
        if (!classement) {
            res.render('error', {
                title: 'error',
                error: 'Mauvais login/mdp',
                error2: "Reconnectez vous et saisissez une bonne cc fois pour toute des identifiants corrects !"
            });
        } else {
            req.session.recordCoups = classement.dataValues.recordCoups;
            req.session.recordDuree = classement.dataValues.recordDuree;
            res.redirect('index');
        }
    }).catch(function (error) {
        res.render('error', {
            title: 'error',
            error: 'Mauvais login/mdp',
            error2: "Reconnectez vous et saisissez une bonne cou fois pour toute des identifiants corrects !"
        });
    });
};

module.exports.disconnect = function (req, res) {
    delete req.session.username;
    delete req.session.rank;
    delete req.session.id;
    res.redirect('index');
};

module.exports.getProfil = function (req, res) {

    if (req.session.username != null) {
        user.findOne({
            where: {
                id: req.session.id_user
            }
        }).then(function (user) {
            var nom = user.dataValues.username;
            var email = user.dataValues.email;

            res.render('myaccount', {
                    nom: nom,
                    email: email
                }
            );
        });
    } else
        res.render('error', {
            title: 'error',
            error: "Vous n'êtes pas connecté",
            error2: "dommage"
        });
};

module.exports.modifProfil = function (req, res) {
    // TODO : Quand on change un élément sans changer le nouveau mdp, met un mdp bizarre
    var email = req.body.emailUser;
    var username = req.body.nomUser;
    var oldMdp = req.body.ancienMdp;
    var newMdp = req.body.newMdp;

    if ((req.body.newMdp == '' || req.body.newMdp == oldMdp) && req.body.emailUser == req.session.email && req.body.nomUser == req.session.username){
        res.render('error', {
            title: 'error',
            error: "Vous n'avez rien changé",
            error2: "Veuillez modifier un élément du profil"
        });
        return;
}

    if (req.body.ancienMdp == '') {
        res.render('error', {
            title: 'error',
            error: "Vous n'avez pas renseigné votre ancien mot de passe",
            error2: "dommage"
        });
        return;
    }

    if (req.body.newMdp == ''){
        newMdp = oldMdp;
    }

    if (req.body.nomUser == ''){
        username = req.session.username;
    }
    if (req.body.emailUser == ''){
        email = req.session.email;
    }

    console.log(newMdp);
    isIdUnique(email, username).then(function (isUnique) { // CAS : LES 2 SONT UNIQUES
        if (isUnique) {
            user.update({
                    username: username,
                    email: email,
                    password: newMdp
                },
                {
                    where: {
                        id: req.session.id_user,
                        password: encrypt(req.body.ancienMdp)
                    }
                })
                .then(function (user) {
                    classement.update({
                            username: req.body.nomUser,
                        },
                        {
                            where: {
                                id: req.session.id_user,
                            }
                        });
                    req.session.username = req.body.nomUser;
                    req.session.email = req.body.emailUser;
                    res.redirect('/index');
                }).catch(function (error) {
                res.render('error', {
                    title: 'error',
                    error: "Vous n'êtes pas connecté",
                    error2: "dommage"
                });
            })
        }
        else if (req.body.nomUser == req.session.username && req.body.emailUser == req.session.email && req.body.newMdp != '' ){
            user.update({
                    password: req.body.newMdp
                },
                {
                    where: {
                        id: req.session.id_user,
                        password: encrypt(req.body.ancienMdp)
                    }
                })
                .then(function (user) {
                    classement.update({
                            username: req.body.nomUser,
                        },
                        {
                            where: {
                                id: req.session.id_user,
                            }
                        });
                    res.redirect('/index');
                }).catch(function (error) {
                res.render('error', {
                    title: 'error',
                    error: "Vous n'êtes pas connecté",
                    error2: "dommage"
                });
            });
        }
        else if (req.body.emailUser == req.session.email) { // CAS : L'USER NE CHANGE PAS SON EMAIL
            isUsernameUnique(username).then(function (isUsernameUnique) {
                if (isUsernameUnique) {

                    user.update({
                            username: req.body.nomUser,
                            password: newMdp
                        },
                        {
                            where: {
                                id: req.session.id_user,
                                password: encrypt(req.body.ancienMdp)
                            }
                        })
                        .then(function (user) {
                            classement.update({
                                    username: req.body.nomUser,
                                },
                                {
                                    where: {
                                        id: req.session.id_user,
                                    }
                                });
                            req.session.username = req.body.nomUser;
                            res.redirect('/index');
                        }).catch(function (error) {
                        res.render('error', {
                            title: 'error',
                            error: "Vous n'êtes pas connecté",
                            error2: "dommage"
                        });
                    })
                }
                else {
                    res.render('error', {
                        title: 'error',
                        error: "L'Username que vous avez décidé de choisir est déjà pris ou n'est pas autorisé ",
                        error2: "Veuillez en choisir un nouveau"
                    });
                }
            })
        }
        else if (req.body.nomUser == req.session.username) { // CAS : L'USER NE CHANGE PAS SON USERNAME
            isEmailUnique(email).then(function (isEmailUnique) {
                    if (isEmailUnique) {
                        user.update({
                                email: email,
                                password: newMdp
                            },
                            {
                                where: {
                                    id: req.session.id_user,
                                    password: encrypt(req.body.ancienMdp)
                                }
                            })
                            .then(function (user) {
                                classement.update({
                                        username: req.body.nomUser,
                                    },
                                    {
                                        where: {
                                            id: req.session.id_user,
                                        }
                                    });
                                req.session.email = req.body.emailUser;
                                res.redirect('/index');
                            }).catch(function (error) {
                            res.render('error', {
                                title: 'error',
                                error: "Vous n'êtes pas connecté",
                                error2: "dommage"
                            });
                        })
                    }

                    else {
                        res.render('error', {
                            title: 'error',
                            error: "L'Email que vous avez décidé de choisir est déjà pris ou n'est pas autorisé",
                            error2: "Veuillez en choisir un nouveau"
                        });
                    }

                }
            )
        }

        else {
            res.render('error', {
                title: 'error',
                error: "Vous n'avez rien changé",
                error2: "Veuillez modifier un élément du profil"
            });
        }
    });
}
    module.exports.modifMdp = function (req, res) {
        if (req.body.newMdp.length >= 6) {
            var pwd = req.body.newMdp;
            user.update({
                password: pwd,
            }, {
                where:
                    {
                        id: req.session.id_user,
                        password: encrypt(req.body.ancienMdp)
                    }
            })
                .then(function (user) {
                    res.redirect('/index');
                }).catch(function (error) {
                res.render('error', {
                    title: 'error',
                    error: "Vous n'êtes pas connecté",
                    error2: "dommage"
                });
            })
        } else {
            res.render('error', {
                title: 'error',
                error: "Le mot de passe doit contenir au moins 6 caractères",
                error2: "dommage"
            });

        }
    }

module.exports.getUsers = function(req, res){
    if (req.session.rank == 1) {
        sequelize.query("SELECT * FROM `users`", { type: sequelize.QueryTypes.SELECT})
            .then(listeUsers=>{
            res.render("admin", {listeUsers: listeUsers});
    })

    }
    else
        res.render('error',{
            title: 'error',
            error: "Vous n'avez pas les droits suffisants pour accéder à cette page",
            error2: "Dommage !"
        });
}

module.exports.supprimerUsers =  function(req, res){

    user.destroy({
        where: { id: req.body.idUsers }
    }).then(user => {
        classement.destroy({
        where: { id: req.body.idUsers }
    })
    res.render('index');
}).catch(function (error) {
        res.render('error', {
            title: 'error',
            error: "Erreur lors de la suppression",
            error2: "dommage"
        });
    });

}
