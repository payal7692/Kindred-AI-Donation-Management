
import { useState } from "react";
import CameraCapture from "../components/CameraCapture";
import ItemCart from "../components/ItemCart";
import "../App.css";

const API_URL = "http://localhost:8000";

export default function ScanItems() {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [photoBlob, setPhotoBlob] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleCapture = (blob) => {
    if (!blob) {
      setError("Please capture or select an image.");
      return;
    }

    setPhotoBlob(blob);
    setPhotoUrl(URL.createObjectURL(blob));
    setItems([]);
    setError("");
  };

  const detectItems = async () => {
    if (!photoBlob) {
      setError("Please capture an image first.");
      return;
    }

    setLoading(true);
    setError("");
    setItems([]);

    try {
      const formData = new FormData();
      formData.append("file", photoBlob, "photo.jpg");

      const res = await fetch(`${API_URL}/api/detect`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Image detection failed.");
      }

      setItems(data.items || []);

      if (!data.items || data.items.length === 0) {
        setError("No supported donation items were detected. Try another photo.");
      }
    } catch (err) {
      setError(
        err.message || "Could not reach the server. Is the backend running?"
      );
    } finally {
      setLoading(false);
    }
  };

  
const submitDonation = async () => {
  if (items.length === 0) {
    setError("Please add at least one item.");
    return;
  }

  setSubmitting(true);
  setError("");

  try {
    const response = await fetch(`${API_URL}/api/donations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Could not save donation.");
    }

    alert(
      `Donation saved successfully! Donation ID: ${data.donation.id}`
    );
  } catch (err) {
    setError(err.message || "Could not save donation.");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="page">
      <h1>Donate an item</h1>
      <p>Take a photo of the item you want to donate.</p>

      <CameraCapture onCapture={handleCapture} />

      {photoUrl && (
        <div>
          <h3>Your photo</h3>

          <img
            src={photoUrl}
            alt="Captured item"
            className="preview"
          />

          <button onClick={detectItems} disabled={loading}>
            {loading ? "Detecting..." : "Detect items"}
          </button>

          {error && <p className="error">{error}</p>}
        </div>
      )}

      {photoUrl && <ItemCart items={items} setItems={setItems} />}

      {photoUrl && items.length > 0 && (
        <button
  className="submit"
  onClick={submitDonation}
  disabled={submitting}
>
  {submitting ? "Saving donation..." : "Submit donation"}
</button>
      )}
    </div>
  );
}
