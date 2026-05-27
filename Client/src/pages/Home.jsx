import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";

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

  const storedUser =
    localStorage.getItem("user");

  if (storedUser) {

    setUser(JSON.parse(storedUser));

  }

}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-fuchsia-600 to-blue-700 overflow-hidden relative">
      
      <title>THE BIRYANI CANTEEN </title>
      
      {/* Animated Background Elements - Inspired by the photo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Biryani Particles */}
        <div className="absolute top-20 left-10 text-6xl animate-float opacity-20">🍛</div>
        <div className="absolute top-40 right-20 text-4xl animate-float-delay-1 opacity-20">🍗</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-float-delay-2 opacity-20">🌿</div>
        <div className="absolute middle-50 right-15 text-7xl animate-float-delay-3 opacity-10">🍚</div>
        <div className="absolute top-1/3 left-1/4 text-3xl animate-float opacity-15">✨</div>
        <div className="absolute bottom-1/4 right-1/3 text-4xl animate-float-delay-1 opacity-15">⭐</div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 -left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4"></div>
        
        {/* Decorative Dots Pattern */}
        <div className="absolute top-1/4 right-10 w-40 h-40 opacity-10">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#001f54]/90 backdrop-blur-md shadow-xl py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* LOGO with animation */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <img
                src={logo}
                alt=""
                className="w-14 h-14 rounded-full shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
              />
              <div className="absolute inset-0 rounded-full bg-yellow-400/0 group-hover:bg-yellow-400/30 transition-all duration-500"></div>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-yellow-300 tracking-wide">THE 
              BIRYANI<div className="text-pink-300">CANTEEN</div>
            </h1>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {["HOME", "ABOUT", "CONTACT"].map((item, idx) => (
              <a
                href="#"
                key={item}
                className="text-white font-bold hover:text-yellow-300 transition-all duration-300 relative group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

        {/* DESKTOP BUTTONS */}

<div className="hidden md:flex gap-4 items-center">

  {user ? (

    <div className="flex items-center gap-4">

      <Link to="/orders">

        <button className="bg-white/10 px-5 py-2 rounded-full text-cyan-300 font-bold border border-cyan-400/30 hover:scale-105 transition-all">

          Orders

        </button>

      </Link>

      <div className="bg-white/10 px-5 py-2 rounded-full text-yellow-300 font-bold border border-yellow-400/30">

        👤 {user.name}

      </div>

      <button
        onClick={() => {

          localStorage.removeItem("user");

          localStorage.removeItem("token");

          window.location.reload();

        }}
        className="px-5 py-2 rounded-full bg-red-500 text-white font-bold hover:scale-105 transition-all"
      >

        Logout

      </button>

    </div>

  ) : (

    <>

      <Link to="/login">

        <button className="px-5 py-2 rounded-full border-2 border-yellow-400 text-yellow-300 font-bold hover:bg-yellow-400 hover:text-black transition-all duration-300 hover:scale-105 cursor-pointer">

          SIGN IN

        </button>

      </Link>

      <Link to="/register">

        <button className="px-5 py-2 rounded-full bg-yellow-400 text-black font-bold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50 cursor-pointer">

          SIGN UP

        </button>

      </Link>

    </>

  )}

</div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white text-4xl transition-transform duration-300 hover:scale-110"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden bg-[#001f54]/95 backdrop-blur-md px-6 py-6 flex flex-col gap-5 transition-all duration-500 ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full hidden"
          }`}
        >
          <a href="#" className="text-white font-bold hover:text-yellow-300 transition">
            HOME
          </a>
          <a href="#" className="text-white font-bold hover:text-yellow-300 transition">
            ABOUT
          </a>
          <a href="#" className="text-white font-bold hover:text-yellow-300 transition">
            CONTACT
          </a>
          <Link to="/login">
            <button className="w-full py-3 rounded-full border-2 border-yellow-400 text-yellow-300 font-bold hover:bg-yellow-400 hover:text-black transition">
              SIGN IN
            </button>
          </Link>
          <Link to="/register">
            <button className="w-full py-3 rounded-full bg-yellow-400 text-black font-bold hover:scale-105 transition">
              SIGN UP
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-36 md:pt-40 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE - Animated Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-block bg-yellow-400 text-black px-5 py-2 rounded-full font-bold mb-6 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
              India’s Smart Canteen Experience
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
              <span className="text-white animate-fade-in">THE</span>
              <br />
              <span className="text-yellow-300 drop-shadow-lg animate-fade-in-delay-1 inline-block">
                BIRYANI
              </span>
              <br />
              <span className="text-pink-200 animate-fade-in-delay-2 inline-block">
                CANTEEN
              </span>
            </h1>

            <p className="text-white/90 text-lg mt-8 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-delay-3">
              Fresh biriyani 🍗, live token system 🎟️,
              instant ordering ⚡ and full canteen vibes ✨
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-5 mt-10 justify-center lg:justify-start">
              <Link to="/menu">
                <button className="group px-8 py-4 rounded-full bg-yellow-400 text-black font-black text-lg shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/50 relative overflow-hidden cursor-pointer">
                  <span className="relative z-10 flex items-center gap-2">
                    ORDER NOW 
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-yellow-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </Link>
              
            </div>

            {/* Stats Section - Like in the photo */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12 pt-4 border-t border-white/20">
              <div className="text-center animate-fade-in-delay-4">
                <div className="text-3xl font-black text-yellow-300">5+</div>
                <div className="text-white/80 text-sm">Biryani Varieties</div>
              </div>
              <div className="text-center animate-fade-in-delay-5">
                <div className="text-3xl font-black text-yellow-300">2k+</div>
                <div className="text-white/80 text-sm">Happy Customers</div>
              </div>
              <div className="text-center animate-fade-in-delay-6">
                <div className="text-3xl font-black text-yellow-300">20min</div>
                <div className="text-white/80 text-sm">Avg Delivery</div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Logo with animations - NO YELLOW BORDER */}
          <div className="relative flex justify-center">
            {/* Glow Effect Behind Logo */}
            <div className="absolute w-[320px] h-[320px] md:w-[450px] md:h-[450px] bg-yellow-400 opacity-20 blur-3xl rounded-full animate-pulse-slow">
            </div>
            
            {/* Animated Rings Around Logo */}
            <div className="absolute w-[300px] h-[300px] md:w-[430px] md:h-[430px] rounded-full border-2 border-yellow-400/20 animate-spin-slow"></div>
            <div className="absolute w-[320px] h-[320px] md:w-[460px] md:h-[460px] rounded-full border border-yellow-400/10 animate-spin-slow-reverse"></div>

            {/* Main Logo - NO BORDER */}
            <img
              src={logo}
              alt="Biryani Logo"
              className="
                relative
                w-[280px]
                sm:w-[350px]
                md:w-[420px]
                lg:w-[480px]
                rounded-[40px]
                shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                z-10
                animate-float-slow
                transition-all
                duration-500
                hover:scale-105
                cursor-pointer
              "
            />

            {/* Decorative Elements Around Logo - Like in the photo */}
            <div className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-sm rounded-2xl p-3 shadow-lg animate-float">
              <div className="flex items-center gap-2">
                {/* <span className="text-2xl">🔥</span> */}
                {/* <span className="text-white font-bold text-sm">Spicy</span> */}
              </div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-sm rounded-2xl p-3 shadow-lg animate-float-delay-2">
              <div className="flex items-center gap-2">
                {/* <span className="text-2xl">✨</span> */}
                {/* <span className="text-white font-bold text-sm">Fresh</span> */}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/20 py-6 text-center text-white/80 text-sm">
        <p className="animate-fade-in">© 2026 Biriyani • Built with spice & code </p>
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
      `}</style>
    </div>
  );
}

export default Home;