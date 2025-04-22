import React, { useState } from 'react';

function Deposit() {
  const [studentName, setStudentName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now just logging the values
    console.log({ studentName, amount, date, receipt });

    alert('Deposit submitted successfully!');
    
    // Reset form
    setStudentName('');
    setAmount('');
    setDate('');
    setReceipt(null);
  };

  return (
    <div className="container mt-4">
      <h2>Deposit Caution Money</h2>
      <form onSubmit={handleSubmit} className="mt-4">

        <div className="mb-3">
          <label className="form-label">Student Name</label>
          <input
            type="text"
            className="form-control"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Deposit Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 w-50">
          <label className="form-label">Date of Deposit</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Receipt (optional)</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setReceipt(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Deposit;
