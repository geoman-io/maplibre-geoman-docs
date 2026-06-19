# Documentation Audit Report

This report documents the changes made to align MapLibre-Geoman documentation with the actual codebase (maplibre-geoman-pro).

## Changes Made

### High Priority Fixes (Completed)

| Issue | File(s) | Status |
|-------|---------|--------|
| `importGeoJsonFeature` API signature | `10-importing-data.md`, `12-feature-ids.md` | Fixed |
| Typo `GlobalEventsListenerParemeters` | `03-events.md` | Fixed |
| `getControlOptions` parameter naming (`actionType` → `modeType`) | `106-geoman-options-api.md` | Fixed |
| Non-existent edit mode helper methods | `03-edit-scale.mdx`, `04-edit-copy.mdx`, `06-edit-split.mdx`, `07-edit-union.mdx`, `08-edit-difference.mdx`, `09-edit-line_simplification.mdx`, `10-edit-lasso.mdx` | Fixed |

### Medium Priority Fixes (Completed)

| Issue | File(s) | Status |
|-------|---------|--------|
| Missing settings (`useDefaultLayers`, `idGenerator`, `markerIcons`) | `02-configuring-geoman.md` | Added |
| Missing `ellipse` draw mode | `02-configuring-geoman.md`, `105-geoman-instance-api.md` | Added |
| Missing methods (`destroy`, `waitForGeomanLoaded`, etc.) | `105-geoman-instance-api.md` | Added |
| Missing Features API methods (`deleteAll`, `getAll`, `importGeoJsonFeature`) | `107-features-instance.md` | Added |
| Missing `gm_standby` source | `107-features-instance.md` | Added |
| `exportGeoJson` optional parameters | `107-features-instance.md` | Added |

### New Documentation Created

| File | Description |
|------|-------------|
| `draw-modes/03a-draw-ellipse.mdx` | Documentation for ellipse drawing mode |

---

## Summary of Changes by File

### `02-configuring-geoman.md`
- Added `useDefaultLayers` setting to `GmOptionsData` interface
- Added `idGenerator` setting for custom feature ID generation
- Added `markerIcons` setting for SVG marker configuration
- Added `ellipse` to the list of available draw modes
- Added documentation for the new settings with examples

### `03-events.md`
- Fixed typo: `GlobalEventsListenerParemeters` → `GlobalEventsListenerParameters` (2 occurrences)
- Fixed variable name in example: `geoman` → `gm`

### `10-importing-data.md`
- Fixed API signature: `gm.features.importGeoJsonFeature({ shapeGeoJson: feature })` → `gm.features.importGeoJsonFeature(feature)`
- Removed empty code block
- Improved example clarity

### `12-feature-ids.md`
- Fixed all `importGeoJsonFeature` calls to use direct parameter instead of object wrapper (6 occurrences)

### `105-geoman-instance-api.md`
- Removed non-existent helper methods: `enableGlobalScaleMode`, `enableGlobalCopyMode`, `enableGlobalSplitMode`, `enableGlobalUnionMode`, `enableGlobalDifferenceMode`, `enableGlobalLineSimplificationMode`, `enableGlobalLassoMode` and their related methods
- Added section "Other Edit Modes" explaining how to use generic `enableMode` for these modes
- Added `ellipse` to `DrawModeName` type and Available Draw Shapes list
- Added Lifecycle Methods section with `waitForGeomanLoaded` and `destroy`
- Fixed `removeControl` → `removeControls`

### `106-geoman-options-api.md`
- Fixed parameter name: `actionType` → `modeType` in `getControlOptions`

### `107-features-instance.md`
- Added `idPropertyName` parameter to `importGeoJson`
- Added `importGeoJsonFeature` method documentation
- Added optional parameters to `exportGeoJson`
- Added `deleteAll` method
- Added `getAll` method
- Added `gm_standby` to source names (Pro only)

### Edit Mode Documentation (`edit-modes/*.mdx`)
Updated the following files to remove non-existent helper methods and use generic `enableMode` API:
- `03-edit-scale.mdx`
- `04-edit-copy.mdx`
- `06-edit-split.mdx`
- `07-edit-union.mdx`
- `08-edit-difference.mdx`
- `09-edit-line_simplification.mdx`
- `10-edit-lasso.mdx`

