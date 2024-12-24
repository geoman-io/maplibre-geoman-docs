---
title: "Importing Geojson"
---

# Importing existing Geojson data

Often you will want to import existing Geojson data into your map. This can be done with the `gm.features.addGeoJsonFeature` method. This method accepts a Geojson object and adds it to the map. Currently the method only accepts a single Geojson feature, and not a FeatureCollection. This will be added going forward.


## Example usage
In this case we have hardcoded a Geojson feature in the `demoFeatures` array. This could be fetched from an API or a file or a database.

```js
export const demoFeatures: Array<GeoJsonImportFeature> = [
  {
    type: 'Feature',
    properties: {
      shape: 'polygon',
    },
    geometry: {
      type: 'MultiPolygon',
      coordinates: [
        [
          [
            [
              -8.151855468751137,
              49.446665467090696,
            ],
            // ...
          ]
        ]
      ]
    }
  }
  // ... more features
]
```

The `gm.features.addGeoJsonFeature` method is then called for each feature in the array.


```js
    demoFeatures.forEach((shapeGeoJson) => {
      gm.features.addGeoJsonFeature({ shapeGeoJson });
    });
```

### Adding a Geojson FeatureCollection

If your data was formatted as a FeatureCollection, you need to extract the individual features and call `addGeoJsonFeature` on each feature:

```js
const fc = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        shape: 'polygon',
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [
                -8.151855468751137,
                49.446665467090696,
              ],
              // ...
            ]
          ]
        ]
      }
    },
    // ... more features
  ]
}

// Add each feature from the collection
fc.features.forEach((shapeGeoJson) => {
  gm.features.addGeoJsonFeature({ shapeGeoJson });
});
```

```js

```
## Full Demo example

We have put together a list of examples from the Maplibre-Geoman Examples Repository that showcase how to import Geojson data into the map. All the examples import features from a fixtures file and add them to the map using the `gm.features.addGeoJsonFeature` method.

See the [Examples](/examples) page for more information.

## API Reference

```ts
interface GeoJsonImportFeature {
  type: 'Feature';
  properties: {
    shape: string;
    [key: string]: any;
  };
  geometry: {
    type: string;
    coordinates: any[];
  };
}
```
