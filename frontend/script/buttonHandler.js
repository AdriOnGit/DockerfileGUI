// Aggiunge un nuovo campo di input quando si preme il tasto "Aggiungi"
function addCommandField(commandType) {
    // Crea nuovo campo di input per il comando
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = commandType + '[]'; 
    newInput.placeholder = `Inserisci il comando ${commandType.toUpperCase()}`;

    // Inserisce il nuovo campo al div appropriato
    document.getElementById(commandType + 'Commands').appendChild(newInput);

    // Inserisce <br> dopo il campo
    document.getElementById(commandType + 'Commands').appendChild(document.createElement('br'));
}

// Inserimento di piu' LABEL
document.getElementById('addLabelbtn').addEventListener('click', function() {
    addCommandField('label');
});

// Inserimento di piu' RUN
document.getElementById('addRunbtn').addEventListener('click', function() {
    addCommandField('run'); 
});

// Inserimento di piu' ARG
document.getElementById('addArgbtn').addEventListener('click', function() {
    addCommandField('arg');
});


