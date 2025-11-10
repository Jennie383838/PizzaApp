import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Header() {
  return (
    <header className="header-section">
      <h1>Xavier's Pizzeria</h1>
      <h2>OUR MENU</h2>
      <p>Authentic Italian cuisine, all from my stone oven</p>
    </header>
  );
}

function Pizza({ name, description, price, image, onSelect, isSelected }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onSelect({ name, price });
    setTimeout(() => setIsClicked(false), 400);
  };

  return (
    <div className="pizza-item">
      <div className="pizza-info">
        <img src={image} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="pizza-action">
        <p className="price">${price}</p>
        <button
          className={`select-btn ${
            isSelected ? "selected" : ""
          } ${isClicked ? "clicked" : ""}`}
          onClick={handleClick}
        >
          {isSelected ? "Selected ✓" : "Select"}
        </button>
      </div>
    </div>
  );
}

function Menu({ pizzas, onSelect, selectedPizzas }) {
  return (
    <main className="menu-section">
      {pizzas.map((pizza, index) => (
        <Pizza
          key={index}
          name={pizza.name}
          description={pizza.description}
          price={pizza.price}
          image={pizza.image}
          onSelect={onSelect}
          isSelected={selectedPizzas.some((p) => p.name === pizza.name)}
        />
      ))}
    </main>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const isOpen = hour >= 9 && hour < 22;
  return (
    <footer className="footer-section">
      <p>{isOpen ? "We’re currently open" : "Sorry, we’re closed"}</p>
      <p>Hours: 10:00 AM - 10:00 PM</p>
    </footer>
  );
}

const pizzaData = [
  {
    name: "Focaccia",
    description: "Bread with Italian olive oil and rosemary",
    price: 6,
    image: "/images/focaccia.jpg",
  },
  {
    name: "Pizza Margherita",
    description: "Tomato and mozzarella",
    price: 10,
    image: "/images/margherita.jpg",
  },
  {
    name: "Pizza Spinaci",
    description: "Tomato, mozzarella, spinach, and ricotta cheese",
    price: 12,
    image: "/images/spinaci.jpg",
  },
  {
    name: "Pizza Funghi",
    description: "Tomato, mozzarella, mushrooms, and onion",
    price: 12,
    image: "/images/funghi.jpg",
  },
  {
    name: "Pizza Salamino",
    description: "Tomato, mozzarella, and pepperoni",
    price: 15,
    image: "/images/salamino.jpg",
  },
  {
    name: "Pizza Prosciutto",
    description: "Tomato, mozzarella, ham, arugula, and burrata cheese",
    price: 18,
    image: "/images/prosciutto.jpg",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [selectedPizzas, setSelectedPizzas] = useState([]);

  const filteredPizzas = pizzaData.filter((pizza) =>
    pizza.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (pizza) => {
    const alreadySelected = selectedPizzas.find((p) => p.name === pizza.name);
    if (alreadySelected) {
      setSelectedPizzas(selectedPizzas.filter((p) => p.name !== pizza.name));
    } else {
      setSelectedPizzas([...selectedPizzas, pizza]);
    }
  };

  const handleOrder = () => {
    if (selectedPizzas.length === 0) {
      alert("Please select at least one pizza!");
    } else {
      const total = selectedPizzas.reduce((sum, p) => sum + p.price, 0);
      const names = selectedPizzas.map((p) => p.name).join(", ");
      alert(`You ordered: ${names}\nTotal: $${total}\nThank you! 🍕`);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search pizza..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Menu
        pizzas={filteredPizzas}
        onSelect={handleSelect}
        selectedPizzas={selectedPizzas}
      />
      <div className="order-container">
        <button onClick={handleOrder} className="order-btn">
          Order
        </button>
      </div>
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
