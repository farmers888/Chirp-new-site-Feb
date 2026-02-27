import { IFaqItem } from '@/types/common';
import { IFaqSection } from '@/types/landing';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface IFaqProps extends IFaqSection {
  className?: string;
  items: IFaqItem[];
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

function Faq({ className, title, items }: IFaqProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className={cn('faq py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto flex max-w-304 flex-col gap-3 px-5 md:px-8 lg:flex-row lg:items-start lg:justify-between lg:gap-x-16 xl:gap-x-24">
        <h2 className="w-full shrink-0 text-3xl leading-tight font-semibold tracking-tight text-foreground md:text-4xl md:leading-tight lg:max-w-88 lg:text-4xl lg:leading-tight xl:max-w-lg xl:text-5xl xl:leading-[1.125]">
          {title}
        </h2>

        <Accordion className="flex grow flex-col lg:-mt-2.5 xl:-mt-3.5" type="single" collapsible>
          {items.map(({ question, answer }, index) => (
            <AccordionItem className="group border-dashed" key={index} value={`item-${index}`}>
              <AccordionTrigger className="w-full gap-6 py-4 text-left hover:text-foreground/80 hover:no-underline lg:py-5 xl:py-6 [&>svg]:hidden">
                <span className="flex-1 text-lg leading-snug font-medium tracking-tight text-pretty xl:text-xl xl:leading-tight">
                  {question}
                </span>
                <span className="relative flex size-5 shrink-0 items-center justify-center lg:size-6">
                  <PlusIcon className="size-5 stroke-[1.5] lg:size-6" />
                </span>
              </AccordionTrigger>
              <AccordionContent className="lg:pb-5 xl:pb-6">
                <div className="flex max-w-3xl flex-col gap-y-5 pr-11 text-base leading-normal tracking-tight text-muted-foreground md:pr-32">
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
