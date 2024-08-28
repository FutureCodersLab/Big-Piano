import { keys } from "./keys.js";

const allKeys = [];
const audioMap = {};

const createPianoKeys = (container) => {
    keys.forEach(({ label, key, isBlack, mappedKey }) => {
        const li = document.createElement("li");
        li.className = `key ${isBlack ? "black" : "white"}`;
        const displayKey = mappedKey || key;

        li.dataset.key = displayKey;
        li.innerHTML = `
            <div>${label}</div>
            <span>${key.toUpperCase()}</span>
        `;
        container.appendChild(li);
        allKeys.push(displayKey);
    });
};

const preloadAudio = () => {
    allKeys.forEach((key) => {
        audioMap[key] = new Audio(`pianoKeys/${key}.mp3`);
    });
};

const playTune = (key) => {
    const audio = audioMap[key];
    if (!audio) return;

    audio.currentTime = 0;
    audio.volume = document.querySelector(".volume-slider input").value;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");

    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
};

const showHideKeys = () => {
    document.querySelectorAll(".piano-keys .key").forEach((key) => {
        key.classList.toggle("hide");
    });
};

const handleVolume = (e) => {
    Object.values(audioMap).forEach(({ volume }) => {
        volume = e.target.value;
    });
};

const pressedKey = (e) => {
    const { mappedKey } = keys.find(({ key }) => key === e.key);
    const key = mappedKey || e.key;

    if (allKeys.includes(key)) playTune(key);
};

document.addEventListener("DOMContentLoaded", () => {
    const pianoKeysContainer = document.querySelector(".piano-keys");
    const volumeSlider = document.querySelector(".volume-slider input");
    const keysCheckbox = document.querySelector(".keys-checkbox input");

    createPianoKeys(pianoKeysContainer);
    preloadAudio();

    pianoKeysContainer.querySelectorAll(".key").forEach((key) => {
        key.addEventListener("click", () => playTune(key.dataset.key));
    });

    keysCheckbox.addEventListener("click", showHideKeys);
    volumeSlider.addEventListener("input", handleVolume);
    document.addEventListener("keydown", pressedKey);
});
