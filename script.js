"use strict";

/*
    =========================================
    PRIVATE LETTER WEBSITE
    ACCESS TOKEN
    =========================================

    NOTE:
    GitHub Pages is a static website.
    This is a visitor gate, NOT real encryption.

    Change this value if you want another token.
*/

const ACCESS_TOKEN = "0709";


/* =========================
   ELEMENTS
========================= */

const accessScreen = document.getElementById("accessScreen");
const mainContent = document.getElementById("mainContent");

const tokenInput = document.getElementById("tokenInput");
const unlockBtn = document.getElementById("unlockBtn");
const errorMessage = document.getElementById("errorMessage");

const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");
const backgroundMusic = document.getElementById("backgroundMusic");


/* =========================
   UNLOCK FUNCTION
========================= */

function unlockPage() {

    const enteredToken = tokenInput.value.trim();

    if (enteredToken === ACCESS_TOKEN) {

        accessScreen.classList.add("hidden");

        mainContent.classList.remove("hidden");

        errorMessage.textContent = "";

        // Remove the token from the input after successful login
        tokenInput.value = "";

    } else {

        errorMessage.textContent = "Incorrect access token.";

        tokenInput.value = "";

        tokenInput.focus();

        // Small shake animation
        tokenInput.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-7px)" },
                { transform: "translateX(7px)" },
                { transform: "translateX(-4px)" },
                { transform: "translateX(4px)" },
                { transform: "translateX(0)" }
            ],
            {
                duration: 350
            }
        );
    }
}


/* =========================
   BUTTON CLICK
========================= */

unlockBtn.addEventListener("click", unlockPage);


/* =========================
   ENTER KEY
========================= */

tokenInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        unlockPage();

    }

});


/* =========================
   MUSIC PLAYER
========================= */

musicBtn.addEventListener("click", async function() {

    try {

        if (backgroundMusic.paused) {

            await backgroundMusic.play();

            musicIcon.textContent = "⏸️";
            musicText.textContent = "Pause Music";

            musicBtn.classList.add("playing");

        } else {

            backgroundMusic.pause();

            musicIcon.textContent = "🎵";
            musicText.textContent = "Play Music";

            musicBtn.classList.remove("playing");

        }

    } catch (error) {

        console.error("Music could not be played:", error);

        musicText.textContent = "Music unavailable";

    }

});


/* =========================
   MUSIC ENDED
========================= */

backgroundMusic.addEventListener("ended", function() {

    musicIcon.textContent = "🎵";

    musicText.textContent = "Play Music";

    musicBtn.classList.remove("playing");

});
