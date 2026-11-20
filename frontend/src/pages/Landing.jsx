import { Link } from "react-router-dom";
import { Camera, Users, Package, Cpu, ShieldCheck, Heart } from "lucide-react";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing">
      <header className="nav">
        <div className="brand">
          <Heart className="brand-icon" size={30} fill="currentColor" />
          <div>
            <strong>Kindred</strong>
            <span>A kinder tomorrow, together</span>
          </div>
        </div>

        <nav className="nav-links">
          <a href="#how">How it works</a>
          <a href="#donors">For Donors</a>
          <a href="#ngos">For NGOs</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-right">
          <select className="lang">
            <option>English</option>
            <option>हिन्दी</option>
            <option>বাংলা</option>
          </select>
          <Link to="/login" className="btn btn-dark">Go to Dashboard</Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>
            Give better.
            <br />
            Match smarter.
          </h1>
          <p>
            Kindred uses AI to identify donated items and intelligently connect
            them with NGO needs.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="btn btn-dark">Start Donating →</Link>
            <a href="#how" className="btn btn-outline">Explore Kindred</a>
          </div>

          <div className="badges">
            <div className="badge-item">
              <Cpu size={22} />
              <div><strong>AI-powered</strong><span>Smarter donations</span></div>
            </div>
            <div className="badge-item">
              <ShieldCheck size={22} />
              <div><strong>Transparent</strong><span>Builds trust</span></div>
            </div>
            <div className="badge-item">
              <Users size={22} />
              <div><strong>Community-driven</strong><span>A stronger tomorrow</span></div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="big-box">📦</div>

          <div className="chip chip1">
            <strong>👕 Clothing</strong>
            <span>Shirt, 1 item</span>
          </div>
          <div className="chip chip2">
            <strong>💻 Electronics</strong>
            <span>Laptop, 1 item</span>
          </div>
          <div className="chip chip3">
            <strong>📚 Books</strong>
            <span>3 items</span>
          </div>

          <div className="flow">
            <div className="chip"><strong>You</strong><span>Donate items</span></div>
            <span className="heart">♥</span>
            <div className="chip"><strong>NGO</strong><span>Receives and helps</span></div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature green">
          <div className="feature-icon"><Camera size={24} /></div>
          <h3>AI Item Detection</h3>
          <p>Snap a photo and our AI identifies the items and how many there are.</p>
        </div>
        <div className="feature pink">
          <div className="feature-icon"><Users size={24} /></div>
          <h3>Smart NGO Matching</h3>
          <p>Donations are matched to NGOs by item type, quantity, distance and priority.</p>
        </div>
        <div className="feature blue">
          <div className="feature-icon"><Package size={24} /></div>
          <h3>Track Every Step</h3>
          <p>Follow each donation from submission all the way to acknowledgement.</p>
        </div>
      </section>
    </div>
  );
}