// src/pages/Dashboard/Dashboard.jsx
import React from 'react';
import Logout from '../Logout/index.jsx';

const Dashboard = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div>
      <h1 className="text-2xl mb-4">Welcome to Dashboard</h1>
      <Logout />
    </div>
  </div>
);

export default Dashboard;
