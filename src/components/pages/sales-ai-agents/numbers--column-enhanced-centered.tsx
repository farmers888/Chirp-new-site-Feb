import Image from 'next/image';

import { ILogo } from '@/types/common';
import { type INumbersSectionBase } from '@/types/landing';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface IStatsCard {
  label: string;
  value: string;
  description: string;
}

interface ITestimonialCard {
  logo: ILogo;
  company: string;
  quote: string;
  author: string;
  role: string;
}

interface INumbersProps extends INumbersSectionBase {
  className?: string;
  title: string;
  stats: IStatsCard[];
  testimonials?: ITestimonialCard[];
}

function NumbersColumnEnhancedCentered({
  className,
  label,
  title,
  stats,
  testimonials,
}: INumbersProps) {
  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <section className={cn('numbers py-12 md:py-14 lg:py-16 xl:py-24', className)}>
      <div className="mx-auto px-5 md:max-w-160 md:px-8 lg:max-w-336">
        <header className="flex flex-col items-center gap-3 md:gap-5 lg:gap-4">
          {label && (
            <Badge className="text-sm leading-none tracking-tight md:text-base md:leading-none">
              {label}
            </Badge>
          )}
          <h2 className="max-w-4xl text-center text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl md:leading-[1.125] lg:text-5xl lg:leading-tight xl:max-w-216 xl:leading-[1.125]">
            {title}
          </h2>
        </header>

        <div className="mt-10 flex flex-col gap-12 md:gap-14 lg:mt-14 lg:gap-16 xl:gap-20">
          <ul className="grid auto-rows-fr grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <li
                className="flex min-h-56 flex-col justify-between rounded-[.625rem] bg-card p-4 md:rounded-2xl md:p-6"
                key={index}
              >
                <span className="text-base leading-tight tracking-tight text-muted-foreground">
                  {stat.label}
                </span>
                <div className="flex flex-col gap-0.5 md:gap-2">
                  <strong className="text-5xl leading-[1.125] font-semibold tracking-tight md:text-6xl md:leading-none">
                    {stat.value}
                  </strong>
                  <p className="text-base leading-tight tracking-tight text-pretty text-muted-foreground md:text-lg">
                    {stat.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {testimonials && testimonials.length > 0 && (
            <ul className="grid grid-cols-1 gap-7 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <li key={index}>
                  <figure className="flex h-full flex-col gap-4 md:justify-between lg:gap-14 lg:pr-16">
                    <div className="flex flex-col gap-5">
                      <div
                        className="flex size-14 items-center justify-center rounded-xl bg-card"
                        aria-hidden="true"
                      >
                        <Image
                          className="size-8 object-contain"
                          src={testimonial.logo.src}
                          alt={testimonial.logo.alt ?? ''}
                          width={32}
                          height={32}
                        />
                      </div>
                      <blockquote className="flex flex-col gap-1 md:gap-2.5">
                        <cite className="text-xl leading-normal font-semibold tracking-tight text-foreground not-italic">
                          {testimonial.company}
                        </cite>
                        <p className="text-base leading-normal tracking-tight text-pretty text-muted-foreground">
                          {testimonial.quote}
                        </p>
                      </blockquote>
                    </div>
                    <figcaption className="border-b border-border pb-7 lg:pb-4">
                      <p className="text-sm leading-tight tracking-tight text-muted-foreground">
                        — {testimonial.author}, {testimonial.role}
                      </p>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default NumbersColumnEnhancedCentered;
