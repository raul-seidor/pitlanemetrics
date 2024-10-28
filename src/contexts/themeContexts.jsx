import React, { createContext, useState } from "react";

const ThemeContext = createContext();

/**
 * ThemeProvider component that provides the theme context to its children.
 * Allows toggling between 'light' and 'dark' themes.
 *
 * @param {React.ReactNode} children - The child components that will have access to the theme context.
 * @returns {JSX.Element} A provider component that wraps its children with a theme context.
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // 'light' o 'dark'

  /**
   * Toggle the theme between 'light' and 'dark'.
   *
   * @returns {void}
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access the theme context. Returns an object with the current theme (light or dark)
 * and a function to toggle the theme.
 *
 * @returns {Object} An object with the following properties:
 *   - theme: The current theme as a string ('light' or 'dark')
 *   - toggleTheme: A function to toggle the theme
 */
export const useTheme = () => {
  return React.useContext(ThemeContext);
};
