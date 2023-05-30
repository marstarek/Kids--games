const audioPlayer = document.querySelector(".audio-player");
$(audioPlayer).append(`<div class="controls">
                            <div class="play-container">
                                <div class="toggle-play play">
                                </div>
                            </div>
                            <div class="time">
                                <div class="current">0:00</div>
                            </div>
                            <input type="range" min="0" max="100" value="0" class="slider" id="myRange" step="0.1">
                            <div class="time">
                                <div class="length"></div>
                            </div>
                        </div>`);


const audio = audioPlayer.querySelector('audio');
const timeline = audioPlayer.querySelector(".timeline");
const playBtn = audioPlayer.querySelector(".controls .toggle-play");
const progressBar = audioPlayer.querySelector(".slider");

audio.addEventListener(
    "loadeddata",
    () => {
        audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(audio.duration);
        audioPlayer.querySelector(".slider").value = 0;
    },
    false
);

audio.addEventListener(
    "ended",
    () => {
        playBtn.classList.remove("pause");
        playBtn.classList.add("play");
        audio.currentTime = 0;
    }
);

audio.addEventListener(
    "timeupdate",
    () => {
        progressBar.value = Math.round((audio.currentTime / audio.duration) * 100);
        audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
            audio.currentTime
        );
    }
);

progressBar.addEventListener("input", function () {
    var setTime = Math.round((progressBar.value * audio.duration) / 100);
    audio.currentTime = setTime;
}, false);

progressBar.addEventListener("change", function () {
    audio.addEventListener('timeupdate', () => {
        progressBar.value = Math.round((audio.currentTime / audio.duration) * 100);
        audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
            audio.currentTime
        );
    });
}, false);

playBtn.addEventListener(
    "click",
    () => {
        if (audio.paused) {
            playBtn.classList.remove("play");
            playBtn.classList.add("pause");
            audio.play();
        } else {
            playBtn.classList.remove("pause");
            playBtn.classList.add("play");
            audio.pause();
        }
    },
    false
);

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}