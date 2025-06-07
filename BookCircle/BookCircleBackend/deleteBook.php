<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['id'])) {
    die(json_encode(["status" => "error", "message" => "No ID provided!"]));
}

$id = intval($data['id']);

$mysqli = new mysqli("localhost", "root", "", "bookcircle");

if ($mysqli->connect_error) {
    die(json_encode(["status" => "error", "message" => "DB connection failed"]));
}

$stmt = $mysqli->prepare("DELETE FROM books WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$mysqli->close();
?>
