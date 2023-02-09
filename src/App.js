import React, { useState, useEffect } from "react";
import "./TodoList.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch("http://localhost:8080/todos");
    const data = await response.json();
    setTodos(data);
  }


  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = {text: inputValue, completed: false};

    await fetch("http://localhost:8080/todos",{
       method : "POST",
       body: JSON.stringify(data),
       headers:{
        'content-type' : 'application/json'
       }
    })
    getData();
    setInputValue("");
  };

  const handleTodoClick = todoId => {
    setTodos(
      todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    );
  };

  const handleDeleteClick = async (todoId) => {
    const data = {text: inputValue, completed: false};

    await fetch(`http://localhost:8080/todos/${todoId}`,{
       method : "DELETE",
       body: JSON.stringify(data),
       headers:{
        'content-type' : 'application/json'
       }
    })

    getData();
  };

  return (
    <div className="todo-list-container">
      <h1 className="todo-list-title">To Do List</h1>
      <form onSubmit={handleFormSubmit} className="todo-list-form">
        <input type="text" value={inputValue} onChange={handleInputChange} className="todo-list-input" />
        <button type="submit" className="todo-list-button">Tambah Tugas</button>
      </form>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-list-item ${todo.completed ? "completed" : ""}`}>
            {todo.text}
            <button onClick={() => handleTodoClick(todo.id)} className="todo-list-toggle-button">{todo.completed ? "Uncompleted" : "Completed"}</button>
            <button onClick={() => handleDeleteClick(todo.id)} className="todo-list-delete-button">Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
