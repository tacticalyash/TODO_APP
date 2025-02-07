import React, { useState } from "react";
import "./TodoList.css";

const TodoList = ({ todos, deleteTodo, updateTodo }) => {
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState("");
  const [checkedStatus, setCheckedStatus] = useState({});

  const startEditing = (todo) => {
    setEditMode(todo.id);
    setEditText(todo.title);
    setCheckedStatus({ ...checkedStatus, [todo.id]: todo.completed });
  };

  const handleCheckboxChange = (todo) => {
    const newStatus = !todo.completed;
    updateTodo(todo.id, todo.title, newStatus);
  };

  const saveChanges = (id) => {
    if (editText.trim() === "") return;
    updateTodo(id, editText, checkedStatus[id]);
    setEditMode(null);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const uncompletedCount = todos.length - completedCount;

  return (
    <div className="todo-list">
      <h2>Task List</h2>
      {todos.map((todo) => (
        <div key={todo.id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
          {editMode === todo.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button className="submit" onClick={() => saveChanges(todo.id)}>
                Submit
              </button>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxChange(todo)}
              />
              <span className="task-title">{todo.title}</span>
              <button className="delete" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
              <button className="edit" onClick={() => startEditing(todo)}>
                Edit
              </button>
            </>
          )}
        </div>
      ))}
      <div className="todo-footer">
        Completed: {completedCount} | Uncompleted: {uncompletedCount}
      </div>
    </div>
  );
};

export default TodoList;
