const API_BASE = "http://127.0.0.1:8000";

export async function generatePlan(brainDump: string) {
  const response = await fetch(`${API_BASE}/planner/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      brain_dump: brainDump,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate plan");
  }

  return response.json();
}
