'use client';

import InsightItem from '@/components/insight-item';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useInsightController } from '@/hooks/useInsightController';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function InsightList() {
  const { insights, onSearchInsights, onDeleteInsight } =
    useInsightController();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSearchInsights(searchTerm);
  };

  return (
    <div className="flex grow flex-col">
      <div className="flex flex-row items-center justify-between gap-4">
        <form className="flex flex-1 items-center" onSubmit={handleSubmit}>
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" className="sr-only">
            검색
          </Button>
        </form>
        <Link
          href="/insight/create"
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          작성
        </Link>
      </div>
      <div className="my-8">
        {insights.length > 0 ? (
          insights.map((insight) => (
            <InsightItem
              key={insight.id}
              insight={insight}
              handleDelete={onDeleteInsight}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            아직 작성된 것이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
