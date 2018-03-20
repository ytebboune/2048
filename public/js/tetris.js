/*<![CDATA[*/

var grille;
var bool = false;
var oldGrille;
var ValeurCaseX;
var ValeurCaseY;

function init() {

    window.addEventListener("keydown", actionClavier);
    grille = new Array(5);
    for (i = 0; i < grille.length; i++) {
        grille[i] = new Array(4);
        for (j = 0; j < grille.length-1; j++) {
            grille[i][j] = new maCase("0");
        }
    }
    newValeur();

    oldGrille = new Array(5);
    for (i = 0; i < grille.length; i++) {
        oldGrille[i] = new Array(4);
        for (j = 0; j < oldGrille.length-1; j++) {
            oldGrille[i][j] = new maCase("0");
        }
    }
    afficherGrille();
}

var last = now = new Date();
function frame() {
    now = new Date();
    if(((now.getTime() - last.getTime()) / 1000.0) > 1){
        last = now;
        deplacementCaseVersBas();
        afficherGrille();
    }
    requestAnimationFrame(frame);
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

        if (laCase.getValeur() == "0") {
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
            if (grille[i][j].getValeur() == "2048") return true;
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
        if(testFusionHaut() == false && testFusionBas() == false && testFusionDroite() == false && testFusionGauche() == false) return true;
    }
    return false;
}

function actionClavier(e) {

    if (defaite() == true) {
        $(".message").show();
        $(".message").html("Vous avez perdu la partie.");
    }

    sauverGrille();
    var key = e.keyCode ? e.keyCode : e.which;

    if (victoire() == false) {
        if (key == 40) deplacementCaseVersBas(e);
        if (key == 37) deplacementCaseVersGauche();
        if (key == 39) deplacementCaseVersDroite();
        if (key == 13) { newValeur(); }
    }
    if (victoire() == true) {
        $(".message").slideDown();
        $(".message").html("Vous avez fini le jeu ! Bravo !");
    }

}

function testImpossibleBas(){
    if(grille[ValeurCaseX][ValeurCaseY].getValeur() == grille[ValeurCaseX+1][ValeurCaseY].getValeur() 
       || grille[ValeurCaseX+1][ValeurCaseY].getValeur() == ""){
        return false;
    }
    else
        return true;
}

function deplacementCaseVersBas() {
    console.log(ValeurCaseX);
    // Déplacer la case vers le bas de 1
    if (grille[ValeurCaseX+1][ValeurCaseY].getValeur() == "0") {
        
        grille[ValeurCaseX+1][ValeurCaseY].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur());
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("0");
        
        ValeurCaseX = ValeurCaseX+1;
        ValeurCaseY = ValeurCaseY;
        afficherGrille();
        if(grille[ValeurCaseX+1][ValeurCaseY].getValeur() != grille[4][ValeurCaseY].getValeur()){
            newValeur();
            afficherGrille();
        }
    }
    // Si pas de case vide en dessous, regarde si possibilité de fusionner
    else if(grille[ValeurCaseX][ValeurCaseY].getValeur() == grille[ValeurCaseX+1][ValeurCaseY].getValeur() 
            && grille[ValeurCaseX][ValeurCaseY].getValeur() != "0"){
        
        grille[ValeurCaseX+1][ValeurCaseY].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur() * 2);
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("0");
        
        ValeurCaseX = ValeurCaseX+1;
        ValeurCaseY = ValeurCaseY;
        afficherGrille();
        if(grille[ValeurCaseX+1][ValeurCaseY].getValeur() != grille[4][ValeurCaseY].getValeur()){
            newValeur();
            afficherGrille(); 
        }
    }
    //Sinon, on ne peut donc rien faire alors on créer une nouvelle case pour continuer à jouer
    else {
        newValeur();
        afficherGrille();
    }
}

function deplacementCaseVersGauche() {
    console.log(ValeurCaseY);
    if (grille[ValeurCaseX][ValeurCaseY-1].getValeur() == "0") {
        
        grille[ValeurCaseX][ValeurCaseY-1].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur());
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("0");
        
        ValeurCaseX = ValeurCaseX;
        ValeurCaseY = ValeurCaseY-1;
        afficherGrille();
    }
    // Si pas de case vide à gauche, regarde si possibilité de fusionner

    else if(grille[ValeurCaseX][ValeurCaseY].getValeur() == grille[ValeurCaseX][ValeurCaseY-1].getValeur()){
        
        grille[ValeurCaseX][ValeurCaseY-1].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur() * 2);
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("0");
        
        ValeurCaseX = ValeurCaseX;
        ValeurCaseY = ValeurCaseY-1;
        afficherGrille();
    }
}

function deplacementCaseVersDroite() {
    console.log(ValeurCaseY);
    if (grille[ValeurCaseX][ValeurCaseY+1].getValeur() == "0") {
        
        grille[ValeurCaseX][ValeurCaseY+1].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur());
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("0");
        
        ValeurCaseX = ValeurCaseX;
        ValeurCaseY = ValeurCaseY+1;
        afficherGrille();
    }
    else if(grille[ValeurCaseX][ValeurCaseY].getValeur() == grille[ValeurCaseX][ValeurCaseY+1].getValeur() 
            && grille[ValeurCaseX][ValeurCaseY].getValeur() != "0" ){
        
        grille[ValeurCaseX][ValeurCaseY+1].insertionValeur(grille[ValeurCaseX][ValeurCaseY].getValeur() * 2);
        grille[ValeurCaseX][ValeurCaseY].insertionValeur("0");
        
        ValeurCaseX = ValeurCaseX;
        ValeurCaseY = ValeurCaseY+1;
        afficherGrille();
    }
}

function fusionerVersBas() {
    //console.log("fusion bas");
    for (j = 0; j < 4; j++) {
        for (i = 3; i > 0; i--) {
            if (grille[i][j].getValeur() == grille[i - 1][j].getValeur() && grille[i][j].getValeur() != 0) {
                grille[i][j].insertionValeur(grille[i][j].getValeur() * 2);
                grille[i - 1][j].insertionValeur("0");
            }
        }
    }
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
