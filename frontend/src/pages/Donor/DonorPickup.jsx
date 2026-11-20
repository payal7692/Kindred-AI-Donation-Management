import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";
import { donations, STATUSES, EMOJI } from "../../data/sampleDonations";
import { statusClass } from "./DonorDonations";
import "./DonorOverview.css";
import "./DonorPages.css";

export default function DonorPickup() {
  const withPickup = donations.filter((d) => d.pickup);

  return (
    <div>
      <span className="kicker2">PICKUP</span>
      <h1 className="dp-title">Pickup Management</h1>
      <p className="dp-sub">Schedule and track collection for matched donations.</p>

      {withPickup.length === 0 && <p className="muted">No pickups scheduled yet.</p>}

      {withPickup.map((d) => (
        <div className="don-card" key={d.id}>
          <span className="don-icon">{EMOJI[d.category]}</span>
          <div className="don-info">
            <h4>Donation #{d.id}</h4>
            <small>Items: {d.item} × {d.quantity}</small>
            <small>
              <CalendarDays size={13} style={{ verticalAlign: "-2px" }} /> Pickup date: {d.pickup}
            </small>
            <Link to={`/donor/donations/${d.id}`} className="don-link">
              View pickup details <ArrowRight size={14} />
            </Link>
          </div>
          <span className={`st-badge ${statusClass(d.statusIndex)}`}>
            {STATUSES[d.statusIndex]}
          </span>
        </div>
      ))}
    </div>
  );
}