import Webcam from './webcam.js'
import TrunkDetector from './trunkDetector.js'
import Canvas from './canvas'
import { Jacket, Sizes, Models } from './jacket.js'

class ARApp {
    constructor(video, width, height) {
        this.video = video;

        this.webcam = new Webcam({ 
            video: this.video, 
            width: width,
            height: height
        });
        this.webcam.init();
        
        this.detector = new TrunkDetector({ video: this.video });  
        
        this.canvas = new Canvas(
            'canvas', 
            this.video, 
            width, 
            height
        );
    }

    start() {
        this.detector.onDetect((anchor) => {
            let jacket = new Jacket(Models.BROWN, Sizes.M, () => {
                let offset = jacket.offset();
                console.log(offset);

                this.canvas.anchor = {
                    img: jacket.img(),
                    x: anchor.x + offset.x,
                    y: anchor.y + offset.y
                }
            });
        });
    }
}

export default ARApp;