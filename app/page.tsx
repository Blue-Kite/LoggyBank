import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen mx-auto">
      <header className="border-b flex items-center justify-center px-6 py-4">
        <h1 className="text-2xl font-bold">LoggyBank</h1>
      </header>
      <main className="flex flex-col flex-grow w-full max-w-4xl mx-auto py-8">
        <div className="flex flex-row justify-between items-center gap-4">
          <form className="flex items-center flex-1 ">
            <input
              type="text"
              placeholder="업무일지 검색..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="sr-only">
              검색
            </button>
          </form>
          <Link
            href="/task"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            작성
          </Link>
        </div>
        <div className="mb-6">{/* 업무일지 리스트*/}</div>
      </main>
      <footer className="flex flex-col items-center justify-center gap-4 text-center print:hidden mb-3">
        <div className="flex justify-center gap-4">
          <Link href="https://github.com/Blue-Kite/LoggyBank" target="_blank">
            <FaGithub />
          </Link>
        </div>
        <div>
          © 2025. <span className="font-semibold">Kite</span> all rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
