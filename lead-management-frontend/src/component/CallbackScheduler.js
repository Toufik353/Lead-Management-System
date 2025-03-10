import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Container, Row, Col } from "react-bootstrap";

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
      const response = await axios.get("http://localhost:5002/api/callbacks");
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
      await axios.post("http://localhost:5002/api/callbacks", formData);
      setShow(false);
      fetchCallbacks();
    } catch (error) {
      console.error("Error creating callback:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this lead?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5002/api/callbacks/${id}`);
      fetchCallbacks();
    } catch (error) {
      console.error("Error deleting callback:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col className="text-center">
          <h2 className="mb-3 text-primary">Callback Scheduler</h2>
          <Button variant="success" onClick={() => setShow(true)}>+ Schedule Callback</Button>
        </Col>
      </Row>

      {/* Table Container */}
      <div className="table-responsive">
        <Table striped bordered hover className="mt-3">
          <thead className="bg-light text-center">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Notes</th>
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
                <td>{cb.notes}</td>
                <td>{new Date(cb.scheduledAt).toLocaleString()}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(cb._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for Scheduling Callback */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Schedule a Callback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Scheduled At</Form.Label>
                  <Form.Control type="datetime-local" name="scheduledAt" onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mt-2">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" name="notes" rows={3} onChange={handleChange} />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3 w-100">Save Callback</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CallbackScheduler;
