<?php

include_once "../utils/connection.php";
include_once "./crewFunctions.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request body
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    // Check if the required data is present
    if (isset($data["crewEmail"], $data["crewPassword"])) {
        // Extract data from the JSON
        $email = $data["crewEmail"];
        $password = $data["crewPassword"];

        $response = loginCrew($conn, $email, $password);

        // Send the response back to the client
        echo json_encode($response);
    } else {
        // Handle missing data
        echo json_encode(["error" => "Missing required data"]);
        exit;
    }
}

?>
