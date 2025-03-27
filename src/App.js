import React, { useState, useEffect } from 'react';
import "./App.css";
import Calculator from './Calculator';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [dueDate, setDueDate] = useState('');

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        createdAt: new Date().toLocaleString(),
        dueDate: dueDate || 'No due date'
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
      setDueDate('');
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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>To-Do List</h1>
          <p style={{ marginTop: '-10px', color: '#555' }}>
            {currentDateTime.toLocaleDateString()} - {currentDateTime.toLocaleTimeString()}
          </p>
        </div>
        <button 
          onClick={() => setShowCalculator(true)} 
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            height: 'fit-content'
          }}
        >
          Open Calculator
        </button>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new task"
          style={{ padding: '8px', flexGrow: 1, minWidth: '200px' }}
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={handleDueDateChange}
          style={{ padding: '8px' }}
        />
        <button 
          onClick={addTask} 
          style={{ 
            padding: '8px 16px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Add Task
        </button>
      </div>

      <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li 
            key={task.id} 
            className="task-item"
            style={{ 
              marginBottom: '15px',
              padding: '15px',
              backgroundColor: task.completed ? '#f0f0f0' : '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderLeft: task.completed ? '4px solid #4CAF50' : '4px solid #2196F3',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    marginRight: '10px',
                    fontSize: '18px',
                    color: task.completed ? '#777' : '#333'
                  }}
                >
                  {task.text}
                </span>
                <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                  <div>Created: {task.createdAt}</div>
                  <div>Due: {formatDate(task.dueDate) || 'No due date'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <button 
                  onClick={() => toggleCompletion(task.id)}
                  style={{ 
                    padding: '5px 10px',
                    backgroundColor: task.completed ? '#FFC107' : '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button 
                  onClick={() => deleteTask(task.id)} 
                  style={{ 
                    padding: '5px 10px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {showCalculator && <Calculator onClose={() => setShowCalculator(false)} />}
    </div>
  );
}

export default App;