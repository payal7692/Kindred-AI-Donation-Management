import { Link } from "react-router-dom";
import {
  Building2, Heart, Gift, ClipboardList, Link2, TrendingUp, ShieldCheck,
} from "lucide-react";
import "../donor/DonorOverview.css";
import "./AdminOverview.css";

// Sample numbers for now. Real ones come from the backend later.
const stats = [
  { label: "Total NGOs", value: 1, icon: Building2 },
  { label: "Total Donors", value: 2, icon: Heart },
  { label: "Total Donations", value: 23, icon: Gift },
  { label: "Total Demands", value: 16, icon: ClipboardList },
  { label: "Total Matches", value: 8, icon: Link2 },
];

const recentNgos = [{ name: "Test Community NGO", meta: "Chennai" }];
const recentDonors = [
  { name: "TestDonor", meta: "Chennai" },
  { name: "Test Donor", meta: "Karur" },
];
const recentDonations = [
  { name: "Books × 1", meta: "3 minutes ago" },
  { name: "chair × 1", meta: "7 minutes ago" },
  { name: "apple × 1", meta: "11 minutes ago" },
];

function Ring({ percent, label, verified, unverified }) {
  return (
    <div className="ring-box">
      <div
        className="ring"
        style={{ background: `conic-gradient(#3f8a5f ${percent * 3.6}deg, #e5e7eb 0deg)` }}
      >
        <span>{percent}%</span>
      </div>
      <strong>{label}</strong>
      <small>{verified} Verified</small>
      <small>{unverified} Unverified</small>
    </div>
  );
}

function RecentList({ title, to, items }) {
  return (
    <div className="panel">
      <div className="panel-head">
        <h3>{title}</h3>
        <Link to={to} className="view-all">View all →</Link>
      </div>
      {items.map((it, i) => (
        <div className="activity-row" key={i}>
          <div>
            <strong>{it.name}</strong>
            <small>{it.meta}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminOverview() {
  return (
    <div>
      <span className="kicker2">ADMIN OVERVIEW</span>
      <h1 className="admin-title">Admin Overview</h1>
      <p className="admin-sub">Platform administration overview and key insights.</p>

      <div className="stats five">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div className="stat" key={s.label}>
              <span className="stat-icon"><Icon size={22} /></span>
              <div>
                <small>{s.label}</small>
                <strong>{s.value}</strong>
              </div>
            </div>
          );
        })}
      </div>

      <div className="ov-grid">
        <div className="panel">
          <h3><TrendingUp size={18} /> Platform Growth (Last 6 Months)</h3>
          <p className="muted">No historical growth data available yet.</p>
          <div className="empty-chart">Growth chart will appear here once the backend is connected.</div>
        </div>

        <div className="panel">
          <h3><ShieldCheck size={18} /> Verification Status</h3>
          <div className="rings">
            <Ring percent={100} label="NGOs Verified" verified={1} unverified={0} />
            <Ring percent={0} label="Donors Verified" verified={0} unverified={2} />
          </div>
        </div>
      </div>

      <div className="three-col">
        <RecentList title="Recent NGOs" to="/admin/ngos" items={recentNgos} />
        <RecentList title="Recent Donors" to="/admin/donors" items={recentDonors} />
        <RecentList title="Recent Donations" to="/admin/donations" items={recentDonations} />
      </div>
    </div>
  );
}