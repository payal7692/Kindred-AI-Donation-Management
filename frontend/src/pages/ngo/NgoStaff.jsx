
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Users,
  UserCheck,
  UserX,
  Trash2,
  X,
} from "lucide-react";
import "./NgoStaff.css";

const initialStaff = [
  {
    id: 1,
    name: "Ananya Sharma",
    email: "ananya@example.com",
    phone: "9876543210",
    role: "Manager",
    active: true,
  },
  {
    id: 2,
    name: "Rahul Verma",
    email: "rahul@example.com",
    phone: "9876543211",
    role: "Pickup Coordinator",
    active: true,
  },
  {
    id: 3,
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "9876543212",
    role: "Volunteer",
    active: true,
  },
  {
    id: 4,
    name: "Amit Patel",
    email: "amit@example.com",
    phone: "9876543213",
    role: "Volunteer",
    active: false,
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  role: "Volunteer",
};

export default function NgoStaff() {
  const [staff, setStaff] = useState(initialStaff);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const activeCount = staff.filter((s) => s.active).length;
  const inactiveCount = staff.length - activeCount;

  const filteredStaff = useMemo(() => {
    return staff.filter((member) => {
      const matchesFilter =
        filter === "All" ||
        (filter === "Active" && member.active) ||
        (filter === "Inactive" && !member.active) ||
        member.role === filter;

      const text = (
        member.name +
        " " +
        member.email +
        " " +
        member.role
      ).toLowerCase();

      return matchesFilter && text.includes(search.toLowerCase());
    });
  }, [staff, filter, search]);

  const updateForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addStaff = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setError("Please enter the staff name and email.");
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

    if (!validEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    const newMember = {
      id: Date.now(),
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      active: true,
    };

    setStaff((current) => [newMember, ...current]);
    setForm(emptyForm);
    setError("");
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setStaff((current) =>
      current.map((member) =>
        member.id === id
          ? { ...member, active: !member.active }
          : member
      )
    );
  };

  const removeStaff = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this staff member?"
    );

    if (confirmed) {
      setStaff((current) =>
        current.filter((member) => member.id !== id)
      );
    }
  };

  return (
    <div className="ngo-staff-page">
      <span className="kicker2">TEAM MANAGEMENT</span>

      <h1 className="page-title">Staff Management</h1>

      <p className="page-sub">
        Manage your NGO team members, responsibilities and account status.
      </p>

      <div className="ngo-staff-stats">
        <div className="ngo-staff-stat">
          <div className="staff-stat-icon">
            <Users size={22} />
          </div>
          <div>
            <span>Total Staff</span>
            <strong>{staff.length}</strong>
          </div>
        </div>

        <div className="ngo-staff-stat">
          <div className="staff-stat-icon staff-active-icon">
            <UserCheck size={22} />
          </div>
          <div>
            <span>Active Members</span>
            <strong>{activeCount}</strong>
          </div>
        </div>

        <div className="ngo-staff-stat">
          <div className="staff-stat-icon staff-inactive-icon">
            <UserX size={22} />
          </div>
          <div>
            <span>Inactive Members</span>
            <strong>{inactiveCount}</strong>
          </div>
        </div>
      </div>

      <div className="panel ngo-staff-panel">
        <div className="ngo-staff-heading">
          <div>
            <h3>Our Team</h3>
            <p className="muted">
              Add, manage and organise your NGO staff.
            </p>
          </div>

          <button
            type="button"
            className="staff-add-btn"
            onClick={() => {
              setShowForm(!showForm);
              setError("");
            }}
          >
            {showForm ? <X size={17} /> : <Plus size={17} />}
            {showForm ? "Close Form" : "Add Staff"}
          </button>
        </div>

        {showForm && (
          <form className="ngo-staff-form" onSubmit={addStaff}>
            <h3>Add New Staff Member</h3>

            <div className="staff-form-grid">
              <div className="staff-field">
                <label>Full Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={updateForm}
                  placeholder="Enter full name"
                />
              </div>

              <div className="staff-field">
                <label>Email Address *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateForm}
                  placeholder="Enter email"
                />
              </div>

              <div className="staff-field">
                <label>Phone Number</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={updateForm}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="staff-field">
                <label>Staff Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={updateForm}
                >
                  <option>Manager</option>
                  <option>Pickup Coordinator</option>
                  <option>Volunteer</option>
                </select>
              </div>
            </div>

            {error && <p className="staff-error">{error}</p>}

            <div className="staff-form-actions">
              <button type="submit" className="staff-add-btn">
                <Plus size={16} /> Save Staff Member
              </button>

              <button
                type="button"
                className="staff-cancel-btn"
                onClick={() => {
                  setShowForm(false);
                  setForm(emptyForm);
                  setError("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="ngo-staff-toolbar">
          <div className="staff-search">
            <Search size={17} />
            <input
              placeholder="Search staff members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="staff-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Members</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Manager">Manager</option>
            <option value="Pickup Coordinator">Pickup Coordinator</option>
            <option value="Volunteer">Volunteer</option>
          </select>
        </div>

        {filteredStaff.length === 0 ? (
          <div className="staff-empty">
            <Users size={35} />
            <h3>No staff members found</h3>
            <p>Try changing your search or filter.</p>
          </div>
        ) : (
          <div className="staff-table-wrap">
            <table className="ngo-staff-table">
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStaff.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <div className="staff-member-info">
                        <div className="staff-avatar">
                          {member.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>{member.name}</strong>
                          <small>{member.email}</small>
                        </div>
                      </div>
                    </td>

                    <td>{member.phone || "Not provided"}</td>

                    <td>
                      <span className="staff-role">
                        {member.role}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          member.active
                            ? "staff-status staff-status-active"
                            : "staff-status staff-status-inactive"
                        }
                      >
                        {member.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>
                      <div className="staff-actions">
                        <button
                          type="button"
                          className="staff-toggle-btn"
                          onClick={() => toggleStatus(member.id)}
                        >
                          {member.active ? "Deactivate" : "Activate"}
                        </button>

                        <button
                          type="button"
                          className="staff-delete-btn"
                          onClick={() => removeStaff(member.id)}
                          aria-label={`Remove ${member.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
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
