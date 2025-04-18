import { getUser } from '@/actions/auth';
import {
  createTask,
  deleteTask,
  getTasks,
  getTasksBySearch,
  updateTask,
} from '@/actions/task';
import { mapDbTaskToFrontend } from '@/lib/utils';
import { Task, TaskParams } from '@/types/types';
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
      console.error('Failed to get tasks:', error);
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

  const onCreateTask = async ({
    title,
    timeline,
    todoDescription,
    doneDescription,
  }: TaskParams) => {
    const user = await getUser();

    if (user) {
      try {
        await createTask({
          title,
          timeline,
          todoDescription,
          doneDescription,
          user_id: user.id,
        });

        await onGetTasks();
      } catch (error) {
        console.error('Failed to create task:', error);
      }
    }
  };

  const onUpdateTask = async (
    id: number,
    { title, timeline, todoDescription, doneDescription }: TaskParams,
  ) => {
    try {
      await updateTask(id, {
        title,
        timeline,
        todoDescription,
        doneDescription,
      });

      await onGetTasks();
    } catch (error) {
      console.error('Failed to update task:', error);
      return false;
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
    onCreateTask,
    onUpdateTask,
  };
};
