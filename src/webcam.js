class Webcam {
    constructor({ video, width = 640, height = 480, autostart = true}) {
        this.video = video;
        this.video.width = width;
        this.video.height = height;
        this.autostart = autostart;
    }

    async init() {
        const stream = await navigator.mediaDevices.getUserMedia({
            'audio': false,
            'video': {
                facingMode: 'environment',
                width: this.video.width,
                height: this.video.height,
            },
        });
        this.video.srcObject = stream;
    
        return new Promise((resolve) => {
            this.video.onloadedmetadata = () => {
                if (this.autostart) this.video.play();
                resolve();
            }
        });
    }
}

export default Webcam;