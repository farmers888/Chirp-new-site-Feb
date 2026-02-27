'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';

import { type ILogo } from '@/types/common';
import { type IFeatureItemCard, type IFeaturesSection } from '@/types/landing';
import { cn } from '@/lib/utils';

type IFeatureItem = Omit<IFeatureItemCard, 'label' | 'title'> & {
  label: string;
  title: ReactNode;
  logosLabel?: string;
  logos?: ILogo[];
};

interface IFeaturesProps extends Pick<IFeaturesSection, 'title'> {
  className?: string;
  subtitle: IFeaturesSection['description'];
  items: IFeatureItem[];
}

const MAX_VISIBLE_LOGOS = 4;

function Features({ className, title, subtitle, items }: IFeaturesProps) {
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
      <div className="mx-auto flex max-w-352 flex-col gap-8 px-5 md:px-8 lg:gap-10 xl:gap-12">
        <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl md:leading-tight lg:max-w-4xl">
          <span className="block text-foreground">{title}</span>
          <span className="block text-muted-foreground">{subtitle}</span>
        </h2>

        <div className="flex flex-col gap-8 md:flex-row md:items-start lg:justify-between">
          <nav className="hidden md:sticky md:top-24 md:block md:w-56 md:shrink-0 md:pt-2 lg:w-42 lg:pt-9">
            <ul className="flex flex-col gap-4 border-l border-border lg:gap-5">
              {items.map(({ label }, index) => (
                <li key={index}>
                  <button
                    className={cn(
                      'relative w-full py-1 pl-5 text-left text-sm leading-none font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground lg:text-base',
                      index === activeIndex &&
                        'text-foreground before:absolute before:top-0 before:bottom-0 before:-left-px before:w-px before:bg-foreground',
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

          <ul className="flex flex-col gap-12 md:min-w-0 md:flex-1 md:gap-14 lg:gap-8 xl:max-w-5xl">
            {items.map(({ label, title, description, logos, logosLabel, image }, index) => {
              const visibleLogos = logos?.slice(0, MAX_VISIBLE_LOGOS) ?? [];
              const showLogos = visibleLogos.length > 0;

              return (
                <li
                  className="flex scroll-mt-20 flex-col gap-3 lg:flex-row lg:items-stretch lg:justify-between lg:gap-10"
                  key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                >
                  <span className="text-sm leading-none font-medium tracking-tight text-muted-foreground md:hidden">
                    {label}
                  </span>

                  <div className="flex w-full flex-col gap-6 lg:max-w-md lg:justify-between lg:gap-10 lg:py-7 xl:py-9">
                    <div className="flex flex-col gap-5 lg:gap-0">
                      <div className="flex flex-col gap-1 md:gap-2 lg:gap-3">
                        <h3 className="text-lg leading-tight font-medium tracking-tight text-pretty text-foreground md:text-2xl lg:leading-snug">
                          {title}
                        </h3>
                        <p className="text-sm leading-snug tracking-tight text-pretty text-muted-foreground md:text-base lg:leading-normal">
                          {description}
                        </p>
                      </div>

                      {image && (
                        <Image
                          className="aspect-square w-full rounded-[.625rem] object-cover md:rounded-2xl lg:hidden"
                          src={image.src ?? '/images/placeholder-1x1.svg'}
                          alt={image.alt ?? ''}
                          width={image.width ?? 512}
                          height={image.height ?? 512}
                          quality={95}
                        />
                      )}
                    </div>

                    {showLogos && (
                      <div className="flex flex-col gap-3 lg:mt-auto lg:gap-4 xl:gap-5">
                        {logosLabel && (
                          <span className="text-sm leading-none font-medium tracking-tight text-foreground">
                            {logosLabel}
                          </span>
                        )}
                        <div className="flex items-center justify-start gap-6 md:gap-8 lg:gap-5 xl:gap-10">
                          {visibleLogos.map(({ src, alt, width, height }) => (
                            <Image
                              className="h-5 w-auto max-w-none xl:h-6"
                              key={src}
                              src={src}
                              alt={alt}
                              width={width}
                              height={height}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {image && (
                    <Image
                      className="hidden aspect-square shrink-0 rounded-2xl object-cover lg:block lg:size-96 xl:size-128"
                      src={image.src ?? '/images/placeholder-1x1.svg'}
                      alt={image.alt ?? ''}
                      width={image.width ?? 512}
                      height={image.height ?? 512}
                      quality={95}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Features;
