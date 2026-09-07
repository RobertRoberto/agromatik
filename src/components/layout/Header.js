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
    <header className="flex h-20 items-center justify-between border-b border-border bg-surface px-8">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Agromatik
        </h2>

        <p className="text-sm text-muted">
          Gestión agrícola inteligente
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden w-72 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 lg:flex">
          <Search
            size={18}
            className="text-muted"
          />

          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
          />
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-surface-hover"
          aria-label="Notificaciones"
        >
          <Bell size={20} />
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-surface-hover"
          aria-label="Cambiar tema"
        >
          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-surface-hover"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
            <User size={19} />
          </div>

          <span className="hidden text-sm font-medium md:block">
            Usuario
          </span>
        </button>
      </div>
    </header>
  );
}