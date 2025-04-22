import React, { useEffect, useState } from "react";
import reportData from "../data/reportData.json";
import Pagination from "../components/Pagination";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";

const itemsPerPage = 10;

const FullReportTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState("All");
  const [incidentFilter, setIncidentFilter] = useState("All");

  // Unique incident types
  const incidentTypes = ["All", ...new Set(reportData.map(item => item.incidentType))];

  const filteredData = reportData.filter(item => {
    const statusMatch = statusFilter === "All" || item.status === statusFilter;
    const incidentMatch = incidentFilter === "All" || item.incidentType === incidentFilter;
    return statusMatch && incidentMatch;
  });

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = filteredData.slice(start, end);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const resetFilters = () => {
    setStatusFilter("All");
    setIncidentFilter("All");
    setCurrentPage(0);
  };

  return (
    <div className="container my-4">
      <h4 className="fw-bold mb-4 text-primary">📄 All Incident Report Records</h4>

      {/* Filters */}
      <div className="d-flex flex-wrap gap-2 mb-4 align-items-center">
        <div className="btn-group" role="group">
          <button
            className={`btn ${statusFilter === "Verified" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => { setStatusFilter("Verified"); setCurrentPage(0); }}
          >
            <CheckCircle size={16} className="me-1" /> Verified
          </button>
          <button
            className={`btn ${statusFilter === "Rejected" ? "btn-danger" : "btn-outline-danger"}`}
            onClick={() => { setStatusFilter("Rejected"); setCurrentPage(0); }}
          >
            <XCircle size={16} className="me-1" /> Rejected
          </button>
          <button
            className={`btn ${statusFilter === "Pending" ? "btn-warning text-white" : "btn-outline-warning"}`}
            onClick={() => { setStatusFilter("Pending"); setCurrentPage(0); }}
          >
            <HelpCircle size={16} className="me-1" /> Pending
          </button>
          <button
            className={`btn ${statusFilter === "All" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => { setStatusFilter("All"); setCurrentPage(0); }}
          >
            🔄 All Status
          </button>
        </div>

        <select
          className="form-select w-auto"
          value={incidentFilter}
          onChange={(e) => { setIncidentFilter(e.target.value); setCurrentPage(0); }}
        >
          {incidentTypes.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>

        <button className="btn btn-secondary" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive shadow rounded-4 overflow-hidden">
        <table className="table table-striped table-bordered align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Incident</th>
              <th>Fine</th>
              <th>Paid</th>
              <th>Remaining</th>
              <th>Date</th>
              <th>Verified By</th>
              <th>Status</th>
              <th>Proof</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.studentId}</td>
                  <td>{item.name}</td>
                  <td>{item.incidentType}</td>
                  <td>₹{item.fineAmount}</td>
                  <td>₹{item.paid}</td>
                  <td>₹{item.remaining}</td>
                  <td>{item.date}</td>
                  <td>{item.verifiedBy}</td>
                  <td>
                    <span className={`badge ${
                      item.status === "Verified" ? "bg-success" :
                      item.status === "Rejected" ? "bg-danger" :
                      "bg-warning text-dark"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.proof ? "✅" : "❌"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center text-muted">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default FullReportTable;
