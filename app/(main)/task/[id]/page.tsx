'use client';

import dayjs from 'dayjs';
import { Clock, Calendar, FileText, Check } from 'lucide-react';
import Link from 'next/link';
import { useTaskDetailController } from '@/hooks/useTaskDetailController';
import { use } from 'react';

export default function DetailTask({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { task } = useTaskDetailController(resolvedParams.id);

  if (!task) {
    return <div>데이터 없음</div>;
  }

  return (
    <div className="flex w-full flex-grow flex-col gap-4 bg-white py-8">
      {/* Task Title */}
      <section className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800">{task.title}</h1>
        <Link
          href={`/task/${resolvedParams.id}/edit`}
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          수정
        </Link>
      </section>

      {/* Timeline Section */}
      <section className="mb-6">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-700">
          <Clock className="text-blue-500" size={20} />
          타임라인
        </h2>
        <div className="space-y-2">
          {task.timeline.map((block, index) => (
            <div
              key={index}
              className="flex items-center gap-5 rounded-md bg-gray-100 p-3"
            >
              <span className="w-[110px] font-medium text-gray-700">
                {block.startTime} - {block.endTime}
              </span>
              {block.description && (
                <p className="text-sm text-gray-600">{block.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Todo Description */}
      <section className="mb-6">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-700">
          <FileText className="text-green-500" size={20} />
          앞으로 해야할 일
        </h2>
        <p className="rounded-md bg-gray-50 p-3 text-gray-600">
          {task.todoDescription}
        </p>
      </section>

      {/* Done Description */}
      <section className="mb-6">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-700">
          <Check className="text-purple-500" size={20} />
          오늘 한 일
        </h2>
        <p className="rounded-md bg-gray-50 p-3 text-gray-600">
          {task.doneDescription}
        </p>
      </section>

      {/* Metadata */}
      <section className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="mr-2" size={16} />
          <span>생성일: {dayjs(task.createdAt).format('YYYY-MM-DD')}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="mr-2" size={16} />
          <span>수정일: {dayjs(task.updatedAt).format('YYYY-MM-DD')}</span>
        </div>
      </section>
    </div>
  );
}
