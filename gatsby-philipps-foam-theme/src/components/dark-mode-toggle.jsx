import React, { useState } from 'react';
import useThemeState from '../state/useThemeState';
import './dark-mode-toggle.css';

const DARK_MODE = 'dark';
const LIGHT_MODE = 'light';

const DarkModeToggle = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { theme, setTheme } = useThemeState();
  const isDark = theme === DARK_MODE;

  if (!isInitialized) {
    setTheme(theme || LIGHT_MODE);
    setIsInitialized(true);
  }

  const toggleTheme = () => {
    const newMode = isDark ? LIGHT_MODE : DARK_MODE;
    setTheme(newMode);
  };

  return (
    <label
      htmlFor="dm-toggle"
      className="dark-mode-toggle"
      aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
      title={isDark ? 'Activate light mode' : 'Activate dark mode'}
    >
      <input
        id="dm-toggle"
        type="checkbox"
        checked={!isDark}
        onChange={toggleTheme}
      />
      <div />
    </label>
  );
};

export default DarkModeToggle;
