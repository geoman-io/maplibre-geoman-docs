import React from 'react';
import GmMap from '@site/src/components/map/GmMap';
import BrowserOnly from '@docusaurus/BrowserOnly';
import type { PartialDeep } from 'type-fest';
import defaultOptions from '@site/src/components/map/default-options';
import type { GeoJsonShapeFeature, ImportGeoJsonProperties } from '@geoman-io/maplibre-geoman-pro';


interface ComponentProps {
  gmOptions?: PartialDeep<typeof defaultOptions>;
  features?: Array<GeoJsonShapeFeature<ImportGeoJsonProperties>>;
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
