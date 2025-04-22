import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  LineChart, Line, Legend
} from "recharts";
import { Card, CardBody } from "react-bootstrap";

const monthlyCollection = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 1500 },
  { month: "Mar", amount: 1800 },
  { month: "Apr", amount: 1100 },
  { month: "May", amount: 2000 },
];

const fineCategories = [
  { name: "Graffiti", value: 400 },
  { name: "Broken Desk", value: 300 },
  { name: "Window Damage", value: 300 },
  { name: "Electrical", value: 200 },
  { name: "Other", value: 100 },
];

const verificationTeamActivity = [
  { month: "Jan", MrKhan: 10, MsSingh: 12 },
  { month: "Feb", MrKhan: 14, MsSingh: 10 },
  { month: "Mar", MrKhan: 8, MsSingh: 15 },
  { month: "Apr", MrKhan: 12, MsSingh: 8 },
  { month: "May", MrKhan: 16, MsSingh: 14 },
];

const topStudents = [
  { name: "John", fine: 550 },
  { name: "Alice", fine: 480 },
  { name: "Raj", fine: 430 },
  { name: "Sara", fine: 400 },
  { name: "Aman", fine: 350 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9370DB"];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 3000,
    easing: "easeInOutQuart",
  },
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const Charts = () => {
  const pendingVerifications = 7;

  return (
    <div className="container py-4">
      <h4 className="fw-bold text-primary mb-4 text-center">📊 Admin Dashboard</h4>

      {/* Row 1: Monthly Collection & Fine Category */}
      <div className="row mb-4">
        <div className="col-md-6">
          <Card className="shadow-sm rounded-4">
            <CardBody>
              <h6 className="text-center fw-semibold mb-3">Monthly Collection Report</h6>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyCollection}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="amount"
                    fill="#0d6efd"
                    radius={[4, 4, 0, 0]}
                    animationDuration={chartOptions.animation.duration}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-6">
          <Card className="shadow-sm rounded-4">
            <CardBody>
              <h6 className="text-center fw-semibold mb-3">Fine Category Distribution</h6>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Tooltip />
                  <Legend verticalAlign="bottom" />
                  <Pie
                    data={fineCategories}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                    animationDuration={chartOptions.animation.duration}
                  >
                    {fineCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Row 2: Verification Activity & Pending */}
      <div className="row mb-4">
        <div className="col-md-8">
          <Card className="shadow-sm rounded-4">
            <CardBody>
              <h6 className="text-center fw-semibold mb-3">Verification Team Activity</h6>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={verificationTeamActivity}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="bottom" />
                  <Line
                    type="monotone"
                    dataKey="MrKhan"
                    stroke="#0d6efd"
                    animationDuration={chartOptions.animation.duration}
                  />
                  <Line
                    type="monotone"
                    dataKey="MsSingh"
                    stroke="#20c997"
                    animationDuration={chartOptions.animation.duration}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="shadow-sm rounded-4 text-center">
            <CardBody className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100%" }}>
              <h6 className="fw-semibold">Pending Verifications</h6>
              <h3 className="text-warning fw-bold">{pendingVerifications}</h3>
              <span className="text-muted small">as of this month</span>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Row 3: Top 5 Students */}
      <div className="row">
        <div className="col-12">
          <Card className="shadow-sm rounded-4">
            <CardBody>
              <h6 className="text-center fw-semibold mb-3">Top 5 Students with Highest Fines</h6>
              <ul className="list-group">
                {topStudents.map((student, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {index + 1}. {student.name}
                    <span className="badge bg-danger rounded-pill">₹{student.fine}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Charts;
