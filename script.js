/* =====================================================
   ANNIVERSARY WEBSITE
   SCRIPT.JS
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const gift = document.getElementById("gift");
const openingScreen = document.getElementById("opening-screen");
const mainContent = document.getElementById("main-content");


/* =====================================================
   OPENING STATE
===================================================== */

let opened = false;


/* =====================================================
   GIFT CLICK
===================================================== */

if (gift) {

    gift.addEventListener("click", function () {

        if (opened) return;

        opened = true;


        /* ---------------------------------------------
           ADD OPEN CLASS
        --------------------------------------------- */

        gift.classList.add("open");


        /* ---------------------------------------------
           CREATE HEARTS
        --------------------------------------------- */

        createHearts();


        /* ---------------------------------------------
           MOVE TO MAIN CONTENT
        --------------------------------------------- */

        setTimeout(function () {

            if (openingScreen) {

                openingScreen.classList.add("hide");

            }


            if (mainContent) {

                mainContent.classList.add("show");

            }


            document.body.style.overflow = "auto";


        }, 1200);

    });

}


/* =====================================================
   HEARTS
===================================================== */

function createHearts() {

    const hearts = [
        "♡",
        "♥",
        "♡",
        "♥",
        "♡"
    ];


    for (let i = 0; i < 30; i++) {

        setTimeout(function () {

            const heart =
                document.createElement("span");


            heart.className =
                "floating-heart";


            heart.innerHTML =
                hearts[
                    Math.floor(
                        Math.random() *
                        hearts.length
                    )
                ];


            /* -----------------------------------------
               POSITION
            ----------------------------------------- */

            heart.style.left =
                (
                    35 +
                    Math.random() * 30
                ) + "vw";


            heart.style.top =
                (
                    45 +
                    Math.random() * 10
                ) + "vh";


            /* -----------------------------------------
               SIZE
            ----------------------------------------- */

            heart.style.fontSize =
                (
                    12 +
                    Math.random() * 22
                ) + "px";


            /* -----------------------------------------
               RANDOM MOVEMENT
            ----------------------------------------- */

            heart.style.setProperty(
                "--random-x",
                Math.random()
            );


            heart.style.animationDuration =
                (
                    1.5 +
                    Math.random() * 2
                ) + "s";


            document.body.appendChild(
                heart
            );


            /* -----------------------------------------
               REMOVE
            ----------------------------------------- */

            setTimeout(function () {

                heart.remove();

            }, 4000);


        }, i * 50);

    }

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".memory, .photo, .letter-paper, .intro"
    );


/* =====================================================
   INTERSECTION OBSERVER
===================================================== */

if (
    "IntersectionObserver"
    in window
) {

    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );

}


/* =====================================================
   FLOATING HEART CSS
===================================================== */

const heartStyle =
    document.createElement("style");


heartStyle.innerHTML = `

.floating-heart {

    position: fixed;

    z-index: 99999;

    pointer-events: none;

    color: #d985a8;

    font-family:
        Georgia,
        serif;

    animation:
        heartExplosion
        2s
        ease-out
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
            translate(
                0,
                0
            )
            scale(.4)
            rotate(0deg);

    }


    40% {

        opacity: 1;

    }


    100% {

        opacity: 0;

        transform:
            translate(
                calc(
                    -150px +
                    300px *
                    var(--random-x)
                ),
                -280px
            )
            scale(1.4)
            rotate(30deg);

    }

}

`;


document.head.appendChild(
    heartStyle
);


/* =====================================================
   INITIAL STATE
===================================================== */

if (openingScreen) {

    openingScreen.classList.remove(
        "hide"
    );

}


if (mainContent) {

    mainContent.classList.remove(
        "show"
    );

}


/* =====================================================
   LOCK SCROLL
===================================================== */

document.body.style.overflow =
    "hidden";
