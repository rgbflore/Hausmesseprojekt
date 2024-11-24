import React, { useState } from 'react';

const AdminPage = ({ products, setProducts, orders, removeOrder }) => {
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductImageURL, setNewProductImageURL] = useState('');

  // Produkt hinzufügen
  const handleAddProduct = () => {
    if (newProductName && newProductPrice && newProductImageURL) {
      const newProduct = {
        name: newProductName,
        price: parseFloat(newProductPrice),
        image: newProductImageURL,
      };

      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      setNewProductName('');
      setNewProductPrice('');
      setNewProductImageURL('');
    } else {
      alert('Bitte fülle alle Felder aus.');
    }
  };

  // Produkt entfernen
  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div className="admin-page p-6 bg-white rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Neues Produkt hinzufügen</h2>

      {/* Produktname */}
      <div className="mb-4">
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Name des Produkts</label>
        <input
          id="productName"
          type="text"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          className="w-full p-3 mt-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Produktpreis */}
      <div className="mb-4">
        <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Preis des Produkts (€)</label>
        <input
          id="productPrice"
          type="number"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
          className="w-full p-3 mt-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Produktbild-URL */}
      <div className="mb-6">
        <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">Bild-URL des Produkts</label>
        <input
          id="productImage"
          type="url"
          value={newProductImageURL}
          onChange={(e) => setNewProductImageURL(e.target.value)}
          className="w-full p-3 mt-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Bildvorschau */}
      {newProductImageURL && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Bildvorschau:</h3>
          <img
            src={newProductImageURL}
            alt="Vorschau"
            className="mt-2 w-32 h-32 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Produkt hinzufügen Button */}
      <div className="mt-4">
        <button
          onClick={handleAddProduct}
          className="w-full p-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Produkt hinzufügen
        </button>
      </div>

      {/* Vorhandene Produkte anzeigen */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Vorhandene Produkte</h2>
        <ul className="space-y-4">
          {products.map((product, index) => (
            <li key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                )}
                <span className="font-semibold">{product.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">€{product.price.toFixed(2)}</span>
                <button
                  onClick={() => handleRemoveProduct(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Entfernen
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Bestellungen anzeigen */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Bestellungen</h2>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div key={index} className="border p-4 rounded shadow">
                <h3 className="text-lg font-bold">Bestellung #{index + 1}</h3>
                <p><strong>Bestellzeit:</strong> {order.orderTime}</p>
                <p><strong>Abholzeit:</strong> {order.pickupTime}</p>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>Produkte:</strong></p>
                <ul className="list-disc ml-6">
                  {order.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {item.name} - {item.price} €
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => removeOrder(index)}
                  className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition"
                >
                  Bestellung entfernen
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Keine Bestellungen vorhanden.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
