# Interactive storytelling through maps

[Live example](https://labs.dhi-gras.com/greendenmark)

A low-code template to help you tell your map-based story through a React-based application. Inspired from [Mapbox storytelling](https://github.com/mapbox/storytelling)

Under the hood it uses the following technologies:

- Frontend tech: React, Deck.gl, Typescript
- Linting: Eslint configs we use within GRAS ([@dhi-gras/eslint-config-react](https://www.npmjs.com/package/@dhi-gras/eslint-config-react) and [@dhi-gras/eslint-config-ts](https://www.npmjs.com/package/@dhi-gras/eslint-config-ts))
- Rasters: It implements the raster layers through a [TERRACOTTA](https://github.com/DHI-GRAS/terracotta) deployment rather than through layers provided by Mapbox. 
- Vector layers: Some layers are big and therefore must be optimized. The deployed vector layers are found on a [GeoServer](http://geoserver.org/)

## Setting up

- You must have Node installed which comes with NPM. You can find it [here](https://nodejs.org/en/)  
- Clone the current repository and install the dependencies through `npm` or `yarn`.
- Run the `start` script and see the app on [http://localhost:3000/](http://localhost:3000/)

## Folder structure

The current folder structure implements a package-by-feature approach with a flat structure which separates the features of the application. I will refer to the most important features to get you going easily.

The main components that take care of the stories are the `config`, `layers`, `scroll`, `story` and the `story-components`.

### Scroll

The scroll feature renders the chapters found within the `config` and it creates the story steps based on each chapter. It calculates the height of the scrolling element in order to indicate which step is currently active and therefore, render the right layers on the map.

### Story

The story feature takes care of displaying the content found in the `content` key of each chapter and filter/remove the layers that need to be added/removed to/from the map. 

The functions that take care of the layers are working based on the `onStepEnter` and `onStepExit` of each chapter and the layer types `geojson`, `marker`, `text-marker` and `raster`.

### Story components

This feature represents the custom stories that appear on each step, in case a customized component must be used. If there is no need of a custom component, you can simply use the type `basic` in the `content` key of each chapter that takes in a `title`, `description` or the `info`.

### Layers

The layers feature contains the functions that create the deck.gl layers. At the moment, the current application uses 5 different types of layers - `cloropeth`, `geojson`, `raster`, `marker` and `marker-text`.

If you need other types of layers and/or want to change the currently existing layer configurations you can find other layers in the [deck.gl API reference](https://deck.gl/docs/api-reference/layers)

Depending on the complexity of the layers that must be added, it will require changes in the `config`, `layers` and `story` features. 

- marker layer

The marker layer must be of type `marker` and in order to be visible, the `visible` key must be `true`. It takes in a `data` key which is an array of markers with an `id` and the `coordinates` of the marker. The ids of the markers must use the template `{layerMarkerId}-{n}` where `n` is the counting if those markers.

- marker text layer

The marker text layer must have the type `text-marker` and include in the `data` key an array of markers having `coordinates`, `text` and/or `elevation`. For it to be visible on the map, the `visible` key must be set to `true`. This layer has the option of animating the appearance through a delay of 2s by using the `animation` key which must be set to `true`.

- geojson layer

The geojson layer must be of type `geojson` and include in the `data` key either a locally saved geojson file or a link to the file on a remote server. In order to be displayed, it must have the `visible` key set to `true`.

- raster layer

The XYZ raster layer must be of type `raster` and include the `url` key as an array of strings - for only one layer, it can have only one item in the array, or more items for multiple rasters under the same layer. For it to be displayed, the `visible` key must be set to `true`. This layer can also have the `animation` key set to `true` which basically adds one layer on top of another at an interval of 2 seconds. 

- cloropeth layer

The cloropeth layer is of type `geojson` and it must include in its id the `cloropeth` string. It follows the same specifications as the `geojson` layer.

**Note:** If you are aiming for removing any layer from the active state, the `visible` key must be set to `false`, either if it's in the `onStepEnter` or `onStepExit` key of the chapter.

**Note:** Only one animation type of layer can be added per story step.

**Note:** Each layer must have a unique id. Based on this id, the filtering functions know what layer to add and what layer to remove
### Config

The config feature is the most important one as the stories and the map layers are being rendered based on its specifications. The config file is strongly typed, therefore, following the types from the `config/types` should give you a good enough overview of what is expected for each key.

For consitency, the chapter ids must use the string template `{configId}-name-of-the-chapter`. This helps if you plan on building an app that contains multiple stories. This way, you can build up a logic based on this string template. 

The config file is structured as it follows:
- `id` - the id of the current story config
- `style` - the mapbox style to be added as a basemap. A list of styles can be found [here](https://docs.mapbox.com/api/maps/styles/#mapbox-styles) 
- `footer` - the footer that appears at the end of the story. It can be of type `component` or `text`.
- `scrollIndicator` - The scrolling animation that appears in the bottom center of the screen and stays fixed while scrolling. It can be of type `component` or `basic`
- `chapters` - an array of chapters that represents a story step. One chapter consists of:
	- `id` - the id of the chapter following the string template `{configId}-name-of-the-chapter`.
	- `content` - the component that gets displayed on the current story step. It can be of type `component` or `basic`. If a component must be bigger than `100vh`, using `vh` units will help the scroll HOC calculate its height easier.
	- `location` - the location of where the map should move its viewport when the step changes and it includes the `center`, `zoom`, `pitch` and the `bearing`.
	- `onChapterEnter` - an array of layers that are desired to be added on the current story step. The types of layers that can be added here are found under the `config/types/layersConfig` file and based on the `visible` key, the app knows if it must remove it or add it. 
	- `onChapterExit` - an array of layers that are meant to be removed from the map based on the `visible: false` value and the previously added layers with their ids.
 


### Contributing

If you encounter any problems or have any feature suggestions, feel free to open an Issue and eventually propose a PR.
