import React, {
	FC, useState, createContext,
} from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Map from 'map/Map'
import Story from 'story/Story'
import { FlyToInterpolator } from 'react-map-gl'
import { easeCubicInOut } from 'd3-ease'
import LayerTypes from 'common/layers/@types/LayerTypes'
import configFile from 'config/config'
import ProgressBar from 'scroll/ProgressBar'
import ScrollAnimation from 'scroll/ScrollAnimation'
import Legend from 'story/Legend'
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
	paging: {
		position: 'fixed',
		top: '0.5rem',
		left: '50%',
		transform: 'translateX(-50%)',
		zIndex: 5000,
	},
	scrollBox: {
		position: 'fixed',
		bottom: '4rem',
		left: '50%',
		transform: 'translateX(-50%)',
		zIndex: 5000,
	},
	legendBox: {
		position: 'fixed',
		left: '1rem',
		bottom: '4rem',
		zIndex: 5000,
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
	const [ layers, setLayers ] = useState<LayerTypes[]>([])
	const [ isButtonDisabled, setIsButtonDisabled ] = useState(false)
	const [ activeStep, setActiveStep ] = useState<number | null>(null)

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
				{
					activeStep !== null && (
						<Box className={classes.paging}>
							<ProgressBar step={activeStep + 1} totalSteps={configFile.chapters.length} />
						</Box>
					)
				}
				{
					activeStep !== null && isJourneyMode && (
						<Box className={classes.scrollBox}>
							<ScrollAnimation
								text={'You can navigate through the story by scrolling with your mouse or using the up and down keys on your keyboard'}
							/>
						</Box>
					)
				}
				{
					activeStep !== null && configFile.chapters[ activeStep ].legend && (
						<Box className={classes.legendBox}>
							<Legend
								items={configFile.chapters[ activeStep ].legend?.items || []}
								title={configFile.chapters[ activeStep ].legend?.title}
								unit={configFile.chapters[ activeStep ].legend?.unit}
							/>
						</Box>
					)
				}
				<Map />
				<Story />
			</div>

		</AppContext.Provider>
	)

}
export default AppScreen
