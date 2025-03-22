import React, { useState } from "react";
import { Search } from "lucide-react";
import "./header.css";

interface HeaderProps {
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ setFilterText, setFilterStatus }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilterText(value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  return (
    <header className="header">
      <div className="search-container">
        <input
          type="text"
          className="search"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Search className="search-icon" />
      </div>
      <div className="filter-container">
        <select className="filter-select" onChange={handleFilterChange}>
          <option value="" disabled>
            Filtrar por...
          </option>
          <option value="todos">Todos</option>
          <option value="concluidos">Concluídos</option>
          <option value="nao-concluidos">Não Concluídos</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
