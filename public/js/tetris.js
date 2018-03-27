/*<![CDATA[*/

var grille;
var bool = false;
var oldGrille;
var ValeurCaseX;
var ValeurCaseY;
var alreadyDefeat = false;

function init() {

    window.addEventListener("keydown", actionClavier);
    grille = new Array(5);
    for (i = 0; i < grille.length; i++) {
        grille[i] = new Array(4);
        for (j = 0; j < grille.length - 1; j++) {
            grille[i][j] = new maCase("");
        }
    }
    newValeur();

    oldGrille = new Array(5);
    for (i = 0; i < grille.length; i++) {
        oldGrille[i] = new Array(4);
        for (j = 0; j < oldGrille.length - 1; j++) {
            oldGrille[i][j] = new maCase("");
        }
    }
    afficherGrille();
}

var last = now = new Date();

function frame() {
    if (!victoire() && alreadyDefeat == false) {
        now = new Date();
        if (((now.getTime() - last.getTime()) / 1000.0) > 1) {
            last = now;
            deplacementCaseVersBas();
            afficherGrille();
        }
        requestAnimationFrame(frame);
    }
    if (defaite()) {
        console.log("suce");
        $(".message").slideDown();
        $(".message").html("Vous avez perdu la partie. Retentez votre chance sans attendre !");
    }
    if (victoire() == true) {
        $(".message").slideDown();
        $(".message").html("Bravo ! Vous avez fini le mode tetris 2048, n'hésitez pas à partager votre performance sur le chat <span id='test'>☺</span>");
    }
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
                    if (listCase[indice].classList.contains("default") || listCase[indice].classList.contains("case2") || listCase[indice].classList.contains("case4") || listCase[indice].classList.contains("case8") || listCase[indice].classList.contains("case16") || listCase[indice].classList.contains("case32") || listCase[indice].classList.contains("case64") || listCase[indice].classList.contains("case128") || listCase[indice].classList.contains("case256") || listCase[indice].classList.contains("case512") || listCase[indice].classList.contains("case1024") || listCase[indice].classList.contains("case2048")) {
                        listCase[indice].className = "case";
                        listCase[indice].classList.add("case2");
                    }
                    // listCase[indice].classList.add("case2");

                    break;
                case "4":
                    listCase[indice].classList.add("case4");
                    if (listCase[indice].classList.contains("default") || listCase[indice].classList.contains("case2") || listCase[indice].classList.contains("case4") || listCase[indice].classList.contains("case8") || listCase[indice].classList.contains("case16") || listCase[indice].classList.contains("case32") || listCase[indice].classList.contains("case64") || listCase[indice].classList.contains("case128") || listCase[indice].classList.contains("case256") || listCase[indice].classList.contains("case512") || listCase[indice].classList.contains("case1024") || listCase[indice].classList.contains("case2048")) {
                        listCase[indice].className = "case";
                        listCase[indice].classList.add("case4");
                    }
                    // listCase[indice].classList.add("case4");

                    break;
                case "8":
                    listCase[indice].classList.add("case8");
                    if (listCase[indice].classList.contains("default") || listCase[indice].classList.contains("case2") || listCase[indice].classList.contains("case4") || listCase[indice].classList.contains("case8") || listCase[indice].classList.contains("case16") || listCase[indice].classList.contains("case32") || listCase[indice].classList.contains("case64") || listCase[indice].classList.contains("case128") || listCase[indice].classList.contains("case256") || listCase[indice].classList.contains("case512") || listCase[indice].classList.contains("case1024") || listCase[indice].classList.contains("case2048")) {
                        listCase[indice].className = "case";
                        listCase[indice].classList.add("case8");

                    }
                    listCase[indice].classList.add("case8");

                    break;
                case "16":
                    listCase[indice].classList.add("case16");
                    if (listCase[indice].classList.contains("default") || listCase[indice].classList.contains("case2") || listCase[indice].classList.contains("case4") || listCase[indice].classList.contains("case8") || listCase[indice].classList.contains("case16") || listCase[indice].classList.contains("case32") || listCase[indice].classList.contains("case64") || listCase[indice].classList.contains("case128") || listCase[indice].classList.contains("case256") || listCase[indice].classList.contains("case512") || listCase[indice].classList.contains("case1024") || listCase[indice].classList.contains("case2048")) {
                        listCase[indice].className = "case";
                        listCase[indice].classList.add("case16");
                    }
                    listCase[indice].classList.add("case16");

                    break;
                case "32":
                    listCase[indice].classList.add("case32");
                    if (listCase[indice].classList.contains("default") || listCase[indice].classList.contains("case2") || listCase[indice].classList.contains("case4") || listCase[indice].classList.contains("case8") || listCase[indice].classList.contains("case16") || listCase[indice].classList.contains("case32") || listCase[indice].classList.contains("case64") || listCase[indice].classList.contains("case128") || listCase[indice].classList.contains("case256") || listCase[indice].classList.contains("case512") || listCase[indice].classList.contains("case1024") || listCase[indice].classList.contains("case2048")) {
                        listCase[indice].className = "case";
                        listCase[indice].classList.add("case32");
                    }
                    break;
                case "64":
                    listCase[indice].classList.add("case64");
                    if (listCase[indice].classList.contains("default") || listCase[indice].classList.contains("case2") || listCase[indice].classList.contains("case4") || listCase[indice].classList.contains("case8") || listCase[indice].classList.contains("case16") || listCase[indice].classList.contains("case32") || listCase[indice].classList.contains("case64") || listCase[indice].classList.contains("case128") || listCase[indice].classList.contains("case256") || listCase[indice].classList.contains("case512") || listCase[indice].classList.contains("case1024") || listCase[indice].classList.contains("case2048")) {
                        listCase[indice].className = "case";
                        listCase[indice].classList.add("case64");
                    }
                    break;
                case "128":
                    listCase[indice].classList.add("case128");
                    if (listCase[indice].classList.contains("default") || listCase[indice].classList.contains("case2") || listCase[indice].classList.contains("case4") || listCase[indice].classList.contains("case8") || listCase[indice].classList.contains("case16") || listCase[indice].classList.contains("case32") || listCase[indice].classList.contains("case64") || listCase[indice].classList.contains("case128") || listCase[indice].classList.contains("case256") || listCase[indice].classList.contains("case512") || listCase[indice].classList.contains("case1024") || listCase[indice].classList.contains("case2048")) {
                        listCase[indice].className = "case";
                        listCase[indice].classList.add("case128");
                    }
                    break;
                case "256":
                    listCase[indice].classList.add("case256");
                    if (listCase[indice].classList.contains("default") || listCase[indice].classList.contains("case2") || listCase[indice].classList.contains("case4") || listCase[indice].classList.contains("case8") || listCase[indice].classList.contains("case16") || listCase[indice].classList.contains("case32") || listCase[indice].classList.contains("case64") || listCase[indice].classList.contains("case128") || listCase[indice].classList.contains("case256") || listCase[indice].classList.contains("case512") || listCase[indice].classList.contains("case1024") || listCase[indice].classList.contains("case2048")) {
                        listCase[indice].className = "case";
                        listCase[indice].classList.add("case256");
                    }
                    break;
                case "512":
                    listCase[indice].classList.add("case512");
                    if (listCase[indice].classList.contains("default") || listCase[indice].classList.contains("case2") || listCase[indice].classList.contains("case4") || listCase[indice].classList.contains("case8") || listCase[indice].classList.contains("case16") || listCase[indice].classList.contains("case32") || listCase[indice].classList.contains("case64") || listCase[indice].classList.contains("case128") || listCase[indice].classList.contains("case256") || listCase[indice].classList.contains("case512") || listCase[indice].classList.contains("case1024") || listCase[indice].classList.contains("case2048")) {
                        listCase[indice].className = "case";
                        listCase[indice].classList.add("case512");
                    }
                    break;
                case "1024":
                    listCase[indice].classList.add("case1024");
                    if (listCase[indice].classList.contains("default") || listCase[indice].classList.contains("case2") || listCase[indice].classList.contains("case4") || listCase[indice].classList.contains("case8") || listCase[indice].classList.contains("case16") || listCase[indice].classList.contains("case32") || listCase[indice].classList.contains("case64") || listCase[indice].classList.contains("case128") || listCase[indice].classList.contains("case256") || listCase[indice].classList.contains("case512") || listCase[indice].classList.contains("case1024") || listCase[indice].classList.contains("case2048")) {
                        listCase[indice].className = "case";
                        listCase[indice].classList.add("case1024");
                    }
                    break;
                case "2048":
                    listCase[indice].classList.add("case2048");
                    if (listCase[indice].classList.contains("default") || listCase[indice].classList.contains("case2") || listCase[indice].classList.contains("case4") || listCase[indice].classList.contains("case8") || listCase[indice].classList.contains("case16") || listCase[indice].classList.contains("case32") || listCase[indice].classList.contains("case64") || listCase[indice].classList.contains("case128") || listCase[indice].classList.contains("case256") || listCase[indice].classList.contains("case512") || listCase[indice].classList.contains("case1024") || listCase[indice].classList.contains("case2048")) {
                        listCase[indice].className = "case";
                        listCase[indice].classList.add("case2048");
                    }
                    break;
                default:
                    listCase[indice].classList.add("default");
                    if (listCase[indice].classList.contains("default") || listCase[indice].classList.contains("case2") || listCase[indice].classList.contains("case4") || listCase[indice].classList.contains("case8")) {
                        listCase[indice].className = "case";
                        listCase[indice].classList.add("default");
                    }
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

    for (i = 0; i < 5; i++) {
        for (j = 0; j < 4; j++) {
            if (grille[i][j].getValeur() == "2048") return true;
        }
    }
    return false;
}

