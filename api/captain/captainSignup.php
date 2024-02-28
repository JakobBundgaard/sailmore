<?php
    // Includes
    include_once '../utils/connection.php';

    // Get raw posted data
    
    $data = json_decode(file_get_contents("php://input"));
    if ($data == null) {
        $error = " No data received from client";
        json_encode($error);
        return;
    }
    else {
        //uncomment these lines to test the api
        // $requestAccepted['accepted'] = "Request accepted";
        // echo json_encode($requestAccepted);
    }

    $email = $data->email;
    $password = $data->password;
    $passwordRepeat = $data->passwordRepeat;
    $name = $data->name;
    $age = $data->age;
    $gender = $data->gender;
    $nationality = $data->nationality;
    $bio = $data->bio;
    $ship = null;

    //checks if all fields are filled out
    if (empty($name) || empty($email) || empty($password) || empty($passwordRepeat) || empty($nationality) || empty($bio) || empty($gender) || empty($age)) {
        $response['error'] = "All fields are required.";
        echo json_encode($response);
        return;
    }

    //checks if password and password repeat are the same
    if ($password !== $passwordRepeat) {
        $response['error'] = "Passwords do not match.";
        echo json_encode($response);
        return;
    }
    
    // Check if captain already exists
    $sql = "SELECT * FROM captain WHERE captainEmail = '$email'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $error['error'] = "Captain already exists";
        echo json_encode($error);
        return;
    }

    $capSql = "INSERT INTO captain (captainEmail, captainPassword, captainName, captainAge, captainGender, captainNationality, captainDescription, shipId) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($capSql);

    // Check if statement is prepared
    if ($stmt === false) {
        die("Error: " . $conn->error);
    }

    // Check if connection is established
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // hash password
    $password = password_hash($password, PASSWORD_DEFAULT);
    $stmt->bind_param("sssiiisi", $email, $password, $name, $age, $gender, $nationality, $bio, $ship);

    // Execute statement and check if successful
    if ($stmt->execute()) {
        $success['success'] = "Captain created successfully";
        echo json_encode($success);
    } else {
        $error['error'] = "Error: " . $stmt->error;
        echo json_encode($error);
    }
    
    $stmt->close();
?>