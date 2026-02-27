import NextLink from 'next/link';
import config from '@/configs/website-config';
import { MENUS } from '@/constants/menus';

import { IMenuSocialItem } from '@/types/common';
import { Link } from '@/components/ui/link';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { Icons } from '@/components/icons';

import Nav from './nav';
import SystemStatus from './system-status';

const LOGO_BOX_HEIGHT = 22;

const SocialLink = ({ href, icon, label }: IMenuSocialItem) => {
  const Icon = Icons[icon];

  return (
    <Link
      className="text-foreground transition-colors duration-300 hover:text-foreground/85"
      href={href as string}
      variant="muted"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="size-4" size={16} />
      <span className="sr-only">{label}</span>
    </Link>
  );
};

function Footer() {
  const logoHref = config.logoLink ?? '/';
  const lightLogoSrc = config.logo.light;
  const darkLogoSrc = config.logo.dark;
  const logoAlt =
    typeof config.logoAlt === 'string' && config.logoAlt.trim().length > 0
      ? config.logoAlt
      : config.projectName;

  return (
    <footer className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
      <div className="flex flex-col py-5 md:flex-row md:items-center">
        <NextLink className="mr-9 inline-flex rounded" href={logoHref}>
          <>
            <img
              className="hidden h-[22px] w-auto shrink-0 dark:block"
              src={darkLogoSrc}
              alt={logoAlt}
              height={LOGO_BOX_HEIGHT}
            />
            <img
              className="h-[22px] w-auto shrink-0 dark:hidden"
              src={lightLogoSrc}
              alt={logoAlt}
              height={LOGO_BOX_HEIGHT}
            />
          </>
        </NextLink>
        <Nav className="mt-9 md:mt-0" items={MENUS.footer.main} />
        <div className="mt-8 flex grow items-center gap-5 md:mt-0 md:justify-end">
          {MENUS.footer.social.map((link, index) => (
            <SocialLink key={index} {...link} />
          ))}
        </div>
      </div>
      <div className="relative flex w-full flex-col justify-between gap-y-7 border-t border-secondary pt-5 pb-[calc(var(--footer-safe-area-spacing)+1.25rem)] md:flex-row md:items-center lg:pb-5">
        <div className="flex w-full flex-col gap-y-7 md:flex-row md:items-center md:gap-x-7">
          <SystemStatus />
          <p className="text-sm leading-none tracking-tight text-muted-foreground">
            © {new Date().getFullYear()} Acme Ltd. All rights reserved.
          </p>
        </div>

        {/* <slot:theme-switcher> */}
        <ThemeSwitcher />
        {/* </slot:theme-switcher> */}
      </div>
    </footer>
  );
}

export default Footer;
