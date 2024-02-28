<?php

include_once "../utils/connection.php";

// Fetch skill options from the database
function getSkillOptions($conn) {
    $sql = "SELECT * FROM skills";
    $result = $conn->query($sql);

    $skills = [];
    while ($row = $result->fetch_assoc()) {
        $skills[] = $row['skill'];
    }

    return $skills;
}

// Return the skill options as JSON
header('Content-Type: application/json');
echo json_encode(getSkillOptions($conn));

?>
