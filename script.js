const gift = document.getElementById("gift");
const openingScreen = document.getElementById("opening-screen");
const mainContent = document.getElementById("main-content");

let opened = false;

gift.addEventListener("click", () => {

    if (opened) return;

    opened = true;

    // Open the gift
    gift.classList.add("open");

    // Create little hearts
    createHearts();

    // Wait for gift animation
    setTimeout(() => {

        openingScreen.classList.add("hide");

        mainContent.classList.add("show");

        // Allow page to scroll again
        document.body.style.overflow = "auto";

    }, 1600);

});


/* =====================================================
   HEARTS
===================================================== */

function createHearts() {

    for (let i = 0; i < 25; i++) {

        setTimeout(() => {

            const heart = document.createElement("span");

            heart.innerHTML =
                Math.random() > 0.5 ? "♡" : "♥";

            heart.className = "floating-heart";

            heart.style.left =
                (40 + Math.random() * 20) + "vw";

            heart.style.top =
                (45 + Math.random() * 10) + "vh";

            heart.style.fontSize =
                (10 + Math.random() * 20) + "px";

            heart.style.animationDuration =
                (1.5 + Math.random() * 2) + "s";

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 4000);

        }, i * 60);

    }
}


/* =====================================================
   SCROLL REVEAL
===================================================== */

const elements = document.querySelectorAll(
    ".memory, .photo, .letter-paper, .intro"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.12
    }
);

elements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(40px)";

    element.style.transition =
        "opacity 1s ease, transform 1s ease";

    observer.observe(element);

});


/* =====================================================
   EXTRA CSS FOR FLOATING HEARTS
===================================================== */

const style = document.createElement("style");

style.innerHTML = `

.floating-heart {

    position: fixed;

    z-index: 10000;

    pointer-events: none;

    color: #b98780;

    animation:
        heartExplosion
        2s ease-out
        forwards;
}

.memory.visible,
.photo.visible,
.letter-paper.visible,
.intro.visible {

    opacity: 1 !important;

    transform:
        translateY(0) !important;
}

@keyframes heartExplosion {

    0% {

        opacity: 1;

        transform:
            translate(0, 0)
            scale(.5)
            rotate(0deg);
    }

    100% {

        opacity: 0;

        transform:
            translate(
                calc(-150px + 300px * var(--random-x)),
                -250px
            )
            scale(1.4)
            rotate(25deg);
    }
}

`;

document.head.appendChild(style);


/* =====================================================
   LOCK SCROLL WHILE OPENING
===================================================== */

document.body.style.overflow = "hidden";
