import Image from 'next/image';
import { Slot } from '@radix-ui/react-slot';

import { type IHeroSection } from '@/types/landing';
import { cn } from '@/lib/utils';
import Logos from '@/components/pages/logos';

export interface IHeroProps extends IHeroSection {
  className?: string;
}

function Hero({ label, title, description, actions, image, logos, className }: IHeroProps) {
  return (
    <section className={cn('hero py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 md:gap-y-14 lg:grid-cols-2 xl:grid-cols-[34rem_auto]">
          <header className="flex flex-col self-center">
            {label}
            <h1 className="lg:leading-tighter xl:leading-tighter max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl md:leading-tight lg:text-5xl xl:text-6xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-normal tracking-tight text-balance text-muted-foreground md:mt-5">
              {description}
            </p>
            <Slot className={cn('mt-5 md:mt-6')}>{actions}</Slot>
          </header>
          {image && (
            <div className="mx-auto aspect-square w-full max-w-lg shrink-0 rounded-[.625rem] md:rounded-2xl lg:max-w-full">
              <Image
                className="aspect-square rounded-[.625rem] md:rounded-2xl"
                src={image.src ?? '/images/placeholder-1x1.svg'}
                alt={image.alt ?? ''}
                width={image.width ?? 608}
                height={image.height ?? 608}
                priority
                quality={95}
              />
            </div>
          )}
        </div>
        {logos && (
          <Logos
            className="col-span-full mt-12 md:mt-14 lg:mt-20"
            title="Trusted by Creators & Businesses"
            logos={logos}
          />
        )}
      </div>
    </section>
  );
}

export default Hero;
