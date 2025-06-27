import './App.css';
import React, { useState, useEffect, createContext, useContext } from 'react';

// Tworzymy kontekst do zarządzania kolorem tła globalnie
const BackgroundColorContext = createContext();

function App() {
  // useState – licznik
  const [count, setCount] = useState(0);

  // useState – input value (wpisywany tekst / kolor)
  const [inputValue, setInputValue] = useState('');

  // useState – aktualny kolor tła
  const [bgColor, setBgColor] = useState('#0e0e0e');

  // Funkcja inkrementująca licznik
  const incrementCount = () => {
    setCount(count + 1);
  };

  // Funkcja obsługująca zmiany w polu input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // useEffect – sprawdza, czy wpisany inputValue to poprawny HEX i ustawia tło
  useEffect(() => {
    console.log('Input Value:', inputValue);
    if (/^#[0-9A-F]{6}$/i.test(inputValue) || /^#[0-9A-F]{3}$/i.test(inputValue)) {
      console.log('Valid Hex Color:', inputValue);
      setBgColor(inputValue);
    } else {
      console.log('Invalid Hex Color');
    }
  }, [inputValue]);

  // Funkcja zwracająca jasność tła i sugerowany kolor fontu (czarny lub biały)
  const getBackgroundContrast = (color) => {
    const hex = color.replace('#', '');
    let r = 0, g = 0, b = 0;

    // Obsługa formatu #fff
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    }
    // Obsługa formatu #ffffff
    else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Zwracamy typ tła i kolor fontu
    return brightness > 155
      ? { bgType: 'light', fontColor: '#111' }
      : { bgType: 'dark', fontColor: '#fff' };
  };

  const { bgType, fontColor } = getBackgroundContrast(bgColor);

  return (
    <BackgroundColorContext.Provider value={{ bgColor, setBgColor }}>
      <div
        className={`App ${bgType}-background`}
        style={{ backgroundColor: bgColor, color: fontColor }}
      >
        <header className="App-header">
          <h1>React Hooks Demo</h1>

          <a className="App-link" href='https://opengateweb.com/portfolio/' target="_blank" rel="noopener noreferrer">
            ← Powrót do Portfolio
          </a>

          {/* useState Hook */}
          <h2>React useState Hook Example</h2>
          <p>Count: {count}</p>
          <button onClick={incrementCount}>Increment</button>

          {/* useEffect Hook */}
          <h2>React useEffect Hook Example</h2>
          <input
            type="text"
            placeholder="Input hex color..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <p>Wprowadzone dane: {inputValue}</p>

          {/* useContext Hook */}
          <h2>React useContext Hook Example</h2>
          <BackgroundColorInput />

          <h2>Przykładowe kolory tła:</h2>
          <ul>
            <li>#000000 – black</li>
            <li>#78b257 – green</li>
            <li>#ea0e3a – red</li>
            <li>#0000ff – blue</li>
            <li>#ffffff – white</li>
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
        placeholder="Input color formatted #ddd or #dddddd..."
        onChange={handleLocalInputChange}
      />
    </div>
  );
}

export default App;
