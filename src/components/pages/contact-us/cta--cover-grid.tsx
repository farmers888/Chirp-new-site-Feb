import Image from 'next/image';

import { type ICtaSection } from '@/types/landing';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface ICtaItem extends Pick<ICtaSection, 'title' | 'description'> {
  actions?: ICtaSection['actions'];
}

interface ICtaProps extends Pick<ICtaSection, 'title' | 'description'> {
  className?: string;
  items: ICtaItem[];
  actions?: ICtaSection['actions'];
  image: {
    src: string;
    alt?: string;
    width: number;
    height: number;
  };
}

function Cta({ className, items, title, description, actions, image }: ICtaProps) {
  return (
    <section className={cn('cta pt-12 md:pt-14 lg:pt-16 xl:pt-24', className)}>
      <div className="grid grid-cols-1 grid-rows-1">
        <div className="col-span-full row-span-full bg-foreground/5" />
        <div className="col-span-full row-span-full">
          {items && items.length > 0 && (
            <div className="mx-auto flex w-full max-w-272 flex-col px-5 md:flex-row md:items-stretch md:justify-between md:px-8">
              <ul className="grid w-full grid-cols-1 md:grid-cols-2 md:gap-x-16 xl:gap-x-0">
                {items.map(({ title, description, actions }, index) => (
                  <li
                    key={index}
                    className={cn(
                      '-mx-5 flex flex-col px-5 pt-10 pb-8 md:mx-0 md:min-h-85 md:justify-end md:px-0 md:pt-12 md:pb-10 lg:min-h-90 lg:pt-16 lg:pb-12 xl:min-h-99 xl:pt-20 xl:pb-16',
                      index % 2 === 0 && 'md:border-r md:pr-8 lg:pr-24',
                      index > 0 && 'border-t pt-8 md:border-t-0',
                      index % 2 !== 0 && 'xl:pl-16',
                      index === items.length - 1 && 'pb-10',
                    )}
                  >
                    <h3 className="max-w-md text-2xl leading-tight font-semibold tracking-tight text-balance text-foreground md:max-w-2xs lg:max-w-sm">
                      {title}
                    </h3>
                    <p className="mt-2 mb-auto max-w-md text-base tracking-tight text-pretty text-muted-foreground md:mt-3 md:max-w-2xs lg:max-w-sm">
                      {description}
                    </p>
                    {actions}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          <div className="mx-auto grid w-full max-w-272 grid-cols-1 flex-col gap-9 px-5 pt-10 pb-12 md:grid-cols-2 md:gap-16 md:px-8 md:py-10 lg:py-12 xl:gap-32 xl:pt-16 xl:pb-24">
            <header className="flex w-full flex-col self-center">
              <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground md:text-4xl md:leading-tight lg:text-5xl lg:leading-[1.125]">
                {title}
              </h2>
              <p className="mt-2 text-base leading-normal tracking-tight text-balance text-muted-foreground lg:mt-3 lg:pr-16">
                {description}
              </p>
              {actions}
            </header>
            <Image
              className="aspect-square w-full shrink-0 rounded-[.5rem] md:rounded-2xl"
              src={image?.src ?? '/images/placeholder-1x1.svg'}
              alt={image?.alt ?? ''}
              width={image?.width ?? 448}
              height={image?.height ?? 448}
              quality={95}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
