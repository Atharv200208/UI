import React, { useState } from "react";
import { CheckCircle, XCircle, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const fineData = [
  { date: "2024-12-10", reason: "Broken Chair", amount: 500, status: "Paid" },
  { date: "2025-01-05", reason: "Fan Blades Bent", amount: 800, status: "Pending" },
  { date: "2025-02-14", reason: "Window Crack", amount: 1200, status: "Paid" },
  { date: "2025-03-20", reason: "Graffiti", amount: 1000, status: "Pending" },
];

const FinePaymentReport = () => {
  const [filter, setFilter] = useState("All");

  const filteredData =
    filter === "All" ? fineData : fineData.filter((item) => item.status === filter);
  const total = filteredData.reduce((sum, row) => sum + row.amount, 0);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Fine Payment Report - ${filter} Fines`, 14, 15);

    const tableData = filteredData.map((row) => [
      row.date,
      row.reason,
      `₹${row.amount}`,
      row.status,
    ]);

    autoTable(doc, {
      startY: 25,
      head: [["Date", "Reason", "Amount", "Status"]],
      body: tableData,
    });

    doc.save(`Fine_Report_${filter}.pdf`);
  };

  return (
    <div className="p-4">
      <h4 className="mb-4 fw-bold text-primary">💰 Fine Payment Report</h4>

      {/* Filter + Download */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div className="d-flex gap-2">
          <button
            className={`btn ${filter === "Paid" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setFilter("Paid")}
          >
            <CheckCircle size={16} className="me-1" />
            Show Paid
          </button>
          <button
            className={`btn ${filter === "Pending" ? "btn-danger" : "btn-outline-danger"}`}
            onClick={() => setFilter("Pending")}
          >
            <XCircle size={16} className="me-1" />
            Show Pending
          </button>
          <button
            className={`btn ${filter === "All" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilter("All")}
          >
            <span className="me-1">🔄</span>
            Show All
          </button>
        </div>

        <button className="btn btn-outline-primary d-flex align-items-center" onClick={downloadPDF}>
          <Download size={16} className="me-2" />
          Download PDF
        </button>
      </div>

      {/* Cards */}
      <div className="row g-3 mb-4">
        <div className="ml-[50px] min-w-5xl mx-10 px-1 py-1 flex justify-center">
          <div
            className={`card border-0 shadow-sm rounded-4 ${
              filter === "Paid" ? "bg-success text-white" : filter === "Pending" ? "bg-danger text-white" : "bg-info text-white"
            }`}
          >
            <div className="card-body text-center">
              <h6 className="mb-1">{filter} Fines</h6>
              <h5 className="fw-bold">₹{total}</h5>
            </div>
          </div>
        </div>
        {/* <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 bg-light">
            <div className="card-body text-center">
              <h6 className="text-muted mb-1">Total Records</h6>
              <h5 className="fw-bold text-dark">{filteredData.length}</h5>
            </div>
          </div>
        </div> */}
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover table-bordered rounded-4 overflow-hidden">
          <thead className="table-primary">
            <tr>
              <th>Date</th>
              <th>Reason</th>
              <th>Amount (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.date}</td>
                  <td>{item.reason}</td>
                  <td>₹{item.amount}</td>
                  <td>
                    {item.status === "Paid" ? (
                      <span className="badge bg-success d-flex align-items-center gap-1">
                        <CheckCircle size={14} /> Paid
                      </span>
                    ) : (
                      <span className="badge bg-danger d-flex align-items-center gap-1">
                        <XCircle size={14} /> Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No {filter.toLowerCase()} fines available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinePaymentReport;
