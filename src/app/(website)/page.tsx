import { Metadata } from 'next';
import NextLink from 'next/link';
import { Bot, PlugZap } from 'lucide-react';

import { getMetadata } from '@/lib/get-metadata';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ComplianceGridWide from '@/components/pages/home/compliance--grid-wide';
import CtaSplit from '@/components/pages/home/cta--split';
import FeaturesCasualLargeColumnNarrow from '@/components/pages/home/features--casual-large-column-narrow';
import FeaturesSplitCollapsedAutoplay from '@/components/pages/home/features--split-collapsed-autoplay';
import HeroColumnCentered from '@/components/pages/home/hero--column-centered';
import ListsSplit from '@/components/pages/home/lists--split';
import NumbersRowCircles from '@/components/pages/home/numbers--row-circles';
import SectionSlider from '@/components/pages/home/section-slider';
import SectionSplitBleedMediaRight from '@/components/pages/home/section-split--bleed-media-right';

const contentData = {
  'hero--column-centered': {
    image: {
      alt: 'Control plane with policy, routing, and evals',
      src: '/images/placeholder-16x9.svg',
      width: 1216,
      height: 684,
    },
    label: <Badge className="mb-5 items-center lg:mb-9">For salespeople, by salespeople</Badge>,
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
    title: 'Focus on the deals worth closing',
    actions: (
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-6 lg:flex-nowrap lg:gap-x-4">
        <Button variant="default" asChild>
          <NextLink href={'/placeholder'}>Get started</NextLink>
        </Button>{' '}
        <Button variant="secondary" asChild>
          <NextLink href={'/placeholder'}>Book demo</NextLink>
        </Button>
      </div>
    ),
    description:
      'Chirp unifies your sales tools, turning conversations into clear next steps and boosting pipeline velocity.',
  },
  'section-split--bleed-media-right': {
    image: {
      alt: '',
      src: '/images/placeholder-4x3.svg',
      width: 821,
      height: 616,
    },
    label: 'Your Reality',
    title: 'Too many tools, not enough deals',
    actions: (
      <Button className="mt-5 md:mt-6 lg:max-w-xl" variant="default" asChild>
        <NextLink href={'/placeholder'}>See all integrations</NextLink>
      </Button>
    ),
    description:
      'Your sales stack is fragmented: CRMs, notes, email, and chat create constant context switching. This tool sprawl kills productivity and obscures deal context, but Chirp unifies everything into a coherent workspace.',
  },
  'numbers--row-circles': {
    items: [
      {
        value: '10+ hrs',
        description: 'saved per rep/week',
      },
      {
        value: '2.5x',
        description: 'pipeline velocity',
      },
      {
        value: '95%+',
        description: 'deal context accuracy',
      },
    ],
    title: 'Chirp delivers real results and measurable impact for modern sales teams',
    description:
      'Chirp delivers measurable impact where it counts: time saved, pipeline accelerated, and deals closed faster.',
  },
  'features--split-collapsed-autoplay': {
    items: [
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 608,
          height: 608,
        },
        title: 'The unified decision layer',
        description:
          'Chirp sits across your entire sales stack, connecting HubSpot, Outlook, Notion, and more to create a single source of truth for every deal.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 608,
          height: 608,
        },
        title: 'Persistent deal context',
        description:
          'Our intelligence layer continuously learns from every interaction, ensuring you always have the most relevant information at your fingertips, without manual updates.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 608,
          height: 608,
        },
        title: 'AI agents for next steps',
        description:
          "Chirp's AI agents analyze conversations, identify key signals, and automatically push next steps, updates, and follow-ups directly to your CRM.",
      },
    ],
    label: 'How it works',
    autoplay: true,
    duration: 6000,
  },
  'lists--split': {
    sections: [
      {
        items: [
          {
            title: 'Modern sales team',
            description:
              'You use a CRM (HubSpot, Salesforce), email (Outlook), and meeting notes (Notion, Gong) but struggle to connect them.',
          },
          {
            title: 'Value pipeline velocity',
            description:
              'You understand that faster deal cycles and clear next steps directly impact revenue.',
          },
          {
            title: 'Seek actionable intelligence',
            description:
              'You want signal, not noise, and need AI to deliver concrete next steps, not just summaries.',
          },
        ],
        title: "You're a good fit if...",
      },
      {
        items: [
          {
            title: 'Manual processes work',
            description:
              "Your team thrives on manual data entry and doesn't see the value in automation.",
          },
          {
            title: 'Single-tool environment',
            description: "You operate entirely within one tool and don't experience tool sprawl.",
          },
          {
            title: 'Early-stage startup',
            description: "You're a very small team without established sales processes or a CRM.",
          },
        ],
        title: 'Chirp is not for you if...',
      },
    ],
  },
  'compliance--grid-wide': {
    items: [
      {
        badge: {
          alt: 'SOC 2 Type II badge',
          src: '/images/compliance-badges/soc2.svg',
          width: 96,
          height: 96,
        },
        title: 'SOC 2 Type II',
        description: 'Annual audits ensure your data is always protected.',
      },
      {
        badge: {
          alt: 'Encryption badge',
          src: '/images/compliance-badges/iso-42001.svg',
          width: 96,
          height: 96,
        },
        title: 'End-to-end encryption',
        description: 'All data encrypted in transit and at rest.',
      },
      {
        badge: {
          alt: 'GDPR CCPA badge',
          src: '/images/compliance-badges/gdpr.svg',
          width: 96,
          height: 96,
        },
        title: 'GDPR & CCPA compliant',
        description: 'Adhering to global data privacy standards.',
      },
      {
        badge: {
          alt: 'ISO 27001 badge',
          src: '/images/compliance-badges/iso-27001.svg',
          width: 96,
          height: 96,
        },
        title: 'ISO 27001 Certified',
        description: 'International standard for information security management.',
      },
    ],
    label: 'Trust & Security',
    title: 'Enterprise-grade security and compliance, built for your peace of mind',
  },
  'features--casual-large-column-narrow': {
    items: [
      {
        title: 'Connect your tools',
        lucideIcon: <PlugZap />,
        description: 'Securely link HubSpot, Outlook, Notion, and more in minutes.',
      },
      {
        title: 'Activate AI agents',
        lucideIcon: <Bot />,
        description: "Chirp's AI agents immediately begin learning and delivering next steps.",
      },
    ],
    label: 'Quick Setup',
    title: 'Get started in 2 simple steps',
    actions: (
      <Button className="mt-5 md:mt-6" variant="default" asChild>
        <NextLink href={'/placeholder'}>Get started</NextLink>
      </Button>
    ),
    description:
      'Chirp integrates seamlessly with your existing tools, so you can start boosting pipeline velocity today.',
  },
  'section-slider': {
    items: [
      {
        key: 'starter',
        image: {
          alt: 'Ingestion pipeline',
          src: '/images/placeholder-16x9.svg',
          width: 1216,
          height: 684,
        },
      },
      {
        key: 'pro',
        image: {
          alt: 'Vector index',
          src: '/images/placeholder-16x9.svg',
          width: 1216,
          height: 684,
        },
      },
      {
        key: 'enterprise',
        image: {
          alt: 'Agent runtime',
          src: '/images/placeholder-16x9.svg',
          width: 1216,
          height: 684,
        },
      },
      {
        key: 'compare',
        image: {
          alt: 'Trace view',
          src: '/images/placeholder-16x9.svg',
          width: 1216,
          height: 684,
        },
      },
    ],
    label: 'Pricing',
    title: 'Clean tier comparison, without the fine print',
    actions: (
      <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-6 md:mt-6 lg:flex-nowrap lg:gap-x-4">
        <Button variant="default" asChild>
          <NextLink href={'/placeholder'}>Get started</NextLink>
        </Button>{' '}
        <Button variant="secondary" asChild>
          <NextLink href={'/placeholder'}>Book demo</NextLink>
        </Button>
      </div>
    ),
    autoplay: true,
    duration: 5000,
    description:
      'Starter covers the essentials, Pro adds scaling automation, and Enterprise unlocks custom controls and compliance.',
  },
  'cta--split': {
    image: {
      alt: '',
      src: '/images/placeholder-1x1.svg',
      width: 544,
      height: 544,
    },
    title: 'Focus on the deals worth closing',
    actions: (
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-6 lg:flex-nowrap lg:gap-x-4">
        <Button variant="default" asChild>
          <NextLink href={'/placeholder'}>Get started</NextLink>
        </Button>{' '}
        <Button variant="secondary" asChild>
          <NextLink href={'/placeholder'}>Book demo</NextLink>
        </Button>
      </div>
    ),
    description:
      'Chirp unifies your fragmented sales stack, giving you the clarity and automation to identify high-value opportunities and accelerate every deal. Stop wasting time on noise, start closing more.',
  },
};

const pageData = {
  pathname: '/',
  metadata: {
    title: 'Home',
    description: 'Build your next generation website with ease',
    pathname: '/',
  },
};

export const metadata: Metadata = getMetadata({
  title: pageData.metadata?.title,
  description: pageData.metadata?.description,
  pathname: pageData.pathname,
});

export default function HomePage() {
  return (
    <main className="pb-14 md:pb-16 lg:pb-16 xl:pb-24">
      <HeroColumnCentered {...contentData['hero--column-centered']} />
      <SectionSplitBleedMediaRight {...contentData['section-split--bleed-media-right']} />
      <NumbersRowCircles {...contentData['numbers--row-circles']} />
      <FeaturesSplitCollapsedAutoplay {...contentData['features--split-collapsed-autoplay']} />
      <ListsSplit {...contentData['lists--split']} />
      <ComplianceGridWide {...contentData['compliance--grid-wide']} />
      <FeaturesCasualLargeColumnNarrow {...contentData['features--casual-large-column-narrow']} />
      <SectionSlider {...contentData['section-slider']} />
      <CtaSplit {...contentData['cta--split']} />
    </main>
  );
}
