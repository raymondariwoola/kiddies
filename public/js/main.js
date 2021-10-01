var synth = window.speechSynthesis;
var voices = [];
let currentPage;
const animations = [
  "animate-zoomIn",
  "animate-backInLeft",
  "animate-backInRight",
  "animate-backInUp",
  "animate-bounceInDown",
  "animate-flip",
  "animate-jackInTheBox",
  "animate-swing",
  "animate-zoomInRight",
  "animate-zoomInLeft",
  "animate-zoomInUp",
];

const colors = [
  "#5285ff",
  "#ffd352",
  "#8a52ff",
  "#ff8f52",
  "#ff52a6",
  "#f1c232",
  "#6aa84f",
  "#45818e",
  "#674ea7",
  "#a64d79",
  "#b4d600",
  "#edcc4c",
  "#f57e99",
  "#c28bcc",
  "#62d5c1",
  "#b4d600",
  "#edcc4c",
  "#f57e99",
  "#c28bcc",
  "#62d5c1",
  "#6699cc",
  "#fff275",
  "#ff8c42",
  "#ff3c38",
  "#a23e48",
  "#ffd900",
  "#0071ce",
  "#ed40a9",
  "#000000",
  "#aaaaaa",
];

const alphabetsUpper = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const alphabetsLower = alphabetsUpper.map((a) => a.toLowerCase());

const applaud = new Audio("../audio/applause-2.mp3");
var _alphaNumeric;
let iteration = 0;
let trackAlphaNumeric = 0;
let alphabets;
let currentClass;
let AlphaNumericContainer;
let animateOnPage;
let numberArray = [];

function randomNum(maxValue) {
  // if maxValue is defined then return random number based on maxValue else set maxValue as 10
  return Math.floor(Math.random() * (maxValue ? maxValue : 10));
}

function initText() {
  currentClass = animations[randomNum(animations.length)];
  alpType === "uppercase" ?
    (alphabets = alphabetsUpper[trackAlphaNumeric]) :
    (alphabets = alphabetsLower[trackAlphaNumeric]);
  document.querySelector(
    ".alphaNumbox"
  ).innerHTML = `<h1 class="animate animate-alpha ${currentClass}" id="alphabet">${alphabets}</h1>`; // Assign the first Alphabet
  AlphaNumericContainer = document.querySelector("#alphabet");
  _alphaNumeric = AlphaNumericContainer.innerText; // get the value if current alphabets
  AlphaNumericContainer.style.color = colors[randomNum(colors.length)];
}

function initDigit() {
  currentClass = animations[randomNum(animations.length)];
  number = numberArray[trackAlphaNumeric];
  document.querySelector(".alphaNumbox").innerHTML = `<h1 class="animate animate-number ${currentClass}" id="number">${number}</h1>`; // Assign the first Alphabet
  AlphaNumericContainer = document.querySelector("#number");
  _alphaNumeric = AlphaNumericContainer.innerText; // get the value if current alphabets
  AlphaNumericContainer.style.color = colors[randomNum(colors.length)];
}


function addAnimationEventListener() {
  document.addEventListener("animationend", () => {

    if (currentPage === "alphabets") {
      if (trackAlphaNumeric < (alphabetsUpper.length - 1)) { // if within alphabet array length then continue
        trackAlphaNumeric++;
        initText();
      } else {
        trackAlphaNumeric = 0;
        animEnd();
      }
    } else if (currentPage === "numbers") {
      if (trackAlphaNumeric < (numberArray.length - 1)) { // If within number array length then continue
        trackAlphaNumeric++;
        initDigit();
      } else {
        trackAlphaNumeric = 0;
        animEnd();
      }
    }
  });

  document.addEventListener("animationstart", () => {
    if (currentPage === "alphabets") {
      trackAlphaNumeric < alphabetsUpper.length ? speak() : null;
    } else if (currentPage === "numbers") {
      trackAlphaNumeric < numberArray.length ? speak() : null;
    }
  });

  document.addEventListener("animationiteration", () => {
    AlphaNumericContainer.style.color = colors[randomNum(colors.length)];
    speak();
  });
}

function animEnd() {
  document.querySelector(".alphaNumbox").innerHTML = `<h1 class="animate animate-alpha gjob">GOOD JOB!</h1> <small> Tap anywhere to restart </small>`;
  _alphaNumeric = document.querySelector(".gjob").innerText;
  applaud.play();
  speak();
  document.addEventListener("click", () => location.reload());
}

/* ******************************** */
//! Do not modify the contents below.
/* ******************************** */
function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase(),
      bname = b.name.toUpperCase();
    if (aname < bname) return -1;
    else if (aname == bname) return 0;
    else return +1;
  });
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak() {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }
  if (_alphaNumeric !== "") {
    var utterThis = new SpeechSynthesisUtterance(_alphaNumeric);
    utterThis.onend = function (event) {
      console.log("SpeechSynthesisUtterance.onend");
      // nextAlphabet(); // calls function at the end of speech
    };
    utterThis.onerror = function (event) {
      //! check why this gives error when page is manually reloaded  (F5 or ctrl+r)
      console.error("SpeechSynthesisUtterance.onerror");
      console.error(event);
    };

    utterThis.voice = voices[10];
    utterThis.pitch = 1; // max value is 2 //! step is 0.1 //* Min Value is 0
    utterThis.rate = 0.7; // max value is 1 //! step is 0.1 //* Min value is 0.5
    synth.speak(utterThis);
  }
}

/* ******************************** */
//! Do not modify the contents above.
/* ******************************** */

// function play() {
//   speak();
//   // inputTxt.blur();
// }

// function nextAlphabet(type) {
//   // alert('Next alphabet');
// }


document.addEventListener("DOMContentLoaded", (e) => {
  if (window.location.pathname === "/alphabets-menu/alphabets") {
    currentPage = "alphabets";
    initText();
    addAnimationEventListener();
    animateOnPage = true;
  }

  if (window.location.pathname === "/numbers-menu/numbers") {
    currentPage = "numbers";
    let numberCounter = 0;
    numType === "first10" ?
      (numberCounter = 9) :
      numType === "first100" ?
      (numberCounter = 100) :
      null;

    for (let numberToArray = 0; numberToArray <= numberCounter; numberToArray++) {
      numberArray.push(numberToArray);
    }

    initDigit();
    addAnimationEventListener();
    animateOnPage = true;
  }

});


function assignListener() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function (e) {
      const word = this.innerText.split('\n')[0];
      _alphaNumeric = word;
      speak();
      //! Check bgChnageOnHover(this, word, false)
    });
  });
  cards.forEach(card => {
    card.addEventListener('mouseleave', function (e) {
      synth.cancel();
    });
  });
}


//!check 
//function bgChnageOnHover(cardTag, x, clearBg) {
//   x === "Alphabets" ? cardTag.style.backgroundImage = "../images/bg/alphabets-bg.png" : null;
//   console.log(cardTag)
//   console.log(x)
//   console.log(clearBg)
// }



$(document).ready(() => {
  $("#proceed").click(() => {
    assignListener()
  })


  var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false
  });

  myModal.toggle();

});


// Home Page navigation
function getRoute(route) {
  window.location.href = route;
  return false;
}