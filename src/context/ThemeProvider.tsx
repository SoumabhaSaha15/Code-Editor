import { ThemeContext } from "./ThemeContext";
import { type ReactNode, useState, useEffect, useCallback } from "react";

type Theme = 'light' | 'dark';

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });

  const findThemeElements = useCallback(() => {
    const elements = {
      light: null as HTMLElement | null,
      dark: null as HTMLElement | null
    };

    // Try different selectors for both dev and prod
    ['link[href*="md-light-indigo"]',
      'style[data-vite-dev-id*="md-light-indigo"]',
      'link[href*="/md-light-indigo"]'].some(selector => {
        elements.light = document.querySelector(selector);
        return elements.light !== null;
      });

    ['link[href*="md-dark-indigo"]',
      'style[data-vite-dev-id*="md-dark-indigo"]',
      'link[href*="/md-dark-indigo"]'].some(selector => {
        elements.dark = document.querySelector(selector);
        return elements.dark !== null;
      });

    return elements;
  }, []);

  const applyTheme = useCallback((newTheme: Theme) => {
    const elements = findThemeElements();

    // 1. Update theme elements
    if (elements.light) {
      elements.light.setAttribute('media', newTheme === 'light' ? 'all' : 'not all');
    }
    if (elements.dark) {
      elements.dark.setAttribute('media', newTheme === 'dark' ? 'all' : 'not all');
    }

    // 2. Update document properties
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.style.colorScheme = newTheme;

    // 3. Store preference
    localStorage.setItem('theme', newTheme);
  }, [findThemeElements]);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme: () => setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;