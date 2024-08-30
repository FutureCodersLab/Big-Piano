import { keys } from "./keys.js";

const allKeys = [];
const audioMap = {};

document.addEventListener("DOMContentLoaded", () => {
    const pianoKeysContainer = document.querySelector(".piano-keys");
    const keysCheckbox = document.querySelector(".keys-checkbox input");

    createPianoKeys(pianoKeysContainer);
    preloadAudio();

    pianoKeysContainer.querySelectorAll(".key").forEach((key) => {
        key.addEventListener("click", () => playTune(key.dataset.key));
    });

    keysCheckbox.addEventListener("click", showHideKeys);
    document.addEventListener("keydown", pressedKey);
});

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
        audioMap[key] = new Audio(`./pianoKeys/${key}.mp3`);
    });
};

const pressedKey = (e) => {
    const { mappedKey } = keys.find(({ key }) => key === e.key);
    const key = mappedKey || e.key;

    if (allKeys.includes(key)) playTune(key);
};

const playTune = (key) => {
    const audio = audioMap[key];
    if (!audio) return;

    audio.currentTime = 0;
    audio.volume = document.querySelector(".volume-slider input").value;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");

    setTimeout(() => clickedKey.classList.remove("active"), 150);
};

const showHideKeys = () => {
    document.querySelectorAll(".piano-keys .key").forEach((key) => {
        key.classList.toggle("hide");
    });
};
