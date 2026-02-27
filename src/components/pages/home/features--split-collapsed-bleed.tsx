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
import { Badge } from '@/components/ui/badge';

interface IFeaturesProps extends Omit<IFeaturesSection, 'items' | 'actions'> {
  className?: string;
  actions?: IFeaturesSection['actions'];
  items: IFeatureItemCard[];
}

function Features({ className, label, title, description, actions, items }: IFeaturesProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) {
    return null;
  }

  const activeItem = items[activeIndex] ?? items[0];

  const handleAccordionChange = (value: string) => {
    if (!value) return;
    const index = Number(value.replace('item-', ''));
    if (Number.isFinite(index)) {
      setActiveIndex(index);
    }
  };

  const renderAccordionItems = () =>
    items.map(({ title: itemTitle, description: itemDescription }, index) => (
      <AccordionItem key={index} value={`item-${index}`}>
        <AccordionTrigger className="py-4 text-left tracking-tight hover:text-foreground/80 hover:no-underline md:py-5 [&_svg]:size-5 [&_svg]:text-foreground">
          <span className="text-xl leading-snug font-medium tracking-tight text-foreground">
            {itemTitle}
          </span>
        </AccordionTrigger>
        {itemDescription && (
          <AccordionContent className="max-w-147 pb-4 text-base leading-normal tracking-tight text-muted-foreground md:pb-5 lg:max-w-none">
            {itemDescription}
          </AccordionContent>
        )}
      </AccordionItem>
    ));

  return (
    <section className={cn('features overflow-hidden py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto flex max-w-352 flex-col gap-8 px-5 md:gap-12 md:px-0 lg:flex-row lg:items-start lg:gap-16 lg:pr-0 lg:pl-8 xl:gap-24">
        <div className="flex w-full flex-col gap-8 md:flex-row md:items-start md:pl-8 lg:w-md lg:shrink-0 lg:flex-col lg:justify-between lg:self-stretch lg:pl-0 xl:w-136">
          <header className="flex flex-col md:w-88 md:shrink-0 lg:w-full">
            {label && <Badge className="mb-3 lg:mb-4 xl:mb-5">{label}</Badge>}
            <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground md:text-4xl xl:text-5xl xl:leading-[1.125]">
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-base leading-snug tracking-tight text-balance text-muted-foreground md:leading-normal xl:mt-3">
                {description}
              </p>
            )}
            {actions}
          </header>

          {activeItem?.image && (
            <Image
              className="hidden aspect-square min-w-0 flex-1 rounded-l-2xl object-cover object-left md:block lg:hidden"
              src={activeItem.image.src}
              alt={activeItem.image.alt ?? ''}
              width={activeItem.image.width ?? 704}
              height={activeItem.image.height ?? 704}
              quality={95}
            />
          )}

          <Accordion
            className="hidden w-full border-b border-border lg:block"
            type="single"
            defaultValue="item-0"
            collapsible
            onValueChange={handleAccordionChange}
          >
            {renderAccordionItems()}
          </Accordion>
        </div>

        {activeItem?.image && (
          <Image
            className="aspect-16/10 w-full rounded-[.625rem] object-cover object-left md:hidden"
            src={activeItem.image.src}
            alt={activeItem.image.alt ?? ''}
            width={activeItem.image.width ?? 704}
            height={activeItem.image.height ?? 704}
            quality={95}
          />
        )}

        <Accordion
          className="w-full border-b border-border px-0 md:px-8 lg:hidden"
          type="single"
          defaultValue="item-0"
          collapsible
          onValueChange={handleAccordionChange}
        >
          {renderAccordionItems()}
        </Accordion>

        <div className="relative hidden min-w-0 flex-1 items-center lg:flex">
          {activeItem?.image && (
            <Image
              className="aspect-square rounded-l-2xl object-cover object-left lg:h-156 lg:w-auto lg:max-w-none xl:aspect-31/22 xl:h-176 xl:rounded-2xl"
              src={activeItem.image.src}
              alt={activeItem.image.alt ?? ''}
              width={activeItem.image.width ?? 992}
              height={activeItem.image.height ?? 704}
              quality={95}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Features;
