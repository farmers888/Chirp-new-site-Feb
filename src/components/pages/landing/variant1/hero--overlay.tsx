// import Image from "next/image"

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
  return (
    <section className={cn('hero py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="relative mx-auto max-w-4xl px-5 md:px-8">
        {image && (
          <div className="mb:mb-[-34%] pointer-events-none relative mx-auto mb-[-16%] aspect-square w-full max-w-xl rounded-full bg-muted mask-[linear-gradient(to_bottom,black_3%,transparent_60%)] lg:mb-[-35.5%] lg:max-w-176">
            {/* <Image
              className="size-full object-cover"
              src={image.src}
              alt={image.alt ?? ""}
              width={image.width ?? 704}
              height={image.height ?? 704}
              priority
              quality={95}
            /> */}
          </div>
        )}

        <header className="mx-auto flex max-w-xl flex-col md:max-w-3xl md:items-center md:px-8 xl:max-w-none xl:px-0">
          {label}
          <h1 className="lg:leading-tighter text-3xl leading-tight font-semibold tracking-tight text-balance md:text-center md:text-4xl md:leading-tight md:tracking-tight lg:text-5xl xl:text-7xl xl:leading-tight xl:tracking-tighter">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-normal tracking-tight text-balance text-muted-foreground md:mt-5 md:text-center">
            {description}
          </p>
          <Slot className={cn('mt-5 md:mt-6 md:justify-center')}>{actions}</Slot>
        </header>

        {logos && (
          <Logos
            className="mt-10 md:mt-24 lg:mt-32 xl:mt-36"
            title="Trusted by Creators & Businesses"
            variant="column"
            showSeparator={false}
            logos={logos}
          />
        )}
      </div>
    </section>
  );
}

export default Hero;
