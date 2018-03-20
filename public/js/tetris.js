/*<![CDATA[*/

var grille;
var bool = false;
var oldGrille;
var debut = 0;
var fin;
var tempsEcoule = 0;
var coups;
var ValeurCaseX;
var ValeurCaseY;
var ValeurMaxCase = 3;

function init() {

    window.addEventListener("keydown", actionClavier);
    grille = new Array(5);
    for (i = 0; i < grille.length; i++) {
        grille[i] = new Array(4);
        for (j = 0; j < grille.length-1; j++) {
            grille[i][j] = new maCase("");
        }
    }
    newValeur();
    coup = 1;

    oldGrille = new Array(5);
    for (i = 0; i < grille.length; i++) {
        oldGrille[i] = new Array(4);
        for (j = 0; j < oldGrille.length-1; j++) {
            oldGrille[i][j] = new maCase("");
        }
    }
    afficherGrille();
}


function sauverGrille() {
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 4; j++) {
            oldGrille[i][j].insertionValeur(grille[i][j].getValeur());
        }
    }
}

function comparer() {
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 4; j++) {
            if (grille[i][j].getValeur() != oldGrille[i][j].getValeur()) return true;
        }
    }
    return false;
}
function afficherGrille() {

    var listCase = document.getElementsByClassName('case');
    var indice = 0;
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 4; j++) {
            listCase[indice].textContent = grille[i][j].getValeur();
            switch (listCase[indice].textContent) {
                case "2":
                    listCase[indice].classList.add("case2");
                    if(listCase[indice].classList.contains("default" || "case2" || "case4" || "case8" || "case16" || "case32" || "case64" || "case128" || "case256" || "case512" || "case1024" || "case2048"))
                        listCase[indice].className = "case case2";
                    listCase[indice].classList.add("case2");

                    /*
                                        listCase[indice].classList.remove("default");
                    */

                    /*                    else if(listCase[indice].classList.contains("case4"))
                                            listCase[indice].classList.remove("case4");
                                        else if(listCase[indice].classList.contains("case8"))
                                            listCase[indice].classList.remove("case8");
                                        else if(listCase[indice].classList.contains("case16"))
                                            listCase[indice].classList.remove("case16");
                                        else if(listCase[indice].classList.contains("case32"))
                                            listCase[indice].classList.remove("case32");*/
                    break;
                case "4":
                    listCase[indice].classList.add("case4");
                    if(listCase[indice].classList.contains("default" || "case2" || "case4" || "case8" || "case16" || "case32" || "case64" || "case128" || "case256" || "case512" || "case1024" || "case2048"))
                        listCase[indice].className = "case case4";
                    listCase[indice].classList.add("case4");

                    break;
                case "8":
                    listCase[indice].classList.add("case8");
                    if(listCase[indice].classList.contains("default" || "case2" || "case4" || "case8" || "case16" || "case32" || "case64" || "case128" || "case256" || "case512" || "case1024" || "case2048"))
                        listCase[indice].className = "case case8";
                    listCase[indice].classList.add("case8");

                    break;
                case "16":
                    listCase[indice].classList.add("case16");
                    if(listCase[indice].classList.contains("default" || "case2" || "case4" || "case8" || "case16" || "case32" || "case64" || "case128" || "case256" || "case512" || "case1024" || "case2048"))
                        listCase[indice].className = "case case16";
                    listCase[indice].classList.add("case16");

                    break;
                case "32":
                    listCase[indice].classList.add("case32");
                    if(listCase[indice].classList.contains("default" || "case2" || "case4" || "case8" || "case16" || "case32" || "case64" || "case128" || "case256" || "case512" || "case1024" || "case2048"))
                        listCase[indice].className = "case case32";

                    break;
                case "64":
                    listCase[indice].classList.add("case64");
                    if(listCase[indice].classList.contains("default" || "case2" || "case4" || "case8" || "case16" || "case32" || "case64" || "case128" || "case256" || "case512" || "case1024" || "case2048"))
                        listCase[indice].className = "case case64";

                    break;
                case "128":
                    listCase[indice].classList.add("case128");
                    if(listCase[indice].classList.contains("default" || "case2" || "case4" || "case8" || "case16" || "case32" || "case64" || "case128" || "case256" || "case512" || "case1024" || "case2048"))
                        listCase[indice].className = "case case128";
                    break;
                case "256":
                    listCase[indice].classList.add("case256");
                    if(listCase[indice].classList.contains("default" || "case2" || "case4" || "case8" || "case16" || "case32" || "case64" || "case128" || "case256" || "case512" || "case1024" || "case2048"))
                        listCase[indice].className = "case case256";
                    break;
                case "512":
                    listCase[indice].classList.add("case512");
                    if(listCase[indice].classList.contains("default" || "case2" || "case4" || "case8" || "case16" || "case32" || "case64" || "case128" || "case256" || "case512" || "case1024" || "case2048"))
                        listCase[indice].className = "case case512";
                    break;
                case "1024":
                    listCase[indice].classList.add("case1024");
                    if(listCase[indice].classList.contains("default" || "case2" || "case4" || "case8" || "case16" || "case32" || "case64" || "case128" || "case256" || "case512" || "case1024" || "case2048"))
                        listCase[indice].className = "case case1024";
                    break;
                case "2048":
                    listCase[indice].classList.add("case2048");
                    if(listCase[indice].classList.contains("default" || "case2" || "case4" || "case8" || "case16" || "case32" || "case64" || "case128" || "case256" || "case512" || "case1024" || "case2048"))
                        listCase[indice].className = "case case2048";
                    break;
                default:
                    listCase[indice].classList.add("default");
                    if(listCase[indice].classList.contains("default" || "case2" || "case4" || "case8" || "case16" || "case32" || "case64" || "case128" || "case256" || "case512" || "case1024" || "case2048"))
                        listCase[indice].className = "case default";

            }
            indice++;
        }
    }
}

