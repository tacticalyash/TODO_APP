import React, { useState } from "react";
import axios from "axios";

const AddTodo = ({ setTodos }) => {
  const [title, setTitle] = useState("");

  // Handle submit to add a new todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    // Send POST request to Flask API
    axios.post("http://127.0.0.1:5000/api/todos", { title })
      .then(response => {
        setTodos(prevTodos => [...prevTodos, response.data]); // Update todos state
        setTitle(""); // Clear input field
      })
      .catch(error => {
        console.error("There was an error adding the todo!", error);
      });
  };

  return (
    <div className="add-todo">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
