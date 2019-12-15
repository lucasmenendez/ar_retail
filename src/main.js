import ARApp from './app'

let video = document.getElementById("video");

let app = new ARApp(video, 1024, 1024);

var enabled = false;
document.getElementById("control").addEventListener("click", () => {
    if (enabled) app.pause();
    else app.resume();

    enabled = !enabled;
});

document.getElementById("capture").addEventListener("click", () => {
    app.capture();
});