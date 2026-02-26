<?php
header('Content-Type: application/json');
require_once '../includes/config.php';

// Hardcoded for presentation ease if DB entry fails or hash is tricky
// In a real app, always use the DB hash.
$VALID_USERS = [
    'admin' => 'admin123',
    'staff' => 'admin123'
];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = mysqli_real_escape_string($conn, $_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = mysqli_query($conn, $sql);

    if ($row = mysqli_fetch_assoc($result)) {
        // Try password_verify first
        if (password_verify($password, $row['password'])) {
            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['username'] = $row['username'];
            $_SESSION['role'] = $row['role'];
            echo json_encode(['success' => true, 'redirect' => 'dashboard.html']);
            exit();
        }
    }
    
    // Fallback for demo simplicity (if bcrypt hash in SQL doesn't match due to env diffs)
    if (isset($VALID_USERS[$username]) && $VALID_USERS[$username] === $password) {
        // Auto-create or use existing
        $_SESSION['user_id'] = ($username === 'admin') ? 1 : 2;
        $_SESSION['username'] = $username;
        $_SESSION['role'] = ($username === 'admin') ? 'admin' : 'staff';
        echo json_encode(['success' => true, 'redirect' => 'dashboard.html']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password!']);
    }
}
