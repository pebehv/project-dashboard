import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { 
  Calendar, 
  Users, 
  AlertCircle, 
  DollarSign, 
  GitBranch, 
  FileText, 
  CheckCircle2, 
  Circle, 
  Clock,
  MessageSquare,
  UserPlus,
  Activity
} from "lucide-react";
import { statusColors, priorityColors } from "../styles/variables";
import { Project } from "../app/data/type/project";
import { DetailedProject, mockDetailedProjects } from "../app/data/type/mockData";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  const detailedProject = mockDetailedProjects.find(p => p.id === project.id) || {
    ...project,
    tasks: [],
    milestones: [],
    activities: [],
    budget: 0,
    spent: 0,
    tags: [],
  } as DetailedProject;

  const isOverdue = new Date(project.dueDate) < new Date() && project.status !== "completed";
  const budgetProgress = detailedProject.budget > 0 ? (detailedProject.spent / detailedProject.budget) * 100 : 0;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "comment": return <MessageSquare className="h-4 w-4" />;
      case "status_change": return <Activity className="h-4 w-4" />;
      case "task_completed": return <CheckCircle2 className="h-4 w-4" />;
      case "member_added": return <UserPlus className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const getTaskIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "in-progress": return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-2">
                  <DialogTitle className="text-2xl">{project.name}</DialogTitle>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={priorityColors[project.priority]}>
                    {project.priority} priority
                  </Badge>
                  {isOverdue && (
                    <Badge variant="destructive">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Overdue
                    </Badge>
                  )}
                  {detailedProject.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${statusColors[project.status]}`} />
                    <span className="capitalize">{project.status.replace("-", " ")}</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <span className="text-sm text-muted-foreground">{project.progress}% complete</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{project.team} Team</span>
                  </div>
                </div>

                {detailedProject.budget > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>${detailedProject.spent.toLocaleString()} / ${detailedProject.budget.toLocaleString()}</span>
                    </div>
                    <Progress value={budgetProgress} className="h-2" />
                    <span className="text-sm text-muted-foreground">{budgetProgress.toFixed(1)}% of budget</span>
                  </div>
                )}
              </div>
            </DialogHeader>

            <Separator className="my-6" />

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  <Card>
                    <CardHeader>
                      <CardTitle>Team Members</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {project.members.map((member) => (
                        <div key={member.id} className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p>{member.name}</p>
                            <p className="text-sm text-muted-foreground">{project.team} Team</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>


                  <Card>
                    <CardHeader>
                      <CardTitle>Project Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Created</p>
                          <p>{new Date(project.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Due Date</p>
                          <p>{new Date(project.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Tasks</p>
                          <p>{detailedProject.tasks.filter(t => t.status === "completed").length} / {detailedProject.tasks.length}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Team Size</p>
                          <p>{project.members.length} members</p>
                        </div>
                      </div>

                      {(detailedProject.repository || detailedProject.documentation) && (
                        <div className="pt-4 border-t space-y-2">
                          {detailedProject.repository && (
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <GitBranch className="mr-2 h-4 w-4" />
                              View Repository
                            </Button>
                          )}
                          {detailedProject.documentation && (
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <FileText className="mr-2 h-4 w-4" />
                              Documentation
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tasks ({detailedProject.tasks.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {detailedProject.tasks.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No tasks defined for this project.</p>
                    ) : (
                      <div className="space-y-4">
                        {detailedProject.tasks.map((task) => (
                          <div key={task.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                            {getTaskIcon(task.status)}
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h4>{task.title}</h4>
                                <Badge variant={priorityColors[task.priority]} className="text-xs">
                                  {task.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <span>Assigned to {task.assignee}</span>
                                <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {detailedProject.milestones.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No milestones defined for this project.</p>
                    ) : (
                      <div className="space-y-6">
                        {detailedProject.milestones.map((milestone, index) => (
                          <div key={milestone.id} className="flex items-start space-x-4">
                            <div className="flex flex-col items-center">
                              <div className={`w-4 h-4 rounded-full ${
                                milestone.status === "completed" ? "bg-green-500" :
                                milestone.status === "current" ? "bg-blue-500" : "bg-gray-300"
                              }`} />
                              {index < detailedProject.milestones.length - 1 && (
                                <div className="w-px h-12 bg-border mt-2" />
                              )}
                            </div>
                            <div className="flex-1 pb-8">
                              <div className="flex items-center justify-between">
                                <h4>{milestone.title}</h4>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(milestone.date).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {detailedProject.activities.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No recent activity.</p>
                    ) : (
                      <div className="space-y-4">
                        {detailedProject.activities.map((activity) => (
                          <div key={activity.id} className="flex items-start space-x-3">
                            <div className="mt-1">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span>{activity.user}</span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(activity.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">{activity.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}