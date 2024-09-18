---
sidebar_position: 2
title: "Toolbar"
---
### Leaflet-Geoman Toolbar

<img align="right" style={{paddingLeft: "10px", marginLeft: "20px", height: "300px"}} src="https://geoman-static.onrender.com/assets/toolbar.png" alt="Leaflet-Geoman Toolbar"/>
  
You can add a toolbar to the map to use Leaflet-Geoman features via a user interface.  
<div style={{paddingRight: "10px", marginRight: "20px", height: "300px"}}>
```js
// add Leaflet-Geoman controls with some options to the map  
map.pm.addControls({  
  position: 'topleft',  
  drawCircleMarker: false,
  rotateMode: false,
}); 
```
</div>
The following methods are available on `map.pm`:  
  
| Method                        | Returns   | Description                                                                                                   |  
| :---------------------------- | :-------- | :------------------------------------------------------------------------------------------------------------ |  
| addControls(`options`)        | -         | Adds the Toolbar to the map. The `options` are optional. Buttons can be removed with setting them to `false`. |  
| removeControls()              | -         | Removes the Toolbar from the map.                                                                             |  
| toggleControls()              | -         | Toggle the visiblity of the Toolbar.                                                                          |  
| controlsVisible()             | `Boolean` | Returns `true` if the Toolbar is visible on the map.                                                          |
  
  
See the available options in the table below.  
  
| Option             | Default     | Description                                                                                      |  
| :----------------- | :---------- | :----------------------------------------------------------------------------------------------- |  
| position           | `'topleft'` | Toolbar position, possible values are `'topleft'`, `'topright'`, `'bottomleft'`, `'bottomright'` |  
| positions           | `Object`   | The position of each block (`draw`, `edit`, `custom`, `options`⭐)  can be customized. If not set, the value from `position` is taken. Default: `{draw: '', edit: '', options: '', custom: ''}` [Block Position](#toolbar-block-position) | 
| drawMarker         | `true`      | Adds button to draw Markers.                                                                     |  
| drawCircleMarker   | `true`      | Adds button to draw CircleMarkers.                                                               |  
| drawPolyline       | `true`      | Adds button to draw Line.                                                                        |  
| drawRectangle      | `true`      | Adds button to draw Rectangle.                                                                   |  
| drawPolygon        | `true`      | Adds button to draw Polygon.                                                                     |  
| drawCircle         | `true`      | Adds button to draw Circle.                                                                      |  
| drawText           | `true`      | Adds button to draw Text.                                                                        |  
| editMode           | `true`      | Adds button to toggle Edit Mode for all layers.                                                  |  
| dragMode           | `true`      | Adds button to toggle Drag Mode for all layers.                                                  |  
| cutPolygon         | `true`      | Adds button to cut a hole in a Polygon or Line.                                                  |  
| removalMode        | `true`      | Adds a button to remove layers.                                                                  | 
| rotateMode         | `true`      | Adds a button to rotate layers.                                                                  | 
| oneBlock           | `false`     | All buttons will be displayed as one block [Customize Controls](#customize-controls).            |
| drawControls       | `true`      | Shows all draw buttons / buttons in the `draw` block.                                            |
| editControls       | `true`      | Shows all edit buttons / buttons in the `edit` block.                                            |
| customControls     | `true`      | Shows all buttons in the `custom` block.                                                         |
| optionsControls    | `true`      | Shows all options buttons / buttons in the `option` block ⭐.                                     |
| pinningOption      | `true`      | Adds a button to toggle the Pinning Option ⭐.                                                    |  
| snappingOption     | `true`      | Adds a button to toggle the Snapping Option ⭐.                                                   |  
| splitMode          | `true`      | Adds a button to toggle the Split Mode for all layers ⭐.                                         |  
| scaleMode          | `true`      | Adds a button to toggle the Scale Mode for all layers ⭐.                                         |  
| autoTracingOption  | `false`     | Adds a button to toggle the Auto Tracing Option ⭐.                                               |  
| snapGuidesOption  | `true`     | Adds a button to toggle the SnapGuides Option ⭐.                                               |  

To pass options to the buttons you have two ways:
```js
// make polygon not snappable during draw  
map.pm.enableDraw('Polygon',{ snappable: false }); 
map.pm.disableDraw();
```
```js
// make all layers not snappable during draw  
map.pm.setGlobalOptions({ snappable: false }); 
```
The options will persist, even when the mode is enabled/disabled via the toolbar.  
  
All available options for drawing and editing are specified in the sections below.

#### Customization

To customize the toolbar, please look at [the customization page](/customize/toolbar)
