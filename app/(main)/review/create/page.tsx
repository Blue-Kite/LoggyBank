'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useReviewController } from '@/hooks/useReviewController';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function CreateReview() {
  const router = useRouter();
  const { onCreateReview } = useReviewController();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await onCreateReview({
        title,
        content,
      });

      router.push('/review');
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full grow flex-col">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">새 리뷰 작성</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제목 입력 */}
        <div>
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="리뷰 제목"
            required
          />
        </div>

        {/* 내용 */}
        <div>
          <Label
            htmlFor="content"
            className="mb-2 block font-medium text-gray-700"
          >
            내용
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="리뷰 내용을 작성해주세요"
            className="min-h-[200px]"
            required
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={submitting}
          >
            취소
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? '저장 중...' : '생성'}
          </Button>
        </div>
      </form>
    </div>
  );
}
