import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { LayoutGrid, CheckSquare, Settings, LogOut } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function ButtomMenu({ className }: SidebarProps) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={cn("fixed bottom-0 w-screen bg-background", className)}>
      <div className="flex justify-center gap-1 p-3">
        <NavLink to="/projects" className="flex items-center">
          {({ isActive }) => (
            <Button variant={isActive ? "secondary" : "ghost"} className="px-6">
              <LayoutGrid className="h-5 w-5" />
            </Button>
          )}
        </NavLink>
        <NavLink to="/tasks" className="flex items-center">
          {({ isActive }) => (
            <Button variant={isActive ? "secondary" : "ghost"} className="px-6">
              <CheckSquare className="h-5 w-5" />
            </Button>
          )}
        </NavLink>
        <NavLink to="/account" className="flex items-center">
          {({ isActive }) => (
            <Button variant={isActive ? "secondary" : "ghost"} className="px-6">
              <Settings className="h-5 w-5" />
            </Button>
          )}
        </NavLink>
        <Button variant="ghost" className="px-6" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
        <div className="">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
