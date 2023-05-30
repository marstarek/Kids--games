var correctImg = '<div class="showAnswerTickMark showAns"><img src="assets/images/tikMark.png" /></div>';
var incorrectImg = '<div class="showAnswerCrossMark showAns"><img src="assets/images/crossMark.png" /></div>';
var isMusic1Playing = false;
var isMusic2Playing = false;
var $audio1 = $("#audioPlayer1");
var $audio2 = $("#audioPlayer2");
var slider = document.getElementById("myRange");
let timer
var lastAudio = 0;

var totalItems = $('.item').length;
var currentIndex = $('div.active').index() + 1;
$(document).ready(function () {
	// document.querySelector(".timer").innerHTML = timerDiv;
	// startTimer();
	optLoop()
});
setInterval(() => {
	optLoop()
}, 500);

function letsStart() {
	onTimesUp()
	if ($('div.active').hasClass('ended')) {
		console.log('ended');

		document.querySelectorAll(".timer").forEach(e => e.innerHTML = `<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path id="base-timer-path-remaining" stroke-dasharray="-57 283" class="base-timer__path-remaining green red" d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">00</span>
</div>`);
		onTimesUp()

	} else if ($('div.active').hasClass('shown')) {
		console.log('shown');
		document.querySelectorAll(".timer").forEach(e => e.innerHTML = ``);
		document.querySelector(".active .timer").innerHTML = timer;
		// return false

	} else if ($('div.active').hasClass('done')) {
		document.querySelectorAll(".timer").forEach(e => e.innerHTML = ``);
			document.querySelectorAll(".timer").forEach(e => e.innerHTML = `<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">

✔

</span>
</div>`);
	} else if (!$('div.active').hasClass('ended') || !$('div.active').hasClass('shown') || !$('div.active').hasClass('done')) {
		console.log('else');

		document.querySelectorAll(".timer").forEach(e => e.innerHTML = ``);
		document.querySelector(".active .timer").innerHTML = timerDiv;
		startTimer();
	}


}

function fnTemplate1_v1(_div) {

	letsStart()
	optLoop()
	var slide = $(_div);
	optLoop()
	$audio1[0].currentTime = 0;
	// $("#slider").slider({"value": 0});
	slider.value = 0;
	$audio1[0].pause();
	$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
	// isMusic1Playing = true;
	$('#pButton .playImg').show();
	$('#pButton .pauseImg').hide();



	setAudio($(slide).attr('data-audioSrc'));
	$(slide).find('.option').off('click');
	$(slide).find('.option').on('click', function () {

		$audio1[0].pause();
		$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);

		$('#pButton .playImg').show();
		$('#pButton .pauseImg').hide()
		var result = $(this).attr('data-Answer');
		if (result == 'incorrect') {
			optLoop()
			fnAudio(this);
			setTimeout(function () {
				$(slide).find('.showAnswerCrossMark').fadeOut();
				$(slide).find('.showAnswerCrossMark').remove();
			}, 2000);
		} else if (result == 'correct') {

			optLoop()
			$(this).addClass('answered')
			checkCurrentOpt($(this).find('.fishAns'))

			$(slide).find(this).addClass('optDisable').off('click');
			$(this).css("animation-play-state", "paused")
			$(this).find('.fishAns').css("animation-play-state", "paused")
			$(slide).find('.showAnswerTickMark').fadeIn('slow');
			checkAllAnswered()
			fnAudio(this);
		}

		if ($(slide).find(".option[data-Answer='correct'].optDisable").length == $(slide).find(".option[data-Answer='correct']").length) {
			$('.showAnsBtn').addClass('disabled');
		}

	});

	if ($(slide).find('div.showAns').length == 0) {
		$('.showAnsBtn').removeClass('disabled');
	} else {
		$('.showAnsBtn').addClass('disabled');
		$('div.active').find('.option').off('click');
	}

}

function fnReloadAll() {
	$('div').find('input').val('')
	$('div').find('.option').css("animation-play-state", "running")
	$('div').find('.fishAns').css("animation-play-state", "running")
	$('div').find('input').removeClass('current')
	$('div').find("input:first").addClass('current')
	$('.question').find('.option').each(function (index, element) {
		$(element).removeClass(' correct answered inVisible prevent_click').attr("data-audioSrc", "assets/audio/incorrect.mp3").attr("data-Answer", "incorrect")
	});
	$('div .shark').removeClass('Visible').addClass('inVisible');
	$('div.sharkb').removeClass('Visible').addClass('inVisible');
	$('.gameover').removeClass('Visible').addClass('inVisible');
	$('.item ').removeClass('ended shown done');
	optLoop()
	onTimesUp()
	startTimer()

	$('.showAns').remove();
	$('.option').removeClass('disabled optDisable').on('click');
	$('#myCarousel').carousel(0);
	stopAudio();
	fnTemplate1_v1($('div.active'));
}

