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
    <header className="relative flex w-full flex-col items-center justify-between border-b px-4 py-4 sm:flex-row sm:px-8 md:px-20">
      <h1 className="mb-4 text-xl font-bold sm:absolute sm:left-1/2 sm:mb-0 sm:-translate-x-1/2 sm:transform sm:text-3xl">
        LoggyBank
      </h1>

      <div className="flex w-full flex-row items-center justify-between sm:justify-between">
        <nav className="flex gap-1 sm:gap-2">
          {navList.map((navItem) => (
            <Link
              href={navItem.href}
              key={navItem.name}
              className={cn(
                'w-[50px] rounded-md p-1 text-center text-xs transition-colors sm:w-[80px] sm:p-2 sm:text-lg',
                pathname === navItem.href
                  ? 'font-medium text-primary'
                  : 'text-muted-foreground',
              )}
            >
              {navItem.name}
            </Link>
          ))}
        </nav>

        <div className="sm:absolute sm:right-8 md:right-20">
          <Button
            variant="outline"
            size="sm"
            className="p-1 text-xs sm:p-5 sm:text-lg"
            onClick={signOut}
          >
            logout
          </Button>
        </div>
      </div>
    </header>
  );
}
