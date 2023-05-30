
const state = {
     optionTop: null,
     questionTop: null,
     linesTop: $(".lines")[0].offsetTop,
     pointHeight: $(".circle").height(),
     attemptsNum: 0,
     checkBtn: true


}

const getOptionCordinates = (option) => {
     state.optionTop = $(option)[0].offsetTop;
     return state.optionTop
}
const getQuestionCordinates = (question) => {
     state.questionTop = $(question)[0].offsetTop;

     return state.questionTop
}
function addLine(e, w1, w2, linesTop, pointHeight) {
     let y1 = (w1 - linesTop) + (pointHeight / 2)
     let y2 = (w2 - linesTop) + (pointHeight / 2)
     let line_panel = $(".line_panel2");
     if ($(".clicked")) {
          var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttributeNS(null, "x1", 0);
          line.setAttributeNS(null, "y1", `${y1}`);
          line.setAttributeNS(null, "x2", `100%`);
          line.setAttributeNS(null, "y2", `${y2}`);
          line.classList.add("line")
          $(line_panel)[0].appendChild(line);
     }
     $(".clicked").removeClass('clicked');

}

function checkIfAllCorrect() {
     if ($(".correct_Tick").length == 3) {
          $(".replay_btn").hide();
          $(".steps").hide();
          fnAudio($(".showAnswerTickMark"))
          $(".showAnswerTickMark").show();
     }
}
// number of attempts func
function checkAnswered() {

     var questionLength = $(".question_wrapper").length;
     if ($(".answered").length == questionLength) {
          state.attemptsNum += 1
          $(`.step${state.attemptsNum}`).css("background", "hsl(345deg 100% 47%)");
          $(".replay_btn").removeClass("prevent_event");
          $(".listContainer").removeClass("answered")
          checkIfAllCorrect()
     } if (state.attemptsNum >= 3) {
          $(".replay_btn").addClass("prevent_event");
          $(".replay_text").text("End")
          $(".button-82-front").css("background", "#0fa0c5");
          $(".button-82-edge").css("background", "linear-gradient(to left, rgb(15 160 197) 0%, rgb(2 75 94) 8%, rgb(40 151 178) 92%, rgb(33 73 83) 100%)");
          $(".showAnswerCrossMark").show()
          $(".showAnswerTickMark").show();
          setTimeout(() => {
               $(".showAnsBtn").show()

          }, 1000);
     }
     else {
          console.log(false, $(".answered").length);
     }
}

$(".replay_btn").on("click", function () {
     if (state.checkBtn == true) {
          state.checkBtn = false
          $(".replay_text").text("Replay");
          $(".button-82-front").css("background", "hsl(345deg 100% 47%)");
          $(".button-82-edge").css("background", " linear-gradient(to left, rgb(240 0 60) 0%, rgb(148 7 42) 8%, rgb(199 13 59) 92%, rgb(90 4 25) 100%) ");
          $(".showAnswerCrossMark").show()
          $(".showAnswerTickMark").show();
     } else {
          state.checkBtn = true
          $(".replay_text").text("Check");
          $(".button-82-front").css("background", "#27ae60");
          $(".button-82-edge").css("background", "linear-gradient(to left, rgb(2 55 30) 0%, rgb(6 134 27) 8%, rgb(41 110 14) 92%, rgb(5 60 26) 100%)");
          $(".showAnswerCrossMark").hide();
          $(".showAnswerTickMark").hide();
          $(this).addClass("prevent_event");
          $(".line_panel2").empty();
          $(".listContainer").find(".showAns ").remove();
          $(".listContainer ").removeClass("prevent_event disabled");
     }


})

