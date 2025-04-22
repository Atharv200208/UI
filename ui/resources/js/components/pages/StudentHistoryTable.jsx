import React, { useState } from "react";
import Pagination from "../Pagination";

function StudentHistoryTable() {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0); // 0-indexed for react-paginate

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const dummyHistory = [
    { month: "Jan 2024", amount: 500, receipt: "Yes" },
    { month: "Feb 2024", amount: 700, receipt: "No" },
    { month: "Mar 2024", amount: 600, receipt: "Yes" },
    { month: "Apr 2024", amount: 450, receipt: "Yes" },
    { month: "May 2024", amount: 800, receipt: "No" },
    { month: "Jun 2024", amount: 500, receipt: "Yes" },
    { month: "Jul 2024", amount: 750, receipt: "Yes" },
    { month: "Aug 2024", amount: 620, receipt: "No" },
    { month: "Sep 2024", amount: 570, receipt: "Yes" },
    { month: "Oct 2024", amount: 530, receipt: "Yes" },
    { month: "Nov 2024", amount: 710, receipt: "Yes" },
    { month: "Dec 2024", amount: 640, receipt: "No" },
    { month: "Jan 2025", amount: 580, receipt: "Yes" },
    { month: "Feb 2025", amount: 660, receipt: "Yes" },
    { month: "Mar 2025", amount: 720, receipt: "No" },
    { month: "Apr 2025", amount: 550, receipt: "Yes" },
    { month: "May 2025", amount: 630, receipt: "Yes" },
    { month: "Jun 2025", amount: 700, receipt: "No" },
    { month: "Jul 2025", amount: 675, receipt: "Yes" },
    { month: "Aug 2025", amount: 690, receipt: "Yes" },
  ];

  const pageCount = Math.ceil(dummyHistory.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = dummyHistory.slice(startIndex, endIndex);

  return (
    <div className="container mt-4">
      <h5 className="mb-3">Student Deposit History</h5>
      <table className="table table-bordered table-striped text-white">
        <thead className="table-dark">
          <tr>
            <th>Month</th>
            <th>Amount (₹)</th>
            <th>Receipt Uploaded</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((entry, index) => (
              <tr key={index}>
                <td>{entry.month}</td>
                <td>{entry.amount}</td>
                <td>{entry.receipt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
    </div>
  );
}

export default StudentHistoryTable;
