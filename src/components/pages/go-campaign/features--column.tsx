// import Image from "next/image"

import { Slot } from '@radix-ui/react-slot';

import { type IFeatureItemIcon, type IFeaturesSection } from '@/types/landing';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface IFeaturesProps extends Omit<IFeaturesSection, 'features'> {
  className?: string;
  items: IFeatureItemIcon[];
}

function Features({ className, label, title, description, actions, items }: IFeaturesProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={cn('features py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto grid max-w-3xl px-5 md:px-8 lg:max-w-4xl lg:px-0 xl:max-w-6xl xl:px-8">
        <header className="flex w-full max-w-xl flex-col md:max-w-3xl lg:max-w-2xl xl:max-w-3xl">
          {label && <Badge className="mb-5 lg:mb-9">{label}</Badge>}
          <h2 className="lg:leading-tighter max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl md:leading-tight lg:text-5xl">
            {title}
          </h2>
          <p className="mt-3 text-lg leading-normal tracking-tight text-balance text-muted-foreground md:mt-5 lg:max-w-2xl">
            {description}
          </p>
          {actions}
        </header>

        <Separator className="my-12 md:my-14 lg:mt-32" />

        <ul className="grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3">
          {items.map(({ lucideIcon, title, description }, index) => (
            <li className="flex max-w-sm flex-col sm:max-w-none" key={index}>
              <Slot className="mb-2 size-8 shrink-0 stroke-1 text-foreground md:mb-3 md:size-9">
                {lucideIcon}
              </Slot>
              <h3 className="mb-1.5 text-lg leading-snug font-semibold tracking-tight text-pretty md:mb-2 md:text-xl md:leading-snug">
                {title}
              </h3>
              <p className="text-base leading-snug tracking-tight text-pretty text-muted-foreground md:text-lg md:leading-snug">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Features;
