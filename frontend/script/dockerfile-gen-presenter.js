// Aggiungi il file indicato
function appendContent(tag, filename) {
    $.ajax({
        url: filename,
        success: function (data) {
            $(tag).append(data);
            
            // Inizializza tooltip
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
        },
        error: function () {
            console.log("Errore nel caricamento del file: " + filename);
        }
    });
}

$(document).ready(function () {
    appendContent("#navbar-container", "../assets/html/navbar-view.html"); // Carica la navbar
    appendContent("#form-container", "../assets/html/dockerfile-form-view.html"); // Carica il form
    appendContent("#preview-container", "../assets/html/dockerfile-preview-view.html"); // Carica la preview
    appendContent("#footer-container", "../assets/html/footer-view.html"); // Carica il footer
    appendContent("#dockercompose-edit", "../assets/html/dockercompose-edit.html"); // Carica il modal
});

