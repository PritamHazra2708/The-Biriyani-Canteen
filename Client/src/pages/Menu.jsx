import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { apiPath, wsPath } from "../config/api";
import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft, FaSync, FaFilter, FaTimes } from "react-icons/fa";
import MenuCard from "../components/MenuCard";
import FloatingCart from "../components/FloatingCart";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const wsRef = useRef(null);

  // WebSocket connection for real-time updates
  useEffect(() => {
    const connectWebSocket = () => {
      try {
        // Connect to WebSocket (adjust port as needed)
        const ws = new WebSocket(wsPath("/ws/menu"));
        
        ws.onopen = () => {
          console.log("WebSocket connected for real-time menu updates");
        };
        
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === "menu_update") {
            fetchMenu(true); // Silent refresh
          }
        };
        
        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
        
        ws.onclose = () => {
          console.log("WebSocket disconnected, reconnecting in 5s...");
          setTimeout(connectWebSocket, 5000);
        };
        
        wsRef.current = ws;
      } catch (error) {
        console.error("WebSocket connection failed:", error);
      }
    };
    
    connectWebSocket();
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const fetchMenu = async (silent = false) => {
    if (!silent) {
      setLoading(true);
    } else {
      setIsRefreshing(true);
    }
    
    try {
      setError(null);
      const res = await axios.get(apiPath("/api/menu"));
      
      const menuData = Array.isArray(res.data) ? res.data : [];
      setMenu(menuData);
      
      const uniqueCategories = ["all", ...new Set(menuData.map(item => item?.category).filter(Boolean))];
      setCategories(uniqueCategories);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching menu:", error);
      if (!silent) {
        setError("Failed to load menu. Please try again later.");
      }
    } finally {
      if (!silent) {
        setTimeout(() => setLoading(false), 500);
      } else {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  };

  // Real-time polling as fallback
  useEffect(() => {
    fetchMenu();
    
    const interval = setInterval(() => {
      fetchMenu(true);
    }, 5000); // Refresh every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  const filteredMenu = filter === "all" 
    ? menu 
    : menu.filter(item => item?.category === filter);

  // Skeleton loader component - Mobile optimized
  const SkeletonCard = () => (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 animate-pulse">
      <div className="h-48 sm:h-56 bg-white/20"></div>
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start gap-3">
          <div className="h-6 sm:h-7 bg-white/20 rounded-lg w-2/3"></div>
          <div className="h-6 sm:h-7 bg-white/20 rounded-lg w-16"></div>
        </div>
        <div className="h-4 bg-white/20 rounded-lg w-32 mt-3"></div>
        <div className="flex gap-3 mt-4 sm:mt-6">
          <div className="flex-1 h-10 sm:h-11 bg-white/20 rounded-xl sm:rounded-2xl"></div>
          <div className="flex-1 h-10 sm:h-11 bg-white/20 rounded-xl sm:rounded-2xl"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-fuchsia-700 to-blue-800 p-4 sm:p-6 relative overflow-hidden">
      <title>Menu | BiryaniQ Canteen</title>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-5 sm:left-10 text-4xl sm:text-6xl animate-float opacity-10">🍛</div>
        <div className="absolute top-40 right-5 sm:right-20 text-3xl sm:text-5xl animate-float-delay-1 opacity-10">✨</div>
        <div className="hidden sm:block absolute bottom-32 left-20 text-4xl animate-float-delay-2 opacity-10">🌿</div>
        <div className="absolute bottom-20 right-5 sm:right-10 text-4xl sm:text-5xl animate-float opacity-10">⭐</div>
        <div className="absolute top-1/3 right-5 sm:right-1/4 text-2xl sm:text-3xl animate-float-delay-3 opacity-10">🍗</div>
        
        <div className="absolute top-0 -left-20 w-52 sm:w-72 h-52 sm:h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 -right-20 w-52 sm:w-72 h-52 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4"></div>
      </div>

      {/* Top Bar with Back Button and Refresh */}
      <div className="fixed top-4 left-4 right-4 sm:top-6 sm:left-6 z-20 flex justify-between items-center">
        <Link to="/">
          <button className="group flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-black/50 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 text-white font-semibold hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300 shadow-lg">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300 text-sm sm:text-base" />
            <FaHome className="group-hover:scale-110 transition-transform duration-300 text-sm sm:text-base" />
            <span className="hidden sm:inline text-sm sm:text-base">Back to Home</span>
            <span className="sm:hidden text-sm">Home</span>
          </button>
        </Link>
        
        {/* Refresh Button and Last Updated */}
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-white/50 text-[10px] sm:text-xs hidden md:block">
              Updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={() => fetchMenu(false)}
            disabled={isRefreshing}
            className="bg-black/50 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-white/20 hover:bg-yellow-400 hover:text-black transition-all duration-300"
          >
            <FaSync className={`text-white text-sm sm:text-base ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="md:hidden bg-black/50 backdrop-blur-md rounded-xl p-2 sm:p-3 border border-white/20 hover:bg-yellow-400 hover:text-black transition-all duration-300"
          >
            <FaFilter className="text-white text-sm sm:text-base" />
          </button>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMobileFilter(false)}></div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-black rounded-t-3xl p-6 animate-slide-up max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold text-xl">Filter Categories</h3>
              <button onClick={() => setShowMobileFilter(false)} className="text-white/60 hover:text-white">
                <FaTimes className="text-2xl" />
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setShowMobileFilter(false);
                  }}
                  className={`px-5 py-3 rounded-full font-bold transition-all duration-300 ${
                    filter === cat
                      ? "bg-yellow-400 text-black shadow-lg"
                      : "bg-white/10 text-white border border-white/20"
                  }`}
                >
                  {cat === "all" ? "All Items" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HEADING - Mobile Optimized */}
      <div className="text-center mb-10 sm:mb-14 relative z-10 mt-16 sm:mt-0">
        <div className="inline-block">
          <div className="animate-slide-down">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-yellow-300 drop-shadow-lg tracking-wide">
              OUR MENU
            </h1>
            <div className="flex justify-center gap-2 mt-2 sm:mt-3">
              <span className="w-8 sm:w-12 h-1 bg-yellow-400 rounded-full animate-pulse"></span>
              <span className="w-4 sm:w-6 h-1 bg-pink-400 rounded-full animate-pulse animation-delay-1"></span>
              <span className="w-2 sm:w-3 h-1 bg-blue-400 rounded-full animate-pulse animation-delay-2"></span>
            </div>
          </div>
          <p className="text-white/90 mt-3 sm:mt-4 text-base sm:text-lg md:text-xl animate-fade-in-up">
            Fresh • Spicy • Delicious
          </p>
        </div>
      </div>

      {/* Category Filter - Desktop */}
      <div className="max-w-4xl mx-auto mb-8 sm:mb-12 relative z-10 hidden md:block">
        {!loading && categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 animate-fade-in-up animation-delay-1">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                  filter === cat
                    ? "bg-yellow-400 text-black shadow-lg shadow-yellow-500/50 scale-105"
                    : "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 border border-white/20"
                }`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {cat === "all" ? "All Items" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Menu Grid - Mobile Optimized */}
      <div className="relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 sm:py-20">
            <div className="text-5xl sm:text-6xl mb-4">⚠️</div>
            <p className="text-white/80 text-lg sm:text-xl">{error}</p>
            <button 
              onClick={() => fetchMenu(false)}
              className="mt-6 px-6 py-3 bg-yellow-400 text-black rounded-xl font-bold hover:scale-105 transition"
            >
              Try Again
            </button>
          </div>
        ) : filteredMenu.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <div className="text-5xl sm:text-6xl mb-4 animate-float">🍽️</div>
            <p className="text-white/80 text-lg sm:text-xl">No items found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredMenu.map((item, index) => (
              <div
                key={item?._id || index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* FLOATING CART */}
      <FloatingCart />

      {/* Real-time Status Indicator */}
      {!loading && (
        <div className="fixed bottom-4 right-4 z-20">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 border border-green-500/30">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-white/60 text-[10px] sm:text-xs">Live</span>
          </div>
        </div>
      )}

      {/* Decorative Footer - Mobile Optimized */}
      <div className="text-center mt-12 sm:mt-16 pt-4 sm:pt-6 border-t border-white/10 relative z-10 pb-4">
        <p className="text-white/50 text-xs sm:text-sm animate-fade-in">
          🍛 Order your favorite biryani and enjoy the best taste!
        </p>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-slide-down {
          animation: slide-down 0.6s ease-out forwards;
        }
        
        .animate-slide-right {
          animation: slide-right 0.5s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delay-1 {
          animation: float 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float-delay-2 {
          animation: float 4.5s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-delay-3 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 3s;
        }
        
        .animate-blob {
          animation: blob 12s infinite;
        }
        
        .animation-delay-1 {
          animation-delay: 0.15s;
        }
        
        .animation-delay-2 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-4 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}

export default Menu;
