
import { useState } from "react";
import {
  Search,
  ClipboardList,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "./AdminDemands.css";

const initialDemands = [
  {
    id: "DEM-1001",
    ngo: "Helping Hands NGO",
    item: "Clothes",
    quantity: "100 pieces",
    priority: "High",
    date: "04 Nov 2026",
    status: "Pending",
  },
  {
    id: "DEM-1002",
    ngo: "Hope Foundation",
    item: "Food",
    quantity: "50 kg",
    priority: "Urgent",
    date: "03 Nov 2026",
    status: "Approved",
  },
  {
    id: "DEM-1003",
    ngo: "Education For All",
    item: "Books",
    quantity: "200 books",
    priority: "Medium",
    date: "02 Nov 2026",
    status: "Pending",
  },
  {
    id: "DEM-1004",
    ngo: "Child Care Trust",
    item: "Toys",
    quantity: "75 pieces",
    priority: "Low",
    date: "01 Nov 2026",
    status: "Fulfilled",
  },
  {
    id: "DEM-1005",
    ngo: "Helping Hands NGO",
    item: "Blankets",
    quantity: "40 pieces",
    priority: "High",
    date: "31 Oct 2026",
    status: "Rejected",
  },
];

function AdminDemands() {
  const [demands, setDemands] = useState(initialDemands);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredDemands = demands.filter((demand) => {
    const matchesSearch =
      demand.id.toLowerCase().includes(search.toLowerCase()) ||
      demand.ngo.toLowerCase().includes(search.toLowerCase()) ||
      demand.item.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || demand.status === filter;

    return matchesSearch && matchesFilter;
  });

  const updateStatus = (id, newStatus) => {
    setDemands((previous) =>
      previous.map((demand) =>
        demand.id === id
          ? { ...demand, status: newStatus }
          : demand
      )
    );
  };

  const total = demands.length;
  const pending = demands.filter((d) => d.status === "Pending").length;
  const approved = demands.filter((d) => d.status === "Approved").length;
  const fulfilled = demands.filter((d) => d.status === "Fulfilled").length;

  return (
    <div className="admin-demands-page">
      <div className="admin-demands-heading">
        <div>
          <span className="admin-demands-kicker">ADMIN MANAGEMENT</span>
          <h1>NGO Demands</h1>
          <p>Review and manage resource requirements submitted by NGOs.</p>
        </div>
      </div>

      <div className="admin-demand-stats">
        <div className="admin-demand-stat">
          <div className="admin-demand-icon">
            <ClipboardList size={20} />
          </div>
          <div>
            <span>Total Demands</span>
            <h2>{total}</h2>
          </div>
        </div>

        <div className="admin-demand-stat">
          <div className="admin-demand-icon pending">
            <Clock size={20} />
          </div>
          <div>
            <span>Pending</span>
            <h2>{pending}</h2>
          </div>
        </div>

        <div className="admin-demand-stat">
          <div className="admin-demand-icon approved">
            <CheckCircle size={20} />
          </div>
          <div>
            <span>Approved</span>
            <h2>{approved}</h2>
          </div>
        </div>

        <div className="admin-demand-stat">
          <div className="admin-demand-icon fulfilled">
            <AlertCircle size={20} />
          </div>
          <div>
            <span>Fulfilled</span>
            <h2>{fulfilled}</h2>
          </div>
        </div>
      </div>

      <div className="admin-demands-panel">
        <div className="admin-demands-toolbar">
          <div>
            <h2>Demand Records</h2>
            <p>All resource requests submitted by registered NGOs.</p>
          </div>

          <div className="admin-demands-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search NGO, item or demand ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-demand-filters">
          {["All", "Pending", "Approved", "Rejected", "Fulfilled"].map(
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

        <div className="admin-demands-table-wrap">
          <table className="admin-demands-table">
            <thead>
              <tr>
                <th>Demand ID</th>
                <th>NGO Name</th>
                <th>Required Item</th>
                <th>Quantity</th>
                <th>Priority</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredDemands.map((demand) => (
                <tr key={demand.id}>
                  <td className="admin-demand-id">{demand.id}</td>
                  <td>{demand.ngo}</td>
                  <td>{demand.item}</td>
                  <td>{demand.quantity}</td>
                  <td>
                    <span
                      className={`admin-demand-priority ${demand.priority.toLowerCase()}`}
                    >
                      {demand.priority}
                    </span>
                  </td>
                  <td>{demand.date}</td>
                  <td>
                    <span
                      className={`admin-demand-status ${demand.status.toLowerCase()}`}
                    >
                      {demand.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="admin-demand-status-select"
                      value={demand.status}
                      onChange={(e) =>
                        updateStatus(demand.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Fulfilled">Fulfilled</option>
                    </select>
                  </td>
                </tr>
              ))}

              {filteredDemands.length === 0 && (
                <tr>
                  <td colSpan="8" className="admin-demands-empty">
                    No demands found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-demands-footer">
          Showing {filteredDemands.length} of {total} demands
        </div>
      </div>
    </div>
  );
}

export default AdminDemands;
