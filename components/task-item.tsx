import Link from 'next/link';
import dayjs from 'dayjs';
import { Trash } from 'lucide-react';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <Link href={`/task/${task.id}`} className="block">
      <div className="flex border rounded-md p-4 hover:shadow-md transition-shadow justify-between items-center">
        <div>
          <h3 className="font-medium text-lg">{task.title}</h3>
          <p className="text-sm text-gray-500">
            {dayjs(task.createdAt).format('YYYY-MM-DD')}
          </p>
        </div>
        <Trash size={20} />
      </div>
    </Link>
  );
}