function defaite() {
    var tmp = 0;
    i = 0;
        for (j = 0; j <4; j++) {
            if (grille[i][j].getValeur() != "") {
                tmp += 1;
            }
    }
    if (tmp >= 2) {
        alreadyDefeat = true;

        return true;

    }
    return false;

}

function actionClavier(e) {

    if (defaite() == true) {
        $(".message").slideDown();
        $(".message").html("Vous avez perdu la partie. Retentez votre chance sans attendre !");
    }

    sauverGrille();
    var key = e.keyCode ? e.keyCode : e.which;
    if (victoire() == false && alreadyDefeat == false) {
        console.log(alreadyDefeat);

        if (key == 40) {

            deplacementCaseVersBas(e);

        }

        if (key == 37) deplacementCaseVersGauche();
        if (key == 39) deplacementCaseVersDroite();
    }
    if (victoire() == true) {
        $(".message").slideDown();
        $(".message").html("Bravo ! Vous avez fini le mode tetris 2048, n'hésitez pas à partager votre performance sur le chat <span id='test'>☺</span>");
    }

}

function testImpossibleBas() { // retourne false si possible de fusionner ou possible d'aller en bas
    if (grille[ValeurCaseX][ValeurCaseY].getValeur() == grille[ValeurCaseX + 1][ValeurCaseY].getValeur()
        || grille[ValeurCaseX + 1][ValeurCaseY].getValeur() == "" || ValeurCaseX == 4) {
        return false;
    }
    else {
        return true;
    }
}

