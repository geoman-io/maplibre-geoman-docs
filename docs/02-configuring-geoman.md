---
title: "Configuring Geoman"
description: "Configure Geoman controls, styles, settings, and layer behaviors through the options object."
---

# Configuring Geoman

Geoman can be configured by passing an options object to the Geoman constructor. The configuration allows you to customize various aspects of the library, including controls, styles, and general settings.

## Configuration Structure

The main configuration object follows this structure:

```typescript
interface GmOptionsData {
  settings: GmSettings;
  // High-level, per-source style variables (recommended way to recolour/resize
  // overlays). Deep-merged over the built-in defaults and compiled into layerStyles.
  styleVariables: SourceStyles;
  // Low-level raw MapLibre/Mapbox paint layers, applied on top of styleVariables.
  layerStyles: typeof defaultLayerStyles;
  // Each mode entry is optional, so you only specify the controls you want to override.
  controls: {
    draw: { [key in DrawModeName]?: ControlOptions };
    edit: { [key in EditModeName]?: ControlOptions };
    helper: { [key in HelperModeName]?: ControlOptions };
  };
}
```

You can provide a partial configuration using `GmOptionsPartial`, which allows you to specify only the options you want to override. Every option below has a built-in default, so you only set the fields you want to change.

## Basic Usage

Here's a basic example of configuring Geoman:

```typescript
import { Geoman, GmOptionsPartial } from '@geoman-io/maplibre-geoman-free'; // or '@geoman-io/maplibre-geoman-pro', '@geoman-io/mapbox-geoman-free', '@geoman-io/mapbox-geoman-pro'



const gmOptions: GmOptionsPartial = {
  settings: {
    controlsPosition: 'top-right',
    throttlingDelay: 100
  },
  controls: {
    draw: {
      polygon: {
        title: 'Draw Polygon',
        icon: 'custom-polygon-icon',
        uiEnabled: true,
        active: false
      }
    }
  }
};

const gm = new Geoman(map, gmOptions);
```

## Settings Configuration

The `settings` object configures global Geoman behavior. The table below lists **every** setting together with its **default value**.

