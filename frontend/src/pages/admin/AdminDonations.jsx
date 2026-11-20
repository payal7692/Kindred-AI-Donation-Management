

import { useEffect, useState } from "react";
import {
  Search,
  Package,
  Clock,
  CheckCircle,
  Truck,
  Eye,
} from "lucide-react";
import "./AdminDonations.css";

const API_URL = "http://127.0.0.1:8000";

function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch real donations from the backend
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch(`${API_URL}/api/donations`);

        if (!response.ok) {
          throw new Error("Could not load donations.");
        }

        const data = await response.json();

        setDonations(data.donations || []);
      } catch (err) {
        setError(err.message || "Could not connect to the backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Convert database records into display information
  const getDonationInfo = (donation) => {
    const itemNames = donation.items
      .map((item) => item.item_name)
      .join(", ");

    const date = donation.created_at
      ? new Date(`${donation.created_at.replace(" ", "T")}Z`).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
      : "Not available";

    return {
      id: `DON-${String(donation.id).padStart(4, "0")}`,
      donor: "Not linked yet",
      item: itemNames || "No items",
      quantity: `${donation.total_items} items`,
      ngo: "Not matched yet",
      date,
      status: donation.status,
    };
  };

  const filteredDonations = donations.filter((donation) => {
    const info = getDonationInfo(donation);

    const matchesSearch =
      info.id.toLowerCase().includes(search.toLowerCase()) ||
      info.donor.toLowerCase().includes(search.toLowerCase()) ||
      info.item.toLowerCase().includes(search.toLowerCase()) ||
      info.ngo.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || donation.status === filter;

    return matchesSearch && matchesFilter;
  });

  // Status changes are currently temporary (not saved to the database).
  const updateStatus = (id, newStatus) => {
    setDonations((previous) =>
      previous.map((donation) =>
        donation.id === id
          ? { ...donation, status: newStatus }
          : donation
      )
    );
  };

  const total = donations.length;
  const pending = donations.filter((d) => d.status === "Pending").length;
  const accepted = donations.filter((d) => d.status === "Accepted").length;
  const completed = donations.filter((d) => d.status === "Completed").length;

  return (
    <div className="admin-donations-page">
      <div className="admin-donations-heading">
        <div>
          <span className="admin-donations-kicker">ADMIN MANAGEMENT</span>
          <h1>All Donations</h1>
          <p>Monitor and manage donations across all registered NGOs.</p>
        </div>
      </div>

      <div className="admin-donation-stats">
        <div className="admin-donation-stat">
          <div className="admin-stat-icon">
            <Package size={20} />
          </div>
          <div>
            <span>Total Donations</span>
            <h2>{total}</h2>
          </div>
        </div>

        <div className="admin-donation-stat">
          <div className="admin-stat-icon pending-icon">
            <Clock size={20} />
          </div>
          <div>
            <span>Pending</span>
            <h2>{pending}</h2>
          </div>
        </div>

        <div className="admin-donation-stat">
          <div className="admin-stat-icon accepted-icon">
            <Truck size={20} />
          </div>
          <div>
            <span>Accepted</span>
            <h2>{accepted}</h2>
          </div>
        </div>

        <div className="admin-donation-stat">
          <div className="admin-stat-icon completed-icon">
            <CheckCircle size={20} />
          </div>
          <div>
            <span>Completed</span>
            <h2>{completed}</h2>
          </div>
        </div>
      </div>

      <div className="admin-donations-panel">
        <div className="admin-donations-toolbar">
          <div>
            <h2>Donation Records</h2>
            <p>View and manage all donation activities.</p>
          </div>

          <div className="admin-donations-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search donor, NGO, item or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-donation-filters">
          {["All", "Pending", "Accepted", "Picked Up", "Completed"].map(
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

        {loading && <p>Loading donations...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <>
            <div className="admin-donations-table-wrap">
              <table className="admin-donations-table">
                <thead>
                  <tr>
                    <th>Donation ID</th>
                    <th>Donor</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>NGO</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Update Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDonations.map((donation) => {
                    const info = getDonationInfo(donation);

                    return (
                      <tr key={donation.id}>
                        <td className="admin-donation-id">{info.id}</td>
                        <td>{info.donor}</td>
                        <td>{info.item}</td>
                        <td>{info.quantity}</td>
                        <td>{info.ngo}</td>
                        <td>{info.date}</td>

                        <td>
                          <span
                            className={`admin-donation-status ${donation.status
                              .toLowerCase()
                              .replace(" ", "-")}`}
                          >
                            {donation.status}
                          </span>
                        </td>

                        <td>
                          <select
                            className="admin-donation-status-select"
                            value={donation.status}
                            onChange={(e) =>
                              updateStatus(donation.id, e.target.value)
                            }
                          >
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Picked Up">Picked Up</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredDonations.length === 0 && (
                    <tr>
                      <td colSpan="8" className="admin-donations-empty">
                        <Eye size={22} />
                        <p>No donations found.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="admin-donations-footer">
              Showing {filteredDonations.length} of {total} donations
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDonations;
