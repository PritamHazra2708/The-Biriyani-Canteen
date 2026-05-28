import { useEffect, useState } from "react";
import axios from "axios";
import { apiPath } from "../config/api";
import { 
  FaClock, 
  FaRupeeSign, 
  FaShoppingBag, 
  FaSpinner,
  FaCheckCircle,
  FaUtensils,
  FaCalendarAlt,
  FaFilter,
  FaSearch,
  FaStar,
  FaRegClock,
  FaHome,
  FaArrowLeft
} from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";
import { FaTruck } from "react-icons/fa";   
import { MdPendingActions, MdFastfood, MdLocalFireDepartment } from "react-icons/md";
import { Link } from "react-router-dom";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchOrders = async () => {
    try {
      const res = await axios.get(apiPath("/api/orders"));
      const userOrders = res.data.filter(
        (order) => order.userId?.toString() === user?.id
      );
      setOrders(userOrders);
      setFilteredOrders(userOrders);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter orders
  useEffect(() => {
    let filtered = orders;
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.tokenNo?.toString().includes(searchTerm) ||
        order.items?.some(item => item.itemName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredOrders(filtered);
  }, [statusFilter, searchTerm, orders]);

  const getStatusConfig = (status) => {
    switch(status) {
      case "Delivered":
        return { color: "bg-gradient-to-r from-green-500 to-emerald-600", icon: FaCheckCircle, text: "Delivered ✓" };
      case "Ready":
        return { color: "bg-gradient-to-r from-blue-500 to-cyan-600", icon: FaTruck, text: "Ready for Pickup" };
      case "Being Prepared":
        return { color: "bg-gradient-to-r from-orange-500 to-red-600", icon: GiCookingPot, text: "Being Prepared" };
      case "Pending":
        return { color: "bg-gradient-to-r from-yellow-500 to-amber-600", icon: MdPendingActions, text: "Pending" };
      default:
        return { color: "bg-gradient-to-r from-gray-500 to-gray-600", icon: FaRegClock, text: status };
    }
  };

  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === "Delivered").length,
    preparing: orders.filter(o => o.status === "Being Prepared").length,
    totalSpent: orders.reduce((sum, o) => sum + o.totalPrice, 0)
  };

  const statusOptions = [
    { value: "all", label: "All Orders", icon: FaShoppingBag },
    { value: "Pending", label: "Pending", icon: MdPendingActions },
    { value: "Being Prepared", label: "Preparing", icon: GiCookingPot },
    { value: "Ready", label: "Ready", icon: FaTruck },
    { value: "Delivered", label: "Delivered", icon: FaCheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-fuchsia-700 to-blue-800 relative overflow-hidden">
      
      {/* Animated Background Elements - Home Page Style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-float opacity-10">🍛</div>
        <div className="absolute top-40 right-20 text-5xl animate-float-delay-1 opacity-10">✨</div>
        <div className="absolute bottom-32 left-20 text-4xl animate-float-delay-2 opacity-10">🎟️</div>
        <div className="absolute bottom-20 right-10 text-5xl animate-float opacity-10">⭐</div>
        <div className="absolute top-1/3 left-1/4 text-3xl animate-float-delay-3 opacity-10">🍗</div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 -left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 -right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4"></div>
      </div>

      {/* Back to Home Button */}
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

      {/* Hero Section - Home Page Style */}
      <div className="relative overflow-hidden">
        <div className="relative z-10 px-6 py-12 text-center">
          <div className="inline-block animate-bounce-subtle">
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-yellow-300 drop-shadow-lg">
            Your Order History
          </h1>
          <div className="flex justify-center gap-2 mt-3">
            <span className="w-12 h-1 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="w-6 h-1 bg-pink-400 rounded-full animate-pulse animation-delay-1"></span>
            <span className="w-3 h-1 bg-blue-400 rounded-full animate-pulse animation-delay-2"></span>
          </div>
          <p className="text-white/90 mt-3 text-lg">Track all your delicious biryani orders</p>
        </div>
      </div>

      {/* Stats Section - Home Page Style */}
      {orders.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-400/20 p-3 rounded-xl">
                  <FaShoppingBag className="text-yellow-400 text-xl" />
                </div>
                <div>
                  <p className="text-white/60 text-xs">Total Orders</p>
                  <p className="text-white text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-slide-up animation-delay-1">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500/20 p-3 rounded-xl">
                  <GiCookingPot className="text-orange-400 text-xl" />
                </div>
                <div>
                  <p className="text-white/60 text-xs">In Progress</p>
                  <p className="text-orange-400 text-2xl font-bold">{stats.preparing}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-slide-up animation-delay-2">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-3 rounded-xl">
                  <FaCheckCircle className="text-green-400 text-xl" />
                </div>
                <div>
                  <p className="text-white/60 text-xs">Delivered</p>
                  <p className="text-green-400 text-2xl font-bold">{stats.delivered}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-slide-up animation-delay-3">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 p-3 rounded-xl">
                  <FaRupeeSign className="text-purple-400 text-xl" />
                </div>
                <div>
                  <p className="text-white/60 text-xs">Total Spent</p>
                  <p className="text-purple-400 text-2xl font-bold">₹{stats.totalSpent}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section - Home Page Style */}
      {orders.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-8 relative z-20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search by token number or item name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-yellow-400/50 transition-all backdrop-blur-sm"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {statusOptions.map((option) => {
                const Icon = option.icon;
                const isActive = statusFilter === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setStatusFilter(option.value)}
                    className={`
                      px-4 py-2 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap
                      flex items-center gap-2
                      ${isActive 
                        ? "bg-yellow-400 text-black shadow-lg shadow-yellow-500/30" 
                        : "bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 border border-white/20"
                      }
                    `}
                  >
                    <Icon className="text-sm" />
                    {option.label}
                    {option.value !== "all" && (
                      <span className={`
                        ml-1 px-1.5 py-0.5 rounded-full text-xs
                        ${isActive ? "bg-black/20" : "bg-white/20"}
                      `}>
                        {option.value === "Pending" ? orders.filter(o => o.status === "Pending").length :
                         option.value === "Being Prepared" ? orders.filter(o => o.status === "Being Prepared").length :
                         option.value === "Ready" ? orders.filter(o => o.status === "Ready").length :
                         option.value === "Delivered" ? orders.filter(o => o.status === "Delivered").length : 0}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Orders List - Home Page Style */}
      <div className="max-w-6xl mx-auto px-6 py-10 relative z-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-yellow-300 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-pink-300/30 border-b-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-300 text-2xl animate-pulse">
                🍛
              </div>
            </div>
            <p className="text-white/80 mt-6 text-lg animate-pulse">Loading your orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            {orders.length === 0 ? (
              <>
                <div className="text-7xl mb-6 animate-float">🍽️</div>
                <h2 className="text-3xl md:text-4xl font-black text-white/80 mb-4">
                  No Orders Yet
                </h2>
                <p className="text-white/60 mb-8">Looks like you haven't ordered anything yet!</p>
                <Link to="/menu">
                  <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-2 mx-auto">
                    <MdFastfood />
                    Order Now
                  </button>
                </Link>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-white/80 text-xl">No matching orders found</p>
                <p className="text-white/50 mt-2">Try changing your search or filter</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {[...filteredOrders].reverse().map((order, index) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;
              const isExpanded = selectedOrder === order._id;
              
              return (
                <div
                  key={order._id}
                  className="group bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 hover:border-yellow-400/40 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-yellow-500/20 animate-slide-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => setSelectedOrder(isExpanded ? null : order._id)}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl px-4 py-2">
                            <h2 className="text-2xl font-black text-black">
                              🎟️ Token #{order.tokenNo}
                            </h2>
                          </div>
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.color} text-white font-semibold shadow-lg`}>
                            <StatusIcon className="text-sm" />
                            <span>{statusConfig.text}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-3 text-white/60 text-sm">
                          <div className="flex items-center gap-1">
                            <FaCalendarAlt />
                            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaClock />
                            <span>{new Date(order.createdAt).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                        <FaRupeeSign className="text-yellow-400" />
                        <span className="text-white font-bold text-xl">₹{order.totalPrice}</span>
                      </div>
                    </div>

                    {/* Items Summary */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <span
                          key={idx}
                          className="bg-white/15 px-3 py-1.5 rounded-lg text-white/90 text-sm"
                        >
                          {item.itemName} × {item.quantity}
                        </span>
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-white/50 text-sm flex items-center">
                          +{order.items.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Expand Indicator */}
                    <div className="mt-4 text-center text-white/40 text-sm flex items-center justify-center gap-1">
                      {isExpanded ? "▲ Tap to collapse" : "▼ Tap to expand details"}
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-6 pt-4 border-t border-white/20 animate-fade-in">
                        <h3 className="text-white/80 font-semibold mb-3 flex items-center gap-2">
                          <FaUtensils />
                          Order Details
                        </h3>
                        
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center py-2 border-b border-white/10"
                            >
                              <div className="flex items-center gap-3">
                                <MdLocalFireDepartment className="text-orange-400" />
                                <span className="text-white font-medium">{item.itemName}</span>
                                <span className="text-white/50">× {item.quantity}</span>
                              </div>
                              <span className="text-yellow-300 font-semibold">
                                ₹{item.price * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 pt-3 flex justify-between items-center">
                          <span className="text-white/50 text-sm">Order ID: {order._id.slice(-8)}</span>
                          <div className="flex items-center gap-2">
                            {order.status === "Delivered" && (
                              <div className="flex items-center gap-1 text-green-400 text-sm">
                                <FaStar />
                                <span>Rate this order</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Decorative Footer */}
      <div className="text-center mt-8 pt-6 pb-6 border-t border-white/10 relative z-20">
        <p className="text-white/60 text-sm animate-fade-in">
          🍛 Thank you for ordering from BiryaniQ Canteen!
        </p>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
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
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-in {
          animation: slide-in 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-right {
          animation: slide-right 0.5s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
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
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animation-delay-1 { animation-delay: 0.1s; }
        .animation-delay-2 { animation-delay: 0.2s; }
        .animation-delay-3 { animation-delay: 0.3s; }
        .animation-delay-4 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}

export default OrderHistory;
