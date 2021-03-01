import React, {
	FC, useContext,
} from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import DeckGL from '@deck.gl/react'
import { Box } from '@material-ui/core'
import { StaticMap } from 'react-map-gl'
import configFile from 'config/config'
import { AppContext } from 'app-screen/AppScreen'
import ScrollAnimation from 'scroll/ScrollAnimation'
import ViewState from '@deck.gl/core/controllers/view-state'


const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYmVydGVhcmF6dmFuIiwiYSI6ImNrN3J6YmQ4NzBicGozZ3NmMmdidXp1Y2IifQ.ooMmIXF9bxQtXDIfcj8HvA'

const Map: FC = () => {

	const {
		state: {
			viewport,
			layers,
			activeStep,
		},
		actions: {
			setViewport,
		},
	} = useContext(AppContext)

	// const layer = new MVTLayer({
	// 	data: 'https://k0zyvx2wa6.execute-api.eu-central-1.amazonaws.com/production/geoserver/sdfehack/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sdfehack:block_trees&outputFormat=application/json',
	// 	onDataLoad: f => console.log(f),
	// })

	const onSetViewport = (vst: any) => {

		if (activeStep === 1 && vst.zoom > 9) vst.zoom = 9
		setViewport(vst)

	}

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
				onViewStateChange={arg => onSetViewport(arg.viewState)}
				layers={[ ...layers ]}
			>

				<StaticMap
					width={'100%'}
					height={'100%'}
					mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
					mapStyle={configFile.style}
					// style={{ opacity: 0.1 }}
				/>
				<Box position={'fixed'} style={{ right: '1rem', bottom: '2rem' }}>
					<img
						style={{ width: 100, height: 'auto' }}
						src={'https://grasdatastorage.blob.core.windows.net/images/DHI_GRAS_Logo_Neg_RGB.png'}
						alt={'GRAS_logo'}
					/>
				</Box>

			</DeckGL>
		</Box>

	)

}

export default Map

