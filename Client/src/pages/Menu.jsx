import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import MenuCard from "../components/MenuCard";
import FloatingCart from "../components/FloatingCart";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("http://127.0.0.1:5000/api/menu");
        
        // Ensure we have an array of items
        const menuData = Array.isArray(res.data) ? res.data : [];
        setMenu(menuData);
        
        // Extract unique categories
        const uniqueCategories = ["all", ...new Set(menuData.map(item => item?.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching menu:", error);
        setError("Failed to load menu. Please try again later.");
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchMenu();
  }, []);

  const filteredMenu = filter === "all" 
    ? menu 
    : menu.filter(item => item?.category === filter);

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 animate-pulse">
      <div className="h-56 bg-white/20"></div>
      <div className="p-5">
        <div className="flex justify-between items-start gap-3">
          <div className="h-7 bg-white/20 rounded-lg w-2/3"></div>
          <div className="h-7 bg-white/20 rounded-lg w-16"></div>
        </div>
        <div className="h-4 bg-white/20 rounded-lg w-32 mt-3"></div>
        <div className="flex gap-3 mt-6">
          <div className="flex-1 h-11 bg-white/20 rounded-2xl"></div>
          <div className="flex-1 h-11 bg-white/20 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-fuchsia-700 to-blue-800 p-6 relative overflow-hidden">
      <title>Menu | BiryaniQ Canteen</title>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-float opacity-10">🍛</div>
        <div className="absolute top-40 right-20 text-5xl animate-float-delay-1 opacity-10">✨</div>
        <div className="absolute bottom-32 left-20 text-4xl animate-float-delay-2 opacity-10">🌿</div>
        <div className="absolute bottom-20 right-10 text-5xl animate-float opacity-10">⭐</div>
        <div className="absolute top-1/3 right-1/4 text-3xl animate-float-delay-3 opacity-10">🍗</div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 -left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 -right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4"></div>
      </div>

      {/* Back to Home Button - Fixed Position */}
      <div className="fixed top-24 left-6 z-20 animate-slide-right">
        <Link to="/">
          <button className="group flex items-center gap-2 px-5 py-3 bg-black/50 backdrop-blur-md rounded-2xl border border-white/20 text-white font-semibold hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300 shadow-lg hover:shadow-yellow-500/30">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            <FaHome className="group-hover:scale-110 transition-transform duration-300" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </button>
        </Link>
      </div>

      {/* HEADING with Animation */}
      <div className="text-center mb-14 relative z-10">
        <div className="inline-block">
          <div className="animate-slide-down">
            <h1 className="text-5xl md:text-7xl font-black text-yellow-300 drop-shadow-lg tracking-wide">
              OUR MENU
            </h1>
            <div className="flex justify-center gap-2 mt-3">
              <span className="w-12 h-1 bg-yellow-400 rounded-full animate-pulse"></span>
              <span className="w-6 h-1 bg-pink-400 rounded-full animate-pulse animation-delay-1"></span>
              <span className="w-3 h-1 bg-blue-400 rounded-full animate-pulse animation-delay-2"></span>
            </div>
          </div>
          <p className="text-white/90 mt-4 text-lg md:text-xl animate-fade-in-up">
            Fresh • Spicy • Delicious
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-4xl mx-auto mb-12 relative z-10">
        {!loading && categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up animation-delay-1">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
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

      {/* Menu Grid */}
      <div className="relative z-10">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-white/80 text-xl">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-yellow-400 text-black rounded-xl font-bold hover:scale-105 transition"
            >
              Try Again
            </button>
          </div>
        ) : filteredMenu.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 animate-float">🍽️</div>
            <p className="text-white/80 text-xl">No items found in this category</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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

      {/* Decorative Footer */}
      <div className="text-center mt-16 pt-6 border-t border-white/10 relative z-10">
        <p className="text-white/60 text-sm animate-fade-in">
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