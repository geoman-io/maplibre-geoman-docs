---
title: "Events"
---

# Events listening

Events listening is avaiable the same way as for Maplibre. You can listen to all events that are fired by Geoman. 
```typescript
// example of listening to the create event
map.on('gm:create', (event: GMEvent) => {
  log.debug('Event', event);
});
```

To debug all events you can use the following code. This way you can see all events that are fired by Geoman in the browser console.
```typescript
import { type GlobalEventsListenerParemeters } from '@geoman-io/maplibre-geoman-pro';

map.gm.setGlobalEventsListener((event: GlobalEventsListenerParemeters) => {
  if (event.type === 'converted') {
    console.log('Regular event', event);
  } else if (event.type === 'system') {
    console.log('System event', event);
  }
});

```
