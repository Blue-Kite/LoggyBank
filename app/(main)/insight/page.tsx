'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function InsightList() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  const insights: string[] = [];

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-row justify-between items-center gap-4">
        <form className="flex items-center flex-1" onSubmit={handleSubmit}>
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
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          작성
        </Link>
      </div>
      <div className="my-8">
        {insights.length > 0 ? (
          insights.map((_, idx) => <div key={idx}>insight</div>)
        ) : (
          <p className="text-center text-gray-500">
            아직 작성된 것이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
