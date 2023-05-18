import React from "react";
import Sidebar from "./Sidebar";

export default function LayoutDashboard({ children }) {
  return (
    <div className="my-20">
      <Sidebar />
      {children}
    </div>
  );
}
