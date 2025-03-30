import { deleteTask, getTasks, getTasksBySearch } from '@/apis/task';
import { mapDbTaskToFrontend } from '@/lib/utils';
import { Task } from '@/types/types';
import { useEffect, useState } from 'react';

export const useTaskController = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  const onGetTasks = async () => {
    setLoading(true);
    try {
      const result = await getTasks();
      if (result) {
        const transformedTasks = result.map(mapDbTaskToFrontend);
        setTasks(transformedTasks);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSearchTasks = async (term: string) => {
    if (term) {
      const result = await getTasksBySearch(term);
      if (result) {
        const transformedTasks = result.map(mapDbTaskToFrontend);
        setTasks(transformedTasks);
      }
    } else {
      await onGetTasks();
    }
  };

  const onDeleteTask = async (id: number) => {
    await deleteTask(id);
    await onGetTasks();
  };

  useEffect(() => {
    onGetTasks();
  }, []);

  return {
    loading,
    tasks,
    onSearchTasks,
    onDeleteTask,
  };
};
