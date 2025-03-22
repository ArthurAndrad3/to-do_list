import React, { useState } from "react";
import { Search } from "lucide-react";

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
    <header className="w-screen h-[100px] bg-dracula-headerCard flex justify-center items-center gap-10 shadow-lg">
      <div className="relative max-w-[200px] sm:max-w-[30%]">
        <input
          type="text"
          className="bg-dracula-inputBubble text-dracula-text placeholder-dracula-text
           pl-10 pr-4 py-2 rounded-md border-none focus:outline-none focus:ring-2 w-full
           focus:ring-dracula-purple text-md sm:text:lg"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-dracula-text" />
      </div>
      <div className="max-w-[100px] sm:max-w-[200px] flex">
        <select
          className="bg-dracula-inputBubble w-full   text-dracula-text pl-1  py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-dracula-purple text-md sm:text:lg "
          onChange={handleFilterChange}
          defaultValue=""
        >
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
