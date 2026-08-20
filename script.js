const synth = window.speechSynthesis;
let voices = [];

function loadVoices() {
    voices = synth.getVoices();
}

loadVoices();

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

function speak() {
    const text = document.querySelector("textarea").value;

    if (!text.trim()) {
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    
    const selectedVoice = voices.find(
        voice => voice.name === voiceSelect.value
    );

    
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    utterance.rate = rate.value;
    utterance.pitch = pitch.value;

    synth.cancel();
    synth.speak(utterance);
}