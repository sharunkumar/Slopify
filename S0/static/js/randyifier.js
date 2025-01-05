document.addEventListener("DOMContentLoaded", () => {
  const randyButton = document.getElementById("randyifier");

  randyButton.addEventListener("click", () => {
    const allImages = document.querySelectorAll("img");
    allImages.forEach((element) => {
      const imageNames = ["badass", "dukenukem", "genderbent", "outside", "selfie"];
      const randomImageName = imageNames[Math.floor(Math.random() * imageNames.length)];
      element.src = `/static/images/randypitchford/${randomImageName}.jpg`;
    });
  });
});