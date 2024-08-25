const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input");
let allKeys = [];

const playTune = (key) => {
    const audio = new Audio(`pianoKeys/${key}.mp3`); // Create a new Audio instance for each key
    audio.volume = volumeSlider.value; // Set the volume of the new audio instance
    audio.play(); // Play the audio

    const clickedKey = document.querySelector(`[data-key="${key}"]`); // Get the clicked key element
    clickedKey.classList.add("active"); // Add active class to the clicked key element
    setTimeout(() => {
        // Remove active class after 150ms from the clicked key element
        clickedKey.classList.remove("active");
    }, 150);
};

pianoKeys.forEach((key) => {
    allKeys.push(key.dataset.key); // Add data-key value to the allKeys array
    // Call playTune function with data-key value as an argument
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const showHideKeys = () => {
    // Toggle hide class from each key on the checkbox click
    pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

const handleVolume = (e) => {
    // This will update the volume for future audio instances
    audio.volume = e.target.value;
};

const pressedKey = (e) => {
    // If the pressed key is in the allKeys array, call the playTune function
    if (e.key === ".") playTune("dot");
    else if (e.key === "/") playTune("slash");
    else if (allKeys.includes(e.key)) playTune(e.key);
};

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
