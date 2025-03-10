import { useEffect, useState } from "react";
import axios from "axios";

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("New");
    const [disposition, setDisposition] = useState("Interested");
    const [leadSource, setLeadSource] = useState("")
    const [remarks, setRemarks] = useState("");
    const [search, setSearch] = useState("");
    const [editingLeadId, setEditingLeadId] = useState(null);
    const [editData, setEditData] = useState({ name: "", email: "", phone: "", status: "", disposition: "", remarks: "" ,leadSource:""});

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await axios.get(`https://lead-management-system-server.onrender.com/api/leads`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("leads",res.data)
            setLeads(res.data);
        } catch (error) {
            console.error(error.response?.data?.message);
        }
    };

    const handleCreateLead = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `https://lead-management-system-server.onrender.com/api/leads`,
                { name, email, phone, status, disposition, remarks,leadSource },
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
            setLeadSource("")
        } catch (error) {
            console.error(error.response?.data?.message);
        }
    };

    const handleDeleteLead = async (id) => {
         const confirmDelete = window.confirm("Are you sure you want to delete this lead?");
    if (!confirmDelete) return;
        try {
            await axios.delete(`https://lead-management-system-server.onrender.com/api/leads/${id}`, {
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
            disposition: leadToEdit.disposition || "Interested",
            remarks: leadToEdit.remarks || "",
            leadSource: leadToEdit.leadSource || ""
        });
    };

    const handleSaveEdit = async (id) => {
        try {
            await axios.put(`https://lead-management-system-server.onrender.com/api/leads/${id}`, editData, {
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
            <form onSubmit={handleCreateLead} className="mb-4 p-3 shadow-sm bg-light rounded">
    <h4 className="mb-3 text-center text-primary">Add New Lead</h4>
    <div className="row g-3">
        <div className="col-md-4">
            <label className="form-label">Name</label>
            <input 
                type="text" 
                className="form-control" 
                placeholder="Enter full name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
            />
        </div>
        <div className="col-md-4">
            <label className="form-label">Email</label>
            <input 
                type="email" 
                className="form-control" 
                placeholder="Enter email address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
        </div>
        <div className="col-md-4">
            <label className="form-label">Phone</label>
            <input 
                type="text" 
                className="form-control" 
                placeholder="Enter phone number" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required 
            />
        </div>
    </div>

    <div className="row g-3 mt-3">
        <div className="col-md-4">
            <label className="form-label">Status</label>
            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
            </select>
        </div>
        <div className="col-md-4">
            <label className="form-label">Disposition</label>
            <select className="form-select" value={disposition} onChange={(e) => setDisposition(e.target.value)}>
                <option value="Interested">Interested</option>
                <option value="Not Interested">Not Interested</option>
                <option value="Follow Up">Follow Up</option>
                <option value="Wrong Number">Wrong Number</option>
            </select>
        </div>
        <div className="col-md-4">
            <label className="form-label">Remarks</label>
            <input 
                type="text" 
                className="form-control" 
                placeholder="Additional comments" 
                value={remarks} 
                onChange={(e) => setRemarks(e.target.value)} 
            />
                    </div>
                    <div className="col-md-4">
            <label className="form-label">Lead Source</label>
            <input 
                type="text" 
                className="form-control" 
                placeholder="Lead Source" 
                value={leadSource} 
                onChange={(e) => setLeadSource(e.target.value)} 
            />
        </div>
    </div>

    <div className="mt-4 text-center">
        <button type="submit" className="btn btn-success px-4">Add Lead</button>
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
                        <th>leadSource</th>
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
                                            <select className="form-select" name="disposition" value={editData.disposition} onChange={handleChangeEditData}>
                                                <option value="Interested">Interested</option>
                                                <option value="Not Interested">Not Interested</option>
                                                <option value="Follow Up">Follow Up</option>
                                                <option value="Wrong Number">Wrong Number</option>
                                            </select>
                                        </td>
                                        <td><input type="text" className="form-control" name="remarks" value={editData.remarks} onChange={handleChangeEditData} /></td>
                                         <td><input type="text" className="form-control" name="leadSource" value={editData.leadSource} onChange={handleChangeEditData} /></td>

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
                                        <td>{lead.disposition}</td>
                                            <td>{lead.remarks}</td>
                                            <td>{ lead.leadSource}</td>
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
