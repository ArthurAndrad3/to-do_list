import "./App.css";
import Header from "../../components/Header/Header";
import ToDoList from "../../components/To-doList/to-doList";
import { useState } from "react";

const App: React.FC = () => {
  const [filterText, setFilterText] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");

  return (
    <>
      <Header setFilterText={setFilterText} setFilterStatus={setFilterStatus} />
      <ToDoList filterText={filterText} filterStatus={filterStatus} />
    </>
  );
};

export default App;
