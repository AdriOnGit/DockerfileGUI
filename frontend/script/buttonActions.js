import { updatePreview, updateFormOrder, addInputs } from './inputHandler.js';

$(document).ready(function () {
    // Aggiorna FROM
    $(document).on("input", "#from", function () {
        updatePreview();
    });

    // Aggiungi LABEL
    $(document).on('click', '#addLabelbtn', function () {
        addInputs("label", "es: maintainer=name")
    });

    // Aggiungi ARG
    $(document).on('click', '#addArgbtn', function () {
        addInputs("arg", "es: TODO: aggiornare")
    });

    // Aggiungi ENV
    $(document).on('click', '#addEnvbtn', function () {
        addInputs("env", "es: TODO: aggiornare")
    });

    // Aggiungi HEALTHCHECK
    $(document).on('click', '#addHealthcheckbtn', function () {
        addInputs("healthcheck", "es: TODO: aggiornare")
    });

    // Aggiungi RUN
    $(document).on('click', '#addRunbtn', function () {
        addInputs("run", "es: apt-get update")
    });

    // Aggiungi COPY
    $(document).on('click', '#addCopybtn', function () {
        addInputs("copy", "es: TODO: aggiornare")
    });

    // Aggiungi ADD
    $(document).on('click', '#addAddbtn', function () {
        addInputs("add", "es: TODO: aggiornare")
    });

    // Aggiungi WORKDIR
    $(document).on('click', '#addWorkdirbtn', function () {
        addInputs("workdir", "es: TODO: aggiornare")
    });

    // Aggiungi USER
    $(document).on('click', '#addUserbtn', function () {
        addInputs("user", "es: TODO: aggiornare")
    });

    // Aggiungi EXPOSE
    $(document).on('click', '#addExposebtn', function () {
        addInputs("expose", "es: TODO: aggiornare")
    });

    // Aggiungi VOLUME
    $(document).on('click', '#addVolumebtn', function () {
        addInputs("volume", "es: TODO: aggiornare")
    });

    // Aggiungi CMD
    $(document).on('click', '#addCmdbtn', function () {
        addInputs("cmd", "es: TODO: aggiornare")
    });

    // Aggiungi ENTRYPOINT
    $(document).on('click', '#addEntrypointbtn', function () {
        addInputs("entrypoint", "es: TODO: aggiornare")
    });

    // Aggiungi ONBUILD
    $(document).on('click', '#addOnbuildbtn', function () {
        addInputs("onbuild", "es: TODO: aggiornare")
    });

    // Aggiungi SHELL
    $(document).on('click', '#addShellbtn', function () {
        addInputs("shell", "es: TODO: aggiornare")
    });

    // Aggiungi STOPSIGNAL
    $(document).on('click', '#addStopsignalbtn', function () {
        addInputs("stopsignal", "es: TODO: aggiornare")
    });

    // Tasto per rimuovere input
    $(document).on('click', '.remove-btn', function () {
        $(this).parent().remove();
        updatePreview();
    });

    // Aggiorna l'ordine dei comandi nei form prima della submit
    $("form").submit(function () {
        updateFormOrder();
    });
});