"use strict";
// $(document).ready(function(){

	var colorsLit = [];
	var colorsIndex = 0;
	var lightUpSpeed = 350;

	function randomNumber(min,max){
		return Math.floor( (Math.random() * (max-min+1) + min) );
	}

	function lightUp($color){
		$color.addClass('light-up');
		$color.addClass($color.attr('id') + '-lit');
		setTimeout( function(){
			$color.removeClass('light-up')
			$color.removeClass($color.attr('id') + '-lit');
		}, lightUpSpeed);
	}

	function showCurrentSequence () {
		console.log(colorsLit);
		var i = 0;
		var showingSequence = setInterval(function(){
			lightUp( $('#'+colorsLit[i]) ); //convert color name to jquery selector for that div
			i++;
			if(i === colorsLit.length) clearInterval(showingSequence);
		},lightUpSpeed*2)
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
		        startNewRound();
		    }
		} else {
			colorsIndex = 0;
			endGame();
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
		colorsLit = [];
		$('#middle-btn').off('click');
		startNewRound();
	}

	function endGame () {
		$('#middle-btn-text').text('Score ' + (colorsLit.length - 1) );
		setTimeout( function(){
			$('#middle-btn-text').text('Again?');
			$('#middle-btn').on('click',startGame);
		}, 2000);
	}

	$('#middle-btn').click(startGame);

// });