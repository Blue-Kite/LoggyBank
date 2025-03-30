import { Task, TaskDto, TimeBlock } from '@/types/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mapDbTaskToFrontend = (dbTask: TaskDto): Task => {
  let timelineData: TimeBlock[] = [];

  if (dbTask.timeline && Array.isArray(dbTask.timeline)) {
    timelineData = (dbTask.timeline as any[]).map((item) => ({
      startTime: typeof item.startTime === 'string' ? item.startTime : '',
      endTime: typeof item.endTime === 'string' ? item.endTime : '',
      description:
        typeof item.description === 'string' ? item.description : undefined,
    }));
  }

  return {
    id: dbTask.id.toString(),
    title: dbTask.title,
    timeline: timelineData,
    todoDescription: dbTask.todo_description,
    doneDescription: dbTask.done_description,
    createdAt: new Date(dbTask.created_at),
    updatedAt: new Date(dbTask.updated_at),
    deletedAt: dbTask.deleted_at ? new Date(dbTask.deleted_at) : null,
  };
};

export const generateDefaultTimeBlocks = (): TimeBlock[] => {
  const defaultBlocks: TimeBlock[] = [];

  // default
  const hours = [
    { start: '09:00', end: '10:00' },
    { start: '10:00', end: '11:00' },
    { start: '11:00', end: '12:00' },
    { start: '13:00', end: '14:00' },
    { start: '14:00', end: '15:00' },
    { start: '15:00', end: '16:00' },
    { start: '16:00', end: '17:00' },
    { start: '17:00', end: '18:00' },
  ];

  return hours.map((hour) => ({
    startTime: hour.start,
    endTime: hour.end,
    description: hour.start === '12:00' ? '점심시간' : '',
  }));
};
