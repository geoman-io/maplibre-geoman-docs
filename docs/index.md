---
sidebar_position: 0
sidebar_label: "Introduction"
title: "MapLibre drawing and editing with Geoman"
description: "Add polygon drawing, geometry editing and GeoJSON import/export to MapLibre GL JS with Geoman. Start with Free, explore Pro tools, or use the Mapbox adapter."
slug: "/"
---

# MapLibre drawing and editing with Geoman

Geoman adds drawing and geometry editing to **MapLibre GL JS**. Let users create polygons, lines and markers, edit vertices, snap to nearby geometry and export their work as GeoJSON.

This documentation also covers **Mapbox-Geoman**, a separate adapter with the same Geoman API for Mapbox GL JS. Choose the package for the renderer your application uses.

[Try the MapLibre demo](https://geoman.io/demo/maplibre) · [Install Geoman](/basics) · [Compare Free and Pro](https://geoman.io/pricing)

![Drawing and editing geometry with MapLibre-Geoman](/img/geoman-maplibre-demo.png)

## Install the Free package

For MapLibre, install the drawing plugin and its renderer in your application:

```sh
npm install maplibre-gl@^6 @geoman-io/maplibre-geoman-free@^0.10
```

Follow [Basic Usage and Installation](/basics) to load the CSS, configure the MapLibre 6 worker and initialize `map` and `geoman`. The guide also covers the Mapbox adapter and Pro packages. Initialize the map after the container mounts when using an SSR framework.

## Draw your first polygon, then edit it

Add these listeners immediately after creating your `geoman` instance in the installation example:

```javascript
geoman.mapAdapter.once('gm:loaded', async () => {
  await geoman.enableDraw('polygon');
});

geoman.mapAdapter.on('gm:create', async () => {
  await geoman.disableDraw();
  await geoman.enableGlobalEditMode();
});

geoman.mapAdapter.on('gm:editend', () => {
  const geojson = geoman.features.exportGeoJson();
  console.log('Edited geometry:', geojson);
});
```

Click to add vertices and click the first vertex again to close the polygon. The example then enables editing: drag a vertex to change its shape. `exportGeoJson()` returns the current FeatureCollection; your application decides when and where to save it. The toolbar provides drawing and editing controls too.

## Continue with your own data

- [Import an existing GeoJSON collection](/importing-data): load saved features before editing and choose how to handle feature IDs.
- [Export GeoJSON](/exporting-data): retrieve the current geometry for your own API or file download.
- [Drawing modes](/draw-modes/draw-polygon) and [editing modes](/edit-modes/edit-change): choose the interactions your editor exposes.
- [Events](/events): react to completed edits, newly drawn features and removals.
- [Configuration](/configuring-geoman): adapt the controls and behavior to your application.
- [Migrate from Mapbox GL Draw](https://geoman.io/blog/maplibre-geoman-vs-mapbox-gl-draw): use a complete Vite example and an API mapping.

## Free and Pro tools

**Free** includes drawing, vertex editing, dragging, rotation, cutting and snapping. **Pro** adds tools such as splitting, scaling, measurements, auto tracing and undo/redo. Features and options that require Pro are marked with a star (⭐) throughout these docs. The interactive demos include Pro capabilities.

The Free packages use the MIT license. Pro uses a commercial license; one MapLibre/Mapbox-Geoman Pro license covers both adapters. Leaflet-Geoman Pro is licensed separately. Review [current plans and support options](https://geoman.io/pricing) for the scope that fits your application.
