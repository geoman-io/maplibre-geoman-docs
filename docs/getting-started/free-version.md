---
sidebar_position: 1
title: "Free Version"
---
## Installation

#### Install via npm

```bash
npm i @geoman-io/leaflet-geoman-free
```

#### Install Manually

Download [`leaflet-geoman.css`](https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.css) and [`leaflet-geoman.js`](https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.js) and include them in your project.

#### Include via CDN

**CSS**

<!-- prettier-ignore -->
```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.css"
/>
```

**JS**

```html
<script src="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.js"></script>
```

#### Include as ES6 Module

```js
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
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
