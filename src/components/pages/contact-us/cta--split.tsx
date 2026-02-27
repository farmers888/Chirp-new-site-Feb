import Image from 'next/image';
import { Slot } from '@radix-ui/react-slot';

import { type ICtaSection } from '@/types/landing';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export interface ICTAProps extends ICtaSection {
  className?: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

// TODO: check CTA variants
function CTA({ className, label, title, description, actions, image }: ICTAProps) {
  return (
    <section className={cn('cta w-full py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-16 gap-y-14 px-5 md:gap-y-16 md:px-8 lg:grid lg:grid-cols-2 xl:gap-x-32">
        <header className="mx-auto flex w-full flex-col">
          {label && <Badge className="mb-5 lg:mb-9">{label}</Badge>}
          <h2 className="lg:leading-tighter text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl md:leading-tight lg:text-5xl">
            {title}
          </h2>
          <p className="mt-3 text-lg leading-normal tracking-tight text-balance text-muted-foreground md:mt-5">
            {description}
          </p>
          <Slot className={cn('mt-5 md:mt-6')}>{actions}</Slot>
        </header>

        <div className="aspect-square w-full max-w-lg shrink-0 overflow-hidden rounded-[.625rem] md:rounded-2xl lg:max-w-full">
          <Image
            className="h-auto w-full"
            src={image.src ?? '/images/placeholder-1x1.svg'}
            alt={image.alt ?? ''}
            width={image.width ?? 544}
            height={image.height ?? 544}
          />
        </div>
      </div>
    </section>
  );
}

export default CTA;
