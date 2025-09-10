import React from 'react';
import '../App.css';

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <div className="todo-item">
      <div 
        className={`todo-text ${todo.completed ? 'completed' : ''}`}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </div>
      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
        ×
      </button>
    </div>
  );
}

export default TodoItem;
