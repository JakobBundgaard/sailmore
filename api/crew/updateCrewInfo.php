<?php

include_once "../utils/connection.php";
include_once "./crewFunctions.php"; // Include your other functions, including isCrewIdExists and getGenderOptions

session_start();

// Check if the crewId is set in the session
if (!isset($_SESSION['crewId'])) {
    // Return an error response or handle the case where the crew member is not logged in
    $response['error'] = "Invalid crew ID.";
    echo json_encode($response);
    exit();
}

// Get JSON data from the request body
$data = json_decode(file_get_contents('php://input'), true);

// Validate crew ID
if (!isset($data['crewId']) || !isCrewIdExists($conn, $data['crewId'])) {
    $response['error'] = "Invalid crew ID.";
    echo json_encode($response);
    exit();
}

// Fetch the existing hashed password from the database
$sqlPassword = "SELECT crewPassword FROM crew WHERE crewId = ?";
$stmtPassword = $conn->prepare($sqlPassword);
$stmtPassword->bind_param("i", $data['crewId']);
$stmtPassword->execute();
$stmtPassword->bind_result($existingPassword);
$stmtPassword->fetch();
$stmtPassword->close();

// Validate other data as needed

// Hash the password if provided; otherwise, use the existing hashed password
$hashedPassword = !empty($data['crewPassword']) ? password_hash($data['crewPassword'], PASSWORD_DEFAULT) : $existingPassword;

// Update crew information
$sql = "UPDATE crew
        SET crewName = ?, crewAge = ?, crewEmail = ?, crewGender = ?, crewNationality = ?,
            crewExperience = ?, crewDescription = ?, crewPassword = ?
        WHERE crewId = ?";

$stmt = $conn->prepare($sql);

$crewSkill = implode(',', $data['crewSkill']);

// Convert nationality and gender values to IDs if they are provided as values
$data['crewNationality'] = convertToNationalityId($conn, $data['crewNationality']);
$data['crewGender'] = convertToGenderId($conn, $data['crewGender']);

$stmt->bind_param("sisiisssi", $data['crewName'], $data['crewAge'], $data['crewEmail'], $data['crewGender'],
    $data['crewNationality'], $data['crewExperience'], $data['crewDescription'], $hashedPassword, $data['crewId']);

$response = array();

if ($stmt->execute()) {
    $response['success'] = "Crew information updated successfully.";
} else {
    $response['error'] = "Error updating crew information: " . $stmt->error;
}

$stmt->close();

echo json_encode($response);

// Convert gender value to genderId
function convertToGenderId($conn, $genderValue) {
    $genderId = null;
    $sql = "SELECT genderId FROM gender WHERE gender = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $genderValue);
    $stmt->execute();
    $stmt->bind_result($genderId);

    if ($stmt->fetch()) {
        return $genderId;
    } else {
        return $genderValue;
    }
}

// Convert nationality value to nationalityId
function convertToNationalityId($conn, $nationalityValue) {
    $nationalityId = null;
    $sql = "SELECT nationalityId FROM nationality WHERE nation = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $nationalityValue);
    $stmt->execute();
    $stmt->bind_result($nationalityId);

    if ($stmt->fetch()) {
        return $nationalityId;
    } else {
        return $nationalityValue;
    }
}
?>
