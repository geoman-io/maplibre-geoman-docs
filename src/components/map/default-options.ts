import type { PartialDeep } from 'type-fest';
import type { GmOptionsData } from '@geoman-io/maplibre-geoman-pro';


const defaultOptions: PartialDeep<GmOptionsData> = {
  settings: {
    eventPrefix: 'pm',
    throttlingDelay: 10,
    debugEvents: false,
    controlsPosition: 'top-left',
  },
  controls: {
    draw: {
      marker: {
        uiEnabled: false,
        active: false,
      },
      circle_marker: {
        uiEnabled: false,
        active: false,
      },
      text_marker: {
        uiEnabled: false,
        active: false,
      },
      circle: {
        uiEnabled: false,
        active: false,
      },
      line: {
        uiEnabled: false,
        active: false,
      },
      rectangle: {
        uiEnabled: false,
        active: false,
      },
      polygon: {
        uiEnabled: false,
        active: false,
      },
      freehand: {
        uiEnabled: false,
        active: false,
      },
    },
    edit: {
      drag: {
        uiEnabled: false,
        active: false,
      },
      change: {
        uiEnabled: false,
        active: false,
      },
      rotate: {
        uiEnabled: false,
        active: false,
      },
      scale: {
        uiEnabled: false,
        active: false,
      },
      copy: {
        uiEnabled: false,
        active: false,
      },
      cut: {
        uiEnabled: false,
        active: false,
      },
      split: {
        uiEnabled: false,
        active: false,
      },
      union: {
        uiEnabled: false,
        active: false,
      },
      difference: {
        uiEnabled: false,
        active: false,
      },
      line_simplification: {
        uiEnabled: false,
        active: false,
      },
      lasso: {
        uiEnabled: false,
        active: false,
      },
      delete: {
        uiEnabled: false,
        active: false,
      },
    },
    helper: {
      shape_markers: {
        uiEnabled: false,
        active: false,
      },
      snapping: {
        uiEnabled: false,
        active: false,
      },
      pin: {
        uiEnabled: false,
        active: false,
      },
      snap_guides: {
        uiEnabled: false,
        active: false,
      },
      measurements: {
        uiEnabled: false,
        active: false,
      },
      auto_trace: {
        uiEnabled: false,
        active: false,
      },
      zoom_to_features: {
        uiEnabled: false,
        active: false,
      },
    },
  },
};

export default defaultOptions;
