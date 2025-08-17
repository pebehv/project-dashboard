"use client";

import { useState, useMemo } from "react";
import { DashboardHeader } from "../components/DashboardHeader";
import { ProjectFilters } from "../components/ProjectFilters";
import { ProjectCard } from "../components/ProjectCard";
import { Project } from "../app/data/type/project";
import { ProjectCharts } from "../components/ProjectCharts";
import { ProjectDetailModal } from "../components/ProjectDetailModal";
import { mockProjects } from "../app/data/type/mockData";
import { filterProjects } from "../components/filterUtils";
// Uncomment the line below to use API data instead of mock data
// import { useProjects } from "../hooks/useProjects";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Option 1: Use API data (uncomment to enable)
  // const { projects, loading, error } = useProjects();
  
  // Option 2: Use mock data (current implementation)
  const projects = mockProjects;
  const loading = false;
  const error = null;

  console.log('leyendo data ', mockProjects)
  const filteredProjects = useMemo(() => 
    filterProjects(projects, searchQuery, statusFilter, priorityFilter, teamFilter),
    [projects, searchQuery, statusFilter, priorityFilter, teamFilter]
  );

  const clearFilters = () => {
    setStatusFilter("all");
    setPriorityFilter("all");
    setTeamFilter("all");
    setSearchQuery("");
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Error loading projects: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <ProjectFilters
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        teamFilter={teamFilter}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onTeamChange={setTeamFilter}
        onClearFilters={clearFilters}
      />

      <div className="border-b">
        <ProjectCharts projects={filteredProjects} />
      </div>

      <div className="p-6">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={handleProjectClick}
              />
            ))}
          </div>
        )}
      </div>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={isDetailModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}