import { type ITableRow, type ITableSectionBase } from '@/types/landing';
import { cn, formatLeadingZeroNumber } from '@/lib/utils';

type TableItem = Required<Pick<ITableRow, 'title' | 'description'>>;

interface TablesProps extends Pick<ITableSectionBase, 'description'> {
  title: NonNullable<ITableSectionBase['title']>;
  items: TableItem[];
  className?: string;
}

function Tables({ className, title, description, items }: TablesProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className={cn('tables py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto max-w-5xl px-0 md:px-8">
        <header className="flex flex-col gap-2 px-5 md:gap-3 md:pr-0 md:pl-4 lg:gap-4 lg:pl-8">
          <h2 className="max-w-xl text-2xl leading-snug font-semibold tracking-tight text-balance text-foreground md:text-4xl md:leading-tight lg:text-5xl lg:leading-[1.125]">
            {title}
          </h2>
          <p className="max-w-xl text-base leading-snug font-medium tracking-tight text-balance text-muted-foreground md:text-lg md:font-normal lg:text-lg lg:font-normal">
            {description}
          </p>
        </header>

        <ol className="mt-6 flex w-full flex-col md:mt-7 lg:mt-11 xl:mt-10">
          {items.map(({ title, description }, index) => (
            <li
              className={cn(
                'grid grid-cols-[1.5rem_1fr] gap-1.5 px-5 py-4 transition-colors duration-200 hover:bg-muted/50 md:grid-cols-[2.25rem_1fr] md:gap-5 md:px-4 lg:gap-0 lg:px-8 lg:py-4.5',
                index > 0 && 'border-t border-border',
              )}
              key={index}
            >
              <span className="text-base leading-snug tracking-tight text-muted-foreground">
                {formatLeadingZeroNumber(index + 1)}
              </span>

              <div className="flex flex-col gap-1 lg:flex-row lg:gap-16">
                <span className="shrink-0 text-base leading-snug font-semibold tracking-tight text-foreground md:w-55">
                  {title}
                </span>
                <span className="grow text-base leading-snug tracking-tight text-pretty text-muted-foreground">
                  {description}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Tables;
