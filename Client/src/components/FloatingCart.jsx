import { useCart } from "../context/CartContext";

function FloatingCart() {

  const { cartItems } = useCart();

  if (cartItems.length === 0) return null;

  return (

    <div
      className="
        fixed bottom-5 right-5
        z-[999]
        w-[320px]
        max-h-[300px]
        overflow-y-auto
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        rounded-3xl
        shadow-2xl
        p-4
      "
    >

      <h2 className="text-white font-black text-xl mb-3">
        Cart 🛒
      </h2>

      <div className="space-y-3">

        {cartItems.map((item, index) => (

          <div
            key={index}
            className="
              bg-white/10
              rounded-2xl
              p-3
              flex items-center gap-3
            "
          >

            <img
              src={item.image}
              alt=""
              className="w-14 h-14 rounded-xl object-cover"
            />

            <div className="flex-1">

              <h3 className="text-white font-bold text-sm">
                {item.itemName}
              </h3>

              <p className="text-yellow-300 text-sm">
                Qty: {item.quantity}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default FloatingCart;