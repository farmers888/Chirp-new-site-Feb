import { Metadata } from 'next';
import NextLink from 'next/link';
import { CheckCircle, XCircle } from 'lucide-react';

import { getMetadata } from '@/lib/get-metadata';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import BentoWrapWideCentered from '@/components/pages/home/bento--wrap-wide-centered';
import ComplianceSplitCollapsedRight from '@/components/pages/home/compliance--split-collapsed-right';
import CtaCoverGrid from '@/components/pages/home/cta--cover-grid';
import FeaturesSplit from '@/components/pages/home/features--split';
import FeaturesSplitCollapsedBleed from '@/components/pages/home/features--split-collapsed-bleed';
import FeaturesCardsSplitWide from '@/components/pages/home/features-cards--split-wide';
import HeroSplit from '@/components/pages/home/hero--split';
import IntegrationsGrid from '@/components/pages/home/integrations--grid';
import NumbersRowCircles from '@/components/pages/home/numbers--row-circles';
import SectionTabsCasualLargeEnhancedCentered from '@/components/pages/home/section-tabs--casual-large-enhanced-centered';

const contentData = {
  'hero--split': {
    image: {
      alt: 'Split hero product visual',
      src: '/images/placeholder-1x1.svg',
      width: 608,
      height: 608,
    },
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
      "Chirp's AI agents unify your sales stack, learn from conversations, and cut through noise. Focus on deals, not distractions.",
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
    title: "Sales data is everywhere. Your focus shouldn't be.",
    actions: (
      <Button className="mt-5 md:mt-7 lg:mt-9" variant="default" asChild>
        <NextLink href={'/placeholder'}>See all integrations</NextLink>
      </Button>
    ),
    description:
      'HubSpot, Outlook, Notion, Slack, CRM... your critical deal context is scattered across a dozen tools. This fragmentation leads to missed signals, wasted time, and deals slipping through the cracks.',
  },
  'bento--wrap-wide-centered': {
    items: [
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 640,
          height: 640,
        },
        label: 'HubSpot',
        title: 'CRM context.',
        description: 'Automatically pulls deal stages, contact info, and activity logs.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 640,
          height: 640,
        },
        label: 'Outlook',
        title: 'Email insights.',
        description: 'Analyzes communication for sentiment, commitments, and next steps.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 640,
          height: 640,
        },
        label: 'Notion',
        title: 'Knowledge base.',
        description: 'Extracts key information from notes, playbooks, and competitive intel.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-1x1.svg',
          width: 640,
          height: 640,
        },
        label: 'Meetings',
        title: 'Conversation intelligence.',
        description: 'Summarizes calls, identifies action items, and tracks buyer intent.',
      },
    ],
    label: 'Unify Your Stack',
    title: 'Chirp brings it all together: one decision layer',
    description:
      'Our AI agents connect to your entire sales stack, transforming scattered information into actionable insights. Get the signal, not the noise, from every interaction.',
  },
  'numbers--row-circles': {
    items: [
      {
        value: '25%',
        description: 'Hours saved weekly',
      },
      {
        value: '95%',
        description: 'Pipeline velocity',
      },
      {
        value: '99%',
        description: 'Data retrieval accuracy',
      },
    ],
    title: "Unlock your team's full potential: see the real impact Chirp delivers.",
    description:
      'See how Chirp directly translates into measurable improvements for your sales team.',
  },
  'section-tabs--casual-large-enhanced-centered': {
    items: [
      {
        key: 'data-ingestion',
        image: {
          alt: 'Ingest stage',
          src: '/images/placeholder-16x9.svg',
          width: 1216,
          height: 684,
        },
        label: 'Data Ingestion',
        description:
          'Chirp securely connects to your entire sales stack—CRMs, email, calendars, meeting notes, and more. We unify scattered data into a single, intelligent source.',
      },
      {
        key: 'ai-agent-layer',
        image: {
          alt: 'Embed stage',
          src: '/images/placeholder-16x9.svg',
          width: 1216,
          height: 684,
        },
        label: 'AI Agent Layer',
        description:
          "Our proprietary AI agents analyze every interaction, identifying key deal context, buyer intent, and next steps. They surface critical information you'd otherwise miss.",
      },
      {
        key: 'persistent-memory',
        image: {
          alt: 'Run stage',
          src: '/images/placeholder-16x9.svg',
          width: 1216,
          height: 684,
        },
        label: 'Persistent Memory',
        description:
          'Chirp learns from every conversation and decision, building a persistent memory of your deals and customers. This ensures context is never lost, improving over time.',
      },
      {
        key: 'actionable-workflow',
        image: {
          alt: 'Report stage',
          src: '/images/placeholder-16x9.svg',
          width: 1216,
          height: 684,
        },
        label: 'Actionable Workflow',
        description:
          'From surfacing critical insights to pushing updates directly to your CRM or suggesting next steps, Chirp integrates seamlessly into your daily workflow, driving pipeline velocity.',
      },
    ],
    label: 'How it works',
    title: "Beyond chatbots: Chirp's layered intelligence model",
    description:
      "Chirp isn't just another AI tool. Our unique architecture processes, learns, and acts on your sales data, delivering signal, not noise.",
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
        title: 'Unified deal history',
        description:
          'All past interactions, emails, calls, and CRM updates are automatically consolidated and easily searchable.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-16x10.svg',
          width: 992,
          height: 704,
        },
        title: 'Dynamic buyer profiles',
        description:
          'Chirp continuously updates buyer profiles with new insights, preferences, and pain points, adapting as deals progress.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-16x10.svg',
          width: 992,
          height: 704,
        },
        title: 'Automated knowledge base',
        description:
          'Learns from your internal documents, playbooks, and competitive intelligence, making relevant information instantly accessible.',
      },
      {
        image: {
          alt: '',
          src: '/images/placeholder-16x10.svg',
          width: 992,
          height: 704,
        },
        title: 'Proactive contextual alerts',
        description:
          "Get notified when key information changes or new insights emerge that impact your deals, ensuring you're always one step ahead.",
      },
    ],
    label: 'Company Intelligence',
    title: 'Never lose critical deal context again',
    description:
      'Chirp builds a persistent, evolving memory of every interaction, document, and insight. This ensures your team always has the full, up-to-date picture, eliminating context switching and missed opportunities.',
  },
  'features-cards--split-wide': {
    items: [
      {
        title: 'Ambient AI agents: always-on intelligence',
        description:
          "Chirp's AI agents work silently in the background, analyzing conversations, identifying key signals, and surfacing critical deal context without requiring manual input. They learn from every interaction, providing proactive insights.",
      },
      {
        title: 'Automated CRM updates & next steps',
        description:
          'Chirp pushes relevant deal updates, action items, and buyer intent directly to your CRM. It identifies and suggests clear next steps, ensuring no opportunity is missed and your pipeline velocity accelerates.',
      },
    ],
  },
  'features--split': {
    items: [
      {
        title: "You're a sales leader or AE",
        lucideIcon: <CheckCircle />,
        description: 'Driving pipeline velocity and closing more deals.',
      },
      {
        title: 'You use multiple sales tools',
        lucideIcon: <CheckCircle />,
        description: 'HubSpot, Outlook, Notion, CRM, meeting notes – we unify your stack.',
      },
      {
        title: 'You value data-driven outcomes',
        lucideIcon: <CheckCircle />,
        description: 'Focused on measurable improvements in efficiency and revenue.',
      },
      {
        title: 'Not for solo entrepreneurs',
        lucideIcon: <XCircle />,
        description: "Chirp's power scales with team collaboration and complex sales cycles.",
      },
      {
        title: 'Not for non-sales roles',
        lucideIcon: <XCircle />,
        description: 'Our AI agents are specifically trained on sales conversations and data.',
      },
      {
        title: 'Not for basic CRM users',
        lucideIcon: <XCircle />,
        description: 'Chirp augments, not replaces, your existing sales tech stack.',
      },
    ],
    label: 'Qualify Your Fit',
    title: 'Is Chirp the right solution for your sales team?',
    description:
      'Chirp helps sales leaders and account executives focus on deals that matter. It transforms scattered data into actionable insights, delivering signal, not noise.',
  },
  'compliance--split-collapsed-right': {
    items: [
      {
        answer:
          'We employ end-to-end encryption, regular security audits, and strict access controls to safeguard your sensitive sales information.',
        question: 'How is my data secured?',
      },
      {
        answer:
          'Yes, Chirp is fully compliant with GDPR, CCPA, and other major data privacy regulations, ensuring your data is handled responsibly.',
        question: 'Is Chirp compliant with data privacy regulations?',
      },
      {
        answer:
          'Only authorized personnel with strict need-to-know access can view your data, and all access is logged and audited. You maintain full control over data sharing.',
        question: 'Who has access to my data?',
      },
      {
        answer:
          'Our infrastructure is hosted on secure, redundant cloud platforms with 24/7 monitoring, disaster recovery plans, and continuous vulnerability management.',
        question: 'What operational controls are in place?',
      },
      {
        answer:
          'Yes, Chirp provides granular data retention policies, allowing you to define how long your data is stored and when it is automatically purged.',
        question: 'Can I control data retention?',
      },
    ],
    title: 'Your data. Your control. Our commitment.',
    badges: [
      {
        alt: 'SOC 2 Type II',
        src: '/images/compliance-badges/soc2.svg',
        width: 72,
        height: 72,
      },
      {
        alt: 'ISO 27001',
        src: '/images/compliance-badges/iso-27001.svg',
        width: 72,
        height: 72,
      },
      {
        alt: 'GDPR Compliant',
        src: '/images/compliance-badges/gdpr.svg',
        width: 72,
        height: 72,
      },
      {
        alt: 'ISO 42001',
        src: '/images/compliance-badges/iso-42001.svg',
        width: 72,
        height: 72,
      },
    ],
    description:
      'Chirp is built on a foundation of enterprise-grade security and compliance. We protect your sensitive sales data with robust measures, ensuring trust and operational integrity.',
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
        title: 'Start your free trial today',
        actions: (
          <Button className="mt-6 lg:mt-8" variant="default" asChild>
            <NextLink href={'/placeholder'}>Get started</NextLink>
          </Button>
        ),
        description: "Experience Chirp's power. No credit card needed.",
      },
      {
        title: 'Request a personalized demo for your team',
        actions: (
          <Button className="mt-6 lg:mt-8" variant="secondary" asChild>
            <NextLink href={'/placeholder'}>Book a demo</NextLink>
          </Button>
        ),
        description: "See how Chirp fits your team's unique workflow.",
      },
    ],
    title: 'Ready to close more deals and accelerate your pipeline?',
    actions: (
      <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-6 md:mt-6 lg:mt-8 lg:flex-nowrap lg:gap-x-4">
        <Button variant="default" asChild>
          <NextLink href={'/placeholder'}>Get started</NextLink>
        </Button>{' '}
        <Button variant="secondary" asChild>
          <NextLink href={'/placeholder'}>Book a demo</NextLink>
        </Button>
      </div>
    ),
    description:
      'Chirp unifies your sales data, cuts through the noise, and surfaces the insights that drive revenue. Stop context switching and start focusing on what truly matters.',
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
      <HeroSplit {...contentData['hero--split']} />
      <IntegrationsGrid {...contentData['integrations--grid']} />
      <BentoWrapWideCentered {...contentData['bento--wrap-wide-centered']} />
      <NumbersRowCircles {...contentData['numbers--row-circles']} />
      <SectionTabsCasualLargeEnhancedCentered
        {...contentData['section-tabs--casual-large-enhanced-centered']}
      />
      <FeaturesSplitCollapsedBleed {...contentData['features--split-collapsed-bleed']} />
      <FeaturesCardsSplitWide {...contentData['features-cards--split-wide']} />
      <FeaturesSplit {...contentData['features--split']} />
      <ComplianceSplitCollapsedRight {...contentData['compliance--split-collapsed-right']} />
      <CtaCoverGrid {...contentData['cta--cover-grid']} />
    </main>
  );
}
