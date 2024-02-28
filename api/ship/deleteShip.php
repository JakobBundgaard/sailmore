<?php
session_start();
include_once "../utils/connection.php";


if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $data = json_decode(file_get_contents("php://input"), true);
    $shipId = isset($data['shipId']) ? $data['shipId'] : '';
    echo $shipId;    
    // Delete the images that reference the ship
    $sql = "DELETE FROM images WHERE shipId = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("i", $shipId);
        $stmt->execute();
        $stmt->close();
    } else {
        echo "Fejl ved forberedelse af SQL: " . $conn->error;
    }
    // Delete the captains that reference the ship
    $sql = "UPDATE captain SET shipId = NULL WHERE shipId = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("i", $shipId);
        $stmt->execute();
        $stmt->close();
    } else {
        echo "Fejl ved forberedelse af SQL: " . $conn->error;
    }

    // Delete the ship
    $sql = "DELETE FROM ships WHERE shipId = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("i", $shipId);

        if ($stmt->execute()) {
            echo "Båden blev slettet fra databasen.";
        } else {
            echo "Fejl ved sletning af båden: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Fejl ved forberedelse af SQL: " . $conn->error;
    }
}

$conn->close();
?>