function newValeur() {
    var etat = false;

    while (etat == false) {
        var y = Math.floor(Math.random() * 4);
        var x = 0;

        var laCase = grille[x][y];

        var z = Math.floor(Math.random() * 9);
        if (z == 6) valeur = 4;
        else valeur = 2;

        if (laCase.getValeur() == "") {
            laCase.insertionValeur(valeur);
            etat = true;
            laCase.setBool(false);
            ValeurCaseX = x;
            ValeurCaseY = y;
        }
    }
}

function maCase(v) {
    this.valeur = v;
    this.bool = false;
}
maCase.prototype.getValeur = function () {
    return this.valeur;
}

maCase.prototype.insertionValeur = function (v) {
    this.valeur = v;
}

maCase.prototype.setBool = function (b) {
    this.bool = b;
}

function victoire() {
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if (grille[i][j].getValeur() == "2048") {
                if (tempsEcoule == 0) {
                    fin = new Date();
                    tempsEcoule = fin.getTime() - debut.getTime(); // temps écoulé en millisecondes
                    tempsEcoule = tempsEcoule / 1000;
                }
                return true;
            }
        }
    }
    return false;
}

function defaite() {
    var tmp = 0;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if (grille[i][j].getValeur() == 0){
                tmp +=1;
            }
        }
    }
    if(tmp == 0){
        if(testFusionHaut() == false && testFusionBas() == false && testFusionDroite() == false && testFusionGauche() == false) {
            if (tempsEcoule == 0) {
                fin = new Date();
                tempsEcoule = fin.getTime() - debut.getTime(); // temps écoulé en millisecondes
                tempsEcoule = tempsEcoule / 1000;
            }
            return true;
        }
    }
    return false;
}

function actionClavier(e) {

    if (defaite() == true) {
        $(".message").show();
        $(".message").html("Vous avez perdu la partie en " + tempsEcoule + " secondes.");
    }

    sauverGrille();
    var key = e.keyCode ? e.keyCode : e.which;

    if(key==40 || key==37 || key==39){

        $(".nbCoups").html("Nombre de coups: " + coups);
    } else
        $(".nbCoups").html("Nombre de coups: " + coups);


    if (victoire() == false) {
        if (key == 40) {
            if(LastColumnFull() == true) { ValeurMaxCase = ValeurMaxCase -1; }
            //if(MidColumnFull() == true) { ValeurMaxCase = ValeurMaxCase -1 }
            deplacementCaseVersBas();

        } else if (key == 37) {

            deplacementCaseVersGauche();
            // fusionerVersGauche();

        } else if (key == 39) {

            deplacementCaseVersDroite();
            // fusionerVersDroite();
        }
        else if (key == 13 && testImpossibleBas()){
            newValeur();
        }
    }

    if (debut == 0) {
        debut = new Date();
    }

    if (victoire() == true) {

        $(".message").slideDown();
        $(".message").html("Vous avez fini le jeu en " + tempsEcoule + " secondes en "+ coups +" coups.");
        $.ajax({
          type: "POST",
          url: '/nouveauRecord',
          data: {
              temps: tempsEcoule,
              coups: coups
          },
          success: retour => {
              console.log(retour);
          }
        });
    }

    if (comparer()) {
        coups++;
        afficherGrille();

    }
}



