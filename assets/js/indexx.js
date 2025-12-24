const smallCards = document.querySelectorAll(".smallcard");

const bigImg = document.getElementById("big-img");
const bigTitle = document.getElementById("current-song");
const lyricsText = document.getElementById("lyrics-text");
const playBtn = document.getElementById("play-btn");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.querySelector(".progress");

let audio = new Audio();
let isPlaying = false;

// ----------------------------
// UPDATE BIG CARD (PROMENA PESME)
// ----------------------------
function updateBigCard(cardData) {
    // UI update
    bigImg.src = cardData.img;
    bigTitle.textContent = `Trenutno slusate: ${cardData.title}`;
    lyricsText.innerHTML = cardData.lyrics;

    // AUDIO RESET (NEMA AUTOPLAY)
    audio.pause();
    audio.src = cardData.audio;
    audio.load();
    audio.currentTime = 0;

    isPlaying = false;
    playBtn.value = "Pusti";
    progressBar.style.width = "0%";
}

// ----------------------------
// DOBIJANJE PODATAKA SA CARD-a
// ----------------------------
function getCardData(card) {
    return {
        img: card.querySelector("img").src,
        title: card.dataset.title || "Nepoznato",
        author: card.dataset.author || "Nepoznato",
        lyrics: card.dataset.lyrics || "Nema dodatih stihova.",
        audio: card.dataset.audio || ""
    };
}

// ----------------------------
// CLICK NA SMALL CARD
// ----------------------------
smallCards.forEach(card => {
    card.addEventListener("click", () => {
        const data = getCardData(card);
        updateBigCard(data);

        // ACTIVE UI
        smallCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
    });
});

// ----------------------------
// PLAY / PAUSE
// ----------------------------
playBtn.addEventListener("click", () => {
    if (!audio.src) return;

    if (isPlaying) {
        audio.pause();
        playBtn.value = "Pusti";
    } else {
        audio.play();
        playBtn.value = "Pauza";
    }

    isPlaying = !isPlaying;
});

// ----------------------------
// PROGRESS BAR UPDATE
// ----------------------------
audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + "%";
});

// ----------------------------
// SEEK NA KLIK PROGRESS BARA
// ----------------------------
progressContainer.addEventListener("click", (e) => {
    if (!audio.duration) return;

    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;

    audio.currentTime = percent * audio.duration;
});

// ----------------------------
// KAD PESMA ZAVRŠI
// ----------------------------
audio.addEventListener("ended", () => {
    isPlaying = false;
    playBtn.value = "Pusti";
    progressBar.style.width = "0%";
});
