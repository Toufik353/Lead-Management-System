import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://lead-management-system-restapi.onrender.com/api/auth/register`, { name, email, password, role });
            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" className="form-control mt-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" className="form-control mt-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <select className="form-control mt-2" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="btn btn-primary mt-2">Register</button>
            </form>
        </div>
    );
};

export default Register;
