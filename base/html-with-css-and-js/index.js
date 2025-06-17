function app() {
    const greet = (name) => console.log(`hello ${name}`);

    document.querySelectorAll("[data-greet]")
            .forEach(el => {
                greet(el.getAttribute('data-greet'));
            });
}

document.addEventListener('DOMContentLoaded', app);
