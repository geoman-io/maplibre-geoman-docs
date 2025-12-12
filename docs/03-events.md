# Geoman Events

Geoman provides a rich event system that allows you to listen to various interactions with the map. Events can be listened to either individually or globally.

## Event Listening Methods

### Individual Event Listening

You can listen to specific events using the map's `on` method:

```typescript
map.on('gm:create', (event) => {
  console.log('Feature created:', event);
});
```

### Global Event Listening

To listen to all Geoman events, use the global events listener:

```typescript
import type { GlobalEventsListenerParameters } from '@geoman-io/maplibre-geoman-free'; // or '@geoman-io/maplibre-geoman-pro'

geoman.setGlobalEventsListener((event: GmSystemEvent | GmEvent) => {
  console.log('Event:', event);
});

// Remove the global listener
geoman.setGlobalEventsListener(null);
```

## Event Categories

### Mode Toggle Events

These events fire when different modes are toggled on/off:

```typescript
// Drawing mode
map.on('gm:globaldrawmodetoggled', (event) => {
  console.log('Draw mode toggled:', event.enabled);
});

// Edit mode
map.on('gm:globaleditmodetoggled', (event) => {
  console.log('Edit mode toggled:', event.enabled);
});

// Remove mode
map.on('gm:globalremovemodetoggled', (event) => {
  console.log('Remove mode toggled:', event.enabled);
});

// Rotate mode
map.on('gm:globalrotatemodetoggled', (event) => {
  console.log('Rotate mode toggled:', event.enabled);
});

// Drag mode
map.on('gm:globaldragmodetoggled', (event) => {
  console.log('Drag mode toggled:', event.enabled);
});

// Cut mode
map.on('gm:globalcutmodetoggled', (event) => {
  console.log('Cut mode toggled:', event.enabled);
});

// Snapping mode
map.on('gm:globalsnappingmodetoggled', (event) => {
  console.log('Snapping mode toggled:', event.enabled);
});
```

### Drawing Events

Events related to drawing features:

```typescript
// Listen to all draw events
map.on('_gm:draw', (event: GmDrawEvent) => {
  console.log('Draw event:', event);
});

// Feature creation
map.on('gm:create', (event: FeatureCreatedFwdEvent) => {
  console.log('Feature created:', event);
});
```

### Edit Events

Events related to editing features:

```typescript
// Listen to all edit events
map.on('_gm:edit', (event: GmEditEvent) => {
  console.log('Edit event:', event);
});

// Edit start
map.on('gm:editstart', (event: FeatureEditStartFwdEvent) => {
  console.log('Edit started:', event);
});

// Edit end
map.on('gm:editend', (event: FeatureEditEndFwdEvent) => {
  console.log('Edit ended:', event);
});
```

### Remove Events

Events for feature removal:

```typescript
map.on('gm:remove', (event: FeatureRemovedFwdEvent) => {
  console.log('Feature removed:', event);
});
```

### Rotate Events

Events for rotating features:

```typescript
// Listen to all rotate events
map.on('gm:rotate', (event: FeatureUpdatedFwdEvent) => {
  console.log('Rotate event:', event);
});

// Rotation start
map.on('gm:rotatestart', (event: FeatureEditStartFwdEvent) => {
  console.log('Rotation started:', event);
});

// Rotation end
map.on('gm:rotateend', (event: FeatureEditEndFwdEvent) => {
  console.log('Rotation ended:', event);
});
```

### Drag Events

Events for dragging features:

```typescript
// Listen to all drag events
map.on('gm:drag', (event: FeatureUpdatedFwdEvent) => {
  console.log('Drag event:', event);
});

// Drag start
map.on('gm:dragstart', (event: FeatureEditStartFwdEvent) => {
  console.log('Drag started:', event);
});

// Drag end
map.on('gm:dragend', (event: FeatureEditEndFwdEvent) => {
  console.log('Drag ended:', event);
});
```

### Cut Events

Events for cutting features:

```typescript
map.on('gm:cut', (event: FeatureUpdatedFwdEvent) => {
  console.log('Feature cut:', event);
});
```

### Helper Events

Events related to helper functionality:

```typescript
map.on('_gm:helper', (event: GmHelperEvent) => {
  console.log('Helper event:', event);
});
```

### Control Events

Events related to control interactions:

```typescript
map.on('_gm:control', (event: GmControlEvent) => {
  console.log('Control event:', event);
});
```

## Complete Example

Here's a complete example showing how to set up event listeners:

