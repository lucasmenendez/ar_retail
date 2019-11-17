import '@babel/polyfill';
import * as posenet from '@tensorflow-models/posenet';

const videoWidth = 640;
const videoHeight = 480;

function isMobile() { 
    if (
        navigator.userAgent.match(/Android/i) || 
        navigator.userAgent.match(/webOS/i) || 
        navigator.userAgent.match(/iPhone/i) || 
        navigator.userAgent.match(/iPad/i) || 
        navigator.userAgent.match(/iPod/i) || 
        navigator.userAgent.match(/BlackBerry/i) || 
        navigator.userAgent.match(/Windows Phone/i)
    ) return true;
    else return false;
}
console.log(isMobile());

async function initWebcam() {
    const video = document.getElementById('video');
    video.width = videoWidth;
    video.height = videoHeight;

    const stream = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {
            facingMode: 'environment',
            width: videoWidth,
            height: videoHeight,
        },
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        }
    });
}

async function initVideo() {
    const video = await initWebcam();
    video.play();
  
    return video;
}

async function detectPose(video, net) {
    const pose = await net.estimateSinglePose(video, {
        flipHorizontal: !isMobile()
    });

    return new Promise((resolve) => {
        let keypoints = pose.keypoints.slice(5, 13);
        resolve(keypoints);
    })
}

function drawPoints(points) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.position.x, point.position.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'aqua';
        ctx.fill();
    });
}

async function init() {
    const net = await posenet.load({
        architecture: 'ResNet50',
        outputStride: 32,
        inputResolution: { width: 257, height: 200 },
        quantBytes: 2
    });

    let video = await initVideo();
    setInterval(() => {
        detectPose(video, net).then(poses => {
            drawPoints(poses);
        });
    }, 250);
}

init();