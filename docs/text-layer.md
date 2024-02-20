---
sidebar_position: 5
title: "Text Layer"
---
### Text Layer

![text-layer](https://user-images.githubusercontent.com/19800037/168420156-953c7d1a-ed61-4a33-bc90-f18ebea425bd.gif)

Additional to the default methods and options there are a few more possibilities for Text Layers:

#### Text Layer Drawing:

```js
map.pm.enableDraw("Text", { textOptions: { text: "Geoman is fantastic! 🚀" } });
```

See the available options for `textOptions` in the table below.

| Option         | Default | Description                                                   |
| :------------- | :------ | :------------------------------------------------------------ |
| text           | ``      | Predefined text.                                              |
| focusAfterDraw | `true`  | Directly after placing the marker, text editing is activated. |
| removeIfEmpty  | `true`  | The text layer is removed if no text is written.              |
| className      | ``      | Custom CSS Classes. Separated by a space.                     |

#### Text Layer Editing:

The following methods are available on `layer.pm`:

| Method          | Returns       | Description                                                           |
| :-------------- | :------------ | :-------------------------------------------------------------------- |
| focus()         | -             | Activate text editing. Layer needs first to be enabled `.enable()`.   |
| blur()          | -             | Deactivate text editing. Layer needs first to be enabled `.enable()`. |
| hasFocus()      | `Boolean`     | Is text editing active.                                               |
| getElement()    | `HTMLElement` | Returns the `<textarea>` DOM element.                                 |
| setText(`text`) | -             | Set text.                                                             |
| getText()       | `String`      | Returns the text.                                                     |

The following events are available on a layer instance:

| Event         | Params | Description                                | Output                   |
| :------------ | :----- | :----------------------------------------- | :----------------------- |
| pm:textchange | `e`    | Fired when the text of a layer is changed. | `text`, `layer`, `shape` |
| pm:textfocus  | `e`    | Fired when the text layer is focused.      | `layer`, `shape`         |
| pm:textblur   | `e`    | Fired when the text layer is blurred.      | `layer`, `shape`         |

For custom text styling get the HTMLElement and add CSS styles:

```js
layer.pm.getElement().style.color = "red";
```

#### Text Layer manual creation:

It is possible to create a text layer programmatically by adding a Marker with the options `textMarker: true` and `text: 'your text'`.

```js
L.marker(latlng, {
  textMarker: true,
  text: "Manual creation is no problem for Geoman!",
}).addTo(map);
```
