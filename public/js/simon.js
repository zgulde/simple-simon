"use strict";
// $(document).ready(function(){

	var colorsLit = ['red','blue','red','green'];
	var colorsIndex = 0;

	function randomNumber(min,max){
		return Math.floor( (Math.random() * (max-min+1) + min) );
	}

	function lightUp($color){
		$color.css('opacity','1');
		setTimeout( function(){
			$color.css('opacity','0.5')
		}, 500);
	}

	function showCurrentSequence () {
		var i = 0;
		var showingSequence = setInterval(function(){
			lightUp( $('#'+colorsLit[i]) );
			i++;
			if(i === colorsLit.length) clearInterval(showingSequence);
		},750)
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
		if ($(this).attr('id') === colorsLit[colorsIndex]) {
		    colorsIndex += 1;
		    if (colorsIndex === colorsLit.length) {
		        something(); //correct sequence entered
		    }
		} else {
			colorsIndex = 0;
		}
	});

	$('.color-btn').hover(function(){
		$(this).css('opacity','0.75');
	},function(){
		$(this).css('opacity','0.5');
	})

// });