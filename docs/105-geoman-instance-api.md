# Geoman Instance API

The Geoman instance provides the main interface for interacting with the map editing functionality. This documentation covers all public methods available on the Geoman instance.

## Installation & Initialization

```typescript
import { Geoman, GmOptionsPartial } from '@geoman-io/maplibre-geoman-pro'; // or '@geoman-io/maplibre-geoman-free'


const options: GmOptionsPartial = {
  // configuration options
};

const gm = new Geoman(map, options);
```

## Core Properties

### `features`
Access to the Features API for managing map features.
```typescript
const features = gm.features;
```

### `mapAdapter`
Access to the underlying map adapter instance.
```typescript
const mapAdapter = gm.mapAdapter;
```

## Mode Management Methods

### Draw Modes

#### `enableDraw`
Enables drawing mode for a specific shape.
```typescript
gm.enableDraw(shape: DrawModeName): void;
```

#### `disableDraw`
Disables any active drawing mode.
```typescript
gm.disableDraw(): void;
```

#### `toggleDraw`
Toggles drawing mode for a specific shape.
```typescript
gm.toggleDraw(shape: DrawModeName): void;
```

#### `drawEnabled`
Checks if drawing mode is enabled for a specific shape.
```typescript
gm.drawEnabled(shape: DrawModeName): boolean;
```

### Edit Modes

#### Global Edit Mode
```typescript
gm.enableGlobalEditMode(): void;
gm.disableGlobalEditMode(): void;
gm.toggleGlobalEditMode(): void;
gm.globalEditModeEnabled(): boolean;
```

#### Global Drag Mode
```typescript
gm.enableGlobalDragMode(): void;
gm.disableGlobalDragMode(): void;
gm.toggleGlobalDragMode(): void;
gm.globalDragModeEnabled(): boolean;
```

#### Global Rotate Mode
```typescript
gm.enableGlobalRotateMode(): void;
gm.disableGlobalRotateMode(): void;
gm.toggleGlobalRotateMode(): void;
gm.globalRotateModeEnabled(): boolean;
```

#### Global Cut Mode
```typescript
gm.enableGlobalCutMode(): void;
gm.disableGlobalCutMode(): void;
gm.toggleGlobalCutMode(): void;
gm.globalCutModeEnabled(): boolean;
```

#### Global Removal Mode
```typescript
gm.enableGlobalRemovalMode(): void;
gm.disableGlobalRemovalMode(): void;
gm.toggleGlobalRemovalMode(): void;
gm.globalRemovalModeEnabled(): boolean;
```

#### Other Edit Modes

For edit modes without dedicated helper methods (scale, copy, split, union, difference, line_simplification, lasso), use the generic mode management methods:

```typescript
// Example: Scale mode
gm.enableMode('edit', 'scale');
gm.disableMode('edit', 'scale');
gm.toggleMode('edit', 'scale');
gm.isModeEnabled('edit', 'scale');

// Example: Copy mode
gm.enableMode('edit', 'copy');
// ... and so on for other edit modes
```

### Generic Mode Management

#### `enableMode`
Enables a specific mode for a given action type.
```typescript
gm.enableMode(actionType: ActionType, modeName: ModeName): void;
```

#### `disableMode`
Disables a specific mode for a given action type.
```typescript
gm.disableMode(actionType: ActionType, modeName: ModeName): void;
```

#### `toggleMode`
Toggles a specific mode for a given action type.
```typescript
gm.toggleMode(actionType: ActionType, modeName: ModeName): void;
```

#### `isModeEnabled`
Checks if a specific mode is enabled.
```typescript
gm.isModeEnabled(actionType: ActionType, modeName: ModeName): boolean;
```

#### `disableAllModes`
Disables all active modes.
```typescript
gm.disableAllModes(): void;
```

## Mode Status Methods

#### `getActiveDrawModes`
Gets array of currently active draw modes.
```typescript
gm.getActiveDrawModes(): Array<DrawModeName>;
```

