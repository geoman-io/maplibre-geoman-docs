import React, { useEffect, useRef } from 'react';
import mapLibreStyle from '@site/src/components/map/map-libre-style';
import ml, { type MapOptions } from 'maplibre-gl';
import {
  type GeoJsonShapeFeature,
  Geoman,
  type GmOptionsData,
  type ImportGeoJsonProperties,
} from '@geoman-io/maplibre-geoman-pro';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@geoman-io/maplibre-geoman-pro/dist/maplibre-geoman.css';
import defaultOptions from '@site/src/components/map/default-options';
import { cloneDeep, merge } from 'lodash-es';
import type { PartialDeep } from 'type-fest';

interface ComponentProps {
  gmOptions?: PartialDeep<GmOptionsData>;
  features?: Array<GeoJsonShapeFeature<ImportGeoJsonProperties>>;
}


const Component: React.FC<ComponentProps> = ({
  gmOptions: gmOptionsOverride,
  features,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<ml.Map & { gm: Geoman } | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const mapOptions: MapOptions = {
        container: mapContainerRef.current,
        style: mapLibreStyle,
        center: [0, 51],
        zoom: 6,
        fadeDuration: 50,
      };

      const map = new ml.Map(mapOptions) as ml.Map & { gm: Geoman };

      const gmOptions = cloneDeep(defaultOptions);
      merge(gmOptions, gmOptionsOverride);

      const geoman = new Geoman(map, gmOptions);
      map.on(`${gmOptions.settings?.eventPrefix || 'gm'}:loaded`, () => {
        features?.forEach((feature) => {
          geoman.features.addGeoJsonFeature({ shapeGeoJson: feature });
        });
      });

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div id="dev-map"
         ref={mapContainerRef}
         style={{ height: '400px', width: '100%' }} />);
};

export default Component;
