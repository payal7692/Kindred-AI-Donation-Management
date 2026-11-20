import { useState } from "react";
import { Search, MapPin, Mail, Phone, BadgeCheck, Clock } from "lucide-react";
import "../donor/DonorOverview.css";
import "./AdminOverview.css";
import "./AdminPeople.css";

export default function AdminPeople({ kicker, title, subtitle, noun, initialRows }) {
  const [rows, setRows] = useState(initialRows);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const toggleVerified = (id) =>
    setRows(rows.map((r) => (r.id === id ? { ...r, verified: !r.verified } : r)));

  const verifiedCount = rows.filter((r) => r.verified).length;

  const shown = rows.filter((r) => {
    const text = `${r.name} ${r.email} ${r.city}`.toLowerCase();
    const okSearch = text.includes(search.toLowerCase());
    const okFilter =
      filter === "all" ||
      (filter === "verified" && r.verified) ||
      (filter === "unverified" && !r.verified);
    return okSearch && okFilter;
  });

  return (
    <div>
      <span className="kicker2">{kicker}</span>
      <h1 className="admin-title">{title}</h1>
      <p className="admin-sub">{subtitle}</p>

      <div className="stats three">
        <div className="stat">
          <span className="stat-icon"><BadgeCheck size={22} /></span>
          <div><small>Total {noun}</small><strong>{rows.length}</strong></div>
        </div>
        <div className="stat">
          <span className="stat-icon"><BadgeCheck size={22} /></span>
          <div><small>Verified {noun}</small><strong>{verifiedCount}</strong></div>
        </div>
        <div className="stat">
          <span className="stat-icon"><Clock size={22} /></span>
          <div><small>Unverified {noun}</small><strong>{rows.length - verifiedCount}</strong></div>
        </div>
      </div>

      <div className="panel">
        <div className="toolbar">
          <div className="search-box2">
            <Search size={16} />
            <input
              placeholder="Search by name, email, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All {noun}</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
        </div>

        <div className="table-wrap">
          <table className="people-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Joined on</th>
                <th>Contributions</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((r, i) => (
                <tr key={r.id}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="person">
                      <span className="p-avatar">{r.name.slice(0, 1).toUpperCase()}</span>
                      <strong>{r.name}</strong>
                    </div>
                  </td>
                  <td>
                    <div className="cell-line"><Mail size={13} /> {r.email}</div>
                    <div className="cell-line"><Phone size={13} /> {r.phone}</div>
                  </td>
                  <td><div className="cell-line"><MapPin size={13} /> {r.city}</div></td>
                  <td>{r.joined}</td>
                  <td>{r.contributions}</td>
                  <td>
                    <span className={`status ${r.verified ? "ok" : "wait"}`}>
                      {r.verified ? "Verified" : "Unverified"}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`verify-btn ${r.verified ? "undo" : ""}`}
                      onClick={() => toggleVerified(r.id)}
                    >
                      {r.verified ? "Unverify" : "Verify"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {shown.length === 0 && <p className="muted">No results found.</p>}
        </div>

        <p className="muted">Showing {shown.length} of {rows.length} {noun.toLowerCase()}</p>
      </div>
    </div>
  );
}