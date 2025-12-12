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

## Audit Date
December 12, 2024
