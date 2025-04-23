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
      <div className="flex border rounded-md p-4 hover:shadow-md transition-shadow justify-between items-center">
        <div>
          <h3 className="font-medium text-lg">{review.title}</h3>
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
