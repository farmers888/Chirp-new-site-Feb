import { Slot } from '@radix-ui/react-slot';

import type { ILogo, ILucideIcon } from '@/types/common';
import { cn } from '@/lib/utils';
import Logos from '@/components/pages/logos';

import ContactForm from './contact-form';

interface IHeroItem extends ILucideIcon {
  title: string;
  description: string;
}

interface IHeroProps {
  className?: string;
  title: string;
  description: string;
  items?: IHeroItem[];
  logos?: ILogo[];
}

function Hero({ title, description, items, logos, className }: IHeroProps) {
  return (
    <section className={cn('hero pt-10 md:pt-16 lg:pt-24', className)}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 px-5 md:px-8 lg:grid-cols-[28rem_auto] xl:grid-cols-2 xl:gap-x-32">
        <h1 className="md:leading-tighter lg:leading-tighter col-start-1 text-3xl leading-tight font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="col-start-1 mt-4 mb-10 max-w-(--breakpoint-sm) text-lg leading-snug tracking-tight text-pretty text-muted-foreground lg:mb-14 lg:max-w-sm xl:max-w-lg">
          {description}
        </p>
        {items && items.length > 0 && (
          <ul className="col-start-1 mb-10 flex max-w-md flex-col gap-y-6 md:mb-12 lg:mb-0 lg:max-w-sm lg:gap-y-9 lg:pr-8 xl:max-w-md xl:pr-0">
            {items.map(({ lucideIcon, title, description }, index) => (
              <li className="flex items-center gap-x-4" key={index}>
                {lucideIcon && (
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary"
                    aria-hidden
                  >
                    <Slot className="size-5 text-muted-foreground" aria-hidden>
                      {lucideIcon}
                    </Slot>
                  </span>
                )}
                <p className="text-base leading-snug tracking-tight text-pretty text-foreground">
                  <strong className="font-medium">{title}</strong>{' '}
                  {description && <span className="text-muted-foreground">{description}</span>}
                </p>
              </li>
            ))}
          </ul>
        )}
        <ContactForm className="lg:col-start-2 lg:row-span-5 lg:row-start-1" />

        {logos && logos.length > 0 && (
          <Logos
            className="col-start-1 mt-10 gap-y-6 md:mt-12 lg:mt-14"
            title="Trusted by modern teams of all sizes"
            variant="column"
            logos={logos}
            showSeparator
          />
        )}
      </div>
    </section>
  );
}

export default Hero;
