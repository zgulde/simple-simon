"use strict";
// $(document).ready(function(){

	var colorsLit = [];
	var colorsIndex = 0;
	var lightUpSpeed = 350;
	var lossSound = new Audio('/media/mario_game_over.mp3');

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
	
	var blueSound, yellowSound, redSound, greenSound; //set after selects are built
	var spinSpeed; // set in startGame
	var shaking; // set in shakeBodyRandomly


	function randomNumber(min,max){
		return Math.floor( (Math.random() * (max-min+1) + min) );
	}

	function changeAndUpdateSounds(blueNoteName,yellowNoteName,redNoteName,greenNoteName){
		blueSound = musicalNotes[blueNoteName];
		$('#change-blue-note').val(blueNoteName);

		yellowSound = musicalNotes[yellowNoteName];
		$('#change-yellow-note').val(yellowNoteName);
		
		redSound = musicalNotes[redNoteName];
		$('#change-red-note').val(redNoteName);
		
		greenSound = musicalNotes[greenNoteName];
		$('#change-green-note').val(greenNoteName);
	}

	function shakeBodyRandomly () {
		shaking = setInterval(function(){
			if(randomNumber(1,4) === 1){
				$('body').css('transform','rotate(20deg)');
				setTimeout( function(){
					$('body').css('transform','rotate(0)');
				}, 300);
			}
		},1500);
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

	function lightUp($color,duration){
		var sound = getSoundFromColorName($color.attr('id'));
		if(!duration) duration = lightUpSpeed;
		playThenPause(sound);
		$color.addClass('light-up');
		$color.addClass($color.attr('id') + '-lit');
		setTimeout( function(){
			$color.removeClass('light-up')
			$color.removeClass($color.attr('id') + '-lit');
		}, duration);
	}

	function lightUpAll () {
		lightUp($('#blue'),500);
		setTimeout( function(){ lightUp($('#yellow'),500); }, 500);
		setTimeout( function(){ lightUp($('#red'),500); }, 1000);
		setTimeout( function(){ lightUp($('#green'),500); }, 1500);
	}

	function showCurrentSequence () {
		var i = 0;
		var showingSequence = setInterval(function(){
			lightUp( $('#'+colorsLit[i]) ); //convert color name to jquery selector for that div
			i++;
			if(i === colorsLit.length){
				$('.color-btn').on('click',checkClicks);	
				clearInterval(showingSequence);
			} 
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
			    $('#game').addClass('flip');
			    setTimeout( function(){ $('#game').removeClass('flip'); }, 300);
		    }
		} else {
			endGame();
		}
	}

	function startNewRound () {
		spinSpeed -= 1;
		colorsIndex = 0;

		if(colorsLit.length === 5) $('#game').addClass('moving');
		if(colorsLit.length === 3) shakeBodyRandomly();
		
		addRandomColor();

		$('#middle-btn-text').text('Round ' + colorsLit.length);
		$('.moving').css('animation-duration',spinSpeed + 's');
		$('.color-btn').off('click',checkClicks);
		
		showCurrentSequence();
	}

	function startGame () {
		spinSpeed = 20;
		colorsLit = [];
		$('#middle-btn').off('click');
		startNewRound();
	}

	function endGame () {
		var $lastColor =$('#' + colorsLit[colorsIndex]);
		colorsIndex = 0;
		lossSound.play();

		$('#middle-btn-text').text('Score ' + (colorsLit.length - 1) );
		$('.color-btn').off('click',checkClicks);
		$('#game').removeClass('moving');
		clearInterval(shaking);
		
		//after the lossSound is played light up what would have been the 
		//correct color 3 times
		setTimeout( function(){
			lightUp($lastColor,500);
			setTimeout( function(){lightUp($lastColor,500);}, 600);
			setTimeout( function(){
				lightUp($lastColor,500);
				$('#middle-btn-text').text('Again?');
				$('#middle-btn').on('click',startGame);
			}, 1200);
		}, 3400);
		
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
		changeAndUpdateSounds('C 3','G 3','B 3','C 4');
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
			playThenPause(blueSound);
			lightUp($('#blue'));
		});
		$('#change-yellow-note').change(function(){
			yellowSound = musicalNotes[$(this).val()];
			playThenPause(yellowSound);
			lightUp($('#yellow'));
		});
		$('#change-red-note').change(function(){
			redSound = musicalNotes[$(this).val()];
			playThenPause(redSound);
			lightUp($('#red'));
		});
		$('#change-green-note').change(function(){
			greenSound = musicalNotes[$(this).val()];
			playThenPause(greenSound);
			lightUp($('#green'));
		});
		$('#original-simon-btn').click(function(){
			changeAndUpdateSounds('E 2','C#3','A 3','E 4');
			lightUpAll();
		});
		$('#latest-simon-btn').click(function(){
			changeAndUpdateSounds('G 2','C 3','E 3','G 3');
			lightUpAll();
		});
		$('#amin-btn').click(function(){
			changeAndUpdateSounds('A 3','C 4','E 4','A 4');
			lightUpAll();
		});
		$('#edim-btn').click(function(){
			changeAndUpdateSounds('E 3','A#3','E 4','A#4');
			lightUpAll();
		});
		$('#fifths-btn').click(function(){
			changeAndUpdateSounds('C 3','G 3','D 4','A 4');
			lightUpAll();
		});
		$('#smoke-on-the-water-btn').click(function(){
			changeAndUpdateSounds('A 3','C 4','D 4','D#4');
			lightUpAll();
		});
		$('#little-lamb-btn').click(function(){
			changeAndUpdateSounds('C 4','D 4','E 4','G 4');
			lightUpAll();
		});
	})();
// });




// setInterval(function(){
//   rotate+=5;
//   $('#game').css('transform','rotate('+rotate+'deg)');
// },100);