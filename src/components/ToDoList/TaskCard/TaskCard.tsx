import "./taskCard.css";
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
    <div className={`task-card ${isCompleted ? "completed" : ""}`}>
      <button className="task-toggle" onClick={onToggleComplete}>
        {isCompleted ? (
          <CheckCircle size={20} color="gray" />
        ) : (
          <Circle size={20} color="gray" />
        )}
      </button>
      <p className={`task-desc ${isCompleted ? "completed" : ""}`}>
        {description}
      </p>
      <button className="task-delete" onClick={onDelete}>
        <Trash size={18} color="#ff4d4d" />
        Remover
      </button>
    </div>
  );
};

export default TaskCard;
