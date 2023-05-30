"use strict";
let resObj;
var correctImg =
  '<div class="showAnswerTickMark showAns"><img src="assets/images/tikMark.png" /></div>';

var incorrectImg = '<div class="showAnswerCrossMark showAns"></div>';
var reload = false;
/**
 * It generates a random number,
 * then generates three random answers,
 * one of which is the correct answer.
 * the second two numbers, and the sum of the first two numbers.
 * @returns {object} {num1, num2, res, ans1, ans2, ans3}
 */
const generateRandom = () => {
  let res;
  let num1;
  let num2;
  let ans1;
  let ans2;
  let ans3;
  let dummy1;
  let dummy2;

  do {
    num1 = _.random(10);
    num2 = _.random(10);
    res = num1 + num2;
  } while (res > 10);

  do {
    dummy1 = _.random(10);
    dummy2 = _.random(10);
    [ans1, ans2, ans3] = _.shuffle([dummy1, dummy2, res]);
  } while (
    dummy1 === res ||
    dummy2 === res ||
    dummy1 === dummy2 ||
    dummy1 + dummy2 > 10
  );

  $("#first_num .number").text(num1);
  $("#sec_num .number").text(num2);

  return { num1, num2, res, ans1, ans2, ans3 };
};

function openCovers() {
  appState.cover
    .to("#first_num .cover", {
      duration: 0.7,
      ease: "power1.in",
      y: "-100%",
    })
    .to(
      "#sec_num .cover",
      {
        duration: 0.7,
        ease: "power1.inOut",
        y: "-100%",
      },
      "<0.4"
    );
  return appState.cover;
}

function closeCovers() {
  appState.cover
    .to("#first_num .cover", {
      duration: 0.7,
      ease: "power1.in",
      y: "0%",
    })
    .to("#sec_num .cover", {
      duration: 0.7,

      ease: "power1.in",
      y: "0%",
    })
    .to("#res .cover", {
      duration: 0.7,
      ease: "power1.in",
      y: "0%",
    });
  return appState.cover;
}

/**
 * This function:
 * - removes all click events from the answer buttons,
 * - empties the first and second numbers wrappers,
 * - empties the answer wrapper,
 * - and resets the number in the result container.\
 * If the reload parameter is not passed, it will open the covers.
 *
 * @param reload - boolean, if true, the function will not open the covers
 */
function resetAnsEvents(reload = false) {
  $("#ans1, #ans2, #ans3").off("click");
  $(".option").each(function () {
    $(this).find(".booleanImage").css("filter", " unset");
    $(" .showAnswerTickMark").remove();
    $(" .showAnswerCrossMark").remove();
  });
  $("#first_container, #sec_container, .answers_wrapper").empty();
  $("#res .number").text("?");
  $(".showAnsBtn").removeClass("answered");
  $(".joystick_btn").one("click", joystickHandler);
  if (!reload) {
    openCovers();
  } else {
    // appState.answers.reverse();
    // appState.cover.reverse();
    closeCovers();
  }
}

// var answers = gsap.timeline();
/**
 * It takes in two numbers, num1 and num2,
 * and then creates a div for each number and appends it to the DOM.
 *
 * The function then animates the images' divs of the answer quantities.
 *
 * The function also animates the background of the bottom bar numbers to change colors depending on the result.
 * @param num1 - the first number in the equation
 * @param num2 - the number of images to be displayed on the right side
 * @param res - the result of the addition
 */
const animateAns = (num1, num2, res) => {
  // console.log("animate ans here");
  // console.log(num1, num2, res);

  const easeName = "slow";
  appState.answers
    .to("#res .cover", {
      duration: 0.7,
      ease: "power1.inOut",
      y: "-100%",
      // onStart: () =>
      //  console.log("animate ans started")
      //  ,
    })
    .from(".grid-item.firstImg , .grid-item.secImg", {
      duration: 0.5,
      y: "-500px",
      x: "-10px",

      ease: easeName,
      stagger: 0.25,
      opacity: 1,
    })

    .to(".grid-item.firstImg", {
      duration: 1,
      y: "+500px",
      ease: easeName,
      delay: 0.7,
      stagger: -0.25,
      opacity: 1,
    });

  appState.answers.to(".grid-item.secImg", {
    duration: 1,
    y: "+500px",
    ease: easeName,
    delay: 0.7,
    stagger: -0.25,
    onComplete: colorLineNum1(num1, res),
  });

  colorLineNum2(num2, res);
};

const colorLineNum1 = (num1, res) => {
  _.range(num1).forEach(() => {
    const leftImg = $(
      `<div class="grid-item firstImg"><img src="./assets/images/p224_ex1/imgAsset 1.png" alt="" /></div>`
    );
    $(".answers_wrapper").append(leftImg);
  });

  appState.answers.from(".answers_wrapper .firstImg", {
    duration: 0.3,
    y: "-300px",
    ease: "circ",
    stagger: 0.25,
    opacity: 1,
  });
  appState.answers.to(
    ".const_wrapper .const_num[data-ans='num1']",
    {
      duration: 0.3,
      delay: 0.1,
      ease: "circ",
      stagger: 0.25,
      background: (idx, target) => {
        if (idx < num1 && reload == false) {
          console.log(reload);
          return " #ff7905";
        }
      },
    },
    "<"
  );
};

