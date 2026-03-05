import { type IBentoSection } from '@/types/landing';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export interface IBentoProps extends IBentoSection {
  className?: string;
}

// TODO: update design, add responsive styles
function Bento({ className, label, title, description, actions, items }: IBentoProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={cn('bento py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto max-w-lg px-5 md:max-w-3xl md:px-8 lg:max-w-5xl xl:max-w-352">
        <header className="flex max-w-3xl flex-col xl:mx-auto xl:max-w-6xl xl:px-8">
          {label && <Badge className="mb-5 lg:mb-9">{label}</Badge>}
          <h2 className="lg:leading-tighter xl:leading-tighter max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl md:leading-tight lg:text-5xl xl:text-6xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-normal tracking-tight text-balance text-muted-foreground md:mt-5">
            {description}
          </p>
          {actions}
        </header>

        <ul className="mt-10 grid grid-cols-1 gap-5 md:mt-14 md:gap-8 lg:mt-20 lg:grid-cols-2">
          {items.map(
            ({ label: cardLabel, title: cardTitle, description: cardDescription }, index) => (
              <li
                className={cn(
                  'relative col-span-full grid h-120 w-full grow grid-cols-1 grid-rows-1 overflow-hidden rounded-2xl lg:h-auto',
                  index === 1 || index === 2
                    ? 'lg:col-span-1 lg:aspect-[1.20588]'
                    : 'lg:aspect-[2.460588]',
                )}
                key={index}
              >
                <div className="col-span-full row-span-full bg-card">
                  {/* <Image className="size-full object-cover" src={image.src} alt="" fill /> */}
                </div>
                <div className="relative z-10 col-span-full row-span-full">
                  <div className="flex h-full flex-col justify-end p-5 md:p-10">
                    {cardLabel && (
                      <Badge className="mb-auto" size="lg" variant="filled">
                        {cardLabel}
                      </Badge>
                    )}
                    <p className="max-w-245 text-base leading-normal tracking-tight text-pretty md:text-lg md:leading-normal [&_a]:text-primary [&_a:hover]:text-primary/80 [&_strong]:font-semibold">
                      <strong className="font-semibold text-foreground">{cardTitle}</strong>
                      {` `}
                      <span className="text-muted-foreground">{cardDescription}</span>
                    </p>
                  </div>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}

export default Bento;
