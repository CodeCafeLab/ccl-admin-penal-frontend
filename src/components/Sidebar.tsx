"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaBlog,
  FaCog,
  FaSignOutAlt,
  FaCode,
  FaUser,
  FaTags,
  FaVideo,
  FaBox,
  FaBriefcase,
  FaUsers,
  FaStar,
  FaFileAlt,
  FaNewspaper,
  FaBook,
  FaGraduationCap,
  FaEnvelope,
  FaChartBar,
  FaCalendarAlt,
  FaQuestionCircle,
  FaPlay,
  FaRobot,
} from "react-icons/fa";
import { useAuth } from "@/components/AuthContext";
import apiClient from "@/lib/axios";

interface SidebarProps {
  adminName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ adminName = "Admin" }) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [adminData, setAdminData] = useState({
    name: adminName,
    email: "antima142005@gmail.com"
  });
  const activeItemRef = useRef<HTMLLIElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const navItems = [
    { href: "/ai", icon: <FaRobot />, label: "AI" },
    { href: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { href: "/blog", icon: <FaBlog />, label: "Blog Management" },
    { href: "/quick-bites", icon: <FaVideo />, label: "Quick Bites" },
    { href: "/category", icon: <FaTags />, label: "Categories" },
    { href: "/careers", icon: <FaBriefcase />, label: "Careers" },
    { href: "/teams", icon: <FaUsers />, label: "Team Management" },
    { href: "/product", icon: <FaBox />, label: "Products" },
    { href: "/client-reviews", icon: <FaUser />, label: "Client Reviews" },
    { href: "/contactUs", icon: <FaUser />, label: "Contact Us" },
    { href: "/partners", icon: <FaUsers />, label: "Partners Program" },
    { href: "/why-choose-us", icon: <FaStar />, label: "Why Choose Us" },
    { href: "/case-studies", icon: <FaFileAlt />, label: "Case Studies" },
    { href: "/whitepapers", icon: <FaBook />, label: "Whitepapers" },
    { href: "/reports", icon: <FaChartBar />, label: "Reports" },
    { href: "/news", icon: <FaNewspaper />, label: "News" },
    { href: "/assignments", icon: <FaGraduationCap />, label: "Assignments" },
    { href: "/webinars", icon: <FaCalendarAlt />, label: "Webinars" },
    { href: "/help", icon: <FaQuestionCircle />, label: "Help & Support" },
    { href: "/tutorials", icon: <FaPlay />, label: "Tutorials" },
    { href: "/newsletters", icon: <FaEnvelope />, label: "Newsletters" },
    { href: "/settings", icon: <FaCog />, label: "Settings" },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const scrollToActiveItem = () => {
      if (activeItemRef.current && navRef.current) {
        const activeItem = activeItemRef.current;
        const navContainer = navRef.current;
        const containerRect = navContainer.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const itemTop = itemRect.top - containerRect.top;
        const itemBottom = itemRect.bottom - containerRect.top;
        const containerHeight = containerRect.height;
        if (itemTop < 0 || itemBottom > containerHeight) {
          const scrollTop =
            navContainer.scrollTop +
            itemTop -
            containerHeight / 2 +
            itemRect.height / 2;
          navContainer.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: "smooth",
          });
        }
      }
    };
    const timeoutId = setTimeout(scrollToActiveItem, 100);
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  useEffect(() => {
    // Fetch admin profile data
    apiClient
      .get("/auth/profile")
      .then((res) => {
        setAdminData({
          name: res.data.user?.name || "Admin",
          email: res.data.user?.email || "antima142005@gmail.com"
        });
      })
      .catch((err) => {
        console.error("Sidebar profile fetch error:", err);
        // Keep default admin data if fetch fails
      });
  }, []);

  return (
    <aside className="fixed top-0 left-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white w-64 flex flex-col shadow-2xl z-40">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <FaCode className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">CodeCafe Lab</h1>
            <p className="text-sm text-slate-300">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav ref={navRef} className="flex-1 px-4 py-8 overflow-y-auto sidebar-scroll">
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-3">
            Navigation
          </h2>
        </div>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} ref={active ? activeItemRef : null}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <span
                    className={`text-lg transition-transform duration-200 ${
                      active ? "scale-110" : "group-hover:scale-110"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                  {active && (
                    <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
        <div className="mb-4 px-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
              <FaUser className="text-slate-300 text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-400">Welcome back,</p>
              <p className="font-medium text-white text-sm truncate">{adminData.name}</p>
              <p className="text-xs text-slate-400 truncate">{adminData.email}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all duration-200 group"
        >
          <FaSignOutAlt className="text-lg transition-transform duration-200 group-hover:scale-110" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
