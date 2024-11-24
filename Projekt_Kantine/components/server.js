const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

// Middleware, um JSON-Daten zu verarbeiten
app.use(express.json());

const productsFile = path.join(__dirname, 'products.json');

// Lade die Produkte aus der JSON-Datei
const getProducts = () => {
  const data = fs.readFileSync(productsFile);
  return JSON.parse(data);
};

// Schreibe die Produkte in die JSON-Datei
const saveProducts = (products) => {
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
};

// API-Endpunkt, um alle Produkte abzurufen
app.get('/api/products', (req, res) => {
  const products = getProducts();
  res.json(products);
});

// API-Endpunkt, um ein neues Produkt hinzuzufügen
app.post('/api/products', (req, res) => {
  const products = getProducts();
  const newProduct = req.body;
  products.push(newProduct);
  saveProducts(products);
  res.status(201).json(newProduct);
});

// API-Endpunkt, um ein Produkt zu entfernen
app.delete('/api/products/:name', (req, res) => {
  let products = getProducts();
  const productName = req.params.name;
  products = products.filter((product) => product.name !== productName);
  saveProducts(products);
  res.status(200).json({ message: 'Produkt entfernt' });
});

// Server starten
app.listen(PORT, () => {
  console.log(Server läuft auf http://localhost:${PORT});
});