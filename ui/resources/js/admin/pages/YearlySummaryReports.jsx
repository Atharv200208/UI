<script src="http://localhost:8097"></script>

import React, { useEffect, useState } from 'react';

export default function IncidentReportsTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/yearly-summary')
      .then(res => res.text())
      .then(text => {
        console.log('Raw response:', text);
      })
  }, []);

  if (loading) return <div>Loading…</div>;

  return (
    <table className="min-w-full table-auto border-collapse">
      <thead className="bg-gray-800 text-white">
        <tr>
          {[
            'Student ID','Name','Incident','Fine',
            'Deposit','Remaining','Date',
            'Verified By','Status','Proof'
          ].map(col => (
            <th key={col} className="px-4 py-2">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {rows.map(r => (
          <tr key={r.id} className="even:bg-gray-100">
            <td className="border px-4 py-2">{r.student_id}</td>
            <td className="border px-4 py-2">{r.name}</td>
            <td className="border px-4 py-2">{r.incident}</td>
            <td className="border px-4 py-2">₹{r.fine}</td>
            <td className="border px-4 py-2">₹{r.deposit}</td>
            <td className="border px-4 py-2">₹{r.remaining}</td>
            <td className="border px-4 py-2">{r.date}</td>
            <td className="border px-4 py-2">{r.verified_by}</td>
            <td className="border px-4 py-2">
              <span
                className={
                  r.status === 'Verified'   ? 'text-green-700'
                  : r.status === 'Rejected' ? 'text-red-700'
                  :                           'text-yellow-700'
                }
              >
                {r.status}
              </span>
            </td>
            <td className="border px-4 py-2">
              {r.proof_url
                ? <a href={r.proof_url} target="_blank" rel="noopener">View</a>
                : '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
