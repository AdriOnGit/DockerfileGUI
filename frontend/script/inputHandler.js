// Aggiungi piu' istanze del comando
export function addInputs(type, placeholder, defaultValue = '') {
    let containerId = `#${type}Commands`;
    let name = type;

    if (type === 'cmd' ||
        type === 'entrypoint' ||
        type === 'stopsignal') {
        let currentInputs = $(`${containerId} .input-group`).length;
        if (currentInputs >= 1) {
            alert(`Si puo' avere solo un'istanza di "${type.toUpperCase()}".`);
            return;
        }
    } else {
        let currentInputs = $(`${containerId} .input-group`).length;
        if (currentInputs >= 10) {
            alert(`Per ridurre il numero di layer si possono aggiungere solo ${getMaxIterations()} istanze di "${type.toUpperCase()}".`);
            return;
        }
    }

    let newInput = $('<div class="input-group mt-2">')
        .append(`<input type="text" class="form-control" name="${name}[]" placeholder='${placeholder}' value='${defaultValue}' required>`)
        .append('<button type="button" class="btn btn-danger remove-btn">Rimuovi</button>');
    
        $(containerId).append(newInput);
    $(`input[name='${name}[]']`).on("input", updateDockerfilePreview);
    $(`input[name='${name}[]']`).on("input", updateComposePreview);

    updateComposePreview();
}

// Aggiorna l'ordine del form per il backend
export function updateFormOrder() {
    // Itera su ogni comando nel sortable-container
    $('.sortable-container > div').each(function () {
        let commandType = $(this).attr('id');
        let containerId = `#${commandType}`;

        // Prepara la lista di comandi
        let commands = [];
        $(`${containerId} .input-group`).each(function () {
            commands.push($(this).find('input').val());
        });

        // Rimuovi input precedenti e aggiornali con quelli nuovi
        $(`input[name='${commandType}[]']`).remove();
        commands.forEach(command => {
            $(containerId).append(`<input type="hidden" name="${commandType}[]" value="${command}">`);
        });
    });
}

// Aggiorna la preview per Dockerfile
export function updateDockerfilePreview() {
    console.log($("#dockerfilePreview"));
    let dockerfile = "FROM " + $("#from").val() + "\n\n";

    // Funzione generale per aggiungere piu' istanze di comandi
    function appendCommands(inputName) {
        let command = inputName.toUpperCase();
        let hasCommands = false;  // Traccia se esistono comandi per questo tipo

        $("input[name='" + inputName + "[]']").each(function () {
            if ($(this).val().trim() !== '') {  // Controllo input vuoto
                dockerfile += command + " ";  // Aggiunge il comando
                hasCommands = true;  // Esistono comandi di questo tipo, allora setto a true
                dockerfile += $(this).val() + "\n";  // Inserisce il valore
            }
        });

        if (hasCommands) {
            dockerfile += "\n";  // Vai a capo solo quando esistono comandi
        }
    }

    // Itera sui contenuti in sortable-container e aggiunge i comandi
    $('.sortable-container > div').each(function () {
        let commandType = $(this).attr('id'); // Prendi il tipo di comando dall'id

        // Aggiungi in base all'id
        switch (commandType) {
            case 'labelCommands':
                appendCommands('label');
                break;
            case 'argCommands':
                appendCommands('arg');
                break;
            case 'envCommands':
                appendCommands('env');
                break;
            case 'healthcheckCommands':
                appendCommands('healthcheck');
                break;
            case 'runCommands':
                appendCommands('run');
                break;
            case 'copyCommands':
                appendCommands('copy');
                break;
            case 'addCommands':
                appendCommands('add');
                break;
            case 'workdirCommands':
                appendCommands('workdir');
                break;
            case 'userCommands':
                appendCommands('user');
                break;
            case 'exposeCommands':
                appendCommands('expose');
                break;
            case 'volumeCommands':
                appendCommands('volume');
                break;
            case 'cmdCommands':
                appendCommands('cmd');
                break;
            case 'entrypointCommands':
                appendCommands('entrypoint');
                break;
            case 'onbuildCommands':
                appendCommands('onbuild');
                break;
            case 'shellCommands':
                appendCommands('shell');
                break;
            case 'stopsignalCommands':
                appendCommands('stopsignal');
                break;
        }
    });

    $("#dockerfilePreview").text(dockerfile);
}

// Aggiorna la preview per docker-compose
export function updateComposePreview() {
    let composeFile = "version: '3.8'\nservices:\n  app:\n    build:\n      context: .\n      dockerfile: Dockerfile\n";

    // Funzione generale per raccogliere più istanze di comandi
    function appendCommands(inputName) {
        let items = [];

        $("input[name='" + inputName + "[]']").each(function () {
            let value = $(this).val().trim();
            if (value !== '') {
                // Rimuovi eventuali caratteri [ ] e " dalle stringhe
                value = value.replace(/[\[\]"]/g, '');
                items.push(value);
            }
        });

        return items;
    }

    // Funzione per creare e aggiungere sezioni generiche
    function appendSection(sectionName, items) {
        if (items.length > 0) {
            composeFile += "    " + sectionName + ":\n";
            items.forEach(function (item) {
                composeFile += "      - " + item + "\n";
            });
        }
    }
    
    // Aggiungi Volumi
    let volumes = appendCommands('volume');
    volumes = volumes.map(volume => `.${volume}:${volume}`);
    
    // Aggiungi COPY come volumi
    let copies = appendCommands('copy');
    copies.forEach(copy => {
        let [source, destination] = copy.split(' ', 2); // Separa la sorgente dalla destinazione
        volumes.push(`${source}:${destination}`);
    });

    // Aggiungi ADD come volumi
    let adds = appendCommands('add');
    adds.forEach(add => {
        let [source, destination] = add.split(' ', 2); // Separa la sorgente dalla destinazione
        volumes.push(`${source}:${destination}`);
    });

    appendSection('volumes', volumes);

    // Aggiungi env e expose come prima
    let envVars = appendCommands('env');
    appendSection('environment', envVars);

    let exposedPorts = appendCommands('expose');
    appendSection('expose', exposedPorts);

    // Se EXPOSE è stato aggiunto, aggiungi anche la sezione PORTS
    if (exposedPorts.length > 0) {
        composeFile += "    ports:\n";
        exposedPorts.forEach(function (port) {
            composeFile += "      - \"" + port + ":" + port + "\"\n";
        });
    }

    // Visualizza l'anteprima del file docker-compose.yml
    $("#dockercomposePreview").text(composeFile);
}
