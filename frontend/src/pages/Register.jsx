import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Building2, MapPin } from "lucide-react";
import AuthSide from "../components/AuthSide";
import "./Auth.css";

function Field({ label, icon, ...props }) {
  return (
    <div className="field">
      <label>{label}</label>
      <div className="input-wrap">
        {icon}
        <input {...props} />
      </div>
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("donor");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", ngoName: "", city: "",
  });

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in your name, email and password.");
      return;
    }
    // TEMPORARY: nothing is saved yet. Saving comes with the backend step.
    alert("Account created (demo). Please sign in.");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <AuthSide />

      <div className="auth-main">
        <form className="auth-card" onSubmit={handleSubmit}>
          <span className="kicker">KINDRED</span>
          <h2>Create account</h2>
          <p className="sub">Join Kindred and start making a difference.</p>

          <div className="field">
            <label>I am a</label>
            <div className="role-row">
              <button
                type="button"
                className={`role-btn ${role === "donor" ? "active" : ""}`}
                onClick={() => setRole("donor")}
              >
                Donor
              </button>
              <button
                type="button"
                className={`role-btn ${role === "ngo" ? "active" : ""}`}
                onClick={() => setRole("ngo")}
              >
                NGO
              </button>
            </div>
          </div>

          <Field label="Full name" icon={<User size={18} />} placeholder="Your name"
            value={form.name} onChange={update("name")} />
          <Field label="Email" icon={<Mail size={18} />} type="email" placeholder="you@example.com"
            value={form.email} onChange={update("email")} />
          <Field label="Phone number" icon={<Phone size={18} />} placeholder="10-digit number"
            value={form.phone} onChange={update("phone")} />

          {role === "ngo" && (
            <>
              <Field label="NGO name" icon={<Building2 size={18} />} placeholder="Name of your organisation"
                value={form.ngoName} onChange={update("ngoName")} />
              <Field label="City" icon={<MapPin size={18} />} placeholder="City"
                value={form.city} onChange={update("city")} />
            </>
          )}

          <Field label="Password" icon={<Lock size={18} />} type="password" placeholder="Create a password"
            value={form.password} onChange={update("password")} />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn">Create account</button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}