const { useState, useEffect } = React;

const App = () => {
  const [products] = useState([
    { id: 1, name: "Laptop Pro", category: "Electronics", brand: "TechCorp", price: 1299.99 },
    { id: 2, name: "Designer Jacket", category: "Clothing", brand: "FashionHub", price: 199.99 },
    { id: 3, name: "Smartphone X", category: "Electronics", brand: "TechCorp", price: 899.99 },
    { id: 4, name: "Slim Jeans", category: "Clothing", brand: "FashionHub", price: 79.99 },
    { id: 5, name: "Gaming Console", category: "Electronics", brand: "GameZone", price: 499.99 }
  ]);

  const [filters, setFilters] = useState({ category: '', brand: '', minPrice: 0, maxPrice: Infinity });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: name === 'minPrice' || name === 'maxPrice' ? parseFloat(value) || 0 : value
    }));
  };

  const handleReset = () => {
    setFilters({ category: '', brand: '', minPrice: 0, maxPrice: Infinity });
  };

  const filteredProducts = products.filter(product => 
    (filters.category === '' || product.category === filters.category) &&
    (filters.brand === '' || product.brand === filters.brand) &&
    product.price >= filters.minPrice && product.price <= (filters.maxPrice || Infinity)
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Catalog</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
          </select>
          <select
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Brands</option>
            <option value="TechCorp">TechCorp</option>
            <option value="FashionHub">FashionHub</option>
            <option value="GameZone">GameZone</option>
          </select>
          <div className="flex space-x-2">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min Price"
              className="p-2 border rounded w-1/2"
              min="0"
            />
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice === Infinity ? '' : filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max Price"
              className="p-2 border rounded w-1/2"
              min="0"
            />
          </div>
        </div>
        <button
          onClick={handleReset}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset Filters
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-item">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">Category: {product.category}</p>
            <p className="text-gray-600">Brand: {product.brand}</p>
            <p className="text-gray-800 font-bold">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));