import React, { useState } from "react";
import { CheckCircle, XCircle, HelpCircle, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Pagination from "../Pagination";

const verificationData = [
  { date: "2025-01-10", issue: "Broken Desk", verifiedBy: "Mr. Khan", status: "Verified" },
  { date: "2025-01-15", issue: "Graffiti", verifiedBy: "Ms. Singh", status: "Rejected" },
  { date: "2025-02-05", issue: "Fan Issue", verifiedBy: "Mr. Roy", status: "Pending" },
  { date: "2025-02-20", issue: "Window Crack", verifiedBy: "Mr. Khan", status: "Verified" },
];

const itemsPerPage = 5;

const VerificationFeedbackReport = () => {
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filteredData =
    filter === "All"
      ? verificationData
      : verificationData.filter((item) => item.status === filter);

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Verification Feedback Report - ${filter}`, 14, 15);
    const tableData = filteredData.map((row) => [
      row.date,
      row.issue,
      row.verifiedBy,
      row.status,
    ]);
    autoTable(doc, {
      startY: 25,
      head: [["Date", "Issue", "Verified By", "Status"]],
      body: tableData,
    });
    doc.save(`Verification_Report_${filter}.pdf`);
  };

  // Utility: badge class with pastel tones
  const badgeClass = (status) => {
    switch (status) {
      case "Verified":
        return "bg-soft-success text-success border border-success-subtle";
      case "Rejected":
        return "bg-soft-danger text-danger border border-danger-subtle";
      case "Pending":
        return "bg-soft-warning text-warning border border-warning-subtle";
      default:
        return "bg-light text-muted";
    }
  };

  // Utility: button classes
  const btnClass = (label) => {
    const active = filter === label;
    if (label === "Verified") return active ? "btn btn-success-subtle" : "btn btn-outline-success";
    if (label === "Rejected") return active ? "btn btn-danger-subtle" : "btn btn-outline-danger";
    if (label === "Pending") return active ? "btn btn-warning-subtle" : "btn btn-outline-warning";
    return active ? "btn btn-secondary-subtle" : "btn btn-outline-secondary";
  };

  return (
    <div className="p-4">
      <h4 className="mb-4 fw-semibold text-dark">
        🧾 Verification Feedback Report
      </h4>

      {/* Filter Buttons + Download */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div className="btn-group flex-wrap gap-2">
          {[
            { label: "Verified", icon: <CheckCircle size={16} /> },
            { label: "Rejected", icon: <XCircle size={16} /> },
            { label: "Pending", icon: <HelpCircle size={16} /> },
            { label: "All", icon: <span>🔄</span> },
          ].map(({ label, icon }) => (
            <button
              key={label}
              className={btnClass(label)}
              onClick={() => {
                setFilter(label);
                setCurrentPage(0);
              }}
            >
              <span className="me-1">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        <button
          className="btn btn-outline-dark d-flex align-items-center"
          onClick={downloadPDF}
        >
          <Download size={16} className="me-2" />
          Download PDF
        </button>
      </div>

      {/* Summary Card */}
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <div className="card border-0 shadow-sm rounded-4 bg-dark-subtle text-dark">
            <div className="card-body text-center py-4">
              <h6 className="mb-1">{filter} Reports</h6>
              <h4 className="fw-bold">{filteredData.length}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive rounded-4 shadow-sm overflow-hidden">
        <table className="table table-bordered mb-0">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Issue</th>
              <th>Verified By</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.date}</td>
                  <td>{item.issue}</td>
                  <td>{item.verifiedBy}</td>
                  <td>
                    <span
                      className={`badge px-3 py-2 rounded-pill fw-medium ${badgeClass(
                        item.status
                      )} d-inline-flex align-items-center gap-2`}
                    >
                      {item.status === "Verified" && <CheckCircle size={14} />}
                      {item.status === "Rejected" && <XCircle size={14} />}
                      {item.status === "Pending" && <HelpCircle size={14} />}
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted py-3">
                  No {filter.toLowerCase()} verification records found.
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

export default VerificationFeedbackReport;
