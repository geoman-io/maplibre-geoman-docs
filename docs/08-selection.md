---
title: "Selection ⭐"
description: "The always-on global selection, its overlay rendering, and how to read and drive it programmatically."
---

# Selection

Geoman maintains a **global selection** of features that stays visible regardless of the active mode. The selection drives selection-gated controls (`add_hole`, `add_part`, `merge_parts`), the always-on highlight overlay, and the `deleteSelected` keyboard action.

## Settings

| Setting | Default | Description |
|:--------|:--------|:------------|
| `renderSelection` | `true` | Render the always-on overlay that outlines the globally-selected features in any mode (and, for polygons, optionally tints them) via the `SelectionRenderer`. Set to `false` if your app draws its own selection cue. |
| `clearSelectionOnBackgroundClick` | `true` | Clear the selection when the user clicks the empty map background (no Geoman feature/marker/overlay under the cursor). Set to `false` to keep the selection until explicitly changed. |
| `disableSelectionGating` | `false` | When `true`, controls that require a selection are never shown disabled — for hosts that manage availability themselves. The modes still validate at run time. |

```typescript
const gm = new Geoman(map, {
  settings: {
    renderSelection: true,
    clearSelectionOnBackgroundClick: true,
    disableSelectionGating: false,
  },
});
```

The overlay colours and widths are configurable through the `highlightSelected*` style variables — see [Style Variables](/configuring-geoman#default-style-variables).

## Reading and changing the selection

The selection lives on the features instance as a `Set` of feature IDs:

```js
// current selection (Set<FeatureId>)
map.gm.features.selection;

// set the selection programmatically
map.gm.features.setSelection(['feature-1', 'feature-2']);

// clear the selection
map.gm.features.clearSelection();
```

## Selection events

| Event | Fired | Output |
|:------|:------|:-------|
| `gm:selection` | Whenever the global selection changes. | `selection` (array of `FeatureId`), plus the originating system event |

```js
map.on('gm:selection', (event) => {
  console.log('selected feature ids:', event.selection);
});
```

See [Events](/events) for the full event reference and the [Select edit mode](/edit-modes/edit-select) for the interactive selection tool.
