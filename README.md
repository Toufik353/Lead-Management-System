📞 Lead Management System🚀 Project OverviewThe Lead Management System is a web-based application designed to help businesses efficiently track and manage their leads. It provides a streamlined workflow for handling customer interactions, updating lead statuses, scheduling follow-ups, and maintaining call logs.
🔥 Key Features
1️⃣ User Authentication & DashboardSecure login system using email and password authentication.
Personalized dashboard displaying assigned leads.
2️⃣ Lead ManagementView a list of assigned leads with key details:
Name
Phone Number
Lead Source
Search & filter leads based on:
✅ Call Status (Connected / Not Connected)
✅ Lead Status (Interested, Not Interested, Admission Taken)
✅ Follow-up Date
3️⃣ Call Disposition & RemarksUpdate Call Status: Connected / Not Connected
Update Lead Status: Interested, Not Interested, Admission Taken
Add call remarks after every interaction.
4️⃣ Call Back SchedulingSchedule a call back by selecting a date & time.
Receive notifications/reminders for upcoming follow-ups.
5️⃣ Basic Admin Panel (Optional - Bonus Feature)Assign leads to users.
View call logs & lead updates.
🛠️ Tech StackFrontend: React.js, Bootstrap / Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
State Management: Redux (if needed)

📂 Project Structure📦 lead-management-system
├── 📁 client (Frontend)
│   ├── 📂 src
│   │   ├── 📁 components  # Reusable UI Components
│   │   ├── 📁 pages       # Dashboard, Leads, Profile, etc.
│   │   ├── 📁 utils       # Helper functions
│   │   ├── App.js        # Main App Component
│   │   ├── index.js      # Entry Point
│   ├── package.json
│   ├── README.md
│
├── 📁 server (Backend)
│   ├── 📂 controllers    # Business logic
│   ├── 📂 models         # Database schemas
│   ├── 📂 routes         # API endpoints
│   ├── server.js        # Main server file
│   ├── package.json
│
├── .gitignore
├── README.md

🔧 Installation & Setup
1️⃣ Clone the repositorygit clone https://github.com/your-username/lead-management-system.git
cd lead-management-system
2️⃣ Install dependenciesFrontendcd client
npm installBackendcd server
npm install
3️⃣ Configure Environment VariablesCreate a .env file in the server folder and add the following:
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4️⃣ Run the ApplicationStart Backend Servercd server
npm startStart Frontend React Appcd client

npm start📌 Usage Guide
1️⃣ Login using valid credentials.
2️⃣ View Dashboard with assigned leads.
3️⃣ Filter/Search Leads by status or follow-up date.
4️⃣ Update Lead Status & add call remarks.
5️⃣ Schedule Callbacks for follow-ups.
6️⃣ (Optional) Admins can assign leads & track updates.
🔒 Authentication & SecurityJWT-based authentication ensures secure access.
Passwords are hashed before storing.
Role-based access for admin and users.
🛠️ Future Enhancements
🔹 Integration with CRM software.
🔹 Email/SMS notifications for callbacks.
🔹 Advanced analytics dashboard for lead conversion insights.
🤝 ContributingFork the repository.
Create a new branch (feature-branch).
Commit changes and push to the branch.
Open a pull request.
