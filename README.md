# Grocery Store Management System
📌 Overview
The Grocery Store Management System is a web-based application built with Flask (Python) and a local HTML/JS frontend. 
It helps manage grocery store operations by providing a dashboard for orders, products, and customers. 
The system allows store managers to track, view, and manage orders with a user-friendly interface.

# 🚀 Features

📦 Order Management – View all orders with customer details.

👤 Customer Management – Track orders linked to customers.

🛒 Product Management – Manage product details, quantities, and pricing.

⚡ AJAX-powered UI – Smooth interactions without full page reloads.

🎨 Styled Dashboard – Consistent look & feel across pages (e.g., index.html, order.html,etc).

# 📁Project Structure

```GROCEY_STORE_MANAGEMENT/
│── backend/                   # Backend (Flask + DB Layer)
│   ├── .env                   # Environment variables
│   ├── .env.example           # Example env file
│   ├── orders_dao.py          # Orders Data Access Object
│   ├── products_dao.py        # Products Data Access Object
│   ├── uom_dao.py             # Units of Measurement DAO
│   ├── sql_connection.py      # Database connection
│   ├── server.py              # Flask application entry point
│   └── __pycache__/           # Compiled Python files
│
│── ui/                        # Frontend (HTML, CSS, JS)
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   ├── custom.css
│   │   ├── sidebar-menu.css
│   │   └── style.css
│   ├── images/
│   │   └── bg.jpg
│   ├── js/
│   │   ├── custom/
│   │   │   ├── common.js
│   │   │   ├── dashboard.js
│   │   │   ├── manage-product.js
│   │   │   ├── order_details.js
│   │   │   └── order.js
│   │   └── packages/
│   │       ├── bootstrap.min.js
│   │       └── jquery.min.js
│   ├── index.html             # Dashboard page
│   ├── manage-product.html    # Product management page
│   └── order.html             # Order management page
│
│── .gitignore
│── README.md
```

# Installation

Follow these steps to set up and run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DHIKSHAMP/Grocery-Store-Management.git
   cd Grocery-Store-Management
   ```
2. **Create and activate a virtual environment (recommended):**

   ```bash
   python -m venv venv
   source venv/bin/activate      # On macOS/Linux
   venv\Scripts\activate         # On Windows
   ```
3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables:

    Rename .env.example to .env.

    Update the variables inside .env with your own values (API keys, database URL, etc.).

5. **Run the Flask application:**

   ```bash
   cd backend
   python app.py
   ```
6. **Open your browser and go to:**

    ```bash
    http://127.0.0.1:5000
    ```
    
# 📊 Example Workflow

1.Open index.html → See dashboard with order listings.

2.Add products via manage-product.html.

3.Place orders via order.html.

# 🛠️ Tech Stack

Backend: Python (Flask)

Database: SQL (via sql_connection.py)

Frontend: HTML, CSS (Bootstrap, custom), JavaScript (jQuery, AJAX)

Configuration: .env for environment variables

# 📷 Output 

## Homepage
<img width="1919" height="1079" alt="Screenshot 2025-09-01 121858" src="https://github.com/user-attachments/assets/45080f61-4150-4156-879e-f17f66015d0c" />
Project Management Page
<img width="1919" height="1079" alt="Screenshot 2025-09-01 121916" src="https://github.com/user-attachments/assets/9dd510bb-b223-4913-a037-7595e19c28e5" />
Add New Product Functionality
<img width="1919" height="1079" alt="Screenshot 2025-09-01 122029" src="https://github.com/user-attachments/assets/63dfa2f4-653c-4ef2-a50c-9bad3955a75c" />
Products list after adding new product
<img width="1919" height="1078" alt="Screenshot 2025-09-01 122038" src="https://github.com/user-attachments/assets/99bfaa0c-0094-4663-b198-093e35cc5295" />
New UOM functionality
<img width="1919" height="1079" alt="Screenshot 2025-09-01 122224" src="https://github.com/user-attachments/assets/dafe28c7-5c1d-4485-af74-28ebb3316627" />
UOM list after adding new UOM
<img width="1919" height="1079" alt="Screenshot 2025-09-01 122233" src="https://github.com/user-attachments/assets/7ee9d0cc-68d1-4167-a7d7-285148716a60" />
New Order page
<img width="1918" height="1079" alt="Screenshot 2025-09-01 130432" src="https://github.com/user-attachments/assets/951313a9-f709-449e-bc3c-11957efcb8bb" />
Ordering without name
<img width="1918" height="1079" alt="Screenshot 2025-09-01 122323" src="https://github.com/user-attachments/assets/3bc2bc2b-782d-4baf-9b66-5adee196a6f4" />
Ordering with 0 quantity
<img width="1919" height="1079" alt="Screenshot 2025-09-01 122345" src="https://github.com/user-attachments/assets/6be45d7e-8909-47e6-b782-9e2fadf0bb0a" />
Orders list after new order
<img width="1919" height="1079" alt="Screenshot 2025-09-01 122422" src="https://github.com/user-attachments/assets/3cef3bb7-6dbd-4819-b64e-a22364d8b0e9" />
Deleting an order
<img width="1919" height="1079" alt="Screenshot 2025-09-01 122433" src="https://github.com/user-attachments/assets/d1020f2d-301f-4b39-9a21-e88cf66119f5" />
After succesfull deletion of order 
<img width="1919" height="1079" alt="Screenshot 2025-09-01 122442" src="https://github.com/user-attachments/assets/323ac8e9-125d-424c-a57a-8c9ab7afa43c" />

# 🔮 Future Enhancements

Add authentication (Admin / Staff login).

Implement inventory tracking & low-stock alerts.

Generate sales reports with charts.

Online payment integration.

# 👤 Author

**DHIKSHA M P**  

🌐 GitHub: [@DHIKSHAMP](https://github.com/DHIKSHAMP)

🔗 LinkedIn: [linkedin.com/in/dhikshamp](https://linkedin.com/in/dhiksha-m-p-095028257)

🌍 Portfolio: [Portfolio](https://sites.google.com/view/dhikshacyber/about)

## ⚖️ License

This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) – see the [LICENSE](./LICENSE) file for details.

## 🌟 Contributing

💡 Got suggestions or new ideas?  
🛠️ Pull Requests are welcome!  
📧 Contact me if you'd like to collaborate.
