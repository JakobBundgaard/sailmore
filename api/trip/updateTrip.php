<?php
include_once "../utils/connection.php";

// Get the input data from the request
$data = json_decode(file_get_contents("php://input"));

// Extract the data
$tripId = $data->tripId;
$startDate = $data->startDate;
$endDate = $data->endDate;
$startLocation = $data->startLocation;
$endLocation = $data->endLocation;
$totalCrewSpaces = $data->totalCrewSpaces;
$tripDescription = $data->tripDescription;
$price = $data->price;
$equipment = $data->equipment;
$rules = $data->rules;

// Prepare the SQL statement
$stmt = $conn->prepare("
    UPDATE trips
    SET startDate = COALESCE(?, startDate),
        endDate = COALESCE(?, endDate),
        startLocation = COALESCE(?, startLocation),
        endLocation = COALESCE(?, endLocation),
        totalCrewSpaces = COALESCE(?, totalCrewSpaces),
        tripDescription = COALESCE(?, tripDescription),
        price = COALESCE(?, price),
        equipment = COALESCE(?, equipment),
        rules = COALESCE(?, rules)
    WHERE tripId = ?
");

// Bind the parameters
$stmt->bind_param("ssssissssi", $startDate, $endDate, $startLocation, $endLocation, $totalCrewSpaces, $tripDescription, $price, $equipment, $rules, $tripId);

// Execute the statement
$stmt->execute();

// Check for errors
if ($stmt->error) {
    echo "Error updating record: " . $stmt->error;
} else {
    echo "Record updated successfully";
}

$stmt->close();
$conn->close();
?>