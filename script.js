const synth = window.speechSynthesis;

const textarea = document.querySelector("textarea");
const voiceSelect = document.querySelector("select");

const rate = document.querySelector("#rate");
const pitch = document.querySelector("#pitch");

const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");

let voices = [];


// Load voices
function loadVoices() {
    voices = synth.getVoices();

    if (voices.length === 0) {
        return;
    }

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


// Speak
function speak() {

    const text = textarea.value.trim();

    if (!text) {
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Select voice
    const selectedVoice = voices.find(
        (voice) => voice.name === voiceSelect.value
    );

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    // Apply rate
    utterance.rate = Number(rate.value);

    // Apply pitch
    utterance.pitch = Number(pitch.value);

    // Stop previous speech
    synth.cancel();

    // Start speech
    synth.speak(utterance);
}


// Speak button
speakButton.addEventListener("click", speak);


// Stop button
stopButton.addEventListener("click", () => {
    synth.cancel();
});


// Voice change
voiceSelect.addEventListener("change", speak);


// Rate change
rate.addEventListener("change", speak);


// Pitch change
pitch.addEventListener("change", speak);