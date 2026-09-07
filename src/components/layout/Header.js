"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Bell,
  Moon,
  Sun,
  User,
} from "lucide-react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("agromatik-theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;

    if (darkMode) {
      html.classList.remove("dark");
      localStorage.setItem("agromatik-theme", "light");
      setDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("agromatik-theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <header
      className="
        h-20
        bg-[var(--agromatik-card)]
        border-b
        border-[var(--agromatik-border)]
        flex
        items-center
        justify-between
        px-8
      "
    >
      <div>
        <h2 className="text-xl font-semibold">
          Agromatik
        </h2>

        <p className="text-sm text-[var(--agromatik-text-secondary)]">
          Gestión agrícola inteligente
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-2
            border
            border-[var(--agromatik-border)]
            rounded-lg
            px-3
            py-2
            w-72
            bg-[var(--agromatik-card)]
          "
        >
          <Search size={18} />

          <input
            type="text"
            placeholder="Buscar..."
            className="
              w-full
              bg-transparent
              outline-none
              text-sm
            "
          />
        </div>

        <button
          className="
            w-10
            h-10
            flex
            items-center
            justify-center
            rounded-lg
            hover:bg-[var(--agromatik-green-light)]
            transition-colors
          "
        >
          <Bell size={20} />
        </button>

        <button
          onClick={toggleTheme}
          className="
            w-10
            h-10
            flex
            items-center
            justify-center
            rounded-lg
            hover:bg-[var(--agromatik-green-light)]
            transition-colors
          "
          aria-label="Cambiar tema"
        >
          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-lg
            px-3
            py-2
            hover:bg-[var(--agromatik-green-light)]
            transition-colors
          "
        >
          <div
            className="
                w-9
                h-9
                rounded-full
                bg-[var(--agromatik-green)]
                flex
                items-center
                justify-center
                text-white
            "
          >
            <User size={19} />
          </div>

          <span className="hidden md:block text-sm font-medium">
            Usuario
          </span>
        </button>

      </div>
    </header>
  );
}