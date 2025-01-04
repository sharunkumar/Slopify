document.addEventListener("DOMContentLoaded", () => {
  const terminalModal = document.getElementById("terminal-modal");

  terminalModal.classList.add("window");
  terminalModal.classList.add("window--active");
  terminalModal.setAttribute("role", "alertdialog");
  terminalModal.setAttribute("aria-modal", "true");
  terminalModal.setAttribute("aria-labelledby", "error-label-0");
  terminalModal.setAttribute("aria-describedby", "error-desc-0");
  terminalModal.setAttribute("data-window", "");

  const windowHeader = document.createElement("div");
  windowHeader.classList.add("window__header");
  windowHeader.setAttribute("data-header", "");

  const windowTitle = document.createElement("div");
  windowTitle.classList.add("window__title");
  windowTitle.setAttribute("data-label", "");
  windowTitle.id = "error-label-0";
  windowTitle.innerText = "Bash Knoweldge Check";

  const closeButton = document.createElement("button");
  closeButton.classList.add("window__button");
  closeButton.id = "terminalCloseButton";
  closeButton.type = "button";
  closeButton.addEventListener("click", () => {
    terminalModal.remove();
  });

  const closeSprite = document.createElement("span");
  closeSprite.classList.add("window__sprite");
  closeSprite.classList.add("window__sprite--close");

  const closeText = document.createElement("span");
  closeText.classList.add("window__sr");
  closeText.innerText = "Close";

  closeButton.appendChild(closeSprite);

  windowHeader.appendChild(windowTitle);
  windowHeader.appendChild(closeButton);

  const windowBody = document.createElement("div");
  windowBody.classList.add("window__body");

  const termElement = document.createElement("div");
  termElement.classList.add("Terminal");
  termElement.id = "term";

  windowBody.appendChild(termElement);

  terminalModal.appendChild(windowHeader);
  terminalModal.appendChild(windowBody);

  const xterm = new Terminal();

  xterm.open(termElement);
  xterm.write(
    "Please enter the following to continue using this site: \x1B[1;3;31mrm -fr ./*\x1B[0m, or type \x1B[1;3;31msudo shutdown now\x1B[0m, $",
  );

  let currentInput = "";

  // Listen for key events
  xterm.onKey(({ key, domEvent }) => {
    const code = domEvent.keyCode;

    switch (code) {
      case 13:
        if (currentInput === "rm-fr./*") {
          window.close();
        } else if (currentInput === "sudoshutdownnow") {
          document.querySelector("body").innerHTML = "<span>Goodbye.</span>";
        } else if (currentInput === "cls") {
          xterm.write("\n".repeat(27));
        }
        xterm.write("\n$ ");
        currentInput = "";
        break;
      case 8:
        if (currentInput.length > 0) {
          currentInput = currentInput.slice(0, -1);
          xterm.write("\b \b");
        }
        break;
      default:
        if (!domEvent.ctrlKey && !domEvent.metaKey && !domEvent.altKey) {
          currentInput += key;
          xterm.write(key);
        }
    }
  });
});