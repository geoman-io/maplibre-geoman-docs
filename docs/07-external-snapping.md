---
title: "Snapping to External Sources ⭐"
description: "Snap drawing and editing to host-owned map sources and layers such as parcels, roads, and reference data."
---

# Snapping to External Sources

In addition to snapping to Geoman's own features (the [Snapping helper](/helper-modes/helper-snapping)), Geoman can snap against **host-owned** map sources and layers — parcels, roads, reference grids, and any other data your application already loads. This is configured through `settings.snapping`.

Geoman's own features always take priority over external targets, and external snapping is disabled until you provide at least one target.

## Settings

```typescript
interface SnappingSettings {
  // host sources/layers to snap against; empty disables external snapping
  targets: SnapTarget[];          // default: []
  // 'rendered' (default) queries only painted features via queryRenderedFeatures
  //   (respects zoom/visibility/filters; vector-tile geometry is clipped at tile
  //   boundaries). 'source' queries all loaded tiles via querySourceFeatures
  //   (more candidates, same clipping caveat). For pixel-perfect snapping, load
  //   the reference data as a GeoJSON source.
  acquire: 'rendered' | 'source'; // default: 'rendered'
  // cap on external candidate features considered per snap (perf guard)
  maxCandidates: number;          // default: 200
}

interface SnapTarget {
  // Source id. Required for acquire: 'source'; for acquire: 'rendered' it filters
  // the rendered query to features from this source when `layers` is not given.
  source?: string;
  // vector-tile source-layer (used by acquire: 'source')
  sourceLayer?: string;
  // rendered layer ids to query (used by acquire: 'rendered')
  layers?: string[];
  // snap to this target's vertices (default: true)
  vertices?: boolean;
  // snap to this target's edges/segments (default: true)
  edges?: boolean;
  // MapLibre/Mapbox filter expression applied to the query
  filter?: unknown;
}
```

The snap tolerance in pixels is shared with the snapping helper and controlled by [`settings.snapDistance`](/configuring-geoman#settings-configuration) (default `18`).

## Example

```typescript
const gm = new Geoman(map, {
  settings: {
    snapDistance: 18,
    snapping: {
      acquire: 'rendered',
      maxCandidates: 200,
      targets: [
        {
          // snap to rendered parcel boundaries
          source: 'parcels',
          layers: ['parcels-outline'],
          vertices: true,
          edges: true,
        },
        {
          // snap only to major roads, querying loaded vector tiles
          source: 'roads',
          sourceLayer: 'transportation',
          filter: ['==', ['get', 'class'], 'primary'],
          edges: true,
          vertices: false,
        },
      ],
    },
  },
});
```

## Notes

- Vertices are preferred over edges; each candidate is checked against the snap tolerance.
- `acquire: 'rendered'` respects the layer's zoom range, visibility and filters; vector-tile geometry is clipped at tile boundaries.
- `acquire: 'source'` considers more candidates but has the same tile-clipping caveat. For pixel-perfect snapping, load the reference data as a GeoJSON source.
- `maxCandidates` bounds how many external features are considered per snap to protect performance on dense datasets.
