import React, { FC, useState, useEffect } from "react"
import DeckGL from '@deck.gl/react';
import { StaticMap, FlyToInterpolator, ViewportProps, _MapContext  } from 'react-map-gl';
import { easeCubicInOut } from 'd3-ease'
import { IconLayer } from '@deck.gl/layers';
import configFile from "common/data/config"

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYmVydGVhcmF6dmFuIiwiYSI6ImNrN3J6YmQ4NzBicGozZ3NmMmdidXp1Y2IifQ.ooMmIXF9bxQtXDIfcj8HvA'
interface Props {
	view: ViewportProps
}

const Map: FC<Props> = ({ view }) => {

	const [viewport, setViewport] = useState(view)

	useEffect(() => {
		setViewport((passViewport: ViewportProps) => (
			{
			...passViewport,
			transitionDuration: 2000,
			transitionInterpolator: new FlyToInterpolator(),
			transitionEasing: easeCubicInOut,
		}
		))
	}, [view])

	const markerItems = configFile.chapters.map((chapter) => ({
		coordinates: chapter.location.center,
		name: chapter.title
	}))

	const markersLayer = new IconLayer({
		id: "blahblah",
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
		getPosition: d => d.coordinates,
		getSize: d => 5,
	})


	return (
		<DeckGL
			viewState={viewport as any}
			controller={true}
			width={"100vw"}
			height={"100vh"}
			onViewStateChange={(arg) => setViewport(arg.viewState)}
			layers={[markersLayer]}
		>
			<StaticMap
				mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
			 />
		</DeckGL>
	)
}

export default Map;

