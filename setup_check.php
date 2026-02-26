<?php
require_once 'includes/config.php';

echo "<h2>Inventory System Diagnostic</h2>";

// 1. Check PHP Version
echo "PHP Version: " . phpversion() . "<br>";

// 2. Check Database Connection
if ($conn) {
    echo "✅ Database Connected Successfully!<br>";
    
    // 3. Check Users Table
    $result = mysqli_query($conn, "SELECT COUNT(*) as count FROM users");
    if ($result) {
        $row = mysqli_fetch_assoc($result);
        echo "✅ Users table found. Total users: " . $row['count'] . "<br>";
        
        $admin = mysqli_query($conn, "SELECT * FROM users WHERE username = 'admin'");
        if (mysqli_num_rows($admin) > 0) {
            echo "✅ 'admin' user exists in database.<br>";
        } else {
            echo "❌ 'admin' user MISSING in database. Run schema.sql again.<br>";
        }
    } else {
        echo "❌ Users table NOT found or error: " . mysqli_error($conn) . "<br>";
    }
} else {
    echo "❌ Database Connection Failed!<br>";
}

// 4. Session Check
$_SESSION['diag_test'] = 'working';
if (isset($_SESSION['diag_test']) && $_SESSION['diag_test'] === 'working') {
    echo "✅ PHP Sessions are working correctly.<br>";
} else {
    echo "❌ PHP Sessions might be disabled or failing.<br>";
}

echo "<br><a href='index.html'>Go to Login Page</a>";
