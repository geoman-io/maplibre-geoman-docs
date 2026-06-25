---
title: "History & Undo/Redo ⭐"
description: "Built-in undo/redo, batched transactions, and host-controlled history through ChangeSets."
---

# History & Undo/Redo

Geoman includes an undo/redo and transaction system, exposed on the instance as `gm.history` and configured through `settings.history`. It works out of the box in `internal` mode and can be handed over to your application in `controlled` mode.

## Settings

```typescript
interface HistorySettings {
  // master switch; when false nothing is recorded and the API is inert
  enabled: boolean;        // default: true
  // 'internal' keeps bounded undo/redo stacks in memory (batteries included).
  // 'controlled' keeps no stack — the host stores emitted ChangeSets and drives
  // undo/redo by replaying inverses via features.applyChangeSet().
  mode: 'internal' | 'controlled'; // default: 'internal'
  // max ChangeSets kept on the internal undo stack
  limit: number;           // default: 50
  // restore the prior selection when undoing (and clear it when undoing a create)
  trackSelection: boolean; // default: true
  // render the built-in Undo/Redo toolbar buttons (internal mode + useControlsUi)
  showControls: boolean;   // default: true
}
```

```typescript
const gm = new Geoman(map, {
  settings: {
    history: {
      enabled: true,
      mode: 'internal',
      limit: 50,
      trackSelection: true,
      showControls: true,
    },
  },
});
```

## The `gm.history` API

| Member | Type | Description |
|:-------|:-----|:------------|
| `undo()` | `Promise<boolean>` | Undo the last transaction. Resolves `false` when there is nothing to undo. |
| `redo()` | `Promise<boolean>` | Redo the last undone transaction. |
| `canUndo` | `boolean` | Whether an undo step is available. |
| `canRedo` | `boolean` | Whether a redo step is available. |
| `enabled` | `boolean` | Whether history is currently recording. |
| `clear()` | `void` | Empty both stacks. |
| `batch(label, fn)` | `Promise<T>` | Run `fn` and commit all of its mutations as one undo step. |
| `beginTransaction(label?)` / `endTransaction()` | `void` | Open/close form of `batch` for method bodies that early-return. Nestable. |
| `commit(label?)` | `void` | Close the open transaction and push it to the stack. |
| `settings` | `HistorySettings` | The resolved history settings. |

```js
// undo / redo programmatically
await map.gm.history.undo();
await map.gm.history.redo();

// group several edits into a single undo step
await map.gm.history.batch('move group', async () => {
  // ...mutations that should undo together...
});
```

## History events

Two forwarded events let you build host UI and host persistence:

| Event | Fired | Output |
|:------|:------|:-------|
| `gm:history` | On every stack change (commit, undo, redo, clear) — even keyboard undo/redo. | `canUndo`, `canRedo`, `map` |
| `gm:transaction` | Once per committed transaction, only for `origin: 'user'` edits. | `changeSet`, `map` |

```js
// keep undo/redo buttons in sync
map.on('gm:history', (event) => {
  undoButton.disabled = !event.canUndo;
  redoButton.disabled = !event.canRedo;
});

// persist every user edit (host-driven store)
map.on('gm:transaction', (event) => {
  myStore.append(event.changeSet);
});
```

## Controlled mode & ChangeSets

In `controlled` mode Geoman keeps **no** internal stack. Instead it emits a `ChangeSet` on every user transaction via `gm:transaction`, and your application drives undo/redo by replaying inverses with `gm.features.applyChangeSet()`.

```typescript
// One feature-level mutation, stored with enough info to apply and invert it.
type FeatureChange =
  | { op: 'create'; featureId: FeatureId; after: GeoJsonShapeFeature }
  | { op: 'delete'; featureId: FeatureId; before: GeoJsonShapeFeature }
  | { op: 'update'; featureId: FeatureId; before: GeoJsonShapeFeature; after: GeoJsonShapeFeature };

// An atomic, named, invertible unit of history — one undo/redo step.
interface ChangeSet {
  id: string;
  label: string;
  origin: 'user' | 'undo' | 'redo' | 'apply';
  changes: FeatureChange[];
  selectionBefore?: FeatureId[];
  selectionAfter?: FeatureId[];
  ts: number; // epoch ms, stamped at commit time
}
```

```js
// apply a ChangeSet (e.g. your own undo, or syncing remote edits)
const result = await map.gm.features.applyChangeSet(changeSet, { origin: 'apply' });
// result: { applied, stale, missing }
```

`applyChangeSet` returns an `ApplyResult` describing the per-change outcome so your host can decide how to handle conflicts:

| Field | Meaning |
|:------|:--------|
| `applied` | Changes applied successfully. |
| `stale` | Target already in the expected post-state (e.g. create of an existing id). |
| `missing` | Target feature not found (e.g. update/delete of a missing id). |
