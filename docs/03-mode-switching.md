---
title: "Modes handing"
---

# Modes handing

All available modes can be enabled/disabled/toggled by the following methods:

For example to handle `edit:drag` mode:
```typescript
// enable mode
map.gm.options.enableMode('edit', 'drag');

// disable mode
map.gm.options.disableMode('edit', 'drag');

// toggle mode
map.gm.options.toggleMode('edit', 'drag');

// check mode state
map.gm.options.isModeEnabled('edit', 'drag');
```

Typescript support is available so you can see available options for each method in the Geoman.
