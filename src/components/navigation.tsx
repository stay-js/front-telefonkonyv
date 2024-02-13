'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '~/utils/cn';

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <ul className="flex items-center gap-4">
        <li>
          <Link href="/" className="text-xl">
            Telefonkönyv
          </Link>
        </li>
        <li>
          <Link href="/" className={cn('font-light', pathname !== '/' && 'opacity-75')}>
            Kezdőlap
          </Link>
        </li>
        <li>
          <Link
            href="/contacts/create"
            className={cn('font-light', pathname !== '/contacts/create' && 'opacity-75')}
          >
            Új kontakt
          </Link>
        </li>
      </ul>
    </nav>
  );
};
