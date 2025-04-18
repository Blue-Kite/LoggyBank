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
    <div className="flex flex-col flex-grow gap-4 w-full py-8 bg-white">
      {/* Insight Title */}
      <section className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800">{insight.title}</h1>
        <Link
          href={`/insight/${resolvedParams.id}/edit`}
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
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
