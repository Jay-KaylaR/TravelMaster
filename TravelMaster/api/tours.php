<?php
require_once 'config.php';

try {
    $pdo = getDBConnection();
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Get single tour by ID
        if (isset($_GET['id'])) {
            $id = (int)$_GET['id'];
            $stmt = $pdo->prepare("SELECT * FROM tours WHERE id = ?");
            $stmt->execute([$id]);
            $tour = $stmt->fetch();
            
            if (!$tour) {
                sendErrorResponse('Tour not found', 404);
            }
            
            // Convert amenities JSON to array if needed
            sendJSONResponse($tour);
        } else {
            // Get all tours
            $stmt = $pdo->query("SELECT * FROM tours ORDER BY created_at DESC");
            $tours = $stmt->fetchAll();
            sendJSONResponse($tours);
        }
    } else {
        sendErrorResponse('Method not allowed', 405);
    }
    
} catch (Exception $e) {
    sendErrorResponse('Internal server error', 500);
}
?>