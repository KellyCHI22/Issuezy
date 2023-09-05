import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";

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
              <Link to="/projects">Projects</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Link to="/tasks">My Tasks</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Link to="/projects">Account</Link>
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
