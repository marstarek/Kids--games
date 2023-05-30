/* hold elements */
const showAnsBtn = $("#show-ans");
const reload = $("#reload");
const joystick = $("#joystick");
const joystickHand = $("#joystick-hand");

const window$left = $("#left-window");
const window$right = $("#right-window");

const choice$1 = $("#choice-1");
const choice$2 = $("#choice-2");
const choice$3 = $("#choice-3");

const question$1 = $("#first_num");
const question$2 = $("#sec_num");
const question$3 = $("#res");

const imagesBar = $("#images-bar");
const negImagesBar = $("#neg-images-bar");
const numbersBar = $("#numbers-bar");

const ballElementHtml =
  '<div class="grid-item firstImg ball"><img src="./assets/images/p224_ex1/beach-ball.png" alt="" /></div>';
var correctImg =
  '<div class="showAnswerTickMark showAns"><img src="assets/images/tikMark.png" /></div>';
var incorrectImg = '<div class="showAnswerCrossMark showAns"></div>';

const joystickHandCX = joystickHand.attr("cy");
const initialState = {
  eqution$term1: 0,
  eqution$term2: 0,
  eqution$sum: 0,

  answer$1: 0,
  answer$2: 0,
  answer$3: 0,
};

/* global state */
let state = {
  eqution$term1: 0,
  eqution$term2: 0,
  eqution$sum: 0,
  answer$1: 0,
  answer$2: 0,
  answer$3: 0,
};
gsap.globalTimeline.timeScale(0.7);

/**
 * It generates a random number,
 * then generates three random answers,
 * one of which is the correct answer.
 * the second two numbers, and the sum of the first two numbers.
 * @returns {object} {num1, num2, res, ans1, ans2, ans3}
 */
const generateRandom = () => {
  let res, num1, num2, ans1, ans2, ans3, dummy1, dummy2;

  do {
    num1 = _.random(10);
    num2 = _.random(10);
    res = num1 - num2;
  } while (res > 10 || num2 > num1 || num1 + num2 < 1);

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

  /* set the global state to the generated values */
  state.eqution$term1 = num1;
  state.eqution$term2 = num2;
  state.eqution$sum = res;

  state.answer$1 = ans1;
  state.answer$2 = ans2;
  state.answer$3 = ans3;

  question$1.find(".number").text(num1);
  question$2.find(".number").text(num2);
  // question$3.text(res);
  question$3.find(".number").text("?");
  choice$1.text(ans1);
  choice$2.text(ans2);
  choice$3.text(ans3);

  return { num1, num2, res, ans1, ans2, ans3 };
};

const joystickHandler = () => {
  $(".hand").addClass("start");

  $(".answersContainer").fadeIn();
  $(this).addClass("prevent_pointer");
  // resetAnsEvents();
  // resObj = generateRandom();
  // handleClicks(resObj);
  $(".pointer").css("visibility", "hidden");
  $(".showAnsBtn ").removeClass("disabledBtn");

  $(".cover").addClass("open");
  $(".joystick_wrapper").addClass("prevent_pointer");

  console.log("joystick handler start");

  const { num1, num2, res, ans1, ans2, ans3 } = generateRandom();

  [showAnsBtn, reload].forEach((item) => {
    item.removeClass("disabled");
  });
  [choice$1, choice$2, choice$3].forEach((item) => {
    item
      .removeClass("disabled")
      .removeClass("btn-success")
      .removeClass("shadow-lg")
      .removeClass("border")
      .addClass("btn-warning");
  });
  // 	ballsInWindow(window$left, num1);
  // 	ballsInWindow(window$right, num2);
};

const reloadHandler = () => {
  $(".joystick_wrapper").removeClass("prevent_pointer");
  state = { ...initialState };
  ballsOutWindow(window$left);
  ballsOutWindow(window$right);
  $(".item").addClass(" reload ");
  resetNumbersBar();
  showAnsBtn.addClass("disabled");
  reload.removeClass("disabled");
  joystick.removeClass("disabled");
  $(".cover").removeClass("open");
  $(".option").each(function () {
    $(this).find(".booleanImage").css("filter", " unset");
    $(this).find(".booleanImage").removeClass("prevent_click");
    $(" .showAnswerTickMark").remove();
    $(" .showAnswerCrossMark").remove();
  });

  // $("#neg-images-bar ,#images-bar ,").empty();
  // reInitImageBar();
};

