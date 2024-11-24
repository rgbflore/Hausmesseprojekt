import React, { useState } from 'react';

const ManageProducts = ({ products, saveProducts }) => {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });

  const addProduct = (e) => {
    e.preventDefault();
    const updatedProducts = [...products, { ...newProduct, price: parseFloat(newProduct.price) }];
    saveProducts(updatedProducts);
    setNewProduct({ name: '', price: '', image: '' });
  };

  const removeProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    saveProducts(updatedProducts);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Produkte Verwalten</h2>
      <form onSubmit={addProduct} className="mb-4">
        <input
          type="text"
          placeholder="Produktname"
          className="border p-2 rounded w-full mb-2"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Preis"
          className="border p-2 rounded w-full mb-2"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Bild-URL"
          className="border p-2 rounded w-full mb-4"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Produkt Hinzufügen</button>
      </form>
      <ul>
        {products.map((product, index) => (
          <li key={index} className="border p-2 rounded mb-2 flex justify-between">
            <span>{product.name} - {product.price}€</span>
            <button onClick={() => removeProduct(index)} className="bg-red-500 text-white py-1 px-2 rounded">
              Entfernen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
