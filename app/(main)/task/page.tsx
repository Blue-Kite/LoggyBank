'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { generateDefaultTimeBlocks } from '@/lib/utils';
import { Clock, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { TimeBlock } from '@/types/types';
import { useTaskController } from '@/hooks/useTaskController';

export default function CreateTask() {
  const router = useRouter();
  const { onCreateTask } = useTaskController();

  const [title, setTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [doneDescription, setDoneDescription] = useState('');
  const [timeline, setTimeline] = useState<TimeBlock[]>(
    generateDefaultTimeBlocks(),
  );
  const [, setSubmitting] = useState(false);

  const updateTimeBlock = (index: number, updates: Partial<TimeBlock>) => {
    const newTimeline = [...timeline];
    newTimeline[index] = { ...newTimeline[index], ...updates };
    setTimeline(newTimeline);
  };

  const addTimeBlock = () => {
    setTimeline([...timeline, { startTime: '', endTime: '', description: '' }]);
  };

  const removeTimeBlock = (index: number) => {
    const newTimeline = timeline.filter((_, i) => i !== index);
    setTimeline(newTimeline);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const validTimeline = timeline.filter(
        (block) => block.startTime && block.endTime,
      );

      await onCreateTask({
        title,
        todoDescription,
        doneDescription,
        timeline: validTimeline,
      });

      router.push('/');
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow w-full ">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">새 태스크 작성</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제목 입력 */}
        <div>
          <Label htmlFor="title">제목</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="태스크 제목"
            required
          />
        </div>

        {/* 타임라인 섹션 */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <Label className="font-medium text-gray-700 flex items-center">
              <Clock className="mr-2 text-blue-500" size={20} />
              타임라인
            </Label>
            <Button onClick={addTimeBlock}>
              <Plus className="mr-1" size={16} />
              블록 추가
            </Button>
          </div>
          <div className="space-y-2">
            {timeline.map((block, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md"
              >
                {index >= 8 ? (
                  <Input
                    type="time"
                    value={block.startTime}
                    onChange={(e) =>
                      updateTimeBlock(index, { startTime: e.target.value })
                    }
                    className="w-30"
                  />
                ) : (
                  <span className="p-1 text-gray-600">{block.startTime}</span>
                )}

                {index >= 8 ? (
                  <Input
                    type="time"
                    value={block.endTime}
                    onChange={(e) =>
                      updateTimeBlock(index, { endTime: e.target.value })
                    }
                    className="w-30"
                  />
                ) : (
                  <span className="p-1 text-gray-600">{block.endTime}</span>
                )}

                <Input
                  type="text"
                  placeholder="설명"
                  value={block.description || ''}
                  onChange={(e) =>
                    updateTimeBlock(index, { description: e.target.value })
                  }
                  className="flex-grow"
                />

                {index >= 8 && (
                  <Button
                    onClick={() => removeTimeBlock(index)}
                    variant="outline"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 할 일 설명 */}
        <div>
          <Label
            htmlFor="todoDescription"
            className="block mb-2 font-medium text-gray-700"
          >
            앞으로 할 일
          </Label>
          <Textarea
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
          />
        </div>

        {/* 완료 설명 */}
        <div>
          <Label
            htmlFor="doneDescription"
            className="block mb-2 font-medium text-gray-700"
          >
            완료한 일
          </Label>
          <Textarea
            id="doneDescription"
            value={doneDescription}
            onChange={(e) => setDoneDescription(e.target.value)}
          />
        </div>

        {/* 제출 버튼 */}
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
