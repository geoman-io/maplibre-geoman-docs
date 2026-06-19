---
title: "Geoman Edit API ⭐"
description: "Programmatic API for polygon sub-editing — add/remove holes and parts, reshape, explode and merge — by feature id, without the toolbar."
---

# Geoman Edit API ⭐

The Edit API is a programmatic façade for the [polygon sub-editing](/edit-modes/edit-add_hole) operations. It mirrors the interactive edit modes but operates on **live features by id** — no toolbar and no simulated map drawing — and emits the **same events** as the interactive modes. This is the integration surface for host apps that drive editing from their own UI/code.

It is accessible through the `edit` property on the Geoman instance:

```typescript
const gm = new Geoman(map, options);
const result = await gm.edit.addHole(featureId, ring);
```

:::info Pro only
The Edit API is part of `@geoman-io/maplibre-geoman-pro` / `@geoman-io/mapbox-geoman-pro`.
:::

## Result type

Every method resolves to an `EditApiResult` you can branch on:

```typescript
type EditApiResult =
  | { ok: true; feature?: FeatureData; features?: Array<FeatureData> }
  | { ok: false; reason: GmEditRejectionReason };

// reason is one of:
// 'not_contained' | 'self_intersection' | 'overlap' | 'no_target' | 'invalid_geometry'
```

```typescript
const result = await gm.edit.addHole(featureId, ring);
if (!result.ok) {
  showToast(result.reason); // e.g. 'not_contained'
} else {
  console.log("updated feature", result.feature);
}
```

Features parked in the `gm_standby` source by [`click_to_edit`](/helper-modes/helper-click_to_edit) are still resolved by id, so the Edit API works whether a feature is currently editable or parked.

## Methods

### `addHole`
Punch an interior ring (hole) into a polygon/multipolygon feature.

```typescript
await gm.edit.addHole(featureId: FeatureId, ring: Array<Position>): Promise<EditApiResult>;
```

The ring must be a simple (non-self-intersecting) ring fully contained by the feature; otherwise the call resolves with `{ ok: false, reason }` (`self_intersection` / `not_contained` / `overlap`).

### `addPart`
Append a new part to a feature, promoting a `Polygon` to a `MultiPolygon`.

```typescript
await gm.edit.addPart(
  featureId: FeatureId,
  partRings: Array<Array<Position>>,
  options?: { allowOverlap?: boolean }, // default: false
): Promise<EditApiResult>;
```

Parts are disjoint by default; pass `{ allowOverlap: true }` to allow a part that overlaps the existing geometry.

### `removeRing`
Remove a hole, or a whole part of a multipolygon.

```typescript
type RemovableRingTarget =
  | { kind: "hole"; partIndex: number; ringIndex: number }
  | { kind: "part"; partIndex: number };

await gm.edit.removeRing(featureId: FeatureId, target: RemovableRingTarget): Promise<EditApiResult>;
```

When removing the ring leaves nothing valid, the feature is deleted and the result is `{ ok: true }` with no `feature`.

### `reshape`
Replace a run of the feature's outer boundary with a drawn line (grow or shrink it).

```typescript
await gm.edit.reshape(featureId: FeatureId, line: Array<Position>): Promise<EditApiResult>;
```

### `explode`
Split a multipolygon into separate single-polygon features. The result's `features` array holds the created features.

```typescript
const result = await gm.edit.explode(featureId: FeatureId); // Promise<EditApiResult>
if (result.ok) console.log(result.features);
```

### `merge`
Combine several polygon/multipolygon features into one `MultiPolygon` (parts collected, not dissolved). The result's `feature` is the merged feature.

```typescript
const result = await gm.edit.merge(featureIds: Array<FeatureId>); // Promise<EditApiResult>
if (result.ok) console.log(result.feature);
```

## Events

Each operation emits the same events as the interactive modes:

- `gm:create` / `gm:remove` when features are created or removed (e.g. `explode`, `merge`)
- the per-mode update event (e.g. `gm:add_hole`, `gm:reshape`) on a successful geometry change
- `gm:operation_rejected` (`{ mode, reason, feature }`) when an operation is intentionally not applied

See [Events](/events) for payload details.

## GeoJSON-in / GeoJSON-out helpers

The underlying pure helpers (`addHoleToPolygonGeoJson`, `reshapePolygonGeoJson`, `mergeToMultiPolygon`, `getRemovableRings`, `normalizePolygonWinding`, and the rejection-reason classifiers) are exported for headless GeoJSON transforms without a map.
