import React, { useState } from 'react';

const Calculator = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        setResult(eval(input).toString());
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else {
      setInput(input + value);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onClose} style={{ marginBottom: '10px' }}>Close</button>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={input}
          readOnly
          style={{ width: '100%', padding: '8px', fontSize: '16px' }}
        />
        <div style={{ fontSize: '20px', minHeight: '30px' }}>{result}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', 'C', '=', '+'].map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            style={{ padding: '10px', fontSize: '16px' }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;