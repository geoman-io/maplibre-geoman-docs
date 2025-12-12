import type {
  ControlOptions,
  DrawModeName,
  EditModeName,
  GmOptionsPartial,
  HelperModeName,
} from '@geoman-io/maplibre-geoman-pro';


const getDefaultControlOptions = (): Partial<ControlOptions> => {
  return {
    uiEnabled: false,
    active: false,
  };
};


export const getDisabledByDefaultOptions = (): GmOptionsPartial => {
  const drawModes: Array<DrawModeName> = [
    'marker',
    'circle',
    'circle_marker',
    'ellipse',
    'text_marker',
    'line',
    'rectangle',
    'polygon',
    'freehand',
    'custom_shape',
  ];

  const editModes: Array<EditModeName> = [
    'drag',
    'change',
    'rotate',
    'scale',
    'copy',
    'cut',
    'split',
    'union',
    'difference',
    'line_simplification',
    'lasso',
    'delete',
  ];

  const helperModes: Array<HelperModeName> = [
    'shape_markers',
    'pin',
    'snapping',
    'snap_guides',
    'measurements',
    'auto_trace',
    'geofencing',
    'zoom_to_features',
    'click_to_edit',
  ];

  return {
    settings: {
      controlsPosition: 'top-left',
    },
    controls: {
      draw: Object.fromEntries(drawModes.map((mode) => [mode, getDefaultControlOptions()])),
      edit: Object.fromEntries(editModes.map((mode) => [mode, getDefaultControlOptions()])),
      helper: Object.fromEntries(helperModes.map((mode) => [mode, getDefaultControlOptions()])),
    },
  };
};
