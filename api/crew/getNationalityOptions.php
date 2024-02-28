<?php

include_once "../utils/connection.php";


// Fetch nationality options from the database
function getNationalityOptions($conn) {
    $sql = "SELECT * FROM nationality";
    $result = $conn->query($sql);

    $nationalities = [];
    while ($row = $result->fetch_assoc()) {
        $nationalities[] = $row['nation'];
    }

    return $nationalities;
}

// Return the nationality options as JSON
header('Content-Type: application/json');
echo json_encode(getNationalityOptions($conn));

?>
