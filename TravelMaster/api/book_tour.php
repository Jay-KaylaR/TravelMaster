<?php
require_once 'config.php';

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendErrorResponse('Method not allowed', 405);
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    $required_fields = ['fullName', 'email', 'phone', 'numberOfTravelers', 'preferredTour', 'preferredDate'];
    foreach ($required_fields as $field) {
        if (empty($input[$field])) {
            sendErrorResponse("Field '$field' is required", 400);
        }
    }
    
    // Validate email
    if (!validateEmail($input['email'])) {
        sendErrorResponse('Invalid email address', 400);
    }
    
    // Validate phone
    if (!validatePhone($input['phone'])) {
        sendErrorResponse('Invalid phone number', 400);
    }
    
    // Sanitize inputs
    $fullName = sanitizeInput($input['fullName']);
    $email = sanitizeInput($input['email']);
    $phone = sanitizeInput($input['phone']);
    $numberOfTravelers = (int)$input['numberOfTravelers'];
    $preferredTour = sanitizeInput($input['preferredTour']);
    $preferredDate = sanitizeInput($input['preferredDate']);
    $specialRequirements = isset($input['specialRequirements']) ? sanitizeInput($input['specialRequirements']) : null;
    
    // Validate date format
    if (!DateTime::createFromFormat('Y-m-d', $preferredDate)) {
        sendErrorResponse('Invalid date format', 400);
    }
    
    $pdo = getDBConnection();
    
    $stmt = $pdo->prepare("
        INSERT INTO tour_bookings 
        (full_name, email, phone, number_of_travelers, preferred_tour, preferred_date, special_requirements) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    
    $result = $stmt->execute([
        $fullName,
        $email,
        $phone,
        $numberOfTravelers,
        $preferredTour,
        $preferredDate,
        $specialRequirements
    ]);
    
    if ($result) {
        $bookingId = $pdo->lastInsertId();
        sendJSONResponse([
            'success' => true,
            'message' => 'Tour booking created successfully',
            'booking_id' => $bookingId
        ], 201);
    } else {
        sendErrorResponse('Failed to create tour booking', 500);
    }
    
} catch (Exception $e) {
    sendErrorResponse('Internal server error', 500);
}
?>