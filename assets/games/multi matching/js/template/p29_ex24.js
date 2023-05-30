var isMusic1Playing = false;
var isMusic2Playing = false;
var $audio1 = $("#audioPlayer1");
var $audio2 = $("#audioPlayer2");
var slider = document.getElementById("myRange");
var correctImg =
	'<div class="showAnswerTickMark  showAns correct_Tick "><img src="assets/images/tikMark.png" /></div>';
var incorrectImg =
	'<div class="showAnswerCrossMark showAns "><img src="assets/images/crossMark.png" /></div>';
var lastAudio = 0;
var score;
var scoreValue;
var totalItems = $(".item").length;
var currentIndex = $("div.active").index() + 1;

function fnTemplate3_v1(_div) {
	var slide = $(_div);
	var listDataId;
	var listAnsDataId;
	var questionLength = $(".question").length;

	$audio1[0].pause();
	$audio1[0].currentTime = 0;
	// $("#slider").slider({"value": 0});
	slider.value = 0;
	$audio1[0].pause();
	$audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
	// isMusic1Playing = true;
	$("#pButton .playImg").show();
	$("#pButton .pauseImg").hide();

	setAudio($(slide).attr("data-audioSrc"));
	// click on option

	$(".list1 .listContainer").on("click", function () {
		if ($(this).hasClass("disabled")) {
			return false;
		}
		listDataId = $(this).attr("data-id");
		console.log(listDataId);
		$(".circle").removeClass("selected");
		$(this).find(".circle").addClass("selected");

		let that = $(this).find(".circle");
		getOptionCordinates(that)
		$(that).removeClass('clicked')
		$(that).addClass('clicked')
	




	});
	// click on question 
	let ansarray = []
	function removeDuplicates(arr) {
		return arr.filter((item,
			index) => arr.indexOf(item) === index);


	}
	$(".list2 .listContainer").on("click", function () {
		
		if ($(this).hasClass("disabled") || !$(".list1 .listContainer").find(".circle").hasClass("selected")) {
			return false;
		}
		let that2 = $(this).find(".circle");
		listAnsDataId = $(this).attr('data-answer-id');
		console.log(listAnsDataId, "$(this).addClass('corr')");

		var x = $(this).attr('data-answer-id').split(',');
		if (x.includes(`${listDataId}`)) {
			ansarray.push(listDataId)
			console.log(ansarray);
// TODO  will make two objects one for refAns or defult ans and one for child ans and will compear  them  to check if they match 



// ex:
 let ansObj={
que_1:[1],
que_2:[1,3],
que_3:[4],
que_4:[2],

}
// we will fill this when student answer
 let studObj={
que_1:[1],
que_2:[1,3],
que_3:[4],
que_4:[2],

}


// FIXME (Workspace Scope)


			console.log("is in array");
		} else {
			console.log("is NOT in array");
		} 
		console.log(removeDuplicates(ansarray));

// statement here
		if (x.includes(`${listDataId}`)) {
			// $(this).addClass("disabled");
			// $(this).addClass("prevent_event answered");
			// $(".list1 .opt_" + listDataId + "").addClass("disabled prevent_event");
			setTimeout(function () {
				$(".circle").removeClass("selected");
			}, 200);
			var listDataId2 = listDataId;
// NOTE  getQuestionCordinates ,addLine
			$(this).addClass('corr')
			getQuestionCordinates(that2)
			addLine(event, state.optionLeft, state.questionLeft, state.linesLeft, state.pointHeight)
			listAnsDataId = $(this).attr("data-answer-id");
			$(this).find(".circle").addClass("selected");
			setTimeout(() => {
				send_statement(
					"matched",
					"https://yorkenglishtest.com/testing/newglobal/moodle/verbs/matched",
					`تم توصيل السؤال رقم ${listDataId2} بالاجابه رقم ${$(this).attr("data-name") }`
				);
			}, 1000);

		} else {
			// $(this).addClass("prevent_event answered");
			// $(".list1 .opt_" + listDataId + "").addClass("disabled prevent_event");
			setTimeout(function () {
				$(".list2 .circle").removeClass("selected");
				$(".circle").removeClass("selected");
			}, 200);
            // NOTE  getQuestionCordinates ,addLine
			 listDataId2 = listDataId;

			getQuestionCordinates(that2)
			addLine(event, state.optionLeft, state.questionLeft, state.linesLeft, state.pointHeight)
			listAnsDataId = $(this).attr("data-answer-id");
			$(this).find(".circle").addClass("selected");
			setTimeout(() => {
				send_statement(
					"matched",
					"https://yorkenglishtest.com/testing/newglobal/moodle/verbs/matched",
					`تم توصيل السؤال رقم ${listDataId2} بالاجابه رقم ${$(this).attr("data-name")}`
				);
			}, 1000);




		}
		
		checkAnswered()
		var showAnsDis = true;
		$(".list2 .listContainer").each(function () {
			if (!$(this).hasClass("disabled")) {
				showAnsDis = false;
				return false;
			}
		});
		if (showAnsDis) {
			// $(".showAnsBtn").addClass("disabled");
		}
	});
}












