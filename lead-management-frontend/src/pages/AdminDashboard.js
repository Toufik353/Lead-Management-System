
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://lead-management-system-restapi.onrender.com/api/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    const token = localStorage.getItem("token");
    await axios.put(`https://lead-management-system-restapi.onrender.com/api/users/${id}`, { role }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(users.map(user => user._id === id ? { ...user, role } : user));
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`https://lead-management-system-restapi.onrender.com/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(users.filter(user => user._id !== id));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select value={user.role} onChange={e => updateRole(user._id, e.target.value)}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td><button onClick={() => deleteUser(user._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