const showAnsBtnHandler = () => {
  console.log("show answer clicked");
  question$3.find(".number").text(state.eqution$sum);

  // if empty -> do nothing
  if (!state.eqution$term1 && !state.eqution$term2) return;
  // $(".option").each(choiceHandler);
  answerScene();
};
const choiceHandler = function (e) {

  console.log("choice handler start");

  const currentNumber = +$(this).text();
  // true
  if (currentNumber === state.eqution$sum) {






    appState.correctAudio.play();
    $(this).parent().addClass("correct").append(correctImg);
    $(this).css("filter", " hue-rotate(253deg)");
    $(this).addClass("prevent_click");
    answerScene();
    question$3.find(".number").text(state.eqution$sum);
    // false
  } else {
   appState.inCorrectAudio.play();
    $(this).parent().addClass("incorrect");
    $(this).append(incorrectImg);
    setTimeout(function () {
      $(this).find(".booleanImage").find(".showAnswerCrossMark").fadeOut();
      $(this).find(".booleanImage").find(".showAnswerCrossMark").remove();
    }, 500);

    console.log("incorrect");
  }
};
/* Event handlers add */
reload.on("click", reloadHandler);
showAnsBtn.on("click", showAnsBtnHandler);
joystick.on("click", joystickHandler);

choice$1.on("click", choiceHandler);
choice$2.on("click", choiceHandler);
choice$3.on("click", choiceHandler);

/*--- --- --- animation functions --- --- ---*/
function ballsInWindow(selector, count) {
    if ($(".reload").length>0) {
      console.log("ballsOutWindow is here");

  return false;
}


  console.log("state is ", state);
  selector.empty();
  _.range(count).forEach(() => {
    selector.append(ballElementHtml);
  });
  return gsap.from(selector.find(".ball"), {
    y: "-500px",
    stagger: 0.2,
    ease: Bounce.easeOut,
    onStart: () => showAnsBtn.addClass("disabled"),
  });
}

function ballsOutWindow(selector) {
  if ($(".reload").length>0) {
      console.log("ballsOutWindow is here");

  return false;
}
  return gsap.to(selector.find(".ball"), {
    y: "+500px",
    stagger: -0.1,
    onComplete: () => {
      selector.empty();
    },
  });
}

function colorNumbersBar(start, end) {
    if ($(".reload").length>0) {
      console.log("ballsOutWindow is here");

  return false;
}
  console.log("POSITIVE NUMBERS");
  const numbersSelector = numbersBar.children().slice(start, end);
  const imagesSelector = imagesBar.children().slice(start, end);

  imagesSelector.each(function () {
    $(this).html(ballElementHtml);
  });
  
  // .css({ background: "rgb(0, 166, 81)" });
  gsap.fromTo(
    imagesSelector,
    {
      y: "-500px",
    },
    { y: 0, stagger: 0.2, ease: Bounce.easeOut }
  );

  return gsap.to(
    numbersSelector,

    {
      y: 0,
      background: "#ff7905",
      stagger: 0.2,
      ease: Bounce.easeOut,
    }
  );
}

