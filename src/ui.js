class UI {
    constructor() {
        this.__callback = null;
        this.__videoElem = document.getElementById("video");
        this.__jacketElemList = document.querySelectorAll('.jacket');

        this.__listeners();
    }

    get video() {
        return this.__videoElem;
    }

    onSelectJacket(callback) {
        this.__callback = callback;
    }

    __listeners() {
        this.__jacketElemList.forEach(jacket => {
            jacket.addEventListener("click", () => {
                this.__jacketElemList.forEach(it => it.classList.remove('selected'));
    
                jacket.classList.add('selected');
                if (this.__callback) this.__callback(jacket.getAttribute("data-jacket"));
            });
        });
    }
}

export default UI;