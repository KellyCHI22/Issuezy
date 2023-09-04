import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<RootLayout />}></Route>),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
