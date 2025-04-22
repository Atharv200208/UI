import React from 'react';
import jsPDF from 'jspdf';

function Reports() {
  const dummyData = [
    { month: 'January', year: 2025, total: '₹10,000' },
    { month: 'February', year: 2025, total: '₹12,500' },
    { month: 'March', year: 2025, total: '₹9,300' },
    { month: 'April', year: 2025, total: '₹15,000' }
  ];

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Caution Money Collection Report', 20, 20);

    let y = 40;
    dummyData.forEach((item, index) => {
      doc.setFontSize(12);
      doc.text(
        `${index + 1}. Month: ${item.month}, Year: ${item.year}, Total Collected: ${item.total}`,
        20,
        y
      );
      y += 10;
    });

    doc.save('Caution_Money_Report.pdf');
  };

  return (
    <div className="container mt-4">
      <h2>Monthly/Yearly Collection Report</h2>
      <ul className="mt-3">
        {dummyData.map((item, idx) => (
          <li key={idx}>
            <strong>{item.month} {item.year}</strong> — Total: {item.total}
          </li>
        ))}
      </ul>
      <button onClick={generatePDF} className="btn btn-success mt-4">
        Download PDF Report
      </button>
    </div>
  );
}

export default Reports;
