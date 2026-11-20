import { useMemo, useState } from "react";
import {
  Search,
  Package,
  CheckCircle2,
  Clock3,
  Truck,
} from "lucide-react";
import "./NgoDonations.css";

const initialDonations = [
  {
    id: "DON-1001",
    donor: "Aarav Sharma",
    item: "Rice and wheat",
    category: "Food",
    quantity: 25,
    unit: "kg",
    date: "2026-10-20",
    status: "Pending",
  },
  {
    id: "DON-1002",
    donor: "Priya Verma",
    item: "School books",
    category: "Books",
    quantity: 40,
    unit: "pieces",
    date: "2026-10-22",
    status: "Accepted",
  },
  {
    id: "DON-1003",
    donor: "Rahul Patel",
    item: "Winter blankets",
    category: "Clothing",
    quantity: 15,
    unit: "pieces",
    date: "2026-10-24",
    status: "Received",
  },
  {
    id: "DON-1004",
    donor: "Neha Singh",
    item: "Steel utensils",
    category: "Utensils",
    quantity: 20,
    unit: "sets",
    date: "2026-10-25",
    status: "Pending",
  },
  {
    id: "DON-1005",
    donor: "Amit Jain",
    item: "Study tables",
    category: "Furniture",
    quantity: 5,
    unit: "pieces",
    date: "2026-10-27",
    status: "Accepted",
  },
];

const filters = ["All", "Pending", "Accepted", "Received"];

export default function NgoDonations() {
  const [donations, setDonations] = useState(initialDonations);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const updateStatus = (id, newStatus) => {
    setDonations((current) =>
      current.map((donation) =>
        donation.id === id
          ? { ...donation, status: newStatus }
          : donation
      )
    );
  };

  const filteredDonations = useMemo(() => {
    return donations.filter((donation) => {
      const matchesFilter =
        filter === "All" || donation.status === filter;

      const searchText = (
        donation.id +
        " " +
        donation.donor +
        " " +
        donation.item +
        " " +
        donation.category
      ).toLowerCase();

      return matchesFilter && searchText.includes(search.toLowerCase());
    });
  }, [donations, filter, search]);

  const pendingCount = donations.filter(
    (d) => d.status === "Pending"
  ).length;

  const acceptedCount = donations.filter(
    (d) => d.status === "Accepted"
  ).length;

  const receivedCount = donations.filter(
    (d) => d.status === "Received"
  ).length;

  return (
    <div className="ngo-donations-page">
      <span className="kicker2">DONATIONS</span>

      <h1 className="page-title">Received Donations</h1>

      <p className="page-sub">
        View and manage donations offered to your organisation.
      </p>

      <div className="ngo-donation-stats">
        <div className="ngo-donation-stat">
          <div className="ngo-stat-icon">
            <Package size={21} />
          </div>
          <div>
            <span>Total Donations</span>
            <strong>{donations.length}</strong>
          </div>
        </div>

        <div className="ngo-donation-stat">
          <div className="ngo-stat-icon pending-icon">
            <Clock3 size={21} />
          </div>
          <div>
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>
        </div>

        <div className="ngo-donation-stat">
          <div className="ngo-stat-icon accepted-icon">
            <Truck size={21} />
          </div>
          <div>
            <span>Accepted</span>
            <strong>{acceptedCount}</strong>
          </div>
        </div>

        <div className="ngo-donation-stat">
          <div className="ngo-stat-icon received-icon">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Received</span>
            <strong>{receivedCount}</strong>
          </div>
        </div>
      </div>

      <div className="panel ngo-donation-list">
        <div className="ngo-donation-heading">
          <div>
            <h3>Donation Requests</h3>
            <p className="muted">
              Review donations and update their status.
            </p>
          </div>

          <div className="ngo-donation-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search donations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="ngo-donation-filters">
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              className={
                filter === item
                  ? "ngo-filter-btn active"
                  : "ngo-filter-btn"
              }
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredDonations.length === 0 ? (
          <div className="ngo-donation-empty">
            <Package size={35} />
            <h3>No donations found</h3>
            <p>Try changing your search or filter.</p>
          </div>
        ) : (
          <div className="ngo-donation-table-wrap">
            <table className="ngo-donation-table">
              <thead>
                <tr>
                  <th>Donation ID</th>
                  <th>Donor</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredDonations.map((donation) => (
                  <tr key={donation.id}>
                    <td className="ngo-donation-id">
                      {donation.id}
                    </td>

                    <td>{donation.donor}</td>

                    <td>
                      <strong>{donation.item}</strong>
                      <small className="ngo-item-category">
                        {donation.category}
                      </small>
                    </td>

                    <td>
                      {donation.quantity} {donation.unit}
                    </td>

                    <td>{donation.date}</td>

                    <td>
                      <span
                        className={`ngo-status ngo-status-${donation.status.toLowerCase()}`}
                      >
                        {donation.status}
                      </span>
                    </td>

                    <td>
                      {donation.status === "Pending" && (
                        <button
                          type="button"
                          className="ngo-action-btn"
                          onClick={() =>
                            updateStatus(donation.id, "Accepted")
                          }
                        >
                          Accept
                        </button>
                      )}

                      {donation.status === "Accepted" && (
                        <button
                          type="button"
                          className="ngo-action-btn received-action"
                          onClick={() =>
                            updateStatus(donation.id, "Received")
                          }
                        >
                          Mark Received
                        </button>
                      )}

                      {donation.status === "Received" && (
                        <span className="ngo-completed-text">
                          <CheckCircle2 size={15} />
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}