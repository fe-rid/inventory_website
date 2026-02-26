<?php
// A simple test file that doesn't rely on config.php
echo "<h1>PHP is Working!</h1>";
echo "Current Time: " . date('Y-m-d H:i:s') . "<br>";
echo "Your IP: " . $_SERVER['REMOTE_ADDR'] . "<br>";
echo "<hr>";
echo "<h3>Next Step:</h3>";
echo "If you can see this, Apache and PHP are working correctly. <br>";
echo "Now try the database check: <a href='setup_check.php'>Click here for Database Diagnostic</a>";
