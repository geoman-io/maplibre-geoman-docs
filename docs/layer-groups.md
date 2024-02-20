---
sidebar_position: 7
title: "Layer Groups"
---
### LayerGroup

Leaflet-Geoman can only work correct with `L.FeatureGroup` and `L.GeoJSON` (the extended versions of L.LayerGroup) we need the events `layeradd` and `layerremove`.

The following methods are available for LayerGroups on `layergroup.pm`:

| Method                                                              | Returns   | Description                                                                                                                                                                                                                                                    |
| :------------------------------------------------------------------ | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable(`options`)                                                   | -         | Enable all layers in the LayerGroup.                                                                                                                                                                                                                           |
| disable()                                                           | -         | Disable all layers in the LayerGroup.                                                                                                                                                                                                                          |
| enabled()                                                           | `Boolean` | Returns if minimum one layer is enabled.                                                                                                                                                                                                                       |
| toggleEdit(`options`)                                               | -         | Toggle enable / disable on all layers.                                                                                                                                                                                                                         |
| getLayers(`deep=false`,`filterGeoman=true`, `filterGroupsOut=true`) | `Array`   | Returns the layers of the LayerGroup. `deep=true` return also the children of LayerGroup children. `filterGeoman=true` filter out layers that don't have Leaflet-Geoman or temporary stuff. `filterGroupsOut=true` does not return the LayerGroup layers self. |
| setOptions(`options`)                                               | -         | Apply Leaflet-Geoman options to all children.                                                                                                                                                                                                                  |
| getOptions()                                                        | `Object`  | Returns the options of the LayerGroup.                                                                                                                                                                                                                         |
| dragging()                                                          | -         | Returns if currently a layer in the LayerGroup is dragging.                                                                                                                                                                                                    |

<details>
<summary>Workaround to work with L.LayerGroup (Click to expand)</summary>

We are adding the same code to L.LayerGroup as in [L.FeatureGroup](https://github.com/Leaflet/Leaflet/blob/master/src/layer/FeatureGroup.js#L28)

```js
L.LayerGroup.prototype.addLayerOrg = L.LayerGroup.prototype.addLayer;
L.LayerGroup.prototype.addLayer = function (layer) {
  layer.addEventParent(this);
  this.addLayerOrg(layer);
  return this.fire("layeradd", { layer: layer });
};

L.LayerGroup.prototype.removeLayerOrg = L.LayerGroup.prototype.removeLayer;
L.LayerGroup.prototype.removeLayer = function (layer) {
  layer.removeEventParent(this);
  this.removeLayerOrg(layer);
  return this.fire("layerremove", { layer: layer });
};
```

</details>