| Setting | Type | Default | Description |
|:--------|:-----|:--------|:------------|
| `throttlingDelay` | `number` | `10` | Delay in milliseconds used to throttle high-frequency events (drag, move). |
| `awaitDataUpdatesOnEvents` | `boolean` | `true` | When `true`, events like `gm:create` and `gm:remove` wait for MapLibre to commit data updates before firing, so feature data is accessible via `exportGeoJson()` in handlers. Set to `false` for faster async updates. |
| `useControlsUi` | `boolean` | `true` | Render Geoman's built-in control toolbar. Set to `false` to drive everything through the API. |
| `controlsPosition` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'top-left'` | Position of the controls on the map. |
| `controlsUiEnabledByDefault` | `boolean` | `true` | Whether controls appear in the UI by default. Individual controls can override this with their own `uiEnabled`. |
| `controlsCollapsible` | `boolean` | `false` | Show a button that toggles the visibility of all controls. |
| `useDefaultLayers` | `boolean` | `true` | Create the default rendering layers for features. Set to `false` to define all layers manually. |
| `useCursorHandlers` | `boolean` | `true` | Let Geoman manage the map cursor while drawing/editing. |
| `controlsStyles` | `ControlStyles` | see below | CSS classes applied to the control group/container/button. |
| `disableSelectionGating` | `boolean` | `false` | When `true`, controls that require a selection (`add_hole`, `add_part`, `merge_parts`) are never shown disabled. The modes still validate at run time. |
| `clearSelectionOnBackgroundClick` | `boolean` | `true` | Clear the global selection when the user clicks the empty map background. |
| `renderSelection` | `boolean` | `true` | Render the always-on selection overlay that outlines the globally-selected features in any mode. See [Selection](/selection). |
| `history` | `HistorySettings` | see below | Undo/redo + transaction history. See [History & Undo/Redo](/history). |
| `keyboard` | `KeyboardSettings` | see below | Container-scoped keyboard shortcuts. See [Keyboard Shortcuts](/keyboard-shortcuts). |
| `idGenerator` | `null \| (feature) => string` | `null` | Custom feature-ID generator. When `null`, Geoman auto-generates IDs. See [Feature IDs](/feature-ids). |
| `snapDistance` | `number` | `18` | Snapping tolerance in pixels for the snapping helper. |
| `snapping` | `SnappingSettings` | see below | Snap against host-owned map sources/layers. See [Snapping to External Sources](/external-snapping). |
| `markerIcons` | `{ default: string; control: string }` | built-in SVGs | SVG icons used for markers (used internally). |

```typescript
const gmOptions: GmOptionsPartial = {
  settings: {
    // Delay in milliseconds for throttling events
    throttlingDelay: 10,

    // When true, events like gm:create wait for MapLibre to commit data updates
    // before firing, so feature data is available via exportGeoJson() in handlers
    awaitDataUpdatesOnEvents: true,

    // Render the built-in control toolbar
    useControlsUi: true,

    // Position of the controls on the map
    controlsPosition: 'top-left', // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

    // Enable each control in the UI by default; individual controls can override
    controlsUiEnabledByDefault: true,

    // Display the button which toggles all controls visibility
    controlsCollapsible: false,

    // Create the default layers for rendering features
    useDefaultLayers: true,

    // Let Geoman manage the cursor while drawing/editing
    useCursorHandlers: true,

    // Controls styling in case you want custom buttons
    controlsStyles: {
      controlGroupClass: 'maplibregl-ctrl maplibregl-ctrl-group',
      controlContainerClass: 'gm-control-container',
      controlButtonClass: 'gm-control-button',
    },

    // Never grey-out selection-gated controls (add_hole / add_part / merge_parts)
    disableSelectionGating: false,

    // Clear the global selection when clicking the empty map background
    clearSelectionOnBackgroundClick: true,

    // Outline the globally-selected features in every mode
    renderSelection: true,

    // Undo/redo + transaction history (see the History page)
    history: {
      enabled: true,
      mode: 'internal',
      limit: 50,
      trackSelection: true,
      showControls: true,
    },

    // Keyboard shortcuts (see the Keyboard Shortcuts page)
    keyboard: {
      enabled: true,
      bindings: {
        undo: ['mod+z'],
        redo: ['mod+shift+z', 'mod+y'],
        deleteSelected: ['Delete', 'Backspace'],
        cancel: ['Escape'],
      },
    },

    // Custom ID generator function for features (optional)
    // If null, Geoman will auto-generate IDs like 'feature-1', 'feature-2', etc.
    idGenerator: null,

    // Snapping tolerance in pixels for the snapping helper
    snapDistance: 18,

    // Snap against host-owned sources/layers (see the External Snapping page)
    snapping: {
      targets: [],
      acquire: 'rendered',
      maxCandidates: 200,
    },

    // SVG icons for markers (used internally)
    markerIcons: {
      default: '<svg>...</svg>',
      control: '<svg>...</svg>',
    },
  }
};
```

### History, Keyboard and Snapping settings

These three settings are sub-objects with their own defaults. They are summarized here and documented in full on their dedicated pages.

```typescript
// settings.history — defaults
interface HistorySettings {
  enabled: boolean;        // default: true — master switch
  mode: 'internal' | 'controlled'; // default: 'internal'
  limit: number;           // default: 50 — max ChangeSets on the internal undo stack
  trackSelection: boolean; // default: true — restore selection on undo
  showControls: boolean;   // default: true — render built-in Undo/Redo buttons
}

// settings.keyboard — defaults
interface KeyboardSettings {
  enabled: boolean;                       // default: true
  bindings: Record<KeyboardAction, string[]>;
  // default bindings:
  //   undo:           ['mod+z']
  //   redo:           ['mod+shift+z', 'mod+y']
  //   deleteSelected: ['Delete', 'Backspace']
  //   cancel:         ['Escape']
}

