document.addEventListener("DOMContentLoaded", () => {
    var elems = document.querySelectorAll('.autocomplete');
    const options = {
        data: [
            {id: 12, text: "Apple"},
            {id: 13, text: "Microsoft"},
            {id: 42, text: "Google", image: 'http://placehold.it/250x250'}
        ],
    };
    var instances = M.Autocomplete.init(elems, options);
})