function fnReloadScreen() {
	$('div.active').find('input').val('')
	$('div.active').find('.option').css("animation-play-state", "running")
	$('div.active').find('.fishAns').css("animation-play-state", "running")
	$('div.active').find('input').removeClass('current')
	$('div.active').find("input:first").addClass('current')
	$('div.active .question').find('.option').each(function (index, element) {
		$(element).removeClass(' correct answered inVisible prevent_click').attr("data-audioSrc", "assets/audio/incorrect.mp3").attr("data-Answer", "incorrect")
	});
	$('div.active .shark').removeClass('Visible').addClass('inVisible');
	$('div.active .sharkb').removeClass('Visible').addClass('inVisible');
	$('div.active .gameover').removeClass('Visible').addClass('inVisible');
	$('div.active  ').removeClass('ended shown done');
	optLoop()
	onTimesUp()
	startTimer()
	$('div.active').find('.showAns').remove();
	$('div.active').find('.option').removeClass('disabled optDisable').on('click');
	stopAudio();
	fnTemplate1_v1($('div.active'));
}

function fnAudio(obj) {
	var titleAudioPath = $(obj).attr('data-audioSrc');
	$audio2[0].setAttribute('src', titleAudioPath);
	$audio2[0].load();
	var playPromise = $audio2[0].play();

	if (playPromise !== undefined) {
		playPromise.then(function (value) {
				// Automatic playback started!
				// Show playing UI.
				// $audio1[0].currentTime = 0;        
				$("#slider").slider({
					"value": 0
				});
				$audio1[0].pause();
				$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
				$('#pButton .playImg').show();
				$('#pButton .pauseImg').hide();
			})
			.catch(function (error) {
				// Auto-play was prevented
				// Show paused UI.
			});
	}
}

function showAns() {
	timer = $('div.active .timer').html();

	$('div.active').addClass('shown')
	onTimesUp()
	stopFish()
	$('div.active').find('input').each(function (index, element) {
		$(element).val($(element).attr("data-optDataAns"))
	});
	isMusicPlaying = false;
	$audio1[0].pause();
	$audio2[0].pause();
	stopAudio();
	isMusic1Playing = false;
	$('div.active').find('.option').addClass('optDisable').off('click');
	$(this).addClass('disabled');
}

function setAudio(_src) {
	if (_src == "") {
		$('.controlsDiv').addClass('hide');
	} else {
		$('.controlsDiv').removeClass('hide');
	}
	$audio1[0].setAttribute('src', _src);
	$audio1[0].load();
}

/* Title Audio function */
function fnTitleAudioClick(obj) {
	if ($(obj).hasClass('disabled')) {
		return false;
	}
	//$audio1[0].currentTime = 0;
	//$("#slider").slider({"value": 0});
	$audio1[0].pause();
	$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
	$('#pButton .playImg').show();
	$('#pButton .pauseImg').hide();
	var titleAudioPath = $(obj).attr('data-audioSrc');
	$audio2[0].setAttribute('src', titleAudioPath);
	$audio2[0].load();
	$audio2[0].play();
	isMusic1Playing = false;
	isMusic2Playing = true;

}

function stopFish() {
	$('div.active').find('.option').css("animation-play-state", "paused")
	$('div.active').find('.fishAns').css("animation-play-state", "paused")
	$('div.active').find('input').removeClass('current')
	$('.showAnsBtn').addClass('disabled');
	$('div.active').find('.option').each(function (index, element) {
		$(element).addClass('prevent_click');
		console.log(element);
	});

}

function fnUpdateTimer() {
	var progressValue = Math.round(($audio1[0].currentTime / $audio1[0].duration) * 100);
	slider.value = progressValue;
}



function fnStartAudio(_state) {
	$audio2[0].pause();
	if (_state == 'play') {
		$('#pButton .playImg').hide();
		$('#pButton .pauseImg').show();
		$audio1[0].play();
		isMusic1Playing = true;
	} else {
		$('#pButton .playImg').show();
		$('#pButton .pauseImg').hide();
		$audio1[0].pause();
		lastAudio = 0;
		isMusic1Playing = false;
	}
	$audio1[0].addEventListener('timeupdate', fnUpdateTimer);
}

function stopAudio() {
	$audio1[0].pause();
	$('#pButton .playImg').show();
	$('#pButton .pauseImg').hide();
	$audio1[0].currentTime = 0;
	slider.value = 0;
	isMusic1Playing = false;
	$audio2[0].pause();
	isMusic2Playing = false;
	lastAudio = 0;


}