// settings.snapping — defaults
interface SnappingSettings {
  targets: SnapTarget[];              // default: [] (external snapping disabled)
  acquire: 'rendered' | 'source';     // default: 'rendered'
  maxCandidates: number;              // default: 200
}
```

See [History & Undo/Redo](/history), [Keyboard Shortcuts](/keyboard-shortcuts) and [Snapping to External Sources](/external-snapping) for full details.

## Controls Configuration

### Draw Controls

Draw controls manage the creation of new geometries. Available draw modes include: 'marker', 'circle', 'circle_marker', 'ellipse', 'text_marker', 'line', 'rectangle', 'polygon', 'freehand', and 'custom_shape'.

```typescript
const gmOptions: GmOptionsPartial = {
  controls: {
    draw: {
      polygon: {
        title: 'Draw Polygon',
        icon: 'custom-polygon-icon',
        uiEnabled: true,
        active: false,
        options: {
          snap: {
            type: 'toggle',
            label: 'Snap to Vertices',
            value: true
          }
        }
      },
      line: {
        title: 'Draw Line',
        uiEnabled: true,
        active: false
      }
    }
  }
};
```

### Edit Controls

Edit controls handle modification of existing geometries. Available edit modes include: 'select', 'drag', 'change', 'rotate', 'scale', 'copy', 'cut', 'split', 'union', 'difference', 'line_simplification', 'lasso', 'add_hole', 'add_part', 'remove_ring', 'explode', 'merge_parts', and 'delete'.

```typescript
const gmOptions: GmOptionsPartial = {
  controls: {
    edit: {
      drag: {
        title: 'Drag Features',
        icon: 'drag-icon',
        uiEnabled: true,
        active: false
      },
      rotate: {
        title: 'Rotate Features',
        uiEnabled: true,
        active: false,
        options: {
          rotationStep: {
            type: 'select',
            label: 'Rotation Step',
            value: { title: '45°', value: 45 },
            choices: [
              { title: '15°', value: 15 },
              { title: '45°', value: 45 },
              { title: '90°', value: 90 }
            ]
          }
        }
      }
    }
  }
};
```

### Helper Controls

Helper controls provide additional functionality. Available helper modes include: 'shape_markers', 'pin', 'snapping', 'snap_guides', 'measurements', 'auto_trace', 'geofencing', 'zoom_to_features', and 'click_to_edit'.

```typescript
const gmOptions: GmOptionsPartial = {
  controls: {
    helper: {
      snapping: {
        title: 'Snap to Features',
        uiEnabled: true,
        active: true,
        options: {
          snapToVertices: {
            type: 'toggle',
            label: 'Snap to Vertices',
            value: true
          }
        }
      },
      measurements: {
        title: 'Show Measurements',
        uiEnabled: true,
        active: false
      }
    }
  }
};
```

## Style Variables (recommended styling)

`styleVariables` is the high-level, recommended way to recolour and resize Geoman's overlays. You set only the fields you want to change per source — they are deep-merged over the built-in defaults and compiled into `layerStyles`. For full control over the raw paint layers, the lower-level [`layerStyles`](#layer-styles-configuration) option is still available and is applied **on top of** whatever `styleVariables` compiles to.

The variables are configured per source. The most common source is `main` (your persistent features); `temporary` is used while drawing/editing, `internal` for helper geometry, and (Pro) `standby` for parked features.

```typescript
type StyleVariables = {
  lineColor: string;
  lineOpacity: number;
  lineWidth: number;
  fillColor: string;
  fillOpacity: number;
  circleMarkerRadius: number;
  holeMarkerColor?: string;
  // selection / sub-editing highlight channels
  highlightSelectedColor?: string;
  highlightSelectedWidth?: number;
  highlightSelectedFillColor?: string;
  highlightSelectedFillOpacity?: number;
  highlightCandidateColor?: string;
  highlightCandidateWidth?: number;
  highlightCandidateOpacity?: number;
  highlightHoverColor?: string;
  highlightHoverWidth?: number;
  highlightHoverFillOpacity?: number;
  highlightSnapColor?: string;
  highlightSnapWidth?: number;
};

