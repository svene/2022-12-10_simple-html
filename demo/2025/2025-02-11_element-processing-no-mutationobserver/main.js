let observer;

function initGreeting() {

    document.querySelectorAll("[data-greet]")
            .forEach(el => {
                const value = el.getAttribute('data-greet');
                el.innerText = value;
            });

    window.greet2Observer = new MutationObserver((mutations) => {
        const els = document.body.querySelectorAll('div[data-greet2]:not([processed])')
        els.forEach(el => {
            const value = el.getAttribute('data-greet2');
            console.log(value);
            el.innerText = value;
            el.setAttribute('processed', '');
        });
    });
    window.greet2Observer.observe(document.documentElement, {childList: true, subtree: true});
}

function appendGreeting() {
    const el = document.querySelector("[data-greet='Boy']")
    const newEl = document.createElement('div');
    newEl.innerText = 'Greet 3';
    newEl.setAttribute('data-greet', 'Bart');
    el.after(newEl);
}

function appendGreeting2() {
    const el = document.querySelector("[data-greet2='Boy']")
    const newEl = document.createElement('div');
    newEl.innerText = 'Greet 3';
    newEl.setAttribute('data-greet2', 'Bart');
    el.after(newEl);
}


initGreeting();

