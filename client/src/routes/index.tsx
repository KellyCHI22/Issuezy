import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { SignupPage, LoginPage } from "@/features/auth";
import {
  AllProjectsPage,
  DashboardPage,
  ProjectPage,
  IssuePage,
} from "@/features/projects";
import { AccountPage, TasksPage } from "@/features/users";

import ProtectedRoutes from "@/components/ProtectedRoutes";
import RootLayout from "@/components/layout/RootLayout";

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
