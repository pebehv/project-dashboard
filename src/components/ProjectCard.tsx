import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Calendar, Users, AlertCircle } from "lucide-react";
import { statusColors, priorityColors } from "../styles/variables";
import { Project } from '../app/data/type/project'

interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const isOverdue = new Date(project.dueDate) < new Date() && project.status !== "completed";

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick?.(project)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="line-clamp-1">{project.name}</h3>
            <p className="text-muted-foreground line-clamp-2">{project.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={priorityColors[project.priority]}>
              {project.priority}
            </Badge>
            {isOverdue && <AlertCircle className="h-4 w-4 text-destructive" />}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${statusColors[project.status]}`} />
            <span className="capitalize text-sm text-muted-foreground">{project.status.replace("-", " ")}</span>
          </div>
          <span className="text-sm text-muted-foreground">{project.progress}%</span>
        </div>
        
        <Progress value={project.progress} className="h-2" />
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(project.dueDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{project.team}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.members.slice(0, 3).map((member) => (
              <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-xs">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.members.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                +{project.members.length - 3}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}