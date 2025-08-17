import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";

interface ProjectFiltersProps {
  statusFilter: string;
  priorityFilter: string;
  teamFilter: string;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
  onTeamChange: (team: string) => void;
  onClearFilters: () => void;
}

export function ProjectFilters({
  statusFilter,
  priorityFilter,
  teamFilter,
  onStatusChange,
  onPriorityChange,
  onTeamChange,
  onClearFilters
}: ProjectFiltersProps) {
  const hasActiveFilters = statusFilter !== "all" || priorityFilter !== "all" || teamFilter !== "all";

  return (
    <div className="flex items-center justify-between p-6 bg-muted/50">
      <div className="flex items-center space-x-4">
        <h2>Projects</h2>
        
        <div className="flex items-center space-x-2">
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={onPriorityChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={teamFilter} onValueChange={onTeamChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="product">Product</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <X className="mr-1 h-3 w-3" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Badge variant="secondary">12 projects</Badge>
      </div>
    </div>
  );
}