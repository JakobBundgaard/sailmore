<?php

session_start();

include_once "../utils/connection.php";
include_once "./crewFunctions.php";

if (isset($_SESSION['crewId'], $_SESSION['crewName'])) {
    $loggedInCrewInfo = getLoggedInCrewInfo($conn, $_SESSION['crewId']);

    if ($loggedInCrewInfo) {
        echo json_encode($loggedInCrewInfo);
    } else {
        echo json_encode(array('error' => 'Failed to fetch crew information'));
    }
} else {
    echo json_encode(array('error' => 'User not logged in'));
}
