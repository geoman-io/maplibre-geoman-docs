---
title: "Modes Handling"
---

# Mode Handling

All available modes can be enabled, disabled, or toggled using the following methods:

For example, to handle the `edit:drag` mode:
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

TypeScript support is available, so you can see all available options for each method in Geoman.

See also the [Geoman Instance API](/geoman-instance-api) page for more information on the available methods.