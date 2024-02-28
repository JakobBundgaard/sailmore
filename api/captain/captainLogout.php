<?php
session_start();

// Assuming you have a logout endpoint
if (isset($_SESSION['captainId'])) {
    // Unset crew session variables
    unset($_SESSION['captainId']);
    unset($_SESSION['captainName']);
    // Add more session variables if needed

    // Destroy the session
    session_destroy();

    // Send JSON response indicating successful logout
    header('Content-Type: application/json');
    echo json_encode(['success' => 'Logout successful']);
} else {
    // If crewId is not set, return an error response
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Not logged in']);
}
?>