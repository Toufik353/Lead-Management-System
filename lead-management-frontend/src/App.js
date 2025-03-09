import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Leads from "./component/Leads";
import CallbackScheduler from "./component/CallbackScheduler"
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
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
            </Routes>
        </Router>
    );
}

export default App;