type SourceStyles = {
  main: StyleVariables;
  temporary: StyleVariables;
  internal: StyleVariables;
  standby?: StyleVariables; // Pro only
};
```

### Default style variables

The defaults applied to each source are:

| Variable | Default |
|:---------|:--------|
| `lineColor` | `#1971c2` (`temporary`: `#ff5600`, `standby`: `#787878`) |
| `lineOpacity` | `0.8` |
| `lineWidth` | `3` |
| `fillColor` | `#4fb3ff` (`standby`: `#a5a5a5`) |
| `fillOpacity` | `0.4` |
| `circleMarkerRadius` | `10` |
| `holeMarkerColor` | `#9c36b5` |
| `highlightSelectedColor` | `#e03131` |
| `highlightSelectedFillColor` | `#4fb3ff` |
| `highlightCandidateColor` | `#fab005` |
| `highlightHoverColor` | `#e8590c` |

### Example

```typescript
const gmOptions: GmOptionsPartial = {
  styleVariables: {
    main: {
      lineColor: '#278cda',
      fillColor: '#278cda',
      fillOpacity: 0.25,
      lineWidth: 2,
    },
  },
};
```

## Layer Styles Configuration

Geoman uses Mapbox/Maplibre style specification to style different geometric shapes. Each shape type can have multiple layer styles, and there are two main categories of styles for each shape:

- `gm_main`: The default style used for displaying features
- `gm_temporary`: The style used for features being edited or temporary features (like during drawing)

### Layer Style Structure

The layer styles configuration follows this structure:

```typescript
layerStyles: {
  [shapeType: string]: {
    gm_main: Array<PartialLayerStyle>;
    gm_temporary: Array<PartialLayerStyle>;
  }
}
```

### Available Shape Types

You can configure styles for the following shape types:
- `marker`
- `circle`
- `ellipse`
- `circle_marker`
- `text_marker`
- `line`
- `rectangle`
- `polygon`

### Layer Style Types

Geoman supports four types of layer styles:

1. Symbol Layer (for markers and text):
```typescript
interface PartialSymbolLayer {
    type: 'symbol';
    layout?: {
        'icon-image'?: string;
        'icon-size'?: number;
        'icon-allow-overlap'?: boolean;
        'icon-anchor'?: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
        'text-field'?: string[];
        'text-size'?: number;
        'text-justify'?: 'auto' | 'left' | 'center' | 'right';
        'text-anchor'?: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    };
    paint?: {
        'text-color'?: string;
        'text-opacity'?: number;
        'text-halo-color'?: string;
        'text-halo-width'?: number;
    };
}
```

2. Line Layer (for lines and polygon outlines):
```typescript
interface PartialLineLayer {
    type: 'line';
    paint?: {
        'line-color'?: string;
        'line-width'?: number;
        'line-opacity'?: number;
        'line-dasharray'?: number[];
    };
    layout?: {
        'line-cap'?: 'butt' | 'round' | 'square';
        'line-join'?: 'bevel' | 'round' | 'miter';
    };
}
```

3. Fill Layer (for polygons):
```typescript
interface PartialFillLayer {
    type: 'fill';
    paint?: {
        'fill-color'?: string;
        'fill-opacity'?: number;
        'fill-outline-color'?: string;
        'fill-antialias'?: boolean;
    };
}
```

4. Circle Layer (for circle markers):
```typescript
interface PartialCircleLayer {
    type: 'circle';
    paint?: {
        'circle-radius'?: number;
        'circle-color'?: string;
        'circle-opacity'?: number;
        'circle-stroke-width'?: number;
        'circle-stroke-color'?: string;
        'circle-stroke-opacity'?: number;
    };
}
```

