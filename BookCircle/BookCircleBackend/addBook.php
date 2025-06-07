<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

file_put_contents("debug_log.txt", print_r($data, true));  // Log input to debug

if (!$data) {
    die(json_encode(["status" => "error", "message" => "No input data received!"]));
}

$title = $data['title'] ?? '';
$friend = $data['friend'] ?? '';
$dueDate = $data['dueDate'] ?? '';

$mysqli = new mysqli("localhost", "root", "", "bookcircle");

if ($mysqli->connect_error) {
    die(json_encode(["status" => "error", "message" => "DB connection failed"]));
}

$stmt = $mysqli->prepare("INSERT INTO books (title, friend, dueDate) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $title, $friend, $dueDate);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$mysqli->close();
?>
