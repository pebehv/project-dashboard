import { Project } from "../app/data/type/project";

export function filterProjects(
  projects: Project[],
  searchQuery: string,
  statusFilter: string,
  priorityFilter: string,
  teamFilter: string
) {
  return projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter;
    const matchesTeam = teamFilter === "all" || project.team.toLowerCase() === teamFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesPriority && matchesTeam;
  });
}