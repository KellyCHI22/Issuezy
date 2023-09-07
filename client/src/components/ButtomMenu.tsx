import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { LayoutGrid, CheckSquare, Settings } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SideMenu({ className }: SidebarProps) {
  return (
    <div className={cn("fixed bottom-0 w-screen bg-background", className)}>
      <div className="flex justify-center gap-3 p-3">
        <Button variant="secondary" className="px-6">
          <Link to="/projects" className="flex items-center">
            <LayoutGrid className="h-5 w-5" />
            {/* <span></span> */}
          </Link>
        </Button>
        <Button variant="ghost" className="px-6">
          <Link to="/tasks" className="flex items-center">
            <CheckSquare className="h-5 w-5" />
            {/* <span></span> */}
          </Link>
        </Button>
        <Button variant="ghost" className="px-6">
          <Link to="/projects" className="flex items-center">
            <Settings className="h-5 w-5" />
            {/* <span></span> */}
          </Link>
        </Button>
        <div className="">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
