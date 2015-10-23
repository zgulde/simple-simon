"use strict";
// $(document).ready(function(){

	var colorsLit = [];
	var colorsIndex = 0;
	var lightUpSpeed = 350;
	var spinSpeed = 20;
	//'C 2','C#2',...'C 5' all sharps, no flats
	var musicalNotes = {
		"C 2": new Audio('/media/C2.wav'),
		"C#2": new Audio('/media/CS2.wav'),
		"D 2": new Audio('/media/D2.wav'),
		"D#2": new Audio('/media/DS2.wav'),
		"E 2": new Audio('/media/E2.wav'),
		"F 2": new Audio('/media/F2.wav'),
		"F#2": new Audio('/media/FS2.wav'),
		"G 2": new Audio('/media/G2.wav'),
		"G#2": new Audio('/media/GS2.wav'),
		"A 2": new Audio('/media/A2.wav'),
		"A#2": new Audio('/media/AS2.wav'),
		"B 2": new Audio('/media/B2.wav'),
		"C 3": new Audio('/media/C3.wav'),
		"C#3": new Audio('/media/CS3.wav'),
		"D 3": new Audio('/media/D3.wav'),
		"D#3": new Audio('/media/DS3.wav'),
		"E 3": new Audio('/media/E3.wav'),
		"F 3": new Audio('/media/F3.wav'),
		"F#3": new Audio('/media/FS3.wav'),
		"G 3": new Audio('/media/G3.wav'),
		"G#3": new Audio('/media/GS3.wav'),
		"A 3": new Audio('/media/A3.wav'),
		"A#3": new Audio('/media/AS3.wav'),
		"B 3": new Audio('/media/B3.wav'),
		"C 4": new Audio('/media/C4.wav'),
		"C#4": new Audio('/media/CS4.wav'),
		"D 4": new Audio('/media/D4.wav'),
		"D#4": new Audio('/media/DS4.wav'),
		"E 4": new Audio('/media/E4.wav'),
		"F 4": new Audio('/media/F4.wav'),
		"F#4": new Audio('/media/FS4.wav'),
		"G 4": new Audio('/media/G4.wav'),
		"G#4": new Audio('/media/GS4.wav'),
		"A 4": new Audio('/media/A4.wav'),
		"A#4": new Audio('/media/AS4.wav'),
		"B 4": new Audio('/media/B4.wav'),
		"C 5": new Audio('/media/C5.wav')
	}
	var blueSound = musicalNotes['C 3'];
	var yellowSound = musicalNotes['G 3'];
	var redSound = musicalNotes['B 3'];
	var greenSound = musicalNotes['C 4'];
	var lossSound = musicalNotes['C#3'];


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
		spinSpeed -= 2;
		$('.spinning').css('animation-duration',spinSpeed + 's');
		if(colorsLit.length === 2) $('#game').addClass('spinning');
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
		$('#game').removeClass('spinning');
	}

	//build the note selects
	(function(){
		$('.change-note').each(function(index,element){
			var $select = $(this);
			for(var note in musicalNotes){	
				$select.append('<option value="'+note+'">' +
					note + '</option>');
			}
		});
		$('#change-blue-note').val('C 3');
		$('#change-yellow-note').val('G 3');
		$('#change-red-note').val('B 3');
		$('#change-green-note').val('C 4');
	})();

	//add event listeners
	(function(){
		$('#middle-btn').click(startGame);
		$('.color-btn').click(function(){
			var sound = getSoundFromColorName($(this).attr('id'));
			playThenPause(sound,200);
		});
		$('#change-blue-note').change(function(){
			blueSound = musicalNotes[$(this).val()];
		});
		$('#change-yellow-note').change(function(){
			yellowSound = musicalNotes[$(this).val()];
		});
		$('#change-red-note').change(function(){
			redSound = musicalNotes[$(this).val()];
		});
		$('#change-green-note').change(function(){
			greenSound = musicalNotes[$(this).val()];
		});
	})();

// });




// setInterval(function(){
//   rotate+=5;
//   $('#game').css('transform','rotate('+rotate+'deg)');
// },100);