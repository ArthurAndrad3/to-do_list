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
    <div className="w-11/12 max-w-4xl bg-dracula-headerCard min-h-[70vh] p-8 rounded-xl shadow-2xl mt-4 flex flex-col gap-4 items-center">
      <div className="flex w-full relative">
        <input
          type="text"
          id="taskInput"
          className="w-full bg-dracula-inputBubble h-10 pl-4 pr-28 text-md sm:text:lg border-2 
           rounded-lg  text-dracula-text border-none focus:ring-2 focus:outline-none 
             focus:ring-dracula-purple "
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Adicionar uma Tarefa"
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2 bg-foam text-ashes border-none py-1 px-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out text-sm text-dracula-text hover:bg-dracula-purple"
          onClick={handleAddTask}
        >
          <CirclePlus className="text-sm text-dracula-text" />
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
