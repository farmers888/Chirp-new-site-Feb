'use client';

import { useState } from 'react';
import Image from 'next/image';

import { type IFeatureItemCard, type IFeaturesSection } from '@/types/landing';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface IFeaturesProps extends Omit<IFeaturesSection, 'items' | 'actions'> {
  className?: string;
  actions?: IFeaturesSection['actions'];
  items: IFeatureItemCard[];
}

function Features({ className, title, description, actions, items }: IFeaturesProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) {
    return null;
  }

  const activeItem = items[activeIndex] ?? items[0];

  return (
    <section className={cn('features py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto flex max-w-304 flex-col items-center gap-8 px-5 md:gap-12 md:px-8 lg:gap-16 xl:gap-20">
        <header className="flex w-full flex-col items-start md:max-w-xl md:items-center md:text-center lg:max-w-3xl">
          <h2 className="lg:leading-tighter text-3xl leading-tight font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl lg:font-medium">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-snug font-medium tracking-tight text-muted-foreground md:text-lg lg:mt-4 lg:text-xl lg:leading-normal">
            {description}
          </p>
          {actions}
        </header>

        <div className="flex w-full flex-col gap-8 md:flex-row-reverse md:items-start md:gap-16 xl:gap-24">
          {activeItem?.image && (
            <Image
              className="aspect-square w-full shrink-0 rounded-[.625rem] object-cover md:max-w-88 md:rounded-2xl lg:max-w-120 xl:max-w-xl"
              src={activeItem.image.src}
              alt={activeItem.image.alt ?? ''}
              width={activeItem.image.width ?? 576}
              height={activeItem.image.height ?? 576}
              quality={95}
            />
          )}

          <Accordion
            className="w-full border-y border-border md:flex-1"
            type="single"
            defaultValue="item-0"
            collapsible
            onValueChange={(value) => {
              if (!value) return;
              const index = Number(value.replace('item-', ''));
              if (Number.isFinite(index)) {
                setActiveIndex(index);
              }
            }}
          >
            {items.map(({ title: itemTitle, description: itemDescription }, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="py-4 text-left tracking-tight hover:text-foreground/80 hover:no-underline md:py-5 lg:py-7 [&_svg]:size-5 [&_svg]:text-foreground">
                  <span className="text-xl leading-snug font-medium tracking-tight text-foreground">
                    {itemTitle}
                  </span>
                </AccordionTrigger>
                {itemDescription && (
                  <AccordionContent className="pb-4 text-base leading-normal tracking-tight text-muted-foreground md:pb-5 lg:pb-7">
                    {itemDescription}
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default Features;
