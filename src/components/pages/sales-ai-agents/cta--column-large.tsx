import { Slot } from '@radix-ui/react-slot';

import type { ILucideIcon } from '@/types/common';
import type { ICtaSection } from '@/types/landing';
import { cn } from '@/lib/utils';

interface ICTAProps extends ICtaSection, ILucideIcon {
  className?: string;
}

function CTA({ className, title, description, lucideIcon, actions }: ICTAProps) {
  return (
    <section className={cn('cta pt-14 md:py-16 lg:py-24', className)}>
      <div className="mx-auto flex max-w-5xl md:px-8">
        <div className="flex w-full flex-col items-center justify-between bg-muted/50 px-5 py-12 md:rounded-2xl md:border md:border-border md:px-8 md:py-10 lg:py-12">
          <header className="flex max-w-2xl flex-col items-center">
            {lucideIcon && (
              <div
                className="mb-8 flex size-16 items-center justify-center rounded-lg bg-foreground/10"
                aria-hidden
              >
                {/* TODO: Add icon here */}
                {/* <Slot className="size-8 text-foreground">
                  <DynamicIcon icon={lucideIcon} />
                </Slot>
                  */}
              </div>
            )}
            <h2 className="lg:leading-tighter text-center text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground md:text-4xl md:leading-tight lg:text-5xl">
              {title}
            </h2>
            <p className="mt-3 text-center text-lg leading-normal tracking-tight text-balance text-muted-foreground md:mt-5">
              {description}
            </p>
          </header>
          {/* TODO: full width for buttons */}
          <Slot
            className={cn(
              'mt-5 w-full max-w-md flex-col justify-center gap-y-6 sm:flex-row md:mt-6 md:w-fit',
            )}
          >
            {actions}
          </Slot>
        </div>
      </div>
    </section>
  );
}

export default CTA;
