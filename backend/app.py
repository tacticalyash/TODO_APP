from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for cross-origin requests (needed for React)
CORS(app)

# Store todos in memory
todos = []
todo_id = 1  # Auto-increment ID

# Homepage route to avoid 404 error
@app.route("/")
def home():
    return "Welcome to the Flask Todo API!"

# Get all todos
@app.route("/api/todos", methods=["GET"])
def get_todos():
    return jsonify(todos)

# Add a new todo
@app.route("/api/todos", methods=["POST"])
def add_todo():
    global todo_id
    data = request.json
    
    # Ensure title is present in the request body
    if "title" not in data:
        return jsonify({"error": "Title is required"}), 400
    
    new_todo = {
        "id": todo_id,  # Auto-increment ID
        "title": data["title"],  # Title provided in the request body
        "completed": False  # Completed is set to False by default
    }
    
    todos.append(new_todo)
    todo_id += 1  # Increment ID for the next todo
    
    return jsonify(new_todo), 201

# Delete a todo by ID
@app.route("/api/todos/<int:id>", methods=["DELETE"])
def delete_todo(id):
    global todos
    todo_to_delete = next((todo for todo in todos if todo["id"] == id), None)
    
    if todo_to_delete:
        todos = [todo for todo in todos if todo["id"] != id]  # Remove the todo
        return jsonify({"message": "Todo deleted successfully"}), 200
    else:
        return jsonify({"error": "Todo not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
