export type Priority = "low" | "medium" | "high";
export type Risk = "low" | "medium" | "high";
export type Status = "todo" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  risk: Risk;
  status: Status;
  estimatedMinutes: number;
  deadline: string;
  group: "today" | "tomorrow" | "this_week" | "completed";
  progress: number;
  tag?: string;
}

export const tasks: Task[] = [
  { id: "1", title: "Finish DSA Question 5 — Graph traversal", priority: "high", risk: "low", status: "in_progress", estimatedMinutes: 25, deadline: "Tomorrow, 9:00 AM", group: "today", progress: 40, tag: "Study", description: "Implement BFS solution and submit on portal." },
  { id: "2", title: "Review hackathon presentation slides", priority: "high", risk: "medium", status: "todo", estimatedMinutes: 20, deadline: "Today, 6:00 PM", group: "today", progress: 0, tag: "Hackathon" },
  { id: "3", title: "Practice interview introduction", priority: "medium", risk: "low", status: "todo", estimatedMinutes: 15, deadline: "Thu, 11:00 AM", group: "today", progress: 0, tag: "Career" },
  { id: "4", title: "Draft README for portfolio project", priority: "medium", risk: "low", status: "todo", estimatedMinutes: 40, deadline: "Tomorrow", group: "tomorrow", progress: 0, tag: "Project" },
  { id: "5", title: "Apply to 3 internships", priority: "high", risk: "high", status: "todo", estimatedMinutes: 60, deadline: "Fri", group: "this_week", progress: 10, tag: "Career" },
  { id: "6", title: "Read Designing Data-Intensive Apps — Ch. 3", priority: "low", risk: "low", status: "todo", estimatedMinutes: 45, deadline: "Sat", group: "this_week", progress: 0, tag: "Study" },
  { id: "7", title: "Finalize team roles for hackathon", priority: "medium", risk: "low", status: "done", estimatedMinutes: 20, deadline: "Yesterday", group: "completed", progress: 100, tag: "Hackathon" },
  { id: "8", title: "Mock interview with peer", priority: "medium", risk: "low", status: "done", estimatedMinutes: 30, deadline: "Mon", group: "completed", progress: 100, tag: "Career" },
];

export const forgeQueue = [
  { id: "1", title: "Finish DSA Question 5", minutes: 25, reason: "Deadline tomorrow, unblocks Q6." },
  { id: "2", title: "Review hackathon slides", minutes: 20, reason: "Presentation in 4 hours." },
  { id: "3", title: "Practice interview intro", minutes: 15, reason: "Builds confidence for Thursday." },
];

export const insights = [
  { id: "1", title: "You ship more before noon", body: "Your last 7 focused sessions completed 38% faster in the morning. Consider blocking 9–11 AM." },
  { id: "2", title: "Hackathon risk rising", body: "3 tasks remain and 28 hours of buffer. Move slide review earlier today." },
];

export const deadlines = [
  { id: "1", title: "DSA Assignment", when: "Tomorrow, 9:00 AM", risk: "low" as Risk },
  { id: "2", title: "Hackathon Presentation", when: "Wed, 5:00 PM", risk: "medium" as Risk },
  { id: "3", title: "Internship Interview", when: "Thu, 11:00 AM", risk: "high" as Risk },
];

export const reflections = {
  wins: ["Shipped DSA Q4 on time", "Cleared inbox to zero", "Ran 30 min focus session"],
  challenge: "Lost momentum after lunch — context switching between hackathon and study.",
  aiReflection: "You executed well this morning. The afternoon dip is a recurring pattern — try blocking 2–4 PM for a single deep task tomorrow.",
  tomorrow: ["Finish slide review by 10 AM", "Interview practice 11–11:30", "DSA Q6 in afternoon block"],
  learning: "BFS vs DFS tradeoffs; revised system design fan-out pattern.",
};