function fnReloadAll() {

	$(".line_panel2").empty();
	$(".listContainer").find(".showAns ").remove().removeClass("prevent_event disabled");
	state.attemptsNum = 0;
	state.checkBtn = true;
	$(".showAnsBtn").addClass("prevent_event");
	$(".list1 .listContainer, .list2 .listContainer").removeClass("disabled");
	$(".line").hide();
	$(".circle").removeClass("selected");
	$("#myCarousel").carousel(0);
	stopAudio();
	fnTemplate3_v1($("div.active"));
	setTimeout(() => {
		send_statement(
			"reloaded",
			"https://yorkenglishtest.com/testing/newglobal/moodle/verbs/reloaded",
			" تم الضغط على زرار إعادة التحميل "
		);
	}, 1500);
	 score=0
	 scoreValue=0
	$('.list2').find('.question_wrapper ').each(function (indexInArray, Element) { 
		$(Element).removeClass('corr')
	});


}

function fnReloadScreen() {
	stopAudio();
	fnTemplate3_v1($("div.active"));
}


function fnAudio(obj) {
	var titleAudioPath = $(obj).attr("data-audioSrc");
	$audio2[0].setAttribute("src", titleAudioPath);
	$audio2[0].load();
	var playPromise = $audio2[0].play();

	if (playPromise !== undefined) {
		playPromise.then(function (value) {
			// Automatic playback started!
			// Show playing UI.
			$audio1[0].currentTime = 0;
			$("#slider").slider({ "value": 0 });
			$audio1[0].pause();
			$audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
			$("#pButton .playImg").show();
			$("#pButton .pauseImg").hide();
		})
			.catch(function (error) {
				// Auto-play was prevented
				// Show paused UI.
			});
	}
}

function showAns() {
	// music.pause();
	// pButton.className = "";
	// pButton.className = "play";


	// 
	$(".line_panel2").empty();
	$(".showAnswerCrossMark").hide();
	$(".showAnswerTickMark").hide();
	$(".list1 .option_wrapper").each(function (i, item) {
		listDataId = $(item).attr("data-id");
		let that = $(item).find(".circle");
		getOptionCordinates(that)
		console.log(getOptionCordinates(that)
);
		$(".list2 .question_wrapper").each(function (j, subitem) {
			listDataAnsId = $(subitem).attr("data-answer-id");
			if (listDataId === listDataAnsId) {
				console.log(item, listDataId, listDataAnsId);
				let that2 = $(subitem).find(".circle");
				getQuestionCordinates(that2)
				addLine(event, getOptionCordinates(that), getQuestionCordinates(that2), state.linesLeft, state.pointHeight)
			}
		});
	});









	// 

	if ($(".showAnsBtn").hasClass("disabled")) {
		return false;
	}

	$audio1[0].pause();
	$audio2[0].pause();

	$(".list1 .listContainer, .list2 .listContainer").addClass("disabled");
	$(".line").show();
	$(".circle").removeClass("selected");
	$(this).addClass("disabled");
}

function setAudio(_src) {
	if (_src == "") {
		$(".controlsDiv").addClass("hide");
	} else {
		$(".controlsDiv").removeClass("hide");
	}
	$audio1[0].setAttribute("src", _src);
	$audio1[0].load();
}

/* Title Audio function */
function fnTitleAudioClick(obj) {
	if ($(obj).hasClass("hide")) {
		return false;
	}
	//$audio1[0].currentTime = 0;
	//$("#slider").slider({"value": 0});
	$audio1[0].pause();
	$audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
	$("#pButton .playImg").show();
	$("#pButton .pauseImg").hide();
	var titleAudioPath = $(obj).attr("data-audioSrc");
	console.log("fnTitleAudioClick 	" + titleAudioPath);
	$audio2[0].setAttribute("src", titleAudioPath);
	$audio2[0].load();
	$audio2[0].play();
	isMusic1Playing = false;
	isMusic2Playing = true;
	console.log("fnTitleAudioClick 	" + $(obj).hasClass("pageAudioIcon"));

	if ($(obj).hasClass("pageAudioIcon")) {
		setTimeout(() => {
			send_statement('audioPlayed', baseUrl + "verbs/audioPlayed", `  قام الطالب بالاستماع الي  ${$(obj).attr('data-name') }`);
		}, 1000);
	} else {
		setTimeout(() => {
			send_statement('audioPlayed', baseUrl + "verbs/audioPlayed", " قام الطالب بالاستماع الي المقطع الصوتي الخاص بعنوان  المثال 8");
		}, 1000);
	}














}
function fnStartAudio(_state) {
	$audio2[0].pause();
	if (_state == 'play') {
		$('#pButton .playImg').hide();
		$('#pButton .pauseImg').show();
		$audio1[0].play();
		isMusic1Playing = true;

		setTimeout(() => {
			send_statement('audioPlayed', baseUrl + "verbs/audioPlayed", " قام الطالب بالاستماع الي المقطع الصوتي الخاص بعنوان  المثال 3");
		}, 1000);

	} else {
		$('#pButton .playImg').show();
		$('#pButton .pauseImg').hide();
		$audio1[0].pause();
		lastAudio = 0;
		isMusic1Playing = false;
		setTimeout(() => {
			send_statement('audioPaused', baseUrl + "verbs/audioPaused", ` قام الطالب بايقاف المقطع الصوتي الخاص بالمثال 3 عند الثانيه  ${slider.value} 
                          `);
		}, 1000);
	}
	$audio1[0].addEventListener('timeupdate', fnUpdateTimer);

}


