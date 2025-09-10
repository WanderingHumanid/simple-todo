import React, { useState, useEffect } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  // Load todos from localStorage when the app loads
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);
  
  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };
  
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div className="App">
      <div className="todo-container">
        <h1>Todo List</h1>
        <form className="todo-form" onSubmit={addTodo}>
          <input
            type="text"
            className="todo-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit" className="add-btn">Add</button>
        </form>
        <div className="todo-list">
          {todos.length > 0 ? (
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))
          ) : (
            <p className="empty-message">No tasks yet. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
