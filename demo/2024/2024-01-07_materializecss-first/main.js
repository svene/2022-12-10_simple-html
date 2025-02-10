// https://stackoverflow.com/questions/9899372/vanilla-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-whe
function changeOpacity() {
    var currentOpacity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--box-opacity'));

    // Toggle opacity value
    var newOpacity = currentOpacity === 1 ? 0 : 1;
    document.documentElement.style.setProperty('--box-opacity', newOpacity);
}

document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementsByClassName('tabs');
    var instance = M.Tabs.init(el);
})
