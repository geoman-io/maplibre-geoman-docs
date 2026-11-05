---
sidebar_position: 200
title: "Changelog"
description: "Release notes for MapLibre-Geoman (Free) and MapLibre-Geoman Pro."
---

# Changelog

Latest releases of `@geoman-io/maplibre-geoman-free` and `@geoman-io/maplibre-geoman-pro`
(also covering the Mapbox variants `@geoman-io/mapbox-geoman-free` / `@geoman-io/mapbox-geoman-pro`,
which are versioned in lockstep).

For the complete history, see the per-repository changelogs:

- [Free: `maplibre-geoman` CHANGELOG](https://github.com/geoman-io/maplibre-geoman/blob/master/CHANGELOG.md)
  and [releases](https://github.com/geoman-io/maplibre-geoman/releases)
- [Pro: `maplibre-geoman-pro` CHANGELOG](https://github.com/geoman-io/maplibre-geoman-pro/blob/master/CHANGELOG.md)
  and [releases](https://github.com/geoman-io/maplibre-geoman-pro/releases)

## MapLibre-Geoman Free 0.10.7 — 2026-11-04

### Fixed

- Dragging a vertex of a large line or polygon no longer copies the whole geometry on every pointer move. The outline stays on the main source, and only the two adjacent edges update until the drag ends.

## MapLibre-Geoman Free 0.10.6 — 2026-11-03

### Fixed

- Import, auto-trace, cut, and union no longer throw on an empty polygon, an empty hole, a null coordinate, or a multi-line part with fewer than two positions. The bad feature or part is skipped; the rest of the batch continues.
- A zero or non-finite ellipse axis, rectangle angle, or circle-style measurement no longer aborts the edit. Guessing imperial units no longer throws when `navigator.language` is empty or uses an underscore (`en_US`).
- Closing a cut with one or two vertices leaves the draft open instead of throwing.

## MapLibre-Geoman Free 0.10.5 — 2026-11-02

### Added

- `gm.draw.getDraft()` and `gm.draw.removeLastVertex()` expose the in-progress line or polygon. `gm:drawupdate` fires after a vertex is added or removed.
- Closing a polygon calls `settings.beforeChange` once, with the geometry that would be created.

### Fixed

- Import rejects a `NaN` or `Infinity` coordinate instead of storing it.
- Three exactly collinear clicks no longer create a polygon. A thin valid triangle is still accepted.
- Releasing a vertex drag over an application toolbar or a Geoman control ends the edit and returns the feature to the main source.
- Dragging one vertex of a large polygon updates that vertex and its two midpoints, not every marker.

## MapLibre-Geoman Free 0.10.3 — 2026-10-30

### Added

- `settings.beforeChange` can refuse a create, update, or vertex removal before it is written. A refused polygon draw fires `gm:draw:rejected` and leaves drawing open.
- `settings.polygonSelfIntersection` (`'split'` | `'reject'`, default `'split'`) and `settings.polygonAsPolygon` (default `false`).

### Fixed

- A refused drag no longer writes circle or ellipse center metadata.
- Clicking the only vertex of a line in progress no longer creates a zero-length line.
- User-supplied option arrays, including `[]`, replace the default. Keyboard bindings can be cleared.
- `importGeoJson` no longer reverses LineString and MultiLineString coordinates. Polygon rings are still rewound to the RFC 7946 right-hand rule.
- The text-marker textarea stays visible while typing.

## MapLibre-Geoman Free 0.10.1, 0.10.2, and 0.10.4

Dependency and toolchain updates only. Public peer ranges and API declarations are unchanged. 0.10.2 updates DOMPurify to 3.4.17 and the development baseline to MapLibre GL JS 6.14.0.

## MapLibre-Geoman Free 0.10.0 — 2026-09-23

### Added

- `gm.draw.create(input)` and `gm.draw.finish(input?)` for marker, circle, and rectangle creation and completion. See [Programmatic Drawing](https://github.com/geoman-io/maplibre-geoman/blob/master/docs/programmatic-drawing.md).

### Changed

- Development and test baseline is now MapLibre GL JS **6.11.0**. The peer dependency
  stays `maplibre-gl >=6.0.0 <7.0.0`, so no consumer changes are required.

### Fixed

- Preserve explicitly supplied circle centers during feature creation.
- Marker draw previews now use registered raster images named by a literal
  `layerStyles.marker.gm_temporary` `icon-image` ([#122](https://github.com/geoman-io/maplibre-geoman/issues/122)).
- TypeScript compilation of the MapLibre adapter against maplibre-gl 6.11's stricter
  event typings.

## MapLibre-Geoman Pro 0.13.7 — 2026-11-04

### Fixed

- Same large-vertex drag fix as Free 0.10.7: the outline stays on its source, and only the two adjacent edges update until the drag ends.

## MapLibre-Geoman Pro 0.13.6 — 2026-11-03

### Fixed

- The Free 0.10.6 guards, plus the Pro paths that hit the same inputs: lasso, geofencing, split, add-hole, add-part, and a background click on a polygon with an empty hole.
- Data-layer `step` and `interpolate` stops drop duplicate and non-finite values. Attribute numbers reject `NaN` and `Infinity`.
- A custom-shape draw no longer throws when the configured geometry is an empty polygon.

## MapLibre-Geoman Pro 0.13.5 — 2026-11-02

### Added

- Same draft API as Free 0.10.5: `gm.draw.getDraft()`, `gm.draw.removeLastVertex()`, and `gm:drawupdate`.

### Fixed

- `validateFeatureGeometry` rejects a non-finite coordinate, a hole outside or crossing the shell, a hole that shares an edge with the shell, and a hole that disconnects the interior. `repairFeatureGeometry` no longer unkinks those holes into a MultiPolygon.

## MapLibre-Geoman Pro 0.13.3 — 2026-10-30

### Added

- `settings.beforeChange` also covers keyboard delete and nudge, and `edit.setGeometry`.
- `settings.polygonSelfIntersection` and `settings.polygonAsPolygon`, as in Free.

### Fixed

- `validateFeatureGeometry` accepts a valid polygon with a hole and rejects a zero-area ring. `repairFeatureGeometry` leaves a valid hole in place.
- Auto-trace no longer merges vertices that fall in the same 1e-5° cell.
- Snapping to a GeoJSON source uses tile precision, not the original vertices. See [Snapping to External Sources](/external-snapping).

## MapLibre-Geoman Pro 0.13.1 and 0.13.2

Dependency updates only. Public peer ranges are unchanged. 0.13.2 moves the development baseline to MapLibre GL JS 6.14 and Mapbox GL JS 3.33.

## MapLibre-Geoman Pro 0.13.0 — 2026-09-23

### Changed

- Development and test baseline is now MapLibre GL JS **6.11.0**. The peer dependency
  stays `maplibre-gl >=6.0.0 <7.0.0`, so no consumer changes are required.

Both packages publish with the same version numbers for MapLibre GL JS and Mapbox GL JS targets.
