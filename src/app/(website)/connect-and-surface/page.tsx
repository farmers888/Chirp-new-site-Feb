import { Metadata } from 'next';
import NextLink from 'next/link';

import { getMetadata } from '@/lib/get-metadata';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CtaCoverGrid from '@/components/pages/connect-and-surface/cta--cover-grid';
import FeaturesSplitCollapsed from '@/components/pages/connect-and-surface/features--split-collapsed';
import HeroColumnCentered from '@/components/pages/connect-and-surface/hero--column-centered';
import IntegrationsGrid from '@/components/pages/connect-and-surface/integrations--grid';
import NumbersColumnGrid from '@/components/pages/connect-and-surface/numbers--column-grid';
import SectionSplitMediaLeft from '@/components/pages/connect-and-surface/section-split--media-left';
import SectionSplitMediaRight from '@/components/pages/connect-and-surface/section-split--media-right';
import SectionTabsCasualLargeEnhancedCentered from '@/components/pages/connect-and-surface/section-tabs--casual-large-enhanced-centered';

const contentData = {
  'hero--column-centered': {
    label: <Badge className="mb-5 items-center lg:mb-9">By sales, for sales</Badge>,
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
    title: "Your data is everywhere. Decisions shouldn't be.",
    actions: (
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-6 lg:flex-nowrap lg:gap-x-4">
        <Button variant="default" asChild>
          <NextLink href={'/placeholder'}>Get Started — It's Free</NextLink>
        </Button>{' '}
        <Button variant="secondary" asChild>
          <NextLink href={'/placeholder'}>Book Demo</NextLink>
        </Button>
      </div>
    ),
    description:
      'Chirp connects your entire sales stack into one decision layer, surfacing signal and suppressing noise to move deals forward faster.',
  },
  'numbers--column-grid': {
    image: {
      alt: 'Platform visualization',
      src: '/images/placeholder-16x10.svg',
      width: 1024,
      height: 640,
    },
    items: [
      {
        label: 'tools open per deal',
        value: '8',
      },
      {
        label: 'of signals missed',
        value: '80%',
      },
      {
        label: 'hours lost per week on archaeology',
        value: '10+',
      },
      {
        label: 'slower pipeline velocity',
        value: '3x',
      },
    ],
    title: 'The hidden cost of fragmented data',
    description:
      "Sales teams are drowning in data, but starving for insights. The average sales rep juggles **8 tools per deal**, leading to a fragmented view of their pipeline. This isn't just inefficient; it's actively costing you deals and time.",
  },
  'integrations--grid': {
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
    ],
    title: 'Connect your entire sales stack for unified decision-making',
    description:
      'Chirp integrates seamlessly with the tools your team already uses, pulling all relevant data into one intelligent decision layer. Surface signal, suppress noise, and move deals forward.',
  },
  'features--split-collapsed': {
    items: [
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 704,
          height: 704,
        },
        title: 'Focus on high-value activities',
        description: 'Automate data entry and context switching, freeing up hours for selling.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 704,
          height: 704,
        },
        title: 'Accelerate deal cycles',
        description:
          'Get real-time insights into deal health and next best actions, reducing stalls.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 704,
          height: 704,
        },
        title: 'Improve forecast accuracy',
        description:
          'Leverage comprehensive, up-to-date data for more reliable pipeline predictions.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 704,
          height: 704,
        },
        title: 'Boost win rates',
        description:
          'Equip reps with the right information at the right time to overcome objections and close.',
      },
    ],
    title: 'Unlock true sales velocity and accelerate your pipeline',
    description:
      "Chirp doesn't just connect your tools; it transforms raw data into actionable intelligence. By surfacing signal and suppressing noise, we empower your team to focus on what truly matters: closing deals.",
  },
  'section-tabs--casual-large-enhanced-centered': {
    items: [
      {
        key: 'interface',
        image: {
          alt: 'Ingest stage',
          src: '/images/placeholder-16x9.svg',
          width: 1216,
          height: 684,
        },
        label: 'Interface',
        description:
          "Experience a unified view of your entire sales pipeline. Chirp's intuitive interface brings all your data, insights, and actions into one seamless dashboard, eliminating tool-switching.",
      },
      {
        key: 'agent-layer',
        image: {
          alt: 'Embed stage',
          src: '/images/placeholder-16x9.svg',
          width: 1216,
          height: 684,
        },
        label: 'Agent Layer',
        description:
          'Automated agents work tirelessly in the background, capturing every interaction and updating your CRM. Focus on selling, not data entry.',
      },
      {
        key: 'memory',
        image: {
          alt: 'Run stage',
          src: '/images/placeholder-16x9.svg',
          width: 1216,
          height: 684,
        },
        label: 'Memory',
        description:
          "Chirp's memory layer stores and contextualizes every piece of information, from call transcripts to email threads, making it instantly retrievable and actionable.",
      },
      {
        key: 'deal-intelligence',
        image: {
          alt: 'Report stage',
          src: '/images/placeholder-16x9.svg',
          width: 1216,
          height: 684,
        },
        label: 'Deal Intelligence',
        description:
          'Gain deep insights into individual deals. Understand sentiment, identify risks, and pinpoint key decision-makers with AI-powered analysis.',
      },
      {
        key: 'company-intelligence',
        image: {
          alt: 'Govern stage',
          src: '/images/placeholder-16x9.svg',
          width: 1216,
          height: 684,
        },
        label: 'Company Intelligence',
        description:
          'Access comprehensive profiles of target accounts. Chirp aggregates public and private data to give you a 360-degree view of every company.',
      },
      {
        key: 'market-intelligence',
        image: {
          alt: 'Optimize stage',
          src: '/images/placeholder-16x9.svg',
          width: 1216,
          height: 684,
        },
        label: 'Market Intelligence',
        description:
          'Stay ahead of market trends and competitive shifts. Chirp continuously monitors the landscape, surfacing opportunities and threats relevant to your pipeline.',
      },
    ],
    label: 'How it works',
    title: 'Your new place of work for sales',
    description:
      'Chirp organizes your sales universe into an intuitive, layered workspace. Explore how each layer delivers unparalleled clarity and control over your deals.',
  },
  'section-split--media-right': {
    image: {
      alt: '',
      src: '/images/placeholder-1x1.svg',
      width: 544,
      height: 544,
    },
    label: 'Core Layer',
    title: 'Agent layer: ambient capture & CRM updates',
    description:
      "Chirp's agent layer works tirelessly in the background, capturing every interaction and updating your CRM automatically. No more manual data entry, no more missed context. Just pure, uninterrupted selling.",
  },
  'section-split--media-left': {
    image: {
      alt: '',
      src: '/images/placeholder-1x1.svg',
      width: 544,
      height: 544,
    },
    label: 'Core Layer',
    title: 'Semantic intelligence: continuous analysis, critical insights',
    description:
      "Chirp's semantic intelligence analyzes interactions, conversations, and documents. It understands context, identifies patterns, and surfaces deal-critical insights, transforming noise into actionable signal.",
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
        title: "You're a fit if...",
        description:
          'Your team is slowed by fragmented data, needs actionable insights, and values sales velocity to surface signal.',
      },
      {
        title: "You're not a fit if...",
        description:
          'Your sales process is already perfectly unified, you prefer manual data entry, or you thrive on data noise.',
      },
    ],
    title: 'Ready to transform your sales data into revenue?',
    actions: (
      <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-6 md:mt-6 lg:mt-8 lg:flex-nowrap lg:gap-x-4">
        <Button variant="default" asChild>
          <NextLink href={'/placeholder'}>Get Started — It's Free</NextLink>
        </Button>{' '}
        <Button variant="secondary" asChild>
          <NextLink href={'/placeholder'}>Book Demo</NextLink>
        </Button>
      </div>
    ),
    description:
      'See if Chirp is the right decision layer for your team. We help you surface signal and suppress noise.',
  },
};

const pageData = {
  pathname: '/connect-and-surface',
  metadata: {
    title: 'Connect & Surface | Chirp v2',
    description: 'Build your next generation website with ease',
    pathname: '/connect-and-surface',
  },
};

export const metadata: Metadata = getMetadata({
  title: pageData.metadata?.title,
  description: pageData.metadata?.description,
  pathname: pageData.pathname,
});

export default function ConnectAndSurfacePage() {
  return (
    <main className="pb-14 md:pb-16 lg:pb-16 xl:pb-24">
      <HeroColumnCentered {...contentData['hero--column-centered']} />
      <NumbersColumnGrid {...contentData['numbers--column-grid']} />
      <IntegrationsGrid {...contentData['integrations--grid']} />
      <FeaturesSplitCollapsed {...contentData['features--split-collapsed']} />
      <SectionTabsCasualLargeEnhancedCentered
        {...contentData['section-tabs--casual-large-enhanced-centered']}
      />
      <SectionSplitMediaRight {...contentData['section-split--media-right']} />
      <SectionSplitMediaLeft {...contentData['section-split--media-left']} />
      <CtaCoverGrid {...contentData['cta--cover-grid']} />
    </main>
  );
}
