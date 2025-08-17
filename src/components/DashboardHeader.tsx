import { Search, Plus, Bell, Settings } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function DashboardHeader({ searchQuery, onSearchChange }: DashboardHeaderProps) {
  return (
    <div className="border-b bg-card">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-4">
          <h1>Project Management Dashboard</h1>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
          
          
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}