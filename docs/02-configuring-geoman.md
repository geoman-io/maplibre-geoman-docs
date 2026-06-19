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
  settings: {
    throttlingDelay: number;
    useDefaultLayers: boolean;
    controlsPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    controlsUiEnabledByDefault: boolean;
    controlsCollapsible: boolean;
    controlsStyles: {
      controlGroupClass: string;
      controlContainerClass: string;
      controlButtonClass: string;
    };
    disableSelectionGating: boolean;
    idGenerator: null | ((shapeGeoJson: GeoJsonShapeFeature) => string);
    markerIcons: {
      default: string;
      control: string;
    };
  };
  layerStyles: typeof styles;
  controls: {
    draw: Record<DrawModeName, ControlOptions>;
    edit: Record<EditModeName, ControlOptions>;
    helper: Record<HelperModeName, ControlOptions>;
  };
}
```

You can provide a partial configuration using `GmOptionsPartial`, which allows you to specify only the options you want to override.

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

The `settings` object allows you to configure global Geoman settings:

```typescript
const gmOptions: GmOptionsPartial = {
  settings: {
    // Delay in milliseconds for throttling events
    throttlingDelay: 100,

    // Whether to create default layers for rendering features
    useDefaultLayers: true,

    // Position of the controls on the map
    controlsPosition: 'top-right', // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

    // disable or enable each control by default,
    // an individual control could be enabled and disabled separately
    controlsUiEnabledByDefault: true,

    // display the button which toggles all controls visibility
    controlsCollapsible: false,

    // controls styling in case if you want to have custom buttons
    controlsStyles: {
      controlGroupClass: 'maplibregl-ctrl maplibregl-ctrl-group',
      controlContainerClass: 'gm-control-container',
      controlButtonClass: 'gm-control-button',
    },

    // Turn off selection-requirement gating of controls. When false (default),
    // controls that declare a `requiresSelection` (such as add_hole, add_part,
    // merge_parts, reshape) are shown disabled until the current selection
    // satisfies the requirement. Set to true for hosts that manage tool
    // availability themselves — the modes still validate at run time and emit
    // a `gm:operation_rejected` event when an operation cannot be applied.
    disableSelectionGating: false,

    // Custom ID generator function for features (optional)
    // If null, Geoman will auto-generate IDs like 'feature-1', 'feature-2', etc.
    idGenerator: null,

    // SVG icons for markers (used internally)
    markerIcons: {
      default: '<svg>...</svg>',
      control: '<svg>...</svg>',
    },
  }
};
```

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
        options: [
          {
            type: 'toggle',
            name: 'snap',
            label: 'Snap to Vertices',
            value: true
          }
        ]
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

Edit controls handle modification of existing geometries. Available edit modes include: 'drag', 'change', 'rotate', 'scale', 'copy', 'cut', 'split', 'union', 'difference', 'line_simplification', 'lasso', and 'delete'.

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
        options: [
          {
            type: 'select',
            name: 'rotationStep',
            label: 'Rotation Step',
            value: { title: '45°', value: 45 },
            choices: [
              { title: '15°', value: 15 },
              { title: '45°', value: 45 },
              { title: '90°', value: 90 }
            ]
          }
        ]
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
        options: [
          {
            type: 'toggle',
            name: 'snapToVertices',
            label: 'Snap to Vertices',
            value: true
          }
        ]
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

### Selection & Highlight Style Variables

Beyond the per-layer style specification above, Geoman exposes a set of
**style variables** that colour the selection outline and the transient
highlights shown during editing (for example while sub-editing polygons). These
variables live on each source's `StyleVariables` — they are configured **per
source** (each entry in `layerStyles` / `styleVariables` carries its own set) —
and every one has a built-in default, so you only override the ones you want to
change.

Selection is read as a **single cue**: when a feature is selected it keeps its
normal fill and its border turns red (`#e03131`). On top of that, an optional
translucent **blue fill tint** can be enabled — it is off by default, since the
feature already shows its own fill.

| Variable                       | Default          | Meaning                                                                                          |
| ------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------ |
| `highlightSelectedColor`       | `#e03131`        | Border colour of the selected feature                                                            |
| `highlightSelectedWidth`       | `lineWidth + 1`  | Selected border width — defaults to one pixel wider so it fully covers the feature's own border  |
| `highlightCandidateColor`      | `#f0a868`        | Outline of removal candidates (the removable rings/parts in `remove_ring`)                       |
| `highlightHoverColor`          | `#e8590c`        | Outline of the ring/part currently under the cursor                                              |
| `highlightSelectedFillColor`   | `fillColor`      | Fill colour of the optional selection fill tint                                                  |
| `highlightSelectedFillOpacity` | `0` (off)        | Opacity of the selection fill tint; set a value `> 0` to enable the tint                         |
| `holeMarkerColor`              | built-in default | Colour of vertex markers on an interior ring (hole), so holes stand out from the outer ring      |

To enable the blue selection fill tint, set `highlightSelectedFillOpacity` above
`0` (and optionally change `highlightSelectedFillColor`) on the relevant source's
style variables.

## Control Options

Each control can have the following options:

```typescript
interface ControlOptions {
  title: string;        // Display title for the control
  icon: string | null;  // Icon for the control button
  uiEnabled: boolean;   // Whether the control appears in the UI
  active: boolean;      // Whether the control is active by default
  options?: ActionOptions; // Additional control-specific options
}
```

### Action Options Types

Controls can have additional options of two types:

```typescript
type SelectActionOption = {
  type: 'select';
  label: string;
  name: string;
  value: { title: string; value: boolean | string | number };
  choices: Array<{ title: string; value: boolean | string | number }>;
};

type ToggleActionOption = {
  type: 'toggle';
  label: string;
  name: string;
  value: boolean;
};
```

### Gating a control on the selection (`requiresSelection`)

A control's `settings.requiresSelection` declares the selection context the
control needs to be usable. When set, Geoman resolves it against the current
feature selection and **disables the control's toolbar button** (with a guidance
tooltip) until the requirement is met. This is what gates the polygon
sub-editing tools (for example `add_hole` / `add_part` require a single selected
polygon, `merge_parts` requires two or more).

```typescript
interface SelectionRequirement {
  min?: number;        // minimum number of selected features (default 1)
  max?: number;        // maximum number of selected features
  shapes?: FeatureShape[]; // allowed shapes for every selected feature, e.g. ['polygon']
  context?: 'multipolygon' | 'has-holes' | 'has-parts'; // required selection context
  message?: string;    // override the default guidance message shown when unmet
}
```

`requiresSelection` lives on the control's `settings`:

```typescript
const gmOptions: GmOptionsPartial = {
  controls: {
    edit: {
      add_hole: {
        settings: {
          requiresSelection: {
            min: 1,
            max: 1,
            shapes: ['polygon'],
            message: 'Select a polygon to continue',
          },
        },
      },
    },
  },
};
```

To turn this gating off globally — for hosts that manage tool availability
themselves — set `settings.disableSelectionGating: true` (see the Settings
section above). The modes still validate at run time and emit
`gm:operation_rejected` when an operation cannot be applied.

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
        options: [
          {
            type: 'toggle',
            name: 'snap',
            label: 'Snap to Vertices',
            value: true
          }
        ]
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
