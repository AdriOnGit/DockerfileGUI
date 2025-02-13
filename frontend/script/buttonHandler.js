function updatePreview() {
    console.log($("#dockerfilePreview"));
    let dockerfile = "FROM " + $("#from").val() + "\n\n";
    
    // Funzione generale per aggiungere piu' istanze di comandi
    function appendCommands(inputName) {
        let command = inputName.toUpperCase(); 
        $("input[name='" + inputName + "[]']").each(function () {
            dockerfile += command + " " + $(this).val() + "\n";
        });
        dockerfile += "\n";
    }

    appendCommands('label');
    appendCommands('arg');
    appendCommands('env');
    appendCommands('run');
    appendCommands('copy');
    appendCommands('add');
    appendCommands('expose');

    $("#dockerfilePreview").text(dockerfile);
}

$(document).ready(function () {

    // Aggiungi piu' istanze del comando
    function addInput(type, placeholder) {
        let containerId = `#${type}Commands`;
        let name = type;

        let newInput = $('<div class="input-group mt-2">')
            .append(`<input type="text" class="form-control" name="${name}[]" placeholder="${placeholder}">`)
            .append('<button type="button" class="btn btn-danger remove-btn">Rimuovi</button>');
        
        $(containerId).append(newInput);
        $(`input[name='${name}[]']`).on("input", updatePreview);
    }

    // Aggiorna FROM
    $("#from").on("input", updatePreview);

    // Aggiungi LABEL
    $(document).on('click', '#addLabelbtn', function () {
        addInput("label", "es: maintainer=name")
    });

    // Aggiungi ARG
    $(document).on('click', '#addArgbtn', function () {
        addInput("arg", "es: TODO: aggiornare")
    });

    // Aggiungi ENV
    $(document).on('click', '#addEnvbtn', function () {
        addInput("env", "es: TODO: aggiornare")
    });

    // Aggiungi RUN
    $(document).on('click', '#addRunbtn', function () {
       addInput("run", "es: apt-get update")
    });

    // Aggiungi COPY
    $(document).on('click', '#addCopybtn', function () {
        addInput("copy", "es: TODO: aggiornare")
    });

    // Aggiungi ADD
    $(document).on('click', '#addAddbtn', function () {
        addInput("add", "es: TODO: aggiornare")
    });

    // Aggiungi EXPOSE
    $(document).on('click', '#addExposebtn', function () {
        addInput("expose", "es: TODO: aggiornare")
    });

    // Tasto per rimuovere input
    $(document).on('click', '.remove-btn', function () {
        $(this).parent().remove();
        updatePreview();
    });
});