const colorLineNum2 = (num2, res) => {
  _.range(num2).forEach(() => {
    const rightImg = $(
      `<div class="grid-item secImg"><img src="./assets/images/p224_ex1/imgAsset 2.png" alt="" /></div>`
    );
    $(".answers_wrapper").append(rightImg);
  });

  appState.answers.from(".answers_wrapper .secImg", {
    duration: 0.3,
    y: "-300px",
    ease: "circ",
    stagger: 0.25,
    opacity: 1,
  });
  appState.answers.to(
    ".const_wrapper .const_num[data-ans='num2']",
    {
      duration: 0.3,
      delay: 0.1,
      ease: "circ",
      stagger: 0.25,
      background: (idx, target) => {
        if (idx < num2 && reload == false) {
          console.log(reload);
          return "#ff7905";
        }
      },
      onComplete: () =>
        $(".reloadBtnAll").removeClass(["disabledBtn", "prevent_pointer"]),
    },
    "<"
  );
};

/**
 * It takes two numbers as arguments, and two from the "binded" object\
 * and then appends the first number of images to the left container,\
 * the second number of images to the right container,\
 * and then animates all images to the bottom bar container.
 *
 * @param this.num1 - num1 from the object scope "binded to it"
 * @param this.num2 - num2 from the object scope "binded to it"
 * @param ans - the answer the user clicked on
 * @param res - the correct answer
 */

function ansClickHandler(ans, res, showAns = false) {
  if (ans !== res) {
    appState.inCorrectAudio.play();
    return;
  }
 appState.correctAudio.play();

  _.range(this.num1).forEach(() => {
    const leftImg = $(`<div class="grid-item firstImg">
      <img
        src="./assets/images/p224_ex1/imgAsset 1.png "
        alt=""
      />
    </div>`);
    $("#first_container").append(leftImg);
  });
  _.range(this.num2).forEach(() => {
    const rightImg = $(
      `<div class="grid-item secImg"> <img src="./assets/images/p224_ex1/imgAsset 2.png "alt=""></div>`
    );
    $("#sec_container").append(rightImg);
  });

  // show the answers
  $("#res .number").text(res);
  // stop choosing answers listeners
  $("#ans1, #ans2, #ans3").off("click");
  // add answers attributes to access them through animations
  $(".const_wrapper .const_num").attr("data-ans", null);
  $(".const_wrapper .const_num").slice(0, this.num1).attr("data-ans", "num1");
  $(".const_wrapper .const_num").slice(this.num1, res).attr("data-ans", "num2");
  // $(".reloadBtnAll").addClass(["disabledBtn", "prevent_pointer"]);
  $(".showAnsBtn").addClass("answered");
  $(".answersContainer .option").each(function () {
    if (res !== +$(this).children().text()) {
      $(this).addClass("disabled");
    }else{
      $(this).children().css("filter", " hue-rotate(253deg)")
       $(this).append(correctImg)
    }
  });
  animateAns(this.num1, this.num2, res);
}

function joystickHandler(e) {
  $(".hand").addClass("start");
  reload = false; //??
  console.log(reload);
  // console.log(e);
  $(".answersContainer").fadeIn();
  $(this).addClass("prevent_pointer");
  resetAnsEvents();
  resObj = generateRandom();
  handleClicks(resObj);
  $(".pointer").css("visibility", "hidden");
  $(".showAnsBtn ").removeClass(["disabledBtn", "prevent_pointer"]);
  $(".reloadBtnAll").removeClass(["disabledBtn", "prevent_pointer"]);
}

function handleClicks(resultObj) {
  const { num1, num2, res, ans1, ans2, ans3 } = resultObj;
  const answerClick = ansClickHandler.bind(resultObj);
  // generate new event every time and stops the old function
  $(".showAnsBtn")
    .off("click")
    .click(function () {
      if (!$(this).hasClass("answered")) {
        answerClick(res, res, true);
        $(this).addClass("answered disabledBtn");
      }
    });

  // handles the answers' clicks
  $("#ans1")
    .click(function () {
      answerClick(ans1, res);
      if ($(this).attr("data-answer") == "false") {
        $(this).addClass("incorrect");
        $(this).append(incorrectImg);
        setTimeout(function () {
          $(this).find(".booleanImage").find(".showAnswerCrossMark").fadeOut();
          $(this).find(".booleanImage").find(".showAnswerCrossMark").remove();
        }, 500);
      } else {
        $(this).addClass("correct").append(correctImg);
        // console.log($(this).find(".booleanImage"));
        $(this).find(".booleanImage").css("filter", " hue-rotate(253deg)");
      }
    })
    .attr("data-answer", ans1 === res)
    .children()
    .text(ans1);

  $("#ans2")
    .click(function () {
      answerClick(ans2, res);
      if ($(this).attr("data-answer") == "false") {
        $(this).addClass("incorrect");
        $(this).append(incorrectImg);
        setTimeout(function () {
          $(this).find(".booleanImage").find(".showAnswerCrossMark").fadeOut();
          $(this).find(".booleanImage").find(".showAnswerCrossMark").remove();
        }, 500);
      } else {
        $(this).addClass("correct").append(correctImg);
        $(this).find(".booleanImage").css("filter", " hue-rotate(253deg)");
      }
    })
    .attr("data-answer", ans2 === res)
    .children()
    .text(ans2);
  // *****************************************
  $("#ans3")
    .click(function () {
      answerClick(ans3, res);
      if ($(this).attr("data-answer") == "false") {
        // console.log($(this).attr("data-answer"));
        $(this).addClass("incorrect");

        $(this).append(incorrectImg);
        
        setTimeout(function () {
          $(this).find(".booleanImage").find(".showAnswerCrossMark").fadeOut();
          $(this).find(".booleanImage").find(".showAnswerCrossMark").remove();
        }, 500);
      } else {
        $(this).addClass("correct").append(correctImg);
        $(this).find(".booleanImage").css("filter", " hue-rotate(253deg)");
      }
    })
    .attr("data-answer", ans3 === res)

    .children()
    .text(ans3);
}
