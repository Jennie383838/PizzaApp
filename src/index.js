import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Header component
function Header() {
    return (
        <h1 style={{ color: "orange", fontSize: "48px", textTransform: "uppercase" }}>
            Welcome to My Pizza Shop
        </h1>
    );
}

// Pizza component
function Pizza({ name, toppings, image }) {
    return (
        <div style={{ margin: "20px", textAlign: "center" }}>
            <h2>{name}</h2>
            <img src={image} alt={name} style={{ width: "200px", height: "auto" }} />
            <p>Toppings: {toppings.join(", ")}</p>
        </div>
    );
}

// Menu component
function Menu({ pizzas }) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <h2>Our Menu</h2>
            {pizzas.map((pizza, index) => (
                <Pizza
                    key={index}
                    name={pizza.name}
                    toppings={pizza.toppings}
                    image={pizza.image}
                />
            ))}
        </div>
    );
}

// Footer component
function Footer() {
    const currentHour = new Date().getHours();
    const isOpen = currentHour >= 13 && currentHour < 24; 
    return (
        <footer className="footer">
            {isOpen ? "We are currently open, Welcome in ! " : "Sorry, we are closed, pls come another time!"}
        </footer>
    );
}

// Array of pizza data
const pizzaData = [
    { name: "Focaccia", toppings: ["Olive Oil", "Salt"], image: "/images/focaccia.jpg" },
    { name: "Funghi", toppings: ["Mushroom", "Cheese"], image: "/images/funghi.jpg" },
    { name: "Margherita", toppings: ["Cheese", "Tomato"], image: "images/margherita.jpg" },
    { name: "Prosciutto", toppings: ["Ham", "Cheese"], image: "/images/prosciutto.jpg" },
    { name: "Salamino", toppings: ["Salami", "Cheese"], image: "/images/salamino.jpg" },
    { name: "Spinaci", toppings: ["Spinach", "Cheese"], image: "/images/spinaci.jpg" },
];

// App component
function App() {
    return (
        <div>
            <Header />
            <Menu pizzas={pizzaData} />
            <Footer />
        </div>
    );
}

// Render App to the screen
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
