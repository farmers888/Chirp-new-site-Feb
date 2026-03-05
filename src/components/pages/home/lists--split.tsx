import { cn } from '@/lib/utils';

interface IListItem {
  title: string;
  description: string;
}

interface IListSection {
  title: string;
  items: IListItem[];
}

interface IListsSplitProps {
  className?: string;
  sections: IListSection[];
}

function ListSection({ title, items }: IListSection) {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-start lg:gap-24 xl:gap-48">
      <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground lg:w-88 lg:shrink-0 lg:text-4xl xl:w-120">
        {title}
      </h2>
      <ul className="flex flex-1 flex-col gap-4 lg:gap-5">
        {items.map((item, index) => (
          <li key={index} className="flex flex-col gap-4 lg:gap-5">
            <div className="h-px w-full bg-border" />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg leading-snug font-semibold tracking-tight text-pretty text-foreground lg:text-xl lg:leading-normal">
                {item.title}
              </h3>
              <p className="text-base leading-normal font-normal tracking-tight text-pretty text-muted-foreground md:pr-16">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ListsSplit({ className, sections }: IListsSplitProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <section className={cn('lists py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-12 md:gap-14 xl:gap-20">
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col gap-12 md:gap-14 xl:gap-20">
              <ListSection title={section.title} items={section.items} />
              {index < sections.length - 1 && <div className="h-0.5 w-full bg-border" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ListsSplit;
