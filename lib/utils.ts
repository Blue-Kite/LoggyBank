import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
