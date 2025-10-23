'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        const applyTheme = (theme) => {
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(theme);
            setTheme(theme);
        }

        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            applyTheme(systemPrefersDark.matches ? 'dark' : 'light');
        }
        const handleChange = (e) => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        }

        systemPrefersDark.addEventListener('change', handleChange);
        return () => {
            systemPrefersDark.removeEventListener('change', handleChange);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme);
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Prevent rendering before theme is determined (optional, for SSR hydration issues)
    if (!theme) return null;

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}
export const useTheme = () => useContext(ThemeContext);