'use client';

import dynamic from 'next/dynamic';
import { useCallback, useMemo } from 'react';
import type ReactQuill from 'react-quill-new';
import type { ComponentProps, RefObject } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import { uploadFile } from '@/actions/storage';

interface QuillProps extends ComponentProps<typeof ReactQuill> {
  forwardedRef: React.Ref<ReactQuill>;
}

const ReactQuillComponent = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill-new');

    const Component = ({ forwardedRef, ...props }: QuillProps) => (
      <RQ ref={forwardedRef} {...props} />
    );

    Component.displayName = 'ReactQuillComponent';
    return Component;
  },
  {
    ssr: false,
  },
);

interface Props {
  quillRef: RefObject<ReactQuill | null>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  images?: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Editor({
  quillRef,
  content,
  setContent,
  setImages,
}: Props) {
  const handleImageAdd = useCallback(async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];

      if (file) {
        try {
          const data = await uploadFile(file);
          if (data && quillRef && quillRef.current) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();

            const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
            if (range) {
              quill.insertEmbed(range.index, 'image', imageUrl);
              quill.setSelection(range.index + 1, 0);
              setImages((prevImages) => [...prevImages, imageUrl]);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
  }, [quillRef, setImages]);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const modules = useMemo(
    () => ({
      clipboard: {
        matchVisual: false,
      },
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['image'],
          ['link'],
        ],
        handlers: { image: handleImageAdd },
      },
    }),
    [handleImageAdd],
  );

  return (
    <ReactQuillComponent
      forwardedRef={quillRef}
      value={content}
      onChange={handleContentChange}
      theme="snow"
      modules={modules}
      formats={[
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'code-block',
        'link',
        'image',
        'color',
        'background',
        'align',
      ]}
    />
  );
}
