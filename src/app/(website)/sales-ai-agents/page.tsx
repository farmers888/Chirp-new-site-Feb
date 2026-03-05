import { Metadata } from 'next';
import NextLink from 'next/link';
import { ArrowRight, Bot, Briefcase, Combine, Play, Signal, UserPlus } from 'lucide-react';

import { getMetadata } from '@/lib/get-metadata';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import ComplianceGrid from '@/components/pages/sales-ai-agents/compliance--grid';
import CtaColumnLarge from '@/components/pages/sales-ai-agents/cta--column-large';
import FeaturesCasualLargeColumnNarrow from '@/components/pages/sales-ai-agents/features--casual-large-column-narrow';
import FeaturesColumn from '@/components/pages/sales-ai-agents/features--column';
import FeaturesCoverContent from '@/components/pages/sales-ai-agents/features--cover-content';
import FeaturesSplitScroll from '@/components/pages/sales-ai-agents/features--split-scroll';
import HeroCoverEnhancedCentered from '@/components/pages/sales-ai-agents/hero--cover-enhanced-centered';
import IntegrationsGrid from '@/components/pages/sales-ai-agents/integrations--grid';
import NumbersColumnEnhancedCentered from '@/components/pages/sales-ai-agents/numbers--column-enhanced-centered';
import TablesNumbers from '@/components/pages/sales-ai-agents/tables--numbers';

