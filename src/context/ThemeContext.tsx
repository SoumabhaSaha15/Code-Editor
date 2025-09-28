import { createContext, useContext, type Context } from "react";
export type ThemeContextProps = {
  theme: 'light' | 'dark';
  toggleTheme:() => void;
};
export const ThemeContext: Context<ThemeContextProps> = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => { }
});
export const useTheme = () => useContext<ThemeContextProps>(ThemeContext);