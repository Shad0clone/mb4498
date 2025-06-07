<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

$mysqli = new mysqli("localhost", "root", "", "bookcircle");

if ($mysqli->connect_error) {
    die(json_encode(["status" => "error", "message" => "DB connection failed"]));
}

// 🚀 IMPORTANT → include id!
$result = $mysqli->query("SELECT id, title, friend, dueDate FROM books");

$books = [];

while ($row = $result->fetch_assoc()) {
    $books[] = $row;
}

$mysqli->close();

echo json_encode(["books" => $books]);
?>
