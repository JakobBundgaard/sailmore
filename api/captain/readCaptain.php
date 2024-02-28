<?php

include_once "../utils/connection.php";
$data = json_decode(file_get_contents('php://input'), true);
$clickedCaptainId = isset($data['clickedCaptainId']) ? $data['clickedCaptainId'] : (isset($data['sessionCaptainId']) ? $data['sessionCaptainId'] : null);
    $sql = "SELECT captain.*, nationality.nation as nationalityName, gender.gender as genderName, ships.shipName as shipName, ships.shipCrew as shipCrew, ships.shipDescription as shipDescription, ships.shipModel as shipModel, ships.shipYear as shipYear
        FROM captain
        LEFT OUTER JOIN nationality ON captain.captainNationality = nationality.nationalityId 
        LEFT OUTER JOIN gender ON captain.captainGender = gender.genderId 
        LEFT OUTER JOIN ships ON captain.shipId = ships.shipId
        WHERE captain.captainId = '$clickedCaptainId'";

        $result = $conn->query($sql);
        if (!$result) {
            die('Invalid query: ' . mysqli_error($conn));
        }

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();

            echo json_encode($row);
        } else {
            echo json_encode(array('error' => 'Failed to fetch captain information'));
        }
?>