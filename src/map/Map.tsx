import React, {
	FC, useContext,
} from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import DeckGL from '@deck.gl/react'
import { Box } from '@material-ui/core'
import { StaticMap } from 'react-map-gl'
import configFile from 'common/data/config'
import { AppContext } from 'app-screen/AppScreen'

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYmVydGVhcmF6dmFuIiwiYSI6ImNrN3J6YmQ4NzBicGozZ3NmMmdidXp1Y2IifQ.ooMmIXF9bxQtXDIfcj8HvA'

const Map: FC = () => {

	const {
		state: {
			viewport,
			layers,
		},
		actions: {
			setViewport,
		},
	} = useContext(AppContext)

	// const dklayer = new GeoJsonLayer({
	// 	id: 'dk-layer',
	// 	data: dkGeoJson,
	// 	pickable: false,
	// 	stroked: true,
	// 	filled: false,
	// 	extruded: false,
	// 	// lineWidthScale: 20,
	// 	lineWidthMinPixels: 4,
	// 	// getFillColor: [160, 160, 180, 200],
	// 	getLineColor: [ 151, 219, 249, 255],
	// 	// getRadius: 100,
	// 	getLineWidth: 1,
	// 	// getElevation: 30
	//   });

	// const terrainLayer = new Tile3DLayer({
	// 	id: 'terrain-3d-layer',
	// 	// tileset json file url
	// 	data: 'https://assets.cesium.com/96188/tileset.json',
	// 	loader: CesiumIonLoader,
	// 	// https://cesium.com/docs/rest-api/
	// 	loadOptions: {
	// 	  'cesium-ion': { accessToken: CESIUM_TOKEN },
	// 	  tileset: {
	// 		throttleRequests: false,
	// 	  },
	// 	},
	// 	// },
	// 	// onTilesetLoad: (tileset) => {
	// 	//   // Recenter to cover the tileset
	// 	//   const { cartographicCenter, zoom } = tileset;

	// 	//   this.setState({
	// 	// 	  viewState: {
	// 	// 		...this.state.viewState,
	// 	// 		longitude: cartographicCenter[0],
	// 	// 		latitude: cartographicCenter[1],
	// 	// 		zoom
	// 	// 	  }
	// 	//   });
	// 	// },
	// 	// override scenegraph subLayer prop

	// 	_subLayerProps: {
	// 	  scenegraph: {
	// 		getPosition: d => d.coordinates,
	// 			_lighting: 'pbr',
	// 		 	_animations: {
	// 				'*': {speed: 5}
	// 			},
	// 		},
	// 		mesh: {
	// 			getColor: d => d.color
	// 		}
	// 	}
	//   });


	return (
		<Box
			width={'100vw'}
			height={'100vh'}
			position={'fixed'}
		>
			<DeckGL
				viewState={viewport as any}
				controller
				width={'100%'}
				height={'100%'}
				onViewStateChange={arg => setViewport(arg.viewState)}
				layers={[ ...layers ]}
			>
				<StaticMap
					width={'100%'}
					height={'100%'}
					mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
					mapStyle={configFile.style}
				/>
			</DeckGL>
		</Box>

	)

}

export default Map

