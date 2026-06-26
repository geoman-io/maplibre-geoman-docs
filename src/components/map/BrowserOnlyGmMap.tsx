import BrowserOnly from '@docusaurus/BrowserOnly';
import type { GeoJsonImportFeature, GmOptionsPartial } from '@geoman-io/maplibre-geoman-pro';
import GmMap from '@site/src/components/map/GmMap';
import React from 'react';


interface ComponentProps {
  gmOptions?: GmOptionsPartial;
  features?: Array<GeoJsonImportFeature>;
  // Render the Mapbox GL pane alongside the MapLibre pane. Defaults to true so
  // every mode demo shows the same Geoman behaviour on both renderers.
  mapbox?: boolean;
}

const paneStyle: React.CSSProperties = {
  flex: '1 1 320px',
  minWidth: 0,
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  fontWeight: 600,
  marginBottom: '0.35rem',
  opacity: 0.75,
};

const Component: React.FC<ComponentProps> = ({
  gmOptions: gmOptionsOverride,
  features,
  mapbox = true,
}) => {
  return (
    <BrowserOnly>
      {() => {
        // Loaded lazily inside BrowserOnly so Mapbox GL (which touches `window`
        // on import) never runs during server-side rendering.
        const GmMapboxMap = require('@site/src/components/map/GmMapboxMap').default;
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={paneStyle}>
              <div style={labelStyle}>MapLibre GL</div>
              <GmMap features={features} gmOptions={gmOptionsOverride} />
            </div>
            {mapbox && (
              <div style={paneStyle}>
                <div style={labelStyle}>Mapbox GL</div>
                <GmMapboxMap features={features} gmOptions={gmOptionsOverride} />
              </div>
            )}
          </div>
        );
      }}
    </BrowserOnly>
  );
};

export default Component;
