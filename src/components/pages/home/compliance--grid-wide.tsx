import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface IComplianceCard {
  title: string;
  description: string;
  badge: IComplianceBadge;
}

interface IComplianceBadge {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface IComplianceProps {
  className?: string;
  label: string;
  title: string;
  items: IComplianceCard[];
}

function Compliance({ className, label, title, items }: IComplianceProps) {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <section className={cn('compliance py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto max-w-352 px-5 md:px-8">
        <div className="flex flex-col gap-7 md:gap-10 lg:gap-12 xl:gap-14">
          <header className="flex flex-col gap-3 md:items-center md:gap-5 lg:mx-auto lg:max-w-240 lg:items-center xl:gap-7">
            <Badge
              variant="default"
              size="lg"
              className="text-sm leading-none md:text-base md:leading-none"
            >
              {label}
            </Badge>
            <h2 className="max-w-4xl text-2xl leading-snug font-semibold tracking-tight text-balance text-foreground md:text-center md:text-4xl md:leading-tight">
              {title}
            </h2>
          </header>

          <ul className="grid auto-rows-fr grid-cols-1 lg:grid-cols-4">
            {items.map((item, index) => (
              <li
                key={index}
                className={cn(
                  'flex flex-col justify-between gap-5 border border-border p-5 lg:min-h-95 lg:gap-7 xl:min-h-107 xl:p-7',
                  index > 0 && 'border-t-0 lg:border-t lg:border-l-0',
                )}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl leading-snug font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-base leading-normal tracking-tight text-pretty text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <Image
                  src={item.badge.src ?? '/images/placeholder-1x1.svg'}
                  alt={item.badge.alt ?? ''}
                  width={item.badge.width ?? 80}
                  height={item.badge.height ?? 80}
                  className="h-18 lg:h-20"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Compliance;
