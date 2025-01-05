function downloadCatgirl(catgirlImg) {
  const imageUrl = catgirlImg.src;
  const fileName = imageUrl.split("/").pop().split("\\").pop();

  fetch(imageUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `http error (translation: skill issue): ${response.status}`,
        );
      }
      return response.blob();
    })
    .then((blob) => {
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    })
    .catch((error) => {
      alert(`javascript broke. can't download catgirl. ${error}`);
    });
}

function loadCatgirl(catgirlImg) {
  catgirlImg.src = "#";
  catgirlImg.alt = "loading!! be patient etc uwu meow nyaaaa";

  try {
    fetch("https://nekos.best/api/v2/neko")
      .then((response) => response.json())
      .then((json) => (catgirlImg.src = json.results[0].url));
    catgirlImg.alt = "catgirl";
  } catch (e) {
    catgirlImg.alt = `shit happened: ${e}`;
    console.error(e);
  }
}

function init() {
  const catgirlDiv = document.getElementById("catgirl-container");

  if (catgirlDiv == null) {
    console.error("catgirl-container not found");
    return;
  }

  if (catgirlDiv.childElementCount > 0) {
    console.error("catgirl-container already populated");
    return;
  }

  const catgirlImg = document.createElement("img");
  catgirlImg.id = "catgirl";
  catgirlImg.height = 1000;

  const br = document.createElement("br");

  const rerollButton = document.createElement("button");
  rerollButton.textContent = "Get another neko!";
  rerollButton.onclick = () => loadCatgirl(catgirlImg);

  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Cute!!";
  downloadButton.onclick = () => downloadCatgirl(catgirlImg);

  catgirlDiv.appendChild(catgirlImg);
  catgirlDiv.appendChild(br);
  catgirlDiv.appendChild(rerollButton);
  catgirlDiv.appendChild(downloadButton);

  loadCatgirl(catgirlImg);
}

document.addEventListener("DOMContentLoaded", init);
