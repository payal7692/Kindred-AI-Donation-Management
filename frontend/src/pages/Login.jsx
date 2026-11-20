import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import AuthSide from "../components/AuthSide";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    // TEMPORARY: the email decides the dashboard.
    // The real login (with the database) comes in a later step.
    const lower = email.toLowerCase();
    if (lower.includes("admin")) navigate("/admin");
    else if (lower.includes("ngo")) navigate("/ngo");
    else navigate("/donor");
  };

  return (
    <div className="auth-page">
      <AuthSide />

      <div className="auth-main">
        <form className="auth-card" onSubmit={handleSubmit}>
          <span className="kicker">KINDRED</span>
          <h2>Welcome back</h2>
          <p className="sub">Support and distribute donations with clarity.</p>

          <div className="field">
            <label>Email</label>
            <div className="input-wrap">
              <Mail size={18} />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>Password</label>
            <div className="input-wrap">
              <Lock size={18} />
              <input
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="eye" onClick={() => setShow(!show)}>
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn">
            <LogIn size={18} /> Sign in
          </button>

          <p className="auth-switch">
            Need an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}