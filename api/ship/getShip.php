<?php
include_once "../utils/connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $shipId = $_GET['id'];

    // Forbered udsagnet med en parameter (:id)
    $sql = "SELECT * FROM ships WHERE shipId = ?";
    
    // Forbered udsagnet
    $stmt = $conn->prepare($sql);
    
    // Bind parametere og udfør udsagnet
    $stmt->bind_param("i", $shipId); // "i" indikerer, at det er en integer
    
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $boat_data = $result->fetch_assoc();
        header('Content-Type: application/json');
        echo json_encode($boat_data);
    } else {
        $response = array("error" => "Ingen båd fundet med det givne ID.");
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    
    $stmt->close();
} else {
    $response = array("error" => "ID ikke specificeret i forespørgslen.");
    header('Content-Type: application/json');
    echo json_encode($response);
}

$conn->close();
?>
