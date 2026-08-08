const synth = window.speechSynthesis;

const text = document.querySelector("textarea");
const voiceSelect = document.querySelector("#voices");
const rate = document.querySelector('[name="rate"]');
const pitch = document.querySelector('[name="pitch"]');

const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");

let voices = [];

function populateVoices() {
    voices = synth.getVoices();

    voiceSelect.innerHTML = "";

    voices.forEach(function(voice) {
        const option = document.createElement("option");

        option.textContent = voice.name;
        option.value = voice.name;

        voiceSelect.appendChild(option);
    });
}

function speak() {
    if (text.value.trim() === "") {
        return;
    }

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text.value);

    const selectedVoice = voices.find(function(voice) {
        return voice.name === voiceSelect.value;
    });

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    utterance.rate = parseFloat(rate.value);
    utterance.pitch = parseFloat(pitch.value);

    synth.speak(utterance);
}

function stop() {
    synth.cancel();
}

synth.addEventListener("voiceschanged", populateVoices);

populateVoices();

speakButton.addEventListener("click", speak);

stopButton.addEventListener("click", stop);

voiceSelect.addEventListener("change", function() {
    if (synth.speaking) {
        speak();
    }
});
