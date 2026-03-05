const config = {
  projectName: 'Chirp v2',
  logo: {
    light: '/logo-light.svg',
    dark: '/logo-dark.svg',
  },
  logoAlt: 'Chirp',
  logoLink: '/',
  metaThemeColors: {
    light: '#ffffff',
    dark: '#09090b',
  },
  defaultSocialImage: '/social-previews/index.jpg',
  githubOrg: 'pixel-point',
  githubRepo: 'prime',
  blog: {
    contentDir: 'src/content/blog',
    postsPerPage: 20,
    contentWidth: 704,
    basePath: '/blog',
  },
  legal: {
    contentDir: 'src/content/',
  },
  docs: {
    basePath: '/docs',
    rootPage: '/docs/introduction',
    contentDir: 'src/content/docs',
  },
};

export default config;
