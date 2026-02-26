<?php
header('Content-Type: application/json');
require_once '../includes/config.php';
check_auth_api();

// Fetch summary metrics
$total_products_query = "SELECT COUNT(*) as total FROM products";
$total_products_res = mysqli_query($conn, $total_products_query);
$total_products = mysqli_fetch_assoc($total_products_res)['total'];

$low_stock_query = "SELECT COUNT(*) as low FROM products WHERE quantity <= low_stock_threshold";
$low_stock_res = mysqli_query($conn, $low_stock_query);
$low_stock_count = mysqli_fetch_assoc($low_stock_res)['low'];

$recent_transactions_query = "SELECT t.*, p.product_name FROM inventory_transactions t 
                              JOIN products p ON t.product_id = p.product_id 
                              ORDER BY transaction_date DESC LIMIT 5";
$recent_transactions_res = mysqli_query($conn, $recent_transactions_query);
$recent_transactions = [];
while ($row = mysqli_fetch_assoc($recent_transactions_res)) {
    $recent_transactions[] = $row;
}

echo json_encode([
    'success' => true,
    'user' => [
        'username' => $_SESSION['username'],
        'role' => $_SESSION['role']
    ],
    'metrics' => [
        'total_products' => $total_products,
        'low_stock_count' => $low_stock_count
    ],
    'recent_transactions' => $recent_transactions
]);
?>
