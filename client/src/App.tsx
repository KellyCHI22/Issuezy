import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/theme-provider";

import RootLayout from "./components/layout/RootLayout";
import AllProjectsPage from "./pages/AllProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import IssuePage from "./pages/IssuePage";
import TasksPage from "./pages/TasksPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<RootLayout />}>
        <Route path="/projects" element={<AllProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/projects/:id/issues/:iid" element={<IssuePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Route>
    </>,
  ),
);

function App() {
  return (
    <>
      {" "}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
