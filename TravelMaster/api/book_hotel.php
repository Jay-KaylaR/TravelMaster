<?php
require_once 'config.php';

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendErrorResponse('Method not allowed', 405);
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    $required_fields = ['guestName', 'email', 'phone', 'hotelSelection', 'checkInDate', 'checkOutDate'];
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
    $guestName = sanitizeInput($input['guestName']);
    $email = sanitizeInput($input['email']);
    $phone = sanitizeInput($input['phone']);
    $hotelSelection = sanitizeInput($input['hotelSelection']);
    $checkInDate = sanitizeInput($input['checkInDate']);
    $checkOutDate = sanitizeInput($input['checkOutDate']);
    $specialRequests = isset($input['specialRequests']) ? sanitizeInput($input['specialRequests']) : null;
    
    // Validate date formats
    if (!DateTime::createFromFormat('Y-m-d', $checkInDate)) {
        sendErrorResponse('Invalid check-in date format', 400);
    }
    
    if (!DateTime::createFromFormat('Y-m-d', $checkOutDate)) {
        sendErrorResponse('Invalid check-out date format', 400);
    }
    
    // Validate check-out date is after check-in date
    if (strtotime($checkOutDate) <= strtotime($checkInDate)) {
        sendErrorResponse('Check-out date must be after check-in date', 400);
    }
    
    $pdo = getDBConnection();
    
    $stmt = $pdo->prepare("
        INSERT INTO hotel_bookings 
        (guest_name, email, phone, hotel_selection, check_in_date, check_out_date, special_requests) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    
    $result = $stmt->execute([
        $guestName,
        $email,
        $phone,
        $hotelSelection,
        $checkInDate,
        $checkOutDate,
        $specialRequests
    ]);
    
    if ($result) {
        $bookingId = $pdo->lastInsertId();
        sendJSONResponse([
            'success' => true,
            'message' => 'Hotel booking created successfully',
            'booking_id' => $bookingId
        ], 201);
    } else {
        sendErrorResponse('Failed to create hotel booking', 500);
    }
    
} catch (Exception $e) {
    sendErrorResponse('Internal server error', 500);
}
?>