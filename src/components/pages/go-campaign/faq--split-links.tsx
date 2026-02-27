import { type Route } from 'next';
import { ArrowRight } from 'lucide-react';

import type { IFaqItem } from '@/types/common';
import type { TSectionAction } from '@/types/landing';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from '@/components/ui/link';

interface IFaqBlock {
  title: string;
  actions?: TSectionAction[];
  items: IFaqItem[];
}
interface IListBlock {
  title: string;
  actions?: TSectionAction[];
  items: {
    label: string;
    linkUrl?: Route<string> | URL;
  }[];
}

interface IFaqProps {
  className?: string;
  faq: IFaqBlock;
  list: IListBlock;
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path
        d="M12 5v14"
        className="origin-center transition-transform duration-200 group-data-[state=open]:-rotate-90"
      />
    </svg>
  );
}

function Faq({ className, faq, list }: IFaqProps) {
  if (!faq?.items || faq.items.length === 0) return null;

  return (
    <section className={cn('faq py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto grid max-w-352 grid-cols-1 flex-col gap-y-12 px-5 md:gap-y-20 md:px-8 lg:grid-cols-2 lg:gap-x-16">
        <div className="row-span-3 grid grid-rows-subgrid gap-0">
          <h2 className="max-w-2xl text-2xl leading-tight font-semibold tracking-tight text-foreground md:text-4xl md:leading-tight lg:text-4xl lg:leading-tight">
            {faq.title}
          </h2>

          <Accordion
            className="mt-3.5 flex grow flex-col md:mt-4.5 lg:mt-7.5"
            type="single"
            collapsible
          >
            {faq.items.map(({ question, answer }, index) => (
              <AccordionItem
                className="group border-dashed last:border-b"
                key={index}
                value={`item-${index}`}
              >
                <AccordionTrigger className="w-full gap-6 py-3 text-left hover:text-foreground/80 hover:no-underline md:py-5 lg:py-6 [&>svg]:hidden">
                  <span className="flex-1 text-lg leading-tight font-medium tracking-tight text-pretty md:leading-snug lg:text-xl lg:leading-tight">
                    {question}
                  </span>
                  <span className="relative flex size-5 shrink-0 items-center justify-center md:size-6">
                    <PlusIcon className="size-5 stroke-[1.5] md:size-6" />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-3 md:pb-5 lg:pb-6">
                  <div className="flex max-w-3xl flex-col gap-y-5 pr-11 text-base leading-normal tracking-tight text-muted-foreground xl:pr-32">
                    {answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {faq.actions}
        </div>
        {list && list.items && (
          <div className="row-span-3 grid grid-rows-subgrid gap-0">
            <h2 className="max-w-2xl text-2xl leading-tight font-semibold tracking-tight text-foreground md:text-4xl md:leading-tight lg:text-4xl lg:leading-tight">
              {list.title}
            </h2>

            <ul className="mt-3.5 flex flex-col md:mt-4.5 lg:mt-7.5">
              {list.items.map(({ label, linkUrl }, index) => (
                <li className="border-b border-dashed border-border" key={index}>
                  {linkUrl ? (
                    <Link
                      className="flex items-center justify-between gap-6 py-3 text-lg leading-snug md:py-5 lg:py-6 lg:text-xl lg:leading-tight [&_svg]:size-5 md:[&_svg]:size-6"
                      href={linkUrl}
                      variant="foreground"
                      animation="arrow-right"
                    >
                      {label}
                      <ArrowRight />
                    </Link>
                  ) : (
                    <span className="flex items-center justify-between gap-6 py-3 text-base leading-tight md:py-5 md:text-lg md:leading-snug lg:py-6 lg:text-xl lg:leading-tight [&_svg]:size-5 md:[&_svg]:size-6">
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            {list.actions}
          </div>
        )}
      </div>
    </section>
  );
}

export default Faq;
