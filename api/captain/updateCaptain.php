<?php
    include_once "../utils/connection.php";
    session_start();

    if (!isset($_SESSION['captainId'])) {
        $response['error'] = "Invalid captain ID.";
        echo json_encode($response);
        exit();
    }
    
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $data = json_decode(file_get_contents("php://input"), true);

        $capPassword = $data['captainPassword'];
        $capId = $data['captainId'];
        $capName = $data['captainName'];
        $capEmail = $data['captainEmail'];
        $capNationality = $data['captainNationality'];
        $capDescription = $data['captainDescription'];
        $capGender = $data['captainGender'];
        $capAge = $data['captainAge'];
        
        // If the password field is not empty, hash the new password
        if (!empty($capPassword)) {
            $capPassword = password_hash($capPassword, PASSWORD_DEFAULT);
        } else {
            // If the password field is empty, fetch the current password from the database
            $sql = "SELECT captainPassword FROM captain WHERE captainId = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $capId);

            if ($stmt->execute()) {
                $result = $stmt->get_result();
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $capPassword = $row['captainPassword'];
                } else {
                    $response["error"] = "failed to update captain info";

                    echo json_encode($response);
                    exit();
                }
            } else {
                $response["error"] = "failed to update captain info";

                echo json_encode($response);
                exit();
            }

            $stmt->close();
        }

        $sql = "UPDATE captain
                SET captainEmail = ?, captainPassword = ?, captainName = ?, captainAge = ?, captainGender = ?, captainNationality = ?, captainDescription = ?
                WHERE captainId = ?";
        $stmt = $conn->prepare($sql);
        
        $stmt->bind_param("sssiiisi", $capEmail, $capPassword, $capName, $capAge, $capGender, $capNationality, $capDescription, $capId);

        if (!$stmt->execute()) {
            $response["error"] = "failed to update captain info";

            echo json_encode($response);
            exit();
        }

        $stmt->close();

        $response["success"] = "updated captain info";

        echo json_encode($response);
    } else {
        $response["error"] = "failed to update captain info";

        echo json_encode($response);
    }

?>