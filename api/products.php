<?php
header('Content-Type: application/json');
require_once '../includes/config.php';
check_auth_api();

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    if (isset($_GET['id'])) {
        $id = (int)$_GET['id'];
        $res = mysqli_query($conn, "SELECT * FROM products WHERE product_id = $id");
        echo json_encode(['success' => true, 'data' => mysqli_fetch_assoc($res)]);
    } else {
        $res = mysqli_query($conn, "SELECT * FROM products ORDER BY created_at DESC");
        $products = [];
        while ($row = mysqli_fetch_assoc($res)) {
            $products[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $products]);
    }
} elseif ($method == 'POST') {
    $name = mysqli_real_escape_string($conn, $_POST['product_name']);
    $category = mysqli_real_escape_string($conn, $_POST['category']);
    $price = (float)$_POST['price'];
    $threshold = (int)$_POST['low_stock_threshold'];

    if (isset($_POST['product_id']) && !empty($_POST['product_id'])) {
        // Update
        $id = (int)$_POST['product_id'];
        $sql = "UPDATE products SET product_name='$name', category='$category', price=$price, low_stock_threshold=$threshold WHERE product_id=$id";
    } else {
        // Insert
        $sql = "INSERT INTO products (product_name, category, price, low_stock_threshold) VALUES ('$name', '$category', $price, $threshold)";
    }

    if (mysqli_query($conn, $sql)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => mysqli_error($conn)]);
    }
} elseif ($method == 'DELETE') {
    if ($_SESSION['role'] !== 'admin') {
        echo json_encode(['success' => false, 'message' => 'Admin only']);
        exit();
    }
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = (int)$_GET['id'];
    if (mysqli_query($conn, "DELETE FROM products WHERE product_id = $id")) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => mysqli_error($conn)]);
    }
}
?>
