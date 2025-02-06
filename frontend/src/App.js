import React from "react";
import TodoList from "./components/TodoList";  // Import the TodoList component

const App = () => {
  return (
    <div className="App">
      <TodoList />  {/* Render the TodoList component here */}
    </div>
  );
};

export default App;  // Ensure App is exported as default