function fnUpdateTimer() {
	var progressValue = Math.round(($audio1[0].currentTime / $audio1[0].duration) * 100);

	slider.value = progressValue;
}

function fnStartAudio(_state) {
	$audio2[0].pause();
	if (_state == "play") {
		$("#pButton .playImg").hide();
		$("#pButton .pauseImg").show();
		$audio1[0].play();
		isMusic1Playing = true;
	} else {
		$("#pButton .playImg").show();
		$("#pButton .pauseImg").hide();
		$audio1[0].pause();
		lastAudio = 0;
		isMusic1Playing = false;
	}
	$audio1[0].addEventListener("timeupdate", fnUpdateTimer);
}

function stopAudio() {
	$audio1[0].pause();
	$("#pButton .playImg").show();
	$("#pButton .pauseImg").hide();
	$audio1[0].currentTime = 0;
	slider.value = 0;
	isMusic1Playing = false;
	$audio2[0].pause();
	isMusic2Playing = false;
	lastAudio = 0;
}

function fnSetPlayer() {
	if (currentIndex == 1) {
		$(".backBtn").addClass("disabled");
	}

	if (totalItems == 1) {
		$(".navigationControls, .nextBtn, .reloadBtnScreen, .backBtn, .pageNumber").addClass("hide");
	}

	if ($(".title").attr("data-audioSrc") == "") {
		$(".title").addClass("hide");
		$(".headingTitle").removeClass("col-xs-10").addClass("col-xs-11");
	}

	$audio1[0].addEventListener("playing", function () {
		lastAudio = 1;
		isMusic1Playing = true;
	});

	$audio2[0].addEventListener("playing", function () {
		lastAudio = 2;
		isMusic2Playing = true;
	});

	$audio1[0].addEventListener("pause", function () {
		isMusic1Playing = false;
	});

	$audio2[0].addEventListener("pause", function () {
		isMusic2Playing = false;
	});

	$audio1[0].addEventListener("ended", function () {
		lastAudio = 0;
		isMusic1Playing = false;
		$audio1[0].currentTime = 0;
		$("#slider").slider({ "value": 0 });
		$audio1[0].pause();
		$audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
		$("#pButton .playImg").show();
		$("#pButton .pauseImg").hide();
	});

	$audio2[0].addEventListener("ended", function () {
		lastAudio = 0;
	});

	slider.addEventListener("input", function () {
		// console.log(">> input "+slider.value);
		// $audio1[0].pause();
		$audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
		var setTime = Math.round((slider.value * $audio1[0].duration) / 100);
		$audio1[0].currentTime = setTime;
	}, false);

	slider.addEventListener("change", function () {
		// console.log("change >> "+isMusic1Playing);
		if (isMusic1Playing) {
			$audio1[0].play();
			$audio1[0].addEventListener("timeupdate", fnUpdateTimer);
		}
	}, false);

	$("#myCarousel").on("slid.bs.carousel", function () {
		currentIndex = $("div.active").index() + 1;
		$(".pageNumber").html(currentIndex + " of " + totalItems);
		if (currentIndex == 1) {
			$(".backBtn").addClass("disabled");
		} else {
			$(".backBtn").removeClass("disabled");
		}

		if (currentIndex == totalItems) {
			$(".nextBtn").addClass("disabled");
		} else {
			$(".nextBtn").removeClass("disabled");
		}

		// need to edit template function name here:
		fnTemplate3_v1($("div.active"));
	});
	$(".pageNumber").html(currentIndex + " of " + totalItems);
}




function submitAnswers() {
	console.log('submitAnswers');
	$audio1[0].pause();
	$audio2[0].pause();
	const correctCount = $('.corr').length;
	const totalQues = $('.question_wrapper').length;
	console.log(correctCount);
	console.log(totalQues);
	score = Math.round((correctCount * 100) / totalQues);

	 scoreValue = Math.round((correctCount * 100) / totalQues) / 100;
	console.log(scoreValue, score);
	let success = false;
	if (scoreValue > 50) {
		success = true;
	} else {
		success = false;
	}
	setTimeout(() => {
		send_statement_score(
			"completed",
			"https://yorkenglishtest.com/testing/newglobal/moodle/verbs/completed",
			" تم إجتياز الاختبار بنسبة " + " %" + score,
			success,
			true,
			scoreValue
		);
	}
	, 1000);
	$(".showAnsBtn").addClass("disabled");

}