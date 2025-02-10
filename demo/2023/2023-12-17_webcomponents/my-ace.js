// Seems not to work
class MyCustomElement extends HTMLElement {
    static observedAttributes = ["color", "size", "collapsed"];

    constructor() {
        super(); // Always call super first in constructor
    }

    connectedCallback() {
        console.log("Custom element added to page.");
        this._internals = this.attachInternals();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = `<style>
       :host(:--hidden) { border: dashed red; }
       </style>
       <slot>Label</slot>
       `;
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name}: ${oldValue} -> ${newValue}.`);
        if (name === 'collapsed') {
            this.collapsed = newValue;
        }
    }

    get collapsed() {
        return this._internals.states.has("--hidden");
    }

    set collapsed(flag) {
        console.log(`internal stated change to: ${flag}`)
        if (flag) {
            this._internals.states.add("--hidden");
        } else {
            this._internals.states.delete("--hidden");
        }
    }

}

customElements.define("my-custom-element", MyCustomElement);
