'use client';

import Editor from '@/components/editor';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInsightController } from '@/hooks/useInsightController';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';

export default function CreateInsight() {
  const router = useRouter();
  const { onCreateInsight } = useInsightController();

  const quillRef = useRef<ReactQuill | null>(null);

  const [, setSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await onCreateInsight({
        title,
        content,
      });

      router.push('/insight');
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // const handleDeleteFile = async () => {
  //   try {
  //     const data = await deleteFile('newneek.jpeg');
  //   } catch (error) {
  //     console.log('error');
  //   }
  // };

  return (
    <div className="flex w-full grow flex-col">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        새 인사이트 작성
      </h1>

      {/*임시버튼 */}
      {/* <Button onClick={handleDeleteFile}>파일삭제</Button> */}

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
        {/* 에디터  */}
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
          <Button type="submit">생성</Button>
        </div>
      </form>
    </div>
  );
}
