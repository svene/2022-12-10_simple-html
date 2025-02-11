function init() {
    customElements.define(
            "my-paragraph",
            class extends HTMLElement {
                constructor() {
                    super();
                    let template = document.getElementById("my-paragraph");
                    let templateContent = template.content;

                    const shadowRoot = this.attachShadow({ mode: "open" });
                    shadowRoot.appendChild(templateContent.cloneNode(true));
                }
            },
    );

    customElements.define(
            "element-details",
            class extends HTMLElement {
                constructor() {
                    super();
                    const template = document.getElementById(
                            "element-details-template",
                    ).content;
                    const shadowRoot = this.attachShadow({ mode: "open" });
                    shadowRoot.appendChild(template.cloneNode(true));
                }
            },
    );


}

init();
