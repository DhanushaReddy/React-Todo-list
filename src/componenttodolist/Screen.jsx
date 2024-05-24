import React, { useState } from 'react';
import './styles.css'
const Screen = ({ children }) => {
  const [screenLevel, setscreenLevel] = useState(1);

  const screenIn = () => {
    setscreenLevel(prevscreenLevel => Math.min(prevscreenLevel + 0.1, 3)); 
  };

  const screenOut = () => {
    setscreenLevel(prevscreenLevel => Math.max(prevscreenLevel - 0.1, 0.5)); 
  };

  const resetscreen = () => {
    setscreenLevel(1);
  };

  const containerStyle = {
    transform: `scale(${screenLevel})`,
    transformOrigin: '0 0',
    transition: 'transform 0.3s ease-in-out',
  };

  return (
    <div>
      <div className='screens'>
        <button onClick={screenIn}><i class="fa-solid fa-magnifying-glass-plus fa-2xl"></i></button>
        <button onClick={screenOut}><i class="fa-solid fa-magnifying-glass-minus fa-2xl"></i></button>
        <button onClick={resetscreen}>Reset </button>
      </div>
      <div style={containerStyle}>
        {children}
      </div>
    </div>
  );
};

export default Screen;
