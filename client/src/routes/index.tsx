import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import RootLayout from "@/components/layout/RootLayout";
import AccountPage from "@/pages/AccountPage";
import AllProjectsPage from "@/pages/AllProjectsPage";
import DashboardPage from "@/pages/DashboardPage";
import IssuePage from "@/pages/IssuePage";
import LoginPage from "@/pages/LoginPage";
import ProjectPage from "@/pages/ProjectPage";
import SignupPage from "@/pages/SignupPage";
import TasksPage from "@/pages/TasksPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<RootLayout />}>
          <Route path="/projects" element={<AllProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/projects/:id/dashboard" element={<DashboardPage />} />
          <Route path="/projects/:id/issues/:iid" element={<IssuePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
      </Route>
    </>,
  ),
);

export default router;
