import React from "react";
import Sidebar from "../Components/SideBar";
import { Outlet } from "react-router-dom";
import Background from "../Components/Background";

export default function Dashboard() {
  return (
    <div className="mt-14 px-1 md:px-12 lg:px-24 xl:px-32 mb-10 flex gap-4">
      <Background type="empty" />
      <div className="hidden md:flex max-w-[250px] w-full mt-10">
        <Sidebar />
      </div>
      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col mt-10">
        <Outlet />
      </main>
    </div>
  );
}
