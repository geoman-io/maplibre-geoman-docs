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
    // When true, events like gm:create and gm:remove wait for MapLibre to commit
    // data updates before firing, so feature data is accessible via exportGeoJson()
    // inside event handlers. Set to false for faster async updates. (default: true)
    awaitDataUpdatesOnEvents: boolean;
    useDefaultLayers: boolean;
    useCursorHandlers: boolean;
    useControlsUi: boolean;
    controlsPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    controlsUiEnabledByDefault: boolean;
    controlsCollapsible: boolean;
    controlsStyles: {
      controlGroupClass: string;
      controlContainerClass: string;
      controlButtonClass: string;
    };
    // Disable selection-requirement gating of controls (add_hole, add_part,
    // merge_parts). The modes still validate at run time. (default: false)
    disableSelectionGating?: boolean;
    // Clear the global selection when the user clicks the empty map background. (default: true)
    clearSelectionOnBackgroundClick?: boolean;
    idGenerator: null | ((shapeGeoJson: GeoJsonShapeFeature) => string);
    // Snapping tolerance in pixels for the snapping helper. (default: 18)
    snapDistance: number;
    markerIcons: {
      default: string;
      control: string;
    };
  };
  layerStyles: typeof styles;
  // Each mode entry is optional, so you only specify the controls you want to override.
  controls: {
    draw: { [key in DrawModeName]?: ControlOptions };
    edit: { [key in EditModeName]?: ControlOptions };
    helper: { [key in HelperModeName]?: ControlOptions };
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

    // When true, events like gm:create wait for MapLibre to commit data updates
    // before firing, so feature data is available via exportGeoJson() in handlers
    awaitDataUpdatesOnEvents: true,

    // Whether to create default layers for rendering features
    useDefaultLayers: true,

    // Snapping tolerance in pixels for the snapping helper
    snapDistance: 18,

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
