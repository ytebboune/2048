/*<![CDATA[*/
var grille;
var bool = false;
var oldGrille;
var debut = 0;
var fin;
var tempsEcoule = 0;
var coups;

function init() {

    window.addEventListener("keydown", actionClavier);
    grille = new Array(4);
    for (i = 0; i < grille.length; i++) {
        grille[i] = new Array(4);
        for (j = 0; j < grille.length; j++) {
            grille[i][j] = new maCase("");
        }
    }
    newValeur();
    newValeur();
    coups = 0;

    oldGrille = new Array(4);
    for (i = 0; i < 4; i++) {
        oldGrille[i] = new Array(4);
        for (j = 0; j < oldGrille.length; j++) {
            oldGrille[i][j] = new maCase("");
        }
    }
    afficherGrille();
}

function sauverGrille() {
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            oldGrille[i][j].insertionValeur(grille[i][j].getValeur());
        }
    }
}

function comparer() {
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if (grille[i][j].getValeur() != oldGrille[i][j].getValeur()) return true;
        }
    }
    return false;
}

function afficherGrille() {

    var listCase = document.getElementsByClassName('case');
    var indice = 0;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            listCase[indice].textContent = grille[i][j].getValeur();
            switch (listCase[indice].textContent) {
                case "2":
                    listCase[indice].style.backgroundColor = "#1abc9c";
                    break;
                case "4":
                    listCase[indice].style.backgroundColor = "#16a085";
                    break;
                case "8":
                    listCase[indice].style.backgroundColor = "#2ecc71";
                    break;
                case "16":
                    listCase[indice].style.backgroundColor = "#27ae60";
                    break;
                case "32":
                    listCase[indice].style.backgroundColor = "#3498db";
                    break;
                case "64":
                    listCase[indice].style.backgroundColor = "#2980b9";
                    break;
                case "128":
                    listCase[indice].style.backgroundColor = "#9b59b6";
                    break;
                case "256":
                    listCase[indice].style.backgroundColor = "#8e44ad";
                    break;
                case "512":
                    listCase[indice].style.backgroundColor = "#f1c40f";
                    break;
                case "1024":
                    listCase[indice].style.backgroundColor = "#f39c12";
                    break;
                case "2048":
                    listCase[indice].style.backgroundColor = "#c0392b";
                    break;
                default:
                    listCase[indice].style.backgroundColor = "#ecf0f1";
            }
            indice++;
        }
    }
}

function newValeur() {
    var etat = false;

    while (etat == false) {
        var x = Math.floor(Math.random() * 4);
        var y = Math.floor(Math.random() * 4);

        var laCase = grille[x][y];

        var z = Math.floor(Math.random() * 9);
        if (z == 6) valeur = 4;
        else valeur = 2;

        if (laCase.getValeur() == "") {
            laCase.insertionValeur(valeur);
            etat = true;
            laCase.setBool(false);
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
            if (grille[i][j].getValeur() == "16") {
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
        $(".message").html("Vous avez perdu la partie en " + tempsEcoule + " secondes.");
    }
    
    sauverGrille();
    var key = e.keyCode ? e.keyCode : e.which;
    
    if (victoire() == false) {
        if (key == 38) {
            deplacementVersHaut();
            fusionerVersHaut();
            deplacementVersHaut();

        } else if (key == 40) {
            deplacementVersBas();
            fusionerVersBas();
            deplacementVersBas();

        } else if (key == 37) {
            deplacementVersGauche();
            fusionerVersGauche();
            deplacementVersGauche();

        } else if (key == 39) {
            deplacementVersDroite();
            fusionerVersDroite();
            deplacementVersDroite();   
        }
    }
    
    if (debut == 0) {
        debut = new Date();
    }
    if (victoire() == true) {
        $(".message").html("Vous avez finis le jeu en " + tempsEcoule + " secondes.");
    }

    if (comparer()) {
        newValeur();
        afficherGrille();
        coups++;
    }

}

function deplacementVersHaut() {
    //console.log("haut");
    for (x = 0; x < 3; x++) {
        for (j = 0; j < 4; j++) {
            for (i = 0; i < 3; i++) {
                if (grille[i][j].getValeur() == "") {
                    grille[i][j].insertionValeur(grille[i + 1][j].getValeur());
                    grille[i + 1][j].insertionValeur("");
                }
            }
        }
    }
}

function deplacementVersBas() {
    //console.log("bas");
    for (x = 0; x < 3; x++) {
        for (j = 0; j < 4; j++) {
            for (i = 3; i > 0; i--) {
                if (grille[i][j].getValeur() == "") {
                    grille[i][j].insertionValeur(grille[i - 1][j].getValeur());
                    grille[i - 1][j].insertionValeur("");
                }
            }
        }
    }
}

function deplacementVersGauche() {
    //console.log("gauche");
    for (x = 0; x < 3; x++) {
        for (j = 0; j < 4; j++) {
            for (i = 0; i < 3; i++) {
                if (grille[j][i].getValeur() == "") {
                    grille[j][i].insertionValeur(grille[j][i + 1].getValeur());
                    grille[j][i + 1].insertionValeur("");
                }
            }
        }
    }
}

function deplacementVersDroite() {
    //console.log("droite");
    for (x = 0; x < 3; x++) {
        for (j = 0; j < 4; j++) {
            for (i = 3; i > 0; i--) {
                if (grille[j][i].getValeur() == "") {
                    grille[j][i].insertionValeur(grille[j][i - 1].getValeur());
                    grille[j][i - 1].insertionValeur("");
                }
            }
        }
    }
}

function fusionerVersHaut() {
    //console.log("fusion haut");
    for (j = 0; j < 4; j++) {
        for (i = 0; i < 3; i++) {
            if (grille[i][j].getValeur() == grille[i + 1][j].getValeur() && grille[i][j].getValeur() != 0) {
                grille[i][j].insertionValeur(grille[i][j].getValeur() * 2);
                grille[i + 1][j].insertionValeur("");
            }
        }
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

function testFusionHaut() {
    var tmp = false;
    for (j = 0; j < 4; j++) {
        for (i = 0; i < 3; i++) {
            if (grille[i][j].getValeur() == grille[i + 1][j].getValeur() && grille[i][j].getValeur() != 0) {
                tmp = true;
            }
        }
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
