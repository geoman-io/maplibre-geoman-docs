import type { PartialDeep } from 'type-fest';
import type { GmOptionsData } from '@geoman-io/maplibre-geoman-pro';


export const drawMarkerOptions: PartialDeep<GmOptionsData> = {
  controls: {
    draw: {
      marker: {
        active: false,
        uiEnabled: true,
      },
    },
  },
};

export const drawCircleMarkerOptions: PartialDeep<GmOptionsData> = {
  controls: {
    draw: {
      circle_marker: {
        active: false,
        uiEnabled: true,
      },
    },
  },
};

export const drawTextMarkerOptions: PartialDeep<GmOptionsData> = {
  controls: {
    draw: {
      text_marker: {
        active: false,
        uiEnabled: true,
      },
    },
  },
};

export const drawCircleOptions: PartialDeep<GmOptionsData> = {
  controls: {
    draw: {
      circle: {
        active: false,
        uiEnabled: true,
      },
    },
  },
};

export const drawLineOptions: PartialDeep<GmOptionsData> = {
  controls: {
    draw: {
      line: {
        active: false,
        uiEnabled: true,
      },
    },
  },
};

export const drawRectangleOptions: PartialDeep<GmOptionsData> = {
  controls: {
    draw: {
      rectangle: {
        active: false,
        uiEnabled: true,
      },
    },
  },
};

export const drawPolygonOptions: PartialDeep<GmOptionsData> = {
  controls: {
    draw: {
      polygon: {
        active: false,
        uiEnabled: true,
      },
    },
    helper: {
      snapping: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editDragOptions: PartialDeep<GmOptionsData> = {
  controls: {
    edit: {
      drag: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editChangeOptions: PartialDeep<GmOptionsData> = {
  controls: {
    edit: {
      change: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editRotateOptions: PartialDeep<GmOptionsData> = {
  controls: {
    edit: {
      rotate: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editScaleOptions: PartialDeep<GmOptionsData> = {
  controls: {
    edit: {
      scale: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editCopyOptions: PartialDeep<GmOptionsData> = {
  controls: {
    edit: {
      copy: {
        uiEnabled: true,
        active: false,
      },
      drag: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editCutOptions: PartialDeep<GmOptionsData> = {
  controls: {
    edit: {
      cut: {
        uiEnabled: true,
        active: false,
      },
      drag: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editSplitOptions: PartialDeep<GmOptionsData> = {
  controls: {
    edit: {
      split: {
        uiEnabled: true,
        active: false,
      },
      drag: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editUnionOptions: PartialDeep<GmOptionsData> = {
  controls: {
    edit: {
      union: {
        uiEnabled: true,
        active: false,
      },
      drag: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editDifferenceOptions: PartialDeep<GmOptionsData> = {
  controls: {
    edit: {
      difference: {
        uiEnabled: true,
        active: false,
      },
      drag: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editLineSimplificationOptions: PartialDeep<GmOptionsData> = {
  controls: {
    edit: {
      line_simplification: {
        uiEnabled: true,
        active: false,
      },
      drag: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editLassoOptions: PartialDeep<GmOptionsData> = {
  controls: {
    edit: {
      lasso: {
        uiEnabled: true,
        active: false,
      },
      drag: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const editDeleteOptions: PartialDeep<GmOptionsData> = {
  controls: {
    edit: {
      delete: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const helperSnappingOptions: PartialDeep<GmOptionsData> = {
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
      snapping: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const helperSnapGuidesOptions: PartialDeep<GmOptionsData> = {
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
        active: false,
      },
      snapping: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const helperMeasurementsOptions: PartialDeep<GmOptionsData> = {
  controls: {
    draw: {
      marker: {
        uiEnabled: true,
        active: false,
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
        active: false,
      },
    },
  },
};

export const helperPinOptions: PartialDeep<GmOptionsData> = {
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
        active: false,
      },
      snapping: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const helperAutoTraceOptions: PartialDeep<GmOptionsData> = {
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
        active: false,
      },
      snapping: {
        uiEnabled: true,
        active: false,
      },
    },
  },
};

export const helperZoomToFeaturesOptions: PartialDeep<GmOptionsData> = {
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
