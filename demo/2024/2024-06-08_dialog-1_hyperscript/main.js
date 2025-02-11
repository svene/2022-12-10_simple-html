// const showButton = document.getElementById("showDialog");
// const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
// const selectEl = favDialog.querySelector("select");
// const confirmBtn = favDialog.querySelector("#confirmBtn");

// "Show the dialog" button opens the <dialog> modally
// showButton.addEventListener("click", () => {
//     favDialog.showModal();
// });

// "Favorite animal" input sets the value of the submit button
/*
selectEl.addEventListener("change", (e) => {
    confirmBtn.value = selectEl.value;
});
*/

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
/*
favDialog.addEventListener("close", (e) => {
    outputBox.value =
            favDialog.returnValue === "default"
                    ? "No return value."
                    : `ReturnValue: ${favDialog.returnValue}.`; // Have to check for "default" rather than empty string
});
*/
