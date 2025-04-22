import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

export default function Layout() {
  return (
    <div>
      <div
        className="bg-dark text-white position-fixed"
        style={{ width: '250px', height: '100vh', top: 0, left: 0, zIndex: 1000 }}
      >
        <Sidebar />
      </div>
      <div className="flex-grow-1" style={{ marginLeft: '250px', padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
}
