import Link from 'next/link';
import dayjs from 'dayjs';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <Link href={`/task/${task.id}`} className="block">
      <div className="mb-6 border rounded-md p-4 hover:shadow-md transition-shadow">
        <h3 className="font-medium text-lg">{task.title}</h3>
        <p className="text-sm text-gray-500">
          {dayjs(task.createdAt).format('YYYY-MM-DD')}
        </p>
      </div>
    </Link>
  );
}
