<?php
session_start();
// Include your database connection code here
include_once "../utils/connection.php";
include_once "./crewFunctions.php"; 


// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get crewId from the request body
    $data = json_decode(file_get_contents('php://input'), true);
    $crewId = $data['crewId'];
  
    // Perform the deletion
    $query = "DELETE FROM crew WHERE crewId = ?";
    $statement = $conn->prepare($query);
    $statement->bind_param('i', $crewId); // 'i' represents an integer
  
    try {
      $statement->execute();
      $response = ['success' => true];

      // Unset crew session variables and destroy the session
      if (isset($_SESSION['crewId'])) {
        unset($_SESSION['crewId']);
        unset($_SESSION['crewName']);

        session_destroy();
      }

      echo json_encode($response);
    } catch (mysqli_sql_exception $e) {
      $response = ['success' => false, 'error' => $e->getMessage()];
      echo json_encode($response);
    }
  } else {
    // Invalid request method
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Invalid request method']);
  }
  ?>
