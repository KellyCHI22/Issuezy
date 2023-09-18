import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { LayoutGrid, CheckSquare, Settings, LogOut } from "lucide-react";
import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "@/apis/user-api";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SideMenu({ className }: SidebarProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { status, error, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    onSuccess: (data) => console.log(data),
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/login");
  };

  // todo need to add loading skeleton component
  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "error") {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <img src={logoLight} className="mb-5 h-24 w-24 dark:hidden" />
          <img src={logoDark} className="mb-5 hidden h-24 w-24 dark:block" />
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Hi, {data.currentUser.firstname}
          </h2>
          <div className="space-y-1">
            <NavLink to="/projects" className="flex items-center">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  <span>Projects</span>
                </Button>
              )}
            </NavLink>
            <NavLink to="/tasks" className="flex items-center">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <CheckSquare className="mr-2 h-4 w-4" />
                  <span>My tasks</span>
                </Button>
              )}
            </NavLink>
            <NavLink to="/account" className="flex items-center">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </Button>
              )}
            </NavLink>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
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
