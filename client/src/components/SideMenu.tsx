import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { LayoutGrid, CheckSquare, Settings } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SideMenu({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Hi, Kelly
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <Link to="/projects" className="flex items-center">
                <LayoutGrid className="mr-2 h-4 w-4" />
                <span>Projects</span>
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Link to="/tasks" className="flex items-center">
                <CheckSquare className="mr-2 h-4 w-4" />
                <span>My Tasks</span>
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Link to="/projects" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Account</span>
              </Link>
            </Button>
            <div className="px-4">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
