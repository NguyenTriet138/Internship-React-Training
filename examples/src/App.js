// import { useState } from "react";
// import "./App.css";
// import TodoForm from "./../src/sampleCode/components/TodoForm";
// import TodoList from "./../src/sampleCode/components/TodoList";
// import { useLocalStorage } from "./../src/sampleCode/storage/useLocalStorage";

// function App() {
//   const [todos, setTodos] = useLocalStorage("todos", []);
//   const [filter, setFilter] = useState("all");

//   const handleAdd = (text) => {
//     const newTodo = { id: Date.now(), text, completed: false };
//     setTodos([...todos, newTodo]);
//   };

//   const handleToggle = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   const handleDelete = (id) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   const handleClearAll = () => setTodos([]);

//   const filteredTodos = todos.filter((todo) => {
//     if (filter === "active") return !todo.completed;
//     if (filter === "completed") return todo.completed;
//     return true;
//   });

//   return (
//     <div className="App">
//       <h1>Todo App</h1>
//       <TodoForm onAdd={handleAdd} />
//       <div style={{ marginBottom: "20px" }}>
//         <button onClick={() => setFilter("all")}>All</button>
//         <button onClick={() => setFilter("active")}>Active</button>
//         <button onClick={() => setFilter("completed")}>Completed</button>
//       </div>
//       <TodoList todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} />
//       <button onClick={handleClearAll} style={{ marginTop: "20px" }}>
//         Clear All
//       </button>
//     </div>
//   );
// }

// export default App;

// ----------------------------- END Todo App--------------------------------

// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import ProductList from "../src/sampleCode/miniEcommerce/components/ProductList";
// import ProductDetail from "../src/sampleCode/miniEcommerce/components/ProductDetail";
// import Cart from "../src/sampleCode/miniEcommerce/components/Cart";
// import { CartProvider } from "../src/sampleCode/miniEcommerce/context/CartContext";
// import "./App.css";

// function App() {
//   return (
//     <CartProvider>
//       <Router>
//         <nav style={{ marginBottom: "20px" }}>
//           <Link to="/">Home</Link> | <Link to="/cart">Cart</Link>
//         </nav>
//         <Routes>
//           <Route path="/" element={<ProductList />} />
//           <Route path="/product/:id" element={<ProductDetail />} />
//           <Route path="/cart" element={<Cart />} />
//         </Routes>
//       </Router>
//     </CartProvider>
//   );
// }

// export default App;

// ----------------------------- END Mini Ecommerce App--------------------------------

import React, { useState, useCallback } from "react";
import Child from "./../src/sampleCode/hooks/useCallback";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <Child onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

export default App;

// ----------------------------- END useCallback Example--------------------------------
