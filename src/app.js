import Webcam from './webcam.js'
import TrunkDetector from './trunkDetector.js'
import Canvas from './canvas'

class ARApp {
    constructor(video, width, height) {
        this.video = video;
        this.webcam = new Webcam({ 
            video: this.video, 
            width: width,
            height: height
        });

        this.detector = new TrunkDetector({ video: this.video });
        this.canvas = new Canvas(
            'canvas', 
            this.video, 
            width, 
            height,
            './assets/jacket.png'
        );

        this.webcam.init();
    }

    resume() {
        console.log("Starting detector...");
        this.detector.start();

        this.detector.onDetect((center) => {
            this.canvas.anchor = center;
        });
    }

    pause() {
        console.log("Stopping detector...");

        this.detector = new TrunkDetector({ video: this.video });
    }

    confidenceArea(enabled = true) {
        let area = {
            x: (this.video.width / 2) - 250,
            y: this.video.height / 6,
            w: 500,
            h: (this.video.height * 4 / 5)
        }

        this.canvas.detectionArea = enabled ? area : null;
    }

}

export default ARApp;