import { Metadata } from 'next';
import NextLink from 'next/link';
import { Clock, Layers, Lightbulb, PlugZap, Target, TrendingUp } from 'lucide-react';

import { getMetadata } from '@/lib/get-metadata';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BentoCasualLargeGrid from '@/components/pages/free-tools/bento--casual-large-grid';
import ComplianceSplitRow from '@/components/pages/free-tools/compliance--split-row';
import CtaCover from '@/components/pages/free-tools/cta--cover';
import FaqColumnNarrow from '@/components/pages/free-tools/faq--column-narrow';
import FeaturesCasualLargeColumnNarrow from '@/components/pages/free-tools/features--casual-large-column-narrow';
import FeaturesSplit from '@/components/pages/free-tools/features--split';
import FeaturesSplitCollapsed from '@/components/pages/free-tools/features--split-collapsed';
import FeaturesSplitCollapsedBleed from '@/components/pages/free-tools/features--split-collapsed-bleed';
import HeroColumnCentered from '@/components/pages/free-tools/hero--column-centered';

const contentData = {
  'hero--column-centered': {
    image: {
      alt: 'Control plane with policy, routing, and evals',
      src: '/images/placeholder-16x9.svg',
      width: 1216,
      height: 684,
    },
    label: <Badge className="mb-5 items-center lg:mb-9">Signal, not noise.</Badge>,
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
    title: 'Focus on deals worth closing. Faster.',
    actions: (
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-6 lg:flex-nowrap lg:gap-x-4">
        <Button variant="default" asChild>
          <NextLink href={'/placeholder'}>Get started</NextLink>
        </Button>{' '}
        <Button variant="secondary" asChild>
          <NextLink href={'/placeholder'}>Book a demo</NextLink>
        </Button>
      </div>
    ),
    description:
      'Our free tool instantly cuts through the clutter, giving you clear deal insights and next-step suggestions. Stop wasting time, start closing.',
  },
  'features--split-collapsed-bleed': {
    items: [
      {
        image: {
          alt: '',
          src: '/images/placeholder-16x10.svg',
          width: 992,
          height: 704,
        },
        title: 'Connect your data',
        description:
          'Securely link your CRM (HubSpot), communication (Outlook), and notes (Notion). Takes less than 60 seconds.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-16x10.svg',
          width: 992,
          height: 704,
        },
        title: 'Chirp analyzes conversations',
        description:
          'Our AI agents instantly scan your recent interactions for key signals, risks, and opportunities.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-16x10.svg',
          width: 992,
          height: 704,
        },
        title: 'Receive your deal brief',
        description:
          'Get a concise summary, next-step suggestions, and risk flags pushed directly to your inbox or CRM.',
      },
    ],
    label: 'Instant value',
    title: 'Get a deal snapshot in minutes',
    description:
      'Our free tool quickly processes your sales conversations to deliver actionable insights, cutting through the noise so you can focus on what matters.',
  },
  'bento--casual-large-grid': {
    items: [
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 640,
          height: 640,
        },
        label: 'Unify',
        title: 'Connects your entire stack',
        description:
          'Integrates seamlessly with HubSpot, Outlook, Notion, and all your meeting notes.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 640,
          height: 640,
        },
        label: 'Learn',
        title: 'AI agents learn from every conversation',
        description:
          'Our intelligent agents analyze interactions, extracting key signals and insights automatically.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 640,
          height: 640,
        },
        label: 'Focus',
        title: 'Reduce noise, get signal',
        description:
          'Chirp filters out distractions, delivering only the critical information you need to make decisions.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 640,
          height: 640,
        },
        label: 'Decide',
        title: 'Your always-on decision layer',
        description:
          'Get actionable intelligence and next-step suggestions pushed directly to your workflow.',
      },
    ],
    label: 'The problem',
    title: 'Stop drowning in tool sprawl and context switching',
    description:
      'Your sales team spends too much time navigating disconnected CRMs, inboxes, and note apps. Chirp brings it all together, so you can get back to selling.',
  },
  'features--split': {
    items: [
      {
        title: 'Consolidate your tech stack',
        lucideIcon: <Layers />,
        description: 'Reduce tool sprawl and simplify your sales environment.',
      },
      {
        title: 'Save 10+ hours per week',
        lucideIcon: <Clock />,
        description: 'Automate manual tasks and focus on strategic selling activities.',
      },
      {
        title: 'Boost pipeline velocity by +95% (placeholder)',
        lucideIcon: <TrendingUp />,
        description: 'Accelerate deal cycles with timely, actionable insights.',
      },
      {
        title: 'Focus on high-value deals',
        lucideIcon: <Target />,
        description: 'Identify and prioritize opportunities that truly matter for your business.',
      },
    ],
    label: 'Your ROI',
    title: 'Quantifiable impact for your sales team',
    actions: [],
    description:
      'Chirp delivers real results by streamlining workflows, saving time, and accelerating your pipeline. See how.',
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
        title: 'Unified interface',
        description: 'Connects to HubSpot, Outlook, Notion, and more for a single source of truth.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 704,
          height: 704,
        },
        title: 'Intelligent AI agents',
        description:
          'A flock of specialized agents continuously learn from every conversation and interaction.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 704,
          height: 704,
        },
        title: 'Contextual memory',
        description:
          'Builds a rich, always-on understanding of your deals, accounts, and market dynamics.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 704,
          height: 704,
        },
        title: 'Actionable intelligence',
        description:
          'Pushes real-time insights, next-step suggestions, and risk flags directly into your CRM.',
      },
    ],
    label: "Chirp's core",
    title: 'Chirp: your always-on decision layer for sales',
    description:
      "Chirp's unique layered workspace model brings together all your sales intelligence, powered by a flock of AI agents that continuously learn and push insights directly into your CRM.",
  },
  'faq--column-narrow': {
    items: [
      {
        answer:
          'Chirp is built for modern sales teams and individual sellers who are tired of tool sprawl and context switching. If you use HubSpot, Outlook, Notion, or similar tools and want to focus on high-value deals by getting clear, actionable insights from your conversations, Chirp is for you.',
        question: 'Who is Chirp for?',
      },
      {
        answer:
          'Chirp may not be the best fit for highly regulated industries (e.g., finance, healthcare) with strict on-premise data requirements, or teams that do not utilize cloud-based CRMs and communication tools. We prioritize agility and integration with modern sales stacks.',
        question: 'Who is Chirp NOT for?',
      },
    ],
    title: 'Is Chirp right for your team?',
  },
  'compliance--split-row': {
    items: [
      {
        label: 'Achieve peace of mind with our SOC 2 Type II certification.',
      },
      {
        label: 'Your data is protected with robust end-to-end encryption protocols.',
      },
      {
        label: 'We adhere to strict GDPR and CCPA regulations for data privacy.',
      },
    ],
    title: 'Ensuring your data is safe: enterprise-grade security and compliance you can trust',
    badges: [
      {
        alt: 'SOC 2 Type II',
        src: '/images/compliance-badges/soc2.svg',
        width: 72,
        height: 72,
      },
      {
        alt: 'ISO 27001 certified',
        src: '/images/compliance-badges/iso-27001.svg',
        width: 72,
        height: 72,
      },
      {
        alt: 'GDPR & CCPA compliant',
        src: '/images/compliance-badges/gdpr.svg',
        width: 72,
        height: 72,
      },
    ],
  },
  'features--casual-large-column-narrow': {
    items: [
      {
        title: 'Connect your sales stack',
        lucideIcon: <PlugZap />,
        description: 'Securely link HubSpot, Outlook, Notion, and other tools in under 60 seconds.',
      },
      {
        title: 'Receive instant insights',
        lucideIcon: <Lightbulb />,
        description:
          'Chirp analyzes your data and delivers actionable deal briefs directly to you.',
      },
    ],
    label: 'Quick start',
    title: 'Simple 2-step setup, instant value',
    description:
      "Get started with Chirp's free tool in minutes. No complex integrations, just quick value for your sales process.",
  },
  'cta--cover': {
    title: 'Ready to get signal, not noise?',
    actions: (
      <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-6 lg:mt-6 lg:flex-nowrap lg:gap-x-4 xl:mt-7">
        <Button variant="default" asChild>
          <NextLink href={'/placeholder'}>Get started</NextLink>
        </Button>{' '}
        <Button variant="secondary" asChild>
          <NextLink href={'/placeholder'}>Book a demo</NextLink>
        </Button>
      </div>
    ),
  },
};

const pageData = {
  pathname: '/free-tools',
  metadata: {
    title: 'free tools | Chirp v2',
    description: 'Build your next generation website with ease',
    pathname: '/free-tools',
  },
};

export const metadata: Metadata = getMetadata({
  title: pageData.metadata?.title,
  description: pageData.metadata?.description,
  pathname: pageData.pathname,
});

export default function FreeToolsPage() {
  return (
    <main className="pb-14 md:pb-16 lg:pb-16 xl:pb-24">
      <HeroColumnCentered {...contentData['hero--column-centered']} />
      <FeaturesSplitCollapsedBleed {...contentData['features--split-collapsed-bleed']} />
      <BentoCasualLargeGrid {...contentData['bento--casual-large-grid']} />
      <FeaturesSplit {...contentData['features--split']} />
      <FeaturesSplitCollapsed {...contentData['features--split-collapsed']} />
      <FaqColumnNarrow {...contentData['faq--column-narrow']} />
      <ComplianceSplitRow {...contentData['compliance--split-row']} />
      <FeaturesCasualLargeColumnNarrow {...contentData['features--casual-large-column-narrow']} />
      <CtaCover {...contentData['cta--cover']} />
    </main>
  );
}
