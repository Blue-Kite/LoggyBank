import Link from 'next/link';
import dayjs from 'dayjs';
import { Trash } from 'lucide-react';
import { Review } from '@/types/types';

interface Props {
  review: Review;
  handleDelete: (id: number) => void;
}

export default function ReviewItem({ review, handleDelete }: Props) {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleDelete(Number(review.id));
  };

  return (
    <Link href={`/review/${review.id}`} className="block">
      <div className="flex items-center justify-between rounded-md border p-4 transition-shadow hover:shadow-md">
        <div>
          <h3 className="text-lg font-medium">{review.title}</h3>
          <p className="text-sm text-gray-500">
            {dayjs(review.createdAt).format('YYYY-MM-DD')}
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
