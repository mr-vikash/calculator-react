import React from 'react'
function App() {
  const [display, setDisplay] = React.useState('0');
  const [prevValue, setPrevValue] = React.useState(null);
  const [operation, setOperation] = React.useState(null);
  const [newNumber, setNewNumber] = React.useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    const currentValue = parseFloat(display);
    
    if (prevValue === null) {
      setPrevValue(currentValue);
    } else if (operation) {
      const result = calculate(prevValue, currentValue, operation);
      setDisplay(String(result));
      setPrevValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return b !== 0 ? a / b : 0;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (operation && prevValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(prevValue, currentValue, operation);
      setDisplay(String(result));
      setPrevValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setNewNumber(true);
    }
  };

  const buttonStyle = {
    padding: '20px',
    fontSize: '20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 0.2s'
  };

  const numberButtonStyle = {
    ...buttonStyle,
    background: '#f0f0f0',
    color: '#333'
  };

  const operatorButtonStyle = {
    ...buttonStyle,
    background: '#ff9500',
    color: 'white',
    fontWeight: 'bold'
  };

  const specialButtonStyle = {
    ...buttonStyle,
    background: '#d4d4d2',
    color: '#333'
  };

  return React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif'
    }
  },
    React.createElement('div', {
      style: {
        background: 'white',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        width: '320px'
      }
    },
      React.createElement('div', {
        style: {
          background: '#333',
          color: 'white',
          padding: '30px 20px',
          textAlign: 'right',
          fontSize: '48px',
          borderRadius: '10px',
          marginBottom: '20px',
          wordWrap: 'break-word',
          minHeight: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }
      }, display),
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px'
        }
      },
        React.createElement('button', { onClick: handleClear, style: { ...specialButtonStyle, gridColumn: 'span 2' } }, 'AC'),
        React.createElement('button', { onClick: handleBackspace, style: specialButtonStyle }, '⌫'),
        React.createElement('button', { onClick: () => handleOperation('÷'), style: operatorButtonStyle }, '÷'),
        
        React.createElement('button', { onClick: () => handleNumber('7'), style: numberButtonStyle }, '7'),
        React.createElement('button', { onClick: () => handleNumber('8'), style: numberButtonStyle }, '8'),
        React.createElement('button', { onClick: () => handleNumber('9'), style: numberButtonStyle }, '9'),
        React.createElement('button', { onClick: () => handleOperation('×'), style: operatorButtonStyle }, '×'),
        
        React.createElement('button', { onClick: () => handleNumber('4'), style: numberButtonStyle }, '4'),
        React.createElement('button', { onClick: () => handleNumber('5'), style: numberButtonStyle }, '5'),
        React.createElement('button', { onClick: () => handleNumber('6'), style: numberButtonStyle }, '6'),
        React.createElement('button', { onClick: () => handleOperation('-'), style: operatorButtonStyle }, '-'),
        
        React.createElement('button', { onClick: () => handleNumber('1'), style: numberButtonStyle }, '1'),
        React.createElement('button', { onClick: () => handleNumber('2'), style: numberButtonStyle }, '2'),
        React.createElement('button', { onClick: () => handleNumber('3'), style: numberButtonStyle }, '3'),
        React.createElement('button', { onClick: () => handleOperation('+'), style: operatorButtonStyle }, '+'),
        
        React.createElement('button', { onClick: () => handleNumber('0'), style: { ...numberButtonStyle, gridColumn: 'span 2' } }, '0'),
        React.createElement('button', { onClick: handleDecimal, style: numberButtonStyle }, '.'),
        React.createElement('button', { onClick: handleEquals, style: { ...operatorButtonStyle, background: '#34c759' } }, '=')
      )
    )
  );
}
export default App;
