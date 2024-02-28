<?php

include_once "../utils/connection.php";

// Retrieve search criteria from the request
$date = isset($_GET['date']) ? $_GET['date'] : '';
$location = isset($_GET['location']) ? $_GET['location'] : '';
$maxPrice = isset($_GET['maxPrice']) ? $_GET['maxPrice'] : '';

// Initialize an array to store the conditions
$conditions = [];

// Build conditions based on provided criteria
if (!empty($date)) {
    $conditions[] = "startDate >= '$date'";
}

if (!empty($location)) {
    $conditions[] = "startLocation LIKE '%$location%'";
}

if (!empty($maxPrice)) {
    $conditions[] = "price <= $maxPrice";
}

// Construct the WHERE clause
$whereClause = implode(' AND ', $conditions);

// Construct the full query, including the ship name
$query = "SELECT trips.*, ships.shipName FROM trips LEFT JOIN ships ON trips.shipId = ships.shipId";

// Add WHERE clause if conditions are provided
if (!empty($whereClause)) {
    $query .= " WHERE $whereClause";
}

// Execute the query
$result = mysqli_query($conn, $query);

// Convert the result to an associative array
$trips = mysqli_fetch_all($result, MYSQLI_ASSOC);

// Close the database connection
mysqli_close($conn);

// Return the results as JSON
echo json_encode($trips);
?>
