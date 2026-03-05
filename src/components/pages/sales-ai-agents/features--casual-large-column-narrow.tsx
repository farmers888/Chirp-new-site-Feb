import { Slot } from '@radix-ui/react-slot';

import { type IFeatureItemIcon, type IFeaturesSection } from '@/types/landing';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface IFeaturesProps extends Omit<IFeaturesSection, 'items'> {
  className?: string;
  items: IFeatureItemIcon[];
}

function Features({ className, label, title, description, actions, items }: IFeaturesProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={cn('features py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto grid max-w-3xl px-5 md:px-8">
        <header className="flex w-full max-w-xl flex-col md:max-w-3xl">
          {label && <Badge className="mb-5 lg:mb-9">{label}</Badge>}
          <h2 className="lg:leading-tighter xl:leading-tighter text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl md:leading-tight lg:text-5xl xl:text-6xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-normal tracking-tight text-balance text-muted-foreground md:mt-5">
            {description}
          </p>
          {actions}
        </header>

        <Separator className="my-14 lg:mt-32 xl:mt-36" />

        <ul className="grid grid-cols-1 gap-x-16 gap-y-9 sm:grid-cols-2 md:gap-y-16 xl:gap-x-32">
          {items.map(({ title, description, lucideIcon }, index) => (
            <li className="flex max-w-sm flex-col sm:max-w-none" key={index}>
              <Slot className="mb-3 size-8 shrink-0 text-foreground md:mb-5 md:size-9">
                {lucideIcon}
              </Slot>
              <div className="text-base leading-normal font-semibold tracking-tight text-pretty md:text-lg md:leading-normal">
                <h3 className="inline text-foreground">{title}</h3>
                {` `}
                <p className="inline text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Features;
