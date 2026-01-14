<?php
require_once 'config.php';

try {
    $pdo = getDBConnection();
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Get single hotel by ID
        if (isset($_GET['id'])) {
            $id = (int)$_GET['id'];
            $stmt = $pdo->prepare("SELECT * FROM hotels WHERE id = ?");
            $stmt->execute([$id]);
            $hotel = $stmt->fetch();
            
            if (!$hotel) {
                sendErrorResponse('Hotel not found', 404);
            }
            
            // Convert amenities JSON to array
            if ($hotel['amenities']) {
                $hotel['amenities'] = json_decode($hotel['amenities'], true);
            }
            
            sendJSONResponse($hotel);
        } else {
            // Get all hotels
            $stmt = $pdo->query("SELECT * FROM hotels ORDER BY created_at DESC");
            $hotels = $stmt->fetchAll();
            
            // Convert amenities JSON to array for each hotel
            foreach ($hotels as &$hotel) {
                if ($hotel['amenities']) {
                    $hotel['amenities'] = json_decode($hotel['amenities'], true);
                }
            }
            
            sendJSONResponse($hotels);
        }
    } else {
        sendErrorResponse('Method not allowed', 405);
    }
    
} catch (Exception $e) {
    sendErrorResponse('Internal server error', 500);
}
?>