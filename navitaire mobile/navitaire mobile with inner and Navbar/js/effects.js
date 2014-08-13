$('#bt-menu a').click(function(){
	$(this).show("bt-menu-open");
	if($('.mp-pushed').length == 0)
	{
		$('#mp-menu').removeClass('hidden');
		$(this).parent().addClass('bt-menu-open');
		$(this).parent().removeClass('bt-menu-close');
	}
	else
	{
		$(this).parent().addClass('bt-menu-close');
		$(this).parent().removeClass('bt-menu-open');
		$('#mp-menu').addClass('hidden');
	}
});

$('#bt-menu a').mouseover(function(){
	if($('.mp-pushed').length == 0)
	{
		$(this).parent().addClass('bt-menu-open');
		$(this).parent().removeClass('bt-menu-close');
	}
});

$('#bt-menu a').mouseout(function(){
	if($('.mp-pushed').length > 0)
	{
		$(this).parent().addClass('bt-menu-open');
		$(this).parent().removeClass('bt-menu-close');
	}
	else
	{
		$(this).parent().addClass('bt-menu-close');
		$(this).parent().removeClass('bt-menu-open');
	}
});

var myApp;
myApp = myApp || (function () {
    var pleaseWaitDiv = $('#pleaseWaitDialog');
    return {
        showPleaseWait: function() {
            pleaseWaitDiv.modal();
        },
        hidePleaseWait: function () {
            pleaseWaitDiv.modal('hide');
        },

    };
})();

$(document).ready(function(){
	$(window).trigger('resize');
});

$(window).on("load",function(){
		var navigationBar = $('nav.navbar');
		navigationBar.removeClass('preload').addClass('postload');
		navigationBar.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
			navigationBar.find('div').removeClass('hidden');
			setTimeout(function() {
				navigationBar.find('div').removeClass('transparent');
			}, 1);
			$('#pleaseWaitDialog').addClass('transparent');
		});
});

$(window).resize(function(){
	if($(window).width() > 768)
	{
		window.location.replace("http://www.navitaire.com");
	}
});