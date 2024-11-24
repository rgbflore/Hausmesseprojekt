import React from 'react';

const Cart = ({ cart, total, clearCart }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Warenkorb</h2>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="flex items-center mb-2">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 mr-4 rounded"
                  />
                )}
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">Preis: €{item.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-bold text-lg">Gesamt: €{total.toFixed(2)}</div>
          <button
            onClick={clearCart}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Warenkorb leeren
          </button>
        </>
      ) : (
        <p>Dein Warenkorb ist leer.</p>
      )}
    </div>
  );
};

export default Cart;
