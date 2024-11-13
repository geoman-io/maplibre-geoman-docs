---
title: "Basic Usage"
---

# Basic Usage

## Installation

### Pro Version

```shell
# install pro version
npm install @geoman-io/maplibre-geoman-pro
```

Add the following content to .npmrc in your project root

```shell
@geoman-io:registry=https://npm.geoman.io/
//npm.geoman.io/:_authToken="&#96;&lt;YOUR LICENSE KEY&gt;&#96;"
```

Replace `<YOUR LICENSE KEY>` with your license key.
Don't have a license key yet? [Purchase one here](https://geoman.io/pricing).

### Free Version

```shell
# install free version
npm install @geoman-io/maplibre-geoman-free
```

## Expected HTML Structure
```html
<!-- index.html -->
<html lang="en_US">
<head>
  <title>Geoman Maplibre</title>
  <style>
    #dev-map {
      height: 100vh;
      width: 100vw;
    }
  </style>
</head>
<body>
  <div id="dev-map"></div>
</body>
</html>
```

## Maplibre and Geoman initialization
```typescript
import ml from 'maplibre-gl';
import { type GmOptionsPartial } from '@geoman-io/maplibre-geoman-pro';

import 'maplibre-gl/dist/maplibre-gl.css';
import '@geoman-io/maplibre-geoman-pro/dist/maplibre-geoman.css';


const mapStyle: ml.StyleSpecification = {
  version: 8,
  glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
  sources: {
    'osm-tiles': {
      type: 'raster',
      tiles: [
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors',
    },
  },
  layers: [
    {
      id: 'osm-tiles-layer',
      type: 'raster',
      source: 'osm-tiles',
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

const map = new ml.Map({
  container: 'dev-map',
  style: mapLibreStyle,
  center: [0, 51],
  zoom: 5,
});

const gmOptions: GmOptionsPartial = {
  // geoman options here
};

const geoman = new Geoman(map, gmOptions);

map.on('gm:loaded', () => {
  console.log('Geoman fully loaded');

  // Here you can add your geojson shapes for example
  const shapeGeoJson = {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [0, 51] },
  };
  map.gm.features.addGeoJsonFeature({ shapeGeoJson });
});
```
