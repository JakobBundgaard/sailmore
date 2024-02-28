<?php
    
session_start();

require_once "../utils/connection.php";

$data = json_decode(file_get_contents('php://input'), true);
$captainEmail = $data['captainEmail'];
$captainPassword = $data['captainPassword'];

$sql = "SELECT * FROM captain WHERE captainEmail = '$captainEmail'";
$result = mysqli_query($conn, $sql);

if ($result != null && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $hashed_password = $row['captainPassword'];

    if (password_verify($captainPassword, $hashed_password) == true) {
        // Session with captainId and captainName
        $_SESSION['captainId'] = $row['captainId'];
        $_SESSION['captainName'] = $row['captainName'];
        $_SESSION['shipId'] = $row['shipId'];
        
        $success['success'] = "Password is valid!";
        $success['captainId'] = $row['captainId'];
        $success['captainName'] = $row['captainName'];
        $success['shipId'] = $row['shipId'];
        echo json_encode($success);
    } else {
        $error['error'] = "Invalid password!";
        echo json_encode($error);
    }
} else {
    $error['error'] = "Email not found!";
    echo json_encode($error);
}

?>