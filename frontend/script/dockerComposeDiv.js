function toggleDiv() {
    let checkbox = document.getElementById("composeCheckbox");
    let div = document.getElementById("dockerComposeDiv");
    let title = document.getElementById("dockerComposeTitle");

    if (checkbox.checked) {
        div.style.display = "block"; // Mostra la div
        title.style.display = "block"; // Mostra il titolo
    } else {
        div.style.display = "none"; // Nasconde la div
        title.style.display = "none"; // Mostra il titolo
    }
}