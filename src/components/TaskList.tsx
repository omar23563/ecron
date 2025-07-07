import React from "react";
import { Check, Hourglass } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  title?: string;
  isLoading?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  title = (
    <h1 className="text-4xl font-extrabold text-teal-800 font-inter mb-8">
      Tâches du jour
    </h1>
  ),
  isLoading = false 
}) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("fr-FR");

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4">
        {title}
        <p className="text-base text-gray-500 mb-4">
          Chargement des tâches pour le {formattedDate}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 rounded-2xl bg-white/60 shadow animate-pulse">
              <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto px-4">
        {title}
        <Card className="p-8 rounded-2xl shadow-md text-center bg-white/80">
          <p className="text-2xl text-gray-500">Aucune tâche pour aujourd'hui.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {title}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map((task) => {
          const isDone = task.completed;
          const cardBg = isDone ? "bg-[#E6FAF0]" : "bg-[#FFF9E6]";
          const iconBg = isDone ? "bg-green-100" : "bg-yellow-100";
          const iconColor = isDone ? "text-green-600" : "text-yellow-600";
          const Icon = isDone ? Check : Hourglass;

          return (
            <Card
              key={task.id}
              className={`flex items-center gap-5 p-6 rounded-2xl shadow-md border-0 transition-colors ${cardBg}`}
            >
              <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${iconBg}`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <span className="text-2xl font-medium text-gray-800 font-semibold">
                {task.title}
              </span>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
