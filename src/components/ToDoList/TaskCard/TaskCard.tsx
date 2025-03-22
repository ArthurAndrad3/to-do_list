import { CheckCircle, Circle, Trash } from "lucide-react";

interface TaskCardProps {
  id: number;
  description: string;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  description,
  isCompleted,
  onToggleComplete,
  onDelete,
}) => {
  return (
    <div
      className={`flex items-center justify-between bg-dracula-inputBubble p-2 w-full rounded-lg shadow-md transition-all duration-300 ${
        isCompleted ? "opacity-40" : ""
      }`}
    >
      <button
        className="bg-none border-none cursor-pointer flex items-center h-5"
        onClick={onToggleComplete}
      >
        {isCompleted ? (
          <CheckCircle size={20} className="text-dracula-text" />
        ) : (
          <Circle size={20} className="text-dracula-text" />
        )}
      </button>

      <p
        className={`flex-grow m-0 ml-2 text-dracula-text text-md sm:text:lg ${
          isCompleted ? "line-through" : ""
        }`}
      >
        {description}
      </p>

      <button
        className="bg-none border-none cursor-pointer  hover:bg-dracula-purple flex items-center gap-2 bg-gainsboro text-dracula-red px-2 py-1 rounded-lg text-md"
        onClick={onDelete}
      >
        <Trash size={18} color="#ff4d4d" />
        Remover
      </button>
    </div>
  );
};

export default TaskCard;