### New File: `draw-modes/03a-draw-ellipse.mdx`
Created documentation for the ellipse draw mode including:
- Enable/disable methods
- Events
- Behavior description
- Feature properties (`xSemiAxis`, `ySemiAxis`, `center`)

---

## Remaining Recommendations

### Optional Enhancements

1. **Add more event documentation** - The events system could document more specific events like `gm:beforecreate`, `gm:beforeupdate`, and geofencing violation events.

2. **Add helper mode documentation for `click_to_edit`** - This helper mode exists but may need more detailed documentation.

3. **Consider adding helper methods to codebase** - For API consistency, consider adding the missing `enableGlobalScaleMode()`, `enableGlobalCopyMode()`, etc. methods to `src/main.ts`.

---

## 2026-06 Update — Polygon sub-editing & host-integration release

Aligned the docs with the maplibre-geoman-pro `0.8.x`/sub-editing surface.

### New documentation

| File | Description |
|------|-------------|
| `docs/edit-modes/12-edit-select.mdx` … `18-edit-reshape.mdx` | The 7 polygon sub-editing modes: `select`, `add_hole`, `add_part`, `remove_ring`, `explode`, `merge_parts`, `reshape` (modes, options, events, rejection reasons) |
| `docs/helper-modes/06-helper-shape_markers.mdx`, `07-helper-geofencing.mdx`, `08-helper-click_to_edit.mdx` | Previously undocumented helper modes |
| `docs/108-geoman-edit-api.md` | The programmatic `geoman.edit` façade (`addHole`/`addPart`/`removeRing`/`reshape`/`explode`/`merge`, `EditApiResult`) |
| `docs/109-geoman-layers-api.md` | The host-integration `geoman.layers` API (`getSourceIds`/`getLayerIds`/`ownsSource`/`ownsLayer`/`setVisibility`/`setOpacity`) |

### Updated documentation

- `02-configuring-geoman.md` — `disableSelectionGating` setting; selection/highlight style variables (`highlightSelectedColor`/`highlightSelectedWidth`/`highlightCandidateColor`/`highlightHoverColor`/`highlightSelectedFillColor`/`highlightSelectedFillOpacity`/`holeMarkerColor`); the control-level `requiresSelection` gate
- `03-events.md` — `gm:operation_rejected` (`{ mode, reason, feature }`) and `gm:selection`
- `10-importing-data.md` — `importGeoJson(..., { onIdCollision: 'skip' | 'reassign' })`

### Automated docs ↔ code coverage check (new)

To keep the docs from silently drifting from the library again, this update adds a snapshot-based coverage check (mirrors the library's own `scripts/api-surface/*.json` pattern):

- `scripts/extract-library-surface.mjs` (`npm run docs:extract-surface`) reads the library SOURCE (mode registries, `geoman.edit`/`geoman.layers` methods, rejection reasons, version) and writes the checked-in snapshot `_meta/library-surface.json`. Point it at a non-sibling checkout with `GEOMAN_PRO_DIR`.
- `scripts/check-docs.mjs` (`npm run docs:check`, also `npm test`) fails when a mode has no doc page, when a `geoman.edit`/`geoman.layers` method is never shown in the docs, or when a doc page exists for a mode the library no longer has; it warns when the docs' `@geoman-io/maplibre-geoman-pro` dependency lags the documented version.

**Maintainer workflow:** on a library version bump, run `npm run docs:extract-surface` then `npm run docs:check`, and add/rename any flagged doc pages. Wire `npm run docs:check` into CI to enforce it.

> Note: the docs still depend on `@geoman-io/maplibre-geoman-pro ^0.5.6` (the live-example bundle). Bumping to the sub-editing release and re-running `npm install` (then re-verifying the live `<BrowserOnlyGmMap>` examples) is a separate, release-coupled step — `docs:check` surfaces this as a warning.

## Audit Date
December 12, 2024; updated June 19, 2026
