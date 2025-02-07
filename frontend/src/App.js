import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const newTask = { title: newTodo, completed: false };

    fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => setTodos([...todos, data]));

    setNewTodo("");
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/api/todos/${id}`, { method: "DELETE" })
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)));
  };

  const updateTodo = (id, updatedTitle, updatedCompleted) => {
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: updatedTitle, completed: updatedCompleted }),
    })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, title: updatedTitle, completed: updatedCompleted } : todo
          )
        );
      });
  };

  return (
    <div className="app">
      <h1>To Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    </div>
  );
};

export default App;
