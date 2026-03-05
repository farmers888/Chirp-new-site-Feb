'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { type IFeatureItemCard } from '@/types/landing';
import { cn } from '@/lib/utils';
import { Link } from '@/components/ui/link';

type IFeatureItem = Omit<IFeatureItemCard, 'label' | 'description'> & {
  label: string;
  description: ReactNode;
  linkText?: string;
};

interface IFeaturesProps {
  className?: string;
  items: IFeatureItem[];
}

function Features({ className, items }: IFeaturesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          rootMargin: '-20% 0px -80% 0px',
        },
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [items]);

  const scrollToItem = (index: number) => {
    itemRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={cn('features py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto flex max-w-304 flex-col gap-7 px-5 md:flex-row md:items-start md:gap-8 md:px-8 lg:gap-16">
        <nav className="hidden md:sticky md:top-24 md:block md:w-72 md:shrink-0 lg:w-88">
          <ul className="flex flex-col gap-2.5">
            {items.map(({ label }, index) => (
              <li key={index}>
                <button
                  className={cn(
                    'w-full cursor-pointer rounded-md text-left text-3xl leading-tight font-semibold tracking-tight transition-colors lg:text-4xl',
                    index === activeIndex
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                  type="button"
                  onClick={() => scrollToItem(index)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex flex-col gap-7 md:flex-1 md:gap-12 lg:gap-16 xl:w-184 xl:flex-none xl:gap-20">
          {items.map(({ label, title, description, linkText, linkUrl, image }, index) => (
            <li
              className="flex scroll-mt-24 flex-col gap-3 md:gap-4 lg:gap-5"
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
            >
              <span className="text-2xl leading-snug font-semibold tracking-tight text-foreground md:hidden">
                {label}
              </span>

              {image && (
                <Image
                  className="aspect-16/10 w-full overflow-hidden rounded-[.625rem] bg-card md:rounded-2xl"
                  src={image.src ?? '/images/placeholder-16x10.svg'}
                  alt={image.alt ?? ''}
                  width={image.width ?? 736}
                  height={image.height ?? 460}
                  quality={95}
                />
              )}

              <div className="flex flex-col items-start gap-2 md:gap-3 lg:flex-row lg:justify-between">
                <p className="text-base leading-snug font-medium tracking-tight text-pretty md:max-w-sm lg:text-lg">
                  <strong className="font-medium text-foreground">{title}</strong>
                  <br />
                  {description}
                </p>
                {linkUrl && linkText && (
                  <Link
                    className="shrink-0 gap-x-1 text-sm md:text-base"
                    href={linkUrl}
                    variant="default"
                    animation="arrow-right"
                  >
                    {linkText}
                    <ArrowRight className="size-3.5 md:size-4" />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Features;
