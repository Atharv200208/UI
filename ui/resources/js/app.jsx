import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import Layout from './components/Layout';
import Home from './components/Home';
import Deposit from './components/Deposit';
import Reports from './components/Reports';
import StudentHistoryTable from './components/pages/StudentHistoryTable';
import FinePaymentReport from './components/pages/FinePaymentView';
import VerificationFeedbackReport from './components/pages/VerificationFeedbackReport';
import Charts from './admin/components/charts/Chart';
import YearlySummaryReport from './admin/pages/YearlySummaryReports';
import AddReportForm from './admin/pages/AddReportForm';
import YearlyReport from './admin/pages/YearlyReport';

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex">
        <Layout />
        <div className="flex-grow-1 p-4">
          <Routes>
            <Route path="/History" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/Deposit" element={<Deposit />} />
            <Route path='/Reports' element={<Reports />} />
            <Route path='/Student-History-Table' element={<StudentHistoryTable />} />
            <Route path='/FinePaymentReport' element={<FinePaymentReport />} />
            <Route path='/Verification-Feedback-Report' element={<VerificationFeedbackReport />} /> 
            <Route path='/Charts' element={<Charts />} />
            <Route path='/Yearly-Summary-Report' element={<YearlySummaryReport />} />
            <Route path='/Add-Report-Form' element={<AddReportForm />} />
            <Route path='/Yearly-Report' element={<YearlyReport />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

const container = document.getElementById('root');
console.log('ROOT ELEMENT:', document.getElementById('root'));
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
