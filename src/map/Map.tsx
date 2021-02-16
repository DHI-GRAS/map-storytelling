import React, {
	FC, useContext,
} from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import DeckGL from '@deck.gl/react'
import { Box } from '@material-ui/core'
import { StaticMap } from 'react-map-gl'
import configFile from 'config/config'
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

	// const layer = new MVTLayer({
	// 	data: 'https://k0zyvx2wa6.execute-api.eu-central-1.amazonaws.com/production/geoserver/sdfehack/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sdfehack:block_trees&outputFormat=application/json',
	// 	onDataLoad: f => console.log(f),
	// })

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
					// style={{ opacity: 0.1 }}
				/>
			</DeckGL>
		</Box>

	)

}

export default Map

