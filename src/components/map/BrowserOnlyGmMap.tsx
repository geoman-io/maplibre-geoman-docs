import BrowserOnly from '@docusaurus/BrowserOnly';
import type { GeoJsonImportFeature, GmOptionsPartial } from '@geoman-io/maplibre-geoman-pro';
import GmMap from '@site/src/components/map/GmMap';
import React from 'react';


interface ComponentProps {
  gmOptions?: GmOptionsPartial;
  features?: Array<GeoJsonImportFeature>;
}

const Component: React.FC<ComponentProps> = ({
  gmOptions: gmOptionsOverride,
  features,
}) => {
  return (
    <BrowserOnly>
      {() => <GmMap features={features} gmOptions={gmOptionsOverride} />}
    </BrowserOnly>
  );
};

export default Component;
