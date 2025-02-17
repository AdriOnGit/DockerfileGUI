function appendContent(tag, filename) {
    $.ajax({
        url: filename,
        success: function (data) {
            $(tag).append(data);
        },
        error: function (xhr, status, error) {
            console.log("Errore nel caricamento del file: " + filename);
        }
    });
}

$(document).ready(function () {
    appendContent("#navbar-container", "../assets/html/navbar-view.html"); // Carica la navbar
    appendContent("#form-container", "../assets/html/dockerfile-form-view.html"); // Carica il form
    appendContent("#preview-container", "../assets/html/dockerfile-preview-view.html"); // Carica la preview
    appendContent("#footer-container", "../assets/html/footer-view.html"); // Carica il footer
});

