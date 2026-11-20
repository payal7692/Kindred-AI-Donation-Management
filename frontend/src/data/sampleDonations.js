export const STATUSES = [
  "Submitted",
  "Matched",
  "Packaging Notified",
  "Pickup Scheduled",
  "Collected",
  "Delivered",
  "Acknowledged",
];

export const NOTES = {
  Submitted: "Donation created",
  Matched: "Match accepted",
  "Packaging Notified": "Packaging notified",
  "Pickup Scheduled": "Pickup scheduled",
  Collected: "Items collected",
  Delivered: "Items delivered",
  Acknowledged: "NGO acknowledged receipt",
};

// Makes a time for every status that has been reached.
function makeTimes(start, reached) {
  const t = new Date(start).getTime();
  return STATUSES.map((_, i) =>
    i < reached ? new Date(t + i * 37 * 60000).toLocaleString("en-US") : null
  );
}

// statusIndex 0 = Submitted ... 6 = Acknowledged
export const donations = [
  { id: "B7758B6C", item: "Books", category: "books", quantity: 11, statusIndex: 0, pickup: null, times: makeTimes("2026-10-01T19:00:20", 1) },
  { id: "125704CA", item: "Books", category: "books", quantity: 1, statusIndex: 0, pickup: null, times: makeTimes("2026-10-01T18:55:47", 1) },
  { id: "C5B75B60", item: "table", category: "furniture", quantity: 1, statusIndex: 6, pickup: "10/3/2026, 10:00:00 AM", times: makeTimes("2026-10-01T17:12:18", 7) },
  { id: "812F79A0", item: "Books", category: "books", quantity: 1, statusIndex: 6, pickup: "10/2/2026, 10:00:00 AM", times: makeTimes("2026-09-30T11:20:00", 7) },
  { id: "E69AD918", item: "Furniture", category: "furniture", quantity: 1, statusIndex: 6, pickup: "10/26/2026, 10:10:00 AM", times: makeTimes("2026-10-25T09:05:00", 7) },
];

export const EMOJI = {
  books: "📚",
  furniture: "🪑",
  electronics: "💻",
  clothing: "👕",
  food: "🍲",
  utensils: "🍴",
};