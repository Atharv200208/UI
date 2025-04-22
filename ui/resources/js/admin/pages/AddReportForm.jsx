import React, { useState, useEffect } from "react";
import { Form, FormGroup, FormLabel, FormControl, Col, Row, Table } from "react-bootstrap";

const AddReportForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    incident: "",
    fine: "",
    deposit: "",
    date: "",
    verifiedBy: "",
    status: "Pending",
    proofUrl: "",
  });

  const [reports, setReports] = useState([]);
  const base = import.meta.env.VITE_API_BASE_URL;

  // 🟡 Fetch existing reports on mount
  useEffect(() => {
    console.log("Fetching reports...");
    fetch(`${base}/api/incident-reports`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched data:", data);
        setReports(data);
      })
      .catch(err => console.error("Fetch Error:", err));
  }, [base]);
  

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ ...prev, proofUrl: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const remaining = parseFloat(formData.deposit || 0) - parseFloat(formData.fine || 0);
    const newData = { ...formData, remaining: remaining.toFixed(2) };

    try {
      const response = await fetch(`${base}/api/incident-reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Backend Error:", errText);
        throw new Error("Failed to submit");
      }

      const result = await response.json();
      if (onAdd) onAdd(result);

      setReports(prev => [...prev, result]); // add new report to list
      alert("Report submitted successfully!");

      setFormData({
        studentId: "", studentName: "", incident: "",
        fine: "", deposit: "", date: "",
        verifiedBy: "", status: "Pending", proofUrl: "",
      });
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Error submitting the report.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="card px-4 py-4 shadow mb-5 bg-white rounded">
        <Form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center">Add New Incident Record</h2>

          <Row className="mb-3">
            <Col md={6}>
              <FormGroup>
                <FormLabel>Student Id</FormLabel>
                <FormControl name="studentId" value={formData.studentId} onChange={handleChange} required />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Student Name</FormLabel>
                <FormControl name="studentName" value={formData.studentName} onChange={handleChange} required />
              </FormGroup>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <FormGroup>
                <FormLabel>Fine Amount</FormLabel>
                <FormControl name="fine" type="number" value={formData.fine} onChange={handleChange} required />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Deposit Amount</FormLabel>
                <FormControl name="deposit" type="number" value={formData.deposit} onChange={handleChange} required />
              </FormGroup>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <FormGroup>
                <FormLabel>Date</FormLabel>
                <FormControl name="date" type="date" value={formData.date} onChange={handleChange} required />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Verified By</FormLabel>
                <FormControl name="verifiedBy" value={formData.verifiedBy} onChange={handleChange} />
              </FormGroup>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <FormGroup>
                <FormLabel>Status</FormLabel>
                <Form.Select name="status" value={formData.status} onChange={handleChange}>
                  <option>Pending</option>
                  <option>Verified</option>
                  <option>Rejected</option>
                </Form.Select>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Proof (Image or PDF)</FormLabel>
                <FormControl name="proof" type="file" accept="image/*,.pdf" onChange={handleChange} />
              </FormGroup>
            </Col>
          </Row>

          <div className="text-center mt-2">
            <button type="submit" className="btn btn-secondary px-5">
              Submit
            </button>
          </div>
        </Form>
      </div>

      {/* 👇 Display Reports Table */}
      <div className="card px-4 py-4 shadow mb-5 bg-white rounded">
        <h4 className="mb-3">Submitted Incident Reports</h4>
        {reports.length === 0 ? (
          <p>No reports yet.</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Fine</th>
                <th>Deposit</th>
                <th>Remaining</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{r.studentName}</td>
                  <td>{r.fine}</td>
                  <td>{r.deposit}</td>
                  <td>{r.remaining}</td>
                  <td>{r.date}</td>
                  <td>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AddReportForm;