function deplacementCaseVersBas() {
    // Déplacer la case vers le bas de 1
    if (grille[ValeurCaseX+1][ValeurCaseY].getValeur() == "" && ValeurCaseX < ValeurMaxCase) {
        grille[ValeurCaseX+1][ValeurCaseY].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur());
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");
        ValeurCaseX = ValeurCaseX+1;
        ValeurCaseY = ValeurCaseY;
        ValeurMaxCase = 3;
    }
    // Si pas de case vide en dessous, regarde si possibilité de fusionner
    else if(grille[ValeurCaseX][ValeurCaseY].getValeur() == grille[ValeurCaseX+1][ValeurCaseY].getValeur() && grille[ValeurCaseX][ValeurCaseY].getValeur() != "" && ValeurCaseX < ValeurMaxCase){
        grille[ValeurCaseX+1][ValeurCaseY].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur() * 2);
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");
        ValeurCaseX = ValeurCaseX+1;
        ValeurCaseY = ValeurCaseY;
        ValeurMaxCase = 3;
    }
    // Si pas possible d'aller en dessous, on créé nouvelle valeur
    else if(grille[ValeurCaseX+1][ValeurCaseY].getValeur() == ""){
        grille[ValeurCaseX+1][ValeurCaseY].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur());
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");
        ValeurMaxCase = 3;
        // newValeur();
        afficherGrille();
       }

    else if(grille[ValeurCaseX][ValeurCaseY].getValeur() == grille[ValeurCaseX+1][ValeurCaseY].getValeur() && grille[ValeurCaseX][ValeurCaseY].getValeur() != ""){
        grille[ValeurCaseX+1][ValeurCaseY].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur() * 2);
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");
        ValeurMaxCase = 3;
        // newValeur();
        afficherGrille();
    }
}
function testImpossibleBas(){
    if(grille[ValeurCaseX][ValeurCaseY].getValeur() == grille[ValeurCaseX+1][ValeurCaseY].getValeur() || grille[ValeurCaseX+1][ValeurCaseY].getValeur() == ""){
        return false;
    }
    else
        return true;
}
function LastColumnFull(){
    var tmp = false;
    var tmp2 = 0;
    for(var i = 0; i < 4; i++){
        if (grille[i][ValeurCaseY+1].getValeur() != 0) {
            tmp2++;
        }
    }
    if (tmp2 != 0){ tmp = true }
    return tmp;
}
/*function LastColumnFull(){
    var tmp = false;
    var tmp2 = 0;
    for(var i = 0; i < 4; i++){
        if (grille[i][ValeurCaseY].getValeur() != 0) {
            tmp2++;
        }
    }
    if (tmp2 != 0){ tmp = true }
    return tmp;
}*/

function deplacementCaseVersGauche() {
    console.log(ValeurCaseX);
    if (grille[ValeurCaseX][ValeurCaseY-1].getValeur() == "" ) {
        grille[ValeurCaseX][ValeurCaseY-1].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur());
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");
        ValeurCaseX = ValeurCaseX;
        ValeurCaseY = ValeurCaseY-1;
        afficherGrille();
    }
    // Si pas de case vide à gauche, regarde si possibilité de fusionner

    else if(grille[ValeurCaseX][ValeurCaseY].getValeur() == grille[ValeurCaseX][ValeurCaseY-1].getValeur() ){
        grille[ValeurCaseX][ValeurCaseY-1].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur() * 2);
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");
        ValeurCaseX = ValeurCaseX;
        ValeurCaseY = ValeurCaseY-1;
        afficherGrille();
    }
    // Si pas possible d'aller en dessous, on créé nouvelle valeur
    else if(grille[ValeurCaseX][ValeurCaseY-1].getValeur() == ""){
        grille[ValeurCaseX][ValeurCaseY-1].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur());
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");
        // newValeur();
        afficherGrille();
    }

    else if(grille[ValeurCaseX][ValeurCaseY].getValeur() == grille[ValeurCaseX][ValeurCaseY-1].getValeur() ){
        grille[ValeurCaseX][ValeurCaseY-1].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur() * 2);
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");
        // newValeur();
        afficherGrille();
    }
}

