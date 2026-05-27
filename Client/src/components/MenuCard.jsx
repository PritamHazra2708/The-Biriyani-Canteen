import { FaLeaf } from "react-icons/fa";
import { GiChickenOven } from "react-icons/gi";
import { BsCartPlusFill } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function MenuCard({ item }) {

  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const {
    addToCart,
    increaseQty,
    decreaseQty,
    cartItems,
  } = useCart();

  // FIND ITEM IN CART
  const cartItem = cartItems.find(
    (cart) =>
      (cart._id || cart.id) ===
      (item._id || item.id)
  );

  // ADD TO CART
  const handleCartClick = () => {

    addToCart(item);

    console.log("Added to cart:", item.itemName);

  };

  return (

    <div
      className="
        group
        relative
        bg-white/10
        backdrop-blur-md
        rounded-[32px]
        overflow-hidden
        border border-white/20
        hover:scale-[1.03]
        transition-all
        duration-500
        shadow-xl
        hover:shadow-yellow-500/20
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* IMAGE */}

      <div className="relative overflow-hidden h-56">

        <img
          src={item.image}
          alt={item.itemName}
          className="
            w-full
            h-full
            object-cover
            group-hover:scale-110
            transition-all
            duration-700
          "
        />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* VEG / NON VEG ICON */}

        <div className="absolute top-4 right-4 z-20">

          {item.type === "Veg" ? (

            <div className="bg-green-500 p-2 rounded-full shadow-lg border-2 border-white">

              <FaLeaf className="text-white text-sm" />

            </div>

          ) : (

            <div className="bg-red-500 p-2 rounded-full shadow-lg border-2 border-white">

              <GiChickenOven className="text-white text-sm" />

            </div>

          )}

        </div>

        {/* CATEGORY */}

        <div
          className="
            absolute
            bottom-4
            left-4
            bg-black/60
            backdrop-blur-sm
            px-4
            py-1
            rounded-full
            text-white
            text-xs
            font-bold
          "
        >
          {item.category}
        </div>

      </div>

      {/* CONTENT */}

      <div className="p-5">

        {/* TITLE + PRICE */}

        <div className="flex justify-between items-start gap-3">

          <h2
            className="
              text-white
              text-2xl
              font-black
              leading-tight
            "
          >
            {item.itemName}
          </h2>

          <span
            className="
              text-yellow-300
              font-black
              text-2xl
            "
          >
            ₹{item.price}
          </span>

        </div>

        {/* TYPE */}

        <p className="text-white/60 text-sm mt-1">
          {item.type} • Freshly Cooked 🍛
        </p>

        {/* BUTTON SECTION */}

        <div className="flex gap-3 mt-6">

          {/* IF ITEM EXISTS IN CART */}

          {cartItem ? (

            <div
              className="
                flex-1
                flex
                items-center
                justify-between
                bg-gradient-to-r
                from-pink-500
                to-fuchsia-600
                rounded-2xl
                px-3
                py-3
                shadow-lg
              "
            >

              {/* MINUS */}

              <button
                onClick={() =>
                  decreaseQty(item._id || item.id)
                }
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-white/20
                  text-white
                  text-2xl
                  font-black
                  hover:scale-110
                  transition-all
                  duration-300
                  cursor-pointer
                "
              >
                -
              </button>

              {/* QTY */}

              <span className="text-white text-xl font-black">

                {cartItem.quantity}

              </span>

              {/* PLUS */}

              <button
                onClick={() =>
                  increaseQty(item._id || item.id)
                }
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-white/20
                  text-white
                  text-2xl
                  font-black
                  hover:scale-110
                  transition-all
                  duration-300
                  cursor-pointer
                "
              >
                +
              </button>

            </div>

          ) : (

            /* ADD TO CART BUTTON */

            <button
              onClick={handleCartClick}
              className="
                flex-1
                py-3
                rounded-2xl
                bg-gradient-to-r
                from-pink-500
                to-fuchsia-600
                text-white
                font-bold
                flex
                items-center
                justify-center
                gap-2
                hover:scale-105
                hover:shadow-lg
                hover:shadow-pink-500/40
                transition-all
                duration-300
                cursor-pointer
              "
            >

              <BsCartPlusFill
                className={`
                  transition-transform
                  duration-300
                  ${isHovered ? "animate-bounce" : ""}
                `}
              />

              Add To Cart

            </button>

          )}

          {/* BUY NOW BUTTON */}

          <button
            onClick={() => {

              addToCart(item);

              navigate("/cart");

            }}
            className="
              flex-1
              py-3
              rounded-2xl
              bg-yellow-400
              text-black
              font-black
              hover:scale-105
              hover:shadow-lg
              hover:shadow-yellow-400/40
              transition-all
              duration-300
              cursor-pointer
            "
          >
            Buy Now
          </button>

        </div>

      </div>

    </div>

  );
}

export default MenuCard;