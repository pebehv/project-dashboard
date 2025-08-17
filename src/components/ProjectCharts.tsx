import { Project } from "../app/data/type/project";
import { processTeamData, processPriorityData } from "./chartUtils";
import { ProjectChartsPie } from "./ProjectChartsPie";
import { ProjectChartsBar } from "./ProjectChartsBar";

interface ProjectChartsProps {
  projects: Project[];
}

export function ProjectCharts({ projects }: ProjectChartsProps) {
  
  const teamData = processTeamData(projects);
  const priorityData = processPriorityData(projects);
  console.log("Ver",priorityData)
  console.log("teamData",teamData)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <ProjectChartsPie projects={projects} />
      <ProjectChartsBar 
      title='Team Workload'
      axis= 'team' 
      bar_= 'projects'  
      data_ = {teamData}
      fill=  "var(--color-chart-1)"/>
      <ProjectChartsBar 
      title='Priority Distribution'
      axis= 'priority' 
      bar_= 'count'  
      data_ = {priorityData}
      fill=  "var(--color-chart-2)"
      />

     
    </div>
  );
}