<?php
/**
 * Database Configuration & Shared Functions
 */
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'inventory_db');

$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$conn) {
    // If this is an API call, return JSON. If it's a direct page visit, just show the error.
    if (strpos($_SERVER['REQUEST_URI'], '/api/') !== false) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . mysqli_connect_error()]);
    } else {
        echo "<div style='color:red; border:1px solid red; padding:10px;'>";
        echo "<strong>Database Connection Error:</strong> " . mysqli_connect_error() . "<br>";
        echo "<em>Make sure MySQL is started in XAMPP and you have created the 'inventory_db' database.</em>";
        echo "</div>";
    }
    exit();
}

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

/**
 * Check if user is logged in for API requests
 */
function check_auth_api() {
    if (!isset($_SESSION['user_id'])) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Unauthorized access. Please login.', 'redirect' => 'index.html']);
        exit();
    }
}

/**
 * Check if the user is an admin
 */
function is_admin_api() {
    return isset($_SESSION['role']) && $_SESSION['role'] === 'admin';
}
