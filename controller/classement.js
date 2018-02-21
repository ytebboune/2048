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
    var recordCoups = req.session.recordCoups;
    var recordTemps = req.session.recordDuree;
    
    console.log("nv tmp: " + tempsNew);
    console.log("nv cp: " + coupsNew);
    console.log("rc tmp: " + recordTemps);
    console.log("rc cp: " + recordCoups);
    
    function isRecordTemps (tempsNew, username) {
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

    function leRecordsTemps(username){
        return classement.findOne({
            where: {
                username : username}
            }).then(function (record){
                return record.dataValues.recordDuree;
        })

    }
    leRecordsTemps(req.session.username).then(function(record){
    if(record > tempsNew || recordTemps == null) {
        isRecordTemps(tempsNew, username).then(function(isUnique){
        if(isUnique) {
            classement.update({
                recordDuree: tempsNew,
            },
            { where: {username: username}
            }).then(function (user) {
                req.session.recordDuree = tempsNew;
            }).catch(function (error) {
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
        });
    }});
    
    if(recordCoups > coupsNew || recordCoups == null) {
        isRecordCoups(coupsNew, username).then(function(isUnique){
        if (isUnique) {
            classement.update({
                recordCoups: coupsNew,
            },
            { where: {username: username}
            }).then(function (user) {
                req.session.recordCoups = coupsNew;
            }).catch(function (error) {
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
        }); 
    }                                  
    
};
