var classement = require("../model/classement.js");
var sequelize = require('../db.js');
var encrypt = require('../encrypt');


module.exports.classements = function (res) {
    var p1 = new Promise((resolve, reject) => {
        sequelize.query("SELECT * FROM classement ORDER BY recordDuree LIMIT 10; ", {
                type: sequelize.QueryTypes.SELECT
            })
            .then(meilleursJoueursGeneralDuree => {
                resolve(meilleursJoueursGeneralDuree);
            }).catch(err => console.log("YOLO : " + err))
    })

    var p2 = new Promise((resolve, reject) => {
        sequelize.query("SELECT * FROM classement ORDER BY recordCoups LIMIT 10; ", {
                type: sequelize.QueryTypes.SELECT
            })
            .then(meilleursJoueursGeneralCoups => {
                resolve(meilleursJoueursGeneralCoups);
            })
    })

    var p3 = new Promise((resolve, reject) => {
        sequelize.query("SELECT * FROM classement WHERE sys_modified BETWEEN (NOW()-INTERVAL 7 DAY) AND NOW() ORDER BY recordDuree LIMIT 10; ", {
                type: sequelize.QueryTypes.SELECT
            })
            .then(meilleursJoueursHebdoDuree => {
                resolve(meilleursJoueursHebdoDuree);
            })
    })
    var p4 = new Promise((resolve, reject) => {
        sequelize.query("SELECT * FROM classement WHERE sys_modified BETWEEN (NOW()-INTERVAL 7 DAY) AND NOW() ORDER BY recordCoups LIMIT 10; ", {
                type: sequelize.QueryTypes.SELECT
            })
            .then(meilleursJoueursHebdoCoups => {
                resolve(meilleursJoueursHebdoCoups)
            })

    })

    Promise.all([p1, p2, p3, p4])
        .then(values => {
            res.render('classement', {
                classements: values
            });
        })
        .catch(err => {
            console.log("Erreur récup des classement : " + err)
            res.redirect('index');
        })


}

module.exports.NouveauRecord = function (req, res) {
    
    var username = req.session.username;
    var tempsNew = req.body.temps;
    var coupsNew = req.body.coups;
    console.log(tempsNew);
    console.log(coupsNew);
    console.log(username);
    
    function isRecordTemps (tempsNew,username) {
        return classement.count({ where: { username: username }})
            .then(function(count){
                if (count =! 0) {
                    return true;
                }
                return false;
            });
    }
    
    function isRecordCoups (coupsNew, username) {
        return classement.count({ where: { username: username }})
            .then(function(count){
                if (count != 0) {
                    return true;
                }
                return false;
            });
    }
    
    isRecordTemps(tempsNew, username).then(function(isUnique){
        if (isUnique) {
            classement.update({
            recordDuree: tempsNew,
            },
            { where: {username: username}} )
            .then(function (users) {})
            .catch(function (error) {
                console.log('Error in Inserting Record', error);
                res.render('error', {
                    title: 'error',
                    error: "Veuillez renseigner les informations d'inscriptions",
                    error2: "Retournez vous inscrire pour avoir un score !"
                });
            });
        }
        else
            res.render('error', {
                title: 'error',
                error: "Veuillez renseigner les informations d'inscriptions",
                error2: "Retournez vous inscrire pour avoir un score !"
            });
    })
                                        
    isRecordCoups(coupsNew, username).then(function(isUnique){
        if (isUnique) {
            classement.update({
            recordCoups: coupsNew,
            },
            { where: {username: username}} )
            .then(function (users) {})
            .catch(function (error) {
                console.log('Error in Inserting Record', error);
                res.render('error', {
                    title: 'error',
                    error: "Veuillez renseigner les informations d'inscriptions",
                    error2: "Retournez vous inscrire pour avoir un score !"
                });
            });
        }
        else
            res.render('error', {
                title: 'error',
                error: "Veuillez renseigner les informations d'inscriptions",
                error2: "Retournez vous inscrire pour avoir un score !"
            });
    })
};
