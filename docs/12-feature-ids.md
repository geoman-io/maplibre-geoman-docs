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
gm.features.importGeoJsonFeature(feature);
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
gm.features.importGeoJsonFeature(feature);
```

### Using a Property as the Feature ID

You can specify a property name to use as the feature ID during import with the `idPropertyName` option:

```typescript
// GeoJSON with ID stored in properties
const featureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        shape: 'polygon',
        customId: 'my-custom-id-123',  // Use this as the feature ID
        name: 'My Polygon'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [/* ... */]
      }
    }
  ]
};

// Import using the 'customId' property as the feature ID
const result = gm.features.importGeoJson(featureCollection, {
  idPropertyName: 'customId'
});

// The feature will have ID 'my-custom-id-123'
const feature = gm.features.get('gm_main', 'my-custom-id-123');
```

This is useful when your GeoJSON data stores IDs in a property rather than the top-level `id` field.

## The `__gm_id` Property

When exporting features from Geoman, each feature will have a `__gm_id` property in its properties object. This is Geoman's internal identifier for the feature.

### Export Example

```typescript
// Export features
const exported = gm.features.exportGeoJson();

// Example exported feature structure
const feature = {
  type: 'Feature',
  id: 'custom-123', // Original ID if it existed
  properties: {
    shape: 'polygon',
    __gm_id: 'custom-123', // Same as id or auto-generated if no id existed
    // ... other properties
  },
  geometry: {
    type: 'Polygon',
    coordinates: [/* ... */]
  }
}
```

### Reimporting Exported Features

When reimporting features that were previously exported from Geoman, you can use the `overwrite` option to replace existing features with matching IDs:

```typescript
// Export features
const exported = gm.features.exportGeoJson();

// Later, reimport the same features with overwrite to replace existing ones
const result = gm.features.importGeoJson(exported, { overwrite: true });

// Check how many features were replaced
console.log(`Replaced ${result.stats.overwritten} existing features`);
```

Without the `overwrite` option, importing features with existing IDs will fail for those features.

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
const imported1 = gm.features.importGeoJsonFeature(feature1);
const imported2 = gm.features.importGeoJsonFeature(feature2);

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

2. **ID Preservation**: When exporting and reimporting, use the `overwrite` option to replace existing features:
```typescript
// Export
const exported = gm.features.exportGeoJson();

// Save somewhere...

// Later, reimport with overwrite to replace existing features
const reimported = loadSavedFeatures();
const result = gm.features.importGeoJson(reimported, { overwrite: true });
console.log(`Imported ${result.stats.success} features, replaced ${result.stats.overwritten}`);
```

3. **ID Uniqueness**: Ensure custom IDs are unique within your feature set:
```typescript
const usedIds = new Set();

features.forEach(feature => {
  if (usedIds.has(feature.id)) {
    throw new Error(`Duplicate ID: ${feature.id}`);
  }
  usedIds.add(feature.id);
  gm.features.importGeoJsonFeature(feature);
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
