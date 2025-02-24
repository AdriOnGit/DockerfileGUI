<?php
//header("Access-Control-Allow-Origin: *");

// Scrive i comandi con piu' istanze sul file
function addCommand($commandType, $commands)
{
    $commandsTxt = ''; 
    foreach ($commands as $command) {
        $commandsTxt .= strtoupper($commandType) . " " . $command . "\n";
    }
    $commandsTxt .= "\n";
    return $commandsTxt;
}

// Creazione file
$dockerfile = "../html/Dockerfiles/Dockerfile";

$txt = "#Generato con Autodocker© 2025!\n\n";

foreach ($_POST as $key => $commands) {
    // Non stampare ***Commands
    if (strpos($key, 'Commands') !== false) {
        continue;
    }
    
    // Aggiungi il comando solo se esistono input per quel comando
    if (is_array($commands)) {
        $txt .= addCommand($key, $commands); 
    }
}

$file = fopen($dockerfile, "w");
fwrite($file, $txt);
fclose($file);

// Inizia il download
header('Content-Type: text/plain');
header('Content-Disposition: attachment; filename="Dockerfile"');
header('Content-Length: ' . filesize("$dockerfile"));

// Invia il contenuto del file al browser
readfile("$dockerfile");

// Cancella il file dopo il download
unlink($dockerfile);
?>
