import { Project, ProjectPriority, ProjectStatus } from "./project";
import myData from '../../data/data.json';
import detailData from '../../data/detail.json';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  assignee: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
}

export interface ProjectMilestone {
  id: string;
  title: string;
  date: string;
  status: "completed" | "current" | "upcoming";
  description: string;
}

export interface ProjectActivity {
  id: string;
  type: "comment" | "status_change" | "task_completed" | "member_added";
  user: string;
  content: string;
  timestamp: string;
}

export interface DetailedProject extends Project {
  tasks: Task[];
  milestones: ProjectMilestone[];
  activities: ProjectActivity[];
  budget: number;
  spent: number;
  tags: string[];
  repository?: string;
  documentation?: string;
}


// Valida y filtra los datos antes de asignarlos a tu constante
function isValidStatus(status: string): status is ProjectStatus {
  return ["planning", "in-progress", "review", "completed", "on-hold"].includes(status);
}
/*function isValidPriority(priority: string): priority is DetailedProject {
  return [ "high" , "medium" , "low"].includes(priority);
}*/

// Asignación final con un filtro de datos válidos
export const mockProjects: Project[] = myData
  .filter(project => isValidStatus(project.status)) as Project[];

export const mockDetailedProjects: DetailedProject[] = detailData as DetailedProject[]
//  .filter(project => isValidPriority(project.tasks)) as DetailedProject[];

  
export const mockDetailedProjects2: Project[] = [
  mockProjects[0],
  ...mockDetailedProjects
  
]