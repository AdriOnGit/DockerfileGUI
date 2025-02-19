function appendContent(tag, filename) {
    $.ajax({
        url: filename,
        success: function (data) {
            $(tag).append(data);
        },
        error: function () {
            console.log("Errore nel caricamento del file: " + filename);
        }
    });
}

$(document).ready(function () {
    appendContent("#navbar-container", "../assets/html/navbar-view.html"); // Carica la navbar
    appendContent("#cards-container", "../assets/html/home-cards.html"); // Carica le tre cards
    appendContent("#descriptions-container", "../assets/html/home-descriptions.html"); // Carica le due descrizioni
    appendContent("#footer-container", "../assets/html/footer-view.html"); // Carica il footer
});

