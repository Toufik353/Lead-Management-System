import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`https://lead-management-system-server.onrender.com/api/auth/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMessage(res.data.message);
            } catch (err) {
                setError("Failed to fetch dashboard data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-lg border-0 rounded">
                <h2 className="text-center text-primary mb-3">Dashboard</h2>

                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="alert alert-danger text-center">{error}</div>
                ) : (
                    <h4 className="text-center text-success">{message}</h4>
                )}

                <div className="mt-4">
                    <h5>Quick Actions:</h5>
                    <div className="d-grid gap-3">
                        <button className="btn btn-primary" onClick={() => navigate("/leads")}>
                            Manage Leads
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate("/profile")}>
                            View Profile
                        </button>
                        <button className="btn btn-danger" onClick={() => navigate("/settings")}>
                            Settings
                        </button>
                        {/* Schedule Callback Button - Navigates to /callback-scheduler */}
                        <button className="btn btn-warning" onClick={() => navigate("/callback-scheduler")}>
                            Schedule Callback
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-5 text-center">
                <p className="text-muted">Welcome to your dashboard! Stay organized and track your progress.</p>
            </div>
        </div>
    );
};

export default Dashboard;
