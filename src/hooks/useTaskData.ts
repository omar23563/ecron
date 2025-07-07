import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useTaskData() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Use UTC date to match server time
        const today = new Date();
        const currentDay = today.getUTCDate();
        const currentMonth = today.getUTCMonth() + 1;
        const currentYear = today.getUTCFullYear();

        // Debug: log all tasks in the table
        const { data: allTasks } = await supabase.from("tasks_web").select("*");
        console.log("ALL TASKS IN DB:", allTasks);

        // Fetch tasks for today, including 'completed'
        const { data: tasksData, error: tasksError } = await supabase
          .from("tasks_web")
          .select("id, title, completed")
          .eq("day", currentDay)
          .eq("month", currentMonth)
          .eq("year", currentYear);

        console.log('Querying for:', { currentDay, currentMonth, currentYear });
        console.log('Tasks for today:', tasksData);

        if (tasksError) throw tasksError;

        // Fetch announcements (unchanged)
        const { data: announcementsData, error: announcementsError } = await supabase
          .from("tasks")
          .select("content");

        if (announcementsError) throw announcementsError;

        setTasks(tasksData || []);
        setAnnouncements((announcementsData || []).map((task: any) => task.content));
        setIsLoading(false);
      } catch (err: any) {
        setError("Erreur lors du chargement des données");
        setIsLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    // Real-time subscription for announcements
    const channel = supabase
      .channel('realtime-tasks-announcements')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        (payload) => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    tasks,
    announcements,
    isLoading,
    error
  };
}
