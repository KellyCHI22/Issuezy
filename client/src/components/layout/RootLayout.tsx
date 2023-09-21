import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import ButtomMenu from "./ButtomMenu";

export default function RootLayout() {
  return (
    <div className="lg:grid lg:h-screen lg:grid-cols-12">
      <SideMenu className="hidden dark:bg-gray-900 lg:col-span-2 lg:block" />
      <ButtomMenu className="z-10 lg:col-span-2 lg:hidden" />
      <main className="mb-[60px] bg-zinc-100 bg-[url('@/assets/layered-waves-haikei-light.svg')] bg-cover bg-fixed dark:bg-background dark:bg-[url('@/assets/layered-waves-haikei.svg')] lg:col-span-10 lg:mb-0 lg:h-screen lg:bg-local">
        <Outlet />
      </main>
    </div>
  );
}
