# MoveInSync – Frontend Dashboard

This is the frontend application for the MoveInSync intelligent alert monitoring system. It acts as the main interface for monitoring real-time fleet alerts, tracking driver risk levels, and understanding how rules and thresholds affect alert escalations. The dashboard is designed like a command-center so that operations teams can quickly detect issues across hundreds of vehicles and take immediate action.

===========================================================
PROJECT OVERVIEW (DETAILED EXPLANATION)
===========================================================

The dashboard works by connecting to a backend alert engine. It receives alerts generated from multiple sources such as overspeeding events, compliance checks, feedback from on-ground staff, and automated system triggers. The dashboard allows operators and admins to:

* View live alerts as soon as the backend detects unsafe or unusual behavior.  
* Track the entire alert lifecycle, meaning they can see whether an alert is Open, Escalated, Auto-Closed by rules, or manually Resolved.  
* Analyze alert trends using visual charts to understand patterns over days or weeks (e.g., which days show more overspeeding cases).  
* Adjust rules and thresholds (Admins only) to make the system more or less strict depending on company policy.  
* Simulate alerts for testing without needing real vehicles — extremely useful during development or demos.

The overall goal is to improve fleet safety and reduce manual effort by providing a clean, quick, and intuitive web interface.

===========================================================
TECH STACK (EXPLAINED)
===========================================================

* React.js (Vite)  
  - The main framework for building the UI.  
  - Vite makes the development environment extremely fast.

* Tailwind CSS  
  - Provides utility-based styling for fast UI development.  
  - Reduces the need to write long CSS files manually.

* React Router DOM  
  - Enables navigation between pages like Dashboard, Login, Rules, Simulator, etc.

* React Context API  
  - Used for authentication state (logged in user, roles, token).  
  - Ensures protected routes work correctly.

* Axios  
  - Handles API requests and responses.  
  - Interceptors automatically attach JWT tokens to secure calls.

* Chart.js (react-chartjs-2)  
  - Used for visual charts like daily/weekly trends and KPIs.

* Lucide React Icons  
  - Clean, lightweight icons used throughout the UI.

===========================================================
SETUP & INSTALLATION (WITH EXPLANATION)
===========================================================

1. Install prerequisites:
   - Node.js v14 or above is required to run React apps.
   - Make sure your backend server is running on http://localhost:4000 since the frontend depends on it.

2. Install dependencies:
   cd frontend  
   npm install  
   This installs all packages listed in package.json.

3. Run development server:
   npm run dev  
   This starts the Vite server so you can view the UI in your browser.

Frontend will be available at:
http://localhost:5173  
(This may vary slightly depending on system.)

===========================================================
DIRECTORY STRUCTURE (WITH EXPLANATION)
===========================================================

src/  
├── api/  
│   └── axios.js — Central file for all axios configuration such as base URL and token interceptors.

├── components/ — Reusable UI components such as cards, modals, logs.  
│   ├── AlertModal.jsx — Shows detailed information of a selected alert.  
│   ├── AutoClosedLog.jsx — Displays history of alerts that the system auto-closed.  
│   ├── Layout.jsx — Main layout wrapper with navbar and protected routing.  
│   ├── LifecycleStream.jsx — Right-side live stream showing new alert events in real time.  
│   ├── StatCard.jsx — Box showing key numbers like total alerts, warnings, resolved.  
│   ├── TopOffenders.jsx — Ranks the drivers with the highest alert count.  
│   └── TrendChart.jsx — Displays charts for alert trends.

├── context/  
│   └── AuthContext.jsx — Handles authentication (login/logout, user role, token).

├── pages/ — Complete pages in the application.  
│   ├── AdminRules.jsx — Admin page for editing rule thresholds.  
│   ├── Dashboard.jsx — Main real-time monitoring screen.  
│   ├── LoginPage.jsx — User login form.  
│   ├── RegisterPage.jsx — Registration page.  
│   ├── RuleAnalysisPage.jsx — Tool for analyzing “what-if” rule changes.  
│   └── SimulatorPage.jsx — Allows generating simulated alerts for testing.

└── App.jsx — Central routing configuration for the entire app.

===========================================================
KEY FEATURES (FULL EXPLANATION)
===========================================================

1. AUTHENTICATION & RBAC  
-----------------------------------------  
RBAC = Role-Based Access Control.  
The system uses JWT authentication. After login:

* Operators can see the dashboard and resolve alerts manually.  
* Admins get extra access like rule editing, analytics, and simulations.  
* Unauthorized users are redirected to login.  

The system automatically stores and uses the JWT token for protected API calls.

2. REAL-TIME DASHBOARD  
-----------------------------------------  
This is the main screen for operators and admins. It includes:

* KPI counters to summarize counts of Critical, Warning, Info, and Resolved alerts.  
* Trend charts to understand whether alert volume is increasing or decreasing.  
* Top offenders list to identify risky drivers.  
* Live stream that updates automatically whenever a new event occurs.

3. ALERT DRILL-DOWN MODAL  
-----------------------------------------  
When a user clicks on any alert, they get a detailed modal showing:

* Complete timeline: Open → Escalated → Auto-Closed by rule → Resolved  
* Important metadata such as speed, vehicle number, timestamp, and location  
* Option to manually mark the alert as resolved  

This helps operators decide whether further action is required.

4. SENSOR SIMULATOR TOOL  
-----------------------------------------  
Path: /simulator  
This tool is meant for testing the backend and frontend without needing real vehicles.

It can generate:  
* Fake overspeed alerts  
* Document expiry events  
* Renewal events  

This is especially useful for demonstrating system behavior to stakeholders.

===========================================================
COMMON ISSUES & FIXES (EXPLAINED)
===========================================================

1. NETWORK ERROR  
This happens if the backend is not running or the URL is wrong.  
Solution:  
- Make sure backend is on http://localhost:4000  
- Check axios.js for the correct baseURL  

2. ADMIN ACCESS DENIED  
Happens when trying to access admin routes without the right role.  
Solution:  
- Make sure your user has role: "admin"  
- Check browser → DevTools → Local Storage → token  

3. TAILwind NOT WORKING  
Usually due to missing configuration.  
Check:  
- tailwind.config.js  
- postcss.config.js  
- index.css must contain:  
  @tailwind base;  
  @tailwind components;  
  @tailwind utilities;  

===========================================================
AVAILABLE SCRIPTS (EXPLAINED)
===========================================================

npm run dev  
→ Starts the frontend locally with hot reload.

npm run build  
→ Creates a production-optimized version.

npm run preview  
→ Lets you preview the production build before deploying.

===========================================================
FOR TESTING PURPOSE (DEMO CREDENTIALS)
===========================================================

Admin Email: admin@test.com  
Password: password123  
