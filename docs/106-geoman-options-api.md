---
title: "Geoman Options API"
description: "API reference for GmOptions: control configuration, mode state management, settings, and layer styles."
---

# Geoman Options API

The GmOptions instance manages the configuration and state of Geoman controls and modes. It handles settings, controls, and layer styles, and provides methods to manage mode states.

## Accessing GmOptions

The GmOptions instance is available through the `options` property on the Geoman instance:

```typescript
const options: GmOptionsPartial = {
  // configuration options
  // see Configuring Geoman section for more details
};

const gm = new Geoman(map,options);
const options = gm.options;
```

## Methods

### Mode Management

#### `enableMode`
Enables a specific mode for a mode type. Returns a `Promise` that resolves once the mode change has completed.
```typescript
options.enableMode(modeType: ModeType, modeName: ModeName): Promise<void>;
```

Example:
```typescript
options.enableMode('draw', 'polygon');
options.enableMode('edit', 'rotate');
```

#### `disableMode`
Disables a specific mode for a mode type. Returns a `Promise` that resolves once the mode change has completed.
```typescript
options.disableMode(modeType: ModeType, modeName: ModeName): Promise<void>;
```

Example:
```typescript
options.disableMode('draw', 'polygon');
options.disableMode('edit', 'rotate');
```

#### `toggleMode`
Toggles a specific mode for a mode type. Returns a `Promise` that resolves once the mode change has completed.
```typescript
options.toggleMode(modeType: ModeType, modeName: ModeName): Promise<void>;
```

Example:
```typescript
options.toggleMode('draw', 'polygon');
options.toggleMode('edit', 'rotate');
```

### Mode State Queries

#### `isModeEnabled`
Checks if a specific mode is currently enabled.
```typescript
options.isModeEnabled(actionType: ActionType, modeName: ModeName): boolean;
```

Example:
```typescript
const isDrawing = options.isModeEnabled('draw', 'polygon');
const isEditing = options.isModeEnabled('edit', 'rotate');
```

#### `isModeAvailable`
Checks if a specific mode is available for use.
```typescript
options.isModeAvailable(actionType: ActionType, modeName: ModeName): boolean;
```

Example:
```typescript
const canDraw = options.isModeAvailable('draw', 'polygon');
const canEdit = options.isModeAvailable('edit', 'rotate');
```

### Control Options

#### `getControlOptions`
Gets the options for a specific control.
```typescript
options.getControlOptions({
  modeType: ModeType,
  modeName: ModeName
}): ControlOptions | null;
```

Example:
```typescript
const polygonOptions = options.getControlOptions({
  modeType: 'draw',
  modeName: 'polygon'
});
```

## Dynamic Configuration Example

```typescript
// Get current control options
const polygonControl = gm.options.getControlOptions({
  modeType: 'draw',
  modeName: 'polygon'
});

// Check mode states
const isPolygonEnabled = gm.options.isModeEnabled('draw', 'polygon');
const isRotateAvailable = gm.options.isModeAvailable('edit', 'rotate');

// Toggle modes
if (isPolygonEnabled) {
  gm.options.disableMode('draw', 'polygon');
} else {
  gm.options.enableMode('draw', 'polygon');
}

```