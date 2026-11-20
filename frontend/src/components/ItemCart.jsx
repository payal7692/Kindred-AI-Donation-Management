import { useState } from "react";

const CATEGORIES = ["clothing", "food", "books", "electronics", "furniture", "utensils"];

export default function ItemCart({ items, setItems }) {
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState(CATEGORIES[0]);

  const changeQty = (id, delta) => {
    setItems(
      items.map((it) =>
        it.id === id ? { ...it, quantity: Math.max(1, it.quantity + delta) } : it
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((it) => it.id !== id));
  };

  const addItem = () => {
    if (!newName.trim()) return;
    setItems([
      ...items,
      {
        id: Date.now(),
        item_name: newName.trim(),
        category: newCategory,
        quantity: 1,
        confidence: null, // null means the donor added it by hand
      },
    ]);
    setNewName("");
  };

  return (
    <div className="cart">
      <h3>Detected items ({items.length})</h3>

      {items.length === 0 && <p>No items yet. Add one below.</p>}

      {items.map((it) => (
        <div className="cart-row" key={it.id}>
          <div className="cart-info">
            <strong>{it.item_name}</strong>
            <span className="category">{it.category}</span>
            {it.confidence === null ? (
              <span className="badge manual">Added by you</span>
            ) : (
              <span className={`badge ${it.confidence >= 0.7 ? "high" : "low"}`}>
                {Math.round(it.confidence * 100)}% sure
              </span>
            )}
          </div>

          <div className="cart-actions">
            <button className="small" onClick={() => changeQty(it.id, -1)}>-</button>
            <span className="qty">{it.quantity}</span>
            <button className="small" onClick={() => changeQty(it.id, 1)}>+</button>
            <button className="small danger" onClick={() => removeItem(it.id)}>Remove</button>
          </div>
        </div>
      ))}

      <div className="add-row">
        <input
          placeholder="Add an item (e.g. winter jacket)"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button className="small" onClick={addItem}>Add</button>
      </div>
    </div>
  );
}