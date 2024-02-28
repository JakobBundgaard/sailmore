<?php
session_start(); // Start the session
include_once "../utils/connection.php";
$response = array();
// Få indholdet af anmodningen som JSON-streng
$json_data = file_get_contents('php://input');

// Dekodér JSON-strengen til et associeret PHP-array
$data = json_decode($json_data, true);

// Hent data fra det dekoderede array
$captainId = $_SESSION["captainId"];
$shipName = isset($data['shipName']) ? $data['shipName'] : '';
$shipModel = isset($data['shipModel']) ? $data['shipModel'] : '';
$shipDescription = isset($data['shipDescription']) ? $data['shipDescription'] : '';
$shipCrew = isset($data['shipCrew']) ? $data['shipCrew'] : '';
$shipYear = isset($data['shipYear']) ? $data['shipYear'] : '';
$shipImage = "shipimage.jpg"; // Default ship image

$stmt = $conn->prepare("CALL AddShip(?, ?, ?, ?, ?, ?, ?, @shipId)");
$stmt->bind_param("sssisii", $shipName, $shipModel, $shipDescription, $shipCrew, $shipYear, $shipImage, $captainId);
$stmt->execute();

$result = $conn->query("SELECT @shipId");
$row = $result->fetch_assoc();
$shipId = $row["@shipId"];

$_SESSION["shipId"] = $shipId; // Store shipId in session for later use
// Add new data to the response
$response["shipId"] = $shipId;
$response["shipName"] = $shipName;
$response["shipModel"] = $shipModel;
$response["shipDescription"] = $shipDescription;
$response["shipCrew"] = $shipCrew;
$response["shipYear"] = $shipYear;
$response["shipImage"] = $shipImage;

echo json_encode($response); // Send the response

// Luk forbindelse til databasen
$conn->close();
?>