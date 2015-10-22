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
		var colors = ['green','red','yellow','blue']
		var colorToAdd = colors[randomNumber(0,3)];
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

	function startGame () {
		$('#middle-btn').off('click');
		startNewRound();
	}

	$('#middle-btn').click(startGame);

	$('.color-btn').on('mousedown',function(){
		$(this).css('opacity','1');
	})

	$('.color-btn').hover(function(){
		$(this).css('opacity','0.65');
	},function(){
		$(this).css('opacity','0.3');
	})

// });