import { useState, useEffect } from "react";
import { 
  FaBoxOpen, 
  FaUtensils, 
  FaUsers, 
  FaCreditCard, 
  FaChartLine,
  FaBars,
  FaTimes,
  FaBell,
  FaUserCircle,
  FaSearch,
  FaHome,
  FaSignOutAlt
} from "react-icons/fa";
import { MdFastfood, MdDeliveryDining } from "react-icons/md";
import { GiChickenOven } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

import Dashboard from "./admin/Dashboard";
import Orders from "./admin/Orders";
import MenuAdmin from "./admin/MenuAdmin";
import Users from "./admin/Users";

function Admin() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;
      case "Orders":
        return <Orders />;
      case "Menu":
        return <MenuAdmin />;
      case "Users":
        return <Users />;
      default:
        return <Orders />;
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: FaHome, color: "from-emerald-500 to-green-600" },
    { name: "Orders", icon: FaBoxOpen, color: "from-blue-500 to-blue-600" },
    { name: "Menu", icon: FaUtensils, color: "from-orange-500 to-red-600" },
    { name: "Users", icon: FaUsers, color: "from-purple-500 to-pink-600" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      <title>Biryani Admin | BiryaniQ Canteen</title>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* SIDEBAR - Fixed position, never scrolls */}
      <div className={`
        fixed lg:relative z-50
        transition-all duration-500 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:translate-x-0
        w-72 bg-gradient-to-b from-zinc-900 to-black border-r border-yellow-400/20
        flex flex-col
        shadow-2xl
        h-full
        overflow-y-auto
        custom-scrollbar
      `}>
        
        {/* Logo Section - Sticky */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-zinc-900 to-zinc-900/95 backdrop-blur-sm p-6 border-b border-yellow-400/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-2">
                <MdFastfood className="text-3xl text-black" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Biryani Canteen
              </h1>
              <p className="text-xs text-white/50">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Admin Profile - Sticky */}
        <div className="sticky top-[88px] z-10 bg-gradient-to-b from-zinc-900/95 to-zinc-900/90 backdrop-blur-sm p-4 mx-4 mt-4 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                <FaUserCircle className="text-2xl text-black" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
            <div className="flex-1">
              <p className="text-white font-bold">Admin User</p>
              <p className="text-white/50 text-xs">Super Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu - Scrollable if needed */}
        <div className="flex-1 px-4 py-6">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-4 px-3">Main Menu</p>
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActivePage(item.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl font-semibold
                    transition-all duration-300 cursor-pointer
                    flex items-center gap-3 group
                    relative overflow-hidden
                    ${isActive 
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg shadow-yellow-500/30" 
                      : "text-white/70 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  <Icon className={`text-xl ${isActive ? 'text-black' : 'group-hover:scale-110 transition-transform'}`} />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer - Sticky at bottom */}
        <div className="sticky bottom-0 bg-gradient-to-t from-zinc-900 to-zinc-900/95 backdrop-blur-sm p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all duration-300 mb-3"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
          <div className="text-center">
            <p className="text-white/30 text-xs">© 2024 BiryaniQ Canteen</p>
            <p className="text-white/20 text-[10px] mt-1">v2.0.0</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT - Scrollable area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        
        {/* Top Navigation Bar - NOW SCROLLS WITH CONTENT (removed sticky) */}
        <div className="bg-black/50 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-6 py-4">
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white text-2xl hover:text-yellow-400 transition-colors"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search orders, menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 transition-all"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Date & Time */}
              <div className="hidden md:block text-right">
                <p className="text-white/60 text-xs">{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-yellow-400 text-sm font-bold">{currentTime.toLocaleTimeString()}</p>
              </div>
              
              {/* Notification Bell */}
              <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors group">
                <FaBell className="text-white/70 text-xl group-hover:text-yellow-400 transition-colors" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* User Avatar (Mobile) */}
              <div className="lg:hidden">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                  <FaUserCircle className="text-xl text-black" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="animate-fade-in">
            {/* Dynamic Content */}
            <div className="transition-all duration-500">
              {renderPage()}
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slide-in 0.4s ease-out forwards;
          opacity: 0;
        }
        
        /* Custom scrollbar for the entire app */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
        }
        
        /* Hide scrollbar when not hovering (optional) */
        .custom-scrollbar:not(:hover)::-webkit-scrollbar-thumb {
          background: transparent;
        }
        
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }
        
        /* Ensure main container has proper overflow */
        .h-screen {
          height: 100vh;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default Admin;