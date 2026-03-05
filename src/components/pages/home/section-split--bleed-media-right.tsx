import Image from 'next/image';

import { type ISectionSplit } from '@/types/landing';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ISectionSplitProps extends ISectionSplit {
  className?: string;
}

// TODO: check CTA variants
function SectionSplit({
  className,
  label,
  title,
  description,
  image,
  actions,
}: ISectionSplitProps) {
  return (
    <section
      className={cn(
        'section-split w-full overflow-hidden py-12 md:py-14 lg:py-16 xl:py-24',
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-32 gap-y-10 px-5 md:gap-y-16 md:px-8 xl:grid xl:grid-cols-2">
        <header className="flex w-full max-w-xl flex-col md:max-w-3xl">
          {label && <Badge className="mb-5 lg:mb-9">{label}</Badge>}
          <h2 className="lg:leading-tighter text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl md:leading-tight lg:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-3 max-w-2xl text-lg leading-normal tracking-tight text-balance text-muted-foreground md:mt-5">
              {description}
            </p>
          )}
          {actions}
        </header>

        <div className="relative flex w-full max-w-3xl shrink-0 items-center">
          <Image
            className="relative aspect-4/3 h-auto w-full max-w-none shrink-0 rounded-[.625rem] md:rounded-2xl xl:h-154 xl:w-auto"
            src={image.src ?? '/images/placeholder-4x3.svg'}
            alt={image.alt ?? ''}
            width={image.width ?? 821}
            height={image.height ?? 616}
          />
        </div>
      </div>
    </section>
  );
}

export default SectionSplit;
