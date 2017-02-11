(function() {
  var synth = window.speechSynthesis;

  var inputForm = document.querySelector('form');
  var inputTxt = document.querySelector('.txt');
  var rate = document.querySelector('#rate');
  var rateValue = document.querySelector('.rate-value');
  var nextButton = document.querySelector('#next');
  var submitButton = document.querySelector('#submit');
  var repeatButton = document.querySelector('#repeat');
  var resultsText = document.querySelector('#results');

  var frenchVoice;
  var minimum = 0;
  var maximum = 10000;
  var speaking = false;
  var currentNumber;

  function next() {
    inputTxt.disabled = false;
    repeatButton.disabled = false;
    resultsText.innerHTML = '?';
    inputTxt.focus();

    currentNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    say(currentNumber);
  }

  function repeat() {
    say(currentNumber);
    inputTxt.focus();
  }

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

  function say(text) {
    if (speaking) return;
    try {
      speaking = true;

      var utterThis = new SpeechSynthesisUtterance(text);
      utterThis.lang = 'fr_FR';
      utterThis.voice = frenchVoice;
      utterThis.pitch = 1;
      utterThis.rate = rate.value;
      synth.speak(utterThis);
    } finally {
      speaking = false;
    }
  }

  function checkAnswer(answer) {
    if (answer === currentNumber) {
      var msg = '✓ ' + currentNumber;
    } else {
      var msg = '✗ ' + currentNumber;
    }
    resultsText.innerHTML = msg;
  }

  function reset() {
    inputTxt.value = '';
    submitButton.disabled = true;
    repeatButton.disabled = true;
  }

  inputForm.onsubmit = function(event) {
    event.preventDefault();
    var answerText = inputTxt.value;
    if (answerText) {
      checkAnswer(parseInt(answerText, 10));
      reset();
    }
    inputTxt.blur();
  }

  inputTxt.onkeyup = function() {
    submitButton.disabled = (inputTxt.value === '');
  }

  rate.onchange = function() {
    rateValue.textContent = rate.value;
  }

  nextButton.onclick = function() {
    next();
  }

  repeatButton.onclick = function() {
    repeat();
  }

  getFrenchVoice();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = getFrenchVoice;
  }
})();
