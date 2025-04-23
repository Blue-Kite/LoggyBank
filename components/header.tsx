'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { signOut } from '@/actions/auth';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navList = [
  { name: 'Task', href: '/' },
  { name: 'Insight', href: '/insight' },
  { name: 'Review', href: '/review' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full flex flex-row justify-between items-center border-b px-20 py-4 relative">
      <nav className="flex gap-2">
        {navList.map((navItem) => (
          <Link
            href={navItem.href}
            key={navItem.name}
            className={cn(
              'w-[80px] p-2 rounded-md  text-center text-sm transition-colors',
              pathname === navItem.href
                ? 'text-primary font-medium'
                : 'text-muted-foreground',
            )}
          >
            {navItem.name}
          </Link>
        ))}
      </nav>
      <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
        LoggyBank
      </h1>

      <div className="flex flex-row gap-5">
        {/* <Button variant="outline">search</Button> */}
        <Button variant="outline" onClick={signOut}>
          logout
        </Button>
      </div>
    </header>
  );
}
