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
		console.log(colorsLit);
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
		        startNewRound();
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
		$('#middle-btn-text').text('Round ' + colorsLit.length);
		showCurrentSequence();
		$('.color-btn').on('click',checkClicks);
	}

	$('#middle-btn').click(startNewRound);

	$('.color-btn').hover(function(){
		$(this).css('opacity','0.75');
	},function(){
		$(this).css('opacity','0.5');
	})

// });