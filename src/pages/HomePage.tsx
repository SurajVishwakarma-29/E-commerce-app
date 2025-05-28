import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import CartSidebar from "../components/CartSidebar";
import CheckoutModal from "../components/CheckoutModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { supabase } from "../lib/supabaseClient";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function HomePage() {
  const [category, setCategory] = useState("all");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const handleAdd = (product: Product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemove = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleIncrease = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const handleDecrease = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleClear = () => {
    setCartItems([]);
  };

  const handleConfirmOrder = async (name: string, email: string, address: string) => {
    setCustomerName(name);
    setShowCheckout(false);
    setShowConfirm(true);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const user = (await supabase.auth.getUser()).data.user;

    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    const { error } = await supabase.from("orders").insert([
      {
        user_id: user.id,
        name,
        email,
        address,
        items: cartItems,
        total,
      },
    ]);

    if (error) {
      console.error("Failed to save order:", error);
    } else {
      setCartItems([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        onFilter={setCategory}
        onCartToggle={() => setIsCartOpen(true)}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <main className="p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Products
        </h2>
        <ProductGrid onAdd={handleAdd} category={category} />
      </main>

      {isCartOpen && (
        <CartSidebar
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onRemove={handleRemove}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onClear={handleClear}
          onCheckout={() => {
            setIsCartOpen(false);
            setShowCheckout(true);
          }}
        />
      )}

      {showCheckout && (
        <CheckoutModal
          onClose={() => setShowCheckout(false)}
          onConfirm={handleConfirmOrder}
        />
      )}

      {showConfirm && (
        <ConfirmationModal
          name={customerName}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
