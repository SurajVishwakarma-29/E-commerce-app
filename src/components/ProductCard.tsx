import React from "react";

interface Product {
  category: string;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg p-4 flex flex-col transition">
      <div className="w-full h-48 flex items-center justify-center mb-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full object-contain"
        />
      </div>
      
      <h3 className="text-md font-semibold text-gray-900 mb-1">{product.name}</h3>
      <p className="text-green-600 font-bold mb-4">₹{product.price}</p>

      <button
        onClick={() => onAdd(product)}
        className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded text-sm font-semibold transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
