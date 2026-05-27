import { useCart } from "../context/CartContext";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaRupeeSign, FaSpinner, FaHome, FaArrowLeft } from "react-icons/fa";
import { MdFastfood, MdDeliveryDining } from "react-icons/md";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
    clearCart,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderToken, setOrderToken] = useState(null);

  // PLACE ORDER
  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      const orderData = {
        userId: user?.id,
        userName: user?.name,
        items: cartItems.map((item) => ({
          itemName: item.itemName,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice,
      };

      const res = await axios.post(
        "http://localhost:5000/api/orders",
        orderData
      );

      setOrderToken(res.data.tokenNo);
      setShowOrderModal(true);
      
      setTimeout(() => {
        clearCart();
        setShowOrderModal(false);
      }, 3000);

    } catch (error) {
      console.log(error);
      alert("Order Failed ");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (id) => {
    setRemovingId(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-fuchsia-600 to-blue-700 p-5 relative overflow-hidden">
      <title>Your Cart | BiryaniQ</title>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-float opacity-10">🍛</div>
        <div className="absolute top-40 right-20 text-5xl animate-float-delay-1 opacity-10">✨</div>
        <div className="absolute bottom-32 left-20 text-4xl animate-float-delay-2 opacity-10">🛒</div>
        <div className="absolute bottom-20 right-10 text-5xl animate-float opacity-10">⭐</div>
        <div className="absolute top-1/3 left-1/4 text-3xl animate-float-delay-3 opacity-10">🍗</div>
        
        {/* Decorative Blobs */}
        <div className="absolute top-0 -left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 -right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4"></div>
      </div>

      {/* Floating Back to Home Button - Only show when cart has items */}
      {cartItems.length > 0 && (
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
      )}

      {/* Success Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-center shadow-2xl transform animate-scale-up max-w-md">
            <div className="text-6xl mb-4 animate-bounce-subtle">🎉</div>
            <h2 className="text-3xl font-black text-white mb-2">Order Placed!</h2>
            <p className="text-white/90 mb-4">Your biryani is being prepared</p>
            <div className="bg-white/20 rounded-2xl p-4 mb-4">
              <p className="text-white/80 text-sm">Token Number</p>
              <p className="text-5xl font-black text-yellow-300">#{orderToken}</p>
            </div>
            <p className="text-white/80 text-sm">Redirecting to menu...</p>
          </div>
        </div>
      )}

      {/* HEADING */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-block animate-slide-down">
          <h1 className="text-5xl md:text-6xl font-black text-yellow-300 drop-shadow-lg tracking-wide">
            YOUR CART 🛒
          </h1>
          <div className="flex justify-center gap-2 mt-3">
            <span className="w-12 h-1 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="w-6 h-1 bg-pink-400 rounded-full animate-pulse animation-delay-1"></span>
            <span className="w-3 h-1 bg-blue-400 rounded-full animate-pulse animation-delay-2"></span>
          </div>
          <p className="text-white/80 mt-3 text-lg">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      {/* EMPTY CART */}
      {cartItems.length === 0 ? (
        <div className="text-center mt-20 animate-fade-in-up relative z-10">
          <div className="inline-block">
            <div className="text-8xl mb-6 animate-float">🛒</div>
            <h2 className="text-4xl md:text-5xl text-white font-bold mb-4">
              Cart is Empty 
            </h2>
            <p className="text-white/70 text-lg mb-8">Looks like you haven't added anything yet!</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Browse Menu Button */}
              <Link to="/menu">
                <button className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl flex items-center gap-2 mx-auto">
                  <MdFastfood className="text-2xl" />
                  Browse Menu
                </button>
              </Link>
              
              {/* Back to Home Button */}
              <Link to="/">
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 hover:bg-white/20 hover:shadow-xl flex items-center gap-2 mx-auto">
                  <FaHome className="text-xl" />
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto relative z-10">
          {/* CART ITEMS */}
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className={`
                  bg-white/10
                  backdrop-blur-md
                  rounded-3xl
                  p-5
                  flex
                  items-center
                  gap-5
                  border
                  border-white/20
                  transform
                  transition-all
                  duration-500
                  hover:scale-[1.02]
                  hover:bg-white/15
                  hover:shadow-xl
                  hover:shadow-yellow-500/10
                  animate-slide-in
                  ${removingId === (item._id || item.id) ? 'animate-slide-out' : ''}
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* IMAGE */}
                <div className="relative group">
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="
                      w-24
                      h-24
                      md:w-28
                      md:h-28
                      rounded-2xl
                      object-cover
                      transition-all
                      duration-500
                      group-hover:scale-110
                      group-hover:rotate-3
                      shadow-lg
                    "
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-black text-white group-hover:text-yellow-300 transition-colors duration-300">
                    {item.itemName}
                  </h2>
                  <p className="text-yellow-300 font-bold text-lg md:text-xl mt-1 flex items-center gap-1">
                    <FaRupeeSign className="text-sm" />
                    {item.price}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 mt-4">
                    {/* MINUS */}
                    <button
                      onClick={() => decreaseQty(item._id || item.id)}
                      className="
                        w-9
                        h-9
                        md:w-10
                        md:h-10
                        rounded-full
                        bg-pink-500
                        text-white
                        font-bold
                        text-xl
                        cursor-pointer
                        hover:scale-110
                        hover:bg-pink-600
                        transition-all
                        duration-300
                        flex
                        items-center
                        justify-center
                        shadow-lg
                      "
                    >
                      <FaMinus className="text-sm" />
                    </button>

                    {/* QTY */}
                    <span className="text-white font-bold text-xl md:text-2xl min-w-[40px] text-center animate-pulse-on-change">
                      {item.quantity}
                    </span>

                    {/* PLUS */}
                    <button
                      onClick={() => increaseQty(item._id || item.id)}
                      className="
                        w-9
                        h-9
                        md:w-10
                        md:h-10
                        rounded-full
                        bg-green-500
                        text-white
                        font-bold
                        text-xl
                        cursor-pointer
                        hover:scale-110
                        hover:bg-green-600
                        transition-all
                        duration-300
                        flex
                        items-center
                        justify-center
                        shadow-lg
                      "
                    >
                      <FaPlus className="text-sm" />
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => handleRemoveItem(item._id || item.id)}
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-4
                    py-3
                    md:px-5
                    rounded-xl
                    font-bold
                    cursor-pointer
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:shadow-lg
                    hover:shadow-red-500/30
                    flex
                    items-center
                    gap-2
                    group
                  "
                >
                  <FaTrash className="group-hover:rotate-12 transition-transform duration-300" />
                  <span className="hidden md:inline">Remove</span>
                </button>
              </div>
            ))}
          </div>

          {/* TOTAL SECTION */}
          <div
            className="
              mt-10
              bg-black/30
              backdrop-blur-sm
              rounded-3xl
              p-6
              md:p-8
              flex
              flex-col
              md:flex-row
              justify-between
              items-center
              gap-4
              border
              border-white/10
              animate-slide-up
              animation-delay-2
            "
          >
            <div className="flex items-center gap-3">
              <MdDeliveryDining className="text-yellow-400 text-3xl animate-bounce-subtle" />
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Total Amount
              </h2>
            </div>
            <div className="flex items-baseline gap-1">
              <FaRupeeSign className="text-yellow-300 text-3xl" />
              <h2 className="text-4xl md:text-5xl font-black text-yellow-300 animate-pulse-slow">
                {totalPrice}
              </h2>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            {/* CLEAR CART BUTTON */}
            <button
              onClick={clearCart}
              className="
                flex-1
                py-4
                rounded-2xl
                bg-red-500/80
                hover:bg-red-600
                text-white
                text-lg
                font-bold
                transition-all
                duration-300
                hover:scale-105
                shadow-lg
                cursor-pointer
                flex
                items-center
                justify-center
                gap-2
                group
              "
            >
              <FaTrash className="group-hover:rotate-12 transition-transform duration-300" />
              Clear Cart
            </button>

            {/* CONTINUE SHOPPING BUTTON */}
            <Link to="/menu" className="flex-1">
              <button
                className="
                  w-full
                  py-4
                  rounded-2xl
                  bg-blue-500/80
                  hover:bg-blue-600
                  text-white
                  text-lg
                  font-bold
                  transition-all
                  duration-300
                  hover:scale-105
                  shadow-lg
                  cursor-pointer
                  flex
                  items-center
                  justify-center
                  gap-2
                  group
                "
              >
                <MdFastfood className="group-hover:rotate-12 transition-transform duration-300" />
                Continue Shopping
              </button>
            </Link>

            {/* PLACE ORDER BUTTON */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="
                flex-[2]
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-yellow-400
                to-orange-500
                hover:from-yellow-500
                hover:to-orange-600
                text-black
                text-xl
                font-black
                transition-all
                duration-300
                hover:scale-105
                shadow-xl
                disabled:opacity-50
                disabled:cursor-not-allowed
                cursor-pointer
                flex
                items-center
                justify-center
                gap-3
                group
                relative
                overflow-hidden
              "
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <FaShoppingBag />
                    PLACE ORDER 🍛
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          {/* BACK TO HOME BUTTON - Bottom */}
          <div className="mt-6 flex justify-center">
            <Link to="/">
              <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer">
                <FaHome />
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      )}

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
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-out {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(30px);
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
          from { opacity: 0; }
          to { opacity: 1; }
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
        
        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        
        @keyframes pulse-on-change {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        .animate-slide-down {
          animation: slide-down 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-out {
          animation: slide-out 0.3s ease-out forwards;
        }
        
        .animate-slide-right {
          animation: slide-right 0.5s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-scale-up {
          animation: scale-up 0.3s ease-out forwards;
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
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-blob {
          animation: blob 12s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-pulse-on-change {
          animation: pulse-on-change 0.2s ease-out;
        }
        
        .animation-delay-1 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-2 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-3 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}

export default Cart;