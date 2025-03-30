import { getTaskById } from '@/apis/task';
import { mapDbTaskToFrontend } from '@/lib/utils';
import { Task } from '@/types/types';
import { useEffect, useState } from 'react';

export const useTaskDetailController = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState<Task | null>(null);

  const onGetTask = async () => {
    setLoading(true);
    try {
      const result = await getTaskById(Number(id));
      if (result) {
        const transformedTasks = mapDbTaskToFrontend(result);
        setTask(transformedTasks);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetTask();
  }, []);

  return {
    loading,
    task,
  };
};
