import { useState } from "react";
import { X } from "lucide-react";
import { matches as initial, WEIGHTS, overall } from "../data/sampleMatches";
import "../pages/donor/DonorOverview.css";
import "./MatchesView.css";

const FACTORS = [
  { key: "item", label: "Item compatibility" },
  { key: "quantity", label: "Quantity fit" },
  { key: "distance", label: "Distance" },
  { key: "priority", label: "NGO demand priority" },
];

export default function MatchesView({ role }) {
  const [rows, setRows] = useState(initial);
  const [selected, setSelected] = useState(null);
  const isNgo = role === "ngo";

  const setStatus = (id, status) =>
    setRows(rows.map((r) => (r.id === id ? { ...r, status } : r)));

  return (
    <div>
      <span className="kicker2">MATCHES</span>
      <h1 className="mv-title">Donation Matches</h1>
      <p className="mv-sub">
        {isNgo
          ? "Review donations matched to your demands."
          : "See which NGOs are matched to your donations and why."}
      </p>

      <div className="mv-grid">
        {rows.map((m) => {
          const pct = overall(m.scores);
          return (
            <div className="mv-card" key={m.id}>
              <div className="mv-top">
                <div>
                  <small>DONATION MATCH</small>
                  <h4>#{m.id}</h4>
                </div>
                <span className={`mv-status ${m.status.toLowerCase()}`}>{m.status}</span>
              </div>

              <div className="mv-strength">
                <span>Match strength</span>
                <strong>{pct}%</strong>
              </div>
              <div className="mv-bar"><div style={{ width: `${pct}%` }} /></div>

              <div className="mv-line">
                <small>DONATION ITEMS</small>
                <span>{m.item} × {m.quantity}</span>
              </div>
              <div className="mv-line">
                <small>{isNgo ? "YOUR DEMAND" : "MATCHED NGO"}</small>
                <span>{isNgo ? m.need : m.ngo}</span>
              </div>

              <div className="mv-actions">
                <button type="button" className="mv-btn" onClick={() => setSelected(m)}>
                  View match details
                </button>
                {isNgo && m.status === "Pending" && (
                  <>
                    <button type="button" className="mv-btn ok" onClick={() => setStatus(m.id, "Accepted")}>
                      Accept
                    </button>
                    <button type="button" className="mv-btn no" onClick={() => setStatus(m.id, "Declined")}>
                      Decline
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="mv-overlay" onClick={() => setSelected(null)}>
          <div className="mv-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="mv-close" onClick={() => setSelected(null)}>
              <X size={18} />
            </button>

            <small className="mv-kicker">MATCH DETAILS</small>
            <h2>Match breakdown</h2>
            <div className="mv-big">
              {overall(selected.scores)}% <span>overall match</span>
            </div>
            <p className="mv-explain">
              This percentage combines item compatibility ({WEIGHTS.item}%), quantity fit
              ({WEIGHTS.quantity}%), distance ({WEIGHTS.distance}%), and NGO demand priority
              ({WEIGHTS.priority}%).
            </p>

            <div className="mv-donation">
              Donation: {selected.item} × {selected.quantity}
            </div>

            {FACTORS.map((f) => {
              const score = selected.scores[f.key];
              const weight = WEIGHTS[f.key];
              const points = ((score * weight) / 100).toFixed(1);
              return (
                <div className="mv-factor" key={f.key}>
                  <div className="mv-factor-head">
                    <strong>{f.label}</strong>
                    <span>{score} of 100</span>
                  </div>
                  <div className="mv-bar"><div style={{ width: `${score}%` }} /></div>
                  <small>
                    Weighted up to {weight}% · adds {points} of {weight} points
                  </small>
                </div>
              );
            })}

            <p className="mv-note">
              Matches use rule-based scoring; semantic similarity is not included.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}