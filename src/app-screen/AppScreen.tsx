import React, {
	FC, useState, createContext,
} from 'react'
// import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Map from 'map/Map'
import Story from 'story/Story'
import { FlyToInterpolator } from 'react-map-gl'
import { easeCubicInOut } from 'd3-ease'
import { Viewport, Context } from './@types/context'

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


const defaultViewport: Viewport = {
	latitude: 49.915862,
	longitude: 10.046997,
	zoom: 4,
	bearing: 0,
	pitch: 60,
	transitionDuration: 2000,
	transitionInterpolator: new FlyToInterpolator(),
	transitionEasing: easeCubicInOut,
}

const defaultState: Context = {
	state: {
		isJourneyMode: false,
		viewport: defaultViewport,
		layers: [],
		isButtonDisabled: false,
		activeStep: null,
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
	const [ activeStep, setActiveStep ] = useState(null)

	const onSetStoryMode = (mode: boolean) => {

		if (mode) {

			setViewport({
				...defaultViewport,
			})
			setLayers([])
			setIsJourneyMode(false)

		} else setIsJourneyMode(true)

	}

	const onEnableMap = (enable: boolean) => {

		setIsJourneyMode(!enable)

	}

	return (
		<AppContext.Provider value={{
			state: {
				isJourneyMode,
				viewport,
				layers,
				isButtonDisabled,
				activeStep,
			},
			actions: {
				setIsJourneyMode,
				setViewport,
				setLayers,
				setIsButtonDisabled,
				onSetStoryMode,
				onEnableMap,
				setActiveStep,
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
