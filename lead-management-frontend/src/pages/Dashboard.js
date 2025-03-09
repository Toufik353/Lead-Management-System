import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [message, setMessage] = useState("");
        const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5001/api/auth/dashboard", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage(res.data.message);
        };
        fetchData();
    }, []);

    return (

        <div className="container mt-5">
        <h2>{message}</h2>

            <h2>Dashboard</h2>
            <button className="btn btn-primary" onClick={() => navigate("/leads")}>
                Manage Leads
            </button>
        </div>
    )
};

export default Dashboard;
