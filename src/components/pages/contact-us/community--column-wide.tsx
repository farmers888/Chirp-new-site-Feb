import { ArrowRight } from 'lucide-react';

import { type ICommunitySection } from '@/types/landing';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/components/ui/link';
import { getSocialIcon } from '@/components/icons';

export interface ICommunityProps extends ICommunitySection {
  className?: string;
}

function Community({ label, title, description, socials, className }: ICommunityProps) {
  if (!socials || socials.length === 0) {
    return null;
  }

  return (
    <section className={cn('community py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto flex max-w-md flex-col px-5 sm:max-w-(--breakpoint-sm) md:px-0 lg:max-w-3xl lg:px-8 xl:max-w-6xl">
        <header className="flex flex-col lg:max-w-(--breakpoint-sm) xl:ml-24">
          {label && <Badge className="mb-5 lg:mb-9">{label}</Badge>}
          <h2 className="lg:leading-tighter text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl md:leading-tight lg:text-5xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-normal tracking-tight text-balance text-muted-foreground md:mt-5 lg:max-w-2xl">
            {description}
          </p>
        </header>

        <ul className="mt-10 grid grow gap-5 sm:grid-cols-2 md:mt-14 md:auto-rows-fr md:grid-cols-3 lg:mt-16 lg:grid-cols-3 lg:gap-7 xl:mt-20 xl:grid-cols-5 xl:gap-8">
          {socials.map(({ icon, title, description, url, linkText }, index) => {
            const Icon = getSocialIcon(icon);

            return (
              <li key={index}>
                <Link
                  className="group flex h-full flex-col items-center rounded-lg border border-border bg-card px-5 py-6 transition-colors duration-300 hover:bg-muted/50"
                  href={url}
                  variant="ghost"
                  size="none"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="size-8 shrink-0 text-foreground" size={32} />
                  <h3 className="mt-3.5 text-center text-xl leading-snug font-semibold tracking-tight text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 mb-4.5 text-center text-sm leading-snug tracking-tight text-pretty text-muted-foreground">
                    {description}
                  </p>
                  <span className="mt-auto inline-flex w-fit items-center gap-x-1 text-[0.8125rem] leading-none whitespace-nowrap text-primary">
                    {linkText}
                    <ArrowRight
                      className="size-3.25 transition-transform duration-300 group-hover:translate-x-0.5"
                      strokeWidth={2.5}
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Community;
