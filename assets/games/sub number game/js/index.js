"use strict";
$(".pageContent, .resourseContainer, .helpContainer").css(
  "height",
  (960 * 74) / 100 + 15 + "px"
);
$(".pageBg").css("height", (960 * 74) / 100 + "px");
$(".header, .footer").css("height", (960 * 13) / 100 + "px");

var pageWidth, pageHeight;

var basePage = {
  width: 1280,
  height: 960,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
};
const appState = {
  cover: gsap.timeline(),
  answers: gsap.timeline(),
  reload: false,
  showAns: false,
  started: false,
    correctAudio: new Audio("assets/audio/correct.mp3"),
  inCorrectAudio: new Audio("assets/audio/incorrect.mp3"),
};
$(function () {
  var $page = $(".page_content");

  getPageSize();
  scalePages($page, pageWidth, pageHeight);

  $(window).resize(
    _.debounce(function () {
      getPageSize();
      scalePages($page, pageWidth, pageHeight);
    }, 150)
  );

  function getPageSize() {
    pageHeight = $("#container").height();
    pageWidth = $("#container").width();
  }

  function scalePages(page, maxWidth, maxHeight) {
    var scaleX = 1,
      scaleY = 1;
    scaleX = maxWidth / basePage.width;
    scaleY = maxHeight / basePage.height;
    basePage.scaleX = scaleX;
    basePage.scaleY = scaleY;
    basePage.scale = scaleX > scaleY ? scaleY : scaleX;

    var newLeftPos = Math.abs(
      Math.floor((basePage.width * basePage.scale - maxWidth) / 2)
    );
    var newTopPos = 0;
    page.attr(
      "style",
      "-webkit-transform:scale(" +
        basePage.scale +
        ");left:" +
        newLeftPos +
        "px;top:" +
        newTopPos +
        "px;"
    );
  }

  $(".backBtn").on("click", fnBack);
  $(".nextBtn").on("click", fnNext);
  $(".reloadBtnAll").on("click", fnReloadAll);
  $(".reloadBtnScreen").on("click", fnReloadScreen);
  $(".showAnsBtn").on("click", showAns);

  $(".helpBtn").on("click", function () {
    if (lastAudio == 1) {
      $audio1[0].pause();
    }
    if (lastAudio == 2) {
      $audio2[0].pause();
    }

    $(".helpPopup").show();
  });

  $(".resourseBtn").on("click", function () {
    if (lastAudio == 1) {
      $audio1[0].pause();
    }
    if (lastAudio == 2) {
      $audio2[0].pause();
    }
    $(".resoursePopup").show();
  });

  $(".resoursePopup .closeBtn").on("click", function () {
    if (lastAudio == 1 && !isMusic1Playing) {
      $audio1[0].play();
    }
    if (lastAudio == 2) {
      $audio2[0].play();
    }
    $(".resoursePopup").hide();
  });

  $(".helpPopup .closeBtn").on("click", function () {
    if (lastAudio == 1 && !isMusic1Playing) {
      $audio1[0].play();
    }
    if (lastAudio == 2) {
      $audio2[0].play();
    }
    $(".helpPopup").hide();
  });

  function fnNext() {
    if ($(".nextBtn").hasClass("disabled")) {
      return false;
    }
    $("#myCarousel").carousel("next");
    stopAudio();
  }

  function fnBack() {
    if ($(".backBtn").hasClass("disabled")) {
      return false;
    }
    $("#myCarousel").carousel("prev");
    stopAudio();
  }
  $("body")
    .attr("unselectable", "on")
    .css("user-select", "none")
    .on("selectstart dragstart", false);
});

function addElement(numberofElements) {
  let element = document.createElement("div");
  let duck = document.createElement("img");
  let tail = document.createElement("img");
  let hand = document.querySelector(".hand");
  let backLeg = document.createElement("img");
  let frontLeg = document.createElement("img");
  let hair = document.createElement("img");

  element.classList.add("element", "dom");
  duck.setAttribute("src", "assets/images/p21-ex7a/body.png");
  duck.classList.add("body");
  tail.setAttribute("src", "assets/images/p21-ex7a/tail.png");
  tail.classList.add("tail");
  hair.setAttribute("src", "assets/images/p21-ex7a/hair.png");
  hair.classList.add("hair");

  backLeg.setAttribute("src", "assets/images/p21-ex7a/backLeg.png");
  backLeg.classList.add("backLeg");
  frontLeg.setAttribute("src", "assets/images/p21-ex7a/frontLeg.png");
  frontLeg.classList.add("frontLeg");

  element.appendChild(duck);
  element.appendChild(hair);
  element.appendChild(tail);
  element.appendChild(frontLeg);
  element.appendChild(backLeg);
  $(".item.active .tail").css("animation-name", "movingDuck");
  $(".item.active .hand").css("animation", "movinghand 2s infinite");
  $(".item.active .backLeg").css("animation", "movingBackLeg 2s  infinite");
  $(".item.active .frontLeg").css("animation", "movingFrontLeg 2s 1s infinite");
  $(".item.active .hair").css("animation", "movingHair 2s infinite");
  $audio2[0].setAttribute("src", "assets/audio/g1.mp3");
  $audio2[0].play();
  document.getElementById("Main").appendChild(element);
  numberOfCurrentElements = document.querySelectorAll(
    ".item.active .element"
  ).length;

  if (numberOfCurrentElements === numberofElements) {
    document.querySelector(".circleCustomBtn").classList.add("disabled");
    document.querySelector(".showAnsBtn").classList.add("disabled");
    $(".second .option").removeClass("disabled");
    let faddingOut = setInterval(function () {
      if (!hand.style.opacity) {
        hand.style.opacity = 1;
      }
      if (hand.style.opacity > 0) {
        hand.style.opacity -= 0.1;
      } else {
        clearInterval(faddingOut);
      }
    }, 200);
  }
}
