import { Link } from "react-router-dom";
import { donations, STATUSES, EMOJI } from "../../data/sampleDonations";
import "./DonorOverview.css";
import "./DonorPages.css";

export function statusClass(index) {
  if (index === 0) return "st-new";
  if (index === STATUSES.length - 1) return "st-done";
  return "st-mid";
}

export default function DonorDonations() {
  return (
    <div>
      <span className="kicker2">DONATIONS</span>
      <h1 className="dp-title">My Donations</h1>
      <p className="dp-sub">Track every donation from submission through delivery.</p>

      {donations.map((d) => (
        <Link to={`/donor/donations/${d.id}`} className="don-card" key={d.id}>
          <span className="don-icon">{EMOJI[d.category]}</span>
          <div className="don-info">
            <h4>Donation #{d.id}</h4>
            <small>Items: {d.item} × {d.quantity}</small>
            <small>Created: {d.times[0]}</small>
          </div>
          <span className={`st-badge ${statusClass(d.statusIndex)}`}>
            {STATUSES[d.statusIndex]}
          </span>
        </Link>
      ))}
    </div>
  );
}