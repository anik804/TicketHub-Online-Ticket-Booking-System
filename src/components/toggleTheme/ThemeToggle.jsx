'use client';
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="p-2 cursor-pointer rounded-md bg-gray-200 dark:bg-gray-700"
            aria-label="Toggle Theme"
        >
            {theme === "light" ? (
                <span title="Switch to dark mode">🌙</span>
            ) : (
                <span title="Switch to light mode">☀️</span>
            )}
        </button>
    );
}
