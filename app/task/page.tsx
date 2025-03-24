'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { generateDefaultTimeBlocks } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import { Clock, Plus, Trash2 } from 'lucide-react';

export default function CreateTask() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [doneDescription, setDoneDescription] = useState('');
  const [timeline, setTimeline] = useState<TimeBlock[]>(
    generateDefaultTimeBlocks(),
  );

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      id: uuidv4(),
      title,
      todoDescription,
      doneDescription,
      timeline: timeline.filter((block) => block.startTime && block.endTime),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // TODO: 실제 API 호출
    console.log('New Task:', newTask);

    // 작성 완료 후 목록 페이지로 이동
    router.push('/task');
  };

  return (
    <div className="flex flex-col flex-grow w-full max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">새 태스크 생성</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제목 입력 */}
        <div>
          <label
            htmlFor="title"
            className="block mb-2 font-medium text-gray-700"
          >
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="태스크 제목"
            required
          />
        </div>

        {/* 타임라인 섹션 */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="font-medium text-gray-700 flex items-center">
              <Clock className="mr-2 text-blue-500" size={20} />
              타임라인
            </label>
            <button
              type="button"
              onClick={addTimeBlock}
              className="flex items-center text-green-600 hover:text-green-700"
            >
              <Plus className="mr-1" size={16} />
              블록 추가
            </button>
          </div>
          <div className="space-y-2">
            {timeline.map((block, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md"
              >
                {index >= 8 ? (
                  <input
                    type="time"
                    value={block.startTime}
                    onChange={(e) =>
                      updateTimeBlock(index, { startTime: e.target.value })
                    }
                    className="p-1 border rounded"
                  />
                ) : (
                  <span className="p-1 text-gray-600">{block.startTime}</span>
                )}

                {index >= 8 ? (
                  <input
                    type="time"
                    value={block.endTime}
                    onChange={(e) =>
                      updateTimeBlock(index, { endTime: e.target.value })
                    }
                    className="p-1 border rounded"
                  />
                ) : (
                  <span className="p-1 text-gray-600">{block.endTime}</span>
                )}

                <input
                  type="text"
                  placeholder="설명"
                  value={block.description || ''}
                  onChange={(e) =>
                    updateTimeBlock(index, { description: e.target.value })
                  }
                  className="flex-grow p-1 border rounded"
                />

                {index >= 8 && (
                  <button
                    type="button"
                    onClick={() => removeTimeBlock(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 할 일 설명 */}
        <div>
          <label
            htmlFor="todoDescription"
            className="block mb-2 font-medium text-gray-700"
          >
            할 일 설명
          </label>
          <textarea
            id="todoDescription"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
            className="w-full p-2 border rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 완료 설명 */}
        <div>
          <label
            htmlFor="doneDescription"
            className="block mb-2 font-medium text-gray-700"
          >
            완료 설명
          </label>
          <textarea
            id="doneDescription"
            value={doneDescription}
            onChange={(e) => setDoneDescription(e.target.value)}
            className="w-full p-2 border rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            생성
          </button>
        </div>
      </form>
    </div>
  );
}
