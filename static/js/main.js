import { initMandelbrotUwu } from "./mandelbrot_uwu.js";
import { oneko as initOneko } from "./oneko.js";
import { iceyoneko as initIcyOneko } from "./icey-oneko.js";
import { setDuplication } from "./epic.js";
import { setShaking } from "./shakeTarget.js";
import { initReverseScroll } from "./reverseScroll.js";
import { initShaderToy } from "./shadertoyLoader.js";
import { initDyslexia } from "./dyslexia.js";
import { initKaboom } from "./kaboom.js";

// Welcome to "main.js". This is where all the ~magic~ SLOP happens.

const INIT_FUNCTIONS = {
  "mandelbrot_uwu": {
    name: "UWU Mandelbrot",
    run: initMandelbrotUwu,
  },
  "oneko": {
    name: "Oneko",
    run: initOneko,
  },
  "icyoneko": {
    name: "Icyoneko",
    run: initIcyOneko,
  },
  "duplication": {
    name: "Element Duplication",
    run: () => setDuplication(true),
  },
  "shake-element": {
    name: "Shake Element",
    run: () => setShaking(true),
  },
  "inverse-scrolling": {
    name: "Inverse Scrolling",
    run: () => initReverseScroll(true),
  },
  "bad-apple-log": {
    name: "Bad Apple Console Logging",
    run: () => startBadAppleLogging(),
  },
  "shader-toy": {
    name: "Shader Toy",
    run: () => initShaderToy(),
  },
  "dyslexia": {
    name: "Dyslexia",
    run: () => initDyslexia(),
  },
  "kaboom": {
    name: "Mouse Kaboom",
    run: () => initKaboom(),
  },
};

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
    const checkboxes = document.querySelectorAll("#deslopification input[type=checkbox]:checked");
    checkboxes.forEach((checkbox) => {
      const initFunction = INIT_FUNCTIONS[checkbox.value];
      initFunction.run();
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