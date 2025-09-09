import { useState } from "react";
import "./App.css";
import TodoForm from "./../src/sampleCode/components/TodoForm";
import TodoList from "./../src/sampleCode/components/TodoList";
import { useLocalStorage } from "./../src/sampleCode/storage/useLocalStorage";

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [filter, setFilter] = useState("all");

  const handleAdd = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleClearAll = () => setTodos([]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm onAdd={handleAdd} />
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <TodoList todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} />
      <button onClick={handleClearAll} style={{ marginTop: "20px" }}>
        Clear All
      </button>
    </div>
  );
}

export default App;
