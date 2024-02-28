<?php
include_once '../utils/connection.php';

//fetch genders from database
function getGenders($conn){
    $sql = "SELECT * FROM gender";
    $result = $conn->query($sql);

    $genders = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $gender = array(
                "genderId" => $row["genderId"],
                "genderName" => $row["gender"]
            );
            array_push($genders, $gender);
        }

        return $genders;
    }
}

// Return the skill options as JSON
header('Content-Type: application/json');
echo json_encode(getGenders($conn));
?>