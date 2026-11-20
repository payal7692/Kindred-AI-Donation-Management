// How much each factor counts toward the final match score (adds up to 100)
export const WEIGHTS = { item: 40, quantity: 25, distance: 20, priority: 15 };

// Each factor is scored 0-100. The overall score is the weighted total.
export function overall(scores) {
  return Math.round(
    Object.keys(WEIGHTS).reduce((sum, k) => sum + (scores[k] * WEIGHTS[k]) / 100, 0)
  );
}

export const matches = [
  {
    id: "A3EAF15E", status: "Accepted", item: "chair", quantity: 1,
    ngo: "Test Community NGO", need: "Furniture · chair × 1",
    scores: { item: 100, quantity: 100, distance: 85, priority: 80 },
  },
  {
    id: "09512BA5", status: "Accepted", item: "table", quantity: 1,
    ngo: "Test Community NGO", need: "Furniture · table × 1",
    scores: { item: 80, quantity: 100, distance: 50, priority: 60 },
  },
  {
    id: "876B453E", status: "Accepted", item: "cell phone", quantity: 1,
    ngo: "Test Community NGO", need: "Electronics · phone × 1",
    scores: { item: 100, quantity: 100, distance: 90, priority: 90 },
  },
  {
    id: "4C1D77F2", status: "Pending", item: "Books", quantity: 4,
    ngo: "Test Community NGO", need: "Books · 4 needed",
    scores: { item: 90, quantity: 50, distance: 70, priority: 80 },
  },
];