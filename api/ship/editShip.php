<?php
include_once "../utils/connection.php";

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

echo "Modtaget data fra frontend: ";
print_r($data);

$shipId = $data['shipId'] ?? null; // Hent shipId fra JSON-dataen

if ($data !== null && isset($data['shipName']) && isset($data['shipModel']) && isset($data['shipDescription']) && isset($data['shipCrew']) && isset($data['shipYear'])) {
    $shipName = $data['shipName'];
    $shipModel = $data['shipModel'];
    $shipDescription = $data['shipDescription'];
    $shipCrew = $data['shipCrew'];
    $shipYear = $data['shipYear'];

    // Brug forberedte udsagn
    $sql = "UPDATE ships SET shipName=?, shipModel=?, shipDescription=?, shipCrew=?, shipYear=? WHERE shipId=?";
    $stmt = $conn->prepare($sql);

    // Bind parametere og udfør udsagnet
    $stmt->bind_param("sssiii", $shipName, $shipModel, $shipDescription, $shipCrew, $shipYear, $shipId);
    
    // Udfør det forberedte udsagn
    if ($stmt->execute()) {
        echo "Opdateret informationen for skibet: $shipName";
    } else {
        echo "Fejl ved opdatering: " . $stmt->error;
    }
    
} else {
    echo "Fejl: Manglende eller ugyldige data sendt til editShip.php";
    exit(); // Stop scriptet her, da der ikke er gyldige data
}

$conn->close();
?>
