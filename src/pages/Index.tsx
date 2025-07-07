
import React from "react";
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import ScrollingTicker from "@/components/ScrollingTicker";
import { useTaskData } from "@/hooks/useTaskData";

const Index = () => {
  const { tasks, announcements, isLoading, error } = useTaskData();

  return (
    <div className="min-h-screen bg-green-50 relative">
      <div className="container mx-auto px-4 pt-8 pb-16">
        <Header />
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            {error}
          </div>
        )}
        
        <TaskList 
          tasks={tasks} 
          isLoading={isLoading}
        />
      </div>

      <ScrollingTicker 
        messages={announcements} 
        speed={60}
      />
    </div>
  );
};

export default Index;
