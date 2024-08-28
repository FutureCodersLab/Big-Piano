// Select the necessary elements from the DOM
const pianoKeysContainer = document.querySelector(".piano-keys"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [];
let audioMap = {};

// Array of piano keys with labels and key mappings
const keys = [
    { label: "C", key: "q" },
    { label: "C#", key: "2", isBlack: true },
    { label: "D", key: "w" },
    { label: "D#", key: "3", isBlack: true },
    { label: "E", key: "e" },
    { label: "F", key: "r" },
    { label: "F#", key: "5", isBlack: true },
    { label: "G", key: "t" },
    { label: "G#", key: "6", isBlack: true },
    { label: "A", key: "y" },
    { label: "A#", key: "7", isBlack: true },
    { label: "B", key: "u" },
    { label: "C", key: "i" },
    { label: "C#", key: "9", isBlack: true },
    { label: "D", key: "o" },
    { label: "D#", key: "0", isBlack: true },
    { label: "E", key: "p" },
    { label: "F", key: "z" },
    { label: "F#", key: "s", isBlack: true },
    { label: "G", key: "x" },
    { label: "G#", key: "d", isBlack: true },
    { label: "A", key: "c" },
    { label: "A#", key: "f", isBlack: true },
    { label: "B", key: "v" },
    { label: "C", key: "b" },
    { label: "C#", key: "h", isBlack: true },
    { label: "D", key: "n" },
    { label: "D#", key: "j", isBlack: true },
    { label: "E", key: "m" },
    { label: "F", key: "," },
    { label: "F#", key: "l", isBlack: true },
    { label: "G", key: "." }, // '.' key, will map to "dot"
    { label: "G#", key: ";", isBlack: true },
    { label: "A", key: "/" }, // '/' key, will map to "slash"
    { label: "A#", key: "'", isBlack: true },
    { label: "", key: "" },
];

// Function to dynamically create piano keys
const createPianoKeys = () => {
    keys.forEach(({ label, key, isBlack }) => {
        const li = document.createElement("li");
        li.className = `key ${isBlack ? "black" : "white"}`;

        let displayKey = key;
        if (key === ".") displayKey = "dot";
        if (key === "/") displayKey = "slash";

        li.dataset.key = displayKey;
        li.innerHTML = `<div>${label}</div><span>${key.toUpperCase()}</span>`;
        pianoKeysContainer.appendChild(li);
        allKeys.push(displayKey); // Add the key to the allKeys array
    });
};

// Preload all audio files and store them in the audioMap
const preloadAudio = () => {
    allKeys.forEach((key) => {
        const audio = new Audio(`pianoKeys/${key}.mp3`);
        audioMap[key] = audio; // Store audio in the map with the key as the identifier
    });
};

// Function to play a tune based on the key pressed
const playTune = (key) => {
    if (audioMap[key]) {
        audioMap[key].currentTime = 0; // Reset playback position
        audioMap[key].volume = volumeSlider.value; // Set the volume
        audioMap[key].play(); // Play the preloaded audio

        const clickedKey = document.querySelector(`[data-key="${key}"]`);
        clickedKey.classList.add("active");
        setTimeout(() => {
            clickedKey.classList.remove("active");
        }, 150);
    }
};

// Show or hide key labels
const showHideKeys = () => {
    pianoKeysContainer
        .querySelectorAll(".key")
        .forEach((key) => key.classList.toggle("hide"));
};

// Handle volume change
const handleVolume = (e) => {
    for (let key in audioMap) {
        if (audioMap.hasOwnProperty(key)) {
            audioMap[key].volume = e.target.value;
        }
    }
};

// Handle key press event
const pressedKey = (e) => {
    let key = e.key;
    if (key === ".") key = "dot";
    if (key === "/") key = "slash";
    if (allKeys.includes(key)) playTune(key);
};

// Initialize the piano keys and add event listeners
createPianoKeys(); // Dynamically create piano keys
preloadAudio(); // Preload audio files

pianoKeysContainer.querySelectorAll(".key").forEach((key) => {
    key.addEventListener("click", () => playTune(key.dataset.key));
});

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
