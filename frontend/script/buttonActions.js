import { updateDockerfilePreview, addInputs, updateComposePreview } from './inputHandler.js';

// Cambiare quando non si e' piu' in localhost
const my_server = 'localhost';

const main_url = `http://${my_server}:8080`;

$(document).ready(function () {
    // Aggiorna FROM
    $(document).on("input", "#from", function () {
        updateDockerfilePreview();
    });

    // Aggiungi LABEL
    $(document).on('click', '#addLabelbtn', function () {
        addInputs("label", "es: maintainer=nome.cognome@email.com")
    });

    // Aggiungi ARG
    $(document).on('click', '#addArgbtn', function () {
        addInputs("arg", "es: VERSION=1.0")
    });

    // Aggiungi ENV
    $(document).on('click', '#addEnvbtn', function () {
        addInputs("env", "es: APP_ENV=production")
    });

    // Aggiungi HEALTHCHECK
    $(document).on('click', '#addHealthcheckbtn', function () {
        addInputs("healthcheck", 'es: ["CMD", "curl", "--fail", "http://mio-sito.com", "||", "exit", "1"]')
    });

    // Aggiungi RUN
    $(document).on('click', '#addRunbtn', function () {
        addInputs("run", "es: apt-get update -y")
    });

    // Aggiungi COPY
    $(document).on('click', '#addCopybtn', function () {
        addInputs("copy", "es: ./test.txt /dir/")
    });

    // Aggiungi ADD
    $(document).on('click', '#addAddbtn', function () {
        addInputs("add", "es: test.txt /dir/")
    });

    // Aggiungi WORKDIR
    $(document).on('click', '#addWorkdirbtn', function () {
        addInputs("workdir", "es: /dir")
    });

    // Aggiungi USER
    $(document).on('click', '#addUserbtn', function () {
        addInputs("user", "es: username")
    });

    // Aggiungi EXPOSE
    $(document).on('click', '#addExposebtn', function () {
        addInputs("expose", "es: 80")
    });

    // Aggiungi VOLUME
    $(document).on('click', '#addVolumebtn', function () {
        addInputs("volume", 'es: ["/data"]')
    });

    // Aggiungi CMD
    $(document).on('click', '#addCmdbtn', function () {
        addInputs("cmd", 'es: ["echo", "Hello World"]')
    });

    // Aggiungi ENTRYPOINT
    $(document).on('click', '#addEntrypointbtn', function () {
        addInputs("entrypoint", 'es: ["python3", "app.py"]');
    });

    // Aggiungi ONBUILD
    $(document).on('click', '#addOnbuildbtn', function () {
        addInputs("onbuild", `es: RUN echo "Verrò eseguito dopo!"`)
    });

    // Aggiungi SHELL
    $(document).on('click', '#addShellbtn', function () {
        addInputs("shell", 'es: ["/bin/bash", "-c"]')
    });

    // Aggiungi STOPSIGNAL
    $(document).on('click', '#addStopsignalbtn', function () {
        addInputs("stopsignal", "es: SIGTERM")
    });

    // Tasto per rimuovere input
    $(document).on('click', '.remove-btn', function () {
        $(this).parent().remove();
        updateDockerfilePreview();
        updateComposePreview();
    });

    // $(document).on('click', '#nodejsBtn', function () {
    //     console.log("Ho cliccato nodejs");
    //     // Prendi i dati del file
    //     $.ajax({
    //         url: `${main_url}/dockerfileTemplates/nodejs.json`,
    //         type: 'GET', 
    //         dataType: 'json',
    //         success: function(data) {              
    //             // Inserisci i value
    //             $('#from').val(data.from);
    //         },
    //         error: function(xhr, status, error) {
    //             console.error('Error fetching JSON:', error);
    //         }
    //     });

    // });
});