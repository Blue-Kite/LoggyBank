import Link from 'next/link';
import { Button } from './ui/button';
import { signOut } from '@/actions/auth';

export default function Header() {
  return (
    <header className="border-b flex flex-row items-center px-6 py-4">
      <Link href="/" className="cursor-pointer">
        <h1 className="text-2xl font-bold">LoggyBank</h1>
      </Link>
      <form action={signOut}>
        <Button variant="outline">logout</Button>
      </form>
    </header>
  );
}
