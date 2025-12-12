---
title: "Basic Usage and Installation"
---

# Basic Usage

## Installation

### Free Version

```shell
# install free version
npm install @geoman-io/maplibre-geoman-free
```

The Free version can also be downloaded directly from [https://www.npmjs.com/package/@geoman-io/maplibre-geoman-free](https://www.npmjs.com/package/@geoman-io/maplibre-geoman-free).

### Pro Version

Add the following content to .npmrc in your project root

```shell
#.npmrc
@geoman-io:registry=https://npm.geoman.io/
//npm.geoman.io/:_authToken="<YOUR LICENSE KEY>"
```

Replace `<YOUR LICENSE KEY>` with your license key.

```shell
# install pro version
npm install @geoman-io/maplibre-geoman-pro
```

Don't have a license key yet? [Purchase one here](https://geoman.io/pricing).

#### Installing the Pro Version on Vercel

To install the Pro version on Vercel, follow these steps:

1. Add the License Key to Environment Variables
   - Set up a new environment variable for your license key.
   - Environment Variable Name: `NPM_TOKEN_GEOMAN`
   - Environment Variable Value: `<YOUR_LICENSE_KEY>` (replace `<YOUR_LICENSE_KEY>` with your actual license key)

2. Set the .npmrc Configuration as an Environment Variable
   - Create a special environment variable to store your .npmrc configuration.
   - Environment Variable Name: `NPM_RC`
   - Environment Variable Value: Use the following content (preserve the line breaks):
  ```
    engine-strict=true
    @geoman-io:registry=https://npm.geoman.io
    //npm.geoman.io:_authToken=${NPM_TOKEN_GEOMAN}
  ```



Once these variables are set, Vercel will use the correct .npmrc configuration and license key to access the Pro version.

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
import 'maplibre-gl/dist/maplibre-gl.css';
import '@geoman-io/maplibre-geoman-free/dist/maplibre-geoman.css';

import ml from 'maplibre-gl';
import { Geoman, type GmOptionsPartial } from '@geoman-io/maplibre-geoman-free';


const mapLibreStyle: ml.StyleSpecification = {
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

// create a new geoman instance
const geoman = new Geoman(map, gmOptions);

// callback when geoman is fully loaded
map.on('gm:loaded', () => {
  console.log('Geoman fully loaded');

  // Here you can add your geojson shapes for example
  const shapeGeoJson = {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [0, 51] },
    properties: {},
  };
  // add a geojson shape to the map
  geoman.features.importGeoJsonFeature(shapeGeoJson);


  const shapeGeoJson2 = {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [3, 52] },
    properties: {},
  };
  // geoman instance is also available on the map object
  map.gm?.features.importGeoJsonFeature(shapeGeoJson2);

});
```
