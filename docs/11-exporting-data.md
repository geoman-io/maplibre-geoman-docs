# Exporting GeoJSON

Geoman provides several methods to export features as GeoJSON. You can export all features, features from specific sources, or filtered features based on shape types.

## Basic Export Methods

### Export All Features

The simplest way to export all features is using `exportGeoJson()`:

```typescript
const allFeatures = gm.features.exportGeoJson();
```

This returns a GeoJSON FeatureCollection containing all features from all sources.

## Exported GeoJSON Structure

The exported GeoJSON follows this structure:

```typescript
interface GeoJsonShapeFeatureCollection {
  type: 'FeatureCollection';
  features: Array<{
    type: 'Feature';
    geometry: {
      type: string;
      coordinates: any[];
    };
    properties: {
      shape: FeatureShape;
      _gmid?: FeatureId;
      center?: LngLat;
      text?: string;
    };
  }>;
}
```

## Complete Example

Here's a complete example showing different export methods:

```typescript
const gm = new Geoman(map);

// Draw some features...

// Export all features
const allFeatures = gm.features.exportGeoJson();
console.log('All features:', allFeatures);

// Save to file
function downloadGeoJson(geojson: GeoJsonShapeFeatureCollection, filename: string) {
  const blob = new Blob([JSON.stringify(geojson)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Download different exports
downloadGeoJson(allFeatures, 'all-features.geojson');
```
