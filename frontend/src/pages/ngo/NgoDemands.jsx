import { useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import "./NgoDemands.css";

const CATEGORIES = ["Food", "Books", "Utensils", "Clothing", "Furniture", "Electronics"];
const ICONS = {
  Food: "🍲", Books: "📚", Utensils: "🍴",
  Clothing: "👕", Furniture: "🪑", Electronics: "💻",
};
const PRIORITY = { 1: "Low", 2: "Medium", 3: "Normal", 4: "High", 5: "Urgent" };

// Sample demands. They disappear when you refresh, until we add the database.
const sample = [
  { id: 1, category: "Food", subcategory: "", quantity: 1, priority: 4, neededUntil: "2026-10-02", fulfilled: 0 },
  { id: 2, category: "Books", subcategory: "", quantity: 4, priority: 4, neededUntil: "2026-10-03", fulfilled: 0 },
  { id: 3, category: "Furniture", subcategory: "Chair", quantity: 2, priority: 3, neededUntil: "2026-12-01", fulfilled: 1 },
];

const emptyForm = { category: "", subcategory: "", quantity: "", priority: 3, neededUntil: "" };

export default function NgoDemands() {
  const [demands, setDemands] = useState(sample);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const addDemand = () => {
    if (!form.category || Number(form.quantity) < 1) {
      setError("Please choose a category and enter a quantity of at least 1.");
      return;
    }
    const newDemand = {
      id: Date.now(),
      category: form.category,
      subcategory: form.subcategory.trim(),
      quantity: Number(form.quantity),
      priority: Number(form.priority),
      neededUntil: form.neededUntil,
      fulfilled: 0,
    };
    setDemands([newDemand, ...demands]);
    setForm(emptyForm);
    setError("");
  };

  const removeDemand = (id) => setDemands(demands.filter((d) => d.id !== id));

  const shown = demands.filter(
    (d) =>
      (filter === "All" || d.category === filter) &&
      (d.category + " " + d.subcategory).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <span className="kicker2">DEMANDS</span>
      <h1 className="page-title">Our Demands</h1>
      <p className="page-sub">Publish and manage your resource requirements.</p>

      <div className="panel">
        <h3>Add New Demand</h3>
        <p className="muted">Let donors know what resources you need.</p>

        <div className="demand-form">
          <div className="form-field">
            <label>Category</label>
            <select value={form.category} onChange={update("category")}>
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label>Subcategory (optional)</label>
            <input placeholder="e.g. Winter jackets" value={form.subcategory} onChange={update("subcategory")} />
          </div>
          <div className="form-field">
            <label>Quantity needed</label>
            <input type="number" min="1" placeholder="Enter quantity" value={form.quantity} onChange={update("quantity")} />
          </div>
          <div className="form-field">
            <label>Priority (1 = Low, 5 = Urgent)</label>
            <select value={form.priority} onChange={update("priority")}>
              {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} - {PRIORITY[n]}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label>Needed until</label>
            <input type="date" value={form.neededUntil} onChange={update("neededUntil")} />
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-buttons">
          <button type="button" className="btn-primary" onClick={addDemand}>
            <Plus size={16} /> Add Demand
          </button>
          <button type="button" className="btn-light" onClick={() => { setForm(emptyForm); setError(""); }}>
            Clear
          </button>
        </div>
      </div>

      <div className="panel list-panel">
        <div className="list-head">
          <div>
            <h3>Your Demands</h3>
            <p className="muted">Manage, edit or remove your published demands.</p>
          </div>
          <div className="search-box">
            <Search size={16} />
            <input placeholder="Search demands..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="chips">
          {["All", ...CATEGORIES].map((c) => (
            <button
              type="button"
              key={c}
              className={`chip-btn ${filter === c ? "on" : ""}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {shown.length === 0 && <p className="muted">No demands found.</p>}

        <div className="demand-grid">
          {shown.map((d) => {
            const pct = Math.round((d.fulfilled / d.quantity) * 100);
            return (
              <div className="demand-card" key={d.id}>
                <div className="dc-top">
                  <div>
                    <h4>{d.category}</h4>
                    <span>{d.subcategory || "No subcategory"}</span>
                  </div>
                  <span className="dc-icon">{ICONS[d.category]}</span>
                </div>

                <div className="dc-row"><span>Quantity needed</span><strong>{d.quantity}</strong></div>
                <div className="dc-row">
                  <span>Priority</span>
                  <strong className={`pri pri${d.priority}`}>{d.priority} - {PRIORITY[d.priority]}</strong>
                </div>
                <div className="dc-row"><span>Needed until</span><strong>{d.neededUntil || "No expiry"}</strong></div>

                <div className="dc-labels">
                  <span>Fulfilled {d.fulfilled} of {d.quantity}</span>
                  <span>{pct}%</span>
                </div>
                <div className="bar"><div className="bar-fill" style={{ width: `${pct}%` }} /></div>

                <button type="button" className="dc-remove" onClick={() => removeDemand(d.id)}>
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}