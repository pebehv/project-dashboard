export type ProjectStatus = "planning" | "in-progress" | "review" | "completed" | "on-hold";
export type ProjectPriority = "high" | "medium" | "low";
export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  team: string;
  members: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  dueDate: string;
  createdAt: string;
}
