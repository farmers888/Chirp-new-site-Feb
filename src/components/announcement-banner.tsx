import { type Route } from 'next';
import NextLink from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { Separator } from '@/components/ui/separator';

import { Icons } from './icons';

interface IAnnouncementBannerProps {
  icon?: string;
  title: string;
  linkText: string;
  linkUrl: Route<string> | URL;
  variant?: 'link' | 'button';
}

function AnnouncementBanner({
  icon,
  title,
  linkText,
  linkUrl,
  variant = 'button',
}: IAnnouncementBannerProps) {
  const Icon = icon ? Icons[icon as keyof typeof Icons] : null;

  return (
    <div className="relative z-10 flex h-11 w-full items-center justify-center gap-x-4 bg-accent px-5 md:px-8">
      <div className="flex items-center gap-x-2.5">
        {icon && Icon && <Icon className="size-4 shrink-0 text-accent-foreground" />}
        <p className="line-clamp-1 text-sm leading-tight font-medium tracking-tight text-accent-foreground">
          {title}
        </p>
      </div>
      {variant === 'button' ? (
        <Button size="xs" asChild>
          <NextLink className="group flex items-center gap-x-1 pr-2 leading-none" href={linkUrl}>
            {linkText}
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </NextLink>
        </Button>
      ) : (
        <>
          <Separator className="h-6 bg-accent-foreground/20" orientation="vertical" />
          {/* TODO: figure out whether we need to bring this to an extra variant */}
          <Link
            className="group flex items-center gap-x-1 leading-none font-medium whitespace-nowrap text-accent-foreground"
            size="sm"
            animation="arrow-right"
            href={linkUrl}
          >
            {linkText}
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </>
      )}
    </div>
  );
}

export default AnnouncementBanner;
