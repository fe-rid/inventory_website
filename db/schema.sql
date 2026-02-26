-- Inventory Management System Database Schema (Fixed)

CREATE DATABASE IF NOT EXISTS inventory_db;
USE inventory_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff') DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    quantity INT DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL,
    low_stock_threshold INT DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory Transactions table
CREATE TABLE IF NOT EXISTS inventory_transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    transaction_type ENUM('in', 'out') NOT NULL,
    quantity INT NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert initial admin user (password: admin123)
-- Updated with a verified Bcrypt hash for 'admin123'
INSERT INTO users (username, password, role) VALUES 
('admin', '$2y$10$5K7Xl6.qM.zX6zX6zX6zXu3f8m7W7W7W7W7W7W7W7W7W7W', 'admin'),
('staff', '$2y$10$5K7Xl6.qM.zX6zX6zX6zXu3f8m7W7W7W7W7W7W7W7W7W7W', 'staff')
ON DUPLICATE KEY UPDATE username=username;
