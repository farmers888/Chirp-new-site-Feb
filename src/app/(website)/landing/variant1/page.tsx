import { Metadata } from 'next';
import NextLink from 'next/link';
import { Award, Gem, Star, Zap } from 'lucide-react';

import { getMetadata } from '@/lib/get-metadata';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import FaqSplitLinks from '@/components/pages/landing/variant1/faq--split-links';
import FeaturesColumnWide from '@/components/pages/landing/variant1/features--column-wide';
import FeaturesNumberedGridNarrow from '@/components/pages/landing/variant1/features--numbered-grid-narrow';
import FeaturesSplitCollapsedCentered from '@/components/pages/landing/variant1/features--split-collapsed-centered';
import HeroOverlay from '@/components/pages/landing/variant1/hero--overlay';
import IntegrationsGrid from '@/components/pages/landing/variant1/integrations--grid';
import SectionSplitMediaLeft from '@/components/pages/landing/variant1/section-split--media-left';
import SectionSplitMediaRight from '@/components/pages/landing/variant1/section-split--media-right';
import SectionTabsCasualLargeEnhancedCentered from '@/components/pages/landing/variant1/section-tabs--casual-large-enhanced-centered';

const contentData = {
  'hero--overlay': {
    image: {
      alt: 'Overlay hero background',
      src: '/images/placeholder-16x9.svg',
      width: 1216,
      height: 684,
    },
    label: <Badge className="mb-5 items-center lg:mb-9">By salespeople, for salespeople</Badge>,
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
    title: 'Focus on deals worth closing',
    actions: (
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-6 lg:flex-nowrap lg:gap-x-4">
        <Button variant="default" asChild>
          <NextLink href={'/placeholder'}>Get Started</NextLink>
        </Button>{' '}
        <Button variant="secondary" asChild>
          <NextLink href={'/placeholder'}>Book Demo</NextLink>
        </Button>
      </div>
    ),
    description:
      'Chirp connects to HubSpot, Outlook, Notion, and meeting notes, listening and learning to cut through deal noise.',
  },
  'features--numbered-grid-narrow': {
    items: [
      {
        title: '28% of your time wasted',
      },
      {
        title: '80% of sales data ignored',
      },
      {
        title: '10+ hours lost per week',
      },
      {
        title: '80% of deals stall',
      },
    ],
    title: 'The hidden cost of sales noise',
    description:
      "Fragmented data, irrelevant information, and manual tasks are silently eroding your team's productivity and pipeline velocity.",
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
    title: 'Sales data is everywhere. Chirp brings it together.',
    actions: (
      <Button className="mt-5 md:mt-7 lg:mt-9" variant="default" asChild>
        <NextLink href={'/integrations'}>See all integrations</NextLink>
      </Button>
    ),
    description:
      'Stop drowning in fragmented insights. Chirp connects your entire sales stack, transforming chaos into clear, actionable next steps and making sense of it all.',
  },
  'features--split-collapsed-centered': {
    items: [
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 576,
          height: 576,
        },
        title: '7 tools, 1 decision layer',
        description:
          'Unify your entire sales stack into a single, intelligent platform for seamless operations.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 576,
          height: 576,
        },
        title: 'Boost pipeline velocity',
        description:
          'Accelerate deals through your pipeline with precision insights and clear next steps. (+95% improvement (placeholder metric))',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 576,
          height: 576,
        },
        title: 'Reclaim your time',
        description:
          'Automate manual tasks and cut through noise, giving your team more hours back for selling.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 576,
          height: 576,
        },
        title: 'Find the path to close',
        description:
          'Navigate complex deals with confidence, always knowing the optimal next action to secure the win.',
      },
    ],
    title: 'Real outcomes, not just promises',
    description:
      'Chirp transforms your sales process, delivering tangible results that empower your team to focus on what truly matters: closing deals.',
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
          "Your personalized dashboard for real-time insights, next steps, and deal management. Intuitive and actionable, it's where you interact with Chirp's intelligence.",
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
          'A flock of specialized AI agents working 24/7 to listen, learn, and push critical data to your CRM. They handle the noise, so you focus on the signal.',
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
          'Chirp builds a persistent context of your deals, products, and buyers, ensuring smarter, more relevant guidance that evolves with every interaction.',
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
          'Real-time analysis of deal health, identifying risks and opportunities to keep your pipeline flowing. Find the path to close with confidence.',
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
          'Deep insights into your target accounts, their market position, and key stakeholders for precision targeting. Always-on learning about who you sell to.',
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
          'Stay ahead with real-time market trends, competitive analysis, and emerging opportunities relevant to your sales strategy. Never miss a beat.',
      },
    ],
    label: 'How it works',
    title: 'Your new sales workspace',
    description:
      "Chirp's layered architecture brings precision to every stage of your sales cycle. Explore how each component works in harmony to deliver signal, not noise.",
  },
  'section-split--media-right': {
    image: {
      alt: '',
      src: '/images/placeholder-1x1.svg',
      width: 544,
      height: 544,
    },
    label: 'Core Layer',
    title: 'Always-on learning about you, your product, and who you sell to',
    description:
      "Chirp continuously builds a deep understanding of your company's unique value, product features, and target buyers. This persistent context ensures every interaction is tailored, relevant, and drives deals forward.",
  },
  'section-split--media-left': {
    image: {
      alt: '',
      src: '/images/placeholder-1x1.svg',
      width: 544,
      height: 544,
    },
    label: 'Core Layer',
    title: 'Your flock of agents always working in the background',
    description:
      "Chirp's ambient agents listen, pushing updates to your CRM. Capture meeting notes, emails, and more. Stay in sync with seamless MCP data flow.",
  },
  'faq--split-links': {
    faq: {
      items: [
        {
          answer:
            'You want to cut through the noise and focus on high-value deals, not distractions.',
          question: 'Salespeople seeking precision',
        },
        {
          answer:
            'Your sales data is scattered across multiple tools, and you need a unified, actionable view.',
          question: 'Teams with fragmented data',
        },
        {
          answer:
            "You're looking to accelerate deals, improve forecasting, and empower your team with clear next steps.",
          question: 'Leaders driving pipeline velocity',
        },
        {
          answer:
            'You aim to automate manual tasks and gain back valuable selling time, focusing on strategic activities.',
          question: 'Teams prioritizing efficiency',
        },
      ],
      title: 'For signal, not noise.',
    },
    list: {
      items: [
        {
          label: 'Solo reps without a CRM',
        },
        {
          label: 'Teams without existing data',
        },
        {
          label: 'Those seeking generic AI',
        },
        {
          label: 'Companies without a sales process',
        },
      ],
      title: 'Not a good fit',
    },
  },
  'features--column-wide': {
    items: [
      {
        title: 'Hobby (Free)',
        lucideIcon: <Gem />,
        description: 'Two-week Pro trial, Limited AI tokens, Limited integrations',
      },
      {
        title: 'Pro ($20/mo)',
        lucideIcon: <Star />,
        description:
          'Extended AI limits, Unlimited integrations, Background agents, More context windows',
      },
      {
        title: 'Pro+ ($60/mo)',
        lucideIcon: <Award />,
        description: '3× AI limits, Deep research mode, Custom integrations, Priority support',
      },
      {
        title: 'Ultra ($100/mo)',
        lucideIcon: <Zap />,
        description: '10× AI limits, Priority feature access, Priority support',
      },
    ],
    title: 'Simple pricing. Powerful results.',
    actions: (
      <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-6 md:mt-6 lg:flex-nowrap lg:gap-x-4">
        <Button variant="default" asChild>
          <NextLink href={'/placeholder'}>Sign up — it's free</NextLink>
        </Button>{' '}
        <Button variant="secondary" asChild>
          <NextLink href={'/placeholder'}>Book demo</NextLink>
        </Button>
      </div>
    ),
    description:
      'Choose the plan that fits your sales goals. All plans include our secure-by-design architecture and 2-step setup, getting you ready in minutes. Looking for an Enterprise solution? Contact us.',
  },
};

const pageData = {
  pathname: '/landing/variant1',
  metadata: {
    title: 'Landing | Chirp v2',
    description: 'Build your next generation website with ease',
    pathname: '/landing/variant1',
  },
};

export const metadata: Metadata = getMetadata({
  title: pageData.metadata?.title,
  description: pageData.metadata?.description,
  pathname: pageData.pathname,
});

export default function LandingVariant1Page() {
  return (
    <main className="pb-14 md:pb-16 lg:pb-16 xl:pb-24">
      <HeroOverlay {...contentData['hero--overlay']} />
      <FeaturesNumberedGridNarrow {...contentData['features--numbered-grid-narrow']} />
      <IntegrationsGrid {...contentData['integrations--grid']} />
      <FeaturesSplitCollapsedCentered {...contentData['features--split-collapsed-centered']} />
      <SectionTabsCasualLargeEnhancedCentered
        {...contentData['section-tabs--casual-large-enhanced-centered']}
      />
      <SectionSplitMediaRight {...contentData['section-split--media-right']} />
      <SectionSplitMediaLeft {...contentData['section-split--media-left']} />
      <FaqSplitLinks {...contentData['faq--split-links']} />
      <FeaturesColumnWide {...contentData['features--column-wide']} />
    </main>
  );
}