function fnSetPlayer() {
	if (currentIndex == 1) {
		$('.backBtn').addClass('disabled');
	}

	if (totalItems == 1) {
		$('.navigationControls, .nextBtn, .reloadBtnScreen, .backBtn, .pageNumber').addClass('hide');
	}

	if ($('.title').attr('data-audioSrc') == "") {
		$('.title').addClass('hide');
		$('.headingTitle').removeClass('col-xs-10').addClass('col-xs-11');
	}


	$audio1[0].addEventListener('playing', function () {
		lastAudio = 1;
		isMusic1Playing = true;
	});

	$audio2[0].addEventListener('playing', function () {
		lastAudio = 2;
		isMusic2Playing = true;
	});

	$audio1[0].addEventListener('pause', function () {
		isMusic1Playing = false;
	});

	$audio2[0].addEventListener('pause', function () {
		isMusic2Playing = false;
	});

	$audio2[0].addEventListener('ended', function () {
		lastAudio = 0;
	});
	$audio1[0].addEventListener('ended', function () {
		lastAudio = 0;
		isMusic1Playing = false;
		$audio1[0].currentTime = 0;
		slider.value = 0;
		$audio1[0].pause();
		$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
		$('#pButton .playImg').show();
		$('#pButton .pauseImg').hide();
	});

	slider.addEventListener("input", function () {
		// console.log(">> input "+slider.value);
		// $audio1[0].pause();
		$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
		var setTime = Math.round((slider.value * $audio1[0].duration) / 100);
		$audio1[0].currentTime = setTime;
	}, false);
	slider.addEventListener("change", function () {
		// console.log("change >> "+isMusic1Playing);
		if (isMusic1Playing) {
			$audio1[0].play();
			$audio1[0].addEventListener('timeupdate', fnUpdateTimer);
		}
	}, false);

	$('#myCarousel').on('slid.bs.carousel', function () {
		currentIndex = $('div.active').index() + 1;
		$('.pageNumber').html(currentIndex + ' of ' + totalItems);
		if (currentIndex == 1) {
			$('.backBtn').addClass('disabled');
		} else {
			$('.backBtn').removeClass('disabled');
		}

		if (currentIndex == totalItems) {
			$('.nextBtn').addClass('disabled');
		} else {
			$('.nextBtn').removeClass('disabled');
		}

		// need to edit template function name here:
		fnTemplate1_v1($('div.active'));
	});
}

function optLoop() {

	$('div.active .question').find('.option').each(function (index, element) {
		if ($(element).text().trim() === $('div.active .current').attr("data-optDataAns")) {
			$(element).addClass(' correct').attr("data-audioSrc", "assets/audio/correct.mp3").attr("data-Answer", "correct")
		}
	});
}

function checkCurrentOpt(opt) {
	if ($('div.active .current').attr("data-optDataAns") == $(opt).text()) {
		$('div.active .current').val($(opt).text())
		let x = $('div.active .current').next()
		$('div.active .current').removeClass("current")
		$(x).addClass('current')
		console.log(true);
	} else {
		console.log(false);
	}


}
// $(".tank").mousemove(function (event) {
// 	var dot, eventDoc, doc, body, pageX, pageY;
// 	event = event || window.event; 
// 	if (event.pageX == null && event.clientX != null) {
// 		eventDoc = (event.target && event.target.ownerDocument) || document;
// 		doc = eventDoc.documentElement;
// 		body = eventDoc.body;

// 		event.pageX = event.clientX +
// 			(doc && doc.scrollLeft || body && body.scrollLeft || 0) -
// 			(doc && doc.clientLeft || body && body.clientLeft || 0);
// 		event.pageY = event.clientY +
// 			(doc && doc.scrollTop || body && body.scrollTop || 0) -
// 			(doc && doc.clientTop || body && body.clientTop || 0);
// 	}

// 	// Add a dot to follow the cursor
// 	console.log('====================================');
// 	console.log("ddddddddddd");
// 	console.log('====================================');
// 	$(".cursor").show().css({
// 		"left": event.pageX + "px",
// 		"top": event.pageY + "px"
// 	});

// })
// $('.Hook').click(function (e) {

// 	if ($('.Hook').attr("data-state") == 'pointer') {
// 		console.log(true);
// 		$(".tank").mousemove(function (e) {
// 				$(".cursor").show().css({
// 					"left": e.clientX,
// 					"top": e.clientY
// 				});
// 			})
// 			.mouseout(function () {
// 				$(".cursor").hide();
// 			});
// 		$(this).find('img').attr("src", "./assets/images/p78e2/pointer.png")
// 		$('.Hook').attr("data-state", "hook")
// 	} else if ($('.Hook').attr("data-state") == 'hook') {
// 		console.log($(this).find('img'));
// 		$('.Hook').attr("data-state", "pointer")
// 		$(this).find('img').attr("src", "./assets/images/p78e2/1x.png")

// 		$(".tank").mousemove(function (e) {
// 				$(".cursor").hide().css('display', 'none');
// 			})
// 			.mouseout(function () {
// 				$(".cursor").hide();
// 			});
// 	}


// });


function checkAllAnswered() {
	if ($('div.active .answered').length == $('div.active .option').length) {
		onTimesUp();
		$('div.active .question').find('.option').each(function (index, element) {

			$(element).addClass(' prevent_click')
			$('div.active').addClass('done')

		});

	}
}