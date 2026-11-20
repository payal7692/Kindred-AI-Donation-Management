import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, FileText, Users, Package, Truck, PackageCheck, Home, CheckCircle2,
} from "lucide-react";
import { donations, STATUSES, NOTES } from "../../data/sampleDonations";
import { statusClass } from "./DonorDonations";
import "./DonorOverview.css";
import "./DonorPages.css";

const ICONS = [FileText, Users, Package, Truck, PackageCheck, Home, CheckCircle2];

// Fake matches shown when you click "Find matches".
const SAMPLE_MATCHES = [
  { ngo: "Test Community NGO", pct: 94, why: "Needs this item type, close to you, high priority" },
  { ngo: "Hope Foundation", pct: 78, why: "Needs this item type, 12 km away" },
];

export default function DonationDetail() {
  const { id } = useParams();
  const donation = donations.find((d) => d.id === id);
  const [cancelled, setCancelled] = useState(false);
  const [matches, setMatches] = useState(null);

  if (!donation) {
    return (
      <div>
        <Link to="/donor/donations" className="back-link">
          <ArrowLeft size={16} /> Back to donations
        </Link>
        <h2>Donation not found</h2>
      </div>
    );
  }

  const reached = STATUSES.slice(0, donation.statusIndex + 1);

  return (
    <div>
      <Link to="/donor/donations" className="back-link">
        <ArrowLeft size={16} /> Back to donations
      </Link>

      <span className="kicker2">DONATION DETAIL</span>
      <h1 className="dp-title">Donation journey</h1>
      <p className="dp-sub">
        #{donation.id} · {donation.item} × {donation.quantity}{" "}
        <span className={`st-badge ${cancelled ? "st-cancel" : statusClass(donation.statusIndex)}`}>
          {cancelled ? "Cancelled" : STATUSES[donation.statusIndex]}
        </span>
      </p>

      <div className="journey">
        <div>
          <div className="panel">
            <h3>Status</h3>
            <ul className="timeline">
              {STATUSES.map((s, i) => {
                const Icon = ICONS[i];
                const done = i <= donation.statusIndex;
                return (
                  <li className={`tl-item ${done ? "done" : ""}`} key={s}>
                    <span className="tl-dot"><Icon size={18} /></span>
                    <div className="tl-text">
                      <strong>{s}</strong>
                      <small>{done ? donation.times[i] : "Waiting"}</small>
                    </div>
                  </li>
                );
              })}
            </ul>

            {donation.statusIndex === 0 && !cancelled && (
              <div className="dp-actions">
                <button type="button" className="dp-btn danger" onClick={() => setCancelled(true)}>
                  Cancel donation
                </button>
              </div>
            )}
          </div>

          <div className="panel" style={{ marginTop: 20 }}>
            <div className="panel-head">
              <h3>NGO matches</h3>
              {donation.statusIndex === 0 && !cancelled && !matches && (
                <button type="button" className="dp-btn" onClick={() => setMatches(SAMPLE_MATCHES)}>
                  Find matches
                </button>
              )}
            </div>

            {donation.statusIndex > 0 && (
              <p className="muted">Matched with Test Community NGO.</p>
            )}
            {donation.statusIndex === 0 && !matches && (
              <p className="muted">
                No matches are available yet. Find matches to request ranked recommendations.
              </p>
            )}
            {matches &&
              matches.map((m) => (
                <div className="match-row" key={m.ngo}>
                  <div>
                    <strong>{m.ngo}</strong>
                    <small>{m.why}</small>
                  </div>
                  <span className="pct">{m.pct}%</span>
                </div>
              ))}
          </div>
        </div>

        <div className="panel">
          <h3>Status history</h3>
          {[...reached].reverse().map((s) => {
            const i = STATUSES.indexOf(s);
            return (
              <div className="hist-item" key={s}>
                <span className="hist-tag">{s}</span>
                <div>{donation.times[i]}</div>
                <small>{NOTES[s]}</small>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}