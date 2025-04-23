'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useReviewController } from '@/hooks/useReviewController';
import { useReviewDetailController } from '@/hooks/useReviewDetailController';
import { FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, use, useEffect, useState } from 'react';

export default function EditReview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const { review } = useReviewDetailController(id);
  const { onUpdateReview } = useReviewController();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (review) {
      setTitle(review.title);
      setContent(review.content);
    }
  }, [review]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await onUpdateReview(Number(id), {
        title,
        content,
      });

      router.push(`/review/${id}`);
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow w-full py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">리뷰 수정</h1>

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
            className="block mb-2 font-medium text-gray-700 flex items-center"
          >
            <FileText className="mr-2 text-purple-500" size={20} />
            내용
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="리뷰 내용을 작성해주세요"
            className="min-h-[300px]"
            required
          />
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            취소
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? '저장 중...' : '저장'}
          </Button>
        </div>
      </form>
    </div>
  );
}
