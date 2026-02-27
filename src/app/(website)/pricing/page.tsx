import { Metadata } from 'next';
import { PricingProvider } from '@/contexts/pricing-context';
import {
  BarChart,
  Copy,
  FileText,
  Folder,
  Heart,
  Lock,
  MessagesSquare,
  Rocket,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';

import { getMetadata } from '@/lib/get-metadata';
import ComparisonTable from '@/components/pages/pricing/comparison-table';
import FaqColumn from '@/components/pages/pricing/faq--column';
import HeroPricing from '@/components/pages/pricing/hero--pricing';

const contentData = {
  'hero--pricing': {
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
    plans: [
      {
        id: 'basic',
        link: {
          href: '/sign-up/basic',
          label: 'Get started free',
        },
        name: 'Hobby',
        currency: 'USD',
        features: {
          items: [
            {
              label: 'Two-week Pro trial',
              lucideIcon: <Copy />,
            },
            {
              label: 'Limited AI tokens',
              lucideIcon: <MessagesSquare />,
            },
            {
              label: 'Limited integrations',
              lucideIcon: <Users />,
            },
            {
              label: 'Basic analytics',
              lucideIcon: <BarChart />,
            },
          ],
          title: 'Features',
        },
        priceType: 'number' as const,
        lucideIcon: <Sparkles />,
        annualPrice: 90,
        description:
          'Ideal for individual reps exploring Chirp’s core AI capabilities with essential integrations.',
        monthlyPrice: 9,
        priceAnnualLabel: '/yr',
        priceMonthlyLabel: '/mo',
      },
      {
        id: 'pro',
        link: {
          href: '/sign-up/pro',
          label: 'Get started',
        },
        name: 'Pro',
        currency: 'USD',
        features: {
          items: [
            {
              label: 'Extended AI limits',
              lucideIcon: <Folder />,
            },
            {
              label: 'Unlimited integrations',
              lucideIcon: <MessagesSquare />,
            },
            {
              label: 'Background AI agents',
              lucideIcon: <BarChart />,
            },
            {
              label: 'More context windows',
              lucideIcon: <Users />,
            },
          ],
          title: 'Features',
        },
        priceType: 'number' as const,
        lucideIcon: <Rocket />,
        annualPrice: 290,
        description:
          'Designed for growing teams needing extended AI limits and unlimited integrations.',
        monthlyPrice: 29,
        isMostPopular: true,
        priceAnnualLabel: '/yr',
        priceMonthlyLabel: '/mo',
      },
      {
        id: 'business',
        link: {
          href: '/contact',
          label: 'Get started',
        },
        name: 'Pro+',
        currency: 'USD',
        features: {
          items: [
            {
              label: '3× AI usage limits',
              lucideIcon: <Lock />,
            },
            {
              label: 'Deep research mode',
              lucideIcon: <FileText />,
            },
            {
              label: 'Custom integrations',
              lucideIcon: <FileText />,
            },
            {
              label: 'Priority support',
              lucideIcon: <Heart />,
            },
          ],
          title: 'Features',
        },
        priceType: 'string' as const,
        lucideIcon: <Shield />,
        description:
          'Best for advanced users wanting deep research and custom integration support.',
        annualPriceDisplay: 'Custom',
        monthlyPriceDisplay: 'Custom',
      },
    ],
    title: 'Simple, transparent pricing for every team',
    description:
      'Choose the plan that fits your sales team’s needs and unlock efficiencies with Chirp’s AI-driven insights. No surprises, just clear value at every level.',
  },
  'comparison-table': {
    plans: [
      {
        id: 'basic',
        link: {
          href: '/sign-up/basic',
          label: 'Get started free',
        },
        name: 'Hobby',
        currency: 'USD',
        features: {
          items: [
            {
              label: 'Two-week Pro trial',
              lucideIcon: <Copy />,
            },
            {
              label: 'Limited AI tokens',
              lucideIcon: <MessagesSquare />,
            },
            {
              label: 'Limited integrations',
              lucideIcon: <Users />,
            },
            {
              label: 'Basic analytics',
              lucideIcon: <BarChart />,
            },
          ],
          title: 'Includes',
        },
        priceType: 'number' as const,
        lucideIcon: <Sparkles />,
        annualPrice: 90,
        description: 'Explore essential AI features with basic limits and integrations.',
        monthlyPrice: 9,
        priceAnnualLabel: '/yr',
        priceMonthlyLabel: '/mo',
      },
      {
        id: 'pro',
        link: {
          href: '/sign-up/pro',
          label: 'Get started',
        },
        name: 'Pro',
        currency: 'USD',
        features: {
          items: [
            {
              label: 'Extended AI limits',
              lucideIcon: <Folder />,
            },
            {
              label: 'Unlimited integrations',
              lucideIcon: <MessagesSquare />,
            },
            {
              label: 'Background agents',
              lucideIcon: <BarChart />,
            },
            {
              label: 'More context windows',
              lucideIcon: <Users />,
            },
          ],
          title: 'Everything in Basic, plus',
        },
        priceType: 'number' as const,
        lucideIcon: <Rocket />,
        annualPrice: 290,
        description: 'For teams requiring unlimited integrations and background agents.',
        monthlyPrice: 29,
        isMostPopular: true,
        priceAnnualLabel: '/yr',
        priceMonthlyLabel: '/mo',
      },
      {
        id: 'business',
        link: {
          href: '/contact',
          label: 'Get started',
        },
        name: 'Pro+',
        currency: 'USD',
        features: {
          items: [
            {
              label: '3× AI limits',
              lucideIcon: <Lock />,
            },
            {
              label: 'Deep research mode',
              lucideIcon: <FileText />,
            },
            {
              label: 'Custom integrations',
              lucideIcon: <FileText />,
            },
            {
              label: 'Priority support',
              lucideIcon: <Heart />,
            },
          ],
          title: 'Everything in Pro, plus',
        },
        priceType: 'string' as const,
        lucideIcon: <Shield />,
        description: 'Advanced research and customization for power users.',
        annualPriceDisplay: 'Custom',
        monthlyPriceDisplay: 'Custom',
      },
    ],
    featureCategories: [
      {
        name: 'AI Usage Limits',
        features: [
          {
            name: 'Monthly AI token allowance',
            plans: [
              {
                value: '1',
                planId: 'basic',
              },
              {
                value: 'Unlimited',
                planId: 'pro',
              },
              {
                value: 'Unlimited',
                planId: 'business',
              },
            ],
          },
          {
            name: 'Team members',
            plans: [
              {
                value: '1',
                planId: 'basic',
              },
              {
                value: '5',
                planId: 'pro',
              },
              {
                value: 'Unlimited',
                planId: 'business',
              },
            ],
          },
          {
            name: 'Email support',
            plans: [
              {
                value: true,
                planId: 'basic',
              },
              {
                value: true,
                planId: 'pro',
              },
              {
                value: true,
                planId: 'business',
              },
            ],
          },
        ],
      },
      {
        name: 'Integrations & Agents',
        features: [
          {
            name: 'Integrations per plan',
            plans: [
              {
                value: false,
                planId: 'basic',
              },
              {
                value: false,
                planId: 'pro',
              },
              {
                value: true,
                planId: 'business',
              },
            ],
          },
          {
            name: 'Audit logs',
            plans: [
              {
                value: false,
                planId: 'basic',
              },
              {
                value: true,
                planId: 'pro',
              },
              {
                value: true,
                planId: 'business',
              },
            ],
          },
          {
            name: 'Compliance reports',
            plans: [
              {
                value: false,
                planId: 'basic',
              },
              {
                value: false,
                planId: 'pro',
              },
              {
                value: false,
                planId: 'business',
              },
            ],
          },
        ],
      },
    ],
  },
  'faq--column': {
    items: [
      {
        answer:
          'Get started in minutes with our simple 2-step onboarding—no technical expertise needed.',
        question: 'How quick is the setup process?',
      },
      {
        answer: "Yes, you can upgrade or change your plan anytime as your team's needs evolve.",
        question: 'Can I switch plans or upgrade later?',
      },
      {
        answer:
          'Our team assists with migrating sales data to ensure a smooth transition without loss.',
        question: 'Do you support data migration?',
      },
      {
        answer:
          'Priority support is available on Pro+ and Ultra plans, with standard support included on lower tiers.',
        question: 'What level of support can I expect?',
      },
      {
        answer:
          'Enjoy a two-week trial of Pro features included with the Hobby plan to test Chirp fully.',
        question: 'Is there a free trial available?',
      },
    ],
    title: 'Common questions about Chirp pricing',
  },
};

const pageData = {
  pathname: '/pricing',
  metadata: {
    title: 'Pricing | Chirp v2',
    description: 'Upgrade for premium support and advanced features.',
    pathname: '/pricing',
  },
};

export const metadata: Metadata = getMetadata({
  title: pageData.metadata?.title,
  description: pageData.metadata?.description,
  pathname: pageData.pathname,
});

export default function PricingPage() {
  return (
    <PricingProvider>
      <main className="pb-12 md:pb-14 lg:pb-16 xl:pb-24">
        <HeroPricing {...contentData['hero--pricing']} />
        <ComparisonTable {...contentData['comparison-table']} />
        <FaqColumn {...contentData['faq--column']} />
      </main>
    </PricingProvider>
  );
}
