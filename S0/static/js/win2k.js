document.addEventListener("DOMContentLoaded", () => {
  const win2kContainer = document.getElementById("win2k-container");
  win2kContainer.classList.add("window");
  win2kContainer.classList.add("window--active");

  const windowHeader = document.createElement("div");
  windowHeader.classList.add("window__header");
  windowHeader.setAttribute("data-header", "");

  const windowTitle = document.createElement("div");
  windowTitle.classList.add("window__title");
  windowTitle.textContent = "Windows 2000";

  const closeButton = document.createElement("button");
  closeButton.classList.add("window__button");
  closeButton.type = "button";
  closeButton.addEventListener("click", () => {
    win2kContainer.remove();
  });

  const closeSprite = document.createElement("span");
  closeSprite.classList.add("window__sprite");
  closeSprite.classList.add("window__sprite--close");

  const closeText = document.createElement("span");
  closeText.classList.add("window__sr");
  closeText.textContent = "Close";

  closeButton.appendChild(closeSprite);
  closeButton.appendChild(closeText);

  windowHeader.appendChild(windowTitle);
  windowHeader.appendChild(closeButton);

  const windowBody = document.createElement("div");
  windowBody.classList.add("window__body");

  const win2k = document.createElement("iframe");
  win2k.src =
    "https://bellard.org/jslinux/vm.html?url=win2k.cfg&mem=192&graphic=1&w=1024&h=768";
  win2k.title = "Windows 2000 Emulator";

  windowBody.appendChild(win2k);

  win2kContainer.appendChild(windowHeader);
  win2kContainer.appendChild(windowBody);
});
