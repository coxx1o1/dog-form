import React from "react";

export default function AddDog({ onClose }) {
  return (
    <div>
        <button
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
        onClick={onClose}
      >
        x
      </button>
      <h1>Add Dog</h1>
      <p>This is the Add Dog page.</p>
    </div>
  );
}