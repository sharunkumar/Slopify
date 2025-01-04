import { initMandelbrotUwu } from "./mandelbrot_uwu.js";
import { oneko as initOneko } from "./oneko.js";
import { iceyoneko as initIcyOneko } from "./icey-oneko.js";
import { setDuplication } from "./epic.js";
import { setShaking } from "./shakeTarget.js";
import { initReverseScroll } from "./reverseScroll.js";
import { initShaderToy } from "./shadertoyLoader.js";
import { initDyslexia } from "./dyslexia.js";
import { initKaboom } from "./kaboom.js";
import { setSurpriseEnabled } from "./surprise.js";
import { injectAAB } from "./aabLoader.js";
import { startBadAppleLogging } from "./badApple.js";
import { rainbowPulse } from "./rainbowPulse.js";
import { injectSecurity } from "./securityLoader.js";
import { initError } from "./error.js";

// Welcome to "main.js". This is where all the ~magic~ SLOP happens.

const INIT_FUNCTIONS = {
  "mandelbrot_uwu": {
    name: "UWU Mandelbrot",
    run: initMandelbrotUwu,
    cleanup: () => cleanDOM("mandelbrot_uwu"),
  },
  "oneko": {
    name: "Oneko",
    run: initOneko,
    cleanup: () => cleanDOM("oneko"),
  },
  "icyoneko": {
    name: "Icyoneko",
    run: initIcyOneko,
    cleanup: () => cleanDOM("icyoneko"),
  },
  "duplication": {
    name: "Element Duplication",
    run: () => setDuplication(true),
    cleanup: () => cleanDOM("duplication"),
  },
  "shake-element": {
    name: "Shake Element",
    run: () => setShaking(true),
    cleanup: () => cleanDOM("shake-element"),
  },
  "inverse-scrolling": {
    name: "Inverse Scrolling",
    run: () => initReverseScroll(true),
    cleanup: () => cleanDOM("inverse-scrolling"),
  },
  "bad-apple-log": {
    name: "Bad Apple Console Logging",
    run: () => startBadAppleLogging(),
    cleanup: () => cleanDOM("bad-apple-log"),
  },
  "shader-toy": {
    name: "Shader Toy",
    run: () => initShaderToy(),
    cleanup: () => cleanDOM("shader-toy"),
  },
  "dyslexia": {
    name: "Dyslexia",
    run: () => initDyslexia(),
    cleanup: () => cleanDOM("dyslexia"),
  },
  "kaboom": {
    name: "Mouse Kaboom",
    run: () => initKaboom(),
    cleanup: () => cleanDOM("kaboom"),
  },
  "handsome-surprise": {
    name: "Handsome Surprise",
    run: () => setSurpriseEnabled(true),
    cleanup: () => cleanDOM("handsome-surprise"),
  },
  "aabLoader": {
    name: "Anti-Adblock Loader",
    run: () => injectAAB(),
    cleanup: () => cleanDOM("aabLoader"),
  },
  "rainbowPulse": {
    name: "Rainbow Pulse Background",
    run: () => rainbowPulse(),
    cleanup: () => cleanDOM("rainbowPulse"),
  },
  "security": {
    name: "Security",
    run: () => injectSecurity(),
    cleanup: () => cleanDOM("security"),
  },
  "error": {
    name: "Errors",
    run: () => initError(),
    cleanup: () => cleanDOM("error"),
  },
};

function cleanDOM(key) {
  const elements = document.querySelectorAll(`[deslopify-dom=${key}]`);

  if (elements.length === 0) {
    console.warn(`[deslopify] No elements found for ${key}`);
    return;
  }

  elements.forEach((element) => {
    element.remove();
    console.log(`[deslopify] Removed ${element.outerHTML}`);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const deslopification = document.getElementById("deslopification");

  if (!deslopification) {
    return;
  }

  Object.entries(INIT_FUNCTIONS).forEach(([key, value]) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = key;
    checkbox.checked = true;
    checkbox.id = `deslopify-${key}`;

    const label = document.createElement("label");
    label.htmlFor = `deslopify-${key}`;
    label.innerText = value.name;

    const div = document.createElement("div");
    div.className = "deslopify-checkbox";
    div.appendChild(checkbox);
    div.appendChild(label);

    deslopification.appendChild(div);
  });

  const buttonDiv = document.createElement("div");
  buttonDiv.className = "deslopify-button-container";

  const deslopifyButton = document.createElement("button");
  deslopifyButton.innerText = "Deslopify";
  deslopifyButton.id = "deslopify-button";

  deslopifyButton.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll("#deslopification input[type=checkbox]");
    checkboxes.forEach((checkbox) => {
      const key = checkbox.value;
      const isChecked = checkbox.checked;

      if (isChecked) {
        console.log(`[deslopify] Running ${key}`);
        INIT_FUNCTIONS[key].run();
      } else {
        console.log(`[deslopify] Cleaning up ${key}`);
        INIT_FUNCTIONS[key].cleanup();
      }
    });

    deslopification.remove();
  });

  const selectAllButton = document.createElement("button");
  selectAllButton.innerText = "Select All";
  selectAllButton.id = "select-all-deslopifications-button";

  selectAllButton.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll("#deslopification input[type=checkbox]");
    checkboxes.forEach((checkbox) => checkbox.checked = true);
  });

  const deselectAllButton = document.createElement("button");
  deselectAllButton.innerText = "Deselect All";
  deselectAllButton.id = "deselect-all-deslopifications-button";

  deselectAllButton.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll("#deslopification input[type=checkbox]");
    checkboxes.forEach((checkbox) => checkbox.checked = false);
  });

  buttonDiv.appendChild(deslopifyButton);
  buttonDiv.appendChild(selectAllButton);
  buttonDiv.appendChild(deselectAllButton);

  deslopification.appendChild(buttonDiv);
});