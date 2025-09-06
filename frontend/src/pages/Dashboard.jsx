
import React from "react";
import "../styles/pages/dashboard.css";


function Dashboard() {
  const user = { name: "Eco User", email: "eco@example.com" }; // placeholder

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">Dashboard</div>
        <div className="dashboard-user">
          <img
            className="dashboard-avatar"
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=128`}
            alt="User Avatar"
          />
          <div className="dashboard-user-info">
            <span className="dashboard-user-name">{user.name}</span>
            <span className="dashboard-user-email">{user.email}</span>
          </div>
        </div>
      </div>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="dashboard-card-title">My Listings</div>
          <div className="dashboard-card-value">3</div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-title">Purchases</div>
          <div className="dashboard-card-value">5</div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-title">Cart Items</div>
          <div className="dashboard-card-value">2</div>
        </div>
      </div>
      <div className="dashboard-actions">
        <button className="dashboard-action-btn">Edit Profile</button>
        <button className="dashboard-action-btn">Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
