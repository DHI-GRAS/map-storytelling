import React, { FC, useState, createContext, SetStateAction, Dispatch } from 'react'
import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Map from "map/Map"
import Story from "story/Story"
import{ FlyToInterpolator } from 'react-map-gl';
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
		layers: any[]
	},
	actions: any
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
		layers: []
	},
	actions: {}
}

export const AppContext = createContext(defaultState)

const AppScreen: FC = () => {

	const classes = useStyles()
	const [viewport, setViewport] = useState(defaultViewport)
	const [isJourneyMode, setIsJourneyMode] = useState(false)
	const [layers, setLayers] = useState([])

	const onSetStoryMode = (mode: boolean) => {
		if(mode === true){
			setViewport({
				...defaultViewport
			})
			setLayers([])
			setIsJourneyMode(false)
		}else setIsJourneyMode(true)
	}

	return (
		<AppContext.Provider value={{
			state: {
				isJourneyMode: isJourneyMode,
				viewport: viewport,
				layers: layers
			},
			actions: {
				setIsJourneyMode: setIsJourneyMode,
				setViewport: setViewport,
				setLayers: setLayers
			}
		}}>
			<div className={classes.root} >
				<Box position="fixed" style={{ top: "1rem", right: "1rem", zIndex: 10000 }}>
					<Button variant="contained" onClick={() => onSetStoryMode(isJourneyMode)}>
						{!isJourneyMode ? "Start journey" : "End journey"}
					</Button>
				</Box>
				<Map />
				{isJourneyMode && <Story />}
			</div>

		</AppContext.Provider>
	)

}
export default AppScreen
