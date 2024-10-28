import database from './database.js'

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let coord = { x: 0, y: 0 };

var img;
var penColor = '#000000';

var drawing = false;

document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);

document.addEventListener("touchstart", start);
document.addEventListener("touchend", stop);
window.addEventListener("resize", resize);

window.addEventListener("load", function () {
  resize();
  getImg();
  this.setInterval(updateCanvas, 100);

  document.getElementById("colorpicker").addEventListener('click', function (e) {

    if (e.target.className == "color") {
      setColor(document.defaultView.getComputedStyle(e.target, null)['backgroundColor']);
    }
  })



})

function updateCanvas() {
  if (img != null && drawing === false) {
    var imgs = document.createElement("img")
    imgs.src = img;
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgs, 0, 0);

    imgs.remove();

  }

}


function resize() {
  canvas.width = 500;
  canvas.height = 500;
}
function reposition(event) {
  if (event instanceof TouchEvent) {
    const touch = event.touches[0];

    coord.x = touch.clientX - canvas.offsetLeft;
    coord.y = touch.clientY - canvas.offsetTop;
  } else {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;

  }
}
function start(event) {
  document.addEventListener("mousemove", draw);
  document.addEventListener("touchmove", draw);
  reposition(event);
  drawing = true;
}
function stop() {
  document.removeEventListener("mousemove", draw);
  document.removeEventListener("touchmove", draw);

  var imgurl = canvas.toDataURL("image/png");
  sendToDatabase(imgurl);


  drawing = false;
}
function draw(event) {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = penColor;
  ctx.moveTo(coord.x, coord.y);
  reposition(event);
  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
}


const a = database.ref(database.db, 'Canvas/');
database.onValue(a, (snapshot) => {
  getImg();
});

function getImg() {
  const dbref = database.ref(database.db);
  //var img;

  database.get(database.child(dbref, 'Canvas/')).then((snapshot) => {
    img = Object.entries(snapshot.val())[0][1];
    updateCanvas();
  })
}

function setColor(_color) {
  penColor = _color;

}

function sendToDatabase(data) {

  database.set(database.ref(database.db, "Canvas/"), {
    Image: data
  });
}
