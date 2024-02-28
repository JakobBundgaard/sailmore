<?php

include_once "dbConfig.php";
    
    $conn = new mysqli($server, $user, $password, $database);

    if(!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
?>