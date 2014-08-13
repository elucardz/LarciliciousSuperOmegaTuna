$('#productsLink').on("click",function(e){
	var input = $('#products-inner');
	if(input.hasClass('hidden'))
	{
		input.addClass('show');
		input.removeClass('hidden');
		setTimeout(function(){
			input.css('bottom','0px');
		}, 1);
	}
	else
	{
		input.removeClass('show');
		input.css('z-index','-99999999');
		setTimeout(function(){
			input.css('bottom','1000px');
		}, 1);
	}
	adjustZIndex(input);
	hideElementAfterAnimation(input);
	e.preventDefault();
});

$('.gotoElement').on('click',function(){
	gotoDiv(this);
})

$('#customersButton').on("click",function(e){
	var input = $('#customers-inner');
	if(input.hasClass('hidden'))
	{
		input.addClass('show');
		input.removeClass('hidden');
		setTimeout(function(){
			input.css('bottom','0px');
		}, 1);
	}
	else
	{
		input.removeClass('show');
		input.css('z-index','-99999999');
		setTimeout(function(){
			input.css('bottom','1000px');
		}, 1);
	}
	adjustZIndex(input);
	hideElementAfterAnimation(input);
	e.preventDefault();
});

$('#navitaireDifferenceButton').on("click",function(e){
	var input = $('#navdiff-inner');
	if(input.hasClass('hidden'))
	{
		input.addClass('show');
		input.removeClass('hidden');
		setTimeout(function(){
			input.css('bottom','0px');
		}, 1);
	}
	else
	{
		input.removeClass('show');
		input.css('z-index','-99999999');
		setTimeout(function(){
			input.css('bottom','1000px');
		}, 1);
	}
	adjustZIndex(input);
	hideElementAfterAnimation(input);
	e.preventDefault();
});

adjustZIndex = function(input)
{
	input.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
		if($(this).hasClass('show'))
		{
			$(this).css('z-index','1');
			scrollToElement(input[0], 200);
		}
	});	
}

hideElementAfterAnimation = function(input)
{
	input.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
		if($(this).hasClass('show') == false)
		{
		$(this).addClass('hidden');
		}
	});		
}



scrollToElement = function(el, ms){
    var speed = (ms) ? ms : 200;
    $('html,body').animate({
        scrollTop: $(el).offset().top
    }, speed);
}

gotoDiv = function(e){
	var el = $(e).attr('href');
	var speed = 500;
    $('html,body').animate({
        scrollTop: $(el).offset().top
    }, speed);
}