import { IBlockquote, ILogo } from '@/types/common';
import { cn } from '@/lib/utils';
import Logos from '@/components/pages/logos';
import Testimonial from '@/components/pages/testimonial';

import ContactForm from './contact-form';

interface IHeroProps {
  className?: string;
  title: string;
  description: string;
  blockquote?: IBlockquote;
  logos?: ILogo[];
}

function Hero({ title, description, blockquote, logos, className }: IHeroProps) {
  return (
    <section className={cn('hero pt-10 md:pt-16 lg:pt-24', className)}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 px-5 md:px-8 lg:grid-cols-[28rem_auto] xl:grid-cols-2 xl:gap-x-32">
        <h1 className="md:leading-tighter lg:leading-tighter col-start-1 text-3xl leading-tight font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="col-start-1 mt-4 mb-10 max-w-(--breakpoint-sm) text-lg leading-snug tracking-tight text-pretty text-muted-foreground lg:mb-14 lg:max-w-sm xl:max-w-lg">
          {description}
        </p>

        <ContactForm className="lg:col-start-2 lg:row-span-5 lg:row-start-1" />
        {blockquote && (
          <Testimonial
            className="mt-10 md:mt-12 lg:mt-0"
            quotes={blockquote}
            as="div"
            theme="border"
          />
        )}

        {logos && logos.length > 0 && (
          <Logos
            className="col-start-1 mt-10 gap-y-6 md:mt-12 lg:mt-14"
            title="Trusted by modern teams of all sizes"
            variant="column"
            logos={logos}
            showSeparator
          />
        )}
      </div>
    </section>
  );
}

export default Hero;
