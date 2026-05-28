import { useEffect, useState } from "react";
import axios from "axios";
import { apiPath } from "../../config/api";
import {
  FaSearch,
  FaClock,
  FaRupeeSign,
  FaUser,
  FaCheckCircle,
  FaSpinner,
  FaEye,
  FaDownload,
  FaTruck,
  FaBell,
  FaFileExcel,
  FaFilePdf,
  FaCalendarDay
} from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";
import { MdPendingActions } from "react-icons/md";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const res = await axios.get(apiPath("/api/orders"));
      const sortedOrders = res.data.sort((a, b) => b.tokenNo - a.tokenNo);
      setOrders(sortedOrders);
      setFilteredOrders(sortedOrders);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => fetchOrders(), 5000);
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
        order.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items?.some(item => item.itemName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredOrders(filtered);
  }, [statusFilter, searchTerm, orders]);

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await axios.put(apiPath(`/api/orders/${id}`), { status });
      await fetchOrders();
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => setUpdatingId(null), 500);
    }
  };

  // EXPORT TODAY'S ORDERS
  const exportTodayOrders = async () => {
    setExporting(true);
    try {
      const today = new Date();
      const todayStart = new Date(today.setHours(0, 0, 0, 0));
      const todayEnd = new Date(today.setHours(23, 59, 59, 999));
      
      const todayOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= todayStart && orderDate <= todayEnd;
      });

      if (todayOrders.length === 0) {
        alert("No orders found for today to export!");
        setExporting(false);
        return;
      }

      const exportData = todayOrders.map(order => ({
        "Token No": order.tokenNo,
        "Customer Name": order.userName || "Walk-in Customer",
        "Status": order.status,
        "Total Price": `₹${order.totalPrice}`,
        "Items": order.items.map(item => `${item.itemName} x${item.quantity}`).join(", "),
        "Order Time": new Date(order.createdAt).toLocaleString(),
      }));

      const totalRevenue = todayOrders.reduce((sum, o) => sum + o.totalPrice, 0);
      const deliveredCount = todayOrders.filter(o => o.status === "Delivered").length;

      const headers = Object.keys(exportData[0]);
      const csvRows = [
        headers.join(","),
        ...exportData.map(row => 
          headers.map(header => {
            const value = row[header];
            return `"${String(value).replace(/"/g, '""')}"`;
          }).join(",")
        ),
        "",
        `"Summary Report for ${new Date().toLocaleDateString()}",,,,,"Total Orders: ${todayOrders.length}",`,
        `"Total Revenue: ₹${totalRevenue}",,,,,"Delivered: ${deliveredCount}",`,
      ];

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute("download", `orders_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert(`✅ Export Successful!\n\n📊 Today's Summary:\n• Total Orders: ${todayOrders.length}\n• Total Revenue: ₹${totalRevenue}`);
    } catch (error) {
      alert("Error exporting orders.");
    } finally {
      setExporting(false);
      setShowExportMenu(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "Pending": return { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: MdPendingActions };
      case "Being Prepared": return { color: "bg-orange-500/20 text-orange-400 border-orange-500/30", icon: GiCookingPot };
      case "Ready": return { color: "bg-green-500/20 text-green-400 border-green-500/30", icon: FaCheckCircle };
      case "Delivered": return { color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: FaTruck };
      default: return { color: "bg-gray-500/20 text-gray-400 border-gray-500/30", icon: MdPendingActions };
    }
  };

  const todayOrders = orders.filter(order => {
    const today = new Date();
    const todayStart = new Date(today.setHours(0, 0, 0, 0));
    const todayEnd = new Date(today.setHours(23, 59, 59, 999));
    const orderDate = new Date(order.createdAt);
    return orderDate >= todayStart && orderDate <= todayEnd;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "Pending").length,
    preparing: orders.filter(o => o.status === "Being Prepared").length,
    ready: orders.filter(o => o.status === "Ready").length,
    delivered: orders.filter(o => o.status === "Delivered").length,
    totalRevenue: orders.reduce((sum, o) => sum + o.totalPrice, 0),
    todayOrders: todayOrders.length,
    todayRevenue: todayOrders.reduce((sum, o) => sum + o.totalPrice, 0)
  };

  const statusOptions = [
    { value: "all", label: "All Orders", icon: FaEye },
    { value: "Pending", label: "Pending", icon: MdPendingActions },
    { value: "Being Prepared", label: "Preparing", icon: GiCookingPot },
    { value: "Ready", label: "Ready", icon: FaCheckCircle },
    { value: "Delivered", label: "Delivered", icon: FaTruck },
  ];

  return (
    <div className="w-full">
      {/* Header Section - Now scrolls with content */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Orders Management
            </h1>
            <p className="text-white/50 mt-1">Track and manage all customer orders</p>
          </div>
          
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl">
              <FaCalendarDay className="text-yellow-400" />
              <span className="text-white/80 text-sm">Today: {stats.todayOrders} orders</span>
              <span className="text-yellow-400 font-bold">₹{stats.todayRevenue}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards - Scrolls with content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl p-4 border border-blue-500/20">
            <p className="text-white/60 text-sm">Total Orders</p>
            <p className="text-white text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-2xl p-4 border border-yellow-500/20">
            <p className="text-white/60 text-sm">Pending</p>
            <p className="text-yellow-400 text-2xl font-bold">{stats.pending}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-2xl p-4 border border-orange-500/20">
            <p className="text-white/60 text-sm">Preparing</p>
            <p className="text-orange-400 text-2xl font-bold">{stats.preparing}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-2xl p-4 border border-green-500/20">
            <p className="text-white/60 text-sm">Ready</p>
            <p className="text-green-400 text-2xl font-bold">{stats.ready}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl p-4 border border-blue-500/20">
            <p className="text-white/60 text-sm">Delivered</p>
            <p className="text-blue-400 text-2xl font-bold">{stats.delivered}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl p-4 border border-purple-500/20">
            <p className="text-white/60 text-sm">Revenue</p>
            <p className="text-purple-400 text-2xl font-bold">₹{stats.totalRevenue}</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-2xl p-4 border border-emerald-500/20">
            <p className="text-white/60 text-sm">Today's Revenue</p>
            <p className="text-emerald-400 text-2xl font-bold">₹{stats.todayRevenue}</p>
          </div>
        </div>

        {/* Search and Filters - Scrolls with content */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search by token #, customer name, or item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 transition-all"
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
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                    }
                  `}
                >
                  <Icon className="text-sm" />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Orders List - Scrollable */}
      <div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="text-4xl text-yellow-400 animate-spin" />
            <p className="text-white/60 mt-4">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-white/60 text-xl">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => {
              const statusStyle = getStatusBadge(order.status);
              const StatusIcon = statusStyle.icon;
              const isUpdating = updatingId === order._id;
              
              return (
                <div
                  key={order._id}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500 hover:shadow-xl hover:shadow-yellow-500/10"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl px-4 py-2">
                            <h2 className="text-2xl font-black text-black">
                              🎟️ Token #{order.tokenNo}
                            </h2>
                          </div>
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusStyle.color}`}>
                            <StatusIcon className="text-sm" />
                            <span className="text-sm font-semibold">{order.status}</span>
                          </div>
                          <div className="flex items-center gap-1 text-white/40 text-sm">
                            <FaClock />
                            <span>{new Date(order.createdAt).toLocaleTimeString()}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-white/60">
                          <FaUser className="text-sm" />
                          <span>{order.userName || "Walk-in Customer"}</span>
                          <span className="text-white/30">•</span>
                          <FaRupeeSign className="text-sm" />
                          <span className="text-yellow-300 font-bold">₹{order.totalPrice}</span>
                        </div>

                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            {order.items.map((item, idx) => (
                              <span key={idx} className="bg-white/10 px-3 py-1.5 rounded-lg text-white/80 text-sm">
                                {item.itemName} × {item.quantity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {order.status !== "Delivered" && (
                          <>
                            {order.status !== "Being Prepared" && (
                              <button
                                onClick={() => updateStatus(order._id, "Being Prepared")}
                                disabled={isUpdating}
                                className="px-5 py-2.5 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400 font-semibold hover:bg-orange-500 hover:text-black transition-all duration-300 flex items-center gap-2"
                              >
                                {isUpdating && updatingId === order._id ? <FaSpinner className="animate-spin" /> : <GiCookingPot />}
                                Prepare
                              </button>
                            )}
                            
                            {order.status !== "Ready" && order.status !== "Delivered" && (
                              <button
                                onClick={() => updateStatus(order._id, "Ready")}
                                disabled={isUpdating}
                                className="px-5 py-2.5 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 font-semibold hover:bg-green-500 hover:text-black transition-all duration-300 flex items-center gap-2"
                              >
                                {isUpdating && updatingId === order._id ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
                                Ready
                              </button>
                            )}
                          </>
                        )}
                        
                        {order.status !== "Delivered" && (
                          <button
                            onClick={() => updateStatus(order._id, "Delivered")}
                            disabled={isUpdating}
                            className="px-5 py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 font-semibold hover:bg-blue-500 hover:text-black transition-all duration-300 flex items-center gap-2"
                          >
                            {isUpdating && updatingId === order._id ? <FaSpinner className="animate-spin" /> : <FaTruck />}
                            Deliver
                          </button>
                        )}

                        <button
                          onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                          className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                        >
                          <FaEye />
                          {selectedOrder === order._id ? "Hide" : "Details"}
                        </button>
                      </div>
                    </div>

                    {selectedOrder === order._id && (
                      <div className="mt-6 pt-4 border-t border-white/10">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-white/60 text-sm mb-2">Order Details</h3>
                            <div className="space-y-1">
                              <p className="text-white/80 text-sm">Order ID: {order._id}</p>
                              <p className="text-white/80 text-sm">Order Time: {new Date(order.createdAt).toLocaleString()}</p>
                              <p className="text-white/80 text-sm">Last Updated: {new Date(order.updatedAt).toLocaleString()}</p>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-white/60 text-sm mb-2">Payment Summary</h3>
                            <div className="space-y-1">
                              {order.items.map((item, idx) => (
                                <p key={idx} className="text-white/80 text-sm flex justify-between">
                                  <span>{item.itemName} × {item.quantity}</span>
                                  <span>₹{item.price * item.quantity}</span>
                                </p>
                              ))}
                              <p className="text-yellow-300 text-sm font-bold flex justify-between pt-2 border-t border-white/10">
                                <span>Total</span>
                                <span>₹{order.totalPrice}</span>
                              </p>
                            </div>
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

        {/* Export Button */}
        {filteredOrders.length > 0 && (
          <div className="mt-8 flex justify-end relative">
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                disabled={exporting}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl font-bold text-black hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {exporting ? <FaSpinner className="animate-spin" /> : <FaDownload />}
                Export Orders
              </button>
              
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-xl shadow-xl border border-white/10 overflow-hidden z-50">
                  <div className="p-2">
                    <button
                      onClick={exportTodayOrders}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-all duration-300"
                    >
                      <FaFileExcel className="text-green-400 text-lg" />
                      <div className="text-left">
                        <p className="text-white font-semibold">Export as CSV</p>
                        <p className="text-white/40 text-xs">Download today's orders</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
