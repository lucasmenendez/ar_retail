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
            'camera', 
            this.video, 
            width, 
            height
        );

        this.__current = {
            model: null,
            size: Sizes.M
        };
    }

    start() {
        this.detector.onDetect((anchor) => {
            if (this.__current.model) {
                new Jacket(
                    this.__current.model, 
                    this.__current.size, 
                    jacket => {
                        let offset = jacket.offset();
        
                        this.canvas.anchor = {
                            img: jacket.img(),
                            x: anchor.x + offset.x,
                            y: anchor.y + offset.y - 20
                        }
                    }
                );
            }
        });
    }

    jacket(model) {
        switch(model) {
            case "black":
                this.__current.model = Models.BLACK
                break
            case "red":
                this.__current.model = Models.RED
                break
            case "brown":
                this.__current.model = Models.BROWN
                break
        }
    }

    size(size) {
        if (Object.values(Sizes).includes(size)) this.__current.size = size;
    }
}

export default ARApp;