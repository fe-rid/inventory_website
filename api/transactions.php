<?php
header('Content-Type: application/json');
require_once '../includes/config.php';
check_auth_api();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $product_id = (int)$_POST['product_id'];
    $type = mysqli_real_escape_string($conn, $_POST['transaction_type']);
    $qty = (int)$_POST['quantity'];
    $user_id = $_SESSION['user_id'];

    mysqli_begin_transaction($conn);
    try {
        $sql = "INSERT INTO inventory_transactions (product_id, user_id, transaction_type, quantity) VALUES ($product_id, $user_id, '$type', $qty)";
        mysqli_query($conn, $sql);

        $operator = ($type == 'in') ? '+' : '-';
        $update_sql = "UPDATE products SET quantity = quantity $operator $qty WHERE product_id = $product_id";
        mysqli_query($conn, $update_sql);

        mysqli_commit($conn);
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        mysqli_rollback($conn);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    // Return report data
    $sql = "SELECT t.*, p.product_name, u.username FROM inventory_transactions t 
            JOIN products p ON t.product_id = p.product_id 
            JOIN users u ON t.user_id = u.user_id 
            ORDER BY transaction_date DESC";
    $result = mysqli_query($conn, $sql);
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    echo json_encode(['success' => true, 'data' => $data]);
}
?>