function vanishNumbersBar(start, end) {
  console.log("NEGATIVE NUMBERS");
  const numbersSelector = numbersBar.children().slice(start, end);
  const imagesSelector = imagesBar.children().slice(start, end);
  const negImagesSelector = negImagesBar.children().slice(start, end);
  imagesSelector.each(function () {
    $(this).html(ballElementHtml);
  });

  gsap.fromTo(
    negImagesSelector,
    {
      opacity: 1,
    },
    { opacity: 0, stagger: -0.2, ease: Bounce.easeOut }
  );
  gsap.fromTo(
    numbersSelector,
    {
      background: "#ff7905",
    },
    { background: "rgb(0, 166, 81)", stagger: -0.2, ease: Bounce.easeOut },
    "<"
  );
  return gsap.fromTo(
    imagesSelector,
    {
      opacity: 1,
    },
    {
      opacity: 0,
      stagger: -0.2,
      ease: Bounce.easeOut,
      onComplete: () => {
        imagesSelector.each(function () {
          $(this).empty();
        });
        negImagesSelector.each(function () {
          $(this).empty();
        });
      },
    },
    "<"
  );
}
function colorNegNumbersBar(start, end) {
    if ($(".reload").length>0) {
      console.log("ballsOutWindow is here");

  return false;
}
  console.log("NEGATIVE NUMBERS");

  const imagesSelector = negImagesBar.children().slice(start, end);
  imagesSelector.each(function () {
    $(this).html(ballElementHtml);
  });
  // .css({ background: "rgb(0, 166, 81)" });

  return gsap.fromTo(
    imagesSelector,
    {
      y: "-500px",
    },
    { y: 0, stagger: -0.2, ease: Bounce.easeOut }
  );
}

function resetNumbersBar() {
  const numbersSelector = numbersBar.children();
  // .css({ background: "rgb(0, 166, 81)" });
  return gsap.to(numbersSelector, {
    background: "rgb(0, 166, 81)",
    stagger: -0.05,
    ease: Bounce.easeOut,
    onStart: () => resetImagesBar(),
    onComplete: () => {
      numbersSelector.css({ background: "rgb(0, 166, 81)" });
    },
  });
}
function resetImagesBar() {
  const imagesSelector = imagesBar.children();
  const negImagesSelector = negImagesBar.children();
  return gsap.to(imagesSelector, {
    y: "-500px",
    stagger: -0.05,
    ease: Bounce.easeOut,
    onStart: () => {
      gsap.to(negImagesSelector, {
        y: "-500px",
        stagger: -0.05,
        ease: Bounce.easeOut,
      });
    },
    onComplete: () => {
      imagesSelector.each(function () {
        $(this).empty();
      });
      reInitImageBar();
    },
  });
}
function joystickHandScene() {
  // joystickHandler();
  gsap.to(joystickHand, {
    duration: 1,
    attr: {
      cy: 21.763,
    },
    ease: "power4.in",
    onComplete: joystickHandler,
  });
  gsap.to(joystickHand, {
    delay: 1,
    duration: 0.66,
    attr: {
      cy: joystickHandCX,
    },
  });
}
function answerScene() {
  
  [joystick].forEach((item) => {
    item.addClass("disabled");
  });
  [choice$1, choice$2, choice$3].forEach((item) => {
    if (state.eqution$sum === +item.text()) {
      console.log("true");
      item.addClass("correct")
        item.parent().addClass("correct").append(correctImg);
        appState.correctAudio.play();
    item.css("filter", " hue-rotate(253deg)");
    item.addClass("prevent_click");
    } else {
      item.addClass("disabled");
      console.log("false");
      item.addClass("incorrect")
    }
  });
  // 1- left window
  const leftTween = ballsInWindow(window$left, state.eqution$term1);
  // 2- right window
  leftTween
    .then(() => ballsInWindow(window$right, state.eqution$term2))
    // 3- left color bar
    .then(() => ballsOutWindow(window$left))
    .then(() => colorNumbersBar(0, state.eqution$term1))
    // 4- right color bar
    .then(() => ballsOutWindow(window$right))
    .then(() => colorNegNumbersBar(state.eqution$sum, state.eqution$term1))
    .then(() => vanishNumbersBar(state.eqution$sum, state.eqution$term1))
    .then(() => {
      reload.removeClass("disabled");
    });
}

function reInitImageBar() {
  imagesBar.empty();
  negImagesBar.empty();
  _.range(10).forEach(() => imagesBar.append("<div>"));
  _.range(10).forEach(() => negImagesBar.append("<div>"));
}
