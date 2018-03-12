function defaite() {
    var tmp = 0;
    for (i = 1; i < 5; i++) {
        for (j = 0; j < 4; j++) {
            if (grille[i][j].getValeur() == 0){
                tmp +=1;
            }
        }
    }
    if(tmp == 0){
        if(testFusionBas() == false && testFusionDroite() == false && testFusionGauche() == false) {
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

function deplacementVersGauche() {
    //console.log("gauche");
    for (x = 0; x < 3; x++) {
        for (j = 0; j < 4; j++) {
            for (i = 0; i < 4; i++) {
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
            for (i = 4; i > 0; i--) {
                if (grille[j][i].getValeur() == "") {
                    grille[j][i].insertionValeur(grille[j][i - 1].getValeur());
                    grille[j][i - 1].insertionValeur("");
                }
            }
        }
    }
}

function deplacementVersBas() {
    //console.log("bas");
    for (x = 0; x < 3; x++) {
        for (j = 0; j < 4; j++) {
            for (i = 4; i > 0; i--) {
                if (grille[i][j].getValeur() == "") {
                    grille[i][j].insertionValeur(grille[i - 1][j].getValeur());
                    grille[i - 1][j].insertionValeur("");
                }
            }
        }
    }
}

function fusionerVersBas() {
    //console.log("fusion bas");
    for (j = 0; j < 4; j++) {
        for (i = 4; i > 0; i--) {
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
        for (i = 0; i < 4; i++) {
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

function testFusionBas() {
    var tmp = false;
    for (j = 0; j < 4; j++) {
        for (i = 4; i > 1; i--) {
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