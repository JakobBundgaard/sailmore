<?php
include_once '../utils/connection.php';

//fetch genders from database
function getNationality($conn){
    $sql = "SELECT * FROM nationality";
    $result = $conn->query($sql);

    $nationalities = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $nationality = array(
                "nationalityId" => $row["nationalityId"],
                "nationality" => $row["nation"]
            );
            array_push($nationalities, $nationality);
        }

        return $nationalities;
    }
}

// Return the skill options as JSON
header('Content-Type: application/json');
echo json_encode(getNationality($conn));
?>