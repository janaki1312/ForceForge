export interface NextBestAction {
  title: string;
  reason: string;
  estimated_minutes: number;
}

export interface QueueTask {
  title: string;
  priority: string;
  estimated_minutes: number;
}

export interface ExecutionTask {
  title: string;
  deadline: string;
  priority: string;
  estimated_minutes: number;
}

export interface Risk {
  level: string;
  reason: string;
}

export interface PlannerResponse {
  objective: string;
  next_best_action: NextBestAction;
  forge_queue: QueueTask[];
  execution_plan: ExecutionTask[];
  risk: Risk;
  reasoning: string;
}
