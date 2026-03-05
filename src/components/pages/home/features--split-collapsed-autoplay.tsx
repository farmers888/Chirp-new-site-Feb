'use client';

import { useEffect, useRef, useState } from 'react';
import { Route } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'motion/react';

import { type IFeatureItemCard, type IFeaturesSection } from '@/types/landing';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import AutoplayProgressLine from '@/components/pages/autoplay-progress--line';

type IFeatureCollapsedItem = Omit<IFeatureItemCard, 'description'> & {
  description?: IFeatureItemCard['description'];
  links?: {
    label: string;
    href: Route<string> | URL;
  }[];
};

interface IFeaturesProps extends Pick<IFeaturesSection, 'label'> {
  className?: string;
  items: IFeatureCollapsedItem[];
  autoplay?: boolean;
  duration?: number;
}

function Features({ className, label, items, autoplay = true, duration = 6000 }: IFeaturesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  useEffect(() => {
    if (activeIndex >= items.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, items.length]);

  if (!items || items.length === 0) {
    return null;
  }

  const totalItems = items.length;
  const activeItem = items[activeIndex] ?? items[0];
  const isPaused = !autoplay || !isInView || isHoverPaused;

  const handleSlideChange = () => {
    if (totalItems < 2) return;
    setActiveIndex((prev) => (prev + 1) % totalItems);
  };

  const handleSlideSelect = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseEnter = () => setIsHoverPaused(true);
  const handleMouseLeave = () => setIsHoverPaused(false);

  return (
    <section
      className={cn('features py-12 md:py-14 lg:py-16 xl:py-24', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={sectionRef}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 md:hidden">
        {label && (
          <p className="text-xs leading-none font-medium tracking-tight text-muted-foreground uppercase">
            {label}
          </p>
        )}
        <div className="flex flex-col gap-7">
          {items.flatMap(({ title, description, links, image }, index) => [
            <div key={`item-${index}`} className="flex flex-col gap-3">
              <Image
                className="aspect-square w-full overflow-hidden rounded-[.625rem] md:rounded-2xl"
                src={image?.src ?? '/images/placeholder-1x1.svg'}
                alt={image?.alt ?? ''}
                width={image?.width ?? 320}
                height={image?.height ?? 320}
                quality={95}
              />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg leading-snug font-medium tracking-tight">{title}</h3>
                  {description && (
                    <p className="text-sm leading-snug tracking-tight text-muted-foreground">
                      {description}
                    </p>
                  )}
                </div>
                {links && links.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                    {links.map((link) => (
                      <Button
                        className="rounded-full px-3.5 text-sm tracking-tight focus-visible:ring-offset-0 [&_svg]:size-3.5"
                        key={`mobile-${link.label}-${link.href.toString()}`}
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <NextLink href={link.href}>
                          {link.label}
                          <ArrowRight />
                        </NextLink>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>,
            <div key={`divider-${index}`} className="border-b border-border" />,
          ])}
        </div>
      </div>

      <div className="mx-auto hidden max-w-7xl gap-10 px-8 md:flex md:items-stretch md:justify-between lg:gap-16 xl:gap-24">
        <div className="flex w-full shrink-0 flex-col gap-8 md:max-w-80 lg:max-w-120 xl:max-w-152">
          <Image
            className="aspect-square w-full overflow-hidden rounded-2xl"
            src={activeItem?.image?.src ?? '/images/placeholder-1x1.svg'}
            alt={activeItem?.image?.alt ?? ''}
            width={activeItem?.image?.width ?? 608}
            height={activeItem?.image?.height ?? 608}
            quality={95}
          />
          {totalItems > 1 && (
            <AutoplayProgressLine
              className="w-full"
              totalItems={totalItems}
              duration={duration}
              activeIndex={activeIndex}
              onComplete={handleSlideChange}
              onSlideSelect={handleSlideSelect}
              isPaused={isPaused}
            />
          )}
        </div>

        <div className="flex flex-col justify-between gap-8 xl:max-w-xl">
          {label && (
            <p className="text-[0.8125rem] leading-none font-medium tracking-tight text-muted-foreground uppercase">
              {label}
            </p>
          )}
          <Accordion
            className="w-full border-b border-border"
            type="single"
            collapsible
            value={`item-${activeIndex}`}
            onValueChange={(value) => {
              if (!value) return;
              const index = Number(value.replace('item-', ''));
              if (Number.isFinite(index)) {
                setActiveIndex(index);
              }
            }}
          >
            {items.map(({ title, description, links }, index) => (
              <AccordionItem key={`${title}-${index}`} value={`item-${index}`}>
                <AccordionTrigger
                  className={cn(
                    'py-5 text-left tracking-tight hover:text-foreground/80 hover:no-underline lg:py-7',
                    'text-muted-foreground data-[state=open]:text-foreground',
                    'md:data-[state=open]:pb-1 lg:data-[state=open]:pb-3 [&_svg]:hidden',
                  )}
                >
                  <span className="text-lg leading-snug font-medium tracking-tight lg:text-2xl xl:text-3xl">
                    {title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 lg:pb-7">
                  <div className="flex flex-col gap-4 lg:gap-5">
                    {description && (
                      <p className="text-sm leading-snug tracking-tight text-muted-foreground lg:text-base lg:leading-normal">
                        {description}
                      </p>
                    )}
                    {links && links.length > 0 && (
                      <div className="flex flex-wrap items-center gap-3 pl-0.5">
                        {links.map((link) => (
                          <Button
                            className="rounded-full px-3.5 text-sm tracking-tight focus-visible:ring-offset-0 lg:px-4 [&_svg]:size-3.5"
                            key={`${link.label}-${link.href.toString()}`}
                            size="sm"
                            variant="outline"
                            asChild
                          >
                            <NextLink href={link.href}>
                              {link.label}
                              <ArrowRight />
                            </NextLink>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default Features;
