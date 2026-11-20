import { Link } from "react-router-dom";
import { Plus, ClipboardList, Users, CheckCircle2, Package, ArrowRight } from "lucide-react";
import "../donor/DonorOverview.css";

// Sample numbers for now. Real ones come from the backend later.
const stats = [
  { label: "Our Demands", value: 16, note: "Active needs published", icon: ClipboardList },
  { label: "Donation Matches", value: 0, note: "Waiting for your review", icon: Users },
  { label: "Accepted", value: 8, note: "Matches you accepted", icon: CheckCircle2 },
  { label: "Donations", value: 0, note: "Items received", icon: Package },
];

const quick = [
  { to: "/ngo/demands", title: "Our Demands", text: "Create, edit or remove your published demands" },
  { to: "/ngo/matches", title: "Matches", text: "Review donations matched to your needs" },
  { to: "/ngo/staff", title: "Staff", text: "Manage the people who handle packaging and pickup" },
];

export default function NgoOverview() {
  return (
    <div>
      <div className="ov-head">
        <div>
          <span className="kicker2">NGO OVERVIEW</span>
          <h1>Welcome back!</h1>
          <p>
            Manage your demands and review suitable incoming donations.
            Together, we can turn kindness into real impact.
          </p>
        </div>
        <Link to="/ngo/demands" className="scan-btn">
          <Plus size={18} /> Add Demand
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

      <div className="panel">
        <h3>Quick actions</h3>
        <p className="muted">Jump to the sections you use most often.</p>
        {quick.map((q) => (
          <Link to={q.to} className="quick-row" key={q.to}>
            <div>
              <strong>{q.title}</strong>
              <small>{q.text}</small>
            </div>
            <ArrowRight size={18} />
          </Link>
        ))}
      </div>
    </div>
  );
}