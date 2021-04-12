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

## Code structure

The current folder structure implements a package-by-feature approach with a flat structure which separates the features of the application.

### App Screen

The app-screen feature takes care of showing the story or the 
