let enableShaking = false;

function shouldIgnore(element) {
  return !enableShaking || element.closest("#security-overlay") != null || element.hasAttribute("data-duplicated");
}

export function setShaking(enabled) {
  enableShaking = enabled;
}

/* Intensifies the page by adding a mouseover that shakes the target */
document.addEventListener("mouseover", (event) => {
  const target = event.target;

  if (shouldIgnore(target)) {
    return;
  }

  target.classList.add("shake");

  // the animation can be retriggered on multiple mouseovers, it always cleans up after
  target.addEventListener(
    "animationend",
    () => {
      target.classList.remove("shake");
    },
    { once: true },
  );
});
