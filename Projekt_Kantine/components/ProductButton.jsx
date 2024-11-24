import React from 'react';

const ProductButton = ({ name, price, image, addToCart }) => {
  return (
    <div className="bg-white border p-4 rounded-lg shadow-md flex flex-col items-center">
      {/* Bild anzeigen, wenn es vorhanden ist */}
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-24 h-24 object-cover rounded mb-4"
        />
      ) : (
        <div className="w-24 h-24 bg-gray-200 flex items-center justify-center mb-4 rounded">
          <span className="text-sm text-gray-500">Kein Bild</span>
        </div>
      )}

      {/* Name des Produkts */}
      <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3>

      {/* Preis des Produkts */}
      <p className="text-gray-700 mb-4">€{price.toFixed(2)}</p>

      {/* Button zum Hinzufügen zum Warenkorb */}
      <button
        onClick={() => addToCart(name, price, image)}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Hinzufügen
      </button>
    </div>
  );
};

export default ProductButton;
