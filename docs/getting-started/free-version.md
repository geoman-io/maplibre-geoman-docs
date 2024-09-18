---
sidebar_position: 1
title: "Free Version"
---
## Installation

#### Install via npm

```bash
npm i @geoman-io/maplibre-geoman-free
```

#### Install Manually

Download [`maplibre-geoman.css`](https://unpkg.com/@geoman-io/maplibre-geoman-free@latest/dist/maplibre-geoman.css) and [`maplibre-geoman.js`](https://unpkg.com/@geoman-io/maplibre-geoman-free@latest/dist/maplibre-geoman.es.js) and include them in your project.

#### Include via CDN

**CSS**

<!-- prettier-ignore -->
```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@geoman-io/maplibre-geoman-free@latest/dist/maplibre-geoman.css"
/>
```

**JS**

```html
<script src="https://unpkg.com/@geoman-io/maplibre-geoman-free@latest/dist/maplibre-geoman.es.js"></script>
```

or use if your bundler does not support ES modules:

```html
<script src="https://unpkg.com/@geoman-io/maplibre-geoman-free@latest/dist/maplibre-geoman.umd.js"></script>
```

#### Include as ES6 Module

```js
import { Map } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import "@geoman-io/maplibre-geoman-free";
import "@geoman-io/maplibre-geoman-free/dist/maplibre-geoman.css";
```

## Getting Started

#### Init MapLibre-Geoman

Import `Geoman` and the related styles into your project after importing `maplibre-gl`. Then create a new instance of `Geoman` and pass your map instance.

```js
// Import maplibre-gl
import { Map } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
// Import maplibre-geoman
import "@geoman-io/maplibre-geoman-free/dist/maplibre-geoman.css"
import { Geoman } from "@geoman-io/maplibre-geoman-free"

// Create a new map instance
const map = new Map("map", {
  center: [51.505, -0.09],
  zoom: 13,
  style: "https://demotiles.maplibre.org/style.json",
})

// Create a new Geoman instance
const gm = new Geoman()

// Add Geoman controls to the map
map.addControl(gm.control)

```
