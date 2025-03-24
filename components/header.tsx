import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b flex items-center justify-center px-6 py-4">
      <Link href="/" className="cursor-pointer">
        <h1 className="text-2xl font-bold">LoggyBank</h1>
      </Link>
    </header>
  );
}
