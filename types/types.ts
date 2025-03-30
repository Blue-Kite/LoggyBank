import { Database } from './database.types';

export type TaskDto = Database['public']['Tables']['task']['Row'];

export interface TimeBlock {
  startTime: string;
  endTime: string;
  description?: string;
}

export interface Task {
  id: string;
  title: string;
  timeline: TimeBlock[];
  todoDescription: string;
  doneDescription: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
}

export interface TaskParams {
  title: string;
  timeline: { startTime: string; endTime: string; description?: string }[];
  todoDescription: string;
  doneDescription: string;
}
