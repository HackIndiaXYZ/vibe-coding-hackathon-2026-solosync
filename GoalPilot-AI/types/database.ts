export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  targetDate: string;
  status: "active" | "completed" | "paused";
  createdAt: string;
}

export interface Milestone {
  id: string;
  goalId: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export interface Task {
  id: string;
  milestoneId: string;
  title: string;
  completed: boolean;
  scheduledFor: string;
}

export interface CoachMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}