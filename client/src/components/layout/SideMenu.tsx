import { cn } from "@/utils";
import { Button } from "../ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { ModeToggle } from "../ModeToggle";
import { LayoutGrid, CheckSquare, Settings, LogOut } from "lucide-react";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type CurrentUser,
  getCurrentUser,
} from "@/features/users/apis/user-api";
import Spinner from "../ui/spinner";

interface SideMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SideMenu({ className }: SideMenuProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { status, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/login");
  };

  if (status === "loading") return <Spinner />;
  if (status === "error") {
    return <p>Something went wrong</p>;
  }

  const currentUser = data.currentUser as CurrentUser;

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <img src={logoLight} className="mb-5 h-24 w-24 dark:hidden" />
          <img src={logoDark} className="mb-5 hidden h-24 w-24 dark:block" />
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Hi, {currentUser.firstname}
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
            <NavLink to="/settings" className="flex items-center">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
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
            <div className="px-4 pt-2">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
