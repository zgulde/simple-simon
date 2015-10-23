"use strict";
// $(document).ready(function(){

	var colorsLit = [];
	var colorsIndex = 0;
	var lightUpSpeed = 350;
	//c2, cs2, ... c5
	var notes = {
		c2: new Audio('/media/C2.wav'),
		cs2: new Audio('/media/CS2.wav'),
		d2: new Audio('/media/D2.wav'),
		ds2: new Audio('/media/DS2.wav'),
		e2: new Audio('/media/E2.wav'),
		f2: new Audio('/media/F2.wav'),
		fs2: new Audio('/media/FS2.wav'),
		g2: new Audio('/media/G2.wav'),
		gs2: new Audio('/media/GS2.wav'),
		a2: new Audio('/media/A2.wav'),
		as2: new Audio('/media/AS2.wav'),
		b2: new Audio('/media/B2.wav'),
		c3: new Audio('/media/C3.wav'),
		cs3: new Audio('/media/CS3.wav'),
		d3: new Audio('/media/D3.wav'),
		ds3: new Audio('/media/DS3.wav'),
		e3: new Audio('/media/E3.wav'),
		f3: new Audio('/media/F3.wav'),
		fs3: new Audio('/media/FS3.wav'),
		g3: new Audio('/media/G3.wav'),
		gs3: new Audio('/media/GS3.wav'),
		a3: new Audio('/media/A3.wav'),
		as3: new Audio('/media/AS3.wav'),
		b3: new Audio('/media/B3.wav'),
		c4: new Audio('/media/C4.wav'),
		cs4: new Audio('/media/CS4.wav'),
		d4: new Audio('/media/D4.wav'),
		ds4: new Audio('/media/DS4.wav'),
		e4: new Audio('/media/E4.wav'),
		f4: new Audio('/media/F4.wav'),
		fs4: new Audio('/media/FS4.wav'),
		g4: new Audio('/media/G4.wav'),
		gs4: new Audio('/media/GS4.wav'),
		a4: new Audio('/media/A4.wav'),
		as4: new Audio('/media/AS4.wav'),
		b4: new Audio('/media/B4.wav'),
		c5: new Audio('/media/C5.wav')
	}
	var blueSound = notes.c3;
	var yellowSound = notes.g3;
	var redSound = notes.b3;
	var greenSound = notes.c4;
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

	function getSoundFromColorName (color) {
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
		var sound = getSoundFromColorName($color.attr('id'));
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

	//add event listeners
	(function(){
		$('#middle-btn').click(startGame);
		$('.color-btn').click(function(){
			var sound = getSoundFromColorName($(this).attr('id'));
			playThenPause(sound,200);
		})
	})();

// });