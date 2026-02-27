import { Metadata } from 'next';
import NextLink from 'next/link';
import { BellOff, Clock, Database, DollarSign, SwitchCamera, TrendingUp } from 'lucide-react';

import { getMetadata } from '@/lib/get-metadata';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BentoClusterSix from '@/components/pages/go-campaign/bento--cluster-six';
import ComplianceGrid from '@/components/pages/go-campaign/compliance--grid';
import FaqSplitLinks from '@/components/pages/go-campaign/faq--split-links';
import FeaturesColumn from '@/components/pages/go-campaign/features--column';
import FeaturesSplitScrollWide from '@/components/pages/go-campaign/features--split-scroll-wide';
import HeroSplit from '@/components/pages/go-campaign/hero--split';
import NumbersRowCardsIcons from '@/components/pages/go-campaign/numbers--row-cards-icons';
import SectionSplitMediaLeft from '@/components/pages/go-campaign/section-split--media-left';
import SectionSplitMediaRight from '@/components/pages/go-campaign/section-split--media-right';

const contentData = {
  'hero--split': {
    image: {
      alt: 'Split hero product visual',
      src: '/images/placeholder-1x1.svg',
      width: 608,
      height: 608,
    },
    label: <Badge className="mb-5 lg:mb-9">Made by salespeople</Badge>,
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
      'Chirp cuts through noise, unifying your sales tools into one decision layer. Get clearer next steps and faster deal movement.',
  },
  'features--column': {
    items: [
      {
        title: 'Data scattered across tools',
        lucideIcon: <Database />,
        description: 'Your deal context lives in silos: CRMs, Slack, meeting notes, and email.',
      },
      {
        title: 'Constant context switching',
        lucideIcon: <SwitchCamera />,
        description: 'Wasting hours jumping between apps, losing focus on what truly matters.',
      },
      {
        title: 'Missed signals, lost opportunities',
        lucideIcon: <BellOff />,
        description:
          'Critical insights are buried in noise, leading to slower deal cycles and lost revenue.',
      },
    ],
    label: 'The problem',
    title: 'Sales data scattered, deals delayed',
    description:
      "Context switching, missed signals, and fragmented tools are costing you deals. It's time to unify your pipeline.",
  },
  'bento--cluster-six': {
    items: [
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 640,
          height: 640,
        },
        label: 'HubSpot',
        title: 'CRM data',
        description: 'Centralized deal context from your CRM.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 640,
          height: 640,
        },
        label: 'Outlook',
        title: 'Email threads',
        description: 'Actionable communication from your inbox.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 640,
          height: 640,
        },
        label: 'Notion',
        title: 'Meeting notes',
        description: "Structured insights from your team's notes.",
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 640,
          height: 640,
        },
        label: 'Slack',
        title: 'Team discussions',
        description: 'Collaborative intelligence from team chats.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 640,
          height: 640,
        },
        label: 'Calendar',
        title: 'Scheduling',
        description: 'Optimized workflows from your schedule.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 640,
          height: 640,
        },
        label: 'Zoom',
        title: 'Call recordings',
        description: 'Analyzed conversations from your calls.',
      },
    ],
    label: 'The solution',
    title: 'Unify your sales stack, amplify your signal',
    description:
      'Chirp brings together your essential sales tools, transforming scattered data into a single, intelligent decision layer. Say goodbye to context switching.',
  },
  'numbers--row-cards-icons': {
    items: [
      {
        title: 'Pipeline velocity',
        value: '+95%',
        lucideIcon: <TrendingUp />,
      },
      {
        title: 'Time saved weekly',
        value: '10+ hrs',
        lucideIcon: <Clock />,
      },
      {
        title: 'Increased win rates',
        value: '20%',
        lucideIcon: <DollarSign />,
      },
    ],
    title: 'Chirp delivers measurable impact, accelerating your sales cycle and saving time',
    description:
      'Our AI agents are engineered to accelerate your sales cycle and give your team valuable time back.',
  },
  'features--split-scroll-wide': {
    items: [
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 512,
          height: 512,
        },
        label: 'Step 1',
        title: 'Connect your sales stack',
        description:
          'Chirp integrates with HubSpot, Outlook, Notion, and more to pull all your deal context into one place. No more scattered data.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 512,
          height: 512,
        },
        label: 'Step 2',
        title: 'AI agents find the signal',
        description:
          'Our always-on AI agents listen and learn from every interaction, identifying critical insights and next steps. Focus on what matters.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 512,
          height: 512,
        },
        label: 'Step 3',
        title: 'Your intelligent decision layer',
        description:
          'Get clear, actionable recommendations and push key updates directly to your CRM. Eliminate deal noise and accelerate your pipeline.',
      },
    ],
    title: 'How Chirp works: your decision layer',
    subtitle: 'A unified workspace, built for clarity and speed',
  },
  'section-split--media-right': {
    image: {
      alt: '',
      src: '/images/placeholder-1x1.svg',
      width: 544,
      height: 544,
    },
    label: 'Capability spotlight',
    title: 'Company intelligence: always-on context',
    description:
      "Chirp's AI agents continuously learn from interactions across your sales stack. This builds a persistent understanding of each company and deal, ensuring you always have the full picture.",
  },
  'section-split--media-left': {
    image: {
      alt: '',
      src: '/images/placeholder-1x1.svg',
      width: 544,
      height: 544,
    },
    label: 'Capability spotlight',
    title: 'Agent layer: intelligent orchestration',
    description:
      "Chirp's AI agents listen to conversations and orchestrate data across your sales stack. They push critical updates to your CRM, ensuring your pipeline is always current and actionable.",
  },
  'faq--split-links': {
    faq: {
      items: [
        {
          answer:
            'Your team spends more time hunting for context than closing deals. Chirp unifies your tools into one decision layer.',
          question: "You're a sales leader tired of fragmented data?",
        },
        {
          answer:
            "Chirp's AI agents cut through the noise, giving you clearer next steps and faster deal movement.",
          question: 'You want to accelerate pipeline velocity?',
        },
        {
          answer:
            'Our platform transforms raw data from HubSpot, Outlook, and Notion into intelligent recommendations.',
          question: 'You value actionable insights, not just data?',
        },
        {
          answer:
            'Chirp is built for focused selling, eliminating distractions and amplifying critical deal signals.',
          question: "You believe in 'signal, not noise'?",
        },
      ],
      title: 'Chirp is for you if...',
    },
    list: {
      items: [
        {
          label: "You're happy with manual data entry",
        },
        {
          label: 'You prefer context switching over focused selling',
        },
        {
          label: "You don't use CRM, email, or meeting notes tools",
        },
        {
          label: "You're looking for a basic task manager",
        },
      ],
      title: 'Chirp is not for you if...',
    },
  },
  'compliance--grid': {
    items: [
      {
        title: 'SOC 2 Type II certified',
        description:
          'Annual audits ensure your sensitive sales data is always protected and handled securely.',
      },
      {
        title: 'GDPR compliant',
        description:
          'Full adherence to global data privacy regulations, giving you peace of mind and control over your data.',
      },
      {
        title: 'End-to-end encryption',
        description:
          'All your data is encrypted both in transit and at rest, safeguarding it from unauthorized access.',
      },
      {
        title: 'Regular security audits',
        description:
          'Proactive and continuous security assessments to identify and mitigate any potential vulnerabilities.',
      },
      {
        title: 'Data residency options',
        description:
          'Choose where your sensitive sales data is stored to meet your specific compliance requirements.',
      },
      {
        title: 'Dedicated security team',
        description:
          'Our expert team provides 24/7 monitoring and rapid response to any emerging security threats.',
      },
    ],
    title: 'Built on trust: enterprise-grade security and compliance for your peace of mind',
  },
};

const pageData = {
  pathname: '/go-campaign',
  metadata: {
    title: 'Landing | Chirp v2',
    description: 'Build your next generation website with ease',
    pathname: '/go-campaign',
  },
};

export const metadata: Metadata = getMetadata({
  title: pageData.metadata?.title,
  description: pageData.metadata?.description,
  pathname: pageData.pathname,
});

export default function GoCampaignPage() {
  return (
    <main className="pb-14 md:pb-16 lg:pb-16 xl:pb-24">
      <HeroSplit {...contentData['hero--split']} />
      <FeaturesColumn {...contentData['features--column']} />
      <BentoClusterSix {...contentData['bento--cluster-six']} />
      <NumbersRowCardsIcons {...contentData['numbers--row-cards-icons']} />
      <FeaturesSplitScrollWide {...contentData['features--split-scroll-wide']} />
      <SectionSplitMediaRight {...contentData['section-split--media-right']} />
      <SectionSplitMediaLeft {...contentData['section-split--media-left']} />
      <FaqSplitLinks {...contentData['faq--split-links']} />
      <ComplianceGrid {...contentData['compliance--grid']} />
    </main>
  );
}
