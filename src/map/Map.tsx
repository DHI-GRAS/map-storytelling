import React, { FC, useContext, useEffect, useRef } from "react"
import DeckGL from '@deck.gl/react';
import { Box } from "@material-ui/core"
import  { StaticMap  } from 'react-map-gl';
import configFile from "common/data/config"
import { AppContext } from "app-screen/AppScreen"

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYmVydGVhcmF6dmFuIiwiYSI6ImNrN3J6YmQ4NzBicGozZ3NmMmdidXp1Y2IifQ.ooMmIXF9bxQtXDIfcj8HvA'
const CESIUM_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZDc1YjYzZS1lNTQyLTQ0ODgtYmEzNy0zMDViZmFkODhmOTQiLCJpZCI6NDMwNjYsImlhdCI6MTYxMjE5MzU0OH0.t8NZJnF7S80peYPunssqQt0u0lL6QTbpYxB_SqleXz4'

const Map: FC = () => {
	const {
		state: {
			viewport,
			layers
		},
		actions: {
			setViewport,
		}
	} = useContext(AppContext)

	// console.log(layers)
	// const rasterLayer = new TileLayer({
	// 	data: 'https://ix8zgaqqe1.execute-api.eu-central-1.amazonaws.com/production/rgb/composite/20180501/1/{z}/{x}/{y}.png?r=B04&g=B03&b=B02&r_range=[0,2000]&b_range=[0,2000]&g_range=[0,2000]',
	// 	minZoom: 0,
	// 	maxZoom: 19,
	// 	tileSize: 512,
	// 	visible: true,
	// 	renderSubLayers: props => {
	// 		const {
	// 		  bbox: {west, south, east, north}
	// 		} = props.tile;
	// 		return new BitmapLayer(props, {
	// 		  data: null,
	// 		  image: props.data,
	// 		  bounds: [west, south, east, north]
	// 		});
	// 	  }
	// })

	// const markerItems = configFile.chapters.map((chapter) => ({
	// 	coordinates: chapter.location.center,
	// 	name: chapter.title
	// }))

	// console.log(layers)
	// console.log(markerItems)
	// const markersLayer = generateMarkerLayer("markers-layer", markerItems, false)

	// new IconLayer({
	// 	id: "markers-layer",
	// 	visible: false,
	// 	data: markerItems,
	// 	iconAtlas: 'https://grasdatastorage.blob.core.windows.net/images/marker_gras.png',
	// 	iconMapping: {
	// 		marker: {
	// 			x: 0,
	// 			y: 0,
	// 			width: 128,
	// 			height: 128,
	// 			mask: false
	// 		}
	// 	},
	// 	getIcon: d => 'marker',
	// 	sizeScale: 15,
	// 	getPosition: (d: any) => d.coordinates,
	// 	getSize: d => 5,
	// })

	// const markersLayer2 = new IconLayer({
	// 	id: "markers-layer2",
	// 	visible: false,
	// 	data: markerItems,
	// 	iconAtlas: 'https://grasdatastorage.blob.core.windows.net/images/marker_gras.png',
	// 	iconMapping: {
	// 		marker: {
	// 			x: 0,
	// 			y: 0,
	// 			width: 60,
	// 			height: 60,
	// 			mask: false
	// 		}
	// 	},
	// 	getIcon: d => 'marker',
	// 	sizeScale: 15,
	// 	getPosition: (d: any) => d.coordinates,
	// 	getSize: d => 5,
	// })
	// console.log(layers)

	// useEffect(() => {
	// 	setLayers((layers: any) => [...layers ])
	// }, [])
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
			width={"100vw"}
			height={"100vh"}
			position={"fixed"}
		>
			<DeckGL
				viewState={viewport as any}
				controller={true}
				width={"100%"}
				height={"100%"}
				onViewStateChange={(arg) => setViewport(arg.viewState)}
				layers={layers ? [...layers] : []}
			>
				<StaticMap
					mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
					mapStyle={configFile.style}
				/>
			</DeckGL>
		</Box>

	)
}

export default Map;