function deplacementCaseVersDroite() {
    console.log(ValeurCaseY);
    if (grille[ValeurCaseX][ValeurCaseY+1].getValeur() == "") {
        grille[ValeurCaseX][ValeurCaseY+1].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur());
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");
        ValeurCaseX = ValeurCaseX;
        ValeurCaseY = ValeurCaseY+1;
        afficherGrille();
    }
    else if(grille[ValeurCaseX][ValeurCaseY].getValeur() == grille[ValeurCaseX][ValeurCaseY+1].getValeur() && grille[ValeurCaseX][ValeurCaseY].getValeur() != "" ){
        grille[ValeurCaseX][ValeurCaseY+1].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur() * 2);
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");
        ValeurCaseX = ValeurCaseX;
        ValeurCaseY = ValeurCaseY+1;
        afficherGrille();
    }
    // Si pas possible d'aller en dessous, on créé nouvelle valeur
    else if(grille[ValeurCaseX][ValeurCaseY+1].getValeur() == ""){
        grille[ValeurCaseX][ValeurCaseY+1].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur());
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");
        // newValeur();
        afficherGrille();
    }

    else if(grille[ValeurCaseX][ValeurCaseY].getValeur() == grille[ValeurCaseX][ValeurCaseY+1].getValeur() && grille[ValeurCaseX][ValeurCaseY].getValeur() != ""){
        grille[ValeurCaseX][ValeurCaseY+1].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur() * 2);
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");
        ValeurMaxCase = 3;
        // newValeur();
        afficherGrille();
    }
}

function fusionerVersBas() {
    //console.log("fusion bas");
    for (j = 0; j < 4; j++) {
        for (i = 3; i > 0; i--) {
            if (grille[i][j].getValeur() == grille[i - 1][j].getValeur() && grille[i][j].getValeur() != 0) {
                grille[i][j].insertionValeur(grille[i][j].getValeur() * 2);
                grille[i - 1][j].insertionValeur("");
            }
        }
    }
}
function fusionerVersGauche() {
    //console.log("fusion gauche");
    for (j = 0; j < 4; j++) {
        for (i = 0; i < 3; i++) {
            if (grille[j][i].getValeur() == grille[j][i + 1].getValeur() && grille[j][i].getValeur() != 0) {
                grille[j][i].insertionValeur(grille[j][i].getValeur() * 2);
                grille[j][i + 1].insertionValeur("");
            }
        }
    }
}

function fusionerVersDroite() {
    //console.log("fusion droite");
    for (j = 0; j < 4; j++) {
        for (i = 3; i > 0; i--) {
            if (grille[j][i].getValeur() == grille[j][i - 1].getValeur() && grille[j][i].getValeur() != 0) {
                grille[j][i].insertionValeur(grille[j][i].getValeur() * 2);
                grille[j][i - 1].insertionValeur("");
            }
        }
    }
}

function testDeplacementCaseBas(){
    var tmp = true;
    if (grille[ValeurCaseX][ValeurCaseY+1].getValeur() != 0 && ValeurCaseX < 5) {
                tmp = false;
            }
    return tmp;
}

function testFusionBas() {
    var tmp = false;
    for (j = 0; j < 4; j++) {
        for (i = 3; i > 0; i--) {
            if (grille[i][j].getValeur() == grille[i - 1][j].getValeur() && grille[i][j].getValeur() != 0) {
                tmp = true;
            }
        }
    }
    return tmp;
}

function isIdUnique (email, username) {
    return user.count({ where: { $or: [{email: email}, {username: username}] }})
        .then(function(count){
            if (count != 0) {
                return false;
            }
            return true;
        });
}


function isIdUnique (username) {
    return user.count({ where: {username: username}})
        .then(function(count){
            if (count != 0) {
                return false;
            }
            return true;
        });
}
