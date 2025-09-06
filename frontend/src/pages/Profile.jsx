
function Profile() {
  // Placeholder user data
  const [user, setUser] = useState({
    name: "Eco User",
    email: "eco@example.com",
    avatar: `https://ui-avatars.com/api/?name=Eco+User&background=6366f1&color=fff&size=128`,
  });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      ...form,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=6366f1&color=fff&size=128`,
    });
    setEditing(false);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      <div className="profile-avatar-row">
        <img className="profile-avatar" src={user.avatar} alt="User Avatar" />
      </div>
      {!editing && (
        <div className="profile-welcome">Welcome to your profile, <b>{user.name}</b>!</div>
      )}
      {editing ? (
        <form className="profile-form" onSubmit={handleSave}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} required />
          <button type="submit" className="profile-btn">Save</button>
        </form>
      ) : (
        <div className="profile-info">
          <div><b>Name:</b> {user.name}</div>
          <div><b>Email:</b> {user.email}</div>
          <button className="profile-btn" onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
