import { Slot } from '@radix-ui/react-slot';

import { type ILucideIcon } from '@/types/common';
import { type INumberItem, type INumbersSectionBase } from '@/types/landing';
import { cn } from '@/lib/utils';

export type INumberItemWithIcon = Required<Pick<INumberItem, 'value' | 'title'>> & ILucideIcon;

interface INumbersProps {
  className?: string;
  title: NonNullable<INumbersSectionBase['title']>;
  description: NonNullable<INumbersSectionBase['description']>;
  items: INumberItemWithIcon[];
}

function Numbers({ className, title, description, items }: INumbersProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className={cn('numbers py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto w-full px-5 md:max-w-160 md:px-8 lg:max-w-5xl xl:max-w-336">
        <header className="flex flex-col gap-4 md:gap-3 lg:gap-5 xl:flex-row xl:items-end xl:justify-between xl:gap-8">
          <h2 className="max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground md:text-4xl md:tracking-tight lg:text-5xl lg:leading-[1.125] lg:tracking-tight xl:max-w-2xl">
            {title}
          </h2>
          <p className="max-w-xl text-base leading-normal font-medium tracking-tight text-balance text-muted-foreground md:text-lg md:leading-snug md:tracking-tight lg:max-w-3xl lg:text-xl lg:leading-normal lg:tracking-tight xl:max-w-xl">
            {description}
          </p>
        </header>
        <ul className="mt-9 grid grid-cols-1 gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-5 xl:gap-8">
          {items.map(({ value, title, lucideIcon }, index) => (
            <li
              className="grid grid-cols-1 grid-rows-1 overflow-hidden rounded-[0.625rem] md:rounded-2xl"
              key={index}
            >
              <div className="col-span-full row-span-full bg-card">
                {/* TODO: adjust graphics */}
              </div>
              <div className="col-span-full row-span-full flex h-72 flex-col items-start justify-between p-5 md:p-6 lg:h-110 xl:h-135 xl:p-8">
                <Slot className="size-9 shrink-0 text-foreground md:size-10 lg:size-11">
                  {lucideIcon}
                </Slot>
                <p className="mt-auto flex flex-col gap-1 md:gap-2">
                  <span className="text-6xl font-medium tracking-tight text-foreground md:text-7xl md:tracking-tight">
                    {value}
                  </span>
                  <span className="text-lg leading-tight font-medium tracking-tight text-muted-foreground">
                    {title}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Numbers;
