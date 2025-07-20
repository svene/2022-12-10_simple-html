const app = () => {

    const dialog = document.getElementById('confirm-dialog');

    dialog.addEventListener("close", (event) => {
        if (event.target.returnValue == "cancel") {
            console.log("cancel was clicked");
        } else if (event.target.returnValue == "close") {
            console.log("close was clicked");
        } else if (event.target.returnValue == "delete") {
            console.log("delete was clicked");
        } else {
            const data = JSON.parse(event.target.returnValue);
            console.log(data);
        }
    });
}
document.addEventListener('DOMContentLoaded', app);
