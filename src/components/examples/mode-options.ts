import type { GmOptionsPartial } from '@geoman-io/maplibre-geoman-pro';


export const drawMarkerOptions: GmOptionsPartial = {
  controls: {
    draw: {
      marker: {
        active: true,
        uiEnabled: true,
      },
    },
    helper: {
      snapping: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const drawCircleMarkerOptions: GmOptionsPartial = {
  controls: {
    draw: {
      circle_marker: {
        active: true,
        uiEnabled: true,
      },
    },
    helper: {
      snapping: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const drawTextMarkerOptions: GmOptionsPartial = {
  controls: {
    draw: {
      text_marker: {
        active: true,
        uiEnabled: true,
      },
    },
    helper: {
      snapping: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const drawCircleOptions: GmOptionsPartial = {
  controls: {
    draw: {
      circle: {
        active: true,
        uiEnabled: true,
      },
    },
    helper: {
      snapping: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const drawEllipseOptions: GmOptionsPartial = {
  controls: {
    draw: {
      ellipse: {
        active: true,
        uiEnabled: true,
      },
    },
    helper: {
      snapping: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const drawLineOptions: GmOptionsPartial = {
  controls: {
    draw: {
      line: {
        active: true,
        uiEnabled: true,
      },
    },
    helper: {
      snapping: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const drawRectangleOptions: GmOptionsPartial = {
  controls: {
    draw: {
      rectangle: {
        active: true,
        uiEnabled: true,
      },
    },
    helper: {
      snapping: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const drawPolygonOptions: GmOptionsPartial = {
  controls: {
    draw: {
      polygon: {
        active: true,
        uiEnabled: true,
      },
    },
    helper: {
      snapping: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const drawFreehandOptions: GmOptionsPartial = {
  controls: {
    draw: {
      freehand: {
        active: true,
        uiEnabled: true,
      },
    },
    helper: {
      snapping: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const drawCustomShapeOptions: GmOptionsPartial = {
  controls: {
    draw: {
      custom_shape: {
        active: true,
        uiEnabled: true,
      },
    },
    helper: {
      snapping: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const editDragOptions: GmOptionsPartial = {
  controls: {
    edit: {
      drag: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const editChangeOptions: GmOptionsPartial = {
  controls: {
    edit: {
      change: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const editRotateOptions: GmOptionsPartial = {
  controls: {
    edit: {
      rotate: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const editScaleOptions: GmOptionsPartial = {
  controls: {
    edit: {
      scale: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const editCopyOptions: GmOptionsPartial = {
  controls: {
    edit: {
      copy: {
        uiEnabled: true,
        active: true,
      },
      drag: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editCutOptions: GmOptionsPartial = {
  controls: {
    edit: {
      cut: {
        uiEnabled: true,
        active: true,
      },
      drag: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editSplitOptions: GmOptionsPartial = {
  controls: {
    edit: {
      split: {
        uiEnabled: true,
        active: true,
      },
      drag: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editUnionOptions: GmOptionsPartial = {
  controls: {
    edit: {
      union: {
        uiEnabled: true,
        active: true,
      },
      drag: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editDifferenceOptions: GmOptionsPartial = {
  controls: {
    edit: {
      difference: {
        uiEnabled: true,
        active: true,
      },
      drag: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editLineSimplificationOptions: GmOptionsPartial = {
  controls: {
    edit: {
      line_simplification: {
        uiEnabled: true,
        active: true,
      },
      drag: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editLassoOptions: GmOptionsPartial = {
  controls: {
    edit: {
      lasso: {
        uiEnabled: true,
        active: true,
      },
      drag: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editDeleteOptions: GmOptionsPartial = {
  controls: {
    edit: {
      delete: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const helperSnappingOptions: GmOptionsPartial = {
  controls: {
    draw: {
      line: {
        uiEnabled: true,
        active: false,
      },
      polygon: {
        uiEnabled: true,
        active: false,
      },
    },
    edit: {
      change: {
        uiEnabled: true,
        active: true,
      },
    },
    helper: {
      snapping: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const helperSnapGuidesOptions: GmOptionsPartial = {
  controls: {
    draw: {
      line: {
        uiEnabled: true,
        active: false,
      },
    },
    edit: {
      change: {
        uiEnabled: true,
        active: false,
      },
    },
    helper: {
      snap_guides: {
        uiEnabled: true,
        active: true,
      },
      snapping: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const helperMeasurementsOptions: GmOptionsPartial = {
  controls: {
    draw: {
      marker: {
        uiEnabled: true,
        active: true,
      },
      line: {
        uiEnabled: true,
        active: false,
      },
      polygon: {
        uiEnabled: true,
        active: false,
      },
    },
    edit: {
      change: {
        uiEnabled: true,
        active: false,
      },
    },
    helper: {
      measurements: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const helperPinOptions: GmOptionsPartial = {
  controls: {
    draw: {
      line: {
        uiEnabled: true,
        active: false,
      },
      polygon: {
        uiEnabled: true,
        active: false,
      },
    },
    edit: {
      change: {
        uiEnabled: true,
        active: false,
      },
    },
    helper: {
      pin: {
        uiEnabled: true,
        active: true,
      },
      snapping: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const helperAutoTraceOptions: GmOptionsPartial = {
  controls: {
    draw: {
      line: {
        uiEnabled: true,
        active: false,
      },
      polygon: {
        uiEnabled: true,
        active: false,
      },
    },
    edit: {
      change: {
        uiEnabled: true,
        active: false,
      },
    },
    helper: {
      auto_trace: {
        uiEnabled: true,
        active: true,
      },
      snapping: {
        uiEnabled: true,
        active: true,
      },
    },
  },
};

export const helperZoomToFeaturesOptions: GmOptionsPartial = {
  controls: {
    edit: {
      drag: {
        uiEnabled: true,
        active: false,
      },
    },
    helper: {
      zoom_to_features: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};
