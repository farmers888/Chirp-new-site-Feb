'use client';

import { useState } from 'react';
import { Route } from 'next';
import { usePathname } from 'next/navigation';
import { cva } from 'class-variance-authority';

import { ICategory } from '@/types/blog';
import { cn } from '@/lib/utils';
import { Link } from '@/components/ui/link';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface ICategoriesListProps {
  className?: string;
  categories: ICategory[];
  variant?: 'underline' | 'outline';
}

const activeTabVariants = cva('absolute', {
  variants: {
    variant: {
      underline: 'inset-x-0 bottom-0 h-0.5 bg-primary',
      outline: 'inset-0 rounded-full border',
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
});

function CategoriesList({ className, categories, variant = 'outline' }: ICategoriesListProps) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<Route<string> | URL | null>(null);
  const isUnderlineVariant = variant === 'underline';

  const handleMouseEnter = (url: Route<string> | URL) => {
    setHoveredItem(url);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <section className={cn('categories-list max-w-full md:overflow-hidden', className)}>
      <h2 className="sr-only">Categories</h2>
      <nav className="relative -mx-5 md:mx-0" onMouseLeave={handleMouseLeave}>
        <ScrollArea className="w-full">
          <ul
            className={cn(
              'flex h-8 w-full items-center px-5 md:pl-0',
              isUnderlineVariant ? 'gap-x-5' : 'gap-x-0.5',
            )}
          >
            {categories.map(({ title, url }, index) => {
              const isActive =
                url === '/blog'
                  ? pathname === '/blog' || pathname.startsWith(`/blog/page`)
                  : pathname === url || pathname.startsWith(`${url}/page`);
              const isHovered = hoveredItem === url;
              const shouldShowHighlight = isHovered || (isActive && !hoveredItem);
              return (
                <li key={index}>
                  <Link
                    className={cn(
                      'relative h-8 justify-center rounded-full leading-none font-medium whitespace-nowrap transition-colors duration-200 ring-inset',
                      shouldShowHighlight
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                      !isUnderlineVariant && 'px-3.5',
                    )}
                    size="sm"
                    variant="ghost"
                    onMouseEnter={() => handleMouseEnter(url)}
                    href={url}
                    onClick={() => handleMouseEnter(url)}
                  >
                    <span className="relative z-10">{title}</span>
                    <span
                      className={cn(
                        'pointer-events-none z-0 transition-opacity duration-300',
                        activeTabVariants({ variant }),
                        !isUnderlineVariant && isActive && 'border-muted-foreground',
                        !isUnderlineVariant &&
                          !isActive &&
                          isHovered &&
                          'border-muted-foreground/50',
                        shouldShowHighlight ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <ScrollBar className="invisible" orientation="horizontal" />
        </ScrollArea>
        <span
          className="pointer-events-none absolute inset-y-0 right-0 z-20 flex w-6 bg-linear-to-r from-transparent via-background/80 via-50% to-background"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-y-0 left-0 z-20 flex w-6 bg-linear-to-l from-transparent via-background/80 via-50% to-background md:hidden"
          aria-hidden
        />
      </nav>
    </section>
  );
}
export default CategoriesList;
