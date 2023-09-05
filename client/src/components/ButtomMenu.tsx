import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SideMenu({ className }: SidebarProps) {
  return (
    <div className={cn("fixed bottom-0 w-screen bg-background", className)}>
      <div className="flex justify-between gap-3 p-3">
        <Button variant="secondary" className="w-full ">
          <Link to="/projects">Projects</Link>
        </Button>
        <Button variant="ghost" className="w-full ">
          <Link to="/tasks">Tasks</Link>
        </Button>
        <Button variant="ghost" className="w-full ">
          <Link to="/projects">Account</Link>
        </Button>
        <div className="">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
