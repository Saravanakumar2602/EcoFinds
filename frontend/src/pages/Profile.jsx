import React, { useState } from "react";
import "../styles/pages/profile.css"; // ✅ link your CSS file

const initialProfile = {
  name: "Eco User",
  email: "eco@example.com",
  address: "123 Main St, Springfield, USA",
  avatar: `https://ui-avatars.com/api/?name=Eco+User&background=6366f1&color=fff&size=128`,
};

function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(profile);
  const [deleted, setDeleted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setForm(profile);
    setEditMode(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile({
      ...form,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        form.name
      )}&background=6366f1&color=fff&size=128`,
    });
    setEditMode(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      setDeleted(true);
    }
  };

  if (deleted) {
    return (
      <div className="profile-container">
        <h2>Profile Deleted</h2>
        <p>Your profile has been deleted.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      <div className="profile-avatar-row">
        <img
          className="profile-avatar"
          src={profile.avatar}
          alt="User Avatar"
        />
      </div>
      {!editMode && (
        <div className="profile-welcome">
          Welcome to your profile, <b>{profile.name}</b>!
        </div>
      )}
      {editMode ? (
        <form className="profile-form" onSubmit={handleSave}>
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label>Delivery Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <div className="profile-actions">
            <button type="submit" className="profile-btn save-btn">
              Save
            </button>
            <button
              type="button"
              className="profile-btn cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="profile-btn delete-btn"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <div>
            <b>Name:</b> {profile.name}
          </div>
          <div>
            <b>Email:</b> {profile.email}
          </div>
          <div>
            <b>Delivery Address:</b> {profile.address}
          </div>
          <button className="profile-btn edit-btn" onClick={handleEdit}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