function deplacementCaseVersBas() {

    // Déplacer la case vers le bas de 1
    if (ValeurCaseX == 4) {
        newValeur();
        afficherGrille();
    }
    if (grille[ValeurCaseX + 1][ValeurCaseY].getValeur() == "") {

        grille[ValeurCaseX + 1][ValeurCaseY].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur());
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");

        ValeurCaseX = ValeurCaseX + 1;
        ValeurCaseY = ValeurCaseY;
        afficherGrille();
        // if(grille[ValeurCaseX+1][ValeurCaseY].getValeur() != grille[4][ValeurCaseY].getValeur()){
        //     newValeur();
        //     afficherGrille();
        // }
    }
    // Si pas de case vide en dessous, regarde si possibilité de fusionner
    else if (grille[ValeurCaseX][ValeurCaseY].getValeur() == grille[ValeurCaseX + 1][ValeurCaseY].getValeur()
        && grille[ValeurCaseX][ValeurCaseY].getValeur() != "") {

        grille[ValeurCaseX + 1][ValeurCaseY].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur() * 2);
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");

        ValeurCaseX = ValeurCaseX + 1;
        ValeurCaseY = ValeurCaseY;
        afficherGrille();
        if (ValeurCaseX == 4) {
            newValeur();
            afficherGrille();
        }
    }
    //Sinon, on ne peut donc rien faire alors on créer une nouvelle case pour continuer à jouer
    else if (testImpossibleBas()) {
        newValeur();
        afficherGrille();
    }
}

