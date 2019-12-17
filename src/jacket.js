const Models = {
    BLACK: {
        img: './assets/black.png',
        name: 'A0129 GORE-TEX PACLITE® PRODUCT TECHNOLOGY WITH PRIMALOFT® INSULATION',
        prize: 799.00,
        url: 'https://www.stoneisland.com/es/stone-island/blazer_cod41890405tb.html'
    },
    RED: {
        img: './assets/red.png',
        name: '43031 DAVID LIGHT-TC WITH MICROPILE',
        prize: 660.00,
        url: 'https://www.stoneisland.com/es/stone-island/cazadora_cod41890734ur.html'
    },
    BROWN: {
        img: './assets/brown.png',
        name: '70631 DAVID LIGHT-TC WITH MICROPILE',
        prize: 799.00,
        url: 'https://www.stoneisland.com/es/stone-island/chaqueton_cod41890540lb.html'
    }
}

const Sizes = {
    S: 'S',
    M: 'M',
    L: 'L',
    XL: 'XL'
}

class Jacket {
    constructor(model, size, onLoad) {
        this.__current = model;
        this.__size = size;
        this.__base = {
            width: 300,
            height: 483
        }

        this.__callback = onLoad;
        this.__init();
    }

    __init() {
        this.__image = new Image();
        
        this.__image.onload = () => this.__callback(this);
        this.__image.src = this.__current.img;
        this.__image.width = this.size.width;
        this.__image.height = this.size.height;
    }

    img() {
        return this.__image
    }

    size() {
        switch(this.__size) {
            case Sizes.S:
                return {
                    width: this.__base.width - 60,
                    height: this.__base.height - 60
                }
            case Sizes.M:
                return {
                    width: this.__base.width - 40,
                    height: this.__base.height - 40
                }
            case Sizes.L:
                return {
                    width: this.__base.width - 20,
                    height: this.__base.height - 20
                }
            default:
                return this.__base
        }
    }

    offset() {
        let size = this.size();
        return {
            x: -size.width / 2,
            y: 0
        }
    }
}

export default Jacket;
export {
    Jacket,
    Models,
    Sizes
}