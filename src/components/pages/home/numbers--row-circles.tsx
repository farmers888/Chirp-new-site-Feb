import { type CSSProperties } from 'react';

import { type INumberItem, type INumbersSectionBase } from '@/types/landing';
import { cn } from '@/lib/utils';

type INumbersItem = Required<Pick<INumberItem, 'value' | 'description'>>;

interface INumbersProps extends Pick<INumbersSectionBase, 'title' | 'description' | 'actions'> {
  className?: string;
  items: INumbersItem[];
}

function getCircleBorderStyle(value: string): CSSProperties {
  const numericValue = Number.parseFloat(String(value));
  const secondaryPercent = Number.isFinite(numericValue)
    ? Math.min(100, Math.max(0, numericValue))
    : 50;

  return {
    '--circle-border': `from 0deg, hsl(var(--secondary-foreground)) 0 ${secondaryPercent}%, hsl(var(--border)) ${secondaryPercent}% 100%`,
    '--circle-border-clip': 'circle(50%)',
  } as CSSProperties;
}

function Numbers({ className, title, description, actions, items }: INumbersProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const renderedItems = items.slice(0, 3);

  return (
    <section className={cn('numbers py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 md:px-8 lg:flex-row lg:items-stretch lg:justify-between xl:gap-24">
        <header className="flex w-full flex-col gap-1.5 md:max-w-md lg:max-w-72 lg:justify-between lg:gap-16 xl:max-w-96 xl:gap-0">
          <h2 className="text-2xl leading-snug font-semibold tracking-tight text-balance text-foreground">
            {title}
          </h2>
          {(description || (actions && actions.length > 0)) && (
            <div className="flex flex-col gap-4">
              {description && (
                <p className="text-base leading-snug tracking-tight text-balance text-muted-foreground">
                  {description}
                </p>
              )}
              {actions}
            </div>
          )}
        </header>

        <ul className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-7">
          {renderedItems.map(({ value, description: itemLabel }, index) => (
            <li className="flex flex-col items-center gap-4 text-center" key={index}>
              <div
                className="relative isolate flex size-48 items-center justify-center rounded-full before:absolute before:inset-0 before:z-0 before:rounded-full before:bg-[conic-gradient(var(--circle-border))] before:content-[''] before:[clip-path:var(--circle-border-clip,ellipse(50%_50%))] after:absolute after:inset-[1.5px] after:z-0 after:rounded-full after:bg-background after:content-[''] xl:size-56"
                style={getCircleBorderStyle(value)}
              >
                <span className="relative z-10 text-5xl leading-none font-semibold tracking-tighter text-foreground md:text-6xl">
                  {value}
                </span>
              </div>
              <p className="text-base leading-tight font-medium tracking-tight text-foreground md:text-lg md:leading-snug">
                {itemLabel}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Numbers;
