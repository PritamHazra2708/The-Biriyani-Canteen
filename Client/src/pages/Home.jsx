import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-fuchsia-600 to-blue-700 overflow-hidden relative">
      
      <title>THE BIRYANI CANTEEN</title>
      
      {/* Animated Background Elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Biryani Particles */}
        <div className="absolute top-10 left-2 text-4xl sm:text-6xl animate-float opacity-20">🍛</div>
        <div className="absolute top-32 right-2 text-3xl sm:text-5xl animate-float-delay-1 opacity-20">🍗</div>
        <div className="hidden sm:block absolute bottom-32 left-20 text-5xl animate-float-delay-2 opacity-20">🌿</div>
        <div className="absolute bottom-20 right-2 text-4xl sm:text-7xl animate-float-delay-3 opacity-10">🍚</div>
        <div className="absolute top-1/3 left-1 text-2xl sm:text-3xl animate-float opacity-15">✨</div>
        <div className="absolute bottom-1/4 right-2 text-2xl sm:text-4xl animate-float-delay-1 opacity-15">⭐</div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 -left-20 w-52 sm:w-72 h-52 sm:h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-52 sm:w-72 h-52 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2"></div>
        <div className="absolute -bottom-8 left-20 w-52 sm:w-72 h-52 sm:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4"></div>
      </div>

      {/* NAVBAR - Enhanced Mobile */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#001f54]/95 backdrop-blur-md shadow-xl py-2"
            : "bg-transparent py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center">
          
          {/* LOGO - Larger on mobile */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
            <div className="relative">
              <img
                src={logo}
                alt="Biryani Canteen Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
              />
              <div className="absolute inset-0 rounded-full bg-yellow-400/0 group-hover:bg-yellow-400/30 transition-all duration-500"></div>
            </div>
            <div>
              <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-black text-yellow-300 tracking-wide leading-tight">
                THE BIRYANI
                <span className="block text-pink-300 text-xs sm:text-sm md:text-base">CANTEEN</span>
              </h1>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {["HOME", "ABOUT", "CONTACT"].map((item, idx) => (
              <a
                href="#"
                key={item}
                className="text-white font-bold hover:text-yellow-300 transition-all duration-300 relative group text-sm lg:text-base"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex gap-3 lg:gap-4 items-center">
            {user ? (
              <div className="flex items-center gap-3 lg:gap-4">
                <Link to="/orders">
                  <button className="bg-white/10 px-4 lg:px-5 py-2 rounded-full text-cyan-300 font-bold border border-cyan-400/30 hover:scale-105 transition-all text-sm lg:text-base cursor-pointer">
                    My Orders
                  </button>
                </Link>
                <Link to="/cart">
                  <button className="bg-white/10 px-4 lg:px-5 py-2 rounded-full text-yellow-300 font-bold border border-yellow-400/30 hover:scale-105 transition-all text-sm lg:text-base cursor-pointer">
                    🛒 Cart
                  </button>
                </Link>
                <div className="bg-white/10 px-4 lg:px-5 py-2 rounded-full text-yellow-300 font-bold border border-yellow-400/30 text-sm lg:text-base">
                  👤 {user.name?.split(" ")[0] || user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 lg:px-5 py-2 rounded-full bg-red-500 text-white font-bold hover:scale-105 transition-all text-sm lg:text-base cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-5 lg:px-6 py-2 rounded-full border-2 border-yellow-400 text-yellow-300 font-bold hover:bg-yellow-400 hover:text-black transition-all duration-300 hover:scale-105 cursor-pointer text-sm lg:text-base">
                    SIGN IN
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-5 lg:px-6 py-2 rounded-full bg-yellow-400 text-black font-bold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50 cursor-pointer text-sm lg:text-base">
                    SIGN UP
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON - Larger touch area */}
          <button
            className="md:hidden text-white text-3xl sm:text-4xl transition-transform duration-300 hover:scale-110 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* MOBILE MENU - Improved spacing and touch targets */}
        <div
          className={`md:hidden bg-[#001f54]/98 backdrop-blur-md px-5 py-5 flex flex-col gap-4 transition-all duration-500 ${
            menuOpen ? "opacity-100 translate-y-0 flex" : "opacity-0 -translate-y-full hidden"
          }`}
        >
          <a href="#" className="text-white font-bold hover:text-yellow-300 transition text-lg py-3 border-b border-white/10">
            HOME
          </a>
          <a href="#" className="text-white font-bold hover:text-yellow-300 transition text-lg py-3 border-b border-white/10">
            ABOUT
          </a>
          <a href="#" className="text-white font-bold hover:text-yellow-300 transition text-lg py-3 border-b border-white/10">
            CONTACT
          </a>
          {user ? (
            <>
              <Link to="/orders" onClick={() => setMenuOpen(false)}>
                <button className="w-full py-4 rounded-full bg-white/10 text-cyan-300 font-bold border border-cyan-400/30 transition text-base">
                  📋 My Orders
                </button>
              </Link>
              <Link to="/cart" onClick={() => setMenuOpen(false)}>
                <button className="w-full py-4 rounded-full bg-white/10 text-yellow-300 font-bold border border-yellow-400/30 transition text-base">
                  🛒 Cart
                </button>
              </Link>
              <div className="flex items-center justify-between bg-white/10 px-4 py-3 rounded-full">
                <span className="text-yellow-300 font-bold text-base">👤 {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-red-500 text-white font-bold text-sm"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="w-full py-4 rounded-full border-2 border-yellow-400 text-yellow-300 font-bold hover:bg-yellow-400 hover:text-black transition text-base">
                  SIGN IN
                </button>
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <button className="w-full py-4 rounded-full bg-yellow-400 text-black font-bold hover:scale-105 transition text-base">
                  SIGN UP
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* HERO SECTION - Mobile Optimized */}
      <section className="pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-16 md:pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
          
          {/* LEFT SIDE - Larger text on mobile */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-block bg-yellow-400 text-black px-4 sm:px-5 py-2 rounded-full font-bold mb-4 sm:mb-6 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer text-xs sm:text-sm md:text-base">
              India's Smart Canteen
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span className="text-white">THE</span>
              <br />
              <span className="text-yellow-300 drop-shadow-lg inline-block">
                BIRYANI
              </span>
              <br />
              <span className="text-pink-200 inline-block">
                CANTEEN
              </span>
            </h1>

            <p className="text-white/90 text-base sm:text-lg md:text-xl mt-4 sm:mt-6 md:mt-8 max-w-xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
              Fresh biriyani 🍗, live token system 🎟️,
              instant ordering ⚡ and full canteen vibes ✨
            </p>

            {/* BUTTONS - Larger touch area on mobile */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-6 sm:mt-8 md:mt-10 justify-center lg:justify-start">
              <Link to="/menu">
                <button className="group px-8 sm:px-10 py-4 sm:py-4 rounded-full bg-yellow-400 text-black font-black text-base sm:text-lg shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/50 relative overflow-hidden cursor-pointer w-full sm:w-auto">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    ORDER NOW 
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-yellow-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </Link>
            </div>

            {/* Stats Section - Better mobile layout */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 md:gap-12 mt-8 sm:mt-10 md:mt-12 pt-4 sm:pt-6 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-yellow-300">5+</div>
                <div className="text-white/70 text-xs sm:text-sm">Biryani Varieties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-yellow-300">2k+</div>
                <div className="text-white/70 text-xs sm:text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-yellow-300">20min</div>
                <div className="text-white/70 text-xs sm:text-sm">Avg Delivery</div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Logo with proper mobile sizing */}
          <div className="relative flex justify-center mt-6 sm:mt-8 lg:mt-0">
            {/* Glow Effect Behind Logo */}
            <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px] bg-yellow-400 opacity-20 blur-3xl rounded-full animate-pulse-slow">
            </div>
            
            {/* Animated Rings */}
            <div className="absolute w-[210px] h-[210px] sm:w-[270px] sm:h-[270px] md:w-[340px] md:h-[340px] lg:w-[410px] lg:h-[410px] rounded-full border-2 border-yellow-400/20 animate-spin-slow"></div>
            <div className="absolute w-[220px] h-[220px] sm:w-[285px] sm:h-[285px] md:w-[360px] md:h-[360px] lg:w-[440px] lg:h-[440px] rounded-full border border-yellow-400/10 animate-spin-slow-reverse"></div>

            {/* Main Logo - Responsive sizing */}
            <img
              src={logo}
              alt="Biryani Logo"
              className="
                relative
                w-[200px]
                sm:w-[260px]
                md:w-[340px]
                lg:w-[420px]
                rounded-[30px] sm:rounded-[35px] md:rounded-[40px]
                shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                z-10
                animate-float-slow
                transition-all
                duration-500
                hover:scale-105
                cursor-pointer
              "
            />
          </div>
        </div>
      </section>

      {/* FOOTER - Mobile optimized */}
      <footer className="relative z-10 border-t border-white/20 py-5 sm:py-6 text-center text-white/70 text-xs sm:text-sm px-4">
        <p>© 2026 BiryaniQ • Built with spice & code 🌶️</p>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
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
        
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
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
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-delay-1 {
          animation: fade-in 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delay-4 {
          animation: fade-in 0.8s ease-out 0.8s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delay-5 {
          animation: fade-in 0.8s ease-out 1s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delay-6 {
          animation: fade-in 0.8s ease-out 1.2s forwards;
          opacity: 0;
        }
        
        .animate-blob {
          animation: blob 12s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 25s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animation-delay-2 {
          animation-delay: 2s;
        }
        
        .animation-delay-4 {
          animation-delay: 4s;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .animate-float, .animate-float-delay-1, .animate-float-delay-2, .animate-float-delay-3 {
            animation-duration: 6s;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;