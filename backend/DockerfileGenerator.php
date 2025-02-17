<?php
// Scrive i comandi con piu' istanze sul file
function addCommand($commandType, $commands, $file)
{
    foreach ($commands as $command) {
        $txt = strtoupper($commandType) . " " . $command . "\n";
        fwrite($file, $txt);
    }
    $txt = "\n";
    fwrite($file, $txt);
}

// Test per vedere input da POST
//var_dump($_POST);

// Creazione file
$dockerfile = "../html/Dockerfiles/Dockerfile";
$file = fopen($dockerfile, "w");

foreach ($_POST as $key => $commands) {
    // Non stampare ***Commands
    if (strpos($key, 'Commands') !== false) {
        continue;
    }
    
    // Aggiungi il comando solo se esistono input per quel comando
    if (is_array($commands)) {
        addCommand($key, $commands, $file);
    }
}

fclose($file);

// Inizia il download
header('Content-Type: text/plain');
header('Content-Disposition: attachment; filename="Dockerfile"');
header('Content-Length: ' . filesize("$dockerfile"));

// Invia il contenuto del file al browser
readfile("$dockerfile");
?>
