<?php 
include_once "../utils/connection.php";
$clickedTripId = isset($_GET['tripId']) ? $_GET['tripId'] : null;

if ($clickedTripId) {
    $stmt = $conn->prepare("SELECT * FROM TripsView WHERE tripId = ?");
    $stmt->bind_param("i", $clickedTripId);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $result = $conn->query("SELECT * FROM TripsView");
}

if ($result === false) {
    die("Error executing query: " . $conn->error);
}

$data = array();

while($row = $result->fetch_object()) {
    $trip = array(
        "tripId" => $row->tripId,
        "startDate" => $row->startDate,
        "endDate" => $row->endDate,
        "startLocation" => $row->startLocation,
        "endLocation" => $row->endLocation,
        "shipId" => $row->shipId,
        "shipName" => $row->shipName,
        "captainId" => $row->captainId,
        "imagePath" => $row->imagePath,
        "price" => $row->price,
        "rules" => $row->rules,
        "equipment" => $row->equipment,

    );

    if ($clickedTripId) {
        $trip["totalCrewSpaces"] = $row->totalCrewSpaces;
        $trip["tripDescription"] = $row->tripDescription;
        $trip["shipCrew"] = $row->shipCrew;
        $trip["captainName"] = $row->captainName;
        $trip["shipDescription"] = $row->shipDescription;
    }

    array_push($data, $trip);
}

echo json_encode($data);
?>