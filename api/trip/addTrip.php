<?php
include_once "../utils/connection.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $shipId = $_SESSION["shipId"];
    $startDate = $_POST["startDate"];
    $endDate = $_POST["endDate"];
    $startLocation = $_POST["startLocation"];
    $endLocation = $_POST["endLocation"];
    $totalCrewSpaces = 0;
    $tripDescription = $_POST["tripDescription"];
    $price = $_POST["price"];
    $equipment = $_POST["equipment"];
    $rules = $_POST["rules"];

    $query = "INSERT INTO trips (shipId, startDate, endDate, startLocation, endLocation, totalCrewSpaces, tripDescription, price, equipment, rules) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "issssisiss", $shipId, $startDate, $endDate, $startLocation, $endLocation, $totalCrewSpaces, $tripDescription, $price, $equipment, $rules);
    $result = mysqli_stmt_execute($stmt);
    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => 'Query failed: ' . mysqli_error($conn)]);
        exit();
    }
};

?>