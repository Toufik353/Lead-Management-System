import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

const CallbackScheduler = () => {
  const [callbacks, setCallbacks] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    scheduledAt: "",
    notes: ""
  });

  useEffect(() => {
    fetchCallbacks();
  }, []);

  const fetchCallbacks = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/callbacks");
      setCallbacks(response.data);
    } catch (error) {
      console.error("Error fetching callbacks:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/callbacks", formData);
      setShow(false);
      fetchCallbacks();
    } catch (error) {
      console.error("Error creating callback:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/callbacks/${id}`);
      fetchCallbacks();
    } catch (error) {
      console.error("Error deleting callback:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Callback Scheduler</h2>
      <Button variant="primary" onClick={() => setShow(true)}>Schedule Callback</Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Scheduled At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {callbacks.map((cb) => (
            <tr key={cb._id}>
              <td>{cb.name}</td>
              <td>{cb.email}</td>
              <td>{cb.phone}</td>
              <td>{new Date(cb.scheduledAt).toLocaleString()}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(cb._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Callback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Scheduled At</Form.Label>
              <Form.Control type="datetime-local" name="scheduledAt" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" name="notes" onChange={handleChange} />
            </Form.Group>
            <Button type="submit" className="mt-3">Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CallbackScheduler;
