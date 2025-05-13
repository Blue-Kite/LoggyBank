'use client';

import Editor from '@/components/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInsightController } from '@/hooks/useInsightController';
import { useInsightDetailController } from '@/hooks/useInsightDetailController';
import { useRouter } from 'next/navigation';
import { FormEvent, use, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';

export default function EditInsight({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const { onUpdateInsight } = useInsightController();
  const { insight } = useInsightDetailController(id);

  const quillRef = useRef<ReactQuill | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (insight) {
      setTitle(insight.title);
      setContent(insight.content);

      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      const extractedImages: string[] = [];
      let match;

      while ((match = imgRegex.exec(insight.content)) !== null) {
        extractedImages.push(match[1]);
      }

      setImages(extractedImages);
    }
  }, [insight]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!insight) {
        throw new Error('인사이트 데이터가 없습니다.');
      }

      await onUpdateInsight(Number(id), {
        title,
        content,
      });

      router.push(`/insight/${id}`);
    } catch (error) {
      console.error('Failed to update insight:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full grow flex-col py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">인사이트 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제목 입력 */}
        <div>
          <Label htmlFor="title">제목</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* 에디터 */}
        <Editor
          quillRef={quillRef}
          content={content}
          setContent={setContent}
          images={images}
          setImages={setImages}
        />
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
