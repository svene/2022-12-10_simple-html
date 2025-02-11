class superSlider extends HTMLElement {
    connectedCallback() {
        let targetEl = document.querySelector(this.getAttribute('target'));
        let unit = this.getAttribute('unit');
        // let slider = this.querySelector('input[type="range"]');
        let slider = this.querySelector('input');
        targetEl.style.setProperty('font-size', slider.value+ unit);
        slider.addEventListener("input",(e) => {
            let value = slider.value + unit;
            targetEl.style.setProperty('font-size',value);
        });
    }
}

customElements.define("super-slider", superSlider);
