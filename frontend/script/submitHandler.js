// Cambiare quando non si e' piu' in localhost
const my_server = 'localhost';

const main_url = `http://${my_server}:8080`;
const dockerfile_url = `http://${my_server}:8080/dockerfile-generator.php`;
const compose_url = `http://${my_server}:8080/compose-generator.php`;

// Invia i dati del form al backend con ajax per ottenere file download
function sendToBackend(url, formData, name) {
    $.ajax({
        url: url, // url dove inviare la richiesta
        type: 'POST', // Invio a backend
        data: formData, // Input del form
        xhrFields: {
            responseType: 'blob' // La risposta sara' un blob per il download
        },
        success: function (data) {
            //console.log("AJAX Success:", data);
            // Crea un blob partendo dai dati del form
            var blob = new Blob([data], { type: 'text/plain' });

            // Crea un link nascosto per il download e attivalo
            var downloadUrl = window.URL.createObjectURL(blob);
            var a = document.createElement("a");

            // Nome del file
            var filename = name;

            // Download del file
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();

            // Togli il link
            window.URL.revokeObjectURL(downloadUrl);
            a.remove();
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error - Status:", status);
            console.error("AJAX Error - Message:", error);
            console.error("AJAX Error - Response:", xhr.responseText);
            alert('Errore con la richiesta AJAX!');
        }
    });
}

$(document).ready(function () {
    // Controlla se il form e' stato inserito nella pagina ogni 100ms finche' viene trovato
    var formExists = setInterval(function () {
        if ($('#dockerfileForm').length) {
            //console.log("Form trovato!");

            // Azione tasto submit del form
            $('#dockerfileForm').submit(function (e) {
                e.preventDefault();

                // Ottieni i dati del form
                var formData = $(this).serialize();
                //console.log(formData);

                // DockerCompose insieme al DockerFile
                if ($('#composeCheckbox').is(':checked')) {
                    $('#dockerComposeModal').modal('show');

                    // Popola il contenuto del modal con il contenuto di #dockercomposePreview
                    var dockerComposeContent = document.getElementById('dockercomposePreview').textContent;
                    document.querySelector('.modal-p').textContent = dockerComposeContent;

                    $('#generateDockerCompose').click(function() {
                        // Prendi il contenuto modificato
                        var modifiedContent = document.querySelector('.modal-p').textContent;
                        //console.log(modifiedContent);
                        // Avvia download Dockerfile
                        sendToBackend(dockerfile_url, formData, "Dockerfile");
                        // Avvia download docker-compose
                        sendToBackend(compose_url, { dockerComposeContent: modifiedContent }, "docker-compose.yml");
                    });
                } else {
                    // Avvia download Dockerfile
                    sendToBackend(dockerfile_url, formData, "Dockerfile");
                }
            });

            // Ho trovato il form e ho eseguito tutto, non controllare piu'
            clearInterval(formExists);
        } else {
            console.log("Non ho trovato il form...");
        }
    }, 100);
});
