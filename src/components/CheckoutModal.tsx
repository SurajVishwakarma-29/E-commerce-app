import React, { useState } from "react";

interface CheckoutModalProps {
  onClose: () => void;
  onConfirm: (name: string, email: string, address: string) => void;
}

export default function CheckoutModal({ onClose, onConfirm }: CheckoutModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(name, email, address);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 w-80 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Checkout</h2>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded p-2 mt-1"
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded p-2 mt-1"
          />
        </label>
        <label className="block mb-4">
          Address:
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full border rounded p-2 mt-1"
          />
        </label>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
}