const contentData = {
  'hero--cover-enhanced-centered': {
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
    title: 'Now you can focus on the deals worth closing',
    actions: (
      <div className="flex w-full shrink-0 flex-col flex-wrap items-stretch gap-2.5 *:w-full md:w-fit md:flex-row md:items-center md:*:w-fit lg:flex-nowrap lg:gap-4">
        <Button variant="default" asChild>
          <NextLink href={'/placeholder'}>get started</NextLink>
        </Button>{' '}
        <Button variant="secondary" asChild>
          <NextLink href={'/placeholder'}>book demo</NextLink>
        </Button>
      </div>
    ),
    description:
      'Chirp removes the constant noise, surfaces clear next steps, and empowers your team to close more deals, faster and with greater confidence.',
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
    title: 'Your sales stack is a mess. Your deals are suffering.',
    actions: (
      <Link
        className="mt-5 w-fit gap-x-1 leading-none md:mt-7 lg:mt-9 lg:leading-none"
        href={'/placeholder'}
        size="lg"
        variant="foreground"
        animation="arrow-right"
      >
        see all integrations <ArrowRight size={18} />
      </Link>
    ),
    description:
      "Context is scattered across CRMs, communication tools, and meeting notes. Stop wasting time searching and start selling. Chirp unifies what's scattered and turns it into clear actions.",
  },
  'numbers--column-enhanced-centered': {
    label: 'your competitive edge in sales',
    stats: [
      {
        label: 'tools',
        value: '7',
        description: 'consolidated into one decision layer',
      },
      {
        label: 'pipeline velocity',
        value: '+95%',
        description: 'more deals, faster',
      },
      {
        label: 'hours back',
        value: '10+',
        description: 'per week for your team',
      },
    ],
    title: 'quantifiable impact on your sales pipeline: more deals, faster',
  },
  'features--split-scroll': {
    items: [
      {
        image: {
          alt: '',
          src: '/images/placeholder-16x10.svg',
          width: 736,
          height: 460,
        },
        label: 'interface',
        title: 'your command center',
        description:
          'a unified view of all deal activity, insights, and next steps. intuitive design puts signal, not noise, at your fingertips.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-16x10.svg',
          width: 736,
          height: 460,
        },
        label: 'agent layer',
        title: 'intelligent automation at work',
        description:
          'AI agents listen across your tech stack, identify key events, and proactively surface critical information and actions.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-16x10.svg',
          width: 736,
          height: 460,
        },
        label: 'memory',
        title: 'context that never forgets',
        description:
          'Chirp builds a persistent memory of every deal, contact, and company interaction, ensuring no context is ever lost.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-16x10.svg',
          width: 736,
          height: 460,
        },
        label: 'deal intelligence',
        title: 'predictive insights for every opportunity',
        description:
          'understand deal health, identify risks, and get recommendations on the fastest path to close, all in real-time.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-16x10.svg',
          width: 736,
          height: 460,
        },
        label: 'company intelligence',
        title: 'deep dives on your accounts',
        description:
          'automatically gather and synthesize public and private data on target accounts, giving you a 360-degree view.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-16x10.svg',
          width: 736,
          height: 460,
        },
        label: 'market intelligence',
        title: 'stay ahead of the curve',
        description:
          'track industry trends, competitor moves, and market shifts that impact your sales strategy and positioning.',
      },
    ],
  },
  'features--column': {
    items: [
      {
        title: 'always-on company intelligence',
        lucideIcon: <Briefcase />,
        description:
          'chirp continuously monitors public and private data sources, delivering real-time insights on target accounts directly to your workflow.',
      },
      {
        title: 'proactive agent orchestration',
        lucideIcon: <Bot />,
        description:
          'ai agents push relevant updates to your crm, suggest next steps, and connect you to the right internal resources, ensuring no deal falls through the cracks.',
      },
      {
        title: 'unified deal context',
        lucideIcon: <Combine />,
        description:
          'all fragmented deal information is brought together, creating a single source of truth for every opportunity.',
      },
    ],
    label: 'deep dive',
    title: 'how chirp works: focused capabilities',
    description:
      'beyond the core layers, chirp delivers two powerful capabilities to keep your sales team ahead.',
  },
  'features--cover-content': {
    title: 'For salespeople who want signal, not noise.',
    content:
      "<p><strong>Good fit if:</strong> You're a sales leader tired of fragmented data. Your team spends hours context-switching. You need clear, actionable next steps, not just more data. You want to increase pipeline velocity and close rates.</p><p><strong>Not a good fit if:</strong> You prefer manual data entry and spreadsheets. Your sales process is already perfectly optimized. You enjoy searching through multiple tools for deal context. You're not looking to scale your sales operations.</p>",
  },
  'compliance--grid': {
    items: [
      {
        title: 'HIPAA compliance',
        description: 'Ensuring the highest standards for health information protection.',
      },
      {
        title: 'ISO 27001 certified',
        description:
          'Globally recognized certification for information security management systems.',
      },
      {
        title: 'GDPR/CCPA adherence',
        description: 'Full adherence to global data privacy regulations for all users.',
      },
      {
        title: 'SOC 2 Type II audited',
        description:
          'Independent audit of security, availability, processing integrity, confidentiality, and privacy.',
      },
      {
        title: 'end-to-end encryption',
        description: 'All data encrypted at rest and in transit with industry-leading protocols.',
      },
      {
        title: 'continuous monitoring',
        description: 'Regular security assessments and penetration testing to maintain integrity.',
      },
    ],
    title: 'Your data is safe. Your operations are secure.',
  },
  'features--casual-large-column-narrow': {
    items: [
      {
        title: 'connect your tools',
        lucideIcon: <UserPlus />,
        description:
          'securely link your crm, communication apps, and meeting platforms. chirp integrates seamlessly.',
      },
      {
        title: 'define your agents',
        lucideIcon: <Play />,
        description:
          'tell chirp what to listen for and what actions to take. customize for your sales process.',
      },
    ],
    label: 'onboarding',
    title: '2-step setup. ready in minutes.',
    actions: (
      <Button className="mt-5 md:mt-6" variant="default" asChild>
        <NextLink href={'/placeholder'}>get started</NextLink>
      </Button>
    ),
    description: 'get chirp up and running quickly to start seeing results today.',
  },
  'tables--numbers': {
    items: [
      {
        title: 'Hobby',
        description: 'Free forever. Limited features. Includes 2-week Pro trial.',
      },
      {
        title: 'Pro',
        description: '$20/mo per user. Essential features for growing teams.',
      },
      {
        title: 'Pro+',
        description: '$60/mo per user. Advanced analytics and integrations.',
      },
      {
        title: 'Ultra',
        description: '$100/mo per user. Full suite of features and priority support.',
      },
      {
        title: 'Enterprise',
        description: 'Custom pricing for large organizations. Contact us for a tailored solution.',
      },
    ],
    title: 'Simple pricing for powerful results and growing teams.',
    description:
      "Choose the plan that fits your team's needs. All plans include a 2-week Pro trial.",
  },
  'cta--column-large': {
    title: 'Ready to cut the noise?',
    actions: (
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-6 lg:flex-nowrap lg:gap-x-4">
        <Button variant="default" asChild>
          <NextLink href={'/placeholder'}>get started</NextLink>
        </Button>{' '}
        <Button variant="secondary" asChild>
          <NextLink href={'/placeholder'}>book demo</NextLink>
        </Button>
      </div>
    ),
    lucideIcon: <Signal />,
    description:
      'Join the flock of top-performing sales teams who found their signal in the noise. Get started today.',
  },
};

const pageData = {
  pathname: '/sales-ai-agents',
  metadata: {
    title: 'Sales AI Agents | Chirp v2',
    description: 'Build your next generation website with ease',
    pathname: '/sales-ai-agents',
  },
};

export const metadata: Metadata = getMetadata({
  title: pageData.metadata?.title,
  description: pageData.metadata?.description,
  pathname: pageData.pathname,
});

export default function SalesAiAgentsPage() {
  return (
    <main className="pb-14 md:pb-16 lg:pb-16 xl:pb-24">
      <HeroCoverEnhancedCentered {...contentData['hero--cover-enhanced-centered']} />
      <IntegrationsGrid {...contentData['integrations--grid']} />
      <NumbersColumnEnhancedCentered {...contentData['numbers--column-enhanced-centered']} />
      <FeaturesSplitScroll {...contentData['features--split-scroll']} />
      <FeaturesColumn {...contentData['features--column']} />
      <FeaturesCoverContent {...contentData['features--cover-content']} />
      <ComplianceGrid {...contentData['compliance--grid']} />
      <FeaturesCasualLargeColumnNarrow {...contentData['features--casual-large-column-narrow']} />
      <TablesNumbers {...contentData['tables--numbers']} />
      <CtaColumnLarge {...contentData['cta--column-large']} />
    </main>
  );
}
