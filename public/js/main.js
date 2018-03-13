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