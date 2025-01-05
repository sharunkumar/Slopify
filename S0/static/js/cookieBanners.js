function dismissBanner(cookieBanner) {
  cookieBanner.style.display = "none";
}

const COOKIE_BANNER_MESSAGES = [
  "We use cookies to improve your experience.",
  "This website uses cookies for better functionality.",
  "We use cookies to ensure you get the best experience.",
];

function createCookieBanner(message, id) {
  const cookieBanner = document.createElement("div");
  cookieBanner.id = id;
  cookieBanner.style.display = "flex";

  const cookieBannerContent = document.createElement("span");
  cookieBannerContent.textContent = message;

  const cookieBannerButton = document.createElement("button");
  cookieBannerButton.className = "agree-button";
  cookieBannerButton.textContent = "Agree";
  cookieBannerButton.onclick = () => dismissBanner(cookieBanner);

  cookieBanner.appendChild(cookieBannerContent);
  cookieBanner.appendChild(cookieBannerButton);

  return cookieBanner;
}

document.addEventListener("DOMContentLoaded", () => {
  const cookieBannerDiv = document.getElementById("cookie-banners");

  for (let i = 0; i < COOKIE_BANNER_MESSAGES.length; i++) {
    const cookieBanner = createCookieBanner(COOKIE_BANNER_MESSAGES[i], `cookie-banner${i + 1}`);
    cookieBannerDiv.appendChild(cookieBanner);
  }
});
