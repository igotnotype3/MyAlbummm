
const smallCards = document.querySelectorAll(".smallcard");

const bigImg = document.getElementById("big-img");
const bigTitle = document.getElementById("current-song");
const lyricsText = document.getElementById("lyrics-text");
const playBtn = document.getElementById("play-btn");
const progressBar = document.getElementById("progress-bar");

let audio = new Audio();
let isPlaying = false;


function updateBigCard(cardData) {
    // Promena slike
    bigImg.src = cardData.img;

    // Promena naslova (title + features ako postoje)
    bigTitle.textContent = `Trenutno slusate: ${cardData.title}${cardData.features ? " (feat. " + cardData.features + ")" : ""}`;

    // Promena teksta lyrics
    lyricsText.innerHTML = cardData.lyrics;

    // Promena audio fajla
    audio.pause();
    audio.src = cardData.audio;
    audio.load();
    audio.currentTime = 0;


    // Reset dugmeta
    if (isPlaying) {
        audio.play();
        playBtn.value = "Pauza";
    } else {
        playBtn.value = "Pusti";
    }

    // Reset progress bara
    progressBar.style.width = "0%";
}

// ----------------------------
// FUNKCIJA ZA DOBIJANJE PODATAKA SA SMALL CARD-a
// ----------------------------
function getCardData(card) {
    return {
        img: card.querySelector("img").src,
        title: card.dataset.title || "Nepoznato",
        author: card.dataset.author || "Nepoznato",
        lyrics: card.dataset.lyrics || "Nema dodatih stihova.",
        audio: card.dataset.audio || "",
        features: card.dataset.features || "" // opcionalno za feat
    };
}

// ----------------------------
// EVENT LISTENER NA CLICK
// ----------------------------
smallCards.forEach(card => {
    card.addEventListener("click", () => {
        const data = getCardData(card);
        updateBigCard(data);

        // Aktivna klasa za UI
        smallCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
    });
});
// ----------------------------
// PLAY / PAUSE KONTROLA
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
// UPDATE PROGRESS BARA TOKOM SVIRANJA
// ----------------------------
audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + "%";
});

// ----------------------------
// KLIKOM NA PROGRESS BARRA PREMOTAVANJE
// ----------------------------
const progressContainer = document.querySelector(".progress");

progressContainer.addEventListener("click", (e) => {
    if (!audio.src) return;

    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const percent = clickX / width;
    audio.currentTime = percent * audio.duration;
});
