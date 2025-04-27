import Link from 'next/link';
import dayjs from 'dayjs';
import { Trash } from 'lucide-react';
import { Insight } from '@/types/types';

interface Props {
  insight: Insight;
  handleDelete: (id: number) => void;
}

export default function InsightItem({ insight, handleDelete }: Props) {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleDelete(Number(insight.id));
  };

  return (
    <Link href={`/insight/${insight.id}`} className="block">
      <div className="flex items-center justify-between rounded-md border p-4 transition-shadow hover:shadow-md">
        <div>
          <h3 className="text-lg font-medium">{insight.title}</h3>
          <p className="text-sm text-gray-500">
            {dayjs(insight.createdAt).format('YYYY-MM-DD')}
          </p>
        </div>
        <Trash
          onClick={handleDeleteClick}
          size={20}
          className="cursor-pointer"
        />
      </div>
    </Link>
  );
}
