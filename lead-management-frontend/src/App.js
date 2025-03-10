import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Leads from "./component/Leads";
import CallbackScheduler from "./component/CallbackScheduler";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        setIsAuthenticated(!!token);
        setUserRole(role);
    }, []);

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/callback-scheduler" element={<CallbackScheduler />} />
                
                {/* Admin Route - Only accessible if the user is an admin */}
                <Route 
                    path="/admin-dashboard" 
                    element={isAuthenticated && userRole === "admin" ? <AdminDashboard /> : <Navigate to="/" />} 
                />
            </Routes>
        </Router>
    );
}

export default App;
