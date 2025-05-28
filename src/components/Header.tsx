import React from "react";

interface HeaderProps {
  onFilter: (category: string) => void;
  onCartToggle: () => void;
  cartItemCount: number;
}

export default function Header({ onFilter, onCartToggle, cartItemCount }: HeaderProps) {
  return (
    <header className="bg-yellow-400 text-black shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <h1
          className="text-2xl font-bold cursor-pointer hover:opacity-90"
          onClick={() => onFilter("all")}
        >
          🛍️ Suraj Store
        </h1>

        {/* Categories */}
        <nav className="flex gap-4 text-sm font-medium">
          <button
            onClick={() => onFilter("all")}
            className="hover:underline hover:text-blue-700"
          >
            All
          </button>
          <button
            onClick={() => onFilter("tshirt")}
            className="hover:underline hover:text-blue-700"
          >
            T-Shirts
          </button>
          <button
            onClick={() => onFilter("hoodie")}
            className="hover:underline hover:text-blue-700"
          >
            Hoodies
          </button>
          <button
            onClick={() => onFilter("sneakers")}
            className="hover:underline hover:text-blue-700"
          >
            Sneakers
          </button>
        </nav>

        {/* Cart */}
        <button
          onClick={onCartToggle}
          className="relative bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition text-sm font-semibold"
        >
          🛒 Cart
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