```typescript
import { Geoman, type GmOptionsPartial } from '@geoman-io/maplibre-geoman-free';
import type { GlobalEventsListenerParameters } from '@geoman-io/maplibre-geoman-free';

// Initialize map and Geoman
const map = new maplibregl.Map({
  container: 'map',
  style: 'your-style-url'
});

const options: GmOptionsPartial = {
  // configuration options
  // see Configuring Geoman section for more details
};

const gm = new Geoman(map,options);

// Wait for Geoman to load
map.once('gm:loaded', () => {
  console.log('Geoman loaded');
  
  // Set up event listeners
  
  // Mode events
  map.on('gm:globaldrawmodetoggled', handleEvent);
  map.on('gm:globaleditmodetoggled', handleEvent);
  map.on('gm:globalremovemodetoggled', handleEvent);
  map.on('gm:globalrotatemodetoggled', handleEvent);
  map.on('gm:globaldragmodetoggled', handleEvent);
  map.on('gm:globalcutmodetoggled', handleEvent);
  map.on('gm:globalsnappingmodetoggled', handleEvent);

  // Drawing events
  map.on('gm:create', handleEvent);

  // Edit events
  map.on('gm:editstart', handleEvent);
  map.on('gm:editend', handleEvent);

  // Remove events
  map.on('gm:remove', handleEvent);

  // Rotate events
  map.on('gm:rotatestart', handleEvent);
  map.on('gm:rotateend', handleEvent);

  // Drag events
  map.on('gm:dragstart', handleEvent);
  map.on('gm:dragend', handleEvent);

  // Cut events
  map.on('gm:cut', handleEvent);

  // Helper and control events
  map.on('_gm:helper', handleEvent);
  map.on('_gm:control', handleEvent);
});

// Store events history
const gmEvents: Array<any> = [];

// Helper function to safely extract GeoJSON from feature data
const getGeoJson = (featureData: any) => {
  try {
    return JSON.stringify(featureData.getGeoJson(), null, 2);
  } catch (e) {
    return 'Can\'t retrieve GeoJSON';
  }
};

// Comprehensive event handler that extracts and stores relevant information
const handleEvent = (event: any) => {
  console.log('Event', event);

  // Extract and store important event data
  // Customize this to your needs
  gmEvents.push({
    // Feature ID if available
    id: event?.feature?.id ?? undefined,
    // Mode state for toggle events
    enabled: event?.enabled ?? undefined,
    // Timestamp for event tracking
    timestamp: new Date().toLocaleTimeString(),
    // Event type (create, edit, etc.)
    type: event?.type,
    // Shape type if available
    shape: event?.shape ?? undefined,
    // GeoJSON data if a feature is involved
    geojson: event?.feature ? getGeoJson(event.feature) : undefined,
  });
};

// Optional: Global event listener
gm.setGlobalEventsListener((event: GmSystemEvent | GmEvent) => {
  console.log('Event:', event);
});
```

## Event Handler Details

The event handler demonstrates how to extract and store useful information from Geoman events:

1. **Event History**: Events are stored in an array (`gmEvents`) for tracking and analysis
2. **Feature Information**:
   - `id`: Extracts the feature ID if present
   - `shape`: Captures the type of shape involved
   - `geojson`: Safely extracts the GeoJSON representation of features
3. **Event Metadata**:
   - `timestamp`: Adds a timestamp to each event
   - `type`: Records the event type
   - `enabled`: Tracks mode state for toggle events

The `getGeoJson` helper function safely extracts GeoJSON data from features:
- Uses try/catch to handle potential errors
- Formats the JSON for readability using `JSON.stringify` with spacing
- Returns a fallback message if extraction fails

Example event data stored using the above event handler:
```typescript
const event = {
  id: "feature-123",
  enabled: true,
  timestamp: "14:30:45",
  type: "gm:create",
  shape: "polygon",
  geojson: {
    "type": "Feature",
    "properties": {
      "shape": "polygon"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [/* ... */]
    }
  }
}
```


# Event Types

Here are some common event payload types:

```typescript
interface FeatureCreatedFwdEvent {
  name: 'gm:create';
  shape: DrawModeName;
  feature: FeatureData;
  map: AnyMapInstance;
}

interface FeatureUpdatedFwdEvent {
  name: `gm:${FwdEditModeName}`;
  map: AnyMapInstance;
  shape?: FeatureShape;
  feature?: FeatureData; // The feature being edited if a single feature is being edited (e.g., during edit mode)
  features?: Array<FeatureData>; // The features being edited if multiple features are involved (e.g., during cut mode/split mode)
  originalFeature?: FeatureData;
  originalFeatures?: Array<FeatureData>;
}

interface GlobalEditToggledFwdEvent {
  name: `gm:global${FwdEditModeName}modetoggled`;
  enabled: boolean;
  map: AnyMapInstance;
}
```

## Best Practices

1. **Event Handler Organization**: Keep event handlers organized by category
```typescript
const drawHandlers = {
  onCreate: (event) => { /* ... */ },
  onUpdate: (event) => { /* ... */ },
};

const editHandlers = {
  onEditStart: (event) => { /* ... */ },
  onEditEnd: (event) => { /* ... */ },
};
```

2. **Error Handling**: Always include error handling in event listeners
```typescript
map.on('gm:create', (event) => {
  try {
    // Process event
  } catch (error) {
    console.error('Error processing create event:', error);
  }
});
```

3. **Cleanup**: Remove event listeners when they're no longer needed
```typescript
const handler = (event) => { /* ... */ };
map.on('gm:create', handler);

// Later...
map.off('gm:create', handler);
```

4. **Performance**: Be mindful of performance in high-frequency events
```typescript
import { debounce } from 'lodash';

const debouncedHandler = debounce((event) => {
  // Process event...
}, 100);

map.on('gm:drag', debouncedHandler);
```
