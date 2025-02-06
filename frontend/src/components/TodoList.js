import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos from Flask API (only once on mount)
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/todos")
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the todos!", error);
      });
  }, []);  // Empty dependency array ensures the effect runs only once on mount

  // Delete a todo
  const deleteTodo = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/todos/${id}`)
      .then(response => {
        setTodos(todos.filter(todo => todo.id !== id));  // Remove deleted todo
      })
      .catch(error => {
        console.error("There was an error deleting the todo!", error);
      });
  };

  // Toggle the completion status of a todo
  const toggleCompletion = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <AddTodo setTodos={setTodos} />  {/* Pass setTodos to AddTodo component */}
      <div>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleCompletion={toggleCompletion}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
