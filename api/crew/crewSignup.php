<?php
header('Content-Type: application/json');

include_once "../utils/connection.php";
include_once "./crewFunctions.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request body
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    // Check if the required data is present
    if (isset($data["crewName"], $data["crewEmail"], $data["crewPassword"], $data["crewNationality"], $data["crewSkill"], $data["crewDescription"], $data["crewGender"], $data["crewAge"], $data["crewExperience"])) {
        // Extract data from the JSON
        $name = $data["crewName"];
        $email = $data["crewEmail"];
        $pwd = $data["crewPassword"];
        $nationality = $data["crewNationality"];
        $skill = $data["crewSkill"];
        $bio = $data["crewDescription"];
        $gender = $data["crewGender"];
        $age = $data["crewAge"];
        $experience = $data["crewExperience"];

        $response = signUpCrew($conn, $name, $email, $pwd, $pwd, $nationality, $skill, $bio, $gender, $age, $experience);

        // Send the response back to the client
        echo json_encode($response);
    } else {
        // Handle missing data
        echo json_encode(["error" => "Missing required data"]);
        exit;
    }
}

?>
