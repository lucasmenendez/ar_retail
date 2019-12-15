class Canvas {
    constructor(id, video, width, height, img) {
        this.elem = document.getElementById(id);
        this.video = video;
        
        this.elem.width = width;
        this.elem.height = height;
        this.context = this.elem.getContext('2d');

        this.anchor = null;

        this.image = new Image();
        this.image.onload = () => this.__loop();
        this.image.src = img
    }

    __loop() {
        this.context.drawImage(
            this.video, 
            0, 
            0, 
            this.elem.width, 
            this.elem.height
        );

        if (this.anchor) this.__drawImage(this.anchor);
        
        window.requestAnimationFrame(() => this.__loop() );
    }

    __drawArea({ x, y, w, h }) {
        this.context.beginPath();
        this.context.lineWidth = 10;
        this.context.strokeStyle = '#00ff04';
        this.context.rect(x, y, w, h);
        this.context.stroke();
    }

    __drawPoint({ x, y, color = '#00ff04' }) {
        this.context.beginPath();
        this.context.arc(x, y, 10, 0, 2 * Math.PI);
        this.context.fillStyle = color;
        this.context.fill();
    }

    __drawImage({ x, y }) {
        this.context.drawImage(
            this.image, 
            x - this.image.width / 2, 
            y - 15
        )
    }
}

export default Canvas;