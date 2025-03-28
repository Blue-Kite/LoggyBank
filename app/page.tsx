import TaskItem from '@/components/task-item';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MOCK_TASK } from '@/mock/data';
import Link from 'next/link';

export default function Home() {
  const tasks = MOCK_TASK;

  return (
    <main className="flex flex-col flex-grow w-full max-w-4xl mx-auto py-8">
      <div className="flex flex-row justify-between items-center gap-4">
        <form className="flex items-center flex-1 ">
          <Input type="text" placeholder="업무일지 검색..." />
          <Button type="submit" className="sr-only">
            검색
          </Button>
        </form>
        <Link
          href="/task"
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          작성
        </Link>
      </div>
      <div className="my-6">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <p className="text-center text-gray-500">
            아직 작성된 업무일지가 없습니다.
          </p>
        )}
      </div>
    </main>
  );
}
