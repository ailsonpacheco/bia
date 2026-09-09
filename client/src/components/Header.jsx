import React from "react";
import { NavLink } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext.jsx";
import VersionInfo from "./VersionInfo";

const Header = ({ title }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <header className="header">
      <div className="header-content">
        <h1>{title}</h1>
        <nav className="header-nav">
          <NavLink to="/" end>Tarefas</NavLink>
          <NavLink to="/versao">Versão</NavLink>
          <NavLink to="/about">Sobre</NavLink>
        </nav>
      </div>
      <div className="header-controls">
        <VersionInfo />
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          title={isDarkMode ? "Tema claro" : "Tema escuro"}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

Header.defaultProps = {
  title: "BIA 2026",
};

export default Header;
