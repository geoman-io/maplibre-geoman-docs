import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import webpack from 'webpack';
import * as dotenv from 'dotenv';
import llmTxtPlugin from './plugins/llm-txt-plugin';

// Load local env files for development/local builds. On Vercel the variables are
// injected into process.env directly, so these files are simply absent there.
// dotenv never overrides an already-set variable, so Vercel's values win.
dotenv.config({path: '.env.local', quiet: true});
dotenv.config({quiet: true});

// Expose the public Mapbox token (pk.*) to the client bundle. It is required by
// Mapbox GL JS in the Mapbox demo panes and is safe to ship to the browser.
const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN ?? '';

const config: Config = {
  title: 'Documentation for MapLibre-Geoman and Mapbox-Geoman',
  tagline: 'A library to edit geometries in MapLibre and Mapbox',
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
  markdown: {
    preprocessor: undefined,
    parseFrontMatter: undefined,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  stylesheets: [
    'https://geoman.io/embed/docs-lead-capture.css',
  ],
  scripts: [
    {
      src: 'https://umami.parap.ly/script.js',
      'data-website-id': 'bc78fba3-4928-4efa-9923-03048345048e',
      defer: true,
      async: true,
    },
    {
      src: 'https://geoman.io/embed/docs-lead-capture.js',
      defer: true,
    },
  ],
  plugins: [
    llmTxtPlugin,
    // Replace `process.env.MAPBOX_ACCESS_TOKEN` references in client code with the
    // build-time value, so the Mapbox demo panes can read it in the browser.
    function mapboxEnvPlugin() {
      return {
        name: 'mapbox-env-plugin',
        configureWebpack() {
          return {
            plugins: [
              new webpack.DefinePlugin({
                'process.env.MAPBOX_ACCESS_TOKEN': JSON.stringify(mapboxAccessToken),
              }),
            ],
          };
        },
      };
    },
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
      title: 'MapLibre-Geoman / Mapbox-Geoman',
      logo: {
        alt: 'Geoman Docs',
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
