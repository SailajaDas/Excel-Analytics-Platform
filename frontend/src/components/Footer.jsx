
import React from "react";
import {
  BarChart3,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Home,
  Info,
  Phone,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#00212B] text-gray-200 border-t border-[#00C3FF]/30 relative overflow-hidden">
      {/* Background Logo (faded chart icon) */}
      <BarChart3 className="absolute right-6 top-6 w-20 h-20 text-[#00C3FF]/10 rotate-12 hover:rotate-0 transition-all duration-500" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-[#00C3FF] mr-3" />
              <h2 className="text-2xl font-bold text-[#00C3FF]">Excellytics</h2>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-sm">
              Your smart analytics companion. Transform raw data into
              actionable insights with advanced visualizations, real-time
              dashboards & reporting -simple, interactive and powerful.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-400">Quick Links</h3>
            <nav className="space-y-3 text-sm">
              <NavLink
                to="/"
                className="flex items-center hover:text-green-400 transition"
              >
                <Home className="w-4 h-4 mr-2 text-green-400" /> Home
              </NavLink>

              <NavLink
                to="/about"
                className="flex items-center hover:text-green-400 transition"
              >
                <Info className="w-4 h-4 mr-2 text-green-400" /> About
              </NavLink>

              <NavLink
                to="/contact"
                className="flex items-center hover:text-green-400 transition"
              >
                <Phone className="w-4 h-4 mr-2 text-green-400" /> Contact
              </NavLink>
            </nav>
          </div>

          {/* Connect With Us */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-yellow-400">
              Connect With Us
            </h3>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#003845] hover:bg-[#005F73] flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#003845] hover:bg-[#005F73] flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#003845] hover:bg-[#005F73] flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@excellytics.com"
                className="w-10 h-10 rounded-lg bg-[#003845] hover:bg-[#005F73] flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:contact@excellytics.com"
                className="flex items-center text-gray-300 hover:text-[#00C3FF] transition-colors duration-200"
              >
                <Mail className="w-4 h-4 mr-3 text-[#00C3FF]" />
                contact@excellytics.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#00C3FF]/30">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-200 animate-pulse">
          © {currentYear}{" "}
          <span className="text-green-400 font-semibold">Excellytics</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
