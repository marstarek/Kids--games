$(document).ready(function () {

    window.addEventListener('resize', fixResourceWidth);

    // to show or hide Resource Btn just set new key and value to the map "ResMap" 
    // by setting data-resBtn="show" data-id='4' 
    // where 4 is screen number and "show" is Resource Btn state (show or hide)
    // then add your content.
    const ResMap = new Map();
    $(".item").each(function () {
        var screenNum = Number($(this).attr('data-id'));
        var resBtnState = $(this).attr('data-resBtn');
        ResMap.set(screenNum, resBtnState);
    });

    // carousel pagination control       
    var totalItems = $('.item').length; // screens Length
    var currentIndex = $('div.active').index() + 1; // screen index
    $('.num').html('' + currentIndex + '/' + totalItems + '');
    currentIndex == totalItems ? $("#next_screen").addClass("prevent_click") : '';  // only one screen
    currentIndex == 1 ? $("#prev_screen").addClass("prevent_click") : ''; // only one screen

    showHideRes(currentIndex);
    canPlayAudio();

    // tooltip
    $('[data-bs-toggle="tooltip"]').tooltip();

    const carousel = new bootstrap.Carousel(document.querySelector('#myCarousel'), {});

    // handle carousel when fired slide
    $('#myCarousel').on('slide.bs.carousel', function () {
        $("#prev_screen, #next_screen").addClass("prevent_click");
        // $(".check_btn").parent().addClass("prevent_click");
        stopSound(true);


    })

    // checking each screen when end slide
    $('#myCarousel').on('slid.bs.carousel', function () {
        currentIndex = $('div.active').index() + 1;
        $("#prev_screen, #next_screen").removeClass("prevent_click");
        if (currentIndex == totalItems) {
            $("#next_screen").addClass("prevent_click");
        }
        if (currentIndex == 1) {
            $("#prev_screen").addClass("prevent_click");
        }
        $('.num').html('' + currentIndex + '/' + totalItems + '');
        showHideRes(currentIndex);
        canPlayAudio();

    });

    // adding animation and audio on next click
    $('.carousel-control-next').on('click', function () {
        addAnimation($(this), "RightAnimation");
    });

    // adding animation and audio on prev click
    $('.carousel-control-prev').on('click', function () {
        addAnimation($(this), "LeftAnimation");
    });

    // set width of resource Modal
    $('.modal').on('show.bs.modal', () => {
        stopSound();
        fixResourceWidth();
        canPlayModalResource();
        if ($("#modal_" + currentIndex).find(".infoRes_btn").hasClass("d-none")
            && $("#modal_" + currentIndex).find(".audioRes_btn").hasClass("d-none")) {
            $("#modal_" + currentIndex).find(".modal-footer").addClass("d-none");
        } else {
            $("#modal_" + currentIndex).find(".modal-footer").removeClass("d-none");
        }
    });

    // stop Sound when modal close      
    $('.modal').on('hidden.bs.modal', () => {
        stopSound();
    });

    // stop Video when modal close     
    $('.modalVideo').on('hidden.bs.modal', () => {
        closeVideo();
    });

    // reload function     
    $('.reload_btn').on('click', function () {
        $("#myCarousel").carousel(0);
        $("#next_screen").removeClass("prevent_click");
        $("#prev_screen").addClass("prevent_click");
        $('.resource_btn').attr("data-bs-target", `#modal_1`);
        addAnimation($(this), "floatAnimation");
        stopSound(true);
        reloadScreen();
    });

    // check function   
    $('.check_btn').on('click', function () {
        playSound('./assets/audio/correct-answer.wav');
        addAnimation($(this), "floatAnimation");
        checkAns();
    });

    // setting width and height
    function fixResourceWidth() {
        $(".fixWidthAndHeight").css({
            "max-width": $("#EX_layout").width() + 'px',
            "width": $("#EX_layout").width() + 'px',
            "margin": "auto"
        }).find(".modal-content").css({
            "height": $("#EX_layout").height() + 'px'
        });
    }

    // Is Audio player exist?
    function canPlayAudio() {
        if ($('div.active').data("src") == '') {
            $(".holder").addClass("invisible");
        } else {
            $(".holder").removeClass("invisible");
            $(".audio-player audio").attr("src", $('div.active').data("src"));
        }
    }

    // Is (Audio, Video) Modal exist?
    function canPlayModalResource() {
        const dataSrc = [{ data: "video", btn_name: "infoRes_btn" }, { data: "audio", btn_name: "audioRes_btn" }];
        dataSrc.forEach((element) => {
            if ($("#modal_" + currentIndex).find(".modal-footer").data(element.data) == '') {
                $("#modal_" + currentIndex).find("." + element.btn_name).addClass("d-none");
            } else {
                $("#modal_" + currentIndex).find("." + element.btn_name).removeClass("d-none");
                element.btn_name == 'audioRes_btn' ? $("#modal_" + currentIndex).find("." + element.btn_name).removeClass("d-none") :
                    $(".modalVideo video").attr("src", $("#modal_" + currentIndex).find(".modal-footer").data(element.data));
            }
        });
    }

    // audio for each resource modal
    $('.audioRes_btn').on('click', function () {
        let audio_src = $("#modal_" + currentIndex).find(".modal-footer").data("audio");
        playSound(audio_src);
    });


    // function to show or hide resource btn dep on screenNum state in ResMap array and currentIndex of screen
    function showHideRes(screenNum) {
        if (ResMap.get(screenNum) == "show") {
            $('.resource_btn_wrapper').addClass('show').removeClass('prevent_click');;
            $('.resource_btn').attr("data-bs-target", `#modal_${currentIndex}`);
        } else {
            $('.resource_btn_wrapper').addClass('prevent_click').removeClass('show');
        }
    }
});


// stop video player function
function closeVideo() {
    $("video").each(function () {
        $(this).get(0).pause();
    });
}

// add Animation function    
function addAnimation(element, animation_name = "floatAnimation") {
    $(element).addClass(animation_name);
    setTimeout(() => {
        $(element).removeClass(animation_name);
    }, 300);
}

// playSound function
function playSound(url) {
    stopSound();
    $('audio').each(function () {
        if (!$(this).parent().hasClass('audio-player')) $(this).remove();
    });
    var ourAudio = document.createElement('audio');
    ourAudio.style.display = "none";
    ourAudio.src = url;
    ourAudio.autoplay = true;
    ourAudio.onended = function () {
        this.remove();
    };
    document.body.appendChild(ourAudio);
}

// stop any Sound function    
function stopSound(resetSlider) {
    $('audio').each(function () {
        this.pause(); // Stop playing
        $(this).parent().find(".toggle-play").removeClass('pause').addClass('play');
        if(resetSlider) {
            this.currentTime = 0;
        }
    });
}

// append modal media btn.
$(".modal-header").append(`<button type="button" class="btn-close text-white d-flex align-items-center justify-content-center" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button>`);
$(".modal-footer").append(`<div class="audioRes_btn_wrapper wow fadeInLeft" data-duration>
                            <button class="footer_btn float audioRes_btn" data-toggle="tooltip" title="audioRes" role="button">
                             <i class="bi bi-headphones"></i>
                            </button>
                           </div>
                           <div class="infoRes_btn_wrapper wow fadeInRight" data-duration>
                            <button class="footer_btn float infoRes_btn" data-toggle="tooltip" title="infoRes" role="button" data-bs-target="#Video_modal" data-bs-toggle="modal">
                                <i class="bi bi-play-circle"></i>
                            </button>
                           </div>`);