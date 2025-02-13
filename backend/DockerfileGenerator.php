<?php
// Scrive i comandi con piu' istanze sul file
function addCommand($commandType, $file) {
    if (isset($_POST[$commandType])) {
        $commands = $_POST[$commandType];

        foreach ($commands as $command) {
            $txt = strtoupper($commandType) . " " . $command . "\n"; 
            fwrite($file, $txt);
        }
        $txt = "\n";
        fwrite($file, $txt);
    }
}

// Creazione file
$dockerfile = "../html/Dockerfiles/Dockerfile";
$file = fopen($dockerfile, "w");

//Inserimento FROM
$from = $_POST["from"];
$txt = "FROM " . $from . "\n\n";
fwrite($file, $txt);

// Inserimento LABEL
addCommand('label', $file);

// Inserimento ARG
addCommand('arg', $file);

// Inserimento ENV
addCommand('env', $file);

// Inserimento RUN
addCommand('run', $file);

// Inserimento COPY
addCommand('copy', $file);

// Inserimento ADD
addCommand('add', $file);

// Inserimento EXPOSE
addCommand('expose', $file);

fclose($file);

// Inizia il download
header('Content-Type: text/plain');
header('Content-Disposition: attachment; filename="Dockerfile"');
header('Content-Length: ' . filesize("$dockerfile"));

// Invia il contenuto del file al browser
readfile("$dockerfile");
