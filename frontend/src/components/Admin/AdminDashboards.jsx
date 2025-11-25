import React, { useState } from "react";
import UserDashboardNavbar from "../User/UserDashboardNavbar";
import AdminOverview from "./AdminOverview";

const AdminDashboards = () => {
  const [activeTab, setActiveTab] = useState("adminOverview");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <UserDashboardNavbar />
      </div>

      {/* Admin Overview directly under Navbar */}
      <div className="flex-1 px-8 py-6">
        {activeTab === "adminOverview" && <AdminOverview />}
      </div>
    </div>
  );
};

export default AdminDashboards;
