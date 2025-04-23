'use client';

import { useReviewDetailController } from '@/hooks/useReviewDetailController';
import dayjs from 'dayjs';
import { Calendar, FileText } from 'lucide-react';
import Link from 'next/link';

import { use } from 'react';

export default function DetailReview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { review } = useReviewDetailController(resolvedParams.id);

  if (!review) {
    return <div>데이터 없음</div>;
  }

  return (
    <div className="flex flex-col flex-grow gap-4 w-full py-8 bg-white">
      <section className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800">{review.title}</h1>
        <Link
          href={`/review/${resolvedParams.id}/edit`}
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          수정
        </Link>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <FileText className=" text-purple-500" size={20} />
          컨텐츠
        </h2>
        <div className="text-gray-600 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">
          {review.content}
        </div>
      </section>

      <section className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="mr-2" size={16} />
          <span>생성일: {dayjs(review.createdAt).format('YYYY-MM-DD')}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="mr-2" size={16} />
          <span>수정일: {dayjs(review.updatedAt).format('YYYY-MM-DD')}</span>
        </div>
      </section>
    </div>
  );
}
