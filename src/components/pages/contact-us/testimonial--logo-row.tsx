import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { type IAuthor, type IBlockquote, type ILogo } from '@/types/common';
import { cn, getFormattedAuthorsName } from '@/lib/utils';
import { Link } from '@/components/ui/link';
import StackedAvatars from '@/components/pages/stacked-avatars';

interface ITestimonialItem extends IBlockquote {
  logo: ILogo;
  linkUrl?: string;
  linkText?: string;
}

interface ITestimonialProps {
  quote: ITestimonialItem;
  className?: string;
}

interface TestimonialAuthorProps {
  authors?: IAuthor | IAuthor[];
  role?: string;
}

function TestimonialAuthor({ authors, role }: TestimonialAuthorProps) {
  const authorsArray = Array.isArray(authors) ? authors : authors ? [authors] : [];
  const validAuthors = authorsArray.filter((author): author is IAuthor => Boolean(author));
  const avatars = validAuthors.reduce((acc, author) => {
    if (author.photo) acc.push(author.photo);
    return acc;
  }, [] as string[]);
  const names = validAuthors.map((author) => author.name || '');
  const hasNames = names.some(Boolean);

  if (avatars.length === 0 && !hasNames && !role) {
    return null;
  }

  return (
    <figcaption className="text-sm leading-none md:line-clamp-1 md:flex md:items-center">
      {authorsArray && authorsArray.length > 0 && (
        <>
          <StackedAvatars className="hidden lg:flex" avatars={avatars} names={names} size="md" />
          <div className="inline md:line-clamp-1 lg:ml-3">
            {names?.map((name, index) => (
              <span
                className={cn(
                  'leading-tight font-medium tracking-tight text-secondary-foreground',
                  index < names.length - 1 ? 'mr-px' : 'mr-1.5',
                )}
                key={index}
              >
                {names?.length > 1 ? getFormattedAuthorsName(name || '') : name}
                {index !== names?.length - 1 && ', '}
              </span>
            ))}
          </div>
        </>
      )}
      {role && (
        <>
          <span className="inline leading-tight tracking-tight text-muted-foreground md:line-clamp-1">
            {names?.length > 0 && <span className="mr-2">—</span>}
            {role}
          </span>
        </>
      )}
    </figcaption>
  );
}

function Testimonial({ quote, className }: ITestimonialProps) {
  const { quote: quoteText, authors, role, logo, linkUrl, linkText } = quote;

  return (
    <section className={cn('testimonial py-12 md:py-16 lg:py-24', className)}>
      <div className="mx-auto max-w-5xl px-5 md:px-8 xl:max-w-6xl xl:px-0">
        <figure className="flex flex-col overflow-hidden rounded-lg border border-border lg:flex-row-reverse lg:rounded-2xl">
          <div className="flex h-32 grow items-center justify-center p-5 md:h-36 md:p-7 lg:h-auto lg:p-10">
            <Image
              className="h-6 w-fit md:h-7 lg:h-8"
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
          </div>

          <div className="flex grow flex-col justify-between border-t border-border bg-primary-foreground p-5 md:p-7 lg:max-w-xl lg:border-t-0 lg:border-r lg:p-10 xl:max-w-176">
            <blockquote>
              <p className="text-lg leading-snug font-medium tracking-tight text-pretty text-foreground lg:text-xl lg:leading-normal">
                {quoteText}
              </p>
            </blockquote>
            <div className="mt-4 flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-4">
              <TestimonialAuthor authors={authors} role={role} />
              {linkUrl && linkText && (
                <Link
                  className="w-fit text-[0.8125rem] leading-none whitespace-nowrap text-secondary-foreground lg:text-sm lg:leading-none"
                  href={linkUrl}
                  variant="muted"
                  size="sm"
                  animation="arrow-right"
                >
                  {linkText}

                  <ArrowRight className="-ml-0.5 shrink-0" size={14} strokeWidth={2.5} />
                </Link>
              )}
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}

export default Testimonial;
