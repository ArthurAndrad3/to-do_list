import "./ToDoList.css";
import { CirclePlus } from "lucide-react";
import TaskCard from "./TaskCard/TaskCard";
import { useEffect, useState } from "react";
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
  const [tasks, setTasks] = useState<Task[]>([]);

  const [taskInput, setTaskInput] = useState<string>("");

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
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleDelete = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleAddTask = () => {
    if (taskInput === "") {
      setErrorMessage("Campo vazio, por favor digite uma tarefa");
      return;
    }

    const isDuplicate = tasks.some(
      (task) => task.description.toLowerCase() === taskInput.toLowerCase()
    );
    if (isDuplicate) {
      setErrorMessage("Esta tarefa já existe!");
      return;
    }
    const newTasks = [
      ...tasks,
      { id: Date.now(), description: taskInput, isCompleted: false },
    ];
    setTasks(newTasks);

    localStorage.setItem("tasks", JSON.stringify(newTasks));

    setErrorMessage(null);
    setTaskInput("");
  };

  useEffect(() => {
    const localStorageTasks = localStorage.getItem("tasks");
    if (localStorageTasks) {
      setTasks(JSON.parse(localStorageTasks));
    }
  }, []);

  return (
    <div className="card">
      <div className="addTo-Do-container">
        <input
          type="text"
          id="taskInput"
          className="addTo-Do"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
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

      {errorMessage && (
        <ErrorNotification
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </div>
  );
};

export default ToDoList;
