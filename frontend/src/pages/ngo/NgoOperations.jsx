
import { useMemo, useState } from "react";
import {
  Search,
  Truck,
  Clock,
  CheckCircle2,
  MapPin,
  CalendarDays,
} from "lucide-react";
import "./NgoOperations.css";

const initialOperations = [
  {
    id: "OPS-1001",
    donor: "Aarav Sharma",
    item: "Rice and wheat",
    quantity: "25 kg",
    address: "MP Nagar, Bhopal",
    date: "2026-11-05",
    time: "10:00 AM",
    status: "Scheduled",
  },
  {
    id: "OPS-1002",
    donor: "Priya Verma",
    item: "School books",
    quantity: "40 pieces",
    address: "Arera Colony, Bhopal",
    date: "2026-11-05",
    time: "12:00 PM",
    status: "In Progress",
  },
  {
    id: "OPS-1003",
    donor: "Rahul Patel",
    item: "Winter blankets",
    quantity: "15 pieces",
    address: "Kolar Road, Bhopal",
    date: "2026-11-06",
    time: "11:00 AM",
    status: "Completed",
  },
  {
    id: "OPS-1004",
    donor: "Neha Singh",
    item: "Steel utensils",
    quantity: "20 sets",
    address: "Hoshangabad Road, Bhopal",
    date: "2026-11-07",
    time: "02:00 PM",
    status: "Scheduled",
  },
];

const statusFilters = [
  "All",
  "Scheduled",
  "In Progress",
  "Completed",
];

export default function NgoOperations() {
  const [operations, setOperations] = useState(initialOperations);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const updateStatus = (id, status) => {
    setOperations((current) =>
      current.map((operation) =>
        operation.id === id
          ? { ...operation, status }
          : operation
      )
    );
  };

  const scheduled = operations.filter(
    (item) => item.status === "Scheduled"
  ).length;

  const inProgress = operations.filter(
    (item) => item.status === "In Progress"
  ).length;

  const completed = operations.filter(
    (item) => item.status === "Completed"
  ).length;

  const filteredOperations = useMemo(() => {
    return operations.filter((operation) => {
      const matchesStatus =
        filter === "All" || operation.status === filter;

      const searchText = (
        operation.id +
        " " +
        operation.donor +
        " " +
        operation.item +
        " " +
        operation.address
      ).toLowerCase();

      return (
        matchesStatus &&
        searchText.includes(search.toLowerCase())
      );
    });
  }, [operations, filter, search]);

  return (
    <div className="ngo-operations-page">
      <span className="kicker2">OPERATIONS</span>

      <h1 className="page-title">Pickup & Operations</h1>

      <p className="page-sub">
        Manage donation collections, pickup schedules and delivery progress.
      </p>

      <div className="ngo-operation-stats">
        <div className="ngo-operation-stat">
          <div className="ngo-operation-icon">
            <Truck size={22} />
          </div>
          <div>
            <span>Total Operations</span>
            <strong>{operations.length}</strong>
          </div>
        </div>

        <div className="ngo-operation-stat">
          <div className="ngo-operation-icon scheduled-icon">
            <CalendarDays size={22} />
          </div>
          <div>
            <span>Scheduled</span>
            <strong>{scheduled}</strong>
          </div>
        </div>

        <div className="ngo-operation-stat">
          <div className="ngo-operation-icon progress-icon">
            <Clock size={22} />
          </div>
          <div>
            <span>In Progress</span>
            <strong>{inProgress}</strong>
          </div>
        </div>

        <div className="ngo-operation-stat">
          <div className="ngo-operation-icon completed-icon">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span>Completed</span>
            <strong>{completed}</strong>
          </div>
        </div>
      </div>

      <div className="panel ngo-operations-panel">
        <div className="ngo-operations-heading">
          <div>
            <h3>Collection & Delivery Schedule</h3>
            <p className="muted">
              Monitor and update your donation operations.
            </p>
          </div>

          <div className="ngo-operations-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search operations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="ngo-operation-filters">
          {statusFilters.map((item) => (
            <button
              type="button"
              key={item}
              className={
                filter === item
                  ? "ngo-operation-filter active"
                  : "ngo-operation-filter"
              }
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredOperations.length === 0 ? (
          <div className="ngo-operation-empty">
            <Truck size={36} />
            <h3>No operations found</h3>
            <p>Try another search or status filter.</p>
          </div>
        ) : (
          <div className="ngo-operation-list">
            {filteredOperations.map((operation) => (
              <div className="ngo-operation-card" key={operation.id}>
                <div className="ngo-operation-card-top">
                  <div>
                    <span className="ngo-operation-id">
                      {operation.id}
                    </span>
                    <h3>{operation.item}</h3>
                    <p className="ngo-operation-donor">
                      Donor: {operation.donor}
                    </p>
                  </div>

                  <span
                    className={`ngo-operation-status ngo-operation-${operation.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {operation.status}
                  </span>
                </div>

                <div className="ngo-operation-details">
                  <div>
                    <PackageIcon />
                    <span>{operation.quantity}</span>
                  </div>

                  <div>
                    <CalendarDays size={16} />
                    <span>{operation.date}</span>
                  </div>

                  <div>
                    <Clock size={16} />
                    <span>{operation.time}</span>
                  </div>

                  <div>
                    <MapPin size={16} />
                    <span>{operation.address}</span>
                  </div>
                </div>

                <div className="ngo-operation-actions">
                  {operation.status === "Scheduled" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(operation.id, "In Progress")
                      }
                    >
                      Start Collection
                    </button>
                  )}

                  {operation.status === "In Progress" && (
                    <button
                      type="button"
                      className="complete-operation-btn"
                      onClick={() =>
                        updateStatus(operation.id, "Completed")
                      }
                    >
                      Mark Completed
                    </button>
                  )}

                  {operation.status === "Completed" && (
                    <span className="ngo-operation-done">
                      <CheckCircle2 size={16} />
                      Collection completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PackageIcon() {
  return <Truck size={16} />;
}
