const synth = window.speechSynthesis;

const msg = document.querySelector("textarea");
const voiceSelect = document.querySelector("select");
const rate = document.querySelector("#rate");
const pitch = document.querySelector("#pitch");

const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");

let voices = [];

function loadVoices() {
    voices = synth.getVoices();

    voiceSelect.innerHTML = "";

    voices.forEach((voice) => {
        const option = document.createElement("option");

        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;

        voiceSelect.appendChild(option);
    });
}

loadVoices();
synth.addEventListener("voiceschanged", loadVoices);


function speak() {
    const text = msg.value.trim();

    if (!text) {
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    const selectedVoice = voices.find(
        (voice) => voice.name === voiceSelect.value
    );

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    utterance.rate = parseFloat(rate.value);
    utterance.pitch = parseFloat(pitch.value);

    synth.cancel();
    synth.speak(utterance);
}


speakButton.addEventListener("click", speak);

stopButton.addEventListener("click", () => {
    synth.cancel();
});