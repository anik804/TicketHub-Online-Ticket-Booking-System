"use client";
import React, { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import { AiFillMoon, AiFillSun } from "react-icons/ai";

export default function ThemeToggler({ className }) {
  const context = useContext(ThemeContext);

  if (!context) return null;

  const { theme, toggleTheme } = context;

  return (
    <div
      role="button"
      className={`${className} rounded-full size-10 flex justify-center items-start  text-primary text-2xl overflow-hidden cursor-pointer text-shadow-xs`}
      title={`Toggle ${theme === "light" ? "Dark" : "Light"}`}
      onClick={toggleTheme}
    >
      <span
        className={`flex flex-col ${
          theme === "light" ? "translate-y-0" : "-translate-y-10"
        } transform transition-all duration-500 ease-in-out`}
      >
        <span className="size-10 flex justify-center items-center">
          <AiFillMoon />
        </span>
        <span className="size-10 flex justify-center items-center">
          <AiFillSun />
        </span>
      </span>
    </div>
  );
}
