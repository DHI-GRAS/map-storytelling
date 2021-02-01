import React, { FC, useContext } from "react"
import DeckGL from '@deck.gl/react';
import { Box } from "@material-ui/core"
import  { StaticMap  } from 'react-map-gl';
import { IconLayer } from '@deck.gl/layers';
import configFile from "common/data/config"
import { AppContext } from "app-screen/AppScreen"

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYmVydGVhcmF6dmFuIiwiYSI6ImNrN3J6YmQ4NzBicGozZ3NmMmdidXp1Y2IifQ.ooMmIXF9bxQtXDIfcj8HvA'
interface Props {
}

const Map: FC<Props> = () => {
	const {
		state: {
			viewport
		},
		actions: {
			setViewport
		}
	} = useContext(AppContext)

	const markerItems = configFile.chapters.map((chapter) => ({
		coordinates: chapter.location.center,
		name: chapter.title
	}))

	const markersLayer = new IconLayer({
		id: "markers-layer",
		data: markerItems,
		iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
		iconMapping: {
			marker: {
				x: 2,
				y: 5,
				width: 128,
				height: 128,
				mask: true
			}
		},
		getIcon: d => 'marker',
		sizeScale: 15,
		getPosition: (d: any) => d.coordinates,
		getSize: d => 5,
	})


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
				layers={[markersLayer]}
			>
				<StaticMap
					mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
				/>
			</DeckGL>
		</Box>

	)
}

export default Map;

