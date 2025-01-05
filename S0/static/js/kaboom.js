var KABOOM_IMG = null;
var MOUSE_KABOOMS = [];

function initMouseKaboom() {
  document.addEventListener("click", mouseKaboom);
}

function mouseKaboom(event) {
  //alert("KABOOM!");

  var size = 64;

  var canvas = document.createElement("canvas");
  canvas.className = "kaboom";
  canvas.width = size;
  canvas.height = size;

  //var x = event.clientX - (size / 2);
  //var y = event.clientY - (size / 2);

  canvas.style =
    "left:" +
    (event.clientX - size / 2) +
    "px !important; " +
    "top:" +
    (event.clientY - size / 2) +
    "px !important;";
  //canvas.style.top = y + "px !important";

  canvas.style.pointerEvents = "none";

  canvas.style.zIndex = "99999999";

  document.body.appendChild(canvas);

  addMouseKaboom(canvas);

  playKaboomSound();
}
function addMouseKaboom(canvas) {
  MOUSE_KABOOMS.push({
    canvas: canvas,
    age: 0,
  });
}

function updateMouseKabooms() {
  MOUSE_KABOOMS = MOUSE_KABOOMS.filter(function (boom) {
    if (boom.age >= 15) {
      boom.canvas.remove();
    }
    return boom.age < 15;
  });

  MOUSE_KABOOMS.forEach((boom) => {
    boom.age += 1;

    var offsetX = -64 * (boom.age % 4);
    var offsetY = -64 * (Math.floor(boom.age / 4) % 4);

    var ctx = boom.canvas.getContext("2d");
    ctx.clearRect(0, 0, boom.canvas.width, boom.canvas.height);
    ctx.drawImage(KABOOM_IMG, offsetX, offsetY);
  });
}

function playKaboomSound() {
  var kaboomSound = new Audio("static/audio/kaboom.mp3");
  kaboomSound.volume = 1;
  kaboomSound.play();
}

export function initKaboom() {
  KABOOM_IMG = document.getElementById("mouseKaboomImage");
  initMouseKaboom();
  window.setInterval(updateMouseKabooms, 50);
}
