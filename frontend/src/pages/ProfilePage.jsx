import { useState } from "react";
import { Check } from "lucide-react";
import "./donor/DonorOverview.css";
import "./ProfilePage.css";

export default function ProfilePage({ role }) {
  const isNgo = role === "ngo";
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: isNgo ? "Test Community NGO" : "Test Donor",
    email: isNgo ? "testngo@example.com" : "testdonor@example.com",
    phone: "9876543210",
    city: "Karur",
    address: "",
    registration: "",
  });

  const update = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
    setSaved(false);
  };

  const save = (e) => {
    e.preventDefault();
    // Not saved anywhere yet. Real saving comes with the backend step.
    setSaved(true);
  };

  return (
    <div>
      <span className="kicker2">PROFILE</span>
      <h1 className="pf-title">My Profile</h1>
      <p className="pf-sub">Keep your details up to date so pickups and matches run smoothly.</p>

      <form className="panel pf-form" onSubmit={save}>
        <div className="pf-top">
          <span className="pf-avatar">{form.name.slice(0, 1).toUpperCase()}</span>
          <div>
            <strong>{form.name}</strong>
            <small>{isNgo ? "NGO account" : "Donor account"}</small>
          </div>
        </div>

        <div className="pf-grid">
          <div className="pf-field">
            <label>{isNgo ? "NGO name" : "Full name"}</label>
            <input value={form.name} onChange={update("name")} />
          </div>
          <div className="pf-field">
            <label>Email (cannot be changed)</label>
            <input value={form.email} readOnly className="locked" />
          </div>
          <div className="pf-field">
            <label>Phone number</label>
            <input value={form.phone} onChange={update("phone")} />
          </div>
          <div className="pf-field">
            <label>City</label>
            <input value={form.city} onChange={update("city")} />
          </div>
          <div className="pf-field wide">
            <label>Address (used for pickups)</label>
            <input placeholder="House no, street, area" value={form.address} onChange={update("address")} />
          </div>
          {isNgo && (
            <div className="pf-field wide">
              <label>Registration number</label>
              <input placeholder="NGO registration number" value={form.registration} onChange={update("registration")} />
            </div>
          )}
        </div>

        <div className="pf-actions">
          <button type="submit" className="pf-save">Save changes</button>
          {saved && (
            <span className="pf-saved"><Check size={16} /> Saved (demo only)</span>
          )}
        </div>
      </form>
    </div>
  );
}