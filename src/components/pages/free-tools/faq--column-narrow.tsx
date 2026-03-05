'use client';

import { IFaqSection } from '@/types/landing';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface IFaqProps extends Omit<IFaqSection, 'title'> {
  className?: string;
  title?: string;
}

function Faq({ title, className, items }: IFaqProps) {
  return (
    <section className={cn('faq w-full py-12 md:py-16 lg:py-24', className)}>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-y-5 px-5 md:px-8">
        {title && (
          <h2 className="mb-5 text-3xl leading-tight font-medium tracking-tighter text-foreground md:text-4xl">
            {title}
          </h2>
        )}
        <Accordion type="single" collapsible className="text-foreground">
          {items.map(({ question, answer }, index) => (
            <AccordionItem
              className={cn(index === items.length - 1 && 'border-b-0')}
              key={index}
              value={`item-${index}`}
            >
              <AccordionTrigger className="w-full gap-x-4 py-5 text-left tracking-tight hover:text-foreground/80 hover:no-underline [&_svg]:size-7">
                <span className="text-lg leading-tight font-medium tracking-tight text-pretty md:text-xl md:leading-tight">
                  {question}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-y-5 pt-1 pr-8 pb-3 text-base tracking-tight text-muted-foreground md:pt-0 md:pr-10 lg:text-lg lg:leading-normal">
                  {answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default Faq;
