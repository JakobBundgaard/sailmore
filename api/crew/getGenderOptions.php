<?php
include_once "crewFunctions.php";

// Create a connection to your database if needed
include_once "../utils/connection.php";

// Call the getGenderOptions function
$genderOptions = getGenderOptions($conn);

// Return the result as JSON
header('Content-Type: application/json');
echo json_encode($genderOptions);
?>
