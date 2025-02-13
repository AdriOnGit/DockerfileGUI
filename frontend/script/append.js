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
    appendContent("#navbar-container", "../assets/navbar.html"); // Carica la navbar
    appendContent("#form-container", "../assets/dockerfile-form.html"); // Carica il form
    appendContent("#preview-container", "../assets/dockerfile-preview.html"); // Carica la preview
});

