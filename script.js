const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input");
let allKeys = [];
let audioMap = {}; // To store preloaded audio objects

// Preload all audio files and store them in the audioMap
allKeys = Array.from(pianoKeys).map((key) => key.dataset.key); // Create the array of keys

allKeys.forEach((key) => {
    const audio = new Audio(`pianoKeys/${key}.mp3`);
    audioMap[key] = audio; // Store audio in the map with the key as the identifier
});

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

pianoKeys.forEach((key) => {
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const showHideKeys = () => {
    pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

const handleVolume = (e) => {
    // Update the volume for each audio object in the map
    for (let key in audioMap) {
        if (audioMap.hasOwnProperty(key)) {
            audioMap[key].volume = e.target.value;
        }
    }
};

const pressedKey = (e) => {
    if (e.key === ".") playTune("dot");
    else if (e.key === "/") playTune("slash");
    else if (allKeys.includes(e.key)) playTune(e.key);
};

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
