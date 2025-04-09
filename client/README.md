## 🚀 Features

### 👥 Authentication
- Login page using email & password
- Session/token storage
- Role-based access (admin vs employee)
- Protected routes across the app

### 🛍️ POS Interface (/pos)
- Clickable item menu (coffee, tea, etc.)
- Customer name input
- Cart sidebar with item list and total
- "Complete Order" button that submits order to backend

### 📋 Order History (/orders)
- List of all submitted orders
- Displays customer name, timestamp, items, and total
- Pulled dynamically from PostgreSQL

### 📊 Analytics Dashboard (/dashboard)
- Revenue over time (bar or line chart)
- Most popular items (pie chart)
- Orders per day (table or chart)
- Powered by SQL aggregation + chart libraries

### 📆 Employee Calendar (/calendar)
- Viewable calendar with scheduled shifts
- Upload `.ics` files (iCalendar format) to populate events
- Admin-only ability to add/edit/delete events
- Role-checking ensures only authorized access
