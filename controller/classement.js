var user = require("../model/classement.js");
var sequelize = require('../db.js');
var encrypt = require('../encrypt');


module.exports.classements = function (res) {
    console.log('TEST ENTREE');
    var p1 = new Promise((resolve, reject) => {
        console.log('TEST 1');
        sequelize.query("SELECT * FROM classement ORDER BY recordDuree LIMIT 10; ", {
                type: sequelize.QueryTypes.SELECT
            })
            .then(meilleursJoueursGeneralDuree => {
                console.log('TEST 2');
                resolve(meilleursJoueursGeneralDuree);
            }).catch(err => console.log("YOLO : " + err))
    })

    var p2 = new Promise((resolve, reject) => {
        console.log('TEST 3');
        sequelize.query("SELECT * FROM classement ORDER BY recordCoups LIMIT 10; ", {
                type: sequelize.QueryTypes.SELECT
            })
            .then(meilleursJoueursGeneralCoups => {
                console.log('TEST 4');
                resolve(meilleursJoueursGeneralCoups);
            })
    })

    var p3 = new Promise((resolve, reject) => {
        console.log('TEST 5');
        sequelize.query("SELECT * FROM classement WHERE sys_modified BETWEEN (NOW()-INTERVAL 7 DAY) AND NOW() ORDER BY recordDuree LIMIT 10; ", {
                type: sequelize.QueryTypes.SELECT
            })
            .then(meilleursJoueursHebdoDuree => {
                console.log('TEST 6');
                resolve(meilleursJoueursHebdoDuree);
            })
    })
    var p4 = new Promise((resolve, reject) => {
        console.log('TEST 7');
        sequelize.query("SELECT * FROM classement WHERE sys_modified BETWEEN (NOW()-INTERVAL 7 DAY) AND NOW() ORDER BY recordCoups LIMIT 10; ", {
                type: sequelize.QueryTypes.SELECT
            })
            .then(meilleursJoueursHebdoCoups => {
                console.log('TEST 8');
                resolve(meilleursJoueursHebdoCoups)
            })

    })

    Promise.all([p1, p2, p3, p4])
        .then(values => {
            console.log('TEST 9');
            res.render('classement', {
                classements: values
            });
        })
        .catch(err => {
            console.log("Erreur récup des classement : " + err)
            res.redirect('index');
        })


}

/*module.exports.classementGeneralCoups = function(req,res){

	sequelize.query("SELECT * FROM classement ORDER BY recordCoups LIMIT 10; ", { type: sequelize.QueryTypes.SELECT})
	.then(meilleursJoueursGeneralCoups=> {
		res.render("classement");
	})
}

module.exports.classementHebdoDuree = function(req,res){

	sequelize.query("SELECT * FROM classement WHERE sys_modified BETWEEN (NOW()-INTERVAL 7 DAY) AND NOW() ORDER BY recordDuree LIMIT 10; ", { type: sequelize.QueryTypes.SELECT})
	.then(meilleursJoueursHebdoDuree=> {
		res.render("classement");
	})
}
// char_to(tadate, 'YYYYMMDD') between char_to(tadate, 'YYYYMMDD') and char_to(tadate, 'YYYYMMDD')
module.exports.classementGeneralCoups = function(req,res){

	sequelize.query("SELECT * FROM classement WHERE sys_modified BETWEEN (NOW()-INTERVAL 7 DAY) AND NOW() ORDER BY recordCoups LIMIT 10; ", { type: sequelize.QueryTypes.SELECT})
	.then(meilleursJoueursHebdoCoups=> {
		res.render("classement");
	})
}*/