#### `getActiveEditModes`
Gets array of currently active edit modes.
```typescript
gm.getActiveEditModes(): Array<EditModeName>;
```

#### `getActiveHelperModes`
Gets array of currently active helper modes.
```typescript
gm.getActiveHelperModes(): Array<HelperModeName>;
```

## Control Management

#### `addControls`
Adds the Geoman controls to the map.
```typescript
gm.addControls(controlsElement?: HTMLElement): Promise<void>;
```

#### `removeControls`
Removes the Geoman controls from the map.
```typescript
gm.removeControls(): void;
```

## Lifecycle Methods

#### `waitForGeomanLoaded`
Waits for Geoman to be fully loaded and ready.
```typescript
gm.waitForGeomanLoaded(): Promise<Geoman | undefined>;
```

#### `destroy`
Destroys the Geoman instance and cleans up resources.
```typescript
gm.destroy({ removeSources }: { removeSources: boolean }): Promise<void>;
```

## Event Handling

#### `setGlobalEventsListener`
Sets a global event listener for all Geoman events.
```typescript
gm.setGlobalEventsListener(callback?: (parameters: GlobalEventsListenerParameters) => void): void;
```

## Types

### ModeName Types
```typescript
type DrawModeName = 'marker' | 'circle' | 'circle_marker' | 'ellipse' | 'text_marker' |
                    'line' | 'rectangle' | 'polygon' | 'freehand' | 'custom_shape';

type EditModeName = 'drag' | 'change' | 'rotate' | 'scale' | 'copy' | 'cut' | 
                    'split' | 'union' | 'difference' | 'line_simplification' | 
                    'lasso' | 'delete';

type HelperModeName = 'shape_markers' | 'pin' | 'snapping' | 'snap_guides' | 
                      'measurements' | 'auto_trace' | 'geofencing' | 
                      'zoom_to_features' | 'click_to_edit';
```

### Event Types
```typescript
type GlobalEventsListenerParameters = {
    type: 'system' | 'converted';
    name: GmFwdEventNameWithPrefix | GmFwdSystemEventNameWithPrefix;
    payload: GmFwdEvent | GMEvent;
};
```

## Example Usage

```typescript
// Initialize Geoman
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://maps.geoman.io/styles/basic/style.json'
});

const gm = new Geoman(map);

// Add controls
await gm.addControls();

// Enable drawing mode
gm.enableDraw('polygon');

// Listen to events
gm.setGlobalEventsListener((params) => {
  if (params.name === 'gm:create') {
    console.log('Feature created:', params.payload);
  }
});

// Enable various edit modes
gm.enableGlobalEditMode();
gm.enableGlobalRotateMode();

// Check active modes
const activeModes = gm.getActiveEditModes();
console.log('Active edit modes:', activeModes);

// Disable all modes
gm.disableAllModes();
```

## Available Draw Shapes

- `marker`: Single point marker
- `circle`: Circle with radius
- `circle_marker`: Fixed-size circle marker
- `ellipse`: Ellipse with x and y semi-axes
- `text_marker`: Text label
- `line`: Linear feature
- `rectangle`: Rectangular polygon
- `polygon`: Free-form polygon
- `freehand`: Freehand drawing
- `custom_shape`: Custom shape drawing

## Available Edit Modes

- `drag`: Move features
- `change`: Modify vertices
- `rotate`: Rotate features
- `scale`: Scale features
- `copy`: Copy features
- `cut`: Cut features
- `split`: Split features
- `union`: Combine features
- `difference`: Subtract features
- `line_simplification`: Simplify lines
- `lasso`: Lasso selection
- `delete`: Remove features

## Available Helper Modes

- `shape_markers`: Show shape markers
- `pin`: Pin mode
- `snapping`: Enable snapping
- `snap_guides`: Show snap guides
- `measurements`: Show measurements
- `auto_trace`: Auto-trace features
- `geofencing`: Geofencing mode
- `zoom_to_features`: Zoom to features
- `click_to_edit`: Click to edit mode

