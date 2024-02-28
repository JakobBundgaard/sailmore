<?php

include_once "../utils/connection.php";

// Modtag captainId fra frontend
$captainId = $_GET['captainId']; // Dette er en simpel GET-anmodning. Brug POST eller andre metoder efter behov.

// Lav forespørgsel til databasen for at få bådoplysninger baseret på captainId
$sql = "SELECT shipName, shipModel, shipYear FROM boats WHERE captainId = '$captainId'"; // Erstat 'boats' med dit eget tabelnavn og felterne med dine egne

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Opret et associeret array til at gemme bådoplysninger
    $boatInfo = array();

    while ($row = $result->fetch_assoc()) {
        $boatInfo[] = $row;
    }

    // Returner bådoplysninger som JSON til frontend
    header('Content-Type: application/json');
    echo json_encode($boatInfo);
} else {
    echo "Ingen båd fundet med dette captainId.";
}

// Luk forbindelsen til databasen
$conn->close();
?>