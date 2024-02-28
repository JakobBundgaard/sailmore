<?php
session_start();
include_once '../utils/connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['captainId'])) {
        $response = array("error" => "Invalid request, captain not deleted");
        echo json_encode($response);
        exit();
    }

    $captainId = $data['captainId'];

    $query = "DELETE FROM captain WHERE captainId = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $captainId);

    try {
        $stmt->execute();
        $response = array("success" => "Captain deleted successfully");
    } catch (mysqli_sql_exception $e) {
        $response = array("error" => $e->getMessage());
        echo json_encode($response);
        exit();
    }
    
    //destroy captain session
    if (isset($_SESSION['captainId'])) {
        // Unset captain session variables
        unset($_SESSION['captainId']);
        unset($_SESSION['captainName']);

        // Destroy the session
        session_destroy();
    }
    echo json_encode($response);
} else {
    $response = array("error" => "Invalid request method, captain not deleted");
    echo json_encode($response);
}

?>