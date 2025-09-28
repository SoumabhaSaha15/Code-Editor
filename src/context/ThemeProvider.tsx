import { ThemeContext } from "./ThemeContext";
import { type ReactNode, useState } from "react";
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  });

  return (
    <ThemeContext.Provider value={{
      theme, toggleTheme: () => {
        setTheme(prevTheme => {
          const newTheme = prevTheme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme); // Save to localStorage
          const lightTheme = document.querySelector<HTMLStyleElement>('style[data-vite-dev-id*="md-light-indigo"]');
          const darkTheme = document.querySelector<HTMLStyleElement>('style[data-vite-dev-id*="md-dark-indigo"]');
          if (newTheme === 'dark') {
            if (lightTheme) lightTheme.disabled = true;
            if (darkTheme) darkTheme.disabled = false;
          } else {
            if (lightTheme) lightTheme.disabled = false;
            if (darkTheme) darkTheme.disabled = true;
          }
          return newTheme;
        });
      }
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;