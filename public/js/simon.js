"use strict";
// $(document).ready(function(){

	var colorsLit = [];

	function randomNumber(min,max){
		return Math.floor( (Math.random() * (max-min+1) + min) );
	}

	function lightUpRandomColor () {
		var colorToLight = randomNumber(1,4);
		switch(colorToLight){
			case 1:
				colorToLight = $('#green');
				break;
			case 2:
				colorToLight = $('#red');
				break;
			case 3:
				colorToLight = $('#yellow');
				break;
			case 4:
				colorToLight = $('#blue');
				break;
		}
		colorsLit.push(colorToLight.attr('id'));
		colorToLight.css('opacity','1');
		setTimeout( function(){
			colorToLight.css('opacity','0.5')
		}, 500);
	}

	$('.color-btn').click(function(){
		$(this).css('opacity','1');
		if ($(this).attr('id') === colorsLit[0]) {
		    alert('sucess!');
		} else {
			alert('failure!');
		}
	});

	$('.color-btn').hover(function(){
		$(this).css('opacity','0.75');
	},function(){
		$(this).css('opacity','0.5');
	})


// });