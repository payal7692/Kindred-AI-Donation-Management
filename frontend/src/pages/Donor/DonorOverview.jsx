import { Link } from "react-router-dom";
import {
  Camera, Gift, Users, Truck, CheckCircle2,
  Leaf, Globe, Heart,
} from "lucide-react";
import "./DonorOverview.css";

// Sample data for now. Real numbers come from the backend later.
const stats = [
  { label: "Total donations", value: 22, note: "Items you've shared", icon: Gift },
  { label: "Active matches", value: 7, note: "NGOs supporting your items", icon: Users },
  { label: "Pickup due", value: 0, note: "Scheduled pickups", icon: Truck },
  { label: "Completed", value: 7, note: "Donations delivered", icon: CheckCircle2 },
];

const activity = [
  { title: "Donation created", detail: "Books × 1", time: "3 minutes ago" },
  { title: "Donation created", detail: "Books × 1", time: "4 minutes ago" },
  { title: "Donation created", detail: "chair × 1", time: "7 minutes ago" },
  { title: "Donation created", detail: "apple × 1", time: "11 minutes ago" },
];

export default function DonorOverview() {
  return (
    <div>
      <div className="ov-head">
        <div>
          <span className="kicker2">DONOR OVERVIEW</span>
          <h1>Good work this week, Testdonor! 👋</h1>
          <p>Track your donations, matches, and pickup progress.</p>
        </div>
        <Link to="/donor/scan" className="scan-btn">
          <Camera size={18} /> Scan items
        </Link>
      </div>

      <div className="stats">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div className="stat" key={s.label}>
              <span className="stat-icon"><Icon size={22} /></span>
              <div>
                <small>{s.label}</small>
                <strong>{s.value}</strong>
                <span className="note">{s.note}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="ov-grid">
        <div className="panel">
          <h3>Your impact</h3>
          <p className="muted">Together we create a better tomorrow.</p>

          <div className="impact">
            <div className="impact-item"><Leaf size={22} /><strong>28</strong><span>Items Donated</span></div>
            <div className="impact-item"><Users size={22} /><strong>7</strong><span>Completed Donations</span></div>
            <div className="impact-item"><Globe size={22} /><strong>3</strong><span>NGOs Supported</span></div>
            <div className="impact-item"><Heart size={22} /><strong>-</strong><span>Waste Reduced</span></div>
          </div>

          <div className="quote">
            "The best way to find yourself is to lose yourself in the service of others."
            <br />— Mahatma Gandhi
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3>Recent activity</h3>
            <Link to="/donor/donations" className="view-all">View all →</Link>
          </div>

          {activity.map((a, i) => (
            <div className="activity-row" key={i}>
              <span className="act-icon"><Gift size={18} /></span>
              <div>
                <strong>{a.title}</strong>
                <small>{a.detail}</small>
              </div>
              <span className="time">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}