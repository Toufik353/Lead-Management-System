import { useEffect, useState } from "react";
import axios from "axios";

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("New");
    const [disposition, setDisposition] = useState("Interested");
    const [remarks, setRemarks] = useState("");
    const [search, setSearch] = useState("");
    const [editingLeadId, setEditingLeadId] = useState(null);
    const [editData, setEditData] = useState({ name: "", email: "", phone: "", status: "", callDisposition: "", remarks: "" });

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/leads", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLeads(res.data);
        } catch (error) {
            console.error(error.response?.data?.message);
        }
    };

    const handleCreateLead = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:5001/api/leads/",
                { name, email, phone, status, disposition, remarks },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("New Lead Created:", res.data);
            fetchLeads();
            setName("");
            setEmail("");
            setPhone("");
            setStatus("New");
            setDisposition("Interested");
            setRemarks("");
        } catch (error) {
            console.error(error.response?.data?.message);
        }
    };

    const handleDeleteLead = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/leads/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchLeads();
        } catch (error) {
            console.error(error.response?.data?.message);
        }
    };

    const handleEditLead = (id) => {
        setEditingLeadId(id);
        const leadToEdit = leads.find((lead) => lead._id === id);
        setEditData({
            name: leadToEdit.name,
            email: leadToEdit.email,
            phone: leadToEdit.phone,
            status: leadToEdit.status || "New",
            callDisposition: leadToEdit.callDisposition || "Interested",
            remarks: leadToEdit.remarks || "",
        });
    };

    const handleSaveEdit = async (id) => {
        try {
            await axios.put(`http://localhost:5001/api/leads/${id}`, editData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditingLeadId(null);
            fetchLeads();
        } catch (error) {
            console.error("Error updating lead:", error.response?.data || error.message);
        }
    };

    const handleChangeEditData = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const filteredLeads = leads.filter((lead) =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search)
    );

    return (
        <div className="container mt-4">
            <h2>Lead Management</h2>

            {/* Search Input */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search leads by name, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Add Lead Form */}
            <form onSubmit={handleCreateLead} className="mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="col-md-2">
                        <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className="col-md-2">
                        <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <select className="form-select" value={disposition} onChange={(e) => setDisposition(e.target.value)}>
                            <option value="Interested">Interested</option>
                            <option value="Not Interested">Not Interested</option>
                            <option value="Follow Up">Follow Up</option>
                            <option value="Wrong Number">Wrong Number</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-success w-100">Add Lead</button>
                    </div>
                </div>
            </form>

            {/* Leads Table */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Call Disposition</th>
                        <th>Remarks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLeads.length > 0 ? (
                        filteredLeads.map((lead) => (
                            <tr key={lead._id}>
                                {editingLeadId === lead._id ? (
                                    <>
                                        <td><input type="text" className="form-control" name="name" value={editData.name} onChange={handleChangeEditData} /></td>
                                        <td><input type="email" className="form-control" name="email" value={editData.email} onChange={handleChangeEditData} /></td>
                                        <td><input type="text" className="form-control" name="phone" value={editData.phone} onChange={handleChangeEditData} /></td>
                                        <td>
                                            <select className="form-select" name="status" value={editData.status} onChange={handleChangeEditData}>
                                                <option value="New">New</option>
                                                <option value="Contacted">Contacted</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Closed">Closed</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select className="form-select" name="callDisposition" value={editData.callDisposition} onChange={handleChangeEditData}>
                                                <option value="Interested">Interested</option>
                                                <option value="Not Interested">Not Interested</option>
                                                <option value="Follow Up">Follow Up</option>
                                                <option value="Wrong Number">Wrong Number</option>
                                            </select>
                                        </td>
                                        <td><input type="text" className="form-control" name="remarks" value={editData.remarks} onChange={handleChangeEditData} /></td>
                                        <td>
                                            <button className="btn btn-success btn-sm me-2" onClick={() => handleSaveEdit(lead._id)}>Save</button>
                                            <button className="btn btn-secondary btn-sm" onClick={() => setEditingLeadId(null)}>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{lead.name}</td>
                                        <td>{lead.email}</td>
                                        <td>{lead.phone}</td>
                                        <td>{lead.status}</td>
                                        <td>{lead.callDisposition}</td>
                                        <td>{lead.remarks}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditLead(lead._id)}>Edit</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteLead(lead._id)}>Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="7" className="text-center">No leads found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Leads;
