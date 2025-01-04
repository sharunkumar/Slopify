document.addEventListener("DOMContentLoaded", () => {
  const cirnoSection = document.getElementById("cirno-section");

  const cirnoImg = document.createElement("img");
  cirnoImg.src = "/static/images/touhouproject/baka.png";
  cirnoImg.classList.add("cirno-img");
  cirnoImg.alt = "ᗜˬᗜ";
  cirnoImg.width = 200;
  cirnoImg.height = 200;

  const cirnoAudio = document.createElement("audio");
  cirnoAudio.src = "/static/audio/baka.mp3";
  cirnoAudio.preload = "auto";
  cirnoAudio.id = "baka-sound";

  cirnoImg.addEventListener("click", () => {
    cirnoAudio.currentTime = 0;
    cirnoAudio.play();
  });

  cirnoSection.appendChild(cirnoImg);
  cirnoSection.appendChild(cirnoAudio);
});