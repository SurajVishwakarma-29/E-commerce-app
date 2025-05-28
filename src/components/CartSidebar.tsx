import React from "react";

interface CartItem {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartSidebarProps {
  cartItems: CartItem[];
  onClose: () => void;
  onRemove: (id: number) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onClear: () => void;
  onCheckout: () => void;
}

export default function CartSidebar({
  cartItems,
  onClose,
  onRemove,
  onIncrease,
  onDecrease,
  onClear,
  onCheckout,
}: CartSidebarProps) {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 flex flex-col z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 font-bold text-2xl"
          aria-label="Close cart"
        >
          &times;
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col flex-grow overflow-auto">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center mb-4 border-b pb-2 space-x-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p>₹{item.price}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    onClick={() => onDecrease(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => onIncrease(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="text-red-600 font-bold"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-auto pt-4 border-t">
            <p className="text-lg font-bold mb-4">Total: ₹{totalPrice}</p>
            <div className="flex space-x-4">
              <button
                onClick={onClear}
                className="flex-grow bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={onCheckout}
                className="flex-grow bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}