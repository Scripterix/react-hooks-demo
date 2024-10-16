import './App.css';
import React, { useState, useEffect, createContext, useContext } from 'react';

const BackgroundColorContext = createContext();

function App() {
  const [count, setCount] = useState(0);


  const [inputValue, setInputValue] = useState(0);


  const [bgColor, setBgColor] = useState('#0e0e0e');


  const incrementCount = () => {
    setCount(count + 1);
  };


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  useEffect(() => {
    console.log('Input Value:', inputValue);
    if (/^#[0-9A-F]{6}$/i.test(inputValue) || /^#[0-9A-F]{3}$/i.test(inputValue)) {
      console.log('Valid Hex Color:', inputValue);
      setBgColor(inputValue);
    } else {
      console.log('Invalid Hex Color');
    }
  }, [inputValue]);


  const isLightBackground = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  const textClass = isLightBackground(bgColor) ? 'light-background' : 'dark-background';



  return (

    <BackgroundColorContext.Provider value={{ bgColor, setBgColor }}>
      <div className={`App ${textClass}`} style={{ backgroundColor: bgColor }}>
        <header className="App-header">
          <a className="App-link" href='https://opengateweb.com/pages/portfolio/'>Portfolio Home Page</a>
          {/* Nagłówek dla useState */}
          <h2>React useState Hook Example</h2>

          {/* Wyświetl stan licznika */}
          <p>Count: {count}</p>
          <button onClick={incrementCount}>Increment</button>

          {/* Nagłówek dla useEffect */}
          <h2>React useEffect Hook Example</h2>

          {/* Pole input do wprowadzenia danych */}
          <div>
            <input
              type="text"
              placeholder="Input any text..."
              value={inputValue}
              onChange={handleInputChange}
            />
            {/* Wyświetlanie wprowadzonego tekstu */}
            <p>Wprowadzone dane: {inputValue}</p>
          </div>

          {/* Nagłówek dla useContext */}
          <h2>React useContext Hook Example</h2>

          {/* Komponent używający kontekstu */}
          <BackgroundColorInput />

          <h2>Background Color examples:</h2>
          <ul>
            <li>#000000 - black</li>
            <li>#78b257 - green</li>
            <li>#ea0e3a - red</li>
            <li>#0000ff - blue</li>
            <li>#ffffff - white</li>
          </ul>
        </header>
      </div>
    </BackgroundColorContext.Provider>
  );
}


function BackgroundColorInput() {
  const { setBgColor } = useContext(BackgroundColorContext);

  const handleLocalInputChange = (event) => {
    const newValue = event.target.value;
    if (/^#[0-9A-F]{6}$/i.test(newValue) || /^#[0-9A-F]{3}$/i.test(newValue)) {
      setBgColor(newValue);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Input color formated #ddd or #dddddd..."
        onChange={handleLocalInputChange}
      />
    </div>
  );
}

export default App;
