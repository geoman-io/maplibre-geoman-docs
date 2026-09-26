---
title: "MapLibre-Geoman Examples for React, Vue, Next.js and Vite"
description: "Runnable code examples for Geoman, with MapLibre-focused demos that map directly to Mapbox packages."
---

# MapLibre-Geoman Examples

We have prepared a few examples to help you get started with Maplibre-Geoman.

The examples use MapLibre package names, but the same API works for Mapbox variants (`@geoman-io/mapbox-geoman-free` / `@geoman-io/mapbox-geoman-pro`).

These are available on GitHub in the [Maplibre-Geoman Examples Repository](https://github.com/geoman-io/maplibre-geoman-examples).

## Choose a starter

- **Vite:** start here for a small, framework-independent drawing app. The [Vite tutorial](https://geoman.io/blog/using-maplibre-geoman-with-vite) explains initialization and GeoJSON export.
- **React, Vue, Preact or Svelte:** choose the framework your application already uses. Create one map for each mounted container and remove it when the component unmounts.
- **Next.js:** load the interactive map in a browser-only component. The surrounding page can still render on the server; WebGL and DOM-dependent map code cannot.

## Runnable examples

| Framework/Template | Demo URL | Code URL | Description |
|-------------------|-----------|-----------|-------------|
| maplibre-geoman-vite | [Demo](https://maplibre-geoman-vite.vercel.app) | [Code](https://github.com/geoman-io/maplibre-geoman-examples/tree/master/maplibre-geoman-vite) | Vanilla JavaScript implementation using Vite as the build tool |
| maplibre-geoman-vue | [Demo](https://maplibre-geoman-vue.vercel.app) | [Code](https://github.com/geoman-io/maplibre-geoman-examples/tree/master/maplibre-geoman-vue) | Vue.js integration showcasing reactive map editing capabilities |
| maplibre-geoman-react | [Demo](https://maplibre-geoman-react.vercel.app) | [Code](https://github.com/geoman-io/maplibre-geoman-examples/tree/master/maplibre-geoman-react) | React implementation with hooks and components for map editing |
| maplibre-geoman-preact | [Demo](https://maplibre-geoman-preact.vercel.app) | [Code](https://github.com/geoman-io/maplibre-geoman-examples/tree/master/maplibre-geoman-preact) | Lightweight Preact alternative to the React implementation |
| maplibre-geoman-nextjs | [Demo](https://maplibre-geoman-nextjs.vercel.app) | [Code](https://github.com/geoman-io/maplibre-geoman-examples/tree/master/maplibre-geoman-nextjs) | Next.js integration with a browser-only map inside an application that supports server rendering |
| maplibre-geoman-svelte | [Demo](https://maplibre-geoman-svelte.vercel.app) | [Code](https://github.com/geoman-io/maplibre-geoman-examples/tree/master/maplibre-geoman-svelte) | Svelte implementation offering reactive map editing features |

## Before adapting an example

Install the packages from that example's lockfile, load the matching Geoman and MapLibre CSS, and give the map container a height. Wait for `gm:loaded` before importing features or enabling draw modes. MapLibre GL JS 6 users should also follow the worker setup in the [installation guide](/docs/maplibre/basics).

Start with [circle markers](/docs/maplibre/draw-modes/draw-circle_marker) for point data or [polygons](/docs/maplibre/draw-modes/draw-polygon) for areas. Use `geoman.features.exportGeoJson()` to read the finished data. The [full interactive demo](https://geoman.io/demo/maplibre) lets you explore tools before integrating them.
