import { useEffect, useState } from "react";
import axios from "axios";
import { apiPath } from "../../config/api";

import {
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
  FaUtensils,
} from "react-icons/fa";

function Dashboard() {

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [menu, setMenu] = useState([]);

  // FETCH ALL DATA
  const fetchData = async () => {

    try {

      const ordersRes =
        await axios.get(
          apiPath("/api/orders")
        );

      const usersRes =
        await axios.get(
          apiPath("/api/auth/users")
        );

      const menuRes =
        await axios.get(
          apiPath("/api/menu")
        );

      setOrders(ordersRes.data);
      setUsers(usersRes.data);
      setMenu(menuRes.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchData();

    const interval =
      setInterval(fetchData, 3000);

    return () =>
      clearInterval(interval);

  }, []);

  // TOTAL REVENUE
  const totalRevenue =
    orders.reduce(
      (sum, order) =>
        sum + order.totalPrice,
      0
    );

  // STATUS COUNTS
  const pending =
    orders.filter(
      (o) => o.status === "Pending"
    ).length;

  const cooking =
    orders.filter(
      (o) => o.status === "Cooking"
    ).length;

  const ready =
    orders.filter(
      (o) => o.status === "Ready"
    ).length;

  const delivered =
    orders.filter(
      (o) => o.status === "Delivered"
    ).length;

  return (

    <div className="text-white p-8">

      <h1 className="text-5xl font-black text-pink-500 mb-10">
        DASHBOARD
      </h1>

      {/* TOP CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-6 rounded-3xl">
          <FaShoppingCart className="text-4xl mb-4" />

          <h2 className="text-3xl font-black">
            {orders.length}
          </h2>

          <p>Total Orders</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-6 rounded-3xl">
          <FaMoneyBillWave className="text-4xl mb-4" />

          <h2 className="text-3xl font-black">
            ₹{totalRevenue}
          </h2>

          <p>Total Revenue</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-700 p-6 rounded-3xl">
          <FaUsers className="text-4xl mb-4" />

          <h2 className="text-3xl font-black">
            {users.length}
          </h2>

          <p>Total Users</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-700 p-6 rounded-3xl">
          <FaUtensils className="text-4xl mb-4" />

          <h2 className="text-3xl font-black">
            {menu.length}
          </h2>

          <p>Menu Items</p>
        </div>

      </div>

      {/* STATUS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">

        <div className="bg-yellow-500/20 border border-yellow-500 p-5 rounded-2xl">
          <h2 className="text-4xl font-black">
            {pending}
          </h2>

          <p>Pending</p>
        </div>

        <div className="bg-orange-500/20 border border-orange-500 p-5 rounded-2xl">
          <h2 className="text-4xl font-black">
            {cooking}
          </h2>

          <p>Cooking</p>
        </div>

        <div className="bg-green-500/20 border border-green-500 p-5 rounded-2xl">
          <h2 className="text-4xl font-black">
            {ready}
          </h2>

          <p>Ready</p>
        </div>

        <div className="bg-blue-500/20 border border-blue-500 p-5 rounded-2xl">
          <h2 className="text-4xl font-black">
            {delivered}
          </h2>

          <p>Delivered</p>
        </div>

      </div>

      {/* RECENT ORDERS */}

      <div className="mt-12">

        <h2 className="text-3xl font-black mb-6">
          Recent Orders
        </h2>

        <div className="space-y-4">

          {orders
            .slice(-5)
            .reverse()
            .map((order) => (

              <div
                key={order._id}
                className="bg-white/10 p-5 rounded-2xl flex justify-between"
              >

                <div>

                  <h2 className="text-2xl font-bold">
                    🎟️ Token #{order.tokenNo}
                  </h2>

                  <p className="text-gray-400">
                    👤 {order.userName}
                  </p>

                </div>

                <div className="text-right">

                  <h2 className="text-yellow-400 text-2xl font-black">
                    ₹{order.totalPrice}
                  </h2>

                  <p>
                    {order.status}
                  </p>

                </div>

              </div>

            ))}

        </div>

      </div>

    </div>

  );

}

export default Dashboard;
