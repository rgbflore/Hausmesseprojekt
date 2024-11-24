import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import ProductButton from './components/ProductButton';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import AdminPage from './components/AdminPage';
import Login from './components/Login';

const App = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Login-Status

  const adminCredentials = {
    username: 'admin',
    password: 'admin123',
  };

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products'));
    if (savedProducts) {
      setProducts(savedProducts);
    } else {
      const defaultProducts = [
        { name: 'Wasser', price: 1, image: 'https://via.placeholder.com/150' },
        { name: 'Cola', price: 1.5, image: 'https://via.placeholder.com/150' },
        { name: 'Baguette mit Salami', price: 3, image: 'https://via.placeholder.com/150' },
        { name: 'Baguette mit Lyoner', price: 3, image: 'https://via.placeholder.com/150' },
        { name: 'Donut', price: 2, image: 'https://via.placeholder.com/150' },
      ];
      setProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
  }, []);

  const addToCart = (name, price, image) => {
    setCart([...cart, { name, price, image }]);
    setTotal(total + price);
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  const submitOrder = (pickupTime, email) => {
    if (cart.length > 0) {
      const order = {
        items: cart,
        pickupTime,
        email,
        orderTime: new Date().toLocaleString(),
      };
      setOrders([...orders, order]);
      alert(`Bestellung erfolgreich! Abholzeit: ${pickupTime}`);
      clearCart();
    } else {
      alert('Der Warenkorb ist leer. Bitte füge Artikel hinzu.');
    }
  };

  const removeOrder = (orderIndex) => {
    setOrders(orders.filter((_, index) => index !== orderIndex));
  };

  const addProduct = (name, price, image) => {
    const newProduct = { name, price, image };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const removeProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <Router>
      <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
        <nav className="bg-blue-600 p-4 rounded-lg shadow-md text-white flex justify-between items-center">
          <Link to="/" className="text-xl font-bold hover:text-yellow-300">
            🏫 Wara Schulkantine
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-yellow-300">
              Kiosk
            </Link>
            <Link to="/login" className="hover:text-yellow-300">
              Mitarbeiterbereich
            </Link>
          </div>
        </nav>

        <div className="mt-8">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
                    Willkommen in der Kantine
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                      <ProductButton
                        key={index}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        addToCart={addToCart}
                      />
                    ))}
                  </div>
                  <div className="mt-8">
                    <Cart cart={cart} total={total} clearCart={clearCart} />
                    <OrderForm submitOrder={submitOrder} />
                  </div>
                </>
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  adminCredentials={adminCredentials}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
            <Route
              path="/admin"
              element={
                isAuthenticated ? (
                  <AdminPage
                    orders={orders}
                    removeOrder={removeOrder}
                    addProduct={addProduct}
                    removeProduct={removeProduct}
                    products={products}
                    setProducts={setProducts}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
        <footer className="mt-12 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Wara Schulkantine. Alle Rechte vorbehalten.
        </footer>
      </div>
    </Router>
  );
};

export default App;
