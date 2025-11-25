import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Info,
  Mail,
  LogIn,
  UserPlus,
  Shield,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const Nav = () => {
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAuthDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleAuthDropdown = () => {
    setIsAuthDropdownOpen(!isAuthDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#00212B] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="flex items-center text-2xl font-bold text-white hover:text-[#00C3FF] transition-colors duration-200"
            >
              <BarChart3 className="w-8 h-8 mr-2 text-[#00C3FF]" />
              Excellytics
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink
              to="/about"
              className="flex items-center text-white hover:text-[#00C3FF] font-medium transition-colors duration-200 px-3 py-2 rounded-md"
            >
              <Info className="w-4 h-4 mr-1 text-[#00C3FF]" />
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="flex items-center text-white hover:text-[#00C3FF] font-medium transition-colors duration-200 px-3 py-2 rounded-md"
            >
              <Mail className="w-4 h-4 mr-1 text-[#00C3FF]" />
              Contact
            </NavLink>

            {/* Auth Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleAuthDropdown}
                className="flex items-center text-white hover:text-[#00C3FF] font-medium focus:outline-none focus:ring-2 focus:ring-[#00C3FF] focus:ring-offset-2 focus:ring-offset-[#00212B] rounded-md px-3 py-2 transition-colors duration-200"
                aria-expanded={isAuthDropdownOpen}
                aria-haspopup="true"
              >
                <LogIn className="w-4 h-4 mr-1 text-[#00C3FF]" />
                Account
                <ChevronDown
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    isAuthDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isAuthDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                  <NavLink
                    to="/signup"
                    className="flex items-center px-4 py-2 text-[#00212B] hover:bg-[#00C3FF] hover:text-white transition-colors duration-150"
                    onClick={() => setIsAuthDropdownOpen(false)}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </NavLink>
                  <div className="border-t border-gray-100"></div>
                  <NavLink
                    to="/signin"
                    className="flex items-center px-4 py-2 text-[#00212B] hover:bg-[#00C3FF] hover:text-white transition-colors duration-150"
                    onClick={() => setIsAuthDropdownOpen(false)}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Sign In
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-[#00C3FF] focus:outline-none focus:ring-2 focus:ring-[#00C3FF] focus:ring-offset-2 focus:ring-offset-[#00212B] p-2 rounded-md transition-colors duration-200"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-[#00212B] border-t border-[#00C3FF]/30">
          <NavLink
            to="/about"
            className="flex items-center px-3 py-2 text-white hover:bg-[#00C3FF] hover:text-[#00212B] rounded-md font-medium transition-colors duration-150"
            onClick={closeMobileMenu}
          >
            <Info className="w-4 h-4 mr-2 text-[#00C3FF]" />
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="flex items-center px-3 py-2 text-white hover:bg-[#00C3FF] hover:text-[#00212B] rounded-md font-medium transition-colors duration-150"
            onClick={closeMobileMenu}
          >
            <Mail className="w-4 h-4 mr-2 text-[#00C3FF]" />
            Contact
          </NavLink>

          {/* Mobile Auth Section */}
          <div className="pt-2 border-t border-[#00C3FF]/30 mt-2">
            <div className="px-3 py-1 text-xs font-semibold text-[#00C3FF] uppercase tracking-wide">
              Account
            </div>
            <NavLink
              to="/signup"
              className="flex items-center px-3 py-2 text-white hover:bg-[#00C3FF] hover:text-[#00212B] rounded-md font-medium transition-colors duration-150"
              onClick={closeMobileMenu}
            >
              <UserPlus className="w-4 h-4 mr-2 text-[#00C3FF]" />
              Sign Up
            </NavLink>
            <NavLink
              to="/signin"
              className="flex items-center px-3 py-2 text-white hover:bg-[#00C3FF] hover:text-[#00212B] rounded-md font-medium transition-colors duration-150"
              onClick={closeMobileMenu}
            >
              <Shield className="w-4 h-4 mr-2 text-[#00C3FF]" />
              Sign In
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
