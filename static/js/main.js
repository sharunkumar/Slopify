import { initMandelbrotUwu } from "./mandelbrot_uwu.js";
import { oneko as initOneko } from "./oneko.js";
import { iceyoneko as initIcyOneko } from "./icey-oneko.js";
import { setDuplication } from "./epic.js";
import { setShaking } from "./shakeTarget.js";
import { initReverseScroll } from "./reverseScroll.js";
import { initShaderToy } from "./shadertoyLoader.js";

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
  }
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

    const label = document.createElement("label");
    label.htmlFor = key;
    label.innerText = value.name;

    const div = document.createElement("div");
    div.appendChild(checkbox);
    div.appendChild(label);

    deslopification.appendChild(div);
  });

  const deslopifyButton = document.createElement("button");
  deslopifyButton.innerText = "Deslopify";
  deslopifyButton.id = "deslopify-button";
  deslopification.appendChild(deslopifyButton);

  deslopifyButton.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll("#deslopification input[type=checkbox]:checked");
    checkboxes.forEach((checkbox) => {
      const initFunction = INIT_FUNCTIONS[checkbox.value];
      initFunction.run();
    });

    deslopification.remove();
  });
});