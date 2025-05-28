import React from "react";

interface ConfirmationModalProps {
  onClose: () => void;
  name: string;
}

export default function ConfirmationModal({ onClose, name }: ConfirmationModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
        <p className="mb-6">Thanks for your order, {name}. We will process it soon.</p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  )}
