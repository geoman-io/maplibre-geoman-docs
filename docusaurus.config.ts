import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Documentation for MapLibre-Geoman',
  tagline: 'A library to edit geometries in MapLibre',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://geoman.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/maplibre',
  trailingSlash: false,
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'geoman-io', // Usually your GitHub org/user name.
  projectName: 'maplibre-geoman-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  scripts: [
    {
      src: 'https://umami.parap.ly/script.js',
      'data-website-id': 'bc78fba3-4928-4efa-9923-03048345048e',
      defer: true,
      async: true,
    }
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/geoman-io/maplibre-geoman-docs/tree/master/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/geoman-social-card.jpg',
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'MapLibre-Geoman',
      logo: {
        alt: 'Geoman MapLibre',
        src: 'img/geoman-logo.svg',
      },
      items: [
        {
          href: 'https://geoman.io/docs/leaflet',
          label: 'Leaflet Docs',
          position: 'right',
        },
        {
          href: 'https://geoman.io/blog',
          label: 'Blog',
          position: 'right',
        },
        {
          href: 'https://geoman.io/pricing',
          label: 'Pricing',
          position: 'right',
        },
        {
          href: 'https://geoman.io/demo/maplibre',
          label: 'Demo',
          position: 'right',
        },
        {
          href: 'https://github.com/geoman-io/maplibre-geoman',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Geoman.io.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
