import React from "react";
import products from "./api"; 
import "./App.css"; 

function App() {
  const [productList, setProductList] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredProducts, setFilteredProducts] = React.useState(products);
  const [noResultsMessage, setNoResultsMessage] = React.useState('');
  const [showResults, setShowResults] = React.useState(false);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
    setNoResultsMessage(filtered.length === 0 ? 'Не найдено' : '');
    setShowResults(filtered.length > 0 || term.length > 0); 
  };

  React.useEffect(() => {
    setProductList(products);
  }, []);

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  return (
    <div>
      <header>
        <h1>Спортивное Питание</h1>
        <input 
          type="text"
          value={searchTerm} 
          onChange={handleSearch}
          className="search-input"
          placeholder="Поиск продуктов......."
        />
        <button className="toggle-button" onClick={toggleResults}>
          {showResults ? 'Скрыть результаты' : 'Показать результаты'}
        </button>
      </header>
      {showResults && (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div className="product-item" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <b>Цена: {product.price} руб.</b>
              <p><strong>Пищевая ценность:</strong></p>
              <ul>
                <li>Белки: {product.nutrients.protein}</li>
                <li>Углеводы: {product.nutrients.carbs}</li>
                <li>Жиры: {product.nutrients.fat}</li>
              </ul>
              <p><strong>Размер порции:</strong> {product.servingSize}</p>
            </div>
          ))}
          {noResultsMessage && <p className="no-results-message">{noResultsMessage}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
