---
sidebar_position: 2
title: "Pro Version"
---
## Installation

Add the following content to `.npmrc` in your project root

```ini
@geoman-io:registry=https://npm.geoman.io/
//npm.geoman.io/:_authToken="<YOUR LICENSE KEY>"
```

Replace `<YOUR LICENSE KEY>` with your license key.  
_Don't have a license key yet? [Purchase one here](https://geoman.io/#pricing)._

#### Install via npm

```bash
npm install @geoman-io/leaflet-maplibre-pro
```

#### Import in your project after MapLibre

```js
import { Map } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import "@geoman-io/maplibre-geoman-pro";
import "@geoman-io/maplibre-geoman-pro/dist/maplibre-geoman.css";
```

## Getting Started

#### Init MapLibre-Geoman

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
