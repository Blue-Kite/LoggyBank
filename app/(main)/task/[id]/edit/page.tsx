'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTaskController } from '@/hooks/useTaskController';
import { useTaskDetailController } from '@/hooks/useTaskDetailController';
import { TimeBlock } from '@/types/types';
import { Clock, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, use, useEffect, useState } from 'react';

export default function EditTask({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const { task } = useTaskDetailController(id);
  const { onUpdateTask } = useTaskController();

  const [title, setTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [doneDescription, setDoneDescription] = useState('');
  const [timeline, setTimeline] = useState<TimeBlock[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setTodoDescription(task.todoDescription);
      setDoneDescription(task.doneDescription);
      setTimeline(task.timeline);
    }
  }, [task]);

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

      await onUpdateTask(Number(id), {
        title,
        timeline: validTimeline,
        todoDescription,
        doneDescription,
      });

      router.push(`/task/${id}`);
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-grow flex-col py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">태스크 수정</h1>

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
          <div className="mb-3 flex items-center justify-between">
            <Label className="flex items-center font-medium text-gray-700">
              <Clock className="mr-2 text-blue-500" size={20} />
              타임라인
            </Label>
            <Button type="button" onClick={addTimeBlock}>
              <Plus className="mr-1" size={16} />
              블록 추가
            </Button>
          </div>
          <div className="space-y-2">
            {timeline.map((block, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 rounded-md bg-gray-50 p-2"
              >
                <Input
                  type="time"
                  value={block.startTime}
                  onChange={(e) =>
                    updateTimeBlock(index, { startTime: e.target.value })
                  }
                  className="w-30"
                />

                <Input
                  type="time"
                  value={block.endTime}
                  onChange={(e) =>
                    updateTimeBlock(index, { endTime: e.target.value })
                  }
                  className="w-30"
                />

                <Input
                  type="text"
                  placeholder="설명"
                  value={block.description || ''}
                  onChange={(e) =>
                    updateTimeBlock(index, { description: e.target.value })
                  }
                  className="flex-grow"
                />

                <Button
                  type="button"
                  onClick={() => removeTimeBlock(index)}
                  variant="outline"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* 할 일 설명 */}
        <div>
          <Label
            htmlFor="todoDescription"
            className="mb-2 block font-medium text-gray-700"
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
            className="mb-2 block font-medium text-gray-700"
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
          <Button type="submit" disabled={submitting}>
            {submitting ? '저장 중...' : '저장'}
          </Button>
        </div>
      </form>
    </div>
  );
}
