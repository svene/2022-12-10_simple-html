import * as tailwind from 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4.1.11/+esm';

tailwind.startWatching();

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.setAttribute('data-theme', 'dark');
} else {
    document.body.setAttribute('data-theme', 'light');
}
