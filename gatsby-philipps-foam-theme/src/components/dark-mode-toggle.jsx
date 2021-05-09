import React, { useState } from 'react';
import useThemeState from '../state/useThemeState';
import './dark-mode-toggle.css';

const BLACK_THEME = 'theme-black';
const WHITE_THEME = 'theme-white';

const DarkModeToggle = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { theme, setTheme } = useThemeState();
  const isDark = theme === BLACK_THEME;

  if (!isInitialized) {
    setTheme(theme || WHITE_THEME);
    setIsInitialized(true);
  }

  const toggleTheme = () => {
    const newMode = isDark ? WHITE_THEME : BLACK_THEME;
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
        className="header-button"
      />
      <div />
    </label>
  );
};

export default DarkModeToggle;
