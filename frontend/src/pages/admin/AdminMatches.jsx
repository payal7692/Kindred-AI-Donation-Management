
import { useState } from "react";
import {
  Search,
  Target,
  CheckCircle,
  Clock,
  XCircle,
  ArrowRight,
} from "lucide-react";
import "./AdminMatches.css";

const initialMatches = [
  {
    id: "MAT-1001",
    donor: "Rahul Sharma",
    ngo: "Helping Hands NGO",
    item: "Clothes",
    quantity: "25 pieces",
    distance: "3.2 km",
    score: 95,
    status: "Matched",
  },
  {
    id: "MAT-1002",
    donor: "Priya Verma",
    ngo: "Hope Foundation",
    item: "Food",
    quantity: "15 kg",
    distance: "5.1 km",
    score: 89,
    status: "Pending",
  },
  {
    id: "MAT-1003",
    donor: "Amit Patel",
    ngo: "Education For All",
    item: "Books",
    quantity: "40 books",
    distance: "2.5 km",
    score: 92,
    status: "Accepted",
  },
  {
    id: "MAT-1004",
    donor: "Neha Singh",
    ngo: "Child Care Trust",
    item: "Blankets",
    quantity: "12 pieces",
    distance: "7.4 km",
    score: 78,
    status: "Rejected",
  },
  {
    id: "MAT-1005",
    donor: "Vikas Jain",
    ngo: "Helping Hands NGO",
    item: "Toys",
    quantity: "20 pieces",
    distance: "4.0 km",
    score: 85,
    status: "Matched",
  },
];

function AdminMatches() {
  const [matches, setMatches] = useState(initialMatches);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredMatches = matches.filter((match) => {
    const matchesSearch =
      match.id.toLowerCase().includes(search.toLowerCase()) ||
      match.donor.toLowerCase().includes(search.toLowerCase()) ||
      match.ngo.toLowerCase().includes(search.toLowerCase()) ||
      match.item.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || match.status === filter;

    return matchesSearch && matchesFilter;
  });

  const updateStatus = (id, newStatus) => {
    setMatches((previous) =>
      previous.map((match) =>
        match.id === id
          ? { ...match, status: newStatus }
          : match
      )
    );
  };

  const total = matches.length;
  const matched = matches.filter((m) => m.status === "Matched").length;
  const accepted = matches.filter((m) => m.status === "Accepted").length;
  const pending = matches.filter((m) => m.status === "Pending").length;
  const rejected = matches.filter((m) => m.status === "Rejected").length;

  return (
    <div className="admin-matches-page">
      <div className="admin-matches-heading">
        <div>
          <span className="admin-matches-kicker">ADMIN MANAGEMENT</span>
          <h1>Smart Matches</h1>
          <p>Monitor donation and NGO matching activities.</p>
        </div>
      </div>

      <div className="admin-match-stats">
        <div className="admin-match-stat">
          <div className="admin-match-icon">
            <Target size={20} />
          </div>
          <div>
            <span>Total Matches</span>
            <h2>{total}</h2>
          </div>
        </div>

        <div className="admin-match-stat">
          <div className="admin-match-icon matched">
            <CheckCircle size={20} />
          </div>
          <div>
            <span>Matched</span>
            <h2>{matched}</h2>
          </div>
        </div>

        <div className="admin-match-stat">
          <div className="admin-match-icon accepted">
            <CheckCircle size={20} />
          </div>
          <div>
            <span>Accepted</span>
            <h2>{accepted}</h2>
          </div>
        </div>

        <div className="admin-match-stat">
          <div className="admin-match-icon pending">
            <Clock size={20} />
          </div>
          <div>
            <span>Pending</span>
            <h2>{pending}</h2>
          </div>
        </div>
      </div>

      <div className="admin-matches-panel">
        <div className="admin-matches-toolbar">
          <div>
            <h2>Matching Records</h2>
            <p>Review suggested connections between donors and NGOs.</p>
          </div>

          <div className="admin-matches-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search donor, NGO, item or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-match-filters">
          {["All", "Matched", "Accepted", "Pending", "Rejected"].map(
            (status) => (
              <button
                key={status}
                className={filter === status ? "active" : ""}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            )
          )}
        </div>

        <div className="admin-matches-table-wrap">
          <table className="admin-matches-table">
            <thead>
              <tr>
                <th>Match ID</th>
                <th>Donor</th>
                <th>NGO</th>
                <th>Donation Item</th>
                <th>Quantity</th>
                <th>Distance</th>
                <th>Match Score</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>
              {filteredMatches.map((match) => (
                <tr key={match.id}>
                  <td className="admin-match-id">{match.id}</td>
                  <td>{match.donor}</td>
                  <td>
                    <div className="admin-match-ngo">
                      <span>{match.ngo}</span>
                      <ArrowRight size={12} />
                    </div>
                  </td>
                  <td>{match.item}</td>
                  <td>{match.quantity}</td>
                  <td>{match.distance}</td>
                  <td>
                    <div className="admin-match-score">
                      <div className="admin-score-track">
                        <div
                          className="admin-score-fill"
                          style={{ width: `${match.score}%` }}
                        />
                      </div>
                      <strong>{match.score}%</strong>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`admin-match-status ${match.status.toLowerCase()}`}
                    >
                      {match.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="admin-match-status-select"
                      value={match.status}
                      onChange={(e) =>
                        updateStatus(match.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Matched">Matched</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}

              {filteredMatches.length === 0 && (
                <tr>
                  <td colSpan="9" className="admin-matches-empty">
                    <XCircle size={22} />
                    <p>No matching records found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-matches-footer">
          Showing {filteredMatches.length} of {total} matches
          <span>{rejected} rejected</span>
        </div>
      </div>
    </div>
  );
}

export default AdminMatches;