### Comprehensive Example

Here's a detailed example showing how to style different shape types:

```typescript
const gmOptions: GmOptionsPartial = {
  layerStyles: {
    // Marker styles
    marker: {
      gm_main: [
        {
          type: "symbol",
          layout: {
            "icon-image": "default-marker",
            "icon-size": 0.25,
            "icon-allow-overlap": true,
            "icon-anchor": "bottom",
          },
        },
      ],
      gm_temporary: [
        {
          type: "symbol",
          layout: {
            "icon-image": "temp-marker",
            "icon-size": 0.25,
          },
        },
      ],
    },
    // Text marker styles
    text_marker: {
      gm_main: [
        {
          type: "symbol",
          layout: {
            "text-field": ["get", "text"],
            "text-size": 32,
            "text-justify": "center",
            "text-anchor": "center",
          },
          paint: {
            "text-color": "#333333",
            "text-halo-color": "#ffffff",
            "text-halo-width": 2,
          },
        },
      ],
    },
    // Line styles
    line: {
      gm_main: [
        {
          type: "line",
          paint: {
            "line-color": "#3388ff",
            "line-width": 3,
            "line-opacity": 0.7,
          },
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
        },
      ],
      gm_temporary: [
        {
          type: "line",
          paint: {
            "line-color": "#ff3388",
            "line-width": 3,
            "line-opacity": 0.7,
            "line-dasharray": [2, 2],
          },
        },
      ],
    },
    // Polygon styles with both fill and line properties
    polygon: {
      gm_main: [
        {
          type: "fill",
          paint: {
            "fill-color": "#3388ff",
            "fill-opacity": 0.2,
            "fill-outline-color": "#3388ff",
          },
        },
        {
          type: "line",
          paint: {
            "line-color": "#3388ff",
            "line-width": 2,
            "line-opacity": 0.7,
          },
        },
      ],
      // Here we override the temporary style for polygons used during editing
      gm_temporary: [
        {
          type: "fill",
          paint: {
            "fill-color": "#ff3388",
            "fill-opacity": 0.2,
            "fill-outline-color": "#ff3388",
          },
        },
        {
          type: "line",
          paint: {
            "line-color": "#ff3388",
            "line-width": 2,
            "line-opacity": 0.7,
            "line-dasharray": [2, 2],
          },
        },
      ],
    },
  }
};
```

### Important Notes

1. Layer Order: Multiple layer styles for a single shape are rendered in the order they appear in the array. For polygons, it's common to define a fill layer followed by a line layer for the border.

2. Style Inheritance: If you don't specify `gm_temporary` styles, features will use `gm_main` styles during editing.

3. Custom Icons: For marker symbols using custom icons, make sure to load the images into the map before using them in the style configuration.

4. Dynamic Properties: You can use Mapbox/Maplibre expressions to create dynamic styles based on feature properties.

5. Performance: Consider using simpler styles for temporary features to improve performance during editing operations.

## Control Options

Each control can have the following options:

```typescript
interface ControlOptions {
  title: string;        // Display title for the control
  icon: string | null;  // Icon for the control button
  uiEnabled: boolean;   // Whether the control appears in the UI
  active: boolean;      // Whether the control is active by default
  options?: ActionOptions; // Additional control-specific options
  settings?: ActionSettings; // Control-specific settings (boolean | string | null)
  order?: number;          // Optional ordering of the control in the UI
}
```

### Action Options Types

Each control's `options` is an object keyed by option name, where each value is one
of the following action option types:

```typescript
type ActionOptions = {
  [name: string]: SelectActionOption | ToggleActionOption | HiddenActionOption;
};

type SelectActionOption = {
  type: 'select';
  label: string;
  value: { title: string; value: boolean | string | number };
  choices: Array<{ title: string; value: boolean | string | number }>;
};

type ToggleActionOption = {
  type: 'toggle';
  label: string;
  value: boolean;
};

type HiddenActionOption = {
  type: 'hidden';
  value: string | boolean | number | undefined;
};
```

