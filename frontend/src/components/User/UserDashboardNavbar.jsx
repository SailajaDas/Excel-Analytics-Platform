import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/userSlice";
import { BarChart3 } from "lucide-react";

const UserDashboardNavbar = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/auth/signout", {
        method: "GET",
        credentials: "include",
      });

      dispatch(logoutUser());
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-[#00212B] via-[#004A6E] to-[#00C3FF] shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div
        className="flex items-center text-2xl font-bold text-white hover:text-[#00C3FF] transition-colors duration-200 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <BarChart3 className="w-8 h-8 mr-2 text-[#00C3FF]" />
        Excellytics
      </div>

      <div className="flex items-center space-x-4">
        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#004A6E] via-[#006E96] to-[#00C3FF] flex items-center justify-center font-bold text-white text-lg">
          {userData?.email ? userData.email[0].toUpperCase() : "U"}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 font-semibold text-white rounded-lg bg-red-500 hover:bg-red-600 transition-colors duration-300"
        >
          SignOut
        </button>
      </div>
    </header>
  );
};

export default UserDashboardNavbar;
