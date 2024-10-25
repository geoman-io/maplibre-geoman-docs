---
title: "Events"
---

# Event Listening

Event listening works the same way as in Maplibre. You can listen to all events fired by Geoman.

```typescript
// example of listening to the create event
map.on('gm:create', (event: GMEvent) => {
  log.debug('Event', event);
});
```

To debug all events, you can use the following code. This will display all Geoman events in the browser console.

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
