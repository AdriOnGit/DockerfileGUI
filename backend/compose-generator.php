<?php
// Creazione file
$compose = "Dockerfiles/docker-compose.yml";

if (isset($_POST['dockerComposeContent'])) {
    // Prendi il contenuto in post
    $composeContent = $_POST['dockerComposeContent'];
}

// Aggiungi i contenuti alla stringa
$txt = "#Generato con Autodocker© 2025!\n\n";
$txt .= $composeContent;

// Scrivi il contenuto sul file
$file = fopen($compose, "w");
fwrite($file, $txt);
fclose($file);

// Inizia il download
header('Content-Type: text/plain');
header('Content-Disposition: attachment; filename="docker-compose.yml"');
header('Content-Length: ' . filesize("$compose"));

// Invia il contenuto del file al browser
readfile("$compose");

// Cancella il file dopo aver mandato il download
unlink($compose);
?>
