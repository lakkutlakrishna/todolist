import React, { useState } from 'react';
import "./App.css";
function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new task"
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button onClick={addTask} style={{ padding: '8px 16px' }}>Add Task</button>

      <ul style={{ marginTop: '20px' }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: '10px' }}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                marginRight: '10px',
              }}
            >
              {task.text}
            </span>
            <button onClick={() => toggleCompletion(task.id)}>Complete</button>
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '5px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;