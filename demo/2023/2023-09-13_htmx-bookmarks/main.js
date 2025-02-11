// Remove all extra htmx headers, re-add content-type.
document.body.addEventListener('htmx:configRequest', function(event) {
    event.detail.headers = [];
    event.detail.headers['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8"
});

const OG_URL = 'og:url';
const OG_IMAGE = 'og:image';
const OG_TITLE = 'og:title';
const OG_DESCRIPTION = 'og:description';

function getOgItem(doc, property) {
    const tag = doc.querySelector(`meta[property="${property}"]`);
    return tag.getAttribute('content')
}
function extractOpenGraphMetaTags(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const result = {
        url: getOgItem(doc, OG_URL),
        title: getOgItem(doc, OG_TITLE),
        description: getOgItem(doc, OG_DESCRIPTION),
        image: getOgItem(doc, OG_IMAGE),
    }

    return result;
}

document.addEventListener('htmx:beforeSwap', function (event) {
    const og = extractOpenGraphMetaTags(event.detail.serverResponse);
    document.getElementById('meta-tags').innerHTML = `
            <article>
                <hgroup>
                    <h2>${og.title}</h2>
                    <h3>${og.description}</h3>
                </hgroup>
                <a href="${og.url}" target="_blank"><img src="${og.image}"></a>
            </article>
            `;
    event.detail.shouldSwap = false;
});
