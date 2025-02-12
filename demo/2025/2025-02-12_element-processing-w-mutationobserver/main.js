function initGreeting() {

    document.querySelectorAll("[data-greet]")
            .forEach(el => {
                const value = el.getAttribute('data-greet');
                el.innerText = value;
            });

    window.greetObserver = new MutationObserver((mutations) => {
        const els = document.body.querySelectorAll('div[data-greet]:not([processed])')
        els.forEach(el => {
            const value = el.getAttribute('data-greet');
            console.log(value);
            el.innerText = value;
            el.setAttribute('processed', '');
        });
    });
    window.greetObserver.observe(document.documentElement, {childList: true, subtree: true});
}

function appendGreeting() {
    const el = document.querySelector("[data-greet='Boy']")
    const newEl = document.createElement('div');
    newEl.innerText = 'Greet 3';
    newEl.setAttribute('data-greet', 'Bart');
    el.after(newEl);
}


initGreeting();

