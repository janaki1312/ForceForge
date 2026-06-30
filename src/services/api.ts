const API_BASE = "http://127.0.0.1:8000";

export async function generatePlan(brainDump: string) {
  try {
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
      throw new Error();
    }

    return await response.json();
  } catch {
    // Demo fallback
    return {
      objective: "AI Generated Execution Plan",
      next_best_action: {
        title: "Start with the highest priority task",
        estimated_minutes: 60,
        reason: "This task has the closest deadline and highest impact.",
      },
      execution_plan: [
        {
          title: "Complete DSA Assignment",
          estimated_minutes: 180,
          deadline: "Today",
          priority: "HIGH",
          risk: "medium",
        },
        {
          title: "Prepare Internship Interview",
          estimated_minutes: 120,
          deadline: "Tomorrow",
          priority: "HIGH",
          risk: "low",
        },
        {
          title: "Finalize Hackathon Demo",
          estimated_minutes: 90,
          deadline: "Tomorrow",
          priority: "MEDIUM",
          risk: "low",
        },
      ],
      reasoning:
        "Backend unavailable. Showing demo AI plan.",
      risk: {
        level: "MEDIUM",
        reason: "Multiple competing deadlines.",
      },
      forge_queue: [
        {
          title: "Complete DSA Assignment",
          estimated_minutes: 180,
          deadline: "Today",
        },
        {
          title: "Prepare Internship Interview",
          estimated_minutes: 120,
          deadline: "Tomorrow",
        },
        {
          title: "Finalize Hackathon Demo",
          estimated_minutes: 90,
          deadline: "Tomorrow",
        },
      ],
    };
  }
}