import React, { createContext, useState, useMemo, useCallback, useEffect } from "react";

const ThemeContext = createContext();

/**
 * ThemeProvider component that provides the theme context to its children.
 * Allows toggling between 'light' and 'dark' themes.
 *
 * @param {React.ReactNode} children - The child components that will have access to the theme context.
 * @returns {JSX.Element} A provider component that wraps its children with a theme context.
 */
export const ThemeProvider = ({ children }) => {
  // Initialize from localStorage for persistence
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('app-theme');
      return savedTheme || "light";
    } catch (error) {
      console.warn('Error reading theme from localStorage:', error);
      return "light";
    }
  });

  // Persist changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('app-theme', theme);
    } catch (error) {
      console.warn('Error saving theme to localStorage:', error);
    }
  }, [theme]);

  /**
   * Toggle the theme between 'light' and 'dark'.
   * Optimized with useCallback to prevent recreation on every render.
   *
   * @returns {void}
   */
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access the theme context. Returns an object with the current theme (light or dark)
 * and a function to toggle the theme. The hook is optimized to prevent unnecessary re-renders.
 *
 * @returns {Object} An object with the following properties:
 *   - theme: The current theme as a string ('light' or 'dark')
 *   - toggleTheme: A memoized function to toggle the theme
 * @throws {Error} If used outside of ThemeProvider
 */
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};
