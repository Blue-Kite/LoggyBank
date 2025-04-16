'use client';

import Editor from '@/components/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';

export default function CreateInsight() {
  const router = useRouter();
  const quillRef = useRef<ReactQuill | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('title', title);
    console.log('content', content);
    console.log('images', images);
  };

  return (
    <div className="flex flex-col flex-grow w-full ">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        새 인사이트 작성
      </h1>
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
