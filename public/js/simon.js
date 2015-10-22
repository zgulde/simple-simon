"use strict";
// $(document).ready(function(){

	var colorsLit = [];
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
			lightUp( $('#'+colorsLit[i]) ); //convert color name to jquery selector for that div
			i++;
			if(i === colorsLit.length) clearInterval(showingSequence);
		},1000)
	}

	function addRandomColor () {
		var colorToAdd = '';
		switch(randomNumber(1,4)){
			case 1:
				colorToAdd = 'green';
				break;
			case 2:
				colorToAdd = 'red';
				break;
			case 3:
				colorToAdd = 'yellow';
				break;
			case 4:
				colorToAdd = 'blue';
				break;
		}
		colorsLit.push(colorToAdd);
	}

	function checkClicks () {
		if ($(this).attr('id') === colorsLit[colorsIndex]) {
		    colorsIndex += 1;
		    if (colorsIndex === colorsLit.length) {
		        alert('correct sequence entered!');
		    }
		} else {
			colorsIndex = 0;
			alert('wrong!');
		}
	}

	function startNewRound () {
		colorsIndex = 0;
		$('.color-btn').off('click');
		addRandomColor();
		showCurrentSequence();
		$('.color-btn').on('click',checkClicks);
	}

	$('.color-btn').click(checkClicks);

	// $('.color-btn').click(function(){
	// 	if ($(this).attr('id') === colorsLit[colorsIndex]) {
	// 	    colorsIndex += 1;
	// 	    if (colorsIndex === colorsLit.length) {
	// 	        something(); //correct sequence entered
	// 	    }
	// 	} else {
	// 		colorsIndex = 0;
	// 	}
	// });

	$('.color-btn').hover(function(){
		$(this).css('opacity','0.75');
	},function(){
		$(this).css('opacity','0.5');
	})

// });