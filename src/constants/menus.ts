import type { IMenuSocialItem } from '@/types/common';

export const MENUS = {
  header: [
    {
      href: '/blog',
      label: 'Blog',
    },
    {
      href: '/docs',
      label: 'Documentation',
    },
    {
      href: '/pricing',
      label: 'Pricing',
    },
    {
      href: '/connect-and-surface',
      label: 'Connect & Surface',
    },
    {
      href: '/contact-us',
      label: 'Contact us',
    },
  ],
  footer: {
    main: [
      {
        href: '/data-processing-annex',
        label: 'Legal',
      },
      {
        href: '/privacy-policy',
        label: 'Privacy Policy',
      },
      {
        href: '/terms',
        label: 'Terms & Conditions',
      },
    ],
    social: [
      {
        href: 'https://twitter.com/yourusername',
        label: 'Follow us on Twitter',
        icon: 'twitter',
      },
      {
        href: 'https://github.com/yourusername',
        label: 'Follow us on GitHub',
        icon: 'github',
      },
      {
        href: 'https://linkedin.com/in/yourusername',
        label: 'Follow us on LinkedIn',
        icon: 'linkedin',
      },
    ] as IMenuSocialItem[],
  },
};
