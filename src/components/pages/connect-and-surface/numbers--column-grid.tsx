import Image from 'next/image';

import { type INumberItem, type INumbersSectionBase } from '@/types/landing';
import { cn } from '@/lib/utils';

type INumbersStat = Required<Pick<INumberItem, 'value' | 'label'>>;

interface INumbersProps extends Pick<INumbersSectionBase, 'image'> {
  className?: string;
  title: string;
  description: string;
  items: INumbersStat[];
}

function Numbers({ className, title, description, image, items }: INumbersProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const renderedItems = items.slice(0, 6);

  return (
    <section className={cn('numbers overflow-hidden py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto flex max-w-272 flex-col items-center px-5 md:px-8">
        <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground md:max-w-160 md:text-center md:text-4xl lg:max-w-3xl lg:text-5xl lg:leading-[1.125] xl:text-6xl">
          {title}
        </h2>
        <Image
          className="mt-6 aspect-16/10 w-full rounded-lg object-cover md:mt-9 md:rounded-2xl xl:mt-12"
          src={image?.src ?? '/images/placeholder-16x10.svg'}
          alt={image?.alt ?? ''}
          width={image?.width ?? 1024}
          height={image?.height ?? 640}
          sizes="100vw"
        />
        <p
          className="mt-6 text-base leading-snug font-semibold tracking-tight text-pretty text-muted-foreground md:max-w-158 md:text-center md:text-lg md:leading-normal lg:mt-8 lg:max-w-176 lg:text-xl xl:mt-10 [&_strong]:font-semibold [&_strong]:text-foreground"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <ul className="mx-auto mt-8 grid w-full max-w-4xl grid-cols-2 gap-x-8 gap-y-6 text-center md:mt-10 md:grid-cols-3 md:gap-x-4 md:gap-y-10 lg:mt-14 lg:gap-x-28 lg:gap-y-12 xl:mt-16 xl:gap-y-14">
          {renderedItems.map(({ value, label }, index) => (
            <li className="flex flex-col items-center" key={index}>
              <span className="text-2xl leading-tight font-semibold tracking-tight text-foreground lg:text-3xl lg:leading-snug">
                {value}
              </span>
              <span className="mt-0.5 text-sm leading-tight tracking-tight text-pretty text-muted-foreground lg:text-base">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Numbers;
