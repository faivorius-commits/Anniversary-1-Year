/* =========================
   SETTINGS
========================= */

const START_DATE = new Date(2025, 8, 18);
// 2025, 8, 18 = 18 September 2025
// Ingat: bulan JavaScript dimulai dari 0.


/* =========================
   OPEN GIFT
========================= */

let giftOpened = false;

function openGift() {

    if (giftOpened) return;

    giftOpened = true;

    const giftScreen = document.getElementById("giftScreen");
    const giftButton = document.getElementById("giftButton");
    const mainContent = document.getElementById("mainContent");
    const welcomeScreen = document.getElementById("welcomeScreen");

    // Animasi gift
    if (giftButton) {
        giftButton.style.transform = "scale(1.15)";
    }

    // Ledakan hati
    createHearts(25);

    setTimeout(function () {

        if (giftScreen) {
            giftScreen.style.display = "none";
        }

        if (mainContent) {
            mainContent.classList.add("show");
        }

        if (welcomeScreen) {
            welcomeScreen.classList.add("active");
        }

        document.body.style.overflowY = "auto";

    }, 500);
}


/* =========================
   CHANGE SECTION
========================= */

function nextSection(sectionId) {

    const currentSections = document.querySelectorAll(
        "#mainContent .content-screen, #mainContent .anniversary-screen"
    );

    currentSections.forEach(function(section) {
        section.classList.remove("active");
    });

    const next = document.getElementById(sectionId);

    if (next) {
        next.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


/* =========================
   COUNTER
========================= */

function updateCounter() {

    const now = new Date();

    let difference = now - START_DATE;

    if (difference < 0) {
        difference = 0;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);

    const hours = Math.floor(
        (totalSeconds % 86400) / 3600
    );

    const minutes = Math.floor(
        (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;


    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");


    if (daysElement) {
        daysElement.textContent = days.toLocaleString("id-ID");
    }

    if (hoursElement) {
        hoursElement.textContent = String(hours).padStart(2, "0");
    }

    if (minutesElement) {
        minutesElement.textContent = String(minutes).padStart(2, "0");
    }

    if (secondsElement) {
        secondsElement.textContent = String(seconds).padStart(2, "0");
    }
}


/* =========================
   YES BUTTON
========================= */

function sayYes() {

    createHearts(60);

    nextSection("anniversaryScreen");

    // Confetti sederhana
    createConfetti();
}


/* =========================
   FLOATING HEARTS
========================= */

function createHearts(amount = 20) {

    const container = document.getElementById("hearts-container");

    if (!container) return;

    const hearts = ["♡", "♥", "💕", "💗", "💖"];

    for (let i = 0; i < amount; i++) {

        const heart = document.createElement("span");

        heart.className = "heart";

        heart.textContent =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.fontSize =
            (14 + Math.random() * 22) + "px";

        heart.style.animationDuration =
            (4 + Math.random() * 5) + "s";

        heart.style.animationDelay =
            Math.random() * 1.5 + "s";

        container.appendChild(heart);

        setTimeout(function() {
            heart.remove();
        }, 10000);
    }
}


/* =========================
   CONFETTI
========================= */

function createConfetti() {

    const container = document.getElementById("hearts-container");

    if (!container) return;

    const symbols = [
        "✨",
        "💗",
        "💕",
        "🎀",
        "♡",
        "⭐"
    ];

    for (let i = 0; i < 70; i++) {

        const item = document.createElement("span");

        item.className = "heart";

        item.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        item.style.left =
            Math.random() * 100 + "%";

        item.style.bottom =
            (20 + Math.random() * 50) + "%";

        item.style.fontSize =
            (14 + Math.random() * 20) + "px";

        item.style.animationDuration =
            (3 + Math.random() * 4) + "s";

        container.appendChild(item);

        setTimeout(function() {
            item.remove();
        }, 8000);
    }
}


/* =========================
   START
========================= */

document.addEventListener("DOMContentLoaded", function() {

    // Lock screen ketika gift belum dibuka
    document.body.style.overflowY = "hidden";

    // Counter langsung berjalan
    updateCounter();

    // Update setiap detik
    setInterval(updateCounter, 1000);

});
