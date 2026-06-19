---
title: "Geoman Layers API ⭐"
description: "Introspect and control the map sources and layers Geoman owns — list ids, check ownership, and toggle visibility/opacity — without reaching into internals."
---

# Geoman Layers API ⭐

The Layers API is a host-integration surface for apps that embed Geoman as their editing engine. It lets you introspect and control the **sources and layers Geoman owns** without string-matching the internal `gm_` id prefix.

It is accessible through the `layers` property on the Geoman instance:

```typescript
const gm = new Geoman(map, options);
const sourceIds = gm.layers.getSourceIds();
```

:::info Pro only
The Layers API is part of `@geoman-io/maplibre-geoman-pro` / `@geoman-io/mapbox-geoman-pro`.
:::

## Methods

### `getSourceIds`
Returns the ids of the sources Geoman manages (e.g. `gm_main`, `gm_temporary`, `gm_standby`).

```typescript
gm.layers.getSourceIds(): Array<FeatureSourceName>;
```

### `getLayerIds`
Returns the ids of the map layers Geoman manages.

```typescript
gm.layers.getLayerIds(): Array<string>;
```

### `ownsSource`
Whether a given source id belongs to Geoman.

```typescript
gm.layers.ownsSource(sourceId: string): boolean;
```

### `ownsLayer`
Whether a given layer id belongs to Geoman.

```typescript
gm.layers.ownsLayer(layerId: string): boolean;
```

### `setVisibility`
Show or hide Geoman's editing display. Without `sourceName`, applies to every Geoman source; pass one to target a single source.

```typescript
gm.layers.setVisibility(visible: boolean, options?: { sourceName?: FeatureSourceName }): void;

// hide all of Geoman's layers
gm.layers.setVisibility(false);
// show only the main source
gm.layers.setVisibility(true, { sourceName: "gm_main" });
```

### `setOpacity`
Fade Geoman's display. `opacity` is `0`–`1`. Without `sourceName`, applies to every Geoman source.

```typescript
gm.layers.setOpacity(opacity: number, options?: { sourceName?: FeatureSourceName }): void;

gm.layers.setOpacity(0.4);
```

## Why use it

When Geoman is one editing layer inside a larger host application, you often need to dim or hide the editing display, or tell whether a map event hit a Geoman layer or one of your own. These methods give you a stable, supported way to do that — instead of hard-coding the internal `gm_` layer-id prefix, which is not part of the public contract.

For round-tripping your own feature ids alongside this, see [Feature IDs](/feature-ids) and the `onIdCollision` option in [Importing Data](/importing-data).
