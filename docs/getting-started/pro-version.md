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
npm install @geoman-io/leaflet-geoman-pro
```

#### Import in your project after leaflet

```js
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-pro";
import "@geoman-io/leaflet-geoman-pro/dist/leaflet-geoman.css";
```

## Getting Started

#### Init Leaflet-Geoman

Just include `leaflet-geoman.js` right after Leaflet. It initializes itself.

#### Exclude layers

If you want certain layers to be ignored by Leaflet-Geoman, pass `pmIgnore: true` to  
their options when creating them.

Example:

```js
L.marker([51.50915, -0.096112], { pmIgnore: true }).addTo(map);
```

Enable Leaflet-Geoman again on an ignored layer:

```js
layer.options.pmIgnore = false;
L.PM.reInitLayer(layer);
```

This logic is reversed when using Opt-In (see below).

#### Opt-In

This section is only relevant if you **don't want Leaflet-Geoman to initialize itself**.
If you want to use Leaflet-Geoman as Opt-In, call the following function right after importing:

```js
L.PM.setOptIn(true);
```

And to disable it:

```js
L.PM.setOptIn(false);
```

To enable Leaflet-Geoman on a map or a layer, you need to pass `pmIgnore: false` so they are **not ignored** anymore.

Enable on a map:

```js
const map = L.map("map", { pmIgnore: false });
```

Enable on a layer:

```js
L.marker([51.50915, -0.096112], { pmIgnore: false }).addTo(map);
```

Opt-In also causes newly drawn layers to be ignored.
You can initialize them right after they have been drawn like this:

```js
map.on("pm:create", (e) => {
  e.layer.options.pmIgnore = false;
  L.PM.reInitLayer(e.layer);
});
```
