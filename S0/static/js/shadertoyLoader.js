const SHADER_IDS = ["ld3Gz2", "4ttSWf", "XslGRr", "MdX3Rr", "XsX3RB", "WsSBzh"];

function setShaderToy(ifrm_shadertoy) {
  let id = SHADER_IDS[parseInt(Math.random() * SHADER_IDS.length)];
  ifrm_shadertoy.src = `https://www.shadertoy.com/embed/${id}?gui=true&paused=false&muted=false`;
}

export function initShaderToy() {
  const shaderToySection = document.getElementById("shadertoy-section");

  if (!shaderToySection) {
    return;
  }

  const shaderButton = document.createElement("input");
  shaderButton.type = "button";
  shaderButton.value = "SHADERZ";

  const br = document.createElement("br");

  const ifrm_shadertoy = document.createElement("iframe");
  ifrm_shadertoy.id = "ifrm_shadertoy";
  ifrm_shadertoy.width = "640";
  ifrm_shadertoy.height = "360";
  ifrm_shadertoy.src =
    "https://www.shadertoy.com/embed/ld3Gz2?gui=false&paused=false&muted=false";
  ifrm_shadertoy.allowFullscreen = true;
  ifrm_shadertoy.title =
    "An image showing a snail staring at a leaf with water droplets on it.";

  shaderButton.onclick = () => setShaderToy(ifrm_shadertoy);

  shaderToySection.appendChild(shaderButton);
  shaderToySection.appendChild(br);
  shaderToySection.appendChild(ifrm_shadertoy);
}
