"use strict";
var replay;
var correctImg =
  '<div class="showAnswerTickMark showAns"><img src="assets/images/tikMark.png" /></div>';
var reloadImg =
  '<div class="reloadImg"><img src="assets/images/p224_ex1/reload.gif" /></div>';
var incorrectImg =
  '<div class="showAnswerCrossMark showAns"><img src="assets/images/crossMark.png" /></div>';
var isMusic1Playing = false;
var isMusic2Playing = false;
var $audio1 = $("#audioPlayer1");
var $audio2 = $("#audioPlayer2");
var slider = document.getElementById("myRange");

var lastAudio = 0;
var nextScreen;

var totalItems = $(".item").length;
var currentIndex = $("div.active").index() + 1;
var currentItem = $(".active.item");

function fnTemplate1_v2(_div) {
  var slide = $(_div);
  $audio1[0].currentTime = 0;
  slider.value = 0;
  $audio1[0].pause();
  $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
  $("#pButton .playImg").show();
  $("#pButton .pauseImg").hide();
  setAudio($(slide).attr("data-audioSrc"));

  $(".joystick_btn").one("click", joystickHandler);
}

function fnReloadScreen() {
  clearTimeout(nextScreen);
  $(".item.active .showAnswerTickMark ").remove();
  stopAudio();
  fnTemplate1_v2($("div.active"));
}

function fnAudio(obj) {
  var titleAudioPath = $(obj).attr("data-audioSrc");
  $audio2[0].setAttribute("src", titleAudioPath);
  $audio2[0].load();
  var playPromise = $audio2[0].play();

  if (playPromise !== undefined) {
    playPromise
      .then(function (value) {
        $audio1[0].pause();
        $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
        $("#pButton .playImg").show();
        $("#pButton .pauseImg").hide();
      })
      .catch(function (error) {});
  }
}

function fnAudio1() {
  var titleAudioPath = "assets/audio/1.mp3";
  $audio2[0].setAttribute("src", titleAudioPath);
  $audio2[0].load();
  var playPromise = $audio2[0].play();

  if (playPromise !== undefined) {
    playPromise
      .then(function (value) {
        $audio1[0].pause();
        $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
        $("#pButton .playImg").show();
        $("#pButton .pauseImg").hide();
      })
      .catch(function (error) {});
  }
}

function fnAudio2() {
  var titleAudioPath = "assets/audio/2.mp3";
  $audio2[0].setAttribute("src", titleAudioPath);
  $audio2[0].load();
  var playPromise = $audio2[0].play();

  if (playPromise !== undefined) {
    playPromise
      .then(function (value) {
        $audio1[0].pause();
        $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
        $("#pButton .playImg").show();
        $("#pButton .pauseImg").hide();
      })
      .catch(function (error) {});
  }
}

function fnAudio3() {
  var titleAudioPath = "assets/audio/3.mp3";
  $audio2[0].setAttribute("src", titleAudioPath);
  $audio2[0].load();
  var playPromise = $audio2[0].play();

  if (playPromise !== undefined) {
    playPromise
      .then(function (value) {
        $audio1[0].pause();
        $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
        $("#pButton .playImg").show();
        $("#pButton .pauseImg").hide();
      })
      .catch(function (error) {});
  }
}

function showAns() {
  if ($(".showAnsBtn").hasClass("disabled")) {
    return false;
  }
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

function fnTitleAudioClick(obj) {
  if ($(obj).hasClass("hide")) {
    return false;
  }
  $audio1[0].pause();
  $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
  $("#pButton .playImg").show();
  $("#pButton .pauseImg").hide();
  var titleAudioPath = $(obj).attr("data-audioSrc");

  $audio2[0].setAttribute("src", titleAudioPath);
  $audio2[0].load();
  $audio2[0].play();
  isMusic1Playing = false;
  isMusic2Playing = true;
}

function fnUpdateTimer() {
  var progressValue = Math.round(
    ($audio1[0].currentTime / $audio1[0].duration) * 100
  );
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
    $(
      ".navigationControls, .nextBtn, .reloadBtnScreen, .backBtn, .pageNumber"
    ).addClass("hide");
  }

  if ($(".title").attr("data-audioSrc") == "") {
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
    slider.value = 0;
    $audio1[0].pause();
    $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
    $("#pButton .playImg").show();
    $("#pButton .pauseImg").hide();
  });

  $audio2[0].addEventListener("ended", function () {
    lastAudio = 0;
  });

  slider.addEventListener(
    "input",
    function () {
      $audio1[0].removeEventListener("timeupdate", fnUpdateTimer);
      var setTime = Math.round((slider.value * $audio1[0].duration) / 100);
      $audio1[0].currentTime = setTime;
    },
    false
  );

  slider.addEventListener(
    "change",
    function () {
      if (isMusic1Playing) {
        $audio1[0].play();
        $audio1[0].addEventListener("timeupdate", fnUpdateTimer);
      }
    },
    false
  );

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

    fnTemplate1_v2($("div.active"));
  });
  $(".pageNumber").html(currentIndex + " of " + totalItems);
}

function getOS() {
  var userSH = window.navigator.userSH,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    $(".option1").css({
      padding: "12px 7px 7px 7px",
    });
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    $(".option1").css({
      padding: "12px 7px 7px 7px",
    });
  }

  return os;
}

function fnReloadAll() {
  // $(".const_num").css("background","red");

  // clearTimeout(nextScreen);
  reload = true;
  // console.log(reload);
  resetAnsEvents(true);
  $(".showAnsBtn ").addClass("disabledBtn");
  $(".hand ").removeClass("prevent_pointer start");
  // console.log($(".equation ").find("cover"));
  $(".answersContainer").css("display", "none");
  // closeCovers();
  gsap.to(".const_wrapper .const_num", {
    background: "rgb(0 166 81)",
    onComplete: () => $(".const_num").attr("style", " "),
  });

  if (!$(".reloadImg").length) {
    $(".pageContent ").append(reloadImg);
    $(".reloadBtnAll ").addClass("disabledBtn");
  }

  clearTimeout(replay);
  replay = setTimeout(() => {
    $(".pageContent .reloadImg ").remove();
    $(".reloadBtnAll ").removeClass("disabledBtn");
  }, 2800);

  // $("#myCarousel").carousel(0);
  // stopAudio();
  // fnTemplate1_v2($("div.active"));
  $(".const_wrapper").empty().append(`
                          <div class="const_num">1</div>
                          <div class="const_num">2</div>
                          <div class="const_num">3</div>
                          <div class="const_num">4</div>
                          <div class="const_num">5</div>
                          <div class="const_num">6</div>
                          <div class="const_num">7</div>
                          <div class="const_num">8</div>
                          <div class="const_num">9</div>
                          <div class="const_num">10</div>
                        `)
$(".answersContainer").children().removeClass("disabled")

}

getOS();

function reInitImageBar() {
  imagesBar.empty();
  negImagesBar.empty();
  _.range(10).forEach(() => imagesBar.append("<div>"));
  _.range(10).forEach(() => negImagesBar.append("<div>"));
}
