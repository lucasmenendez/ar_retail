import ARApp from './app'

let video = document.getElementById("video");

let app = new ARApp(video, 1024, 1024);
app.start();