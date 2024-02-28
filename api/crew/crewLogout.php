<?php
session_start();

// Assuming you have a logout endpoint
if (isset($_SESSION['crewId'])) {
    // Unset crew session variables
    unset($_SESSION['crewId']);
    unset($_SESSION['crewName']);
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