function deplacementCaseVersGauche() {
    if (grille[ValeurCaseX][ValeurCaseY - 1].getValeur() == "") {

        grille[ValeurCaseX][ValeurCaseY - 1].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur());
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");

        ValeurCaseX = ValeurCaseX;
        ValeurCaseY = ValeurCaseY - 1;
        afficherGrille();
    }
    // Si pas de case vide à gauche, regarde si possibilité de fusionner

    else if (grille[ValeurCaseX][ValeurCaseY].getValeur() == grille[ValeurCaseX][ValeurCaseY - 1].getValeur()) {

        grille[ValeurCaseX][ValeurCaseY - 1].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur() * 2);
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");

        ValeurCaseX = ValeurCaseX;
        ValeurCaseY = ValeurCaseY - 1;
        afficherGrille();
    }
}

function deplacementCaseVersDroite() {
    if (grille[ValeurCaseX][ValeurCaseY + 1].getValeur() == "") {

        grille[ValeurCaseX][ValeurCaseY + 1].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur());
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");

        ValeurCaseX = ValeurCaseX;
        ValeurCaseY = ValeurCaseY + 1;
        afficherGrille();
    }
    else if (grille[ValeurCaseX][ValeurCaseY].getValeur() == grille[ValeurCaseX][ValeurCaseY + 1].getValeur()
        && grille[ValeurCaseX][ValeurCaseY].getValeur() != "") {

        grille[ValeurCaseX][ValeurCaseY + 1].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur() * 2);
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("");

        ValeurCaseX = ValeurCaseX;
        ValeurCaseY = ValeurCaseY + 1;
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

function testFusionBas() {
    var tmp = false;
    for (j = 0; j < 5; j++) {
        for (i = 3; i > 0; i--) {
            if (grille[i][j].getValeur() == grille[i - 1][j].getValeur() && grille[i][j].getValeur() != "") {
                tmp = true;
            }
        }
    }
    return tmp;
}

function testFusionDroite() {
    var tmp = false;
    for (j = 0; j < 4; j++) {
        for (i = 3; i > 0; i--) {
            if (grille[j][i].getValeur() == grille[j][i - 1].getValeur() && grille[j][i].getValeur() != 0) {
                tmp = true;
            }
        }
    }
    return tmp;
}

function testFusionGauche() {
    var tmp = false;
    for (j = 0; j < 4; j++) {
        for (i = 0; i < 3; i++) {
            if (grille[j][i].getValeur() == grille[j][i + 1].getValeur() && grille[j][i].getValeur() != 0) {
                tmp = true;
            }
        }
    }
    return tmp;
}