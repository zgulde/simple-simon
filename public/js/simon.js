"use strict";
// $(document).ready(function(){

	var colorsLit = [];
	var colorsIndex = 0;
	var lightUpSpeed = 350;
	var notes = {
		a2: new Audio('/media/A2.wav'),
		cs3: new Audio('/media/CS3.wav'),
		e3: new Audio('/media/E3.wav'),
		a3: new Audio('/media/A3.wav'),
		c3: new Audio('/media/C3.wav')
	}
	var blueSound = notes.a2;
	var yellowSound = notes.cs3;
	var redSound = notes.e3;
	var greenSound = notes.a3;
	var lossSound = notes.c3;

	function randomNumber(min,max){
		return Math.floor( (Math.random() * (max-min+1) + min) );
	}

	function playThenPause (sound,duration) {
		if(!duration) duration = 300;
		sound.play();
		setTimeout( function(){
			sound.pause();
			sound.load();
		}, duration);
	}

	function getSound (color) {
		switch (color){
			case "blue":
				return blueSound;
				break;
			case "yellow":
				return yellowSound;
				break;
			case "red":
				return redSound;
				break;
			case "green":
				return greenSound;
				break;
		}
	}

	function lightUp($color){
		var sound = getSound($color.attr('id'));
		playThenPause(sound);
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
		$('.color-btn').off('click',checkClicks);
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
		playThenPause(lossSound,1000);
	}

	$('#middle-btn').click(startGame);
	$('.color-btn').click(function(){
		var sound = getSound($(this).attr('id'));
		playThenPause(sound,200);
	})

// });