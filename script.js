var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight - 40;
var flag = true;
var curColor = "black";
var size = 1;
var pap = document.getElementById('pap');
var canvasDiv = document.getElementById('canvasSimpleDiv');
canvas = document.createElement('canvas');
canvas.setAttribute('width', SCREEN_WIDTH);
canvas.setAttribute('height', SCREEN_HEIGHT);
canvas.setAttribute('id', 'canvas');

var imgDiv = document.getElementById('imgCanvas');
img = document.createElement('canvas');
img.setAttribute('width', SCREEN_WIDTH);
img.setAttribute('height', SCREEN_HEIGHT);
img.setAttribute('id', 'canvas');
imgDiv.appendChild(img);

if (typeof G_vmlCanvasManager != 'undefined') {
    canvas = G_vmlCanvasManager.initElement(canvas);
    img = G_vmlCanvasManager.initElement(img);
}
context = canvas.getContext("2d");
imgcontext = img.getContext("2d");

var tostatus = document.getElementById('toggle');

function updatenotes() {
    if (tostatus.checked == false) {
        pap.classList.toggle('paper');
    }
    else {
        pap.classList.toggle('paper');
    }
}

function red() {
    curColor = "red";
    size = 3;
}

function black() {
    curColor = "black";
    size = 1;
}

function Clear(on) {
    if (on == 2) {
        var r = confirm("Are you sure ?!");
        if (r == true) {
            context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
            curColor = "black";
            size = 1;
        }
    }
    else if (on == 1) {
        context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        curColor = "black";
        size = 1;
    }
}
function save() {
    if (tostatus.checked) {
        drawLines();
    }
    var dataURL = canvas.toDataURL('image/jpg', 1.0);
    console.log(dataURL);
    var image = new Image();
    image.src = dataURL;
    imgcontext.drawImage(canvas, 0, 0);
    var fdataURL = img.toDataURL('image/jpg', 1.0);
    console.log(fdataURL);
    var fimage = new Image();
    fimage.src = fdataURL;
    imgcontext.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    var w = window.open("");
    w.document.write(fimage.outerHTML);
}

function drawLines(color) {
    imgcontext.globalCompositeOperation = 'source-over';
    var currentLineY = 0;
    imgcontext.lineWidth = 1;
    imgcontext.strokeStyle = "#ccc";
    imgcontext.beginPath();
    var lines = SCREEN_HEIGHT / 20;
    for (var i = 0, imax = lines; i < imax; i++) {
        currentLineY = i * 20 + 4.5;
        imgcontext.moveTo(0, currentLineY);
        imgcontext.lineTo(SCREEN_WIDTH, currentLineY);
    }
    imgcontext.stroke();
    imgcontext.beginPath();
    imgcontext.strokeStyle = '#ea206e';
    for (let j = 0; j < 3; j++) {
        var x = (j *= 5) + 60;
        imgcontext.moveTo(x, 0);
        imgcontext.lineTo(x, SCREEN_HEIGHT);
    }
    imgcontext.stroke();
}
canvas.addEventListener('touchstart', onCanvasTouchStart, false);
function onCanvasTouchStart(event) {
    if (event.touches.length == 1) {
        event.preventDefault();

        strokeStart(event.touches[0].pageX, event.touches[0].pageY);

        window.addEventListener('touchmove', onCanvasTouchMove, false);
        window.addEventListener('touchend', onCanvasTouchEnd, false);
    }
}
window.onresize = function onWindowResize() {
    if (flag) {
        var r = confirm("Rotating the screen causes the canvas to clear !");
        if (r == true) {
            SCREEN_WIDTH = window.innerWidth;
            SCREEN_HEIGHT = window.innerHeight - 40;
            Clear(1);
            canvas.setAttribute('width', SCREEN_WIDTH);
            canvas.setAttribute('height', SCREEN_HEIGHT);
            drawLines('none');
        }
        setTimeout(resetFlag, 10);
        flag = !flag;
    }
}
function resetFlag() {
    flag = true;
}
function onCanvasTouchMove(event) {
    stroke(event.touches[0].pageX, event.touches[0].pageY);
}
function saveBeforeUnload() {
    return "You have unsaved changes";
}
window.onbeforeunload = saveBeforeUnload;
function onCanvasTouchEnd(event) {
    if (event.touches.length == 0) {
        window.removeEventListener('touchmove', onCanvasTouchMove, false);
        window.removeEventListener('touchend', onCanvasTouchEnd, false);
    }
}
function strokeStart(mouseX, mouseY) {
    prevMouseX = mouseX;
    prevMouseY = mouseY;
}

function stroke(mouseX, mouseY) {
    context.lineWidth = size;
    context.strokeStyle = curColor;

    context.beginPath();
    context.moveTo(prevMouseX, prevMouseY);
    context.lineTo(mouseX, mouseY);
    context.stroke();

    prevMouseX = mouseX;
    prevMouseY = mouseY;
}
