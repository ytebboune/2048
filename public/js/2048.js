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
    coups = 1;

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
        $(".message").show();
        $(".message").html("Vous avez perdu la partie en " + tempsEcoule + " secondes.");
    }

    sauverGrille();
    var key = e.keyCode ? e.keyCode : e.which;

    if(key==38 || key==40 || key==37 || key==39){

        $(".nbCoups").html("Nombre de coups: " + coups);
    } else
        $(".nbCoups").html("Nombre de coups: " + coups);


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

function changeCSS() {
    var linkCSS = document.getElementsByTagName("link")[0];
    checked = $('.toggle.btn.btn-primary');
    if (checked.length > 0) {
        linkCSS.href = "css/style.css";
        setCookie(theme, 'light', 3000)
    }
    else {
        linkCSS.href = "css/style2.css";
        setCookie(theme, 'dark', 3000)
    }

    return checked.length;
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function gcookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}




function ConfirmerSuppression() {

    $.confirm({
        title: 'Supprimer utilisateur',
        content: 'Êtes vous sûr de vouloir supprimer l\'utilisateur ?',
        buttons: {
            Oui : function () {
                $("#deleteUser").submit();
            },
            Non: {
                text: 'Non'
            }
        }
    });
}



$(document).ready(function(){
    var css = 0;
    var linkCSS = document.getElementsByTagName("link")[0];

    if (gcookie(theme)=='dark') {
        linkCSS.href= "css/style2.css";
        $("#theme").removeAttr('checked');
    }
    else {
        linkCSS.href = "css/style.css";
    }
    $('.message').hide();
});