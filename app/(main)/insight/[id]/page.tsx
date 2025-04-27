'use client';

import { useInsightDetailController } from '@/hooks/useInsightDetailController';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

function HtmlComponent({ html }: { html: string }) {
  const safeHtml = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}

export default function DetailInsight({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { insight } = useInsightDetailController(resolvedParams.id);

  if (!insight) {
    return <div>데이터 없음</div>;
  }

  return (
    <div className="flex w-full flex-grow flex-col gap-4 bg-white py-8">
      {/* Insight Title */}
      <section className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800">{insight.title}</h1>
        <Link
          href={`/insight/${resolvedParams.id}/edit`}
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          수정
        </Link>
      </section>
      <HtmlComponent html={insight.content} />
      <section className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="mr-2" size={16} />
          <span>생성일: {dayjs(insight.createdAt).format('YYYY-MM-DD')}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="mr-2" size={16} />
          <span>수정일: {dayjs(insight.updatedAt).format('YYYY-MM-DD')}</span>
        </div>
      </section>
    </div>
  );
}
