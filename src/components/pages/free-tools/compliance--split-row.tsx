import Image from 'next/image';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

interface IComplianceItem {
  label: string;
}

interface IComplianceBadge {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface IComplianceProps {
  className?: string;
  title: string;
  items: IComplianceItem[];
  badges: IComplianceBadge[];
}

function Compliance({ className, title, items, badges }: IComplianceProps) {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <section className={cn('compliance py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto max-w-full px-5 md:max-w-3xl md:px-8 lg:max-w-5xl">
        <div className="flex flex-col gap-5 md:gap-6 lg:gap-8">
          <h2 className="max-w-3xl text-2xl leading-tight font-semibold tracking-tight text-balance text-foreground md:text-3xl md:leading-snug">
            {title}
          </h2>

          <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-center lg:justify-between">
            <ul className="flex flex-col gap-3 lg:w-104 lg:gap-4">
              {items.map(({ label }, index) => (
                <li className="flex items-start gap-2" key={index}>
                  <Check
                    className="mt-1.5 h-3.5 w-3.5 shrink-0 text-muted-foreground"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span className="flex-1 text-lg leading-snug tracking-tight text-pretty text-muted-foreground">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-start gap-4 md:gap-9 lg:w-96 lg:justify-end lg:gap-12">
              {badges.map((badge, index) => (
                <Image
                  key={index}
                  src={badge.src ?? '/images/placeholder-1x1.svg'}
                  alt={badge.alt ?? ''}
                  width={badge.width ?? 96}
                  height={badge.height ?? 96}
                  className="h-18 w-fit shrink-0 md:h-24"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Compliance;
