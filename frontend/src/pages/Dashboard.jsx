import React from "react";

function Dashboard() {
  const user = { name: "Eco User", email: "eco@example.com" }; // placeholder

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.name}!</p>
      <p>Email: {user.email}</p>
      <button>Edit Profile</button>
      <button>Logout</button>
    </div>
  );
}

export default Dashboard;
