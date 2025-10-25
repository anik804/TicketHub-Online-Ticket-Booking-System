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
      className={`${className} rounded-full size-8 flex justify-center items-start bg-base-100 border border-primary text-primary text-lg overflow-hidden cursor-pointer`}
      title={`Toggle ${theme === "light" ? "Dark" : "Light"}`}
      onClick={toggleTheme}
    >
      <span
        className={`flex flex-col ${
          theme === "light" ? "translate-y-0" : "-translate-y-8"
        } transform transition-all duration-500 ease-in-out`}
      >
        <span className="size-8 flex justify-center items-center">
          <AiFillMoon />
        </span>
        <span className="size-8 flex justify-center items-center">
          <AiFillSun />
        </span>
      </span>
    </div>
  );
}
