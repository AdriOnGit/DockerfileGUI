<?php
//header("Access-Control-Allow-Origin: *");

// Creazione file
$compose = "../html/Dockerfiles/docker-compose.yml";
$file = fopen($compose, "w");

$txt = "#Generato con Autodocker© 2025!\n\n";

// Inizio contenuto
$txt .= <<<EOD
version: '3.8'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile

EOD;

// Array contenuto volumi
$volumes = [];

// Controlla se c'e un input per VOLUME
if (isset($_POST['volume']) && !empty($_POST['volume'])) {
    // Aggiungi input all'array
    foreach ($_POST['volume'] as $volume) {
        // Rimuovi eventuali caratteri [" "]
        $cleaned_volume = str_replace(['[', ']', '"'], '', $volume);
        // Aggiungi all'array
        $volumes[] = "." . $cleaned_volume . ":" . $cleaned_volume;
    }
}

// Controlla se ci sono input per COPY
if (isset($_POST['copy']) && !empty($_POST['copy'])) {
    foreach ($_POST['copy'] as $copyEntry) {
        // Determina sorgente e destinatario nell'input
        list($source, $destination) = explode(' ', $copyEntry, 2);
        // Aggiungi all'array
        $volumes[] = "$source:$destination";
    }
}

// Controlla se ci sono input per ADD
if (isset($_POST['add']) && !empty($_POST['add'])) {
    foreach ($_POST['add'] as $addEntry) {
        // Determina sorgente e destinatario nell'input
        list($source, $destination) = explode(' ', $addEntry, 2);
        // Aggiungi all'array
        $volumes[] = "$source:$destination";
    }
}

// Aggiungi sezione volumes dentro app: solo se ci sono input nell'array
if (!empty($volumes)) {
    $txt .= "    volumes:\n";
    foreach ($volumes as $volume) {
        $txt .= "      - " . $volume . "\n";
    }
}

// Controlla se ci sono input per ENV
if (isset($_POST['env']) && !empty($_POST['env'])) {
    $txt .= "    environment:\n";
    foreach ($_POST['env'] as $envVar) {
        $txt .= "      - " . $envVar . "\n";
    }
}

// Controlla se ci sono input per EXPOSE
if (isset($_POST['expose']) && !empty($_POST['expose'])) {
    $txt .= "    expose:\n";
    foreach ($_POST['expose'] as $port) {
        $txt .= "      - \"$port\"\n";
    }

    // Aggiunge porte di default
    $txt .= "    ports:\n";
    foreach ($_POST['expose'] as $port) {
        $txt .= "      - \"$port:$port\"\n";
    }
}

// Scrivi il contenuto sul file
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
