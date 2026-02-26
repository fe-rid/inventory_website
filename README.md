# 📦 Inventory Management System

A clean, web-based inventory tracking system built with PHP and MySQL. Designed for students and small businesses to manage stock, track transactions, and view low-stock alerts.

## 🚀 Quick Start (XAMPP/WAMP)

1.  **Move Files**: Copy the `inventory` folder to your server's web root (e.g., `C:\xampp\htdocs\`).
2.  **Database**: 
    - Open `phpMyAdmin` and create a database named `inventory_db`.
    - Import the file: `db/schema.sql`.
3.  **Run**: Visit `http://localhost/inventory/index.html` in your browser.

## 🔑 Login Credentials

| Role | Username | Password |
| :--- | :--- | :--- |
| **Admin** | `admin` | `admin123` |
| **Staff** | `staff` | `admin123` |

## ✨ Key Features

-   **Dashboard**: Overview of total products and low-stock indicators.
-   **Product Management**: Add, Edit, and Delete (Admin only) products.
-   **Stock Flow**: Process Stock IN and Stock OUT transactions.
-   **Reports**: Full transaction history log with timestamps.
-   **Responsive**: Optimized for Desktop, Tablet, and Mobile.
-   **Security**: Role-based access and password hashing.

## 🛠️ Built With

-   **Frontend**: HTML5, CSS3, JavaScript (Fetch API)
-   **Backend**: PHP 8 (Procedural API)
-   **Database**: MySQL

---
*Created for University Web Design Course Presentation.*
