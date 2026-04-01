<p align="center">
  <img src="assets/banner.png" width="100%" alt="Inventory Management System Banner" style="border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);" />
</p>

<div align="center">

# 📦 Inventory Management System
### *Streamlined Tracking for Modern Workflows*

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://javascript.info)
[![Status](https://img.shields.io/badge/Status-Project_Ready-2ea44f?style=for-the-badge)](https://github.com/fe-rid/inventory_website)

---

**A premium, lightweight solution designed to help students and small businesses manage their inventory with professional-grade precision.**

[**View Demo**](#) • [**Report Bug**](https://github.com/fe-rid/inventory_website/issues) • [**Request Feature**](https://github.com/fe-rid/inventory_website/issues)

</div>

---

## 🚀 Experience the Workflow

| 📂 Setup | 🔑 Access | 🛠️ Tools |
| :--- | :--- | :--- |
| **Simple Deployment** <br> Clone & run `npm install` | **Role Based** <br> Admin & Staff portals | **Core Stack** <br> Node.js, Express, MongoDB |
| **Data Ready** <br> Easy setup via MongoDB schemas | **Secure** <br> Password hashed logins (bcrypt) | **Responsive** <br> Desktop to Mobile |

---

## 🔑 Demo Credentials

*Note: You can use `npm run seed` to provision these default accounts in the database.*

| Role | Username | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **👑 Administrator** | `admin` | `admin123` | Full Control |
| **👤 Staff Member** | `staff` | `admin123` | View & Manage |

---

## ✨ Premium Features

<table width="100%">
  <tr>
    <td width="50%">
      <h4>📊 Smart Dashboard</h4>
      Real-time stock summaries and automated low-stock indicators to keep your business running smoothly, served by a fast Node.js API.
    </td>
    <td width="50%">
      <h4>🔄 Flow Control</h4>
      Seamless Stock-IN and Stock-OUT transaction tracking with a permanent audit trail stored securely in MongoDB.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h4>📦 Product Suite</h4>
      Clean, intuitive management of product lines with high-performance search and filtering functionalities.
    </td>
    <td width="50%">
      <h4>📱 Universal UI</h4>
      Crafted with modern CSS for a glassmorphism feel that looks stunning on every device.
    </td>
  </tr>
</table>

---

## ⚙️ Requirements & Installation

- **Node.js**: Version 14.x or higher recommended.
- **Database**: MongoDB (Local or Atlas Atlas).

### 🔧 Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/fe-rid/inventory_website.git
   cd inventory_website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and set up your variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_super_secret_session_key
   ```

4. **Seed Database (Optional):**
   ```bash
   npm run seed
   ```

5. **Start the Server:**
   ```bash
   npm start
   # Or for development with nodemon (if installed):
   # npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

<p align="center">
  <sub>Built with ❤️ for the <b>University Web Design Course Presentation</b>. Recently migrated to the Node.js/MongoDB Stack.</sub>
</p>
