# Feature IDs in Geoman

Geoman uses feature IDs to track and manage features on the map. Understanding how these IDs work is important for importing, exporting, and managing features.

## ID Handling on Import

When importing GeoJSON features into Geoman, there are two ways IDs can be assigned:

1. Using existing IDs from the GeoJSON
2. Auto-generating new IDs if none exist

### Using Existing IDs

If your GeoJSON feature has an `id` field, Geoman will use this as the feature's ID:

```typescript
// GeoJSON with custom ID
const feature = {
  type: 'Feature',
  id: 'custom-123', // This ID will be used by Geoman
  properties: {
    shape: 'polygon'
  },
  geometry: {
    type: 'Polygon',
    coordinates: [/* ... */]
  }
};

// Import the feature
gm.features.importGeoJsonFeature({ shapeGeoJson: feature });
```

### Auto-generated IDs

If no `id` field is present, Geoman will automatically generate a new ID:

```typescript
// GeoJSON without ID
const feature = {
  type: 'Feature',
  properties: {
    shape: 'polygon'
  },
  geometry: {
    type: 'Polygon',
    coordinates: [/* ... */]
  }
};

// Import the feature - ID will be auto-generated
gm.features.importGeoJsonFeature({ shapeGeoJson: feature });
```

## The `_gmid` Property

When exporting features from Geoman, each feature will have a `_gmid` property in its properties object. This is Geoman's internal identifier for the feature.

### Export Example

```typescript
// Export features
const exported = gm.features.exportGeoJson();

// Example exported feature structure
{
  type: 'Feature',
  id: 'custom-123', // Original ID if it existed
  properties: {
    shape: 'polygon',
    _gmid: 'custom-123', // Same as id or auto-generated if no id existed
    // ... other properties
  },
  geometry: {
    type: 'Polygon',
    coordinates: [/* ... */]
  }
}
```

### Reimporting Exported Features

When reimporting features that were previously exported from Geoman, the `_gmid` property will be used to maintain feature identity:

```typescript
// Export features
const exported = gm.features.exportGeoJson();

// Later, reimport the same features
exported.features.forEach(feature => {
  gm.features.importGeoJsonFeature({ shapeGeoJson: feature });
  // The _gmid will be preserved, maintaining feature identity
});
```

## ID Generation

If you don't provide an ID, Geoman generates one using an internal counter:

```typescript
// Example of auto-generated IDs
const feature1 = {
  type: 'Feature',
  properties: { shape: 'polygon' },
  geometry: { /* ... */ }
};

const feature2 = {
  type: 'Feature',
  properties: { shape: 'line' },
  geometry: { /* ... */ }
};

// Features will get sequential IDs
const imported1 = gm.features.importGeoJsonFeature({ shapeGeoJson: feature1 });
const imported2 = gm.features.importGeoJsonFeature({ shapeGeoJson: feature2 });

console.log(imported1.id); // e.g., "1"
console.log(imported2.id); // e.g., "2"
```

## ID Types

Geoman supports both string and number IDs:

```typescript
type FeatureId = string | number;
```

## Working with Feature IDs

### Checking if a Feature Exists

```typescript
const hasFeature = gm.features.has('gm_main', 'custom-123');
```

### Getting a Feature by ID

```typescript
const feature = gm.features.get('gm_main', 'custom-123');
```

### Features Store Access

The features store can be accessed through iteration methods:

```typescript
// Iterate over all features
gm.features.forEach((feature, id) => {
  console.log('Feature ID:', id);
  console.log('Feature:', feature);
});

// Filter features by criteria
const filterFn = (feature: FeatureData) => feature.shape === 'polygon';
const filteredIterator = gm.features.filteredForEach(filterFn);

filteredIterator((feature, id) => {
  console.log('Filtered Feature ID:', id);
  console.log('Filtered Feature:', feature);
});
```

## Best Practices

1. **Consistent ID Schema**: If providing custom IDs, use a consistent schema:
```typescript
const features = [
  {
    type: 'Feature',
    id: 'polygon-001',
    properties: { shape: 'polygon' },
    geometry: { /* ... */ }
  },
  {
    type: 'Feature',
    id: 'polygon-002',
    properties: { shape: 'polygon' },
    geometry: { /* ... */ }
  }
];
```

2. **ID Preservation**: When exporting and reimporting, preserve the `_gmid` property:
```typescript
// Export
const exported = gm.features.exportGeoJson();

// Save somewhere...

// Later, reimport
const reimported = loadSavedFeatures();
reimported.features.forEach(feature => {
  // _gmid in properties will be preserved
  gm.features.importGeoJsonFeature({ shapeGeoJson: feature });
});
```

3. **ID Uniqueness**: Ensure custom IDs are unique within your feature set:
```typescript
const usedIds = new Set();

features.forEach(feature => {
  if (usedIds.has(feature.id)) {
    throw new Error(`Duplicate ID: ${feature.id}`);
  }
  usedIds.add(feature.id);
  gm.features.importGeoJsonFeature({ shapeGeoJson: feature });
});
```

4. **ID Type Consistency**: Stick to either string or number IDs within your application:
```typescript
// Either use string IDs
const stringIdFeature = {
  type: 'Feature',
  id: 'feature-123',
  // ...
};

// Or number IDs
const numberIdFeature = {
  type: 'Feature',
  id: 123,
  // ...
};

// But don't mix them unless necessary
```

## Error Handling

When working with feature IDs, handle potential errors:

```typescript
try {
  // Attempt to get a feature
  const feature = gm.features.get('gm_main', 'custom-123');
  
  if (!feature) {
    console.warn('Feature not found:', 'custom-123');
    // Handle missing feature...
  } else {
    // Process feature...
  }
} catch (error) {
  console.error('Error accessing feature:', error);
  // Handle error...
}
```