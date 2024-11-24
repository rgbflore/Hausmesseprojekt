import React, { useState } from 'react';

const SettingsPage = ({ products, addProduct, removeProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = { name, price: parseFloat(price), image };
    addProduct(newProduct);
    setName('');
    setPrice('');
    setImage(null); // Reset des Bildes
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Setze das Bild als Base64-String
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Produkte verwalten</h2>

      <form onSubmit={handleAddProduct} className="mb-4">
        <div className="mb-4">
          <label className="block mb-2 font-bold">Produktname:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Preis (in Euro):</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Bild:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
          Produkt hinzufügen
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Vorhandene Produkte</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index} className="flex justify-between mb-2">
            <span>{product.name} - {product.price}€</span>
            <button
              onClick={() => removeProduct(index)}
              className="bg-red-500 text-white py-1 px-3 rounded"
            >
              Entfernen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsPage;
