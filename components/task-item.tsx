import Link from 'next/link';
import dayjs from 'dayjs';
import { Trash } from 'lucide-react';
import { Task } from '@/types/types';

interface TaskItemProps {
  task: Task;
  handleDelete: (id: number) => void;
}

export default function TaskItem({ task, handleDelete }: TaskItemProps) {
  const handleDeleteTaskClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleDelete(Number(task.id));
  };

  return (
    <Link href={`/task/${task.id}`} className="block">
      <div className="flex items-center justify-between rounded-md border p-4 transition-shadow hover:shadow-md">
        <div>
          <h3 className="text-lg font-medium">{task.title}</h3>
          <p className="text-sm text-gray-500">
            {dayjs(task.createdAt).format('YYYY-MM-DD')}
          </p>
        </div>
        <Trash
          onClick={handleDeleteTaskClick}
          size={20}
          className="cursor-pointer"
        />
      </div>
    </Link>
  );
}
