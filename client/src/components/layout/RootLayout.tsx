import { useQuery } from "@tanstack/react-query";
import SideMenu from "../SideMenu";
import { Outlet } from "react-router-dom";
import ButtomMenu from "../ButtomMenu";

export default function RootLayout() {
  return (
    <div className="lg:grid lg:h-screen lg:grid-cols-12">
      <SideMenu className="hidden lg:col-span-2 lg:block" />
      <ButtomMenu className="lg:col-span-2 lg:hidden" />
      <main className="mb-[60px] lg:col-span-10 lg:mb-0">
        <Outlet />
      </main>
    </div>
  );
}
