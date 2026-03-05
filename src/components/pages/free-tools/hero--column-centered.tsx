import Image from 'next/image';
import { Slot } from '@radix-ui/react-slot';

import { type IHeroSection } from '@/types/landing';
import { cn } from '@/lib/utils';
import Logos from '@/components/pages/logos';

export interface IHeroProps
  extends Omit<
    IHeroSection,
    'image' | 'labelUrl' | 'labelBadge' | 'labelAdditionalText' | 'avatars'
  > {
  className?: string;
  image?: IHeroSection['image'];
}

function Hero({ className, label, title, description, image, actions, logos }: IHeroProps) {
  const hasImage = Boolean(image);
  return (
    <section className={cn('hero py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header
          className={cn(
            'flex w-full max-w-3xl flex-col md:mx-auto md:items-center',
            hasImage
              ? 'lg:max-w-3xl lg:px-8 xl:max-w-4xl xl:px-0'
              : 'lg:max-w-3xl lg:px-8 xl:max-w-4xl',
          )}
        >
          {label}
          <h1
            className={cn(
              'lg:leading-tighter text-3xl leading-tight font-semibold tracking-tight text-balance md:text-center md:text-4xl md:leading-tight md:tracking-tight lg:text-5xl xl:max-w-4xl xl:text-7xl xl:leading-tight xl:tracking-tighter',
              !hasImage && 'lg:max-w-3xl lg:px-8',
            )}
          >
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-normal tracking-tight text-balance text-muted-foreground md:mt-5 md:text-center">
            {description}
          </p>
          {actions && actions.length > 0 && (
            <Slot className={cn('mt-5 md:mt-6 md:justify-center')}>{actions}</Slot>
          )}
        </header>
        {image && (
          <Image
            className="mt-10 aspect-video w-full rounded-[.625rem] md:mt-16 md:rounded-2xl lg:mt-20"
            src={image.src ?? '/images/placeholder-16x9.svg'}
            alt={image.alt ?? ''}
            width={image.width ?? 1216}
            height={image.height ?? 684}
            priority
          />
        )}
        {logos && (
          <Logos
            className={cn(
              'mt-12 md:mt-14 lg:mt-20',
              !hasImage && 'mx-auto mt-16 max-w-5xl md:mt-24 lg:mt-32 xl:mt-36',
            )}
            title="Trusted by Creators & Businesses"
            variant={!hasImage ? 'column' : 'row'}
            logos={logos}
          />
        )}
      </div>
    </section>
  );
}

export default Hero;
