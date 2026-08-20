const msg = document.querySelector("textarea");
const voiceSelect = document.querySelector("select");
const options = document.querySelectorAll("[type='range']");
const rate = document.querySelector("#rate");
const pitch = document.querySelector("#pitch");
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");

const synth = window.speechSynthesis;

let voices = [];



function loadVoices() {
    voices = synth.getVoices();

    voiceSelect.innerHTML = "";

    voices.forEach((voice) => {
        const option = document.createElement("option");

        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = voice.name;

        voiceSelect.appendChild(option);
    });
}



loadVoices();

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
}



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



voiceSelect.addEventListener("change", () => {

    if (voices.length === 0) {
        return;
    }

    const selectedVoice = voices.find(
        (voice) => voice.name === voiceSelect.value
    );

    if (!selectedVoice) {
        return;
    }

    speak();
});


rate.addEventListener("change", speak);
pitch.addEventListener("change", speak);