# Geoman Features API

The Features API provides methods to manage and manipulate features (geometries) on the map. It is accessible through the `features` property on the Geoman instance.

```typescript
const options: GmOptionsPartial = {
  // configuration options
  // see Configuring Geoman section for more details
};

const gm = new Geoman(map,options);
const features = gm.features;
```

## Core Methods

### Iteration Methods

#### `forEach`
Iterates over all features in the main source.
```typescript
features.forEach((featureData: FeatureData, id: FeatureId, store: FeatureStore) => void);
```

### Feature Management

#### `add`
Adds a feature to the store.
```typescript
features.add(featureData: FeatureData): void;
```

#### `delete`
Removes a feature from the store.
```typescript
features.delete(featureData: FeatureData): void;
```

#### `has`
Checks if a feature exists in a specific source.
```typescript
features.has(sourceName: FeatureSourceName, featureId: FeatureId): boolean;
```

#### `get`
Retrieves a feature from a specific source by ID.
```typescript
features.get(sourceName: FeatureSourceName, featureId: FeatureId): FeatureData | null;
```

### GeoJSON Operations

#### `importGeoJson`
Imports GeoJSON data and creates features.
```typescript
features.importGeoJson(
  geoJson: GeoJsonImportFeatureCollection | GeoJsonImportFeature,
  idPropertyName?: string  // Optional: use a specific property as the feature ID
): {
  stats: {
    total: number;
    success: number;
    failed: number;
  };
  addedFeatures: Array<FeatureData>;
};
```

#### `importGeoJsonFeature`
Imports a single GeoJSON feature.
```typescript
features.importGeoJsonFeature(shapeGeoJson: GeoJsonImportFeature): FeatureData | null;
```

#### `exportGeoJson`
Exports all features as a GeoJSON FeatureCollection.
```typescript
features.exportGeoJson(options?: {
  allowedShapes?: Array<FeatureShape>;  // Filter by shape types
  idPropertyName?: string;               // Custom property name for IDs
}): GeoJsonShapeFeatureCollection;
```

#### `deleteAll`
Deletes all features from the store.
```typescript
features.deleteAll(): void;
```

#### `getAll`
Returns all features as a GeoJSON FeatureCollection (alias for exportGeoJson).
```typescript
features.getAll(): FeatureCollection;
```

#### `getSourceGeoJson`
Gets all features from a specific source as a GeoJSON FeatureCollection.
```typescript
features.getSourceGeoJson(sourceName: FeatureSourceName): GeoJsonShapeFeatureCollection;
```

#### `setSourceGeoJson`
Sets the features for a source from GeoJSON data.
```typescript
features.setSourceGeoJson({
  geoJson: GeoJSON;
  sourceName: FeatureSourceName;
}): void;
```

### Feature Creation and Management

#### `createFeature`
Creates a new feature from GeoJSON data.
```typescript
features.createFeature({
  featureId?: FeatureId;
  shapeGeoJson: GeoJsonShapeFeature;
  parent?: FeatureData;
  sourceName: FeatureSourceName;
  imported?: boolean;
}): FeatureData | null;
```

#### `addGeoJsonFeature`
Adds a single GeoJSON feature to the store.
```typescript
features.addGeoJsonFeature({
  shapeGeoJson: GeoJsonImportFeature;
  sourceName?: FeatureSourceName;
  defaultSource?: boolean;
}): FeatureData | null;
```

### Feature Queries

#### `getFeatureByMouseEvent`
Gets a feature at the mouse event location.
```typescript
features.getFeatureByMouseEvent({
  event: AnyEvent;
  sourceNames: Array<FeatureSourceName>;
}): FeatureData | null;
```

#### `getFeaturesByGeoJsonBounds`
Gets features that intersect with a GeoJSON geometry.
```typescript
features.getFeaturesByGeoJsonBounds({
  geoJson: Feature<Polygon | MultiPolygon | LineString>;
  sourceNames: Array<FeatureSourceName>;
}): Array<FeatureData>;
```

#### `getFeaturesByScreenBounds`
Gets features within screen coordinate bounds.
```typescript
features.getFeaturesByScreenBounds({
  bounds: [ScreenPoint, ScreenPoint];
  sourceNames: Array<FeatureSourceName>;
}): Array<FeatureData>;
```

### Source Management

#### `setDefaultSourceName`
Sets the default source for new features.
```typescript
features.setDefaultSourceName(sourceName: FeatureSourceName): void;
```

### Marker Feature Operations

#### `createMarkerFeature`
Creates a new marker feature.
```typescript
features.createMarkerFeature({
  type: MarkerData['type'];
  coordinate: LngLat;
  parentFeature: FeatureData;
  sourceName: FeatureSourceName;
}): FeatureData | null;
```

#### `updateMarkerFeaturePosition`
Updates a marker feature's position.
```typescript
features.updateMarkerFeaturePosition(
  markerFeatureData: FeatureData,
  coordinates: LngLat
): void;
```

## Source Names

Geoman has three built-in sources for features:
- `gm_main`: The main source for permanent features
- `gm_temporary`: For temporary features during editing/drawing
- `gm_standby`: For standby features (Pro version only)

## Types

### FeatureData
The main class representing a feature on the map.
```typescript
interface FeatureData {
  id: FeatureId;
  parent: FeatureData | null;
  shape: FeatureShape;
  markers: Map<MarkerId, MarkerData>;
  shapeProperties: FeatureShapeProperties;
  source: BaseSource;
  orders: FeatureOrders;
}
```

### FeatureSourceName
```typescript
type FeatureSourceName = 'gm_main' | 'gm_temporary' | 'gm_standby';
```

### Example Usage

```typescript
// Import GeoJSON data
const geoJson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0]
      },
      properties: {
        shape: 'marker'
      }
    }
  ]
};

// Import features
const result = gm.features.importGeoJson(geoJson);

// Iterate over features
gm.features.forEach((feature) => {
  console.log(feature.id, feature.shape);
});

// Export features
const exported = gm.features.exportGeoJson();

// Get features in bounds
const bounds: [ScreenPoint, ScreenPoint] = [[0, 0], [100, 100]];
const featuresInBounds = gm.features.getFeaturesByScreenBounds({
  bounds,
  sourceNames: ['gm_main']
});
```