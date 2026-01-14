<?php
require_once 'config.php';

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendErrorResponse('Method not allowed', 405);
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    $required_fields = ['firstName', 'lastName', 'email', 'message'];
    foreach ($required_fields as $field) {
        if (empty($input[$field])) {
            sendErrorResponse("Field '$field' is required", 400);
        }
    }
    
    // Validate email
    if (!validateEmail($input['email'])) {
        sendErrorResponse('Invalid email address', 400);
    }
    
    // Sanitize inputs
    $firstName = sanitizeInput($input['firstName']);
    $lastName = sanitizeInput($input['lastName']);
    $email = sanitizeInput($input['email']);
    $phone = isset($input['phone']) ? sanitizeInput($input['phone']) : null;
    $travelInterest = isset($input['travelInterest']) ? sanitizeInput($input['travelInterest']) : null;
    $message = sanitizeInput($input['message']);
    $newsletter = isset($input['newsletter']) ? (bool)$input['newsletter'] : false;
    
    // Validate phone if provided
    if ($phone && !validatePhone($phone)) {
        sendErrorResponse('Invalid phone number', 400);
    }
    
    $pdo = getDBConnection();
    
    $stmt = $pdo->prepare("
        INSERT INTO contact_messages 
        (first_name, last_name, email, phone, travel_interest, message, newsletter) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    
    $result = $stmt->execute([
        $firstName,
        $lastName,
        $email,
        $phone,
        $travelInterest,
        $message,
        $newsletter
    ]);
    
    if ($result) {
        $messageId = $pdo->lastInsertId();
        sendJSONResponse([
            'success' => true,
            'message' => 'Contact message sent successfully',
            'message_id' => $messageId
        ], 201);
    } else {
        sendErrorResponse('Failed to send contact message', 500);
    }
    
} catch (Exception $e) {
    sendErrorResponse('Internal server error', 500);
}
?>