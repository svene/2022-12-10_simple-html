function initGreeting() {
    const greet = (name) => console.log(`hello ${name}`);

    document.querySelectorAll("[data-greet]")
            .forEach(el => {
                greet(el.getAttribute('data-greet'));
            });
}

initGreeting();

