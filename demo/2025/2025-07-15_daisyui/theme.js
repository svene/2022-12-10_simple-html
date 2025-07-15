export function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
}

export function getCurrentTheme() {
    return document.documentElement.getAttribute("data-theme") || "light";
}

export function toggleTheme() {
    const current = getCurrentTheme();
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
}

export function applySystemPreference() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
}
