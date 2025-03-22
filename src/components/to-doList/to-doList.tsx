import "./to-doList.css";
import { CirclePlus } from "lucide-react";
import TaskCard from "./taskCard/taskCard";
import { useState, useEffect } from "react";
import ErrorNotification from "../ErrorMensage/ErrorNotification";

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}
interface ToDoListProps {
  filterText: string;
  filterStatus: string;
}

const ToDoList: React.FC<ToDoListProps> = ({ filterText, filterStatus }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? (JSON.parse(storedTasks) as Task[]) : [];
  });

  const [error, setError] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const filteredTasks = tasks.filter((task) => {
    const matchesText = task.description
      .toLowerCase()
      .includes(filterText.toLowerCase());
    const matchesStatus =
      filterStatus === "todos" ||
      (filterStatus === "concluidos" && task.isCompleted) ||
      (filterStatus === "nao-concluidos" && !task.isCompleted);
    return matchesText && matchesStatus;
  });

  const handleToggleComplete = (id: number) => {
    setTasks((prevTasks: Task[]) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    setTasks((prevTasks: Task[]) => prevTasks.filter((task) => task.id !== id));
  };

  const handleAddTask = () => {
    const inputElement = document.getElementById(
      "taskInput"
    ) as HTMLInputElement;
    const newTask = inputElement.value.trim();

    if (newTask === "") {
      setError(true);
      setErrorMessage("Campo vazio, por favor digite uma tarefa");
      return;
    }

    const isDuplicate = tasks.some(
      (task) => task.description.toLowerCase() === newTask.toLowerCase()
    );
    if (isDuplicate) {
      setError(true);
      setErrorMessage("Esta tarefa já existe!");
      return;
    }

    setTasks((prevTasks: Task[]) => [
      ...prevTasks,
      { id: Date.now(), description: newTask, isCompleted: false },
    ]);

    setError(false);
    setErrorMessage(null);
    inputElement.value = "";
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="card">
      <div className="addTo-Do-container">
        <input
          type="text"
          id="taskInput"
          className="addTo-Do"
          placeholder="Adicionar uma Tarefa"
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <button className="addTo-Do-button" onClick={handleAddTask}>
          <CirclePlus className="addTo-Do-icon" />
          Adicionar
        </button>
      </div>

      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          description={task.description}
          isCompleted={task.isCompleted}
          onToggleComplete={() => handleToggleComplete(task.id)}
          onDelete={() => handleDelete(task.id)}
        />
      ))}

      {error && errorMessage && (
        <ErrorNotification
          message={errorMessage}
          onClose={() => setError(false)}
        />
      )}
    </div>
  );
};

export default ToDoList;
