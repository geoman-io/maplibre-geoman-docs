---
title: "Importing Geojson"
---

# Importing existing Geojson data

Often you will want to import existing Geojson data into your map. This can be done with the `gm.features.importGeoJsonFeature`. This method accepts a Geojson object and adds it to the map.

For FeatureCollections, you can use the `gm.features.importGeoJson` method. This will add all features in the collection to the Geoman instance and to the map.

## Example usage
In this case we have hardcoded a Geojson feature in the `export const demoFeature: Array<GeoJsonImportFeature> = [
` const. This could be fetched from an API or a file or a database.

```js
export const demoFeature: GeoJsonImportFeature =
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

```

The `gm.features.importGeoJsonFeature` method is then called to add the feature to the map:

```js
gm.features.importGeoJsonFeature(demoFeature);
```

### Adding a Geojson FeatureCollection

If your data was formatted as a FeatureCollection, you need either import the entire collection using `importGeoJson`, or you need to extract the individual features and call `importGeoJsonFeature` on each feature:

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

// Add each feature from the collection individually
fc.features.forEach((feature) => {
  gm.features.importGeoJsonFeature(feature);
});

// Or add the entire collection at once (recommended)
gm.features.importGeoJson(fc);
```

### Using the overwrite option

When importing GeoJSON features that may have IDs matching existing features, you can use the `overwrite` option to replace them:

```js
// Import with overwrite enabled - existing features with matching IDs will be replaced
const result = gm.features.importGeoJson(fc, { overwrite: true });

console.log(result.stats.overwritten); // Number of features that were replaced
```

When `overwrite: true` is set, existing features with matching IDs are deleted before importing the new features. The `stats.overwritten` count in the result tracks how many features were replaced.

### Using a custom ID property

You can specify which property to use as the feature ID during import:

```js
// Use the 'customId' property from feature.properties as the feature ID
const result = gm.features.importGeoJson(fc, { idPropertyName: 'customId' });
```

## Full Demo example

We have put together a list of examples from the Maplibre-Geoman Examples Repository that showcase how to import Geojson data into the map. All the examples import features from a fixtures file and add them to the map using the `gm.features.importGeoJsonFeature` method.

See the [Examples](/examples) page for more information.

## API Reference

### ImportGeoJsonOptions

```ts
interface ImportGeoJsonOptions {
  idPropertyName?: string;  // Use a specific property as the feature ID
  overwrite?: boolean;      // When true, replace existing features with matching IDs
}
```

### GeoJsonImportFeature

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

### Import Result

```ts
interface ImportGeoJsonResult {
  stats: {
    total: number;      // Total features processed
    success: number;    // Successfully imported features
    failed: number;     // Features that failed to import
    overwritten: number; // Features replaced (when overwrite: true)
  };
  addedFeatures: Array<FeatureData>; // The imported FeatureData instances
}
```
