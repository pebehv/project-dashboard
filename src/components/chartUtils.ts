import { Project } from "../app/data/type/project";
import { chartColors } from "../styles/variables";

export function processStatusData(projects: Project[]) {
  return [
    { name: "Planning", value: projects.filter(p => p.status === "planning").length, color: chartColors.planning },
    { name: "In Progress", value: projects.filter(p => p.status === "in-progress").length, color: chartColors["in-progress"] },
    { name: "Review", value: projects.filter(p => p.status === "review").length, color: chartColors.review },
    { name: "Completed", value: projects.filter(p => p.status === "completed").length, color: chartColors.completed },
    { name: "On Hold", value: projects.filter(p => p.status === "on-hold").length, color: chartColors["on-hold"] },
  ].filter(item => item.value > 0);
}

export function processTeamData(projects: Project[]) {
  return projects.reduce((acc, project) => {
    const existing = acc.find(item => item.team === project.team);
    if (existing) {
      existing.projects += 1;
      existing.avgProgress = (existing.avgProgress + project.progress) / 2;
    } else {
      acc.push({
        team: project.team,
        projects: 1,
        avgProgress: project.progress
      });
    }
    return acc;
  }, [] as Array<{ team: string; projects: number; avgProgress: number }>);
}

export function processPriorityData(projects: Project[]) {
  console.log(":::", projects)
  return [
    { priority: "High", count: projects.filter(p => p.priority == "high").length },
    { priority: "Medium", count: projects.filter(p => p.priority === "medium").length },
    { priority: "Low", count: projects.filter(p => p.priority === "low").length },
  ].filter(item => item.count > 0);
}