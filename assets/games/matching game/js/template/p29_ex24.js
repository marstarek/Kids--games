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
		$(".circle").removeClass("selected");
		$(this).find(".circle").addClass("selected");

		let that = $(this).find(".circle");
		getOptionCordinates(that)
		$(that).removeClass('clicked')
		$(that).addClass('clicked')




	});
	// click on question 
	$(".list2 .listContainer").on("click", function () {
		console.log(this);
		if ($(this).hasClass("disabled") || !$(".list1 .listContainer").find(".circle").hasClass("selected")) {
			return false;
		}
		let that2 = $(this).find(".circle");
		getQuestionCordinates(that2)
		addLine(event, state.optionTop, state.questionTop, state.linesTop, state.pointHeight)
		listAnsDataId = $(this).attr("data-answer-id");
		$(this).find(".circle").addClass("selected");


		if (listDataId == listAnsDataId) {
			$(this).append(correctImg)
			$(this).addClass("disabled");
			$(this).addClass("prevent_event answered");
			$(".list1 .opt_" + listDataId + "").addClass("disabled prevent_event");
			setTimeout(function () {
				$(".circle").removeClass("selected");
			}, 500);
		} else {
			$(this).append(incorrectImg)
			$(this).addClass("prevent_event answered");
			$(".list1 .opt_" + listDataId + "").addClass("disabled prevent_event");
			setTimeout(function () {
				$(".list2 .circle").removeClass("selected");
				$(".circle").removeClass("selected");
			}, 500);
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

	$(".showAnswerCrossMark").hide();
	$(".showAnswerTickMark").hide();
	$(".line_panel2").empty();
	$(".listContainer").find(".showAns ").remove();
	$(".listContainer ").removeClass("prevent_event disabled");
	state.attemptsNum = 0;
	state.checkBtn = true;
	$(".replay_text").text("Check");
	$(".button-82-front").css("background", "#27ae60");
	$(".button-82-edge").css("background", "linear-gradient(to left, rgb(2 55 30) 0%, rgb(6 134 27) 8%, rgb(41 110 14) 92%, rgb(5 60 26) 100%)");
	$(`.step`).css("background", "white");
	$(".replay_btn").addClass("prevent_event");
	$(".replay_btn").show();
	$(".showAnsBtn").hide();
	$(".steps").show();

	$(".list1 .listContainer, .list2 .listContainer").removeClass("disabled");
	$(".line").hide();
	$(".circle").removeClass("selected");
	$(".showAnsBtn").removeClass("disabled");
	$("#myCarousel").carousel(0);
	stopAudio();
	fnTemplate3_v1($("div.active"));
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
		$(".list2 .question_wrapper").each(function (j, subitem) {
			listDataAnsId = $(subitem).attr("data-answer-id");
			if (listDataId === listDataAnsId) {
				console.log(item, listDataId, listDataAnsId);
				let that2 = $(subitem).find(".circle");
				getQuestionCordinates(that2)
				addLine(event, getOptionCordinates(that), getQuestionCordinates(that2), state.linesTop, state.pointHeight)
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