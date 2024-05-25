import React, { useState, useEffect } from 'react';

const Header = () => {
  const [lightMode, setLightMode] = useState(() => {
    // Retrieve theme preference from localStorage or default to light mode
    const storedMode = localStorage.getItem('theme');
    return storedMode === 'dark';
  });

  useEffect(() => {
    // Apply theme mode to the <html> element
    const htmlElement = document.documentElement;
    if (lightMode) {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    } else {
      htmlElement.classList.remove('dark');
      htmlElement.classList.add('light');
    }
  }, [lightMode]);

  // Toggle theme mode and update localStorage
  const toggleVisibility = () => {
    setLightMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  return (
    <header>
      <nav className="h-[70px] px-14 flex justify-between items-center">
        <div className="flex items-center dark:text-white light:text-black gap-2 font-semibold text-lg">
          <i className="fab fa-youtube text-red-600 fa-2x"></i>
          YTConverter
        </div>
        <button onClick={toggleVisibility}>
          {lightMode ? (
            <i className="fas fa-sun fa-2x text-slate-300"></i>
          ) : (
            <i className="fas fa-moon fa-2x text-slate-700"></i>
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;
