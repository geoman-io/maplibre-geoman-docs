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
  options?: {
    idPropertyName?: string;  // Use a specific property as the feature ID
    overwrite?: boolean;      // When true, replace existing features with matching IDs
  }
): {
  stats: {
    total: number;
    success: number;
    failed: number;
    overwritten: number;  // Count of replaced features (when overwrite: true)
  };
  addedFeatures: Array<FeatureData>;
};
```

When `overwrite: true` is set, existing features with matching IDs are deleted before importing the new features.

#### `importGeoJsonFeature`
Imports a single GeoJSON feature.
```typescript
features.importGeoJsonFeature(shapeGeoJson: GeoJsonImportFeature): FeatureData | null;
```

#### `exportGeoJson`
Exports all features as a GeoJSON FeatureCollection from Geoman's internal state. This provides the latest feature data, even during event handlers before MapLibre has committed changes.
```typescript
features.exportGeoJson(options?: {
  allowedShapes?: Array<FeatureShape>;  // Filter by shape types
  idPropertyName?: string;               // Custom property name for IDs
}): GeoJsonShapeFeatureCollection;
```

#### `exportGeoJsonFromSource`
Exports all features as a GeoJSON FeatureCollection directly from MapLibre's source. This may lag slightly behind Geoman's internal state during rapid updates or in event handlers.
```typescript
features.exportGeoJsonFromSource(options?: {
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

## FeatureData Instance Methods

Once you have a `FeatureData` instance (from importing, creating, or querying features), you can call the following methods directly on the feature instance.

### `updateProperties`
Updates custom properties on this feature. Properties are merged with existing ones. Set a property value to `undefined` to delete it. Internal Geoman properties (prefixed with `gm_`) are protected and cannot be modified through this method.
```typescript
feature.updateProperties(properties: Record<string, unknown>): void;
```

**Example:**
```typescript
// Get a feature
const feature = gm.features.get('gm_main', featureId);

// Update properties (merged with existing)
feature.updateProperties({
  name: 'Updated Name',
  description: 'New description',
  oldProperty: undefined  // This deletes the property
});
```

### `setProperties`
Replaces all custom properties on this feature. Removes existing custom properties and replaces them with the provided ones. Internal Geoman properties (prefixed with `gm_`) are preserved and cannot be removed.
```typescript
feature.setProperties(properties: Record<string, unknown>): void;
```

**Example:**
```typescript
// Get a feature
const feature = gm.features.get('gm_main', featureId);

// Replace all custom properties
feature.setProperties({
  name: 'New Name',
  category: 'residential'
});
// Previous custom properties are removed, only 'name' and 'category' remain
```

### `updateGeometry`
Updates the geometry of this feature with new coordinates.
```typescript
feature.updateGeometry(geometry: BasicGeometry): void;
```

**Example:**
```typescript
// Get a feature
const feature = gm.features.get('gm_main', featureId);

// Update the geometry
feature.updateGeometry({
  type: 'Polygon',
  coordinates: [
    [
      [-8.15, 49.44],
      [-8.10, 49.44],
      [-8.10, 49.40],
      [-8.15, 49.40],
      [-8.15, 49.44]
    ]
  ]
});
```

### `delete`
Removes this feature and its associated markers from the map.
```typescript
feature.delete(): void;
```

### `convertToPolygon`
Converts circle, ellipse, or rectangle shapes to standard polygon form by removing shape-specific properties. Returns `true` if conversion was successful.
```typescript
feature.convertToPolygon(): boolean;
```

### `changeSource`
Moves this feature to a different source.
```typescript
feature.changeSource({
  sourceName: FeatureSourceName;
  atomic: boolean;
}): void;
```

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

  // Instance methods
  updateProperties(properties: Record<string, unknown>): void;
  setProperties(properties: Record<string, unknown>): void;
  updateGeometry(geometry: BasicGeometry): void;
  delete(): void;
  convertToPolygon(): boolean;
  changeSource(options: { sourceName: FeatureSourceName; atomic: boolean }): void;
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

// Import with overwrite option (replaces existing features with matching IDs)
const resultWithOverwrite = gm.features.importGeoJson(geoJson, { overwrite: true });
console.log(`Overwritten: ${resultWithOverwrite.stats.overwritten} features`);

// Iterate over features
gm.features.forEach((feature) => {
  console.log(feature.id, feature.shape);
});

// Export features from Geoman's internal state
const exported = gm.features.exportGeoJson();

// Export features directly from MapLibre's source
const exportedFromSource = gm.features.exportGeoJsonFromSource();

// Get features in bounds
const bounds: [ScreenPoint, ScreenPoint] = [[0, 0], [100, 100]];
const featuresInBounds = gm.features.getFeaturesByScreenBounds({
  bounds,
  sourceNames: ['gm_main']
});

// Working with individual feature instances
const feature = gm.features.get('gm_main', 'feature-id');
if (feature) {
  // Update properties (merges with existing)
  feature.updateProperties({
    name: 'Updated Feature',
    status: 'active'
  });

  // Replace all properties
  feature.setProperties({
    name: 'New Name Only'
  });

  // Update geometry
  feature.updateGeometry({
    type: 'Point',
    coordinates: [10, 20]
  });

  // Delete the feature
  // feature.delete();
}
```