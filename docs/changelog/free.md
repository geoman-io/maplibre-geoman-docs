---
title: Leaflet-Geoman Free
---

## v2.17.0

* Updates esbuild to 8.56, prettier to 3.2.4 and fixes lint config (1444) and swap to esbuild by @mscno in https://github.com/geoman-io/leaflet-geoman/pull/1445
* Add translation of "rotateButton" in languages that lack translation of "rotateButton" by @xiyuvi in https://github.com/geoman-io/leaflet-geoman/pull/1442
* Add Kyrgyz language support by @Falke-Design in https://github.com/geoman-io/leaflet-geoman/pull/1448
* After disabling & enabling of button, don't call disable on the draw layer.  by @Falke-Design in https://github.com/geoman-io/leaflet-geoman/pull/1424
* fix global keyboard and window listeners are not removed after the map is destroyed by @plainheart in https://github.com/geoman-io/leaflet-geoman/pull/1434
* Improve esbuild bundle script to watch css changes and output sourcemaps by @mscno in https://github.com/geoman-io/leaflet-geoman/pull/1451
* Snap by priority to all shapes in a radius of 5px instead of to the nearest by @Falke-Design in https://github.com/geoman-io/leaflet-geoman/pull/1454
* Minor: Force rotateEnabled() to always return a boolean. by @strfx in https://github.com/geoman-io/leaflet-geoman/pull/1455
* Additional Custom Control Methods by @TurtIeSocks in https://github.com/geoman-io/leaflet-geoman/pull/1295
* Prevent drawing of rectangle where all corners have the same position by @Falke-Design in https://github.com/geoman-io/leaflet-geoman/pull/1470
* Update translations pt_br and add translations pt_pt by @leoneljdias in https://github.com/geoman-io/leaflet-geoman/pull/1466
* Add fallback to english for translations by @Falke-Design in https://github.com/geoman-io/leaflet-geoman/pull/1461
* Prevent opening popup on ignored layers while drawing by @Falke-Design in https://github.com/geoman-io/leaflet-geoman/pull/1471
* Add sourcemaps to dist (#1480) by @mscno in https://github.com/geoman-io/leaflet-geoman/pull/1483
* Remove CSS :focus of marker-icon style to fix jumping while zooming by @Falke-Design in https://github.com/geoman-io/leaflet-geoman/pull/1488
* Backport Pro changes into OSS by @Falke-Design in https://github.com/geoman-io/leaflet-geoman/pull/1490


## v2.16.0

### !! Breaking Changes !!

_This is only relevant for projects using very old versions of babel/webpack loaders_

This version introduces new build tools in the library build toolchain. More specifically we have swapped webpack for eslint. This has improved our build speeds and made the build pipeline simpler and easier to maintain going forward.
However the move to esbuild has also caused the library build assets (minified js files) to be compiled using a more modern version of ECMAScript. The current build files now use the [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) ?. syntax and this can cause issues with projects using older versions of webpack/babel or similar loaders.

If you face issues with upgrading to version v2.16.0 we suggest that you upgrade your own loaders and build toolchain to a version compatible with modern ECMAScript syntax.

### Minor Changes 

* Add Kyrgyz translation: #1448

### Patches 

* Update translation for rotation button title: #1442
* Fix handling of drawing modes after disabling a control button: #1424
* Unbind global listeners after the map is removed: #1434
* Sort snapping layers by priority in a radius of 5px: #1454
* Force rotateEnabled() to always return a boolean: #1455

### Chores

* Updates esbuild to 8.56, prettier to 3.2.4 and fixes lint config (1444) and swap to esbuild by @mscno in https://github.com/geoman-io/leaflet-geoman/pull/1445

### Credits 

Huge thanks to @Falke-Design, @xiyuvi, @strfx and @plainheart for helping!

### New Contributors
* @mscno made their first contribution in https://github.com/geoman-io/leaflet-geoman/pull/1445
* @xiyuvi made their first contribution in https://github.com/geoman-io/leaflet-geoman/pull/1442
* @plainheart made their first contribution in https://github.com/geoman-io/leaflet-geoman/pull/1434

**Full Changelog**: https://github.com/geoman-io/leaflet-geoman/compare/2.15.0...2.16.0



## v2.15.0: Custom Rotation, More Events & Fixes

### Minor Changes 

- Allow custom rotation point via `setRotationCenter`: #1362
- Add `pm:intersect` event to Draw mode and refactor old intersection code: #1368
- Add onVertexClick to Rectangle, Circle and CircleMarker: #1367

### Patches 

- Auto Prettier on commit: #1413
- Fix Norwegian translation typos (lower case): #1322
- Update docs: #1360
- Update persian translation: #1387
- Update polish translation: #1365
- Remove autofocus from Text Layers: #1409
- Replace hard-coded Earth radius with `L.CRS.Earth.R`: #1406
- Draw.Rectangle now correctly returns corners of rotated rectangle: #1373
- Leaflet-Geoman now consistently uses crosshair as the cursor while drawing: #1410
- [Refactor] Extends Circle from CircleMarker: #1309
- Auto detect initial angle of Rectangle: #1370
- Update GlobalModes for Removal and Rotate + some little fixes: #1418
- Chore(docs): update docs website: 144c0c89a55a93f011d7b90170c7dee748de8189
- Chore(deps): Bump minimist from 1.2.5 to 1.2.8: #1325
- Chore(deps-dev): Bump webpack from 5.36.2 to 5.76.0: #1335
- Fix listen to layerremove instead of pm:remove to keep snapList updated: #1343
- Update lint config and lint all files: 62b6ee6377fc2ef6a7ec35903f53d27e65b3b949
- Chore(deps-dev): Bump postcss from 8.4.5 to 8.4.31: #1403
- Chore(deps-dev): Bump word-wrap from 1.2.3 to 1.2.4: #1381
- Use preferred tile.openstreetmap.org URL: #1393
- Fix disabling snapping with altKey: #1379
- Chore(deps): Bump tough-cookie and @cypress/request: #1414
- Chore(deps-dev): Bump @babel/traverse from 7.16.5 to 7.23.4: #1415
- Update node version: #1420

### Credits 

Huge thanks to @strfx, @Falke-Design, @andreasvatne, @cksadra, @artur1989, @0scvr, @AlimurtuzaCodes, @beig, and @Dimitar5555 for helping!

## v2.14.2

### Patches

- Fix map dragging after editing Text-Layer
- Fix multiple instances of Rotation
- Fix TypeScript translation


## v2.14.1: More events and helper functions + fixes

### Minor Changes

- 🇫🇮 Add Finnish translations
- 🇰🇷 Add Korean translation
- Add more text-layer events
- Add `setInitAngle` option for rectangles
- Add `setStyle` to Draw class to update style of currently drawn shape

### Patches

- Change `rotateEnabled` return type from `void` to `boolean`
- Optimize performance and prevent a Leaflet bug
- Fix rotation of newly added layer
- `getGeomanLayers()` now properly returns the scale help-layer
- Draw start now always puts first marker at the center of the map
- Update README with Pro options & title of test
- Chore(npm): add engines and nvmrc for easier node version handling

## v2.14.0: Various Fixes

### Minor Changes 

- 🇫🇮 Add Finnish translations: #1262
- 🇰🇷 Add Korean translation: #1268
- Add more text-layer events: #1265
- Add `setInitAngle` option for rectangles: #1260
- Add `setStyle` to Draw class to update style of currently drawn shape: #1290

### Patches 

- Change rotateEnabled return type void to boolean  (#1264): #1263
- Optimize performance and prevent Leaflet bug: #1277
- Fix rotation of new added layer: #1270
- Remove .only from tests: b7effdc37ea25792f54860fece6dd4b2ff6061da
- Doesn&#39;t return the rotation help-layer over getGeomanLayers(): #1287
- Draw start now always puts first marker at the center of the map: #1261
- Update Readme with Pro options &amp; title of test: #1291
- Chore(npm): add engines and nvmrc for easier node version handling: 7fcd102cc6250462e737a6b25a11f2f25a4f0099
- Move fixes from Pro code into OSS: #1280

### Credits 

Huge thanks to @masysma, @sundo-dylan, and @Falke-Design for helping!


## v2.13.1: Japanese, Leaflet 1.9.2 and more fixes

### Patches 

- Upgrade to Leaflet 1.9.2: #1239
- Fix auto-focus on text-layer: #1244
- Fix vertex remove of Multipolygon: #1243
- Change css to set .active style to direct children only: #1241
- Add version to TypeScript definition: #1238
- Fix opt-in for text-layer and add the text to its options: #1240
- Fix snapping when finishing draw on a segment of another layer: #1236
- TS Type Return Improvements: #1215
- Optimize isEmptyDeep for 300x performance improvement when dragging vertexes: #1230
- Avoid empty clientX and clientY values when dragging marker in mobile…: #1208
- Added Japanese translation: #1225
- Update Afghanistan translation: #1237
- Update Spanish translation: #1212
- Chore(deps): Bump terser from 5.10.0 to 5.15.1: #1249
- Chore(deps): Bump loader-utils from 1.4.0 to 1.4.1: #1254
- Chore(deps): Bump ansi-regex from 3.0.0 to 5.0.1: #1250
- Chore(deps): Bump minimatch from 3.0.4 to 3.1.2: #1255
- Chore(deps): Bump moment from 2.29.1 to 2.29.4: #1198

### Credits 

Huge thanks to @SuperPat45, @ByMykel, @Falke-Design, @TurtIeSocks, @drzhbe, @wvddrss, @na3shkw, and @cksadra for helping!


## v2.13.0: Add Text Layer Support & Fixes

### Minor Changes 

- Add Text Layer: #1120
![textlayer](https://geoman-static.onrender.com/assets/text-layer.gif)


### Patches 

- Fix TS GlobalOptions: #1168
- Fix ALT + TAB / blur in Chrome: #1167
- Fix returning renderer for preferCanvas: #1166
- Enable disabled button incl. functions: #1165
- Fix: Update TS so that there is no error when compiling: #1155
- Set title on the buttonContainer instead of the icon: #1171
- Fixed error when call function disable/enable control button before initializing the control: #1143

### Credits 

Huge thanks to @Falke-Design, @jtsamper, and @vvlladd28 for helping!

## v2.12.0: Add New Events & Support Leaflet 1.8

### Minor Changes 

- Add new events `pm:dragenable`, `pm:dragdisable`, `pm:change`: #1112
- Update to Leaflet v1.8.0: #1140

### Patches 

- Improvement disable control button when change state we do not redraw panel: #1094
- Chore(deps): Bump moment from 2.29.1 to 2.29.2: #1135
- Remove engine: #1084
- Fix(canvas): properly detect canvas renderer when added manually: #1076
- Chore(deps): Bump nanoid from 3.1.30 to 3.2.0: #1085
- Fix(toolbar): Fixed redirect to another web page when clicking in the disabled control button: #1090
- Fix(editing): Fix isRelevant check for Drag and Edit Mode: #1107
- Fix(altitude): Keep altitude on latlng while dragging: #1108
- Fix(TypeScript): allow custom buttons in addControls: #1109
- Fix(cursorMarker): Fix visibility of cursorMarker: #1110
- Chore(deps): Bump minimist from 1.2.5 to 1.2.6: #1132
- Fix Marker &amp; Polyline TS: #1133

### Credits 

Huge thanks to @Falke-Design and @vvlladd28 for helping!