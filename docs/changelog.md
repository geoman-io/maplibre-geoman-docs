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

## MapLibre-Geoman Pro 0.13.0 — 2026-09-23

### Changed

- Development and test baseline is now MapLibre GL JS **6.11.0**. The peer dependency
  stays `maplibre-gl >=6.0.0 <7.0.0`, so no consumer changes are required.

Both packages publish with the same version numbers for MapLibre GL JS and Mapbox GL JS targets.
