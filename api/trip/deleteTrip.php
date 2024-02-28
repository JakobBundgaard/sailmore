<?php
include_once "../utils/connection.php";

// Modtag og håndter anmodningen fra frontend
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $data = json_decode(file_get_contents("php://input"), true);
    $tripId = $data['tripId']; // Få fat i tripId fra frontend

    // Slet båden fra databasen baseret på det modtagne ID
    $sql = "DELETE FROM trips WHERE tripId = $tripId";

    if ($conn->query($sql) === TRUE) {
        echo "Trip blev slettet fra databasen.";
    } else {
        echo "Fejl ved sletning af trip: " . $conn->error;
    }
}

// Luk forbindelsen til databasen
$conn->close();
?>
