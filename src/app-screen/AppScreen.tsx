import React, {
	FC, useState, createContext,
} from 'react'
// import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Map from 'map/Map'
import Story from 'story/Story'
import { FlyToInterpolator } from 'react-map-gl'
import { easeCubicInOut } from 'd3-ease'

const useStyles = makeStyles({
	root: {
		width: '100%',
		height: '100vh',
		margin: 0,
		padding: 0,
		// height: window.innerHeight,
	},
	leftBorder: {
		borderLeft: '1px solid #DBE4E9',
	},
	topBorder: {
		borderTop: '1px solid #DBE4E9',
	},
})

type Viewport = {
	latitude: number,
		longitude: number,
		zoom: number,
		bearing: number,
		pitch: number,
}

interface DefaultState {
	state: {
		isJourneyMode: boolean,
		viewport: Viewport,
		layers: any[],
		isButtonDisabled: boolean,
	},
	actions: any,
}

const defaultViewport = {
	latitude: 49.915862,
	longitude: 10.046997,
	zoom: 4,
	bearing: 0,
	pitch: 60,
	transitionDuration: 2000,
	transitionInterpolator: new FlyToInterpolator(),
	transitionEasing: easeCubicInOut,
}

const defaultState: DefaultState = {
	state: {
		isJourneyMode: false,
		viewport: defaultViewport,
		layers: [],
		isButtonDisabled: false,
	},
	actions: {},
}

export const AppContext = createContext(defaultState)

const AppScreen: FC = () => {

	const classes = useStyles()
	const [ viewport, setViewport ] = useState(defaultViewport)
	const [ isJourneyMode, setIsJourneyMode ] = useState(false)
	const [ layers, setLayers ] = useState([])
	const [ isButtonDisabled, setIsButtonDisabled ] = useState(false)

	const onSetStoryMode = (mode: boolean) => {

		if (mode) {

			setViewport({
				...defaultViewport,
			})
			setLayers([])
			setIsJourneyMode(false)

		} else setIsJourneyMode(true)

	}

	return (
		<AppContext.Provider value={{
			state: {
				isJourneyMode,
				viewport,
				layers,
				isButtonDisabled,
			},
			actions: {
				setIsJourneyMode,
				setViewport,
				setLayers,
				setIsButtonDisabled,
				onSetStoryMode,
			},
		}}
		>
			<div className={classes.root} >

				<Map />
				<Story />
			</div>

		</AppContext.Provider>
	)

}
export default AppScreen
