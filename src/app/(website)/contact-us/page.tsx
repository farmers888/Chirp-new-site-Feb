import { Metadata } from 'next';
import NextLink from 'next/link';

import { getMetadata } from '@/lib/get-metadata';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import CommunityColumnWide from '@/components/pages/contact-us/community--column-wide';
import CtaCoverGrid from '@/components/pages/contact-us/cta--cover-grid';
import HeroTestimonial from '@/components/pages/contact-us/hero--testimonial';

const contentData = {
  'hero--testimonial': {
    logos: [
      {
        alt: 'Case Status',
        src: '/images/logos/hex.svg',
        width: 97,
        height: 24,
      },
      {
        alt: 'Mark',
        src: '/images/logos/mark.svg',
        width: 128,
        height: 24,
      },
      {
        alt: 'Diamond',
        src: '/images/logos/diamond.svg',
        width: 103,
        height: 24,
      },
      {
        alt: 'Soft',
        src: '/images/logos/soft.svg',
        width: 128,
        height: 24,
      },
      {
        alt: 'Block',
        src: '/images/logos/block.svg',
        width: 95,
        height: 24,
      },
      {
        alt: 'Shield',
        src: '/images/logos/shield.svg',
        width: 132,
        height: 24,
      },
      {
        alt: 'Mono',
        src: '/images/logos/mono.svg',
        width: 60,
        height: 24,
      },
      {
        alt: 'Round',
        src: '/images/logos/round.svg',
        width: 106,
        height: 24,
      },
      {
        alt: 'Wave',
        src: '/images/logos/wave.svg',
        width: 98,
        height: 24,
      },
      {
        alt: 'Cluster',
        src: '/images/logos/cluster.svg',
        width: 112,
        height: 24,
      },
      {
        alt: 'Heavy',
        src: '/images/logos/heavy.svg',
        width: 101,
        height: 24,
      },
    ],
    title: 'We’re here to help',
    blockquote: {
      role: 'Head of Engineering',
      quote: 'The team was incredibly helpful and got us live in days.',
      authors: {
        name: 'Jane Doe',
        photo: '/images/placeholder-author.svg',
      },
    },
    description: 'Questions about pricing, features, or migration? We’ve got you.',
  },
  'community--column-wide': {
    label: 'Connect with us',
    title: 'Stay connected with Chirp updates',
    socials: [
      {
        url: 'https://slack.example.com',
        icon: 'slack' as const,
        title: 'Twitter',
        linkText: 'Follow',
        description: 'Latest product news and insights',
      },
      {
        url: 'https://twitter.com/example',
        icon: 'twitter' as const,
        title: 'LinkedIn',
        linkText: 'Follow',
        description: 'Professional updates and articles',
      },
      {
        url: 'https://github.com/example',
        icon: 'github' as const,
        title: 'GitHub',
        linkText: 'Explore',
        description: 'Explore our integrations and code',
      },
      {
        url: 'https://www.linkedin.com/company/example/',
        icon: 'linkedin' as const,
        title: 'Product Hunt',
        linkText: 'Visit',
        description: 'See user reviews and launch updates',
      },
      {
        url: 'https://discord.gg/example',
        icon: 'discord' as const,
        title: 'Slack',
        linkText: 'Join',
        description: 'Join our community for support',
      },
    ],
    description: 'Follow our channels for the latest news and tips to close deals faster.',
  },
  'cta--cover-grid': {
    image: {
      alt: '',
      src: '/images/placeholder-1x1.svg',
      width: 448,
      height: 448,
    },
    items: [
      {
        title: 'Discover how Chirp unifies your sales data',
        actions: (
          <Button className="mt-6 lg:mt-8" variant="secondary" asChild>
            <NextLink href={'/'}>Explore integrations</NextLink>
          </Button>
        ),
        description: 'Learn how Chirp integrates your tools into one streamlined platform.',
      },
      {
        title: 'Book a personalized demo',
        actions: (
          <Button className="mt-6 lg:mt-8" variant="secondary" asChild>
            <NextLink href={'/'}>Schedule demo</NextLink>
          </Button>
        ),
        description: 'See Chirp in action and ask your questions live.',
      },
    ],
    title: 'Get started with Chirp today',
    actions: (
      <Button className="mt-5 md:mt-6 lg:mt-8" variant="default" asChild>
        <NextLink href={'/'}>Get started</NextLink>
      </Button>
    ),
    description: 'Choose your path to clearer deals and faster closes.',
  },
};

const pageData = {
  pathname: '/contact-us',
  metadata: {
    title: 'Contact us | Chirp v2',
    description: 'Get in touch with our team',
    pathname: '/contact-us',
  },
};

export const metadata: Metadata = getMetadata({
  title: pageData.metadata?.title,
  description: pageData.metadata?.description,
  pathname: pageData.pathname,
});

export default function ContactUsPage() {
  return (
    <main className="pb-12 md:pb-14 lg:pb-16 xl:pb-24">
      <HeroTestimonial {...contentData['hero--testimonial']} />
      <CommunityColumnWide {...contentData['community--column-wide']} />
      <CtaCoverGrid {...contentData['cta--cover-grid']} />
    </main>
  );
}
