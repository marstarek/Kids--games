// NOTE  this is app state 
const state = {
     optionLeft: null,
     questionLeft: null,
     linesLeft: $(".lines")[0].offsetLeft,
     pointHeight: $(".circle").height(),
     attemptsNum: 0,
     checkBtn: true


}
// NOTE a function to  get first point  (Option) Cordinates 

const getOptionCordinates = (option) => {
     state.optionLeft = $(option)[0].offsetLeft;
     return state.optionLeft
}
// NOTE a function to  get sec point  (Option) Cordinates 
const getQuestionCordinates = (question) => {
     state.questionLeft = $(question)[0].offsetLeft;
     return state.questionLeft
}
// NOTE this is the  main  function to add lines to svg  with the Cordinates whitch is given by getQuestionCordinates and getOptionCordinates function
function addLine(e, w1, w2, linesLeft, pointHeight) {
     let x1 = (w1 - linesLeft) + (pointHeight / 2)
     let x2 = (w2 - linesLeft) + (pointHeight / 2)
     let line_panel = $(".line_panel2");
     if ($(".clicked")) {
          var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttributeNS(null, "y1", 0);
          line.setAttributeNS(null, "x1", `${x1}`);
          line.setAttributeNS(null, "y2", `100%`);
          line.setAttributeNS(null, "x2", `${x2}`);
          line.classList.add("line")
          $(line_panel)[0].appendChild(line);
     }
     $(".clicked").removeClass('clicked');
}

// function checkIfAllCorrect() {
//      if ($(".correct_Tick").length == 3) {
//           $(".replay_btn").hide();
//           $(".steps").hide();
//           fnAudio($(".showAnswerTickMark"))
//           $(".showAnswerTickMark").show();
//      }
// }
// REVIEW tarek 
//  number of attempts func
function checkAnswered() {

     var questionLength = $(".question_wrapper").length;
     if ($(".answered").length == questionLength) {
          state.attemptsNum += 1
          $(`.step${state.attemptsNum}`).css("background", "#f0003c");
          $(".showAnsBtn").removeClass("prevent_event");
          $(".listContainer").removeClass("answered")
          checkIfAllCorrect()
     } if (state.attemptsNum >= 3) {
          $(".showAnsBtn").addClass("prevent_event");
          $(".replay_text").text("End")
          $(".button-82-front").css("background", "#0fa0c5");
          $(".button-82-edge").css("background", "linear-gradient(to left, rgb(15 160 197) 0%, rgb(2 75 94) 8%, rgb(40 151 178) 92%, rgb(33 73 83) 100%)");
       
      
     }
     else {
          console.log(false, $(".answered").length);
     }
}


