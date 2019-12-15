class TrunkDetector {
    constructor({ 
        video, 
        callback = null, 
        options = {
            architecture: 'MobileNetV1',
            imageScaleFactor: 0.3,
            outputStride: 16,
            inputResolution: 193,
            flipHorizontal: false,
            minConfidence: 0.5,
            maxPoseDetections: 5,
            scoreThreshold: 0.5,
            nmsRadius: 20,
            detectionType: 'single',
            multiplier: 0.75,
            quantBytes: 2,
          }
    }) {
        this.video = video;
        this.callback = callback;
        this.options = options;
    }

    onDetect(callback) { this.callback = callback; }

    start() {
        this.net = ml5.poseNet(
            this.video, 
            this.options, 
            () => this.ready()
        );
    }

    ready() {
        console.log("Detector started!");

        this.net.on("pose", res => this.detected(res[0]));
    }

    calcAnchor(pose) {
        let x = [
            pose.leftShoulder.x, 
            pose.rightShoulder.x,
            pose.leftHip.x,
            pose.rightHip.x
        ];

        let y = [
            pose.leftShoulder.y, 
            pose.rightShoulder.y,
            pose.leftHip.y,
            pose.rightHip.y
        ];

        return {
            x: (Math.min (...x) + Math.max (...x)) / 2,
            y: (pose.nose.y + Math.min(...y)) / 2
        }
    }

    detected(estimation) {
        if (estimation && this.callback) {
            console.log(estimation.pose);
            let anchor = this.calcAnchor(estimation.pose);
            this.callback(anchor);
        }
    }
}

export default TrunkDetector;