### Default Control Options

Every draw, edit and helper mode ships with a default `ControlOptions` entry. Unless noted below, each control defaults to:

```typescript
{
  title: '<Human readable title>', // e.g. 'Polygon', 'Rotate', 'Snapping'
  icon: '<built-in icon>',
  uiEnabled: true,
  active: false,
}
```

A few controls carry extra default `options`/`settings`, and one helper is hidden by default:

| Mode | Type | Default extras |
|:-----|:-----|:---------------|
| `custom_shape` | draw | `options.shape` — a `select` defaulting to `Triangle` (choices: `Triangle`, `Rectangle`). |
| `change` | edit | `settings: { bodyDragEnabled: false, editSelectedOnly: false }`. |
| `measurements` | helper | `options.units` — a `hidden` option (auto-detect; set to `'metric'` or `'imperial'`); `settings: { stickyMode: true }`. |
| `shape_markers` | helper | `icon: null`, `uiEnabled: false` — internal helper, no toolbar button. See [Shape Markers](/helper-modes/helper-shape_markers). |

The full default control title for each mode:

| Mode | Default title |
|:-----|:--------------|
| `marker` / `circle_marker` / `text_marker` | `Marker` / `Circle Marker` / `Text Marker` |
| `circle` / `ellipse` / `line` / `rectangle` / `polygon` | `Circle` / `Ellipse` / `Line` / `Rectangle` / `Polygon` |
| `freehand` / `custom_shape` | `Freehand` / `Custom shape` |
| `select` / `drag` / `change` / `rotate` / `scale` | `Select` / `Drag` / `Change` / `Rotate` / `Scale` |
| `copy` / `cut` / `split` / `union` / `difference` | `Copy` / `Cut` / `Split` / `Union` / `Difference` |
| `line_simplification` / `lasso` | `Line simplification` / `Lasso select` |
| `add_hole` / `add_part` / `remove_ring` | `Add hole` / `Add part` / `Remove hole/part` |
| `explode` / `merge_parts` / `delete` | `Explode multipolygon` / `Merge into multipolygon` / `Delete` |
| `shape_markers` / `snapping` / `pin` / `snap_guides` | `Shape markers` / `Snapping` / `Pin` / `Snap guides` |
| `measurements` / `auto_trace` / `geofencing` | `Measurements` / `Auto trace line` / `Geofencing` |
| `zoom_to_features` / `click_to_edit` | `Zoom to features` / `Click to edit` |

## Full Configuration Example

Here's a comprehensive example combining various configuration options:

```typescript
const gmOptions: GmOptionsPartial = {
  settings: {
    controlsPosition: 'top-right',
    throttlingDelay: 100
  },
  controls: {
    draw: {
      polygon: {
        title: 'Draw Polygon',
        icon: 'polygon-icon',
        uiEnabled: true,
        active: false,
        options: {
          snap: {
            type: 'toggle',
            label: 'Snap to Vertices',
            value: true
          }
        }
      }
    },
    edit: {
      rotate: {
        title: 'Rotate Features',
        uiEnabled: true,
        active: false,
      }
    },
    helper: {
      snapping: {
        title: 'Snap to Features',
        uiEnabled: true,
        active: true
      }
    }
  },
  layerStyles: {
    polygon: {
      gm_main: [
        {
          type: 'fill',
          paint: {
            'fill-color': '#3388ff',
            'fill-opacity': 0.2,
            'fill-outline-color': '#3388ff'
          }
        }
      ]
    }
  }
};

const gm = new Geoman(map, gmOptions);
```

This configuration provides a comprehensive setup for Geoman, including custom controls, styles, and settings. Remember that all these options are partial, so you only need to specify the options you want to customize - all other options will use their default values.
