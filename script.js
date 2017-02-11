var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var frenchVoice;

var frenchLanguagePrefix = 'fr';

function getFrenchVoice() {
  var voices = synth.getVoices();
  var frenchVoices = [];
  for (var i = 0; i < voices.length; i++) {
    if (voices[i].lang.toLowerCase() == 'fr-fr' || voices[i].lang.toLowerCase() === 'fr_fr') {
      frenchVoice = voices[i];
      break;
    }
  }
}

getFrenchVoice();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = getFrenchVoice;
}

inputForm.onsubmit = function(event) {
  event.preventDefault();

  var utterThis = new SpeechSynthesisUtterance(inputTxt.value);

  utterThis.lang = 'fr_FR';
  utterThis.voice = frenchVoice;
  utterThis.pitch = 1;
  utterThis.rate = rate.value;
  synth.speak(utterThis);

  inputTxt.blur();
}

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
}
