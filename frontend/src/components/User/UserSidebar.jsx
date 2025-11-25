import React, { useState } from "react";
import {
  LayoutDashboard,
  Users2,
  FolderOpen,
  ClipboardList,
  BarChart4,
} from "lucide-react";

export const userSidebarItems = [
  { id: "overView", label: "Overview", icon: LayoutDashboard },
  { id: "fileUpload", label: "File Upload", icon: FolderOpen },

  { id: "charts", label: "Charts", icon: BarChart4 },
  { id: "history", label: "History", icon: ClipboardList },
];

const UserSidebar = ({ activeTab, setActiveTab }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl p-6 overflow-hidden h-screen sticky top-0 border-r border-slate-700/50">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-blue-500/5 animate-pulse"></div>

      <ul className="space-y-2 relative z-10">
        {userSidebarItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <li
              key={item.id}
              className="transform animate-slideInLeft"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "both",
              }}
            >
              <button
                onClick={() => setActiveTab(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative overflow-hidden group ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20 scale-105"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:shadow-md hover:scale-102 hover:border-emerald-500/20"
                }`}
              >
                {/* Hover highlight */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-sm transition-opacity duration-300${
                    isHovered && !isActive ? "opacity-100" : "opacity-0"
                  }`}
                ></div>

                {/* Icon */}
                <Icon
                  className={`h-6 w-6 transition-all duration-300 relative z-10 ${
                    isActive
                      ? "text-white drop-shadow-sm"
                      : isHovered
                      ? "text-emerald-400 scale-110"
                      : "text-slate-400"
                  }`}
                />

                {/* Label */}
                <span
                  className={`text-sm font-medium transition-all duration-300 relative z-10 ${
                    isActive
                      ? "text-white font-semibold"
                      : isHovered
                      ? "text-white"
                      : "text-slate-300"
                  }`}
                >
                  {item.label}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute right-3 w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></div>
                )}

                {/* Hover outline */}
                {isHovered && !isActive && (
                  <div className="absolute inset-0 border border-emerald-500/30 rounded-xl"></div>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserSidebar;
