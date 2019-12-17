class UI {
    constructor() {
        this.__callbackJacket = null;
        this.__callbackSize = null;
        this.__videoElem = document.getElementById('video');
        this.__jacketElemList = document.querySelectorAll('.jacket');
        this.__currentJacketElem = document.getElementById('current-jacket');
        this.__purchaseLinkElem = document.getElementById('purchase-link');
        this.__sizesElemList = document.querySelectorAll('.size-selector');

        this.__listeners();
    }

    get video() {
        return this.__videoElem;
    }

    onSelectJacket(callback) {
        this.__callbackJacket = callback;
    }

    onSelectSize(callback) {
        this.__callbackSize = callback;
    }

    __listeners() {
        this.__jacketElemList.forEach(jacket => {
            jacket.addEventListener('click', () => this.__jacketSelected(jacket));
        });

        this.__sizesElemList.forEach(size => {
            size.addEventListener('click', () => this.__sizeSelected(size));
        })
    }

    __jacketSelected(jacket) {
        this.__jacketElemList.forEach(it => it.classList.remove('selected'));
        jacket.classList.add('selected');

        if (this.__callbackJacket) {
            let model = jacket.getAttribute('data-model');
            let url = jacket.getAttribute('data-url');

            this.__currentJacketElem.classList.add('show');
            this.__purchaseLinkElem.setAttribute('href', url);

            this.__callbackJacket(model);
        }
    }

    __sizeSelected(size) {
        this.__sizesElemList.forEach(it => it.classList.remove('current'));
        size.classList.add('current');

        if (this.__callbackSize) this.__callbackSize(size.getAttribute('data-value'))
    }
}

export default UI;