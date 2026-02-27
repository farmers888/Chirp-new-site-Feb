import { Metadata } from 'next';
import NextLink from 'next/link';
import { ArrowRight, Clock, Lock, Mail } from 'lucide-react';

import { getMetadata } from '@/lib/get-metadata';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import CtaSplit from '@/components/pages/contact-us/cta--split';
import FaqSplit from '@/components/pages/contact-us/faq--split';
import HeroFeatures from '@/components/pages/contact-us/hero--features';
import TestimonialLogoRow from '@/components/pages/contact-us/testimonial--logo-row';

const contentData = {
  'hero--features': {
    items: [
      {
        title: 'Fast response',
        lucideIcon: <Mail />,
        description: 'We reply within 1–2 business days.',
      },
      {
        title: 'Secure by default',
        lucideIcon: <Lock />,
        description: 'Your data stays private and protected.',
      },
      {
        title: 'Flexible times',
        lucideIcon: <Clock />,
        description: 'Book a time that fits your schedule.',
      },
    ],
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
    title: 'Let’s talk about your project',
    description: 'Share a few details and we’ll follow up soon.',
  },
  'faq--split': {
    items: [
      {
        answer:
          'Chirp integrates directly with popular platforms like HubSpot, Outlook, and Notion, syncing your data in real time to keep everything unified.',
        question: 'How does Chirp connect with my sales tools?',
      },
      {
        answer:
          'Chirp consolidates sales data from all your systems, reducing context switching and giving you a single source of truth.',
        question: 'What if I have data spread across multiple CRMs?',
      },
      {
        answer:
          'Yes, Chirp scales from solo users to growing teams, offering tailored plans that fit your needs and budget.',
        question: 'Is Chirp suitable for small sales teams?',
      },
      {
        answer:
          'Security is built into Chirp with compliance to HIPAA, GDPR, SOC 2 Type II, and ISO 27001 standards.',
        question: 'How secure is my data with Chirp?',
      },
      {
        answer:
          'We offer a free Hobby tier and a two-week Pro trial so you can experience Chirp’s value first-hand.',
        question: 'Can I try Chirp before committing?',
      },
    ],
    title: 'Frequently Asked Questions',
  },
  'testimonial--logo-row': {
    quote: {
      logo: {
        alt: 'Case Status',
        src: '/images/logos/hex.svg',
        width: 97,
        height: 24,
      },
      role: 'Product Designer',
      quote:
        'Partnering with Acme Company has completely transformed how we operate. Their team delivered a robust platform that not only simplified our workflows but also enhanced our team’s productivity. What stood out most was their dedication to quality and their ability to truly understand our needs.',
      authors: [
        {
          name: 'Alex Rivera',
          photo: '/images/placeholder-author.svg',
        },
      ],
      linkUrl: '/case-study',
      linkText: 'Case study',
    },
  },
  'cta--split': {
    image: {
      alt: '',
      src: '/images/placeholder-1x1.svg',
      width: 544,
      height: 544,
    },
    label: 'Contact Us',
    title: 'Get in touch with Chirp sales',
    actions: (
      <div className="flex flex-wrap items-center gap-x-5 gap-y-6 lg:flex-nowrap lg:gap-x-7">
        <Button variant="default" asChild>
          <NextLink href={'/'}>See platform</NextLink>
        </Button>{' '}
        <Link
          className="w-fit gap-x-1 leading-none lg:leading-none"
          href={'/'}
          variant="foreground"
          animation="arrow-right"
        >
          Book demo <ArrowRight size={16} />
        </Link>
      </div>
    ),
    description:
      'Have questions or want a personalized demo? Fill out the form and our team will respond promptly to help you get started.',
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
      <HeroFeatures {...contentData['hero--features']} />
      <FaqSplit {...contentData['faq--split']} />
      <TestimonialLogoRow {...contentData['testimonial--logo-row']} />
      <CtaSplit {...contentData['cta--split']} />
    </main>
  );
}
