/*price range*/

 $('#sl2').slider();

	var RGBChange = function() {
	  $('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
	};	
		
/*scroll to top*/

$(document).ready(function(){
    $(".adm").hide();
    if (gcookie("rank") == 1) {

        $(".adm").show();
    }
    $(".prof").hide();
    if(gcookie("id")){
        $(".prof").show();
    }

    $('.disconnect').hide();
    if(gcookie('id'))
        $(".disconnect").show();
    $('.dropdown').show();
    if(gcookie('id'))
        $(".dropdown").hide();

    $(function () {
		$.scrollUp({
	        scrollName: 'scrollUp', // Element ID
	        scrollDistance: 300, // Distance from top/bottom before showing element (px)
	        scrollFrom: 'top', // 'top' or 'bottom'
	        scrollSpeed: 300, // Speed back to top (ms)
	        easingType: 'linear', // Scroll to top easing (see http://easings.net/)
	        animation: 'fade', // Fade, slide, none
	        animationSpeed: 200, // Animation in speed (ms)
	        scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
					//scrollTarget: false, // Set a custom target element for scrolling to the top
	        scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
	        scrollTitle: false, // Set a custom <a> title if required.
	        scrollImg: false, // Set true to use image
	        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	        zIndex: 2147483647 // Z-Index for the overlay
		});
	});
});

function gcookie(name)
{
    if(document.cookie.length>0)
    {
        start=document.cookie.indexOf(name+"=");
        pos = start+name.length+1;
        if(start!=0)
        {
            start=document.cookie.indexOf("; "+name+"=");
            pos = start+name.length+3;
        }
        if(start!=-1)
        {
            start=pos;
            end=document.cookie.indexOf(";",start);
            if(end==-1)
            {
                end=document.cookie.length;
            }
            return decodeURI(document.cookie.substring(start,end));
        }
    }
    return '';
}