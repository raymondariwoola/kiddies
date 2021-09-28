var synth = window.speechSynthesis;
var voices = [];
const animations = ["animate-zoomIn","animate-backInLeft","animate-backInRight","animate-backInUp","animate-bounceInDown","animate-flip","animate-jackInTheBox","animate-swing","animate-zoomInRight","animate-zoomInLeft","animate-zoomInUp"];

const colors = ["#5285ff",	"#ffd352",	"#8a52ff",	"#ff8f52",	"#ff52a6",	"#f1c232",	"#6aa84f",	"#45818e",	"#674ea7",	"#a64d79",	"#b4d600",	"#edcc4c",	"#f57e99",	"#c28bcc",	"#62d5c1",	"#b4d600",	"#edcc4c",	"#f57e99",	"#c28bcc",	"#62d5c1",	"#6699cc",	"#fff275",	"#ff8c42",	"#ff3c38",	"#a23e48",	"#ffd900",	"#0071ce",	"#ed40a9",	"#000000",	"#aaaaaa"];

const alphabetsUpper =  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const alphabetsLower = alphabetsUpper.map((a) => a.toLowerCase());

const applaud = new Audio("audio/applause-2.mp3");
var _alphabet;
let iteration = 0;
let trackAlpha = 0;
let alphabets;
function randomNum(maxValue) {
  // if maxValue is defined then return random based on maxValue else set maxValue as 10
  return Math.floor(Math.random() * (maxValue ? maxValue : 10));
}

function initText(alphaType) {

  if (alphaType === "uppercase") {
    alphabets = alphabetsUpper[trackAlpha];
  } else {
    alphabets = alphabetsLower[trackAlpha];
  }

  console.log(alphabets);

  document.querySelector(
    ".alphabox"
  ).innerHTML = `<center><h1 class="animate animate-alpha ${
    animations[randomNum(animations.length)]
  }" id="alphabet">${alphabets}</h1> </center>`; // Assign the first Alphabet
  _alphabet = document.querySelector("#alphabet").innerText; // get the value if current alphabets
  document.querySelector("#alphabet").style.color =
    colors[randomNum(colors.length)];
}

document.addEventListener("animationend", () => {
  console.log("Done")
  trackAlpha < 26 ? trackAlpha++ : trackAlpha = 0;
  trackAlpha < 26 ? initText() : animEnd();
});

document.addEventListener("animationstart", () => {
  // trackAlpha < 26 ? play() : null;
  console.log("Start");
});

document.addEventListener("animationiteration", () => {
  document.querySelector("#alphabet").style.color =  colors[randomNum(colors.length)];
  // play();
});


function animEnd() {
  document.querySelector(".alphabox").innerHTML =`<h1 class="animate animate-alpha gjob">GOOD JOB!</h1>`;
  _alphabet = document.querySelector(".gjob").innerText;
  applaud.play();
  // play();
}


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
  if (_alphabet !== "") {
    var utterThis = new SpeechSynthesisUtterance(_alphabet);
    utterThis.onend = function (event) {
      console.log("SpeechSynthesisUtterance.onend");
      nextAlphabet(); // calls function at the end of speech
    };
    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    utterThis.voice = voices[10];
    utterThis.pitch = 1; // max value is 2 //! step is 0.1 //* Min Value is 0
    utterThis.rate = 0.7; // max value is 1 //! step is 0.1 //* Min value is 0.5
    synth.speak(utterThis);
  }
}

function play() {
  speak();
  // inputTxt.blur();
}

function nextAlphabet(type) {

  // alert('Next alphabet');
}

document.addEventListener('DOMContentLoaded',(e) => {
  // initText(alpType);